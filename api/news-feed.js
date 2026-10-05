// Nexus Knowledge Hub - News Feed API (Read-Only)
// Serves articles from Firestore where the cron job stores properly-extracted news with real images.
// This is a public read endpoint - the Firestore security rules allow public reads on /news/*.

import crypto from 'crypto';

const FIRESTORE_PROJECT = 'nexus-knowledge-hub';
const FIRESTORE_COLLECTION = 'news';

// ─── JWT / OAuth (same approach as news-update.js) ───────────────

function createJWT(serviceAccount) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iss: serviceAccount.client_email,
    scope: 'https://www.googleapis.com/auth/datastore',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600
  };

  const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signInput = `${encodedHeader}.${encodedPayload}`;

  const sign = crypto.createSign('RSA-SHA256');
  sign.update(signInput);
  const signature = sign.sign(serviceAccount.private_key, 'base64url');

  return `${signInput}.${signature}`;
}

async function getAccessToken(serviceAccount) {
  const jwt = createJWT(serviceAccount);
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OAuth token error: ${err}`);
  }

  const data = await response.json();
  return data.access_token;
}

// ─── Main Handler ────────────────────────────────────────────────

export default async function handler(req, res) {
  // CORS - allow the frontend to read news
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method Not Allowed' });

  // Cache at CDN edge for 15 minutes, serve stale for 5 more while revalidating
  res.setHeader('Cache-Control', 'public, s-maxage=900, stale-while-revalidate=300');

  try {
    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (!serviceAccountJson) {
      return res.status(500).json({ error: 'Server config missing.' });
    }

    let serviceAccount;
    try {
      serviceAccount = JSON.parse(serviceAccountJson);
    } catch {
      return res.status(500).json({ error: 'Invalid server config.' });
    }

    const accessToken = await getAccessToken(serviceAccount);

    // Read all news documents from Firestore
    const baseUrl = `https://firestore.googleapis.com/v1/projects/${FIRESTORE_PROJECT}/databases/(default)/documents`;
    const fsRes = await fetch(`${baseUrl}/${FIRESTORE_COLLECTION}?pageSize=100`, {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });

    if (!fsRes.ok) {
      throw new Error(`Firestore read failed: HTTP ${fsRes.status}`);
    }

    const data = await fsRes.json();

    if (!data.documents || data.documents.length === 0) {
      return res.status(200).json({ articles: [], count: 0 });
    }

    // Parse Firestore documents into clean article objects
    const articles = data.documents.map(doc => {
      const f = doc.fields || {};
      return {
        title: f.title?.stringValue || '',
        description: f.description?.stringValue || '',
        link: f.link?.stringValue || '',
        imageUrl: f.imageUrl?.stringValue || '',
        pubDate: f.pubDate?.stringValue || '',
        source: f.source?.stringValue || 'News',
        sortOrder: f.sortOrder
          ? Number(f.sortOrder.integerValue !== undefined ? f.sortOrder.integerValue : (f.sortOrder.doubleValue || 999))
          : 999
      };
    });

    // Sort by sortOrder (newest first as stored by the cron job)
    articles.sort((a, b) => a.sortOrder - b.sortOrder);

    // Only return articles that have valid image URLs
    const validArticles = articles.filter(a =>
      a.title && a.link && a.imageUrl && a.imageUrl.startsWith('https://')
    );

    return res.status(200).json({
      articles: validArticles,
      count: validArticles.length,
      updatedAt: new Date().toISOString()
    });

  } catch (err) {
    console.error('[NEWS-FEED] Error:', err.message);
    return res.status(500).json({ error: 'Failed to fetch news feed.', details: err.message });
  }
}
