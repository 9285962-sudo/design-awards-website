// 文章详情页
const newsService = require('../../services/news.js');

Page({
  data: {
    articleId: '',
    articleType: 'news',
    title: '',
    category: '',
    date: '',
    author: '',
    cover: '',
    content: '',
    loading: true
  },

  onLoad(options) {
    const { id, type } = options;
    if (id) {
      this.setData({
        articleId: id,
        articleType: type || 'news'
      });
      this.loadArticle(id, type || 'news');
    }
  },

  // 加载文章详情
  async loadArticle(articleId, type) {
    try {
      this.setData({ loading: true });
      
      const article = await newsService.getArticleDetail(articleId, type);
      
      this.setData({
        title: article.title,
        category: article.category,
        date: article.date,
        author: article.author,
        cover: article.cover,
        content: article.content,
        loading: false
      });
      
      // 设置页面标题
      wx.setNavigationBarTitle({
        title: article.title || '文章详情'
      });
      
      // 分享给朋友
      wx.showShareMenu({
        withShareTicket: true,
        menus: ['shareAppMessage', 'shareTimeline']
      });
      
    } catch (err) {
      console.error('加载文章详情失败', err);
      wx.showToast({
        title: '文章加载失败',
        icon: 'none'
      });
      this.setData({ loading: false });
    }
  },

  // 返回列表
  goBack() {
    wx.navigateBack();
  },

  // 分享文章
  onShare() {
    wx.showShareMenu({
      withShareTicket: true
    });
  },

  // 分享到朋友
  onShareAppMessage(res) {
    if (res.from === 'button') {
      console.log('来自页面内转发按钮');
    }
    return {
      title: this.data.title,
      path: `/pages/article/article?id=${this.data.articleId}&type=${this.data.articleType}`,
      imageUrl: this.data.cover || ''
    };
  },

  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: this.data.title,
      query: `id=${this.data.articleId}&type=${this.data.articleType}`,
      imageUrl: this.data.cover || ''
    };
  }
});
