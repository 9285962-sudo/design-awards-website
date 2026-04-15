const app = getApp();

Page({
  data: {
    isLoggedIn: false,
    reminderCount: 0
  },

  onLoad() {
    this.checkLoginStatus();
  },

  onShow() {
    this.checkLoginStatus();
  },

  // 检查登录状态
  checkLoginStatus() {
    const isLoggedIn = app.globalData.isLoggedIn;
    this.setData({
      isLoggedIn: isLoggedIn
    });
  },

  // 处理登录
  handleLogin() {
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        // 获取用户信息成功
        app.globalData.userInfo = res.userInfo;
        app.globalData.isLoggedIn = true;
        
        this.setData({
          isLoggedIn: true
        });

        wx.showToast({
          title: '登录成功',
          icon: 'success'
        });

        // 这里可以调用后端API保存用户信息
        // this.saveUserInfo(res.userInfo);
      },
      fail: (err) => {
        console.log('登录失败', err);
        wx.showToast({
          title: '登录取消',
          icon: 'none'
        });
      }
    });
  },

  // 我的收藏
  goToFavorites() {
    if (!this.checkAuth()) return;
    
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 咨询历史
  goToHistory() {
    if (!this.checkAuth()) return;
    
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 截止提醒
  goToReminders() {
    if (!this.checkAuth()) return;
    
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 申报进度
  goToApplications() {
    if (!this.checkAuth()) return;
    
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 1对1咨询
  consultExpert() {
    wx.switchTab({
      url: '/pages/chat/chat'
    });
  },

  // 服务套餐
  goToServices() {
    wx.showModal({
      title: '服务套餐',
      content: '我们的服务包括：\n\n1. 精准选奖策略\n2. 申报材料优化\n3. 图片视频处理\n4. 全流程申报服务\n\n是否预约咨询？',
      success: (res) => {
        if (res.confirm) {
          wx.switchTab({
            url: '/pages/chat/chat'
          });
        }
      }
    });
  },

  // 成功案例
  goToCases() {
    wx.showModal({
      title: '成功案例',
      content: '5年服务200家设计公司，500个项目，90%获奖率\n\n典型案例：\n• 某建筑设计事务所 - MUSE铂金奖\n• 某室内工作室 - TITAN金奖\n• 某产品公司 - IDA金奖\n\n更多案例请咨询了解',
      showCancel: false
    });
  },

  // 关于我们
  goToAbout() {
    wx.navigateTo({
      url: '/pages/about/about'
    });
  },

  // 联系我们
  contactUs() {
    wx.showActionSheet({
      itemList: ['电话咨询', '微信咨询', '邮件咨询'],
      success: (res) => {
        switch(res.tapIndex) {
          case 0:
            wx.makePhoneCall({
              phoneNumber: '400-XXX-XXXX'
            });
            break;
          case 1:
            wx.showModal({
              title: '微信咨询',
              content: '请添加微信：AwardExpert\n备注：奖项咨询',
              showCancel: false
            });
            break;
          case 2:
            wx.setClipboardData({
              data: 'contact@award-expert.com',
              success: () => {
                wx.showToast({
                  title: '邮箱已复制',
                  icon: 'success'
                });
              }
            });
            break;
        }
      }
    });
  },

  // 意见反馈
  goToFeedback() {
    wx.navigateTo({
      url: '/pages/feedback/feedback'
    });
  },

  // 检查登录状态
  checkAuth() {
    if (!this.data.isLoggedIn) {
      wx.showModal({
        title: '需要登录',
        content: '该功能需要登录后才能使用',
        confirmText: '去登录',
        success: (res) => {
          if (res.confirm) {
            this.handleLogin();
          }
        }
      });
      return false;
    }
    return true;
  }
});
