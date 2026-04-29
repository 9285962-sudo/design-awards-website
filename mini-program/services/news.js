// 文章数据服务 - 从网站读取文章数据
const app = getApp();

/**
 * 获取新闻列表
 * @returns {Promise<Array>} 文章列表
 */
function getNewsList() {
  return new Promise((resolve, reject) => {
    // 从网站数据文件读取文章列表
    wx.request({
      url: 'https://www.52de.cc/data/news.json',
      success(res) {
        if (res.data && res.data.articles) {
          // 按时间倒序，并补全 cover 绝对路径
          const sorted = res.data.articles
            .map(function(a) {
              return Object.assign({}, a, {
                cover: a.cover ? ('https://www.52de.cc' + a.cover) : ''
              });
            })
            .sort((a, b) => {
              return new Date(b.publishTime) - new Date(a.publishTime);
            });
          resolve(sorted);
        } else {
          resolve([]);
        }
      },
      fail(err) {
        console.error('获取新闻列表失败', err);
        reject(err);
      }
    });
  });
}

/**
 * 获取策略文章列表
 * @returns {Promise<Array>} 文章列表
 */
function getStrategyList() {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://www.52de.cc/data/strategy.json',
      success(res) {
        if (res.data && res.data.articles) {
          const sorted = res.data.articles
            .map(function(a) {
              return Object.assign({}, a, {
                cover: a.cover ? ('https://www.52de.cc' + a.cover) : ''
              });
            })
            .sort((a, b) => {
              return new Date(b.publishTime) - new Date(a.publishTime);
            });
          resolve(sorted);
        } else {
          resolve([]);
        }
      },
      fail(err) {
        console.error('获取策略文章列表失败', err);
        reject(err);
      }
    });
  });
}

/**
 * 获取文章详情
 * @param {string} articleId - 文章ID/slug
 * @param {string} type - 文章类型: 'news' 或 'strategy'
 * @returns {Promise<Object>} 文章详情
 *
 * 注意：直接从JSON列表数据中读取，避免请求含中文路径的HTML页面
 * （Cloudflare Pages会对中文URL返回308重定向，wx.request无法正确跟随）
 */
function getArticleDetail(articleId, type) {
  type = type || 'news';
  const listFn = type === 'strategy' ? getStrategyList : getNewsList;

  return listFn().then(function(articles) {
    const article = articles.find(function(a) {
      return a.id === articleId;
    });

    if (!article) {
      throw new Error('文章不存在: ' + articleId);
    }

    return {
      title: article.title || '',
      category: article.category || '',
      date: article.publishTime || '',
      author: article.author || '',
      cover: article.cover || '',
      content: article.content || ''
    };
  });
}

/**
 * 解析文章HTML内容
 * @param {string} html - 文章HTML
 * @returns {Object} 解析后的文章对象
 */
function parseArticleHtml(html) {
  // 提取标题
  const titleMatch = html.match(/<h1[^>]*>([^<]+)<\/h1>/);
  const title = titleMatch ? titleMatch[1] : '';

  // 提取分类
  const categoryMatch = html.match(/class="article-category"[^>]*>([^<]+)<\/span>/);
  const category = categoryMatch ? categoryMatch[1] : '';

  // 提取日期
  const dateMatch = html.match(/📅\s*([^<]+)</);
  const date = dateMatch ? dateMatch[1] : '';

  // 提取作者
  const authorMatch = html.match(/✍️\s*([^<]+)</);
  const author = authorMatch ? authorMatch[1] : '';

  // 提取封面图
  const coverMatch = html.match(/class="article-cover"[^>]+src="([^"]+)"/);
  const cover = coverMatch ? coverMatch[1] : '';

  // 提取正文内容
  const contentMatch = html.match(/<article class="article-content">([\s\S]*?)<\/article>/);
  const content = contentMatch ? contentMatch[1] : '';

  return {
    title,
    category,
    date,
    author,
    cover,
    content
  };
}

/**
 * 获取所有文章（合并新闻和策略）
 * @returns {Promise<Object>} 合并后的文章数据
 */
async function getAllArticles() {
  try {
    const [newsList, strategyList] = await Promise.all([
      getNewsList(),
      getStrategyList()
    ]);
    
    return {
      news: newsList,
      strategy: strategyList,
      total: newsList.length + strategyList.length
    };
  } catch (err) {
    console.error('获取所有文章失败', err);
    throw err;
  }
}

module.exports = {
  getNewsList,
  getStrategyList,
  getArticleDetail,
  getAllArticles,
  parseArticleHtml
};
