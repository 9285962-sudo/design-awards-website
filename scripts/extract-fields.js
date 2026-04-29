/**
 * 从采集的原始文本中自动提取结构化字段
 * 能提取的：邮箱、电话、日期、费用关键词、类别关键词、评委姓名
 * 不能提取的：奖项介绍、评审标准等需要 AI 理解的内容 → 放原始文本供后续处理
 */

const fs = require('fs');
const path = require('path');

const RAW_DIR = path.join(__dirname, '..', '奖项数据', '_scrape_raw');
const OUTPUT_DIR = path.join(__dirname, '..', '奖项数据', '_extracted');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// 奖项基础信息（从 awards.json 获取）
const awardsData = require(path.join(__dirname, '..', 'website', 'data', 'awards.json'));

// 读取所有深度采集文件
const deepFiles = fs.readdirSync(RAW_DIR)
  .filter(function(f) { return f.endsWith('_deep.json'); });

console.log('============================');
console.log('自动提取结构化字段');
console.log('文件数:', deepFiles.length);
console.log('============================\n');

function extractField(text, patterns) {
  for (var i = 0; i < patterns.length; i++) {
    var m = text.match(patterns[i]);
    if (m) return m[1] || m[0];
  }
  return null;
}

function extractAll(text, pages) {
  var allText = '';
  for (var key in pages) {
    allText += '\n--- ' + key + ' ---\n' + pages[key].text;
  }

  var result = {};

  // 邮箱
  var emails = [];
  var emailMatches = allText.match(/[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g);
  if (emailMatches) {
    var seen = {};
    emailMatches.forEach(function(e) {
      var lower = e.toLowerCase();
      if (!seen[lower] && !lower.match(/\.png|\.jpg|\.jpeg|\.gif|\.css|\.js/i) && lower.indexOf('wordpress') === -1) {
        seen[lower] = true;
        emails.push(e);
      }
    });
  }
  if (emails.length > 0) result.contact_email = emails[0];

  // 电话
  var phone = extractField(allText, [
    /(?:Phone|Tel|Telephone|电话)[\s:]+([+\d\s\-\(\)]{7,20})/i,
    /\+[\d\s\-\(\)]{7,20}/
  ]);
  if (phone) result.contact_phone = phone.trim();

  // 费用关键词
  var feeAmounts = [];
  var feeMatches = allText.match(/\$\d[\d,]*(?:\.\d{2})?|\u20ac\d[\d,]*(?:\.\d{2})?|USD\s?\d[\d,]*|EUR\s?\d[\d,]*/gi);
  if (feeMatches) {
    var uniqueFees = [];
    var seenFees = {};
    feeMatches.forEach(function(f) {
      if (!seenFees[f]) {
        seenFees[f] = true;
        uniqueFees.push(f);
      }
    });
    if (uniqueFees.length > 0) result.raw_fees = uniqueFees.slice(0, 10);
  }

  // 日期
  var dates = [];
  var dateMatches = allText.match(/(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}/gi);
  if (dateMatches) {
    var seenDates = {};
    dateMatches.forEach(function(d) {
      if (!seenDates[d]) { seenDates[d] = true; dates.push(d); }
    });
  }
  if (dates.length > 0) result.raw_dates = dates.slice(0, 15);

  // 截止日期关键词
  var deadlines = [];
  var dlMatches = allText.match(/(?:deadline|closing|final\s*date|due\s*date|last\s*date)[^.!?\n]{0,100}/gi);
  if (dlMatches) {
    dlMatches.forEach(function(d) {
      deadlines.push(d.trim());
    });
  }
  if (deadlines.length > 0) result.raw_deadlines = deadlines.slice(0, 10);

  // 类别关键词
  var categories = [];
  var catMatches = allText.match(/(?:architecture|interior|product|graphic|industrial|landscape|urban|communication|fashion|lighting|furniture|transport|packaging|concept|branding|typography|illustration|photography|video|web|mobile|ux|ui|game|service|social|sustainable|green|smart|digital|interactive)/gi);
  if (catMatches) {
    var seenCats = {};
    catMatches.forEach(function(c) {
      var lower = c.toLowerCase();
      if (!seenCats[lower]) { seenCats[lower] = true; categories.push(c); }
    });
  }
  if (categories.length > 0) result.raw_categories = categories;

  // 评委相关
  var judges = [];
  var judgeMatches = allText.match(/(?:jury|judge|judging\s*panel)[^.!?\n]{0,200}/gi);
  if (judgeMatches) {
    judgeMatches.forEach(function(j) {
      var trimmed = j.trim().substring(0, 200);
      if (trimmed.length > 10) judges.push(trimmed);
    });
  }
  if (judges.length > 0) result.raw_judges = judges.slice(0, 5);

  // 评审标准
  var criteria = [];
  var critMatches = allText.match(/(?:criteria|evaluation|assessment|judging\s*criteria|selection)[^.!?\n]{0,200}/gi);
  if (critMatches) {
    critMatches.forEach(function(c) {
      var trimmed = c.trim().substring(0, 200);
      if (trimmed.length > 10) criteria.push(trimmed);
    });
  }
  if (criteria.length > 0) result.raw_criteria = criteria.slice(0, 5);

  // 奖项等级
  var levels = [];
  var levelMatches = allText.match(/(?:gold|silver|bronze|platinum|diamond|grand\s*prix|best\s*in|first\s*prize|winner|finalist|shortlist|honorable\s*mention|special\s*mention|award\s*of\s*excellence|merit)/gi);
  if (levelMatches) {
    var seenLevels = {};
    levelMatches.forEach(function(l) {
      var lower = l.toLowerCase();
      if (!seenLevels[lower]) { seenLevels[lower] = true; levels.push(l); }
    });
  }
  if (levels.length > 0) result.raw_award_levels = levels;

  return result;
}

function findAward(awardId) {
  return awardsData.find(function(a) { return a.award_id === awardId; });
}

var successCount = 0;
for (var i = 0; i < deepFiles.length; i++) {
  var fileName = deepFiles[i];
  var filePath = path.join(RAW_DIR, fileName);
  
  var data;
  try {
    data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch(e) {
    console.log('[' + (i+1) + '/' + deepFiles.length + '] 跳过(解析失败): ' + fileName);
    continue;
  }

  console.log('[' + (i+1) + '/' + deepFiles.length + '] ' + (data.name || data.award_id));

  var award = findAward(data.award_id);
  if (!award) {
    console.log('  ⚠ 未找到基础信息');
    continue;
  }

  // 自动提取
  var extracted = extractField('', []); // placeholder
  extracted = extractAll('', data.pages);

  // 构建部分结构化记录
  var record = {
    award_id: data.award_id,
    name: award.award_name_cn || award.award_name_en || data.name || '',
    name_en: award.award_name_en || '',
    website: data.base_url || award.website || '',
    organizer: award.organizer_cn || award.organizer || '',
    organizer_location: award.country ? (award.city ? award.country + ' · ' + award.city : award.country) : '',
    // 自动提取的原始数据
    extracted: extracted,
    // 页面摘要（供 AI 后续处理）
    page_summaries: {}
  };

  for (var key in data.pages) {
    record.page_summaries[key] = {
      url: data.pages[key].url,
      chars: data.pages[key].text.length,
      preview: data.pages[key].text.substring(0, 500)
    };
  }

  // 保存
  var safeName = data.award_id.replace(/[^a-zA-Z0-9\u4e00-\u9fff_]/g, '_');
  var outPath = path.join(OUTPUT_DIR, safeName + '.json');
  fs.writeFileSync(outPath, JSON.stringify(record, null, 2), 'utf-8');

  console.log('  ✅ 保存 (' + Object.keys(extracted).length + ' 个自动提取字段)');
  successCount++;
}

console.log('\n============================');
console.log('自动提取完成！');
console.log('成功:', successCount + '/' + deepFiles.length);
console.log('输出目录:', OUTPUT_DIR);
console.log('============================');
