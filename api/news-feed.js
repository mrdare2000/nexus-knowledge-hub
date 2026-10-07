// Nexus Knowledge Hub - News Feed API (Firestore First + Zero-Fail Live Server RSS Fallback)
// Serves articles from Firestore when available, or fetches live RSS feeds server-side via Node.js

import crypto from 'crypto';

const FIRESTORE_PROJECT = 'nexus-knowledge-hub';
const FIRESTORE_COLLECTION = 'news';

const LOGISTICS_FEEDS = [
  { url: 'https://splash247.com/feed/', source: 'Splash247', category: 'MARITIME', icon: '🚢', label: 'Ocean & Maritime' },
  { url: 'https://www.supplychaindive.com/feeds/news/', source: 'Supply Chain Dive', category: 'SUPPLY_CHAIN', icon: '📦', label: 'Supply Chain & Tech' },
  { url: 'https://www.aircargonews.net/feed/', source: 'Air Cargo News', category: 'AIR', icon: '✈️', label: 'Air Cargo & Aviation' },
  { url: 'https://gcaptain.com/feed/', source: 'gCaptain', category: 'PORTS', icon: '⚓', label: 'Ports & Logistics' },
  { url: 'https://theloadstar.com/feed/', source: 'The Loadstar', category: 'TRADE', icon: '🏛️', label: 'Customs & Trade' },
  { url: 'https://www.hellenicshippingnews.com/feed/', source: 'Hellenic Shipping News', category: 'MARITIME', icon: '🚢', label: 'Ocean & Maritime' },
  { url: 'https://www.porttechnology.org/feed/', source: 'Port Technology', category: 'PORTS', icon: '⚓', label: 'Ports & Logistics' }
];

function extractTag(xml, tag) {
  const cdataRegex = new RegExp(`<${tag}[^>]*>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*</${tag}>`, 'i');
  const cdataMatch = xml.match(cdataRegex);
  if (cdataMatch) return cdataMatch[1].trim();

  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i');
  const match = xml.match(regex);
  return match ? match[1].trim() : '';
}

function extractAttr(xml, tag, attr) {
  const regex = new RegExp(`<${tag}[^>]*?${attr}=["']([^"']+)["']`, 'i');
  const match = xml.match(regex);
  return match ? match[1].trim() : '';
}

function extractArticleImage(itemXml) {
  let img = extractAttr(itemXml, 'media:content', 'url') || extractAttr(itemXml, 'media:thumbnail', 'url');
  if (img) return img;

  const enc = itemXml.match(/<enclosure[^>]*?url=["']([^"']+)["']/i);
  if (enc && enc[1]) return enc[1];

  const html = (extractTag(itemXml, 'content:encoded') || '') + ' ' + (extractTag(itemXml, 'description') || '');
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (match && match[1] && !match[1].includes('gravatar') && !match[1].includes('data:')) return match[1];

  return '';
}

async function fetchLiveRSSArticles() {
  const allArticles = [];

  const promises = LOGISTICS_FEEDS.map(async (feed) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const resp = await fetch(feed.url, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) NexusKnowledgeHub/1.0 (News Aggregator)'
        }
      });
      clearTimeout(timeoutId);

      if (!resp.ok) return [];

      const xmlText = await resp.text();
      const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
      let match;
      const items = [];

      while ((match = itemRegex.exec(xmlText)) !== null) {
        const itemXml = match[1];
        const title = extractTag(itemXml, 'title')
          .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
        const link = extractTag(itemXml, 'link') || extractAttr(itemXml, 'link', 'href');
        const rawDesc = extractTag(itemXml, 'description');
        const cleanDesc = rawDesc
          .replace(/<\/?[^>]+(>|$)/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").slice(0, 300);
        const pubDate = extractTag(itemXml, 'pubDate') || extractTag(itemXml, 'dc:date');
        let imageUrl = extractArticleImage(itemXml);

        if (imageUrl) {
          imageUrl = imageUrl.replace(/&amp;/g, '&');
          if (imageUrl.startsWith('//')) imageUrl = 'https:' + imageUrl;
          if (imageUrl.startsWith('http://')) imageUrl = imageUrl.replace('http://', 'https://');
        }

        if (title && link) {
          items.push({
            title,
            description: cleanDesc,
            link,
            imageUrl: imageUrl || '',
            pubDate: pubDate || new Date().toISOString(),
            source: feed.source,
            category: feed.category,
            categoryLabel: feed.label,
            icon: feed.icon
          });
        }
      }
      return items;
    } catch (e) {
      return [];
    }
  });

  const results = await Promise.allSettled(promises);
  results.forEach(res => {
    if (res.status === 'fulfilled' && Array.isArray(res.value)) {
      allArticles.push(...res.value);
    }
  });

  const uniqueMap = new Map();
  allArticles.forEach(item => {
    const key = item.title.toLowerCase().trim();
    if (!uniqueMap.has(key)) uniqueMap.set(key, item);
  });

  const finalArticles = Array.from(uniqueMap.values());
  finalArticles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
  return finalArticles.slice(0, 30);
}

// ─── JWT / OAuth for Firestore ────────────────────────────────────

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
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method Not Allowed' });

  res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=300');

  try {
    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (serviceAccountJson) {
      try {
        const serviceAccount = JSON.parse(serviceAccountJson);
        const accessToken = await getAccessToken(serviceAccount);

        const baseUrl = `https://firestore.googleapis.com/v1/projects/${FIRESTORE_PROJECT}/databases/(default)/documents`;
        const fsRes = await fetch(`${baseUrl}/${FIRESTORE_COLLECTION}?pageSize=100`, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        });

        if (fsRes.ok) {
          const data = await fsRes.json();
          if (data.documents && data.documents.length > 0) {
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

            articles.sort((a, b) => a.sortOrder - b.sortOrder);
            const validArticles = articles.filter(a => a.title && a.link);

            if (validArticles.length > 0) {
              return res.status(200).json({
                articles: validArticles,
                count: validArticles.length,
                source: 'firestore',
                updatedAt: new Date().toISOString()
              });
            }
          }
        }
      } catch (fsErr) {
        console.warn('[NEWS-FEED] Firestore fallback triggered:', fsErr.message);
      }
    }

    // Fallback: Fetch Live RSS Feeds Directly Server-Side
    const rssArticles = await fetchLiveRSSArticles();
    return res.status(200).json({
      articles: rssArticles,
      count: rssArticles.length,
      source: 'rss_server',
      updatedAt: new Date().toISOString()
    });

  } catch (err) {
    console.error('[NEWS-FEED] Error:', err.message);
    return res.status(500).json({ error: 'Failed to fetch news feed.', details: err.message });
  }
}
