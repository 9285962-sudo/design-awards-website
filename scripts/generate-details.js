/**
 * 生成 award-details.json 的批量条目
 * 从 _extracted 目录读取自动提取的数据 + awards.json 的基础数据
 * 生成完整的 award-details.json 条目（缺失字段留空，后续 AI 补充）
 */

const fs = require('fs');
const path = require('path');

const EXTRACTED_DIR = path.join(__dirname, '..', '奖项数据', '_extracted');
const DETAILS_PATH = path.join(__dirname, '..', 'website', 'data', 'award-details.json');
const AWARDS_PATH = path.join(__dirname, '..', 'website', 'data', 'awards.json');

// 读取已有详细数据
const existingDetails = require(DETAILS_PATH);
const existingIds = new Set(existingDetails.map(function(a) { return a.award_id; }));

// 读取所有奖项
const allAwards = require(AWARDS_PATH);

// 读取提取数据
const extractedFiles = fs.readdirSync(EXTRACTED_DIR).filter(function(f) { return f.endsWith('.json'); });

console.log('============================');
console.log('生成 award-details.json 条目');
console.log('已有详细数据:', existingDetails.length);
console.log('待生成:', extractedFiles.length);
console.log('============================\n');

var newEntries = [];

for (var i = 0; i < extractedFiles.length; i++) {
  var fileName = extractedFiles[i];
  var filePath = path.join(EXTRACTED_DIR, fileName);

  var data;
  try {
    data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch(e) { continue; }

  // 跳过已有的
  if (existingIds.has(data.award_id)) {
    console.log('[' + (i+1) + '] 跳过(已有): ' + data.name);
    continue;
  }

  // 找到对应的 awards.json 数据
  var award = allAwards.find(function(a) { return a.award_id === data.award_id; });
  if (!award) {
    console.log('[' + (i+1) + '] 跳过(无基础数据): ' + data.award_id);
    continue;
  }

  var ext = data.extracted || {};

  // 构建条目
  var entry = {
    award_id: data.award_id,
    name: award.award_name_cn || data.name || '',
    name_en: award.award_name_en || data.name_en || '',
    category: [],
    award_intro: '',
    website: data.website || award.website || '',
    organizer: data.organizer || award.organizer_cn || award.organizer || '',
    organizer_intro: '',
    organizer_location: data.organizer_location || '',
    fee_timeline: [],
    fee_note: '',
    timeline: [],
    award_levels: [],
    level_note: '',
    judging_criteria: [],
    judging_note: '',
    requirements: {},
    requirements_note: '',
    submission_requirements: {},
    benefits: [],
    judges: [],
    judges_note: '',
    faq: [],
    chinese_winners: [],
    contact: {},
    notes: ''
  };

  // 填充自动提取的数据
  if (ext.contact_email) entry.contact['邮箱'] = ext.contact_email;
  if (ext.contact_phone) entry.contact['电话'] = ext.contact_phone;

  // 类别（从 awards.json 的 category_sub 取）
  if (award.category_sub && award.category_sub.length > 0) {
    entry.category = award.category_sub;
  }

  // 费用（从 awards.json 的结构化字段）
  if (award.fee_early_bird || award.fee_regular) {
    var feeItems = [];
    if (award.fee_early_bird) {
      feeItems.push({
        period: '早鸟价',
        date: award.deadline_early || '',
        price: award.fee_early_bird,
        note: ''
      });
    }
    if (award.fee_regular) {
      feeItems.push({
        period: '常规价',
        date: award.deadline_regular || '',
        price: award.fee_regular,
        note: ''
      });
    }
    if (award.fee_student) {
      feeItems.push({
        period: '学生价',
        date: '',
        price: award.fee_student,
        note: ''
      });
    }
    entry.fee_timeline = feeItems;
    entry.fee_note = award.fee_notes || '';
  }

  // 时间线（从 awards.json）
  if (award.deadline_early) {
    entry.timeline.push({ '阶段': '早鸟截止', '时间': award.deadline_early });
  }
  if (award.deadline_regular) {
    entry.timeline.push({ '阶段': '常规截止', '时间': award.deadline_regular });
  }
  if (award.deadline_late) {
    entry.timeline.push({ '阶段': '延期截止', '时间': award.deadline_late });
  }
  if (award.deadline_final) {
    entry.timeline.push({ '阶段': '最终截止', '时间': award.deadline_final });
  }

  // 评审标准（从 awards.json）
  var jc = award.judging_criteria || award.evaluation_criteria || [];
  if (typeof jc === 'string') {
    jc = jc.split(/[,，、;；]/).map(function(s) { return s.trim(); }).filter(Boolean);
  }
  if (Array.isArray(jc) && jc.length > 0) entry.judging_criteria = jc;

  // 奖项等级（从 awards.json）
  var al = award.award_levels || award.prize_levels || [];
  if (Array.isArray(al) && al.length > 0) entry.award_levels = al;

  // 参赛要求（从 awards.json 的散列字段聚合）
  var reqs = {};
  if (award.eligibility) reqs['参赛资格'] = award.eligibility;
  if (award.age_requirement) reqs['年龄限制'] = award.age_requirement;
  if (award.project_year_limit) reqs['作品年限'] = award.project_year_limit;
  if (award.submission_language || award.language_primary) reqs['参赛语言'] = award.submission_language || award.language_primary;
  if (Object.keys(reqs).length > 0) entry.requirements = reqs;

  // 获奖权益
  var ben = award.benefits || award.award_winner_benefits || [];
  if (Array.isArray(ben) && ben.length > 0) entry.benefits = ben;

  // 保存原始提取数据作为备注
  var rawNotes = [];
  if (ext.raw_fees && ext.raw_fees.length > 0) rawNotes.push('采集到费用信息: ' + ext.raw_fees.join(', '));
  if (ext.raw_dates && ext.raw_dates.length > 0) rawNotes.push('采集到日期: ' + ext.raw_dates.join(', '));
  if (ext.raw_deadlines && ext.raw_deadlines.length > 0) rawNotes.push('截止日期: ' + ext.raw_deadlines.join('; '));
  if (ext.raw_judges && ext.raw_judges.length > 0) rawNotes.push('评审信息: ' + ext.raw_judges.join('; '));
  if (ext.raw_criteria && ext.raw_criteria.length > 0) rawNotes.push('评审标准: ' + ext.raw_criteria.join('; '));
  if (ext.raw_award_levels && ext.raw_award_levels.length > 0) rawNotes.push('奖项等级关键词: ' + ext.raw_award_levels.join(', '));
  entry._raw_extracted = rawNotes.join('\n');

  // 统计填充率
  var filledFields = 0;
  var totalFields = 16; // 主要字段
  if (entry.category.length > 0) filledFields++;
  if (entry.award_intro) filledFields++;
  if (entry.fee_timeline.length > 0) filledFields++;
  if (entry.timeline.length > 0) filledFields++;
  if (entry.award_levels.length > 0) filledFields++;
  if (entry.judging_criteria.length > 0) filledFields++;
  if (Object.keys(entry.requirements).length > 0) filledFields++;
  if (entry.benefits.length > 0) filledFields++;
  if (Object.keys(entry.contact).length > 0) filledFields++;
  if (entry.fee_note) filledFields++;
  if (entry.judging_note) filledFields++;

  newEntries.push(entry);
  console.log('[' + (i+1) + '] ' + data.name + ' → 填充 ' + filledFields + '/' + totalFields + ' 个字段');
}

console.log('\n============================');
console.log('生成条目:', newEntries.length);
console.log('============================');

// 追加到 award-details.json
var merged = existingDetails.concat(newEntries);
fs.writeFileSync(DETAILS_PATH, JSON.stringify(merged, null, 2), 'utf-8');
console.log('已写入 award-details.json');
console.log('总条目数:', merged.length);
