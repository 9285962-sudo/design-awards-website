const fs = require('fs');
const path = require('path');

// 路径配置
const CONTENT_DIR = path.join(__dirname, '../content');
const PUBLIC_DIR = path.join(__dirname, '../public');
const DATA_DIR = path.join(__dirname, '../data');
const PUBLIC_DATA_DIR = path.join(PUBLIC_DIR, 'data');

// 确保目录存在
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// 解析Markdown文件
function parseMarkdown(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const normalizedContent = content.replace(/\r\n/g, '\n');
  const lines = normalizedContent.split('\n');

  let frontmatter = {};
  let bodyStart = 0;

  if (lines[0] === '---') {
    const endIndex = lines.findIndex((line, i) => i > 0 && line === '---');
    if (endIndex > 0) {
      const fmLines = lines.slice(1, endIndex);
      fmLines.forEach(line => {
        const match = line.match(/^(.+?):\s*(.+)$/);
        if (match) {
          frontmatter[match[1].trim()] = match[2].trim();
        }
      });
      bodyStart = endIndex + 1;
    }
  }

  const body = lines.slice(bodyStart).join('\n');
  return { frontmatter, body, fullContent: content };
}

// 提取并处理封面图：复制到 central images 目录，返回相对路径
// imgBaseDir: MD文件所在目录（用于解析相对路径）
// imagesRelativeDir: 图片输出目录相对于 'images/articles/' 的路径，如 '赛事动态/获奖快讯'
function extractFirstImageUrl(markdown, articleDir, imgBaseDir, imagesRelativeDir) {
  const match = markdown.match(/!\[([^\]]*)\]\((.+?)\)/);
  if (!match) {
    return null;
  }

  let imgSrc = match[2];

  // 跳过已经是网络 URL 的图片
  if (imgSrc.startsWith('http://') || imgSrc.startsWith('https://') || imgSrc.startsWith('/')) {
    return imgSrc;
  }

  // 统一把反斜杠转成正斜杠
  let imgPath = imgSrc.replace(/\\/g, '/');

  // 如果是 Windows 绝对路径如 C:/Users/...，直接使用
  if (!imgPath.match(/^[A-Za-z]:\//)) {
    // 相对路径，相对于 MD 文件所在目录解析
    imgPath = path.join(imgBaseDir, imgPath);
  }

  const imgFileName = path.basename(imgPath);

  // 检查图片是否存在
  if (fs.existsSync(imgPath)) {
    // 复制到 central images 目录，而不是文章目录
    const imgOutputDir = path.join(PUBLIC_DIR, 'images', 'articles', imagesRelativeDir);
    ensureDir(imgOutputDir);
    const destPath = path.join(imgOutputDir, imgFileName);
    try {
      fs.copyFileSync(imgPath, destPath);
      // 返回相对于 site root 的路径（以 / 开头）
      return '/images/articles/' + imagesRelativeDir.replace(/\\/g, '/') + '/' + imgFileName;
    } catch (err) {
      console.log('      ⚠️ 封面图复制失败: ' + imgFileName);
      return null;
    }
  } else {
    console.log('      ⚠️ 封面图不存在: ' + imgPath);
    return null;
  }
}

// 自动提取摘要（填满前端3行显示区域，约80-100字）
function extractSummary(body) {
  // 移除图片
  let text = body.replace(/!\[([^\]]*)\]\(.+?\)/g, '');
  // 移除标题标记
  text = text.replace(/^#+\s+/gm, '');
  // 移除链接
  text = text.replace(/\[([^\]]+)\]\(.+?\)/g, '$1');
  // 移除加粗斜体等标记
  text = text.replace(/[*_]{1,3}(.+?)[*_]{1,3}/g, '$1');
  // 移除引用
  text = text.replace(/^>\s*/gm, '');
  // 移除列表标记
  text = text.replace(/^[-*]\s+/gm, '');
  // 移除代码块
  text = text.replace(/```[\s\S]*?```/g, '');
  // 移除单行代码
  text = text.replace(/`[^`]+`/g, '');
  // 移除多余空行
  text = text.replace(/\n+/g, ' ').trim();
  // 移除开头/结尾的标点和空格
  text = text.replace(/^[/，、。：；！?\s]+/, '').trim();
  // 取前120字（中文约60-80字，可填满3行）
  if (text.length > 120) {
    text = text.substring(0, 120) + '...';
  }
  return text;
}

// 处理本地图片：复制到 central images 目录，返回处理后的 Markdown
// imgBaseDir: MD 文件所在目录（用于解析相对路径）
// imagesRelativeDir: 图片输出目录相对于 'images/articles/' 的路径，如 '赛事动态/获奖快讯'
function processLocalImages(markdown, articleDir, imgBaseDir, imagesRelativeDir) {
  let result = markdown;

  // 匹配 Markdown 图片语法（支持反斜杠和正斜杠）
  const imgRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;

  let match;
  while ((match = imgRegex.exec(result)) !== null) {
    const alt = match[1];
    const imgSrc = match[2];

    // 跳过已经是网络 URL 的图片
    if (imgSrc.startsWith('http://') || imgSrc.startsWith('https://') || imgSrc.startsWith('/')) {
      continue;
    }

    // 统一把反斜杠转成正斜杠（Typora 在 Windows 上会自动用反斜杠）
    let imgPath = imgSrc.replace(/\\/g, '/');

    // 如果是 Windows 绝对路径如 C:/Users/...，直接使用
    if (imgPath.match(/^[A-Za-z]:\//)) {
      imgPath = imgPath;
    } else {
      // 相对路径，相对于 MD 文件所在目录解析
      imgPath = path.join(imgBaseDir, imgPath);
    }

    const imgFileName = path.basename(imgPath);

    // 检查图片是否存在
    if (fs.existsSync(imgPath)) {
      // 复制到 central images 目录
      const imgOutputDir = path.join(PUBLIC_DIR, 'images', 'articles', imagesRelativeDir);
      ensureDir(imgOutputDir);
      const destPath = path.join(imgOutputDir, imgFileName);
      try {
        fs.copyFileSync(imgPath, destPath);
        console.log('      📷 复制图片: ' + imgFileName);
        // 替换 Markdown 中的路径为相对于 site root 的路径
        result = result.replace(match[0], '![' + alt + '](/images/articles/' + imagesRelativeDir.replace(/\\/g, '/') + '/' + imgFileName + ')');
      } catch (err) {
        console.log('      ⚠️ 图片复制失败: ' + imgFileName);
      }
    } else {
      console.log('      ⚠️ 图片不存在: ' + imgPath);
      // 移除这张图片的引用
      result = result.replace(match[0], '');
    }
  }

  return result;
}

// Markdown转HTML
function markdownToHtml(markdown) {
  let html = markdown;

  html = html.replace(/\r\n/g, '\n');
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>\n');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>\n');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>\n');
  html = html.replace(/^---+$/gm, '<hr>\n');
  html = html.replace(/^\*\*\*+$/gm, '<hr>\n');
  html = html.replace(/!\[(.*?)\]\((.+?)\)/g,
    '<img src="$2" alt="$1" style="max-width:100%;height:auto;border-radius:8px;margin:16px 0;">');
  html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank">$1</a>');
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/^>\s*(.+)$/gm, '<blockquote>$1</blockquote>');

  const lines = html.split('\n');
  const result = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (/^\s*[-*]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, '<li>').replace(/$/, '</li>'));
        i++;
      }
      result.push('<ul>' + items.join('') + '</ul>');
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, '<li>').replace(/$/, '</li>'));
        i++;
      }
      result.push('<ol>' + items.join('') + '</ol>');
      continue;
    }

    if (line.trim() === '' || line.startsWith('<h') || line.startsWith('<hr') ||
        line.startsWith('<pre') || line.startsWith('<blockquote') || line.startsWith('<ul') ||
        line.startsWith('<ol') || line.startsWith('<img')) {
      if (line.trim() !== '') {
        result.push(line.trim());
      }
      i++;
      continue;
    }

    const paraLines = [];
    while (i < lines.length) {
      const l = lines[i];
      if (l.trim() === '' || l.startsWith('<h') || l.startsWith('<hr') ||
          l.startsWith('<pre') || l.startsWith('<blockquote') || l.startsWith('<ul') ||
          l.startsWith('<ol') || l.startsWith('<img') || /^\s*[-*]\s+/.test(l) ||
          /^\s*\d+\.\s+/.test(l)) {
        break;
      }
      paraLines.push(l.trim());
      i++;
    }

    if (paraLines.length > 0) {
      result.push('<p>' + paraLines.join('<br>') + '</p>');
    }
  }

  return result.join('\n');
}

// 生成文章详情页HTML
// articleCategory: '参赛策略' -> /strategy, '参赛成长' -> /strategy/growth, '荣誉转化' -> /strategy/conversion, 其他 -> /news
function getBackLink(category) {
  if (category === '参赛策略' || category === '参赛成长' || category === '荣誉转化') {
    return '/strategy';
  }
  return '/news';
}

function generateArticleHtml(article) {
  const backLink = getBackLink(article.category);
  const backText = '← 返回文章列表';

  const coverPath = article.cover || '';
  const coverImg = coverPath ? '<img src="' + coverPath + '" alt="封面图" class="article-cover">' : '';

  return '<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>' + article.title + ' | 设计能</title>\n  <meta name="description" content="' + (article.summary || article.title) + '">\n  <style>\n    * { margin: 0; padding: 0; box-sizing: border-box; }\n    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", PingFang SC, Microsoft YaHei, sans-serif; line-height: 1.8; color: #333; background-color: #f5f5f5; }\n    a { text-decoration: none; color: inherit; }\n    .header { background-color: #1A1A1A; padding: 16px 0; position: sticky; top: 0; z-index: 100; }\n    .container { max-width: 800px; margin: 0 auto; padding: 0 24px; }\n    .header-inner { display: flex; justify-content: space-between; align-items: center; }\n    .logo { display: flex; align-items: center; }\n    .logo img { height: 40px; width: auto; }\n    .logo-text { font-size: 20px; font-weight: bold; color: #D4AF37; margin-left: 12px; }\n    .nav-menu { display: flex; list-style: none; gap: 32px; }\n    .nav-menu a { color: #fff; font-size: 14px; opacity: 0.9; }\n    .nav-menu a:hover { opacity: 1; }\n    .article-header { background: linear-gradient(135deg, #1E3A5F 0%, #2d5a8e 100%); padding: 60px 0; text-align: center; color: #fff; }\n    .article-header h1 { font-size: 32px; margin-bottom: 16px; }\n    .article-meta { display: flex; justify-content: center; gap: 24px; font-size: 14px; opacity: 0.9; flex-wrap: wrap; }\n    .article-category { background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 4px; }\n    .article-wrapper { max-width: 900px; margin: 40px auto; padding: 0 24px; }\n    .article-box { background-color: #fff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #e8e8e8; padding: 48px; }\n    .article-cover { width: 100%; max-height: 400px; object-fit: cover; border-radius: 8px; margin-bottom: 32px; display: block; }\n    .article-content h2 { font-size: 24px; color: #1E3A5F; margin: 32px 0 16px; }\n    .article-content h3 { font-size: 20px; color: #1E3A5F; margin: 24px 0 12px; }\n    .article-content p { margin-bottom: 16px; color: #444; line-height: 1.8; }\n    .article-content strong { color: #1E3A5F; }\n    .article-content img { max-width: 100%; height: auto; border-radius: 8px; margin: 16px 0; }\n    .back-link { display: inline-block; margin-bottom: 24px; color: #1E3A5F; }\n    .back-link:hover { text-decoration: underline; }\n    .footer { background-color: #1A1A1A; padding: 32px 0; text-align: center; color: #fff; margin-top: 60px; }\n    .footer p { font-size: 14px; margin-bottom: 8px; }\n    @media (max-width: 768px) {\n      .nav-menu { display: none; }\n      .header-inner { justify-content: center; }\n      .article-header h1 { font-size: 24px; }\n      .article-box { padding: 32px 16px; }\n      .article-cover { max-height: 200px; }\n    }\n  </style>\n</head>\n<body>\n  <header class="header">\n    <div class="container" style="max-width: 1200px;">\n      <div class="header-inner">\n        <a href="/" class="logo">\n          <img src="/设计能LOGO透明文件.png" alt="设计能">\n          <span class="logo-text">国际设计大奖策略咨询平台</span>\n        </a>\n        <nav class="nav-menu">\n          <a href="/">首页</a>\n          <a href="/awards">奖项库</a>\n          <a href="/compare">奖项对比</a>\n          <a href="/services">申报服务</a>\n          <a href="/strategy">参赛策略</a>\n          <a href="/news">赛事新闻</a>\n          <a href="/about">关于我们</a>\n        </nav>\n      </div>\n    </div>\n  </header>\n\n  <header class="article-header">\n    <div class="container">\n      <h1>' + article.title + '</h1>\n      <div class="article-meta">\n        <span class="article-category">' + article.category + '</span>\n        <span>📅 ' + article.date + '</span>\n        <span>✍️ ' + article.author + '</span>\n      </div>\n    </div>\n  </header>\n\n  <div class="article-wrapper">\n    <div class="article-box">\n      <a href="' + backLink + '" class="back-link">' + backText + '</a>\n      ' + coverImg + '\n      <article class="article-content">\n        ' + article.body + '\n      </article>\n    </div>\n  </div>\n\n  <footer class="footer">\n    <div class="container">\n      <p>© 2026 设计能—国际设计大奖申报指南 | www.52de.cc</p>\n    </div>\n  </footer>\n</body>\n</html>';
}

// 按二级栏目构建（扫描直接放在二级目录下的 .md 文件）
async function buildSecondLevelCategory(parentName, level2Dir) {
  const files = fs.readdirSync(level2Dir)
    .filter(function(f) { return f.endsWith('.md'); })
    .sort().reverse();

  if (files.length === 0) {
    return [];
  }

  const articles = [];

  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var filePath = path.join(level2Dir, file);
    var parsed = parseMarkdown(filePath);
    var frontmatter = parsed.frontmatter;
    let body = parsed.body;

    var slug = path.join(parentName, file.replace(/\.md$/, '')).replace(/\\/g, '/');
    var title = frontmatter.title || parsed.body.match(/^#\s+(.+)$/m)?.[1] || file.replace(/\.md$/, '');
    var date = frontmatter.date || parsed.body.match(/^\d{4}-\d{2}-\d{2}/)?.[0] || '2026-01-01';
    var author = frontmatter.author || '设计能';
    var summary = frontmatter.summary || frontmatter.description || extractSummary(body);

    console.log('    📄 ' + title);

    // 输出到二级目录
    var outputDir = path.join(PUBLIC_DIR, 'articles', parentName);
    ensureDir(outputDir);

    // 图片输出到 central images 目录，路径如 '赛事动态'
    var imagesRelativeDir = parentName;

    // 先处理本地图片（复制到 central images 目录），再提取封面图
    body = processLocalImages(body, outputDir, level2Dir, imagesRelativeDir);
    var cover = extractFirstImageUrl(body, outputDir, level2Dir, imagesRelativeDir);
    if (cover) {
      console.log('      🖼 封面图: ' + cover.split('/').pop());
    }

    var htmlBody = markdownToHtml(body);

    var article = {
      slug: slug,
      title: title,
      category: parentName,
      date: date,
      author: author,
      summary: summary,
      cover: cover,
      featured: (i === 0),
      body: htmlBody
    };

    articles.push({
      id: slug,
      title: title,
      category: parentName,
      publishTime: date,
      author: author,
      summary: summary,
      cover: cover,
      featured: (i === 0),
      content: article.body
    });

    // 输出到二级目录
    var outputDir = path.join(PUBLIC_DIR, 'articles', parentName);
    ensureDir(outputDir);
    var articleHtml = generateArticleHtml(article);
    fs.writeFileSync(path.join(outputDir, file.replace(/\.md$/, '') + '.html'), articleHtml);
    console.log('      ✅ 生成详情页');
  }

  console.log('    ✓ ' + parentName + '(根目录): ' + articles.length + ' 篇');
  return articles;
}

// 按三级栏目构建文章
async function buildThirdLevelCategory(parentName, childName, categoryDir) {
  const category = childName;  // 三级文件夹名 = 分类

  if (!fs.existsSync(categoryDir)) {
    return [];
  }

  const files = fs.readdirSync(categoryDir)
    .filter(function(f) { return f.endsWith('.md'); })
    .sort().reverse();

  if (files.length === 0) {
    return [];
  }

  const articles = [];

  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var filePath = path.join(categoryDir, file);
    var parsed = parseMarkdown(filePath);
    var frontmatter = parsed.frontmatter;
    let body = parsed.body;

    var slug = path.join(parentName, childName, file.replace(/\.md$/, '')).replace(/\\/g, '/');
    var title = frontmatter.title || parsed.body.match(/^#\s+(.+)$/m)?.[1] || file.replace(/\.md$/, '');
    var date = frontmatter.date || parsed.body.match(/^\d{4}-\d{2}-\d{2}/)?.[0] || '2026-01-01';
    var author = frontmatter.author || '设计能';
    var summary = frontmatter.summary || frontmatter.description || extractSummary(body);

    console.log('    📄 ' + title);

    // 输出到对应的三级目录
    var outputDir = path.join(PUBLIC_DIR, 'articles', parentName, childName);
    ensureDir(outputDir);

    // 图片输出到 central images 目录，路径如 '赛事动态/获奖快讯'
    var imagesRelativeDir = path.join(parentName, childName);

    // 处理本地图片，复制到 central images 目录
    body = processLocalImages(body, outputDir, categoryDir, imagesRelativeDir);

    // 提取第一张图作为封面图（使用已处理后的body和正确的目录）
    var cover = extractFirstImageUrl(body, outputDir, categoryDir, imagesRelativeDir);
    if (cover) {
      console.log('      🖼 封面图: ' + cover.split('/').pop());
    }

    var htmlBody = markdownToHtml(body);

    var article = {
      slug: slug,
      title: title,
      category: category,
      date: date,
      author: author,
      summary: summary,
      cover: cover,
      featured: (i === 0),
      body: htmlBody
    };

    articles.push({
      id: slug,
      title: title,
      category: category,
      publishTime: date,
      author: author,
      summary: summary,
      cover: cover,
      featured: (i === 0),
      content: article.body
    });

    // 输出到对应的三级目录
    var articleHtml = generateArticleHtml(article);
    fs.writeFileSync(path.join(outputDir, file.replace(/\.md$/, '') + '.html'), articleHtml);
    console.log('      ✅ 生成详情页');
  }

  console.log('    ✓ ' + childName + ': ' + articles.length + ' 篇');
  return articles;
}

// 同步奖项数据
function syncAwardsData() {
  console.log('\n🏆 同步奖项数据...');

  var srcPath = path.join(DATA_DIR, 'awards.json');
  var destPath = path.join(PUBLIC_DATA_DIR, 'awards.json');

  ensureDir(PUBLIC_DATA_DIR);

  if (!fs.existsSync(srcPath)) {
    console.log('  ⚠ data/awards.json 不存在，跳过同步');
    return;
  }

  var awards = JSON.parse(fs.readFileSync(srcPath, 'utf8'));
  fs.writeFileSync(destPath, JSON.stringify(awards, null, 2));
  console.log('  ✓ 奖项数据同步完成: ' + awards.length + ' 个奖项');
}

// 主函数
async function build() {
  console.log('🚀 开始构建文章...');
  console.log('========================');

  ensureDir(CONTENT_DIR);
  ensureDir(PUBLIC_DATA_DIR);

  const allArticles = [];

  // 扫描二级栏目（content 下的文件夹）
  const level2Dirs = fs.readdirSync(CONTENT_DIR)
    .filter(function(f) {
      const fullPath = path.join(CONTENT_DIR, f);
      return fs.statSync(fullPath).isDirectory();
    })
    .sort();

  console.log('📁 发现 ' + level2Dirs.length + ' 个二级栏目: ' + level2Dirs.join(', '));

  for (var i = 0; i < level2Dirs.length; i++) {
    var level2 = level2Dirs[i];
    var level2Dir = path.join(CONTENT_DIR, level2);

    console.log('\n📂 【' + level2 + '】');

    // 先扫描二级目录下直接的 .md 文件
    var level2Articles = await buildSecondLevelCategory(level2, level2Dir);
    allArticles.push(...level2Articles);

    // 扫描三级栏目（level2 下的文件夹）
    const level3Dirs = fs.readdirSync(level2Dir)
      .filter(function(f) {
        const fullPath = path.join(level2Dir, f);
        return fs.statSync(fullPath).isDirectory();
      })
      .sort();

    if (level3Dirs.length === 0) {
      console.log('  ℹ 无三级栏目');
    } else {
      console.log('  发现 ' + level3Dirs.length + ' 个三级栏目: ' + level3Dirs.join(', '));

      for (var j = 0; j < level3Dirs.length; j++) {
        var level3 = level3Dirs[j];
        var level3Dir = path.join(level2Dir, level3);
        var articles = await buildThirdLevelCategory(level2, level3, level3Dir);
        allArticles.push(...articles);
      }
    }
  }

  // 按日期排序
  allArticles.sort(function(a, b) { return new Date(b.publishTime) - new Date(a.publishTime); });

  // 确保最新一篇为featured
  if (allArticles.length > 0) {
    allArticles.forEach(function(a, idx) {
      a.featured = (idx === 0);
    });
  }

  // 生成统一的文章数据
  const articlesJsonPath = path.join(DATA_DIR, 'articles.json');
  const publicArticlesJsonPath = path.join(PUBLIC_DATA_DIR, 'articles.json');
  const articlesData = {
    updatedAt: new Date().toISOString().split('T')[0],
    articles: allArticles
  };
  fs.writeFileSync(articlesJsonPath, JSON.stringify(articlesData, null, 2));
  fs.copyFileSync(articlesJsonPath, publicArticlesJsonPath);

  // 生成 news.json（赛事动态 + 三级栏目如获奖快讯、报名通知等）
  const newsArticles = allArticles.filter(a => 
    a.category === '赛事动态' || a.category === '获奖快讯' || 
    a.category === '报名通知' || a.category === '赛事动态'
  );
  const newsData = { updatedAt: new Date().toISOString().split('T')[0], articles: newsArticles };
  fs.writeFileSync(path.join(DATA_DIR, 'news.json'), JSON.stringify(newsData, null, 2));
  fs.writeFileSync(path.join(PUBLIC_DATA_DIR, 'news.json'), JSON.stringify(newsData, null, 2));

  // 生成 strategy.json（参赛策略 + 三级栏目）
  const strategyArticles = allArticles.filter(a => 
    a.category === '参赛策略' || a.category === '参赛策略' ||
    a.category === '参赛成长' || a.category === '荣誉转化'
  );
  const strategyData = { updatedAt: new Date().toISOString().split('T')[0], articles: strategyArticles };
  fs.writeFileSync(path.join(DATA_DIR, 'strategy.json'), JSON.stringify(strategyData, null, 2));
  fs.writeFileSync(path.join(PUBLIC_DATA_DIR, 'strategy.json'), JSON.stringify(strategyData, null, 2));

  syncAwardsData();

  console.log('\n========================');
  console.log('✅ 全部构建完成！');
  console.log('📊 共 ' + allArticles.length + ' 篇文章');
  console.log('\n💡 提示: 运行 npm run build && npx wrangler pages deploy out --branch=main 进行部署');
}

build().catch(function(err) {
  console.error('❌ 构建失败:', err.message);
  process.exit(1);
});
