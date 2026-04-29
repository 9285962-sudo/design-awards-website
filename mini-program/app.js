var dataLoader = require('./utils/data-loader.js');

App({
  globalData: {
    userInfo: null,
    isLoggedIn: false,
    phoneNumber: null,
    // 奖项数据列表
    awardList: [],
    currentAward: null,
    // 数据加载状态
    awardDataReady: false,
    // 对话历史
    chatHistory: []
  },

  onLaunch() {
    // 初始化云开发（接入DeepSeek需要）
    if (wx.cloud) {
      wx.cloud.init({
        traceUser: true
      });
    }

    // 异步加载奖项数据
    this.loadAwardData();

    // 检查登录状态
    this.checkLoginStatus();
  },

  // 异步加载所有奖项数据
  loadAwardData() {
    var self = this;
    dataLoader.getAwardsList().then(function(awards) {
      self.globalData.awardList = awards;
      self.globalData.awardDataReady = true;

      // 默认设置第一个奖项为当前奖项
      if (awards.length > 0 && !self.globalData.currentAward) {
        self.globalData.currentAward = awards[0];
      }

      console.log('奖项数据加载成功:', awards.length, '个奖项');
    }).catch(function(error) {
      console.error('奖项数据加载失败:', error);
      // 使用内置备用数据
      self.loadBackupData();
    });
  },

  // 备用数据（当远程加载失败且无缓存时使用）
  loadBackupData() {
    var backupAwards = [
      {
        award_id: "muse_design_2026",
        award_name_cn: "MUSE设计奖",
        award_name_en: "MUSE Design Awards",
        award_name_short: "MUSE",
        category_main: "综合设计",
        country: "美国",
        prestige_level: "知名",
        difficulty_level: "中",
        fee_currency: "USD",
        fee_regular: 249,
        deadline_final: "2026-01-15"
      }
    ];

    this.globalData.awardList = backupAwards;
    this.globalData.currentAward = backupAwards[0];
    this.globalData.awardDataReady = true;
    console.warn('使用备用数据');
  },

  // 获取单个奖项完整数据（异步）
  getAwardDetail(awardId) {
    return dataLoader.getAwardDetail(awardId);
  },

  // 获取获奖作品数据
  getWinners(awardId, year) {
    return dataLoader.getWinners(awardId, year);
  },

  // 检查登录状态
  checkLoginStatus() {
    var token = wx.getStorageSync('token');
    if (token) {
      this.globalData.isLoggedIn = true;
    }
  },

  // 获取全局数据
  getGlobalData() {
    return this.globalData;
  }
});
