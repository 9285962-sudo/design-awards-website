// 新闻文章列表页
const newsService = require('../../services/news.js');

Page({
  data: {
    currentTab: 'news',  // 'news' 或 'strategy'
    articles: [],
    loading: true
  },

  onLoad() {
    this.loadArticles();
  },

  onShow() {
    // 每次显示时刷新数据
    this.loadArticles();
  },

  // 切换Tab
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    if (tab === this.data.currentTab) return;
    
    this.setData({ 
      currentTab: tab,
      loading: true
    });
    this.loadArticles();
  },

  // 加载文章列表
  async loadArticles() {
    try {
      this.setData({ loading: true });
      
      let articles;
      if (this.data.currentTab === 'news') {
        articles = await newsService.getNewsList();
      } else {
        articles = await newsService.getStrategyList();
      }
      
      this.setData({ 
        articles,
        loading: false
      });
    } catch (err) {
      console.error('加载文章失败', err);
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      });
      this.setData({ loading: false });
    }
  },

  // 跳转到文章详情
  goToArticle(e) {
    const { id, type } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/article/article?id=${id}&type=${type}`
    });
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.loadArticles().finally(() => {
      wx.stopPullDownRefresh();
    });
  }
});
