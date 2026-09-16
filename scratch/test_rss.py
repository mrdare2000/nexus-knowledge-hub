import urllib.request
import urllib.parse
import json
import re

feeds = [
    'https://www.freightwaves.com/feed',
    'https://gcaptain.com/feed/',
    'https://theloadstar.com/feed/',
    'https://www.supplychaindive.com/feeds/news/',
    'https://www.hellenicshippingnews.com/feed/'
]

for f in feeds:
    u = 'https://api.rss2json.com/v1/api.json?rss_url=' + urllib.parse.quote(f)
    try:
        req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0'})
        res = urllib.request.urlopen(req, timeout=10)
        data = json.loads(res.read().decode('utf-8'))
        print('=== Feed:', f, 'Status:', data.get('status'))
        items = data.get('items', [])
        for i in items[:3]:
            img = i.get('thumbnail') or (i.get('enclosure') or {}).get('link')
            if not img:
                html = (i.get('content') or '') + ' ' + (i.get('description') or '')
                m = re.search(r'<img[^>]+src=["\']([^"\']+)["\']', html, re.IGNORECASE)
                if m:
                    img = m.group(1)
            print('  Title:', i.get('title')[:45] if i.get('title') else 'N/A')
            print('  Img:', img or 'NONE')
    except Exception as e:
        print('=== Feed Error:', f, e)
