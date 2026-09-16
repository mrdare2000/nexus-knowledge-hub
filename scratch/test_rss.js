const https = require('https');

const FEEDS = [
  'https://www.freightwaves.com/feed',
  'https://gcaptain.com/feed/',
  'https://theloadstar.com/feed/',
  'https://www.supplychaindive.com/feeds/news/',
  'https://www.hellenicshippingnews.com/feed/'
];

FEEDS.forEach(feedUrl => {
  const url = 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(feedUrl);
  https.get(url, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      try {
        const json = JSON.parse(body);
        console.log('=== Feed:', feedUrl, 'Status:', json.status);
        if (json.items) {
          json.items.slice(0, 2).forEach(i => {
            let img = i.thumbnail || (i.enclosure && i.enclosure.link);
            if (!img) {
              const html = (i.content || '') + (i.description || '');
              const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
              if (m) img = m[1];
            }
            console.log('  Title:', i.title ? i.title.substring(0, 50) : 'N/A');
            console.log('  Found Image:', img || 'NO IMAGE FOUND');
          });
        }
      } catch(e) { console.error('Error parsing:', e.message); }
    });
  });
});
