export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { history, systemPrompt } = req.body;
    
    // In Vercel, this is injected securely from Environment Variables
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server.' });
    }

    const payload = {
      contents: history,
      systemInstruction: {
        parts: [{
          text: systemPrompt || "You are a global logistics expert."
        }]
      }
    };

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const errMsg = errData.error ? errData.error.message : \HTTP \\;
      return res.status(response.status).json({ error: errMsg });
    }

    const data = await response.json();
    const botText = data.candidates[0].content.parts[0].text;
    
    return res.status(200).json({ text: botText });
  } catch (error) {
    console.error("Vercel API Error:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
