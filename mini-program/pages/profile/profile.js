// 关于我们页
Page({
  data: {
    scopes: ['建筑设计', '室内设计', '景观设计', '产品设计', '视觉传达']
  },

  makePhoneCall() {
    wx.makePhoneCall({
      phoneNumber: '13692222744',
      fail: () => {
        wx.showToast({ title: '拨打失败', icon: 'none' });
      }
    });
  },

  copyWechat() {
    wx.setClipboardData({
      data: '设计能',
      success: () => {
        wx.showToast({ title: '微信公众号已复制', icon: 'success' });
      }
    });
  },

  copyEmail() {
    wx.setClipboardData({
      data: '9285962@qq.com',
      success: () => {
        wx.showToast({ title: '邮箱已复制', icon: 'success' });
      }
    });
  },

  openWebsite() {
    wx.showModal({
      title: '访问官网',
      content: '请访问 www.52de.cc 或微信搜索"设计能"关注公众号',
      showCancel: false,
      confirmText: '知道了'
    });
  },

  goToService() {
    wx.switchTab({ url: '/pages/service/service' });
  }
});
