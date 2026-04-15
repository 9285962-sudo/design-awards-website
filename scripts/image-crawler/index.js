/**
 * 设计作品图片自动采集脚本
 * 使用 Playwright 截取微信公众号文章中的设计作品图片
 */

const { chromium } = require('playwright');
const fs = require('fs').promises;
const path = require('path');

// 配置
const CONFIG = {
  // 输出目录
  outputDir: path.join(__dirname, 'output'),
  // 浏览器配置
  browser: {
    headless: true,
    viewport: { width: 1920, height: 1080 }
  },
  // 截图配置
  screenshot: {
    type: 'jpeg',
    quality: 90,
    fullPage: false
  }
};

/**
 * 确保目录存在
 */
async function ensureDir(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

/**
 * 智能滚动页面，加载所有懒加载图片
 */
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 300;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
  // 等待图片加载
  await page.waitForTimeout(2000);
}

/**
 * 识别文章中的设计作品图片
 * 策略：找大尺寸图片、带alt描述的图片、文章配图
 */
async function findDesignImages(page) {
  const images = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs
      .map(img => ({
        src: img.src,
        alt: img.alt || '',
        width: img.naturalWidth,
        height: img.naturalHeight,
        top: img.getBoundingClientRect().top
      }))
      .filter(img => {
        // 过滤条件：
        // 1. 尺寸大于 400x300（排除小图标）
        // 2. 不是头像/二维码（通过尺寸比例判断）
        const isLarge = img.width > 400 && img.height > 300;
        const isNotAvatar = img.width / img.height > 0.5 && img.width / img.height < 3;
        return isLarge && isNotAvatar;
      })
      .sort((a, b) => a.top - b.top); // 按页面位置排序
  });
  
  return images;
}

/**
 * 截取指定元素的图片
 */
async function captureElement(page, selector, outputPath) {
  const element = await page.locator(selector).first();
  if (await element.isVisible()) {
    await element.screenshot({
      path: outputPath,
      type: CONFIG.screenshot.type,
      quality: CONFIG.screenshot.quality
    });
    return true;
  }
  return false;
}

/**
 * 采集单篇文章的图片
 */
async function captureArticle(browser, articleInfo) {
  const { url, project, award } = articleInfo;
  
  console.log(`\n📄 正在采集: ${project}`);
  console.log(`   URL: ${url}`);
  
  const context = await browser.newContext(CONFIG.browser);
  const page = await context.newPage();
  
  try {
    // 访问页面
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    
    // 等待内容加载
    await page.waitForSelector('img', { timeout: 10000 });
    
    // 自动滚动加载所有图片
    await autoScroll(page);
    
    // 识别设计作品图片
    const designImages = await findDesignImages(page);
    console.log(`   发现 ${designImages.length} 张设计作品图片`);
    
    // 创建项目目录
    const projectDir = path.join(CONFIG.outputDir, 'raw', award || 'uncategorized');
    await ensureDir(projectDir);
    
    const capturedImages = [];
    
    // 截取每张图片
    for (let i = 0; i < Math.min(designImages.length, 10); i++) {
      const img = designImages[i];
      const filename = `${project}_${String(i + 1).padStart(2, '0')}.jpg`;
      const filepath = path.join(projectDir, filename);
      
      try {
        // 滚动到图片位置
        await page.evaluate((top) => window.scrollTo(0, top - 100), img.top);
        await page.waitForTimeout(500);
        
        // 截取图片元素
        const imgSelector = `img[src="${img.src}"]`;
        const success = await captureElement(page, imgSelector, filepath);
        
        if (success) {
          capturedImages.push({
            filename,
            filepath,
            originalSrc: img.src,
            size: `${img.width}x${img.height}`
          });
          console.log(`   ✓ 已保存: ${filename}`);
        }
      } catch (err) {
        console.log(`   ✗ 跳过: ${err.message}`);
      }
    }
    
    await context.close();
    
    return {
      success: true,
      project,
      capturedCount: capturedImages.length,
      images: capturedImages
    };
    
  } catch (error) {
    await context.close();
    console.error(`   ✗ 采集失败: ${error.message}`);
    return {
      success: false,
      project,
      error: error.message
    };
  }
}

/**
 * 批量采集
 */
async function batchCapture(urlList) {
  console.log('🚀 启动图片自动采集...');
  console.log(`📊 共 ${urlList.length} 篇文章待采集\n`);
  
  // 确保输出目录存在
  await ensureDir(path.join(CONFIG.outputDir, 'raw'));
  await ensureDir(path.join(CONFIG.outputDir, 'processed'));
  await ensureDir(path.join(CONFIG.outputDir, 'thumbs'));
  
  // 启动浏览器
  const browser = await chromium.launch({ headless: true });
  
  const results = [];
  
  for (const article of urlList) {
    const result = await captureArticle(browser, article);
    results.push(result);
    
    // 间隔避免被封
    await new Promise(r => setTimeout(r, 2000));
  }
  
  await browser.close();
  
  // 输出统计
  console.log('\n📈 采集完成统计:');
  console.log(`   成功: ${results.filter(r => r.success).length}`);
  console.log(`   失败: ${results.filter(r => !r.success).length}`);
  console.log(`   总图片: ${results.reduce((sum, r) => sum + (r.capturedCount || 0), 0)}`);
  
  // 保存结果报告
  const reportPath = path.join(CONFIG.outputDir, `report_${Date.now()}.json`);
  await fs.writeFile(reportPath, JSON.stringify(results, null, 2));
  console.log(`\n📄 报告已保存: ${reportPath}`);
  
  return results;
}

// 主入口
async function main() {
  // 从命令行参数或文件读取URL列表
  const args = process.argv.slice(2);
  let urlList = [];
  
  if (args[0] === '--file' && args[1]) {
    // 从JSON文件读取
    const data = await fs.readFile(args[1], 'utf-8');
    urlList = JSON.parse(data);
  } else if (args[0] === '--url' && args[1]) {
    // 单篇文章
    urlList = [{
      url: args[1],
      project: args[3] || 'unknown',
      award: args[5] || 'uncategorized'
    }];
  } else {
    // 默认：读取urls目录下的pending文件
    try {
      const data = await fs.readFile(
        path.join(__dirname, 'urls', 'pending-articles.json'),
        'utf-8'
      );
      urlList = JSON.parse(data);
    } catch {
      console.log('❌ 请提供URL列表文件或使用 --url 参数');
      console.log('\n使用示例:');
      console.log('  node index.js --file urls/pending-articles.json');
      console.log('  node index.js --url "https://mp.weixin.qq.com/s/xxx" --project "项目名称" --award "奖项名称"');
      process.exit(1);
    }
  }
  
  await batchCapture(urlList);
}

// 运行
main().catch(console.error);
