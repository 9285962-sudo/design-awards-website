const app = getApp();

Page({
  data: {
    awardList: [],
    hotAwards: []
  },

  onLoad() {
    this.loadAwardData();
  },

  onShow() {
    this.loadAwardData();
  },

  // 加载奖项数据
  loadAwardData() {
    const awardList = app.globalData.awardList || [];
    // 计算每个奖项的剩余天数
    const awardsWithDays = awardList.map(award => {
      const daysLeft = this.calculateDaysLeft(award.deadline_final);
      return {
        ...award,
        daysLeft: daysLeft
      };
    });
    
    this.setData({
      awardList: awardsWithDays,
      hotAwards: awardsWithDays.slice(0, 4) // 取前4个作为热门奖项
    });
  },

  // 计算剩余天数
  calculateDaysLeft(deadline) {
    if (!deadline) return 0;
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  },

  // 跳转到咨询页面
  goToChat() {
    wx.switchTab({
      url: '/pages/chat/chat'
    });
  },

  // 浏览全部奖项
  browseAwards() {
    wx.navigateTo({
      url: '/pages/awards/awards'
    });
  },

  // 跳转到奖项详情
  goToAwardDetail(e) {
    const awardId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/award-detail/award-detail?id=${awardId}`
    });
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.calculateDaysLeft();
    wx.stopPullDownRefresh();
  },

  // 分享
  onShareAppMessage() {
    return {
      title: '国际设计大奖智能助手 - 让好设计被世界看见',
      path: '/pages/index/index',
      imageUrl: '/images/share-cover.png'
    };
  }
});
