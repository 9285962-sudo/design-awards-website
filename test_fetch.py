import urllib.request, re
from urllib.parse import quote

title = '传统三大奖仍在进化，但评审逻辑正在改变'
encoded_id = quote(title)
url = f'https://www.52de.cc/articles/{encoded_id}.html'
print('URL:', url)

req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, timeout=10) as r:
    html = r.read().decode('utf-8')

print('HTML length:', len(html))

# 测试各正则
patterns = [
    ('<article>', r'<article[^>]*>([\s\S]*?)<\/article>'),
    ('article-content div', r'<div[^>]*class="[^"]*article-content[^"]*"[^>]*>([\s\S]*?)<div[^>]*class="[^"]*footer'),
    ('article div+footer', r'<div[^>]*class="[^"]*article[^"]*"[^>]*>([\s\S]*?)<div[^>]*class="[^"]*(?:footer|sidebar)'),
    ('<body>', r'<body[^>]*>([\s\S]*?)<\/body>'),
]

for name, pat in patterns:
    m = re.search(pat, html, re.I)
    print(f'{name}: match={bool(m)}, len={len(m.group(1)) if m else 0}')
    if m:
        content = re.sub(r'<script[^>]*>[\s\S]*?<\/script>', '', m.group(1), flags=re.I)
        print('前800 chars:')
        print(repr(content[:800]))
        break
