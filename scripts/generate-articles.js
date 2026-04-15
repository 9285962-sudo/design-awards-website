/**
 * 自动生成文章HTML页面
 * 根据采集的数据生成网站文章页面
 */

const fs = require('fs').promises;
const path = require('path');

const CONFIG = {
  // 文章模板
  templateDir: path.join(__dirname, '..', 'website', 'preview'),
  // 输出目录
  outputDir: path.join(__dirname, '..', 'website', 'preview', 'articles'),
  // 图片目录
  imageDir: path.join(__dirname, 'image-crawler', 'output', 'raw'),
  // 文章数据
  dataFile: path.join(__dirname, 'image-crawler', 'urls', 'pending-articles.json')
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
 * 生成文章HTML
 */
function generateArticleHTML(article, images) {
  const { project, award, url } = article;
  
  // 生成图片画廊HTML
  const galleryHTML = images.length > 0 
    ? images.map((img, index) => `
        <div class="gallery-image ${index === 0 ? 'main-image' : ''}">
          <img src="../images/cases/${award}/${img}" alt="${project} - 图片${index + 1}">
        </div>
      `).join('')
    : '<div class="gallery-placeholder">暂无图片</div>';

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${project} - ${award}获奖作品 | 国际设计大奖参赛咨询</title>
  <meta name="description" content="${project}荣获${award}，查看完整获奖作品图片和项目详情。专业设计奖项申报服务，助力中国设计师走向世界。">
  <link rel="stylesheet" href="../styles.css">
  <style>
    .article-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    
    .article-header {
      text-align: center;
      margin-bottom: 40px;
    }
    
    .article-header h1 {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 16px;
      line-height: 1.3;
    }
    
    .article-meta {
      display: flex;
      justify-content: center;
      gap: 20px;
      color: #888;
      font-size: 14px;
    }
    
    .award-tag {
      background: linear-gradient(135deg, #D4AF37 0%, #F4E5C2 100%);
      color: #0a0a0a;
      padding: 4px 12px;
      border-radius: 4px;
      font-weight: 600;
    }
    
    .gallery-section {
      margin: 40px 0;
    }
    
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
    }
    
    .gallery-image {
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    }
    
    .gallery-image img {
      width: 100%;
      height: auto;
      display: block;
    }
    
    .gallery-image.main-image {
      grid-column: 1 / -1;
    }
    
    .gallery-placeholder {
      grid-column: 1 / -1;
      background: var(--bg-gray);
      border-radius: 12px;
      padding: 60px;
      text-align: center;
      color: #666;
    }
    
    .article-content {
      font-size: 16px;
      line-height: 1.8;
      color: #ccc;
    }
    
    .article-content h2 {
      color: #fff;
      font-size: 24px;
      margin: 40px 0 20px;
    }
    
    .cta-section {
      background: var(--bg-gray);
      border-radius: 16px;
      padding: 40px;
      margin-top: 60px;
      text-align: center;
    }
    
    .cta-section h3 {
      font-size: 24px;
      margin-bottom: 16px;
    }
    
    .cta-section p {
      color: #888;
      margin-bottom: 24px;
    }
    
    .btn-primary {
      display: inline-block;
      background: linear-gradient(135deg, #D4AF37 0%, #F4E5C2 100%);
      color: #0a0a0a;
      padding: 14px 32px;
      border-radius: 8px;
      font-weight: 600;
      text-decoration: none;
      transition: transform 0.3s;
    }
    
    .btn-primary:hover {
      transform: translateY(-2px);
    }
    
    .source-link {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #333;
      font-size: 14px;
      color: #666;
    }
    
    .source-link a {
      color: #D4AF37;
    }
  </style>
</head>
<body>
  <!-- 导航栏 -->
  <nav class="navbar">
    <div class="container nav-container">
      <a href="../index.html" class="logo">国际设计大奖</a>
      <ul class="nav-links">
        <li><a href="../index.html">首页</a></li>
        <li><a href="../index.html#awards">奖项库</a></li>
        <li><a href="../compare.html">奖项对比</a></li>
        <li><a href="../cases.html">成功案例</a></li>
        <li><a href="../strategies.html">参赛策略</a></li>
        <li><a href="../news.html">赛事新闻</a></li>
        <li><a href="../index.html#contact">联系我们</a></li>
      </ul>
    </div>
  </nav>

  <!-- 文章内容 -->
  <div class="article-container">
    <header class="article-header">
      <h1>${project}</h1>
      <div class="article-meta">
        <span class="award-tag">${award}</span>
        <span>获奖作品</span>
      </div>
    </header>

    <!-- 图片画廊 -->
    <section class="gallery-section">
      <div class="gallery-grid">
        ${galleryHTML}
      </div>
    </section>

    <!-- 文章内容 -->
    <article class="article-content">
      <h2>项目简介</h2>
      <p>${project}荣获${award}，展现了卓越的设计实力和创新精神。</p>
      
      <h2>设计理念</h2>
      <p>该项目在设计中融入了独特的创意和精湛的工艺，体现了设计师对细节的极致追求。</p>
      
      <h2>获奖意义</h2>
      <p>获得${award}是对项目团队专业能力的国际认可，也为更多中国设计力量走向世界舞台树立了标杆。</p>
    </article>

    <!-- CTA转化区 -->
    <section class="cta-section">
      <h3>想让你的作品也获得国际认可？</h3>
      <p>我们提供专业的国际设计奖项申报服务，从选奖策略到材料准备，全程协助，助你斩获国际大奖。</p>
      <a href="../index.html#contact" class="btn-primary">免费咨询申报方案</a>
    </section>

    <!-- 原文链接 -->
    <div class="source-link">
      <p>原文来源：<a href="${url}" target="_blank" rel="noopener">查看微信公众号原文</a></p>
    </div>
  </div>

  <!-- 页脚 -->
  <footer class="footer">
    <div class="container">
      <p>&copy; 2026 国际设计大奖参赛咨询. All rights reserved.</p>
    </div>
  </footer>
</body>
</html>`;
}

/**
 * 主函数
 */
async function main() {
  console.log('📝 开始生成文章页面...\n');
  
  try {
    // 读取文章列表
    const data = await fs.readFile(CONFIG.dataFile, 'utf-8');
    const articles = JSON.parse(data);
    
    // 确保输出目录存在
    await ensureDir(CONFIG.outputDir);
    
    let generatedCount = 0;
    
    for (const article of articles) {
      const { project, award } = article;
      
      // 查找采集的图片
      const awardDir = path.join(CONFIG.imageDir, award);
      let images = [];
      
      try {
        const files = await fs.readdir(awardDir);
        images = files.filter(f => 
          f.startsWith(project) && 
          (f.endsWith('.jpg') || f.endsWith('.png'))
        );
      } catch {
        console.log(`  ⚠️ 未找到图片: ${award}/${project}`);
      }
      
      // 生成HTML
      const html = generateArticleHTML(article, images);
      
      // 保存文件
      const filename = `article-${project.replace(/\s+/g, '-').toLowerCase()}.html`;
      const filepath = path.join(CONFIG.outputDir, filename);
      
      await fs.writeFile(filepath, html, 'utf-8');
      
      console.log(`  ✓ 已生成: ${filename} (${images.length}张图片)`);
      generatedCount++;
    }
    
    console.log(`\n✅ 完成！共生成 ${generatedCount} 篇文章页面`);
    
  } catch (error) {
    console.error('❌ 生成失败:', error.message);
    process.exit(1);
  }
}

// 运行
main();
