const app = getApp();

Page({
  data: {
    awardList: [],
    filterType: 'all', // all, design, advertising, student
    searchKeyword: ''
  },

  onLoad() {
    this.loadAwards();
  },

  onShow() {
    this.loadAwards();
  },

  // 加载奖项数据
  loadAwards() {
    const awardList = app.globalData.awardList || [];
    const awardsWithDays = awardList.map(award => ({
      ...award,
      daysLeft: this.calculateDaysLeft(award.deadline_final)
    }));
    
    this.setData({
      awardList: awardsWithDays
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

  // 筛选奖项
  filterAwards(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({ filterType: type });
    
    let filteredList = app.globalData.awardList || [];
    
    if (type !== 'all') {
      filteredList = filteredList.filter(award => {
        if (type === 'student') {
          return award.award_type === '学生奖';
        }
        if (type === 'design') {
          // 设计类包括综合设计、室内设计、建筑设计等
          return ['综合设计', '室内设计', '建筑设计'].includes(award.category_main);
        }
        if (type === 'advertising') {
          return award.category_main === '综合创意';
        }
        return true;
      });
    }
    
    // 应用搜索过滤
    if (this.data.searchKeyword) {
      filteredList = filteredList.filter(award => 
        award.award_name_cn.includes(this.data.searchKeyword) ||
        award.category_main.includes(this.data.searchKeyword)
      );
    }
    
    const awardsWithDays = filteredList.map(award => ({
      ...award,
      daysLeft: this.calculateDaysLeft(award.deadline_final)
    }));
    
    this.setData({
      awardList: awardsWithDays
    });
  },

  // 搜索输入
  onSearchInput(e) {
    const keyword = e.detail.value;
    this.setData({ searchKeyword: keyword });
    
    let filteredList = app.globalData.awardList || [];
    
    // 应用类型筛选
    if (this.data.filterType !== 'all') {
      const type = this.data.filterType;
      filteredList = filteredList.filter(award => {
        if (type === 'student') {
          return award.award_type === '学生奖';
        }
        if (type === 'design') {
          // 设计类包括综合设计、室内设计、建筑设计等
          return ['综合设计', '室内设计', '建筑设计'].includes(award.category_main);
        }
        if (type === 'advertising') {
          return award.category_main === '综合创意';
        }
        return true;
      });
    }
    
    // 应用搜索过滤
    if (keyword) {
      filteredList = filteredList.filter(award => 
        award.award_name_cn.includes(keyword) ||
        award.category_main.includes(keyword) ||
        award.award_name_short.includes(keyword)
      );
    }
    
    const awardsWithDays = filteredList.map(award => ({
      ...award,
      daysLeft: this.calculateDaysLeft(award.deadline_final)
    }));
    
    this.setData({
      awardList: awardsWithDays
    });
  },

  // 跳转到奖项详情
  goToAwardDetail(e) {
    const awardId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/award-detail/award-detail?id=${awardId}`
    });
  },

  // 返回首页
  goBack() {
    wx.navigateBack();
  }
});
