const https = require('https');
const fs = require('fs');
const path = require('path');

const coversDir = path.join(__dirname, 'public/images/articles/covers');

// 唯一的公众号图片URL（已去重）
const uniqueUrls = [
  { url: 'https://mmbiz.qpic.cn/mmbiz_jpg/EkGl7icics2oMc66icf0HqSJUE1hQQed6F2VoKoC7ibtjEU0PsMNNBItygvcZqUPewUCBu21XtUvwcC2ibREEWpMPT0teEwVZWe8RNIsweJibjmtk/640', filename: 'cover_1.jpg' },
  { url: 'https://mmbiz.qpic.cn/mmbiz_jpg/EkGl7icics2oMc66icf0HqSJUE1hQQed6F2VoKoC7ibtjEU0PsMNNBItygvcZqUPewUCBu21XtUvwcC2ibREEWpMPT0teEwVZWe8RNIsweJibjmtk/640?wx_fmt=webp', filename: 'cover_4.png' },
];

// 文章封面图URL映射
const articleCovers = [
  { title: '中国设计大满贯', url: 'https://mmbiz.qpic.cn/mmbiz_jpg/EkGl7icics2oMc66icf0HqSJUE1hQQed6F2VoKoC7ibtjEU0PsMNNBItygvcZqUPewUCBu21XtUvwcC2ibREEWpMPT0teEwVZWe8RNIsweJibjmtk/640' },
  { title: 'MUSE设计奖第一季', url: 'https://mmbiz.qpic.cn/mmbiz_jpg/EkGl7icics2oMc66icf0HqSJUE1hQQed6F2VoKoC7ibtjEU0PsMNNBItygvcZqUPewUCBu21XtUvwcC2ibREEWpMPT0teEwVZWe8RNIsweJibjmtk/640' },
  { title: '广州南沙邮轮码头', url: 'https://mmbiz.qpic.cn/mmbiz_jpg/EkGl7icics2oMc66icf0HqSJUE1hQQed6F2VoKoC7ibtjEU0PsMNNBItygvcZqUPewUCBu21XtUvwcC2ibREEWpMPT0teEwVZWe8RNIsweJibjmtk/640' },
  { title: '小红书2026年度居住趋势', url: 'https://mmbiz.qpic.cn/mmbiz_jpg/EkGl7icics2oMc66icf0HqSJUE1hQQed6F2VoKoC7ibtjEU0PsMNNBItygvcZqUPewUCBu21XtUvwcC2ibREEWpMPT0teEwVZWe8RNIsweJibjmtk/640' },
  { title: '中国设计大满贯', url: 'https://mmbiz.qpic.cn/mmbiz_jpg/EkGl7icics2oMc66icf0HqSJUE1hQQed6F2VoKoC7ibtjEU0PsMNNBItygvcZqUPewUCBu21XtUvwcC2ibREEWpMPT0teEwVZWe8RNIsweJibjmtk/640' },
  { title: '那些看起来不惊艳的设计', url: 'https://mmbiz.qpic.cn/mmbiz_jpg/EkGl7icics2oMc66icf0HqSJUE1hQQed6F2VoKoC7ibtjEU0PsMNNBItygvcZqUPewUCBu21XtUvwcC2ibREEWpMPT0teEwVZWe8RNIsweJibjmtk/640' },
  { title: '2026年国际设计奖项星图', url: 'https://mmbiz.qpic.cn/mmbiz_jpg/EkGl7icics2oMc66icf0HqSJUE1hQQed6F2VoKoC7ibtjEU0PsMNNBItygvcZqUPewUCBu21XtUvwcC2ibREEWpMPT0teEwVZWe8RNIsweJibjmtk/640' },
  { title: '从IF奖到戴森设计奖', url: 'https://mmbiz.qpic.cn/mmbiz_jpg/EkGl7icics2oMc66icf0HqSJUE1hQQed6F2VoKoC7ibtjEU0PsMNNBItygvcZqUPewUCBu21XtUvwcC2ibREEWpMPT0teEwVZWe8RNIsweJibjmtk/640' },
  { title: '中国设计师拿奖变容易了吗', url: 'https://mmbiz.qpic.cn/mmbiz_jpg/EkGl7icics2oMc66icf0HqSJUE1hQQed6F2VoKoC7ibtjEU0PsMNNBItygvcZqUPewUCBu21XtUvwcC2ibREEWpMPT0teEwVZWe8RNIsweJibjmtk/640' },
  { title: '设计公司真正的竞争力', url: 'https://mmbiz.qpic.cn/mmbiz_jpg/EkGl7icics2oMc66icf0HqSJUE1hQQed6F2VoKoC7ibtjEU0PsMNNBItygvcZqUPewUCBu21XtUvwcC2ibREEWpMPT0teEwVZWe8RNIsweJibjmtk/640' },
  { title: '设计师最容易自我感动', url: 'https://mmbiz.qpic.cn/mmbiz_jpg/EkGl7icics2oMc66icf0HqSJUE1hQQed6F2VoKoC7ibtjEU0PsMNNBItygvcZqUPewUCBu21XtUvwcC2ibREEWpMPT0teEwVZWe8RNIsweJibjmtk/640' },
  { title: '传统三大奖进化', url: 'https://mmbiz.qpic.cn/mmbiz_jpg/EkGl7icics2oMc66icf0HqSJUE1hQQed6F2VoKoC7ibtjEU0PsMNNBItygvcZqUPewUCBu21XtUvwcC2ibREEWpMPT0teEwVZWe8RNIsweJibjmtk/640' },
];

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(coversDir, filename);
    const file = fs.createWriteStream(filePath);
    
    console.log(`下载: ${filename}`);
    
    https.get(url, (response) => {
      // 处理重定向
      if (response.statusCode === 301 || response.statusCode === 302) {
        console.log(`  重定向到: ${response.headers.location}`);
        file.close();
        downloadImage(response.headers.location, filename).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        file.close();
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        const stats = fs.statSync(filePath);
        console.log(`  完成: ${filename} (${stats.size} bytes)`);
        resolve();
      });
    }).on('error', (err) => {
      file.close();
      fs.unlink(filePath, () => {});
      reject(err);
    });
  });
}

async function main() {
  // 确保目录存在
  if (!fs.existsSync(coversDir)) {
    fs.mkdirSync(coversDir, { recursive: true });
  }
  
  // 为每篇文章下载封面图（使用不同的文件名）
  for (let i = 0; i < articleCovers.length; i++) {
    const article = articleCovers[i];
    const filename = `cover_${i + 1}.jpg`;
    try {
      await downloadImage(article.url, filename);
    } catch (err) {
      console.error(`  失败: ${article.title} - ${err.message}`);
    }
  }
  
  console.log('\n下载完成!');
}

main();
