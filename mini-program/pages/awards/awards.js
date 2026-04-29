var app = getApp();

Page({
  data: {
    awardList: [],
    filterType: 'all',
    searchKeyword: '',
    loading: true
  },

  onLoad() {
    this.loadAwards();
  },

  onShow() {
    this.loadAwards();
  },

  // 加载奖项数据（异步）
  loadAwards() {
    var self = this;

    // 如果数据已就绪，直接使用
    if (app.globalData.awardDataReady && app.globalData.awardList.length > 0) {
      this.applyFilters();
      return;
    }

    // 数据还没加载完，显示loading并等待
    this.setData({ loading: true });

    // 等待数据就绪
    var timer = setInterval(function() {
      if (app.globalData.awardDataReady) {
        clearInterval(timer);
        self.applyFilters();
      }
    }, 200);

    // 超时保护（5秒）
    setTimeout(function() {
      clearInterval(timer);
      if (self.data.loading) {
        self.setData({ loading: false });
        self.applyFilters();
      }
    }, 5000);
  },

  // 应用筛选并渲染
  applyFilters() {
    var awardList = app.globalData.awardList || [];
    var filteredList = this._filterList(awardList);
    var awardsWithDays = filteredList.map(function(award) {
      return Object.assign({}, award, {
        daysLeft: _calculateDaysLeft(award.deadline_final)
      });
    });

    this.setData({
      awardList: awardsWithDays,
      loading: false
    });
  },

  // 内部筛选逻辑
  _filterList(list) {
    var type = this.data.filterType;
    var keyword = this.data.searchKeyword;
    var filtered = list;

    if (type !== 'all') {
      filtered = filtered.filter(function(award) {
        if (type === 'student') {
          return award.award_type === '学生奖';
        }
        if (type === 'design') {
          return ['综合设计', '室内设计', '建筑设计'].indexOf(award.category_main) !== -1;
        }
        if (type === 'advertising') {
          return award.category_main === '综合创意';
        }
        return true;
      });
    }

    if (keyword) {
      filtered = filtered.filter(function(award) {
        return (award.award_name_cn && award.award_name_cn.indexOf(keyword) !== -1) ||
          (award.category_main && award.category_main.indexOf(keyword) !== -1) ||
          (award.award_name_short && award.award_name_short.indexOf(keyword) !== -1);
      });
    }

    return filtered;
  },

  // 筛选奖项
  filterAwards(e) {
    var type = e.currentTarget.dataset.type;
    this.setData({ filterType: type });
    this.applyFilters();
  },

  // 搜索输入
  onSearchInput(e) {
    var keyword = e.detail.value;
    this.setData({ searchKeyword: keyword });
    this.applyFilters();
  },

  // 跳转到奖项详情
  goToAwardDetail(e) {
    var awardId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/award-detail/award-detail?id=' + awardId
    });
  },

  // 返回首页
  goBack() {
    wx.navigateBack();
  }
});

// 独立函数，避免 this 绑定问题
function _calculateDaysLeft(deadline) {
  if (!deadline) return 0;
  var deadlineDate = new Date(deadline);
  var today = new Date();
  var diffTime = deadlineDate - today;
  var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
}
