// 申报服务页
Page({
  data: {
    processSteps: [
      { name: '参赛作品初审', desc: '专业团队评估作品竞争力，提供参赛策略提案' },
      { name: '分析匹配奖项', desc: '根据作品特点精准匹配最适合的国际设计大奖' },
      { name: '撰写竞赛文案', desc: '专业语言翻译，精准叙事和呈现优化' },
      { name: '图片合规处理', desc: '符合各奖项规格要求，美工排版设计' },
      { name: '投递参赛作品', desc: '完成所有申报流程和缴费手续' },
      { name: '报告评审结果', desc: '实时跟进，处理获奖或申诉事宜' },
      { name: '获奖新闻报道', desc: '官方渠道报道，提升荣誉价值' }
    ],
    scopes: ['建筑设计', '室内设计', '景观设计', '产品设计', '视觉传达'],
    valueServices: [
      '参赛作品优劣势分析与改进建议',
      '获奖概率评估',
      '荣誉价值最大化与荣誉管理',
      '参赛作品精准叙事和呈现优化'
    ]
  },

  goToChat() {
    wx.switchTab({ url: '/pages/chat/chat' });
  },

  makeCall() {
    wx.makePhoneCall({
      phoneNumber: '13692222744',
      fail: () => {
        wx.showToast({ title: '拨打电话失败', icon: 'none' });
      }
    });
  }
});
