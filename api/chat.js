// In-memory rate limiter (resets on cold start, ~5-10 min on Vercel)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS_PER_WINDOW = 10;      // Max 10 requests per minute per IP

// Maximum allowed input sizes
const MAX_HISTORY_LENGTH = 30;           // Max conversation turns
const MAX_MESSAGE_LENGTH = 4000;         // Max chars per message
const MAX_SYSTEM_PROMPT_LENGTH = 8000;   // Max system prompt chars

function isRateLimited(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { windowStart: now, count: 1 });
    return false;
  }

  record.count++;
  if (record.count > MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  return false;
}

// Basic HTML/script tag sanitizer for input
function sanitizeInput(text) {
  if (typeof text !== 'string') return '';
  return text
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .slice(0, MAX_MESSAGE_LENGTH);
}

export default async function handler(req, res) {
  // CORS headers - support both apex and www domains, as well as preview environments
  const allowedOrigins = [
    'https://www.nexusknowledgehub.com',
    'https://nexusknowledgehub.com'
  ];
  const origin = req.headers.origin;
  if (origin && (allowedOrigins.includes(origin) || origin.includes('localhost') || origin.endsWith('.vercel.app'))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'https://www.nexusknowledgehub.com');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Rate limiting by IP
  const clientIP = req.headers['x-forwarded-for']?.split(',')[0]?.trim()
    || req.headers['x-real-ip']
    || req.socket?.remoteAddress
    || 'unknown';

  if (isRateLimited(clientIP)) {
    return res.status(429).json({
      error: 'Too many requests. Please wait a moment before trying again.'
    });
  }

  try {
    const { history, systemPrompt } = req.body;

    // Input validation
    if (!history || !Array.isArray(history) || history.length === 0) {
      return res.status(400).json({ error: 'Invalid request: history is required.' });
    }

    if (history.length > MAX_HISTORY_LENGTH) {
      return res.status(400).json({ error: 'Conversation too long. Please start a new chat.' });
    }

    // Sanitize all messages in history
    const sanitizedHistory = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: sanitizeInput(msg.parts?.[0]?.text || '') }]
    })).filter(msg => msg.parts[0].text.length > 0);

    if (sanitizedHistory.length === 0) {
      return res.status(400).json({ error: 'Invalid request: no valid messages.' });
    }

    // Sanitize system prompt
    const cleanSystemPrompt = typeof systemPrompt === 'string'
      ? systemPrompt.slice(0, MAX_SYSTEM_PROMPT_LENGTH)
      : 'You are a global logistics expert.';

    // Get API key from server environment (never exposed to frontend)
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'AI service is not configured.' });
    }

    const payload = {
      contents: sanitizedHistory,
      systemInstruction: {
        parts: [{ text: cleanSystemPrompt }]
      },
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1200,
        topP: 0.95
      }
    };

    // Resilient Model Cascade: Try stable fast models with per-call timeout
    const GEMINI_MODELS = [
      'gemini-1.5-flash',
      'gemini-2.0-flash',
      'gemini-1.5-flash-8b'
    ];

    let botText = null;
    let lastError = null;

    for (const model of GEMINI_MODELS) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6500);

      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey
          },
          body: JSON.stringify(payload),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText && candidateText.trim().length > 0) {
            botText = candidateText;
            break;
          }
        } else {
          const errData = await response.json().catch(() => ({}));
          const errMsg = errData.error?.message || `HTTP ${response.status}`;
          console.warn(`Gemini model ${model} returned error (${errMsg}), trying fallback...`);
          lastError = errMsg;
        }
      } catch (err) {
        clearTimeout(timeoutId);
        console.warn(`Gemini model ${model} network error/timeout:`, err.message);
        lastError = err.message;
      }
    }

    if (botText) {
      return res.status(200).json({ text: botText });
    }

    return res.status(502).json({
      error: `AI service temporarily unavailable (${lastError || 'timeout'}). Please try again.`
    });

  } catch (error) {
    console.error("API Error:", error.message);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}
