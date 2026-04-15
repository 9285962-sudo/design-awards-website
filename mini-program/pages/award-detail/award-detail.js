const app = getApp();

Page({
  data: {
    award: {},
    feeList: [],
    timelineList: [],
    categoryList: [],
    requirementsList: [],
    specList: [],
    criteriaList: [],
    awardLevels: [],
    benefitsList: []
  },

  onLoad(options) {
    const awardId = options.id;
    const awardList = app.globalData.awardList || [];
    const award = awardList.find(a => a.award_id === awardId) || app.globalData.currentAward;
    
    if (award) {
      this.setData({
        award: award,
        feeList: this.formatFeeList(award),
        timelineList: this.formatTimeline(award),
        categoryList: award.category_sub || [],
        requirementsList: this.formatRequirements(award),
        specList: this.formatSpecs(award),
        criteriaList: this.formatCriteria(award),
        awardLevels: this.formatAwardLevels(award),
        benefitsList: this.formatBenefits(award)
      });
    }
  },

  // 格式化费用列表
  formatFeeList(award) {
    const fees = [];
    const currency = award.fee_currency === 'USD' ? '$' : (award.fee_currency === 'EUR' ? '€' : '£');
    
    if (award.deadline_early) {
      fees.push({
        name: '早鸟价',
        amount: award.fee_early_bird ? currency + award.fee_early_bird : '待公布',
        deadline: award.deadline_early,
        status: this.getDeadlineStatus(award.deadline_early)
      });
    }
    if (award.deadline_regular) {
      fees.push({
        name: '常规价',
        amount: award.fee_regular ? currency + award.fee_regular : '待公布',
        deadline: award.deadline_regular,
        status: this.getDeadlineStatus(award.deadline_regular)
      });
    }
    if (award.deadline_final) {
      fees.push({
        name: '最终截止',
        amount: award.fee_final ? currency + award.fee_final : '待公布',
        deadline: award.deadline_final,
        status: this.getDeadlineStatus(award.deadline_final)
      });
    }
    if (award.deadline_extended) {
      fees.push({
        name: '延期',
        amount: award.fee_extended ? currency + award.fee_extended : '待公布',
        deadline: award.deadline_extended,
        status: this.getDeadlineStatus(award.deadline_extended)
      });
    }
    return fees;
  },

  // 获取截止日期状态
  getDeadlineStatus(deadline) {
    if (!deadline) return '待定';
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffDays = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return '已截止';
    if (diffDays <= 7) return '即将截止';
    return '进行中';
  },

  // 格式化时间线
  formatTimeline(award) {
    const timeline = [];
    if (award.submission_open) {
      timeline.push({ label: '投稿开始', value: award.submission_open, highlight: false });
    }
    if (award.deadline_final) {
      timeline.push({ label: '最终截止', value: award.deadline_final, highlight: true });
    }
    if (award.announcement_date) {
      timeline.push({ label: '结果公布', value: award.announcement_date, highlight: false });
    }
    if (award.ceremony_date) {
      timeline.push({ label: '颁奖典礼', value: award.ceremony_date, highlight: false });
    }
    return timeline;
  },

  // 格式化参赛要求
  formatRequirements(award) {
    const reqs = [];
    if (award.project_year_limit) {
      reqs.push({ label: '作品年限', value: award.project_year_specific || award.project_year_limit });
    }
    if (award.project_stage_accepted && award.project_stage_accepted.length) {
      reqs.push({ label: '项目状态', value: award.project_stage_accepted.join('、') });
    }
    if (award.entrant_type && award.entrant_type.length) {
      reqs.push({ label: '参赛对象', value: award.entrant_type.join('、') });
    }
    if (award.language_primary) {
      reqs.push({ label: '语言要求', value: award.language_primary });
    }
    return reqs;
  },

  // 格式化作品规格
  formatSpecs(award) {
    const specs = [];
    if (award.image_min_count || award.image_max_count) {
      specs.push({
        title: '🖼️ 图片要求',
        items: [
          `数量：${award.image_min_count || 0}-${award.image_max_count || '不限'}张`,
          `格式：${award.image_format ? award.image_format.join('、') : '官方未公布'}`,
          award.image_file_size_max ? `大小：≤${award.image_file_size_max}` : '',
          award.image_recommended_resolution ? `推荐：${award.image_recommended_resolution}` : ''
        ].filter(Boolean)
      });
    }
    if (award.video_optional) {
      specs.push({
        title: '🎬 视频（可选）',
        items: [
          award.video_max_length ? `时长：≤${award.video_max_length}` : '',
          award.video_format ? `格式：${award.video_format.join('、')}` : '',
          award.video_max_file_size ? `大小：≤${award.video_max_file_size}` : ''
        ].filter(Boolean)
      });
    }
    return specs;
  },

  // 格式化评审标准
  formatCriteria(award) {
    if (!award.judging_criteria) return [];
    
    const criteria = award.judging_criteria.split('、');
    return criteria.map(c => ({
      name: c,
      weight: '重要'
    }));
  },

  // 格式化奖项等级
  formatAwardLevels(award) {
    if (!award.award_levels || !award.award_levels.length) return [];
    
    const descriptions = {
      '黑铅笔奖': '最高荣誉，极为罕见',
      '白铅笔奖': '社会影响力特别奖',
      '黄铅笔奖': '创意卓越奖',
      '石墨铅笔奖': '杰出作品奖',
      '木铅笔奖': '优秀作品奖',
      '铂金奖': '最高荣誉',
      '金奖': '卓越成就',
      '银奖': '优秀成就'
    };
    
    return award.award_levels.map(level => ({
      name: level,
      description: descriptions[level] || '优秀奖项'
    }));
  },

  // 格式化获奖权益
  formatBenefits(award) {
    const benefits = [];
    if (award.trophy) benefits.push('🏆 奖杯：' + award.trophy_material);
    if (award.certificate) benefits.push('📜 证书：' + award.certificate_format.join('、'));
    if (award.digital_badge) benefits.push('🏅 数字徽章');
    if (award.logo_usage_rights) benefits.push('✓ Logo使用权：' + award.logo_usage_scope);
    if (award.website_feature) benefits.push('🌐 官网展示');
    if (award.yearbook_included) benefits.push('📚 年鉴收录');
    if (award.networking_events) benefits.push('🤝 社交活动');
    return benefits;
  },

  // 复制官网链接
  copyWebsite() {
    if (!this.data.award.website) {
      wx.showToast({ title: '暂无官网链接', icon: 'none' });
      return;
    }
    wx.setClipboardData({
      data: this.data.award.website,
      success: () => {
        wx.showToast({ title: '链接已复制', icon: 'success' });
      }
    });
  },

  // 咨询专家
  consultExpert() {
    // 设置当前奖项为全局currentAward，然后跳转到对话页面
    app.globalData.currentAward = this.data.award;
    wx.switchTab({ url: '/pages/chat/chat' });
  },

  // 开始申报
  startApplication() {
    // 设置当前奖项为全局currentAward，然后跳转到对话页面
    app.globalData.currentAward = this.data.award;
    wx.switchTab({ url: '/pages/chat/chat' });
  },

  // 分享
  onShareAppMessage() {
    return {
      title: `${this.data.award.award_name_cn} - 国际设计大奖详情`,
      path: `/pages/award-detail/award-detail?id=${this.data.award.award_id}`
    };
  }
});
