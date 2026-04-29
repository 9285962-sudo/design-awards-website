/**
 * MUSE奖作品图片采集脚本
 * 用途：使用Playwright从MUSE官网采集获奖作品图片
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function scrapeMUSEImage(winnerId, outputPath) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // 访问作品页面
    const url = `https://design.museaward.com/winner-info.php?id=${winnerId}`;
    console.log(`正在访问: ${url}`);

    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

    // 等待图片加载
    await page.waitForTimeout(2000);

    // 查找作品图片
    const imageSelectors = [
      '.winner-image img',
      '.entry-content img',
      '.post-content img',
      'article img',
      'img[src*="/uploads/"]'
    ];

    let imageUrl = null;
    for (const selector of imageSelectors) {
      const img = await page.$(selector);
      if (img) {
        imageUrl = await img.getAttribute('src');
        if (imageUrl && imageUrl.includes('uploads')) {
          break;
        }
      }
    }

    if (imageUrl) {
      console.log(`✅ 找到图片: ${imageUrl}`);

      // 下载图片
      const response = await page.goto(imageUrl, { timeout: 15000 });
      if (response.ok()) {
        const buffer = await response.buffer();
        fs.writeFileSync(outputPath, buffer);
        console.log(`✅ 图片已保存: ${outputPath}`);
        return imageUrl;
      }
    }

    console.log(`❌ 未找到作品图片 (ID: ${winnerId})`);
    return null;

  } catch (error) {
    console.error(`❌ 采集失败 (ID: ${winnerId}):`, error.message);
    return null;
  } finally {
    await browser.close();
  }
}

// 要采集的作品ID
const winners = [
  { id: 36086, name: '光环公园' },
  { id: 36087, name: '清香白酒包装' },
  { id: 36088, name: '百度看见' },
  { id: 36089, name: '日产NX8' }
];

// 创建图片目录
const imageDir = path.join(__dirname, 'images');
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
}

async function main() {
  console.log('🚀 开始采集MUSE奖作品图片...\n');

  for (const winner of winners) {
    const outputPath = path.join(imageDir, `${winner.id}.jpg`);
    const imageUrl = await scrapeMUSEImage(winner.id, outputPath);

    if (imageUrl) {
      console.log(`${winner.name}: ${imageUrl}`);
    }
    console.log('');

    // 间隔2秒，避免请求过快
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log('✨ 采集完成!');
}

main().catch(console.error);
