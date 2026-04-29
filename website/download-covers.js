const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const covers = [
  {
    name: 'cover_1.jpg',
    url: 'https://mmbiz.qpic.cn/sz_mmbiz_jpg/EkGl7icics2oMc66icf0HqSJUE1hQQed6F2VoKoC7ibtjEU0PsMNNBItygvcZqUPewUCBu21XtUvwcC2ibREEWpMPT0teEwVZWe8RNIsweJibjmtk/640?wx_fmt=webp&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1'
  },
  {
    name: 'cover_3.jpg',
    url: 'https://mmbiz.qpic.cn/mmbiz_jpg/EkGl7icics2oMc66icf0HqSJUE1hQQed6F2VoKoC7ibtjEU0PsMNNBItygvcZqUPewUCBu21XtUvwcC2ibREEWpMPT0teEwVZWe8RNIsweJibjmtk/640?wx_fmt=webp'
  },
  {
    name: 'cover_4.jpg',
    url: 'https://mmbiz.qpic.cn/mmbiz_jpg/EkGl7icics2oMc66icf0HqSJUE1hQQed6F2VoKoC7ibtjEU0PsMNNBItygvcZqUPewUCBu21XtUvwcC2ibREEWpMPT0teEwVZWe8RNIsweJibjmtk/640?wx_fmt=webp'
  },
  {
    name: 'cover_5.png',
    url: 'https://mmbiz.qpic.cn/sz_mmbiz_png/EkGl7icics2oMUMicX5qK52d6KTDxb62aCNe4TAITZia9ePUYHm35tTBa4QO9LH3X2n74s1Brt4J2nJ5cY5v99gsYOARVIA52C72f1sicS6E8iaoc/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1'
  },
  {
    name: 'cover_6.jpg',
    url: 'https://mmbiz.qpic.cn/mmbiz_jpg/EkGl7icics2oMc66icf0HqSJUE1hQQed6F2VoKoC7ibtjEU0PsMNNBItygvcZqUPewUCBu21XtUvwcC2ibREEWpMPT0teEwVZWe8RNIsweJibjmtk/640?wx_fmt=webp'
  },
  {
    name: 'cover_7.jpg',
    url: 'https://mmbiz.qpic.cn/mmbiz_jpg/EkGl7icics2oMc66icf0HqSJUE1hQQed6F2VoKoC7ibtjEU0PsMNNBItygvcZqUPewUCBu21XtUvwcC2ibREEWpMPT0teEwVZWe8RNIsweJibjmtk/640?wx_fmt=webp'
  },
  {
    name: 'cover_8.jpg',
    url: 'https://mmbiz.qpic.cn/mmbiz_jpg/EkGl7icics2oMc66icf0HqSJUE1hQQed6F2VoKoC7ibtjEU0PsMNNBItygvcZqUPewUCBu21XtUvwcC2ibREEWpMPT0teEwVZWe8RNIsweJibjmtk/640?wx_fmt=webp'
  },
  {
    name: 'cover_9.jpg',
    url: 'https://mmbiz.qpic.cn/mmbiz_jpg/EkGl7icics2oMc66icf0HqSJUE1hQQed6F2VoKoC7ibtjEU0PsMNNBItygvcZqUPewUCBu21XtUvwcC2ibREEWpMPT0teEwVZWe8RNIsweJibjmtk/640?wx_fmt=webp'
  },
  {
    name: 'cover_10.jpg',
    url: 'https://mmbiz.qpic.cn/mmbiz_jpg/EkGl7icics2oMc66icf0HqSJUE1hQQed6F2VoKoC7ibtjEU0PsMNNBItygvcZqUPewUCBu21XtUvwcC2ibREEWpMPT0teEwVZWe8RNIsweJibjmtk/640?wx_fmt=webp'
  },
  {
    name: 'cover_11.jpg',
    url: 'https://mmbiz.qpic.cn/mmbiz_jpg/EkGl7icics2oMc66icf0HqSJUE1hQQed6F2VoKoC7ibtjEU0PsMNNBItygvcZqUPewUCBu21XtUvwcC2ibREEWpMPT0teEwVZWe8RNIsweJibjmtk/640?wx_fmt=webp'
  },
  {
    name: 'cover_13.jpg',
    url: 'https://mmbiz.qpic.cn/mmbiz_jpg/EkGl7icics2oMc66icf0HqSJUE1hQQed6F2VoKoC7ibtjEU0PsMNNBItygvcZqUPewUCBu21XtUvwcC2ibREEWpMPT0teEwVZWe8RNIsweJibjmtk/640?wx_fmt=webp'
  },
  {
    name: 'cover_14.jpg',
    url: 'https://mmbiz.qpic.cn/mmbiz_jpg/EkGl7icics2oMc66icf0HqSJUE1hQQed6F2VoKoC7ibtjEU0PsMNNBItygvcZqUPewUCBu21XtUvwcC2ibREEWpMPT0teEwVZWe8RNIsweJibjmtk/640?wx_fmt=webp'
  },
  {
    name: 'cover_15.jpg',
    url: 'https://mmbiz.qpic.cn/mmbiz_jpg/EkGl7icics2oMc66icf0HqSJUE1hQQed6F2VoKoC7ibtjEU0PsMNNBItygvcZqUPewUCBu21XtUvwcC2ibREEWpMPT0teEwVZWe8RNIsweJibjmtk/640?wx_fmt=webp'
  }
];

const saveDir = path.join(__dirname, 'public', 'images', 'articles', 'covers');
if (!fs.existsSync(saveDir)) {
  fs.mkdirSync(saveDir, { recursive: true });
}

let completed = 0;
covers.forEach((cover, index) => {
  const filePath = path.join(saveDir, cover.name);
  
  // Check if already downloaded and valid
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    if (stats.size > 5000) {
      console.log(`✓ ${cover.name} already exists (${stats.size} bytes) - skipping`);
      completed++;
      if (completed === covers.length) process.exit(0);
      return;
    }
  }
  
  console.log(`Downloading ${cover.name}...`);
  
  const file = fs.createWriteStream(filePath);
  
  const lib = cover.url.startsWith('https') ? https : http;
  
  const req = lib.get(cover.url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Referer': 'https://mp.weixin.qq.com/',
      'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8'
    }
  }, (response) => {
    if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
      // Follow redirect
      const redirectUrl = response.headers.location;
      console.log(`  Redirect to: ${redirectUrl.substring(0, 80)}...`);
      
      const lib2 = redirectUrl.startsWith('https') ? https : http;
      lib2.get(redirectUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Referer': 'https://mp.weixin.qq.com/'
        }
      }, (res2) => {
        res2.pipe(file);
        file.on('finish', () => {
          file.close();
          const size = fs.statSync(filePath).size;
          console.log(`✓ ${cover.name} downloaded (${size} bytes)`);
          completed++;
          if (completed === covers.length) process.exit(0);
        });
      }).on('error', (err) => {
        console.error(`✗ ${cover.name} error: ${err.message}`);
        completed++;
        if (completed === covers.length) process.exit(0);
      });
    } else {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        const size = fs.statSync(filePath).size;
        console.log(`✓ ${cover.name} downloaded (${size} bytes)`);
        completed++;
        if (completed === covers.length) process.exit(0);
      });
    }
  });
  
  req.on('error', (err) => {
    console.error(`✗ ${cover.name} error: ${err.message}`);
    completed++;
    if (completed === covers.length) process.exit(0);
  });
});

// Timeout after 60 seconds
setTimeout(() => {
  console.log('\nDownload timed out. Some images may not have been downloaded.');
  process.exit(1);
}, 60000);
