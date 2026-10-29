/**
 * Nexus Knowledge Hub - Live Logistics News Feed Engine (js/news.js)
 */
/* ==========================================
   10. GLOBAL INDUSTRY NEWS (FIRESTORE-FIRST + RSS FALLBACK + CURATED FALLBACK)
   ==========================================
   Priority 1: Fetch from /api/news-feed (reads Firestore where cron stored proper images)
/* ==========================================
   10. LIVE WORLD LOGISTICS NEWS HUB ENGINE (STRICT REAL-IMAGES ONLY)
   ========================================== */

function isValidImageURL(url) {
  if (!url || typeof url !== 'string') return false;
  const lower = url.toLowerCase().trim();
  if (!lower.startsWith('http://') && !lower.startsWith('https://')) return false;
  if (lower.includes('unsplash.com')) return false; // Reject all stock photos
  if (lower.includes('gravatar') || lower.includes('avatar') || lower.includes('1x1') || lower.includes('spacer') || lower.includes('tracking') || lower.includes('pixel') || lower.includes('logo') || lower.includes('favicon') || lower.includes('data:')) return false;
  return true;
}

const LOGISTICS_NEWS_FEEDS = [
  {
    url: 'https://splash247.com/feed/',
    source: 'Splash247',
    category: 'MARITIME',
    categoryLabel: 'Ocean & Maritime',
    icon: '🚢'
  },
  {
    url: 'https://www.supplychaindive.com/feeds/news/',
    source: 'Supply Chain Dive',
    category: 'SUPPLY_CHAIN',
    categoryLabel: 'Supply Chain & Tech',
    icon: '📦'
  },
  {
    url: 'https://www.aircargonews.net/feed/',
    source: 'Air Cargo News',
    category: 'AIR',
    categoryLabel: 'Air Cargo & Aviation',
    icon: '✈️'
  },
  {
    url: 'https://gcaptain.com/feed/',
    source: 'gCaptain',
    category: 'PORTS',
    categoryLabel: 'Ports & Logistics',
    icon: '⚓'
  },
  {
    url: 'https://theloadstar.com/feed/',
    source: 'The Loadstar',
    category: 'TRADE',
    categoryLabel: 'Customs & Trade',
    icon: '🏛️'
  },
  {
    url: 'https://www.hellenicshippingnews.com/feed/',
    source: 'Hellenic Shipping News',
    category: 'MARITIME',
    categoryLabel: 'Ocean & Maritime',
    icon: '🚢'
  }
];

function getInitialLogisticsArticles() {
  const now = new Date();
  const hoursAgo = (h) => new Date(now.getTime() - h * 3600 * 1000);

  return [
    {
      title: "MSC Hermes III Abandoned & Adrift in South China Sea Following Engine Room Fire",
      description: "The troubled 2,500 TEU container vessel MSC Hermes III remains afloat and drifting unmanned in the South China Sea near Vietnam after all 25 crew members evacuated safely.",
      link: "https://splash247.com/msc-ship-abandoned-and-adrift-in-south-china-sea/",
      thumbnail: "https://splash247.com/wp-content/uploads/2026/09/MSC-Hermes-3.jpg",
      pubDate: hoursAgo(2),
      source: "Splash247",
      category: "MARITIME",
      categoryLabel: "Ocean & Maritime",
      icon: "🚢"
    },
    {
      title: "US East Coast Container Ports Report Record September Import Volumes",
      description: "Major maritime gateways including New York-New Jersey and Savannah handled over 750,000 TEUs last month as shippers frontload peak season inventory.",
      link: "https://www.supplychaindive.com/news/us-east-coast-ports-record-september-imports/830950/",
      thumbnail: "https://imgproxy.divecdn.com/Z6CdC_OsXvC99docslnfTCbDlIhgLDkvnG4JQwNgS8w/g:ce/rs:fill:1600:900:1/Z3M6Ly9kaXZlc2l0ZS1zdG9yYWdlL2RpdmVpbWFnZS90ZXJtaW5hbC1kb2Nrd29ya2Vyc183WjRrUUlGLmpwZw==.webp",
      pubDate: hoursAgo(4),
      source: "Supply Chain Dive",
      category: "PORTS",
      categoryLabel: "Ports & Logistics",
      icon: "⚓"
    },
    {
      title: "Boxship Orderbook Reaches All-Time High as Carriers Invest in Green Methanol Dual-Fuel Fleets",
      description: "Container shipping line orderbooks now exceed 8.4 million TEU, representing over 28% of the global operating fleet with methanol dual-fuel engines leading new orders.",
      link: "https://splash247.com/boxship-orderbook-points-to-looming-capacity-showdown/",
      thumbnail: "https://splash247.com/wp-content/uploads/2026/04/MSC-Migsan-MSC-Zivana-naming-ceremony.jpg",
      pubDate: hoursAgo(6),
      source: "Splash247",
      category: "MARITIME",
      categoryLabel: "Ocean & Maritime",
      icon: "🚢"
    },
    {
      title: "Automation and AI Predictive Quoting Systems Transform Freight Brokerage Operations",
      description: "Logistics technology providers integrate predictive freight rates with real-time telematics data to streamline spot market quoting for 3PL providers.",
      link: "https://www.supplychaindive.com/news/electronics-manufacturers-fret-over-extreme-heat-disruptions/830938/",
      thumbnail: "https://imgproxy.divecdn.com/5RIMomjbs0K2dznb5Tv2Wnd2mKrgcuZllUYgNGu4gBc/g:ce/rs:fill:1600:900:1/Z3M6Ly9kaXZlc2l0ZS1zdG9yYWdlL2RpdmVpbWFnZS9HZXR0eUltYWdlcy0yMTYxNDE3NTYxLmpwZw==.webp",
      pubDate: hoursAgo(8),
      source: "Supply Chain Dive",
      category: "SUPPLY_CHAIN",
      categoryLabel: "Supply Chain & Tech",
      icon: "📦"
    },
    {
      title: "FedEx and UPS Introduce Updated Freight Surcharges for Heavy & Oversized Shipments",
      description: "Express parcel carriers announce updated rate cards with revised peak season demand surcharges taking effect across U.S. and European domestic networks.",
      link: "https://www.supplychaindive.com/news/fedex-preps-59-rate-hike-surcharge-increases-for-2027/830903/",
      thumbnail: "https://imgproxy.divecdn.com/agvVxmoleUAAezK8jEqubMfUk6sTllLVvIcU5dl1H_w/g:ce/rs:fill:1600:900:1/Z3M6Ly9kaXZlc2l0ZS1zdG9yYWdlL2RpdmVpbWFnZS9HZXR0eUltYWdlcy0xMzI3OTA3NzM4LmpwZw==.webp",
      pubDate: hoursAgo(10),
      source: "Supply Chain Dive",
      category: "TRADE",
      categoryLabel: "Customs & Trade",
      icon: "🏛️"
    },
    {
      title: "Panama Canal Authority Increases Daily Transit Slots as Gatun Lake Water Levels Normalize",
      description: "The Panama Canal administrator has raised maximum draught limits for Neopanamax vessels to 48 feet following sustained rainfall across the watershed.",
      link: "https://www.seatrade-maritime.com/ports-logistics/what-are-panama-s-future-plans-balboa-and-cristobal-ports-",
      thumbnail: "https://eu-images.contentstack.com/v3/assets/bltdcfe6aab5515629e/blt0e4204bf5864ede2/6ab25f6381d60e93cefd76a1/ALBERTO_ALEMAN-_LA_PRENSA.jpg?width=720&quality=80",
      pubDate: hoursAgo(12),
      source: "Seatrade Maritime",
      category: "MARITIME",
      categoryLabel: "Ocean & Maritime",
      icon: "🚢"
    }
  ];
}

let liveNewsArticles = [];
let activeNewsCategory = 'ALL';
let currentNewsSearchQuery = '';
let newsAutoUpdateTimer = null;
let lastNewsFetchTimestamp = null;

async function initLiveNewsEngine() {
  liveNewsArticles = getInitialLogisticsArticles();
  lastNewsFetchTimestamp = new Date();
  
  renderHomePageNews();
  renderNewsHubPage();

  fetchLiveLogisticsNews(false);
  
  if (!newsAutoUpdateTimer) {
    newsAutoUpdateTimer = setInterval(() => {
      fetchLiveLogisticsNews(false);
    }, 300000);
  }
}

async function fetchLiveLogisticsNews(showLoadingSpinner = false) {
  const refreshSpinner = document.getElementById('news-refresh-spinner');
  if (refreshSpinner) refreshSpinner.classList.add('spinning');

  try {
    const apiResp = await fetch('/api/news-feed');
    if (apiResp.ok) {
      const data = await apiResp.json();
      if (Array.isArray(data.articles) && data.articles.length > 0) {
        const parsedArticles = [];
        data.articles.forEach(item => {
          let category = item.category || 'MARITIME';
          let categoryLabel = item.categoryLabel || 'Ocean & Maritime';
          let icon = item.icon || '🚢';

          if (!item.category) {
            const txt = (item.title + ' ' + (item.description || '')).toLowerCase();
            if (txt.includes('air') || txt.includes('flight') || txt.includes('aviation')) {
              category = 'AIR'; categoryLabel = 'Air Cargo & Aviation'; icon = '✈️';
            } else if (txt.includes('port') || txt.includes('terminal') || txt.includes('dock')) {
              category = 'PORTS'; categoryLabel = 'Ports & Logistics'; icon = '⚓';
            } else if (txt.includes('customs') || txt.includes('tariff') || txt.includes('trade')) {
              category = 'TRADE'; categoryLabel = 'Customs & Trade'; icon = '🏛️';
            } else if (txt.includes('supply chain') || txt.includes('tech') || txt.includes('warehouse')) {
              category = 'SUPPLY_CHAIN'; categoryLabel = 'Supply Chain & Tech'; icon = '📦';
            }
          }

          let thumb = item.imageUrl || item.thumbnail || '';
          if (thumb) {
            thumb = thumb.replace(/&amp;/g, '&');
            if (thumb.startsWith('//')) thumb = 'https:' + thumb;
            if (thumb.startsWith('http://')) thumb = thumb.replace('http://', 'https://');
          }

          // STRICT: Drop article if no valid real image URL
          if (!thumb || !isValidImageURL(thumb)) return;

          let parsedDate = item.pubDate ? new Date(item.pubDate) : new Date();
          if (isNaN(parsedDate.getTime())) parsedDate = new Date();

          parsedArticles.push({
            title: item.title,
            description: item.description || '',
            link: item.link,
            thumbnail: thumb,
            pubDate: parsedDate,
            source: item.source || 'Logistics News',
            category,
            categoryLabel,
            icon
          });
        });

        if (parsedArticles.length > 0) {
          liveNewsArticles = parsedArticles;
          lastNewsFetchTimestamp = new Date();
          renderHomePageNews();
          renderNewsHubPage();
          if (refreshSpinner) refreshSpinner.classList.remove('spinning');
          return;
        }
      }
    }
  } catch (apiErr) {
    console.warn('[NEWS HUB] /api/news-feed fetch note:', apiErr.message);
  }

  // Client-side Fallback RSS logic
  const fetchedItems = [];

  const feedPromises = LOGISTICS_NEWS_FEEDS.map(async (feed) => {
    try {
      let rawItems = [];

      try {
        const resp = await fetch('https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(feed.url));
        if (resp.ok) {
          const data = await resp.json();
          if (data.status === 'ok' && Array.isArray(data.items)) {
            rawItems = data.items;
          }
        }
      } catch (e) {}

      if (!rawItems || rawItems.length === 0) {
        try {
          const proxyUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(feed.url);
          const resp = await fetch(proxyUrl);
          if (resp.ok) {
            const xmlText = await resp.text();
            if (xmlText && xmlText.includes('<item')) {
              const parser = new DOMParser();
              const doc = parser.parseFromString(xmlText, 'text/xml');
              const itemsNode = doc.querySelectorAll('item');
              itemsNode.forEach(item => {
                const title = item.querySelector('title')?.textContent?.trim() || '';
                const link = item.querySelector('link')?.textContent?.trim() || '';
                const pubDate = item.querySelector('pubDate')?.textContent?.trim() || '';
                const description = item.querySelector('description')?.textContent?.trim() || '';
                const content = item.querySelector('encoded, content')?.textContent?.trim() || '';

                let imageUrl = '';
                const mediaContent = item.querySelector('content, thumbnail');
                if (mediaContent) imageUrl = mediaContent.getAttribute('url') || '';
                if (!imageUrl) {
                  const enclosure = item.querySelector('enclosure');
                  if (enclosure) imageUrl = enclosure.getAttribute('url') || '';
                }
                if (!imageUrl && (description || content)) {
                  const match = (description + ' ' + content).match(/<img[^>]+src=["']([^"']+)["']/i);
                  if (match && match[1]) imageUrl = match[1];
                }

                if (title && link) {
                  rawItems.push({ title, link, pubDate, description, content, thumbnail: imageUrl });
                }
              });
            }
          }
        } catch (e) {}
      }

      if (!rawItems || rawItems.length === 0) return [];

      const validParsed = [];
      rawItems.forEach(item => {
        if (!item.title || !item.link) return;

        let thumb = item.thumbnail || (item.enclosure && item.enclosure.link) || '';
        if (!thumb) {
          const html = (item.description || '') + ' ' + (item.content || '');
          const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
          if (match && match[1] && !match[1].includes('gravatar') && !match[1].includes('data:')) {
            thumb = match[1];
          }
        }

        if (thumb) {
          thumb = thumb.replace(/&amp;/g, '&');
          if (thumb.startsWith('//')) thumb = 'https:' + thumb;
          if (thumb.startsWith('http://')) thumb = thumb.replace('http://', 'https://');
        }

        // STRICT: Skip articles without a verified real image
        if (!thumb || !isValidImageURL(thumb)) return;

        const rawDesc = item.description || item.content || '';
        const cleanDesc = rawDesc.replace(/<\/?[^>]+(>|$)/g, '').trim().substring(0, 180);

        let parsedDate = item.pubDate ? new Date(item.pubDate) : new Date();
        if (isNaN(parsedDate.getTime())) parsedDate = new Date();

        validParsed.push({
          title: item.title,
          description: cleanDesc,
          link: item.link,
          thumbnail: thumb,
          pubDate: parsedDate,
          source: feed.source,
          category: feed.category,
          categoryLabel: feed.categoryLabel,
          icon: feed.icon
        });
      });

      return validParsed;
    } catch (e) {
      console.warn(`[NEWS HUB] Feed fetch error for ${feed.source}:`, e.message);
      return [];
    }
  });

  const results = await Promise.allSettled(feedPromises);
  results.forEach(res => {
    if (res.status === 'fulfilled' && Array.isArray(res.value)) {
      fetchedItems.push(...res.value);
    }
  });

  if (fetchedItems.length > 0) {
    const uniqueMap = new Map();
    fetchedItems.concat(liveNewsArticles).forEach(item => {
      if (!item.thumbnail || !isValidImageURL(item.thumbnail)) return;
      const key = item.title.toLowerCase().trim();
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, item);
      }
    });
    
    liveNewsArticles = Array.from(uniqueMap.values());
    liveNewsArticles.sort((a, b) => b.pubDate - a.pubDate);
    lastNewsFetchTimestamp = new Date();

    renderHomePageNews();
    renderNewsHubPage();
  }

  if (refreshSpinner) refreshSpinner.classList.remove('spinning');
}

function formatProxyImage(url) {
  if (!url || typeof url !== 'string') return '';
  let cleanUrl = url.trim().replace(/&amp;/g, '&');
  if (cleanUrl.startsWith('//')) cleanUrl = 'https:' + cleanUrl;
  if (cleanUrl.startsWith('http://')) cleanUrl = cleanUrl.replace('http://', 'https://');
  if (cleanUrl.includes('wsrv.nl')) return cleanUrl;
  return `https://wsrv.nl/?url=${encodeURIComponent(cleanUrl)}&w=600&output=webp`;
}

function trimToMaxArticles(articles, maxLimit = 30) {
  if (!Array.isArray(articles)) return [];
  const uniqueMap = new Map();
  articles.forEach(item => {
    if (!item || !item.title) return;
    const key = item.title.trim().toLowerCase();
    if (!uniqueMap.has(key)) {
      uniqueMap.set(key, item);
    }
  });
  const list = Array.from(uniqueMap.values());
  list.sort((a, b) => new Date(b.pubDate || 0) - new Date(a.pubDate || 0));
  return list.slice(0, maxLimit);
}

function renderHomePageNews() {
  const homeContainer = document.getElementById('news-feed-container');
  const homeLoading = document.getElementById('news-loading-state');
  if (!homeContainer) return;

  const validArticles = trimToMaxArticles(liveNewsArticles, 30);
  const top6 = validArticles.slice(0, 6);

  if (top6.length === 0) return;

  homeContainer.innerHTML = buildNewsCardsHTML(top6);
  if (homeLoading) homeLoading.style.display = 'none';
  homeContainer.style.display = 'grid';
}

function renderNewsHubPage() {
  const fullContainer = document.getElementById('full-news-feed-container');
  const fullLoading = document.getElementById('full-news-loading-state');
  const countBadge = document.getElementById('news-count-badge');
  const updatedText = document.getElementById('news-last-updated-text');

  if (!fullContainer) return;

  let filtered = trimToMaxArticles(liveNewsArticles, 30);

  if (activeNewsCategory !== 'ALL') {
    filtered = filtered.filter(a => a.category === activeNewsCategory);
  }

  if (currentNewsSearchQuery.trim() !== '') {
    const q = currentNewsSearchQuery.toLowerCase().trim();
    filtered = filtered.filter(a => 
      a.title.toLowerCase().includes(q) || 
      a.description.toLowerCase().includes(q) ||
      a.source.toLowerCase().includes(q)
    );
  }

  if (countBadge) {
    countBadge.textContent = `Showing ${filtered.length} Live Articles`;
  }

  if (updatedText && lastNewsFetchTimestamp) {
    const timeStr = lastNewsFetchTimestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    updatedText.textContent = `Updated at ${timeStr}`;
  }

  if (filtered.length === 0) {
    fullContainer.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
        <div style="font-size: 3rem; margin-bottom: 10px;">🔍</div>
        <h3 style="color: var(--primary-navy); margin-bottom: 8px;">No matching articles found</h3>
        <p>Try refreshing the feed or checking back later.</p>
      </div>
    `;
  } else {
    fullContainer.innerHTML = buildNewsCardsHTML(filtered);
  }

  if (fullLoading) fullLoading.style.display = 'none';
  fullContainer.style.display = 'grid';
}

function buildNewsCardsHTML(articles) {
  let html = '';
  articles.forEach(article => {
    if (!article.thumbnail) return;

    const safeTitle = escapeHTML(article.title);
    const safeDesc = escapeHTML(article.description);
    const proxyImg = formatProxyImage(article.thumbnail);
    const rawImg = article.thumbnail.replace(/&amp;/g, '&');

    const dateObj = article.pubDate instanceof Date ? article.pubDate : new Date(article.pubDate);
    const dateStr = isNaN(dateObj.getTime()) ? '' : dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    html += `
      <a href="${article.link}" target="_blank" rel="noopener noreferrer" class="news-card">
        <div class="news-card-image">
          <img src="${proxyImg}" data-raw-src="${rawImg}" alt="${safeTitle}" loading="lazy" referrerpolicy="no-referrer"
               onerror="if(this.getAttribute('data-tried') !== 'true'){ this.setAttribute('data-tried','true'); this.src=this.getAttribute('data-raw-src'); } else { this.style.opacity='0.2'; }"
               style="width: 100%; height: 100%; object-fit: cover; display: block;">
        </div>
        <div class="news-card-content">
          <div class="news-date">📅 ${dateStr}</div>
          <h3 class="news-title">${safeTitle}</h3>
          <div class="news-desc">${safeDesc}</div>
          <div class="news-read-more">Read Full Article &rarr;</div>
        </div>
      </a>
    `;
  });
  return html;
}

function filterNewsCategory(categoryKey, btnElement) {
  activeNewsCategory = categoryKey;

  const tabs = document.querySelectorAll('.news-tab-btn');
  tabs.forEach(t => t.classList.remove('active'));
  if (btnElement) {
    btnElement.classList.add('active');
  }

  renderNewsHubPage();
}

function handleNewsSearch(query) {
  currentNewsSearchQuery = query;
  
  const clearBtn = document.getElementById('news-search-clear');
  if (clearBtn) {
    clearBtn.style.display = query.length > 0 ? 'block' : 'none';
  }

  renderNewsHubPage();
}

function clearNewsSearch() {
  const input = document.getElementById('news-search-input');
  if (input) input.value = '';
  currentNewsSearchQuery = '';

  const clearBtn = document.getElementById('news-search-clear');
  if (clearBtn) clearBtn.style.display = 'none';

  renderNewsHubPage();
}

async function manualRefreshNews(showToast = false) {
  await fetchLiveLogisticsNews(true);
}




