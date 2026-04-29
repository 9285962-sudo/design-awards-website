/**
 * 通用奖项详情模板
 * 原理：自动读取 data.json，根据字段类型渲染对应UI
 * 新增奖项只需替换 JSON 文件，无需修改代码
 */

export async function getStaticProps() {
  // 读取奖项数据
  const fs = require('fs');
  const path = require('path');
  
  const filePath = path.join(process.cwd(), 'data', 'award-detail.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const award = JSON.parse(jsonData);
  
  return {
    props: { award }
  };
}

// 字段配置：定义每个字段如何渲染
const fieldConfig = {
  // 基础信息字段
  award_name_cn: { type: 'title', label: '奖项名称' },
  award_name_en: { type: 'subtitle' },
  award_slogan: { type: 'tagline', label: '口号' },
  organizer: { type: 'meta' },
  
  // 奖项等级
  award_levels: { type: 'badges', label: '奖项等级', colorMap: { '铂金奖': '#E5E4E2', '金奖': '#FFD700', '银奖': '#C0C0C0' } },
  
  // 费用字段组
  fee_early_bird: { type: 'fee-card', label: '早鸟价', color: 'green', deadline: 'deadline_early' },
  fee_regular: { type: 'fee-card', label: '常规价', color: 'blue', deadline: 'deadline_regular' },
  fee_final: { type: 'fee-card', label: '最终价', color: 'orange', deadline: 'deadline_final' },
  fee_extended: { type: 'fee-card', label: '延期价', color: 'red', deadline: 'deadline_extended' },
  
  // 日期字段
  submission_open: { type: 'date-row', label: '报名开始' },
  deadline_early: { type: 'date-row', label: '早鸟截止', color: 'green' },
  deadline_regular: { type: 'date-row', label: '常规截止', color: 'blue' },
  deadline_final: { type: 'date-row', label: '最终截止', color: 'orange' },
  deadline_extended: { type: 'date-row', label: '延期截止', color: 'red' },
  announcement_date: { type: 'date-row', label: '结果公布', color: 'purple' },
  ceremony_date: { type: 'date-row', label: '颁奖典礼' },
  
  // 分类
  category_sub: { type: 'tags', label: '参赛类别' },
  industry_focus: { type: 'tags', label: '行业覆盖' },
  
  // 参赛要求
  project_year_limit: { type: 'list-item', label: '作品年限', group: 'project' },
  project_status: { type: 'list-item', label: '项目状态', group: 'project' },
  project_stage_accepted: { type: 'list-item', label: '接受阶段', group: 'project' },
  entrant_type: { type: 'list-item', label: '参赛身份', group: 'entrant' },
  entrant_nationality_limit: { type: 'list-item', label: '国籍限制', group: 'entrant' },
  
  // 图片要求
  image_min_count: { type: 'spec-item', label: '图片数量' },
  image_format: { type: 'spec-item', label: '图片格式' },
  image_min_resolution: { type: 'spec-item', label: '最低分辨率' },
  image_file_size_max: { type: 'spec-item', label: '单张最大' },
  
  // 评审
  judging_criteria: { type: 'text', label: '评审标准' },
  judging_criteria_weight: { type: 'progress', label: '评分权重' },
  judging_process: { type: 'text', label: '评审流程' },
  
  // 权益
  trophy: { type: 'benefit-card', label: '奖杯' },
  certificate: { type: 'benefit-card', label: '证书' },
  digital_badge: { type: 'benefit-card', label: '数字徽章' },
  logo_usage_rights: { type: 'benefit-card', label: '标志使用权' },
  
  // 联系方式
  contact_email: { type: 'contact-item', icon: '✉️', label: '邮箱' },
  contact_address: { type: 'contact-item', icon: '📍', label: '地址' },
  support_hours: { type: 'contact-item', icon: '🕐', label: '服务时间' },
  
  // 规则
  resubmission_policy: { type: 'rule-item', label: '重新投稿' },
  withdrawal_policy: { type: 'rule-item', label: '退赛政策' },
  refund_policy: { type: 'rule-item', label: '退款政策' },
  copyright_policy: { type: 'rule-item', label: '版权政策' },
};

// 渲染器函数
const renderers = {
  // 标题
  title: (value) => `<h1 class="text-4xl md:text-5xl font-bold mb-4">${value}</h1>`,
  
  // 副标题
  subtitle: (value) => `<p class="text-2xl text-gray-300 mb-2">${value}</p>`,
  
  // 口号
  tagline: (value) => `<p class="text-lg text-yellow-400 mt-4">${value}</p>`,
  
  // 元信息
  meta: (value) => `<div class="text-sm uppercase tracking-wider mb-4 text-gray-300">${value}</div>`,
  
  // 徽章列表（如奖项等级）
  badges: (value, config) => {
    if (!Array.isArray(value) || value.length === 0) return '';
    const badges = value.map(item => {
      const color = config.colorMap?.[item] || '#666';
      return `<span style="background:${color}20;color:${color};border:1px solid ${color}" class="px-4 py-2 rounded-full text-sm font-medium">${item}</span>`;
    }).join('');
    return `<div class="flex justify-center gap-4 mt-8">${badges}</div>`;
  },
  
  // 费用卡片
  'fee-card': (value, config, data) => {
    if (!value) return '';
    const colorMap = { green: 'green', blue: 'blue', orange: 'orange', red: 'red' };
    const color = colorMap[config.color] || 'gray';
    const deadlineField = config.deadline;
    const deadline = deadlineField ? data[deadlineField] : '';
    return `
      <div class="bg-${color}-50 border border-${color}-200 rounded-lg p-4">
        <div class="text-sm text-${color}-600 mb-1">${config.label}</div>
        <div class="text-3xl font-bold text-${color}-700">$${value} <span class="text-sm font-normal">${data.fee_currency || 'USD'}</span></div>
        ${deadline ? `<div class="text-xs text-${color}-600 mt-2">截止: ${deadline}</div>` : ''}
      </div>
    `;
  },
  
  // 日期行
  'date-row': (value, config) => {
    if (!value) return '';
    const colorClass = config.color ? `text-${config.color}-600` : 'text-gray-600';
    return `<tr><td class="px-4 py-3 ${colorClass}">${config.label}</td><td class="px-4 py-3 font-medium text-right">${value}</td></tr>`;
  },
  
  // 标签列表
  tags: (value) => {
    if (!Array.isArray(value) || value.length === 0) return '';
    return `<div class="flex flex-wrap gap-2">${value.map(tag => `<span class="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700">${tag}</span>`).join('')}</div>`;
  },
  
  // 列表项
  'list-item': (value, config) => {
    if (!value) return '';
    const displayValue = Array.isArray(value) ? value.join(', ') : value;
    return `<li class="flex items-start"><span class="text-green-500 mr-2">✓</span><span>${config.label}: ${displayValue}</span></li>`;
  },
  
  // 规格项
  'spec-item': (value, config) => {
    if (!value) return '';
    const displayValue = Array.isArray(value) ? value.join(', ') : value;
    return `<li>${config.label}: ${displayValue}</li>`;
  },
  
  // 文本
  text: (value, config) => {
    if (!value) return '';
    return `<p class="text-gray-700">${config.label}: ${value}</p>`;
  },
  
  // 进度条
  progress: (value) => {
    if (!value || typeof value !== 'object') return '';
    return Object.entries(value).map(([key, val]) => `
      <div class="flex items-center mb-2">
        <span class="w-40 text-sm text-gray-600">${key}</span>
        <div class="flex-1 bg-gray-200 rounded-full h-2">
          <div class="bg-yellow-500 h-2 rounded-full" style="width:${val}"></div>
        </div>
        <span class="ml-2 text-sm font-medium text-gray-700">${val}</span>
      </div>
    `).join('');
  },
  
  // 权益卡片
  'benefit-card': (value, config) => {
    if (!value) return '';
    return `
      <div class="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4 text-center">
        <div class="text-3xl mb-2">🏆</div>
        <div class="font-medium text-gray-800">${config.label}</div>
      </div>
    `;
  },
  
  // 联系项
  'contact-item': (value, config) => {
    if (!value) return '';
    return `
      <div class="flex items-center">
        <span class="text-xl mr-3">${config.icon}</span>
        <div>
          <div class="text-sm text-gray-500">${config.label}</div>
          <div class="text-gray-700">${value}</div>
        </div>
      </div>
    `;
  },
  
  // 规则项
  'rule-item': (value, config) => {
    if (!value) return '';
    return `
      <div>
        <span class="font-medium text-gray-700">${config.label}:</span>
        <p class="text-gray-600 mt-1">${value}</p>
      </div>
    `;
  }
};

export default function AwardDetail({ award }) {
  // 辅助函数
  const hasValue = (val) => {
    if (val === null || val === undefined) return false;
    if (typeof val === 'string' && val.trim() === '') return false;
    if (Array.isArray(val) && val.length === 0) return false;
    if (typeof val === 'object' && Object.keys(val).length === 0) return false;
    return true;
  };

  // 通用渲染器
  const render = (fieldName, value) => {
    const config = fieldConfig[fieldName];
    if (!config || !hasValue(value)) return '';
    const renderer = renderers[config.type];
    return renderer ? renderer(value, config, award) : '';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 主标题区 */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          {render('organizer', award.organizer)}
          {render('award_name_cn', award.award_name_cn)}
          {render('award_name_en', award.award_name_en)}
          {render('award_slogan', award.award_slogan)}
          {render('award_levels', award.award_levels)}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* 费用区 */}
        {(hasValue(award.fee_early_bird) || hasValue(award.fee_regular)) && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-yellow-500">💰 参赛费用</h2>
            <div className="grid md:grid-cols-4 gap-4">
              {render('fee_early_bird', award.fee_early_bird)}
              {render('fee_regular', award.fee_regular)}
              {render('fee_final', award.fee_final)}
              {render('fee_extended', award.fee_extended)}
            </div>
            {hasValue(award.fee_notes) && (
              <div className="mt-4 text-sm text-gray-600 bg-gray-100 rounded-lg p-3">📝 {award.fee_notes}</div>
            )}
          </section>
        )}

        {/* 日期区 */}
        {hasValue(award.deadline_early) && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-yellow-500">📅 重要日期</h2>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="w-full"><tbody className="divide-y">
                {render('submission_open', award.submission_open)}
                {render('deadline_early', award.deadline_early)}
                {render('deadline_regular', award.deadline_regular)}
                {render('deadline_final', award.deadline_final)}
                {render('deadline_extended', award.deadline_extended)}
                {render('announcement_date', award.announcement_date)}
                {render('ceremony_date', award.ceremony_date)}
              </tbody></table>
            </div>
          </section>
        )}

        {/* 分类区 */}
        {hasValue(award.category_sub) && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-yellow-500">🏷️ 参赛类别</h2>
            {render('category_sub', award.category_sub)}
          </section>
        )}

        {/* 参赛要求 */}
        {(hasValue(award.project_year_limit) || hasValue(award.entrant_type)) && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-yellow-500">📋 参赛要求</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">📐 项目要求</h3>
                <ul className="space-y-2 text-sm">
                  {render('project_year_limit', award.project_year_limit)}
                  {render('project_status', award.project_status)}
                  {render('project_stage_accepted', award.project_stage_accepted)}
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">👤 参赛者要求</h3>
                <ul className="space-y-2 text-sm">
                  {render('entrant_type', award.entrant_type)}
                  {render('entrant_nationality_limit', award.entrant_nationality_limit)}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="text-center bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">准备好参赛了吗？</h2>
          <p className="text-gray-600 mb-6">设计能提供专业的参赛代理服务</p>
          <a href={award.website || '#'} className="px-8 py-3 bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600">
            前往官网报名 →
          </a>
        </section>
      </div>
    </div>
  );
}
