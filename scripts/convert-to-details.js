/**
 * 将 awards.json 转换为 award-details.json 格式
 */

const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'website', 'data');
const awardsPath = path.join(dataDir, 'awards.json');
const detailsPath = path.join(dataDir, 'award-details.json');

// 读取 awards.json
const awards = JSON.parse(fs.readFileSync(awardsPath, 'utf-8'));

// 读取现有的 award-details.json（如果有）
let details = [];
if (fs.existsSync(detailsPath)) {
  details = JSON.parse(fs.readFileSync(detailsPath, 'utf-8'));
}

// 转换函数
function convertToDetails(award) {
  return {
    award_id: award.award_id,
    name: award.award_name_cn,
    name_en: award.award_name_en,
    name_short: award.award_name_short,
    
    // 奖项介绍
    award_intro: `${award.award_name_cn}（${award.award_name_en}）是${award.organizer}主办的${award.award_type}，${award.reputation || '具有国际影响力'}。`,
    
    // 主办方
    organizer: award.organizer_cn || award.organizer,
    organizer_location: `${award.country}${award.city ? '·' + award.city : ''}`,
    organizer_intro: `${award.organizer}是${award.organizer_type || '专业机构'}，致力于表彰优秀设计作品。`,
    
    // 时间轴
    timeline: [
      { 阶段: '早鸟截止', 时间: award.deadline_early || '待定' },
      { 阶段: '常规截止', 时间: award.deadline_regular || '待定' },
      { 阶段: '最终截止', 时间: award.deadline_final || '待定' },
      { 阶段: '结果公布', 时间: award.announcement_date || '待定' },
    ].filter(item => item.时间 !== '待定'),
    
    // 评审标准
    judging_criteria: Array.isArray(award.judging_criteria) 
      ? award.judging_criteria.map(c => ({
          维度: c,
          权重: '综合评定',
          说明: ''
        }))
      : [],
    judging_note: award.judging_process || '',
    
    // 参赛要求
    requirements: {
      '参赛资格': award.entrant_type?.join('、') || '不限',
      '作品年限': award.project_year_specific || award.project_year_limit || '不限',
      '作品状态': award.project_status || '不限',
      '参赛语言': award.submission_language || '英文',
    },
    
    // 获奖权益
    benefits: award.award_winner_benefits || ['奖杯', '证书', 'Logo使用权'],
    
    // 参赛类别
    categories: (award.category_sub || []).map(cat => ({
      类别: cat,
      说明: ''
    })),
    
    // 费用说明
    fee_info: {
      '早鸟费用': award.fee_early_bird ? `${award.fee_currency} ${award.fee_early_bird}` : '待定',
      '常规费用': award.fee_regular ? `${award.fee_currency} ${award.fee_regular}` : '待定',
      '最终费用': award.fee_final ? `${award.fee_currency} ${award.fee_final}` : '待定',
      '付款方式': (award.fee_payment_methods || []).join('、'),
      '备注': award.fee_notes || '',
    },
    
    // 作品要求
    submission_requirements: {
      '图片格式': (award.image_format || []).join('、'),
      '图片数量': `${award.image_min_count || 0}-${award.image_max_count || '不限'}张`,
      '图片规格': award.image_resolution || '',
      '视频格式': (award.video_format || []).join('、'),
      '视频数量': `${award.video_min_count || 0}-${award.video_max_count || '不限'}个`,
      '视频时长': award.video_duration || '',
    },
    
    // 联系方式
    contact: {
      '官网': award.website,
      '邮箱': award.contact_email,
      '电话': award.contact_phone,
      '地址': award.contact_address,
    },
    
    // 相关链接
    links: {
      '参赛指南': award.entry_guide_url,
      'FAQ': award.faq_url,
      '规则': award.rules_url,
    },
    
    // 备注
    notes: award.notes || '',
  };
}

// 处理每个奖项
let addedCount = 0;
awards.forEach(award => {
  const existingIndex = details.findIndex(d => d.award_id === award.award_id);
  const converted = convertToDetails(award);
  
  if (existingIndex >= 0) {
    // 更新现有
    details[existingIndex] = { ...details[existingIndex], ...converted };
    console.log(`✓ 更新: ${award.award_name_cn}`);
  } else {
    // 添加新
    details.push(converted);
    addedCount++;
    console.log(`✓ 新增: ${award.award_name_cn}`);
  }
});

// 保存
fs.writeFileSync(detailsPath, JSON.stringify(details, null, 2), 'utf-8');

console.log(`\n========================================`);
console.log(`转换完成`);
console.log(`新增: ${addedCount} 个奖项`);
console.log(`总计: ${details.length} 个奖项`);
console.log(`========================================`);
