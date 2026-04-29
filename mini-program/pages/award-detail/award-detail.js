var app = getApp();
var dataLoader = require('../../utils/data-loader.js');

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
    benefitsList: [],
    loading: true
  },

  onLoad(options) {
    var awardId = options.id;
    this.loadAwardDetail(awardId);
  },

  // 异步加载奖项详情
  loadAwardDetail(awardId) {
    var self = this;

    this.setData({ loading: true });

    // 先尝试从远程获取完整详情
    dataLoader.getAwardDetail(awardId).then(function(detail) {
      if (detail) {
        self._renderAward(detail);
        return;
      }

      // 远程没有详情数据，从列表数据中取基础信息
      var awardList = app.globalData.awardList || [];
      var basic = null;
      for (var i = 0; i < awardList.length; i++) {
        if (awardList[i].award_id === awardId) {
          basic = awardList[i];
          break;
        }
      }

      if (basic) {
        self._renderAward(basic);
      } else {
        console.warn('未找到奖项: ' + awardId);
        self.setData({ loading: false });
      }
    }).catch(function(err) {
      console.error('加载奖项详情失败:', err);

      // 回退到列表中的基础数据
      var awardList = app.globalData.awardList || [];
      var basic = null;
      for (var i = 0; i < awardList.length; i++) {
        if (awardList[i].award_id === awardId) {
          basic = awardList[i];
          break;
        }
      }

      if (basic) {
        self._renderAward(basic);
      } else {
        self.setData({ loading: false });
      }
    });
  },

  // 渲染奖项数据
  _renderAward(award) {
    this.setData({
      award: award,
      feeList: _formatFeeList(award),
      timelineList: _formatTimeline(award),
      categoryList: award.category_sub || [],
      requirementsList: _formatRequirements(award),
      specList: _formatSpecs(award),
      criteriaList: _formatCriteria(award),
      awardLevels: _formatAwardLevels(award),
      benefitsList: _formatBenefits(award),
      deadline_final: award.deadline_final || '',
      loading: false
    });
  },

  // 复制官网链接
  copyWebsite() {
    if (!this.data.award.website) {
      wx.showToast({ title: '暂无官网链接', icon: 'none' });
      return;
    }
    wx.setClipboardData({
      data: this.data.award.website,
      success: function() {
        wx.showToast({ title: '链接已复制', icon: 'success' });
      }
    });
  },

  // 咨询专家
  consultExpert() {
    app.globalData.currentAward = this.data.award;
    wx.switchTab({ url: '/pages/chat/chat' });
  },

  // 开始申报
  startApplication() {
    app.globalData.currentAward = this.data.award;
    wx.switchTab({ url: '/pages/chat/chat' });
  },

  // 分享
  onShareAppMessage() {
    return {
      title: (this.data.award.award_name_cn || '奖项') + ' - 国际设计大奖详情',
      path: '/pages/award-detail/award-detail?id=' + this.data.award.award_id
    };
  }
});

// ===== 格式化函数（独立，避免this绑定问题）=====

function _getDeadlineStatus(deadline) {
  if (!deadline) return '待定';
  var deadlineDate = new Date(deadline);
  var today = new Date();
  var diffDays = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return '已截止';
  if (diffDays <= 7) return '即将截止';
  return '进行中';
}

function _formatFeeList(award) {
  var fees = [];
  var currency = award.fee_currency === 'USD' ? '$' : (award.fee_currency === 'EUR' ? '\u20ac' : '\u00a3');

  if (award.deadline_early) {
    fees.push({
      name: '早鸟价',
      amount: award.fee_early_bird ? currency + award.fee_early_bird : '待公布',
      deadline: award.deadline_early,
      status: _getDeadlineStatus(award.deadline_early)
    });
  }
  if (award.deadline_regular) {
    fees.push({
      name: '常规价',
      amount: award.fee_regular ? currency + award.fee_regular : '待公布',
      deadline: award.deadline_regular,
      status: _getDeadlineStatus(award.deadline_regular)
    });
  }
  if (award.deadline_final) {
    fees.push({
      name: '最终截止',
      amount: award.fee_final ? currency + award.fee_final : '待公布',
      deadline: award.deadline_final,
      status: _getDeadlineStatus(award.deadline_final)
    });
  }
  if (award.deadline_extended) {
    fees.push({
      name: '延期',
      amount: award.fee_extended ? currency + award.fee_extended : '待公布',
      deadline: award.deadline_extended,
      status: _getDeadlineStatus(award.deadline_extended)
    });
  }
  return fees;
}

function _formatTimeline(award) {
  var timeline = [];
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
}

function _formatRequirements(award) {
  var reqs = [];
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
}

function _formatSpecs(award) {
  var specs = [];
  if (award.image_min_count || award.image_max_count) {
    var items = [
      '数量：' + (award.image_min_count || 0) + '-' + (award.image_max_count || '不限') + '张',
      '格式：' + (award.image_format ? award.image_format.join('、') : '官方未公布')
    ];
    if (award.image_file_size_max) items.push('大小：\u2264' + award.image_file_size_max);
    if (award.image_recommended_resolution) items.push('推荐：' + award.image_recommended_resolution);
    specs.push({ title: '🖼️ 图片要求', items: items });
  }
  if (award.video_optional) {
    var vItems = [];
    if (award.video_max_length) vItems.push('时长：\u2264' + award.video_max_length);
    if (award.video_format) vItems.push('格式：' + award.video_format.join('、'));
    if (award.video_max_file_size) vItems.push('大小：\u2264' + award.video_max_file_size);
    if (vItems.length) specs.push({ title: '🎬 视频（可选）', items: vItems });
  }
  return specs;
}

function _formatCriteria(award) {
  if (!award.judging_criteria) return [];
  var criteria = award.judging_criteria.split('、');
  return criteria.map(function(c) {
    return { name: c, weight: '重要' };
  });
}

function _formatAwardLevels(award) {
  if (!award.award_levels || !award.award_levels.length) return [];

  var descriptions = {
    '黑铅笔奖': '最高荣誉，极为罕见',
    '白铅笔奖': '社会影响力特别奖',
    '黄铅笔奖': '创意卓越奖',
    '石墨铅笔奖': '杰出作品奖',
    '木铅笔奖': '优秀作品奖',
    '铂金奖': '最高荣誉',
    '金奖': '卓越成就',
    '银奖': '优秀成就'
  };

  return award.award_levels.map(function(level) {
    return {
      name: level,
      description: descriptions[level] || '优秀奖项'
    };
  });
}

function _formatBenefits(award) {
  var benefits = [];
  if (award.trophy) benefits.push('🏆 奖杯：' + award.trophy_material);
  if (award.certificate) benefits.push('📜 证书：' + award.certificate_format.join('、'));
  if (award.digital_badge) benefits.push('🏅 数字徽章');
  if (award.logo_usage_rights) benefits.push('✓ Logo使用权：' + award.logo_usage_scope);
  if (award.website_feature) benefits.push('🌐 官网展示');
  if (award.yearbook_included) benefits.push('📚 年鉴收录');
  if (award.networking_events) benefits.push('🤝 社交活动');
  return benefits;
}
