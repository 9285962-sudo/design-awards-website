// 奖项对比页
var app = getApp();
var dataLoader = require('../../utils/data-loader.js');

var MAX_COMPARE = 4;
var CURRENCY_SYMBOLS = { EUR: '\u20ac', USD: '$', GBP: '\u00a3', JPY: '\u00a5', HKD: 'HK$' };

// 对比维度定义
var COMPARE_SECTIONS = [
  {
    title: '\ud83d\udcc5 \u65f6\u95f4\u8282\u70b9',
    fields: [
      { key: 'deadline_early', label: '\u65e9\u9e1f\u622a\u6b62' },
      { key: 'deadline_regular', label: '\u5e38\u89c4\u622a\u6b62' },
      { key: 'deadline_final', label: '\u6700\u7ec8\u622a\u6b62' },
      { key: 'announcement_date', label: '\u7ed3\u679c\u516c\u5e03' }
    ]
  },
  {
    title: '\ud83d\udcb0 \u53c2\u8d5b\u8d39\u7528',
    fields: [
      { key: 'fee_early_bird', label: '\u65e9\u9e1f\u8d39', currency: true },
      { key: 'fee_regular', label: '\u5e38\u89c4\u8d39', currency: true },
      { key: 'fee_student', label: '\u5b66\u751f\u8d39', currency: true }
    ]
  },
  {
    title: '\ud83c\udfc5 \u5956\u9879\u4e0e\u58f0\u8a89',
    fields: [
      { key: 'prestige_level', label: '\u58f0\u8a89\u7b49\u7ea7' },
      { key: 'award_levels', label: '\u5956\u9879\u7b49\u7ea7', array: true },
      { key: 'difficulty_level', label: '\u96be\u5ea6' }
    ]
  },
  {
    title: '\ud83d\udccb \u53c2\u8d5b\u6761\u4ef6',
    fields: [
      { key: 'project_year_limit', label: '\u4f5c\u54c1\u5e74\u9650' },
      { key: 'entrant_type', label: '\u53c2\u8d5b\u5bf9\u8c61', array: true },
      { key: 'language_primary', label: '\u8bed\u8a00\u8981\u6c42' }
    ]
  }
];

Page({
  data: {
    currentCategory: '\u5168\u90e8',
    categories: ['\u5168\u90e8', '\u5efa\u7b51\u8bbe\u8ba1', '\u5ba4\u5185\u8bbe\u8ba1', '\u4ea7\u54c1\u8bbe\u8ba1', '\u89c6\u89c9\u4f20\u8fbe', '\u7efc\u5408\u8bbe\u8ba1', '\u7efc\u5408\u521b\u610f'],
    awards: [],
    filteredAwards: [],
    loading: true,
    selectedIds: [],
    showResult: false,
    selectedAwards: [],
    compareSections: COMPARE_SECTIONS,
    maxCompare: MAX_COMPARE
  },

  onLoad: function() {
    this.loadAwards();
  },

  onShow: function() {
    if (this.data.awards.length > 0) {
      this.loadAwards();
    }
  },

  loadAwards: function() {
    var self = this;
    this.setData({ loading: true });

    dataLoader.getAwardsList().then(function(awards) {
      console.log('[compare] loaded awards:', awards.length, ', sample:', awards[0] ? awards[0].award_id : 'N/A');
      // 动态生成分类列表
      var catSet = {};
      awards.forEach(function(a) {
        if (a.category_main) catSet[a.category_main] = true;
      });
      var categories = ['\u5168\u90e8'];
      Object.keys(catSet).sort().forEach(function(c) { categories.push(c); });

      var sorted = awards.sort(function(a, b) {
        if (!a.deadline_final) return 1;
        if (!b.deadline_final) return -1;
        return new Date(a.deadline_final) - new Date(b.deadline_final);
      });

      self.setData({
        awards: sorted,
        loading: false,
        categories: categories
      });
      self._applyFilter(sorted);
    }).catch(function(err) {
      console.error('\u52a0\u8f7d\u5956\u9879\u5217\u8868\u5931\u8d25', err);
      self.setData({ loading: false });
    });
  },

  selectCategory: function(e) {
    var category = e.currentTarget.dataset.category;
    this.setData({ currentCategory: category });
    this._applyFilter(this.data.awards);
  },

  _applyFilter: function(awards) {
    var cat = this.data.currentCategory;
    var filtered = cat === '\u5168\u90e8' ? awards : awards.filter(function(a) { return a.category_main === cat; });
    this.setData({ filteredAwards: filtered });
  },

  // 切换选中/取消
  toggleSelect: function(e) {
    var id = e.currentTarget.dataset.id;
    var selectedIds = this.data.selectedIds.slice();
    var idx = selectedIds.indexOf(id);

    if (idx !== -1) {
      selectedIds.splice(idx, 1);
    } else {
      if (selectedIds.length >= MAX_COMPARE) {
        wx.showToast({ title: '\u6700\u591a\u9009\u62e9' + MAX_COMPARE + '\u4e2a\u5956\u9879', icon: 'none' });
        return;
      }
      selectedIds.push(id);
    }

    this.setData({ selectedIds: selectedIds });
  },

  // 清空选择
  clearSelect: function() {
    this.setData({ selectedIds: [], showResult: false, selectedAwards: [] });
  },

  // 开始对比
  startCompare: function() {
    if (this.data.selectedIds.length < 2) {
      wx.showToast({ title: '\u8bf7\u81f3\u5c11\u9009\u62e92\u4e2a\u5956\u9879', icon: 'none' });
      return;
    }

    var awards = this.data.awards;
    var ids = this.data.selectedIds;
    console.log('[compare] selectedIds:', JSON.stringify(ids));
    console.log('[compare] awards count:', awards.length, ', sample award_id:', awards[0] ? awards[0].award_id : 'N/A');
    var selectedAwards = [];
    for (var i = 0; i < awards.length; i++) {
      if (ids.indexOf(awards[i].award_id) !== -1) {
        selectedAwards.push(awards[i]);
      }
    }
    console.log('[compare] matched count:', selectedAwards.length);

    this.setData({
      showResult: true,
      selectedAwards: selectedAwards
    });

    wx.pageScrollTo({ scrollTop: 0 });
  },

  // 返回选择页
  backToSelect: function() {
    this.setData({ showResult: false });
  },

  // 跳转详情
  goToDetail: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/award-detail/award-detail?id=' + id
    });
  },

  // 获取字段显示值
  getFieldValue: function(award, field) {
    var val = award[field.key];
    if (!val) return '\u2014';

    if (field.currency) {
      var symbol = CURRENCY_SYMBOLS[award.fee_currency] || '';
      return symbol + val;
    }

    if (field.array && Array.isArray(val)) {
      return val.join('\u3001');
    }

    return val;
  },

  onPullDownRefresh: function() {
    var self = this;
    this.loadAwards();
    var timer = setInterval(function() {
      if (!self.data.loading) {
        clearInterval(timer);
        wx.stopPullDownRefresh();
      }
    }, 200);
  },

  onShareAppMessage: function() {
    return {
      title: '\u5956\u9879\u5bf9\u6bd4 - \u8bbe\u8ba1\u80fd',
      path: '/pages/compare/compare'
    };
  }
});
