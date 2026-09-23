// Nexus Knowledge Hub — Automated News Feed Updater
// Vercel Serverless Cron Function (zero external dependencies)
// Fetches real news from 18+ RSS feeds, filters by logistics keywords,
// extracts actual article images, and stores top 30 in Firebase Firestore.

import crypto from 'crypto';

// ─── Configuration ───────────────────────────────────────────────
const FIRESTORE_PROJECT = 'nexus-knowledge-hub';
const FIRESTORE_COLLECTION = 'news';
const MAX_ARTICLES = 30;
const FETCH_TIMEOUT_MS = 8000;

// RSS Feeds — top global logistics, maritime, aviation, trade & politics sources
const RSS_FEEDS = [
  'https://www.supplychaindive.com/feeds/news/',
  'https://theloadstar.com/feed/',
  'https://www.seatrade-maritime.com/rss.xml',
  'https://gcaptain.com/feed/',
  'https://splash247.com/feed/',
  'https://www.hellenicshippingnews.com/feed/',
  'https://www.offshore-energy.biz/feed/',
  'https://www.porttechnology.org/feed/',
  'https://www.freightwaves.com/feed',
  'https://www.aircargonews.net/feed/',
  'https://feeds.reuters.com/reuters/businessNews',
  'https://feeds.bbci.co.uk/news/business/rss.xml',
  'https://rss.nytimes.com/services/xml/rss/nyt/Business.xml',
  'https://feeds.bbci.co.uk/news/world/rss.xml',
  'https://feeds.reuters.com/Reuters/worldNews',
  'https://www.joc.com/feed',
  'https://lloydslist.com/LL1702/rss',
  'https://www.maritimeexecutive.com/rss'
];

// Logistics keyword filter — articles must match at least one
const LOGISTICS_KEYWORDS = [
  'logistics', 'supply chain', 'shipping', 'port', 'freight', 'maritime',
  'cargo', 'vessel', 'container', 'transport', 'trucking', 'aviation',
  'airline', 'fleet', 'rail', 'trade', 'tariff', 'export', 'import',
  'warehouse', 'customs', 'houthi', 'red sea', 'panama', 'suez',
  'carrier', 'ocean', 'bunker', 'tanker', 'chokepoint', 'tonnage', 'teu',
  'dockworker', 'terminal', 'boeing', 'airbus', 'shipment', 'freighter',
  'volcano', 'eruption', 'ash', 'disruption', 'airport', 'flight',
  'grounded', 'cancelled', 'airways', 'iata', 'imo', 'dock', 'berth',
  'port congestion', 'sanctions', 'embargo', 'duties', 'cbp', 'wto',
  'supply disruption', 'shortage', 'delivery', 'fulfillment', 'fulfilment',
  'air freight', 'ocean freight', 'road freight', 'intermodal', 'multimodal',
  'crane', 'reefer', 'cold chain', 'dangerous goods', 'hazmat', 'pipeline',
  'blockade', 'strike', 'labor', 'labour', 'dock strike', 'storm', 'hurricane',
  'typhoon', 'earthquake', 'tsunami', 'flood', 'wildfire', 'emergency',
  'evacuation', 'rescue', 'disaster', 'catastrophe', 'alert', 'crisis',
  'geopolitical', 'war', 'conflict', 'blockage', 'closure', 'ban',
  'rate', 'cost', 'price', 'fuel', 'oil', 'energy', 'lng', 'commodity',
  'semiconductor', 'chip', 'manufacturing', 'factory',
  'e-commerce', 'amazon', 'retail', 'last mile', '3pl', 'forwarding',
  'demurrage', 'detention', 'vgm', 'bill of lading', 'bol',
  'drone', 'autonomous', 'electric vehicle', 'ev', 'sustainability',
  'emissions', 'decarbonization', 'net zero', 'green shipping',
  'maersk', 'msc', 'cosco', 'hapag', 'cma cgm', 'evergreen', 'yang ming',
  'fedex', 'ups', 'dhl', 'kuehne', 'db schenker', 'flexport',
  'china', 'india', 'trade war', 'us-china', 'brics', 'asean',
  'indonesia', 'airport closure', 'grounding', 'diversion'
];

// ─── RSS XML Parser (zero-dependency) ────────────────────────────

function extractTag(xml, tag) {
  // Handle CDATA: <tag><![CDATA[content]]></tag>
  const cdataRegex = new RegExp(`<${tag}[^>]*>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*</${tag}>`, 'i');
  const cdataMatch = xml.match(cdataRegex);
  if (cdataMatch) return cdataMatch[1].trim();

  // Handle regular: <tag>content</tag>
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i');
  const match = xml.match(regex);
  return match ? match[1].trim() : '';
}

function extractAttr(xml, tag, attr) {
  const regex = new RegExp(`<${tag}[^>]*?${attr}=["']([^"']+)["']`, 'i');
  const match = xml.match(regex);
  return match ? match[1].trim() : '';
}

function extractImageFromHTML(html) {
  if (!html) return '';
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : '';
}

function extractArticleImage(itemXml) {
  // 1. <media:content url="...">
  let img = extractAttr(itemXml, 'media:content', 'url');
  if (img) return img;

  // 2. <media:thumbnail url="...">
  img = extractAttr(itemXml, 'media:thumbnail', 'url');
  if (img) return img;

  // 3. <enclosure url="..." type="image/...">
  const enclosureMatch = itemXml.match(/<enclosure[^>]*?url=["']([^"']+)["'][^>]*?type=["']image\/[^"']+["']/i);
  if (enclosureMatch) return enclosureMatch[1];
  // Also try enclosure without type restriction but check if it ends in image extension
  const enclosureAny = extractAttr(itemXml, 'enclosure', 'url');
  if (enclosureAny && /\.(jpg|jpeg|png|webp|gif)/i.test(enclosureAny)) return enclosureAny;

  // 4. <image><url>...</url></image>
  const imageBlock = itemXml.match(/<image>([\s\S]*?)<\/image>/i);
  if (imageBlock) {
    img = extractTag(imageBlock[1], 'url');
    if (img) return img;
  }

  // 5. Extract <img src="..."> from description/content:encoded
  const contentEncoded = extractTag(itemXml, 'content:encoded');
  img = extractImageFromHTML(contentEncoded);
  if (img) return img;

  const description = extractTag(itemXml, 'description');
  img = extractImageFromHTML(description);
  if (img) return img;

  return '';
}

function extractSourceFromFeedUrl(feedUrl) {
  try {
    const hostname = new URL(feedUrl).hostname.replace('www.', '').replace('feeds.', '').replace('rss.', '');
    // Clean up common domain suffixes for display
    const nameMap = {
      'supplychaindive.com': 'Supply Chain Dive',
      'theloadstar.com': 'The Loadstar',
      'seatrade-maritime.com': 'Seatrade Maritime',
      'gcaptain.com': 'gCaptain',
      'splash247.com': 'Splash 247',
      'hellenicshippingnews.com': 'Hellenic Shipping News',
      'offshore-energy.biz': 'Offshore Energy',
      'porttechnology.org': 'Port Technology',
      'freightwaves.com': 'FreightWaves',
      'aircargonews.net': 'Air Cargo News',
      'reuters.com': 'Reuters',
      'bbci.co.uk': 'BBC News',
      'nytimes.com': 'The New York Times',
      'joc.com': 'Journal of Commerce',
      'lloydslist.com': "Lloyd's List",
      'maritimeexecutive.com': 'The Maritime Executive'
    };
    return nameMap[hostname] || hostname.split('.')[0].charAt(0).toUpperCase() + hostname.split('.')[0].slice(1);
  } catch {
    return 'News Source';
  }
}

function parseRSSFeed(xmlText, feedUrl) {
  const articles = [];
  const source = extractSourceFromFeedUrl(feedUrl);

  // Also try to get source name from the channel title
  let channelTitle = extractTag(xmlText, 'title');

  // Split into <item> blocks
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match;
  while ((match = itemRegex.exec(xmlText)) !== null) {
    const itemXml = match[1];

    const title = extractTag(itemXml, 'title').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
    const link = extractTag(itemXml, 'link') || extractAttr(itemXml, 'link', 'href');
    const description = extractTag(itemXml, 'description').replace(/<\/?[^>]+(>|$)/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
    const pubDate = extractTag(itemXml, 'pubDate') || extractTag(itemXml, 'dc:date');

    // Extract the REAL article image
    let imageUrl = extractArticleImage(itemXml);

    // Normalize image URL
    if (imageUrl) {
      imageUrl = imageUrl.replace(/&amp;/g, '&');
      if (imageUrl.startsWith('//')) imageUrl = 'https:' + imageUrl;
      if (imageUrl.startsWith('http://')) imageUrl = imageUrl.replace('http://', 'https://');
    }

    // SKIP articles without a real image — this is a core requirement
    if (!imageUrl || !imageUrl.startsWith('https://')) continue;
    if (!title || !link) continue;

    // Check keyword relevance
    const contentText = (title + ' ' + description).toLowerCase();
    const isRelevant = LOGISTICS_KEYWORDS.some(kw => contentText.includes(kw));
    if (!isRelevant) continue;

    articles.push({
      title: title.slice(0, 300),
      description: description.slice(0, 500),
      link,
      imageUrl,
      pubDate: pubDate || new Date().toISOString(),
      source: source || channelTitle || 'News'
    });
  }

  return articles;
}

// ─── Firestore REST API (zero-dependency auth) ───────────────────

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

function toFirestoreValue(val) {
  if (typeof val === 'string') return { stringValue: val };
  if (typeof val === 'number') return Number.isInteger(val) ? { integerValue: String(val) } : { doubleValue: val };
  if (typeof val === 'boolean') return { booleanValue: val };
  if (val === null || val === undefined) return { nullValue: null };
  return { stringValue: String(val) };
}

async function fetchExistingNews(accessToken) {
  try {
    const baseUrl = `https://firestore.googleapis.com/v1/projects/${FIRESTORE_PROJECT}/databases/(default)/documents`;
    const headers = { 'Authorization': `Bearer ${accessToken}` };
    const res = await fetch(`${baseUrl}/${FIRESTORE_COLLECTION}?pageSize=100`, { headers });
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.documents) return [];

    const articles = data.documents.map(doc => {
      const fields = doc.fields || {};
      return {
        title: fields.title?.stringValue || '',
        description: fields.description?.stringValue || '',
        link: fields.link?.stringValue || '',
        imageUrl: fields.imageUrl?.stringValue || '',
        pubDate: fields.pubDate?.stringValue || new Date().toISOString(),
        source: fields.source?.stringValue || 'News',
        sortOrder: fields.sortOrder ? (fields.sortOrder.integerValue !== undefined ? Number(fields.sortOrder.integerValue) : Number(fields.sortOrder.doubleValue)) : 999
      };
    });

    articles.sort((a, b) => a.sortOrder - b.sortOrder);
    return articles;
  } catch (err) {
    console.warn('[NEWS-UPDATE] Could not fetch existing news from Firestore:', err.message);
    return [];
  }
}

async function clearAndWriteNews(accessToken, articles) {
  const baseUrl = `https://firestore.googleapis.com/v1/projects/${FIRESTORE_PROJECT}/databases/(default)/documents`;
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  };

  // Step 1: List all existing news documents
  const listRes = await fetch(`${baseUrl}/${FIRESTORE_COLLECTION}?pageSize=100`, { headers });
  if (listRes.ok) {
    const listData = await listRes.json();
    const existingDocs = listData.documents || [];

    // Step 2: Delete all existing documents using batch commit
    if (existingDocs.length > 0) {
      const deleteWrites = existingDocs.map(doc => ({
        delete: doc.name
      }));

      // Firestore batch commit supports up to 500 writes
      await fetch(`${baseUrl}:commit`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ writes: deleteWrites })
      });
    }
  }

  // Step 3: Batch write all new articles
  if (articles.length === 0) return;

  const createWrites = articles.map((article, index) => {
    const docId = `article_${String(index).padStart(3, '0')}`;
    return {
      update: {
        name: `projects/${FIRESTORE_PROJECT}/databases/(default)/documents/${FIRESTORE_COLLECTION}/${docId}`,
        fields: {
          title: toFirestoreValue(article.title),
          description: toFirestoreValue(article.description),
          link: toFirestoreValue(article.link),
          imageUrl: toFirestoreValue(article.imageUrl),
          pubDate: toFirestoreValue(article.pubDate),
          source: toFirestoreValue(article.source),
          sortOrder: toFirestoreValue(index),
          updatedAt: toFirestoreValue(new Date().toISOString())
        }
      }
    };
  });

  await fetch(`${baseUrl}:commit`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ writes: createWrites })
  });
}

// ─── Main Handler ────────────────────────────────────────────────

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', 'https://nexusknowledgehub.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // Security: Verify cron secret (Vercel cron sends this automatically)
  // Also accept manual trigger via POST with CRON_SECRET header
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers['authorization'];

  if (req.method === 'GET') {
    // Vercel Cron trigger — verify via CRON_SECRET
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  } else if (req.method === 'POST') {
    // Manual trigger — verify secret
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Parse service account from env
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!serviceAccountJson) {
    return res.status(500).json({ error: 'FIREBASE_SERVICE_ACCOUNT env var not configured.' });
  }

  let serviceAccount;
  try {
    serviceAccount = JSON.parse(serviceAccountJson);
  } catch {
    return res.status(500).json({ error: 'Invalid FIREBASE_SERVICE_ACCOUNT JSON.' });
  }

  console.log(`[NEWS-UPDATE] Starting rolling news update at ${new Date().toISOString()}`);

  try {
    const accessToken = await getAccessToken(serviceAccount);

    // ── Step 1: Fetch existing Firestore articles ──
    const existingArticles = await fetchExistingNews(accessToken);
    console.log(`[NEWS-UPDATE] Found ${existingArticles.length} existing articles in Firestore.`);

    // ── Step 2: Fetch all RSS feeds in parallel (with retry) ──
    const MAX_RETRIES = 2;
    const RETRY_DELAY_MS = 1500;

    async function fetchFeedWithRetry(feedUrl, attempt = 1) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

      try {
        const r = await fetch(feedUrl, {
          signal: controller.signal,
          headers: {
            'User-Agent': 'NexusKnowledgeHub/1.0 (News Aggregator)',
            'Accept': 'application/rss+xml, application/xml, text/xml, */*'
          }
        });
        clearTimeout(timeoutId);
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const xmlText = await r.text();
        return parseRSSFeed(xmlText, feedUrl);
      } catch (err) {
        clearTimeout(timeoutId);
        if (attempt < MAX_RETRIES) {
          console.warn(`[NEWS-UPDATE] Feed attempt ${attempt} failed: ${feedUrl} — ${err.message}. Retrying...`);
          await new Promise(r => setTimeout(r, RETRY_DELAY_MS));
          return fetchFeedWithRetry(feedUrl, attempt + 1);
        }
        console.warn(`[NEWS-UPDATE] Feed failed after ${MAX_RETRIES} attempts: ${feedUrl} — ${err.message}`);
        return [];
      }
    }

    const fetchPromises = RSS_FEEDS.map(feedUrl => fetchFeedWithRetry(feedUrl));
    const results = await Promise.all(fetchPromises);

    // Merge & deduplicate fetched RSS articles
    const seenTitles = new Set();
    const fetchedRssArticles = [];
    let feedsSucceeded = 0;
    let feedsFailed = 0;

    results.forEach(feedArticles => {
      if (feedArticles.length > 0) {
        feedsSucceeded++;
      } else {
        feedsFailed++;
      }
      feedArticles.forEach(article => {
        const normTitle = article.title.trim().toLowerCase();
        if (seenTitles.has(normTitle)) return;
        seenTitles.add(normTitle);
        fetchedRssArticles.push(article);
      });
    });

    // Sort RSS articles newest first
    fetchedRssArticles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

    console.log(`[NEWS-UPDATE] Feeds: ${feedsSucceeded} OK, ${feedsFailed} failed. Total RSS articles fetched: ${fetchedRssArticles.length}`);

    // ── Step 3: Rolling window calculation ──
    let finalArticles = [];

    if (existingArticles.length === 0) {
      // First run or empty DB: Seed with top MAX_ARTICLES from RSS
      finalArticles = fetchedRssArticles.slice(0, MAX_ARTICLES);
    } else {
      // Find fresh articles that are not already in Firestore
      const existingTitleSet = new Set(existingArticles.map(a => a.title.trim().toLowerCase()));
      const freshArticles = fetchedRssArticles.filter(a => !existingTitleSet.has(a.title.trim().toLowerCase()));

      // Helper: Detect Aviation / Air Cargo articles
      function isAviationArticle(art) {
        const text = (art.title + ' ' + art.description + ' ' + art.source).toLowerCase();
        const aviationKw = ['air cargo', 'aviation', 'airline', 'air freight', 'airways', 'freighter', 'boeing', 'airbus', 'flight', 'airport', 'iata', 'cargo plane'];
        return aviationKw.some(kw => text.includes(kw));
      }

      // Select 6 fresh articles ensuring sector diversity (1-2 Aviation + Maritime, Land, Supply Chain)
      function selectDiverseSix(articles) {
        if (articles.length <= 6) return articles;

        const aviation = articles.filter(isAviationArticle);
        const nonAviation = articles.filter(a => !isAviationArticle(a));

        const selected = [];
        // Pick up to 2 fresh aviation articles if available
        const aviationPick = aviation.slice(0, 2);
        selected.push(...aviationPick);

        // Fill remaining slots (up to 6) with newest non-aviation articles
        for (const art of nonAviation) {
          if (selected.length >= 6) break;
          selected.push(art);
        }

        // Sort final 6 newest first
        selected.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
        return selected;
      }

      // Take 6 fresh articles with sector balance (Aviation + Maritime + Land + Tech)
      const freshSix = selectDiverseSix(freshArticles);
      console.log(`[NEWS-UPDATE] Prepending ${freshSix.length} sector-balanced daily articles to existing set of ${existingArticles.length}.`);

      // Combine fresh 6 + existing, deduplicate, limit to MAX_ARTICLES (30)
      const combined = [...freshSix, ...existingArticles];
      const dedupSet = new Set();

      for (const item of combined) {
        const key = item.title.trim().toLowerCase();
        if (!dedupSet.has(key)) {
          dedupSet.add(key);
          finalArticles.push(item);
        }
        if (finalArticles.length >= MAX_ARTICLES) break;
      }
    }

    if (finalArticles.length === 0) {
      console.warn('[NEWS-UPDATE] No articles to write. Preserving Firestore state.');
      return res.status(200).json({
        success: true,
        message: 'No news updates applied. Existing news preserved.',
        totalFetched: fetchedRssArticles.length,
        stored: existingArticles.length
      });
    }

    // ── Step 4: Write to Firestore ──
    await clearAndWriteNews(accessToken, finalArticles);

    console.log(`[NEWS-UPDATE] Successfully updated Firestore with ${finalArticles.length} rolling articles.`);

    return res.status(200).json({
      success: true,
      message: `Rolling news feed updated with ${finalArticles.length} total articles (6 daily auto-added at noon IST).`,
      totalFetched: fetchedRssArticles.length,
      stored: finalArticles.length,
      sources: [...new Set(finalArticles.map(a => a.source))],
      updatedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('[NEWS-UPDATE] Fatal error:', error.message);
    return res.status(500).json({
      error: 'News update failed.',
      details: error.message
    });
  }
}
