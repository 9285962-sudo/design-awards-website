/**
 * 奖项数据完善工具
 * 从已采集的原始内容中提取结构化信息
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', '奖项数据');

// 读取所有已采集的奖项数据
function getAllAwardFiles() {
  const files = fs.readdirSync(DATA_DIR);
  return files.filter(f => f.endsWith('_完整字段数据.json'));
}

// 从文本中提取费用信息
function extractFees(text) {
  const fees = {};
  
  // 费用模式匹配
  const patterns = [
    { regex: /early\s*bird[\s:]*\$?(\d[\d,]*)/i, key: 'earlyBird' },
    { regex: /early[\s:]*\$?(\d[\d,]*)/i, key: 'earlyBird' },
    { regex: /regular[\s:]*\$?(\d[\d,]*)/i, key: 'regular' },
    { regex: /standard[\s:]*\$?(\d[\d,]*)/i, key: 'regular' },
    { regex: /late[\s:]*\$?(\d[\d,]*)/i, key: 'late' },
    { regex: /final[\s:]*\$?(\d[\d,]*)/i, key: 'late' },
    { regex: /entry\s*fee[\s:]*\$?(\d[\d,]*)/i, key: 'entryFee' },
    { regex: /submission\s*fee[\s:]*\$?(\d[\d,]*)/i, key: 'entryFee' },
  ];
  
  patterns.forEach(({ regex, key }) => {
    const match = text.match(regex);
    if (match && !fees[key]) {
      fees[key] = `$${match[1].replace(/,/g, '')}`;
    }
  });
  
  return fees;
}

// 提取日期信息
function extractDates(text) {
  const dates = {};
  
  const patterns = [
    { regex: /entry\s*open[\s:]*([A-Za-z]+\s+\d{1,2}[,.\s]+\d{4})/i, key: 'entryOpen' },
    { regex: /entry\s*close[\s:]*([A-Za-z]+\s+\d{1,2}[,.\s]+\d{4})/i, key: 'entryClose' },
    { regex: /deadline[\s:]*([A-Za-z]+\s+\d{1,2}[,.\s]+\d{4})/i, key: 'deadline' },
    { regex: /results?\s*(?:announce|publish)[\s:]*([A-Za-z]+\s+\d{1,2}[,.\s]+\d{4})/i, key: 'results' },
  ];
  
  patterns.forEach(({ regex, key }) => {
    const match = text.match(regex);
    if (match && !dates[key]) {
      dates[key] = match[1];
    }
  });
  
  return dates;
}

// 提取联系方式
function extractContact(text) {
  const contact = {};
  
  // 邮箱
  const emailMatch = text.match(/([\w.-]+@[\w.-]+\.\w{2,})/);
  if (emailMatch) {
    contact.email = emailMatch[1];
  }
  
  // 电话
  const phoneMatch = text.match(/[\+]?[(]?\d{2,4}[)]?[-\s.]?\d{2,4}[-\s.]?\d{4,}/);
  if (phoneMatch) {
    contact.phone = phoneMatch[0];
  }
  
  return contact;
}

// 提取主办方
function extractOrganizer(text) {
  const patterns = [
    /organized\s*by[\s:]*([^,.]+)/i,
    /presented\s*by[\s:]*([^,.]+)/i,
    /hosted\s*by[\s:]*([^,.]+)/i,
    /by\s+([A-Z][A-Za-z\s]+(?:Association|Organization|Council|Institute|Foundation|Awards?))/,
  ];
  
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      return match[1].trim();
    }
  }
  
  return null;
}

// 提取类别
function extractCategories(text) {
  const categories = [];
  const categoryKeywords = [
    'architecture', 'interior', 'product', 'graphic', 'visual',
    'landscape', 'urban', 'lighting', 'furniture', 'packaging',
    'branding', 'digital', 'ui', 'ux', 'web', 'mobile'
  ];
  
  categoryKeywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\w*`, 'gi');
    const matches = text.match(regex);
    if (matches && matches.length > 2) {
      categories.push(keyword);
    }
  });
  
  return [...new Set(categories)];
}

// 完善单个奖项数据
function enrichAwardData(filename) {
  const filepath = path.join(DATA_DIR, filename);
  const data = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
  
  console.log(`\n处理: ${data.basic_info?.name || filename}`);
  
  // 获取所有文本内容
  const allText = Object.values(data.raw_content || {}).join(' ');
  
  if (!allText || allText.length < 100) {
    console.log('  ⚠️ 内容太少，跳过');
    return null;
  }
  
  // 提取结构化信息
  const enriched = {
    ...data,
    extracted: {
      fees: extractFees(allText),
      dates: extractDates(allText),
      contact: extractContact(allText),
      organizer: extractOrganizer(allText),
      categories: extractCategories(allText),
    },
    enrichment_timestamp: new Date().toISOString(),
  };
  
  // 统计提取结果
  const stats = {
    fees: Object.keys(enriched.extracted.fees).length,
    dates: Object.keys(enriched.extracted.dates).length,
    contact: Object.keys(enriched.extracted.contact).length,
    organizer: enriched.extracted.organizer ? 1 : 0,
    categories: enriched.extracted.categories.length,
  };
  
  console.log(`  ✓ 提取: 费用${stats.fees}项, 日期${stats.dates}项, 联系方式${stats.contact}项, 主办方${stats.organizer}, 类别${stats.categories}个`);
  
  // 保存完善后的数据
  const outputPath = path.join(DATA_DIR, filename.replace('_完整字段数据.json', '_完善数据.json'));
  fs.writeFileSync(outputPath, JSON.stringify(enriched, null, 2), 'utf-8');
  
  return { filename, stats, outputPath };
}

// 生成汇总报告
function generateReport(results) {
  const total = results.length;
  const withFees = results.filter(r => r.stats.fees > 0).length;
  const withDates = results.filter(r => r.stats.dates > 0).length;
  const withContact = results.filter(r => r.stats.contact > 0).length;
  const withOrganizer = results.filter(r => r.stats.organizer > 0).length;
  
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      total,
      withFees,
      withDates,
      withContact,
      withOrganizer,
    },
    details: results,
  };
  
  const reportPath = path.join(DATA_DIR, '数据完善报告.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
  
  console.log('\n========================================');
  console.log('数据完善报告');
  console.log('========================================');
  console.log(`总计处理: ${total} 个奖项`);
  console.log(`有费用信息: ${withFees} (${Math.round(withFees/total*100)}%)`);
  console.log(`有日期信息: ${withDates} (${Math.round(withDates/total*100)}%)`);
  console.log(`有联系方式: ${withContact} (${Math.round(withContact/total*100)}%)`);
  console.log(`有主办方: ${withOrganizer} (${Math.round(withOrganizer/total*100)}%)`);
  console.log(`\n报告已保存: ${reportPath}`);
}

// 主函数
function main() {
  console.log('========================================');
  console.log('奖项数据完善工具');
  console.log('从原始内容中提取结构化信息');
  console.log('========================================\n');
  
  const files = getAllAwardFiles();
  console.log(`找到 ${files.length} 个奖项数据文件`);
  
  const results = [];
  
  files.forEach(filename => {
    const result = enrichAwardData(filename);
    if (result) {
      results.push(result);
    }
  });
  
  generateReport(results);
}

main();
