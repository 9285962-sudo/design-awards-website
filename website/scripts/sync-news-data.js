/**
 * 同步文章数据到 Next.js 页面
 * 读取 data/news-articles.json，更新 pages/news/index.js
 */

const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, '..', 'data', 'news-articles.json');
const pageFile = path.join(__dirname, '..', 'pages', 'news', 'index.js');

// 读取文章数据
try {
  const jsonData = fs.readFileSync(dataFile, 'utf-8');
  const articles = JSON.parse(jsonData);
  
  // 生成数据数组代码
  const articlesCode = articles.map(article => {
    return `  {
    id: '${article.id}',
    title: '${article.title.replace(/'/g, "\\'")}',
    category: '${article.category}',
    publishTime: '${article.publishTime}',
    author: '${article.author}',
    summary: '${article.summary.replace(/'/g, "\\'").substring(0, 100)}...'
  }`;
  }).join(',\n');

  // 读取当前页面文件
  let pageContent = fs.readFileSync(pageFile, 'utf-8');
  
  // 替换数据数组
  const newDataSection = `// 文章数据
const newsData = [\n${articlesCode}\n]`;
  
  pageContent = pageContent.replace(
    /\/\/ 文章数据[\s\S]*?const newsData = \[[\s\S]*?\];/,
    newDataSection
  );
  
  // 写回文件
  fs.writeFileSync(pageFile, pageContent, 'utf-8');
  
  console.log(`✓ 已同步 ${articles.length} 篇文章到新闻页面`);
} catch (error) {
  console.error('同步失败:', error.message);
  process.exit(1);
}
