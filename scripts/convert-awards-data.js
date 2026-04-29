#!/usr/bin/env node
/**
 * 将采集的奖项数据转换为网站格式并合并
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', '奖项数据');
const OUTPUT_FILE = path.join(__dirname, '..', 'website', 'data', 'awards.json');

// 读取现有的awards.json
let existingAwards = [];
try {
  const content = fs.readFileSync(OUTPUT_FILE, 'utf-8');
  existingAwards = JSON.parse(content);
  console.log(`读取现有奖项: ${existingAwards.length} 个`);
} catch (e) {
  console.log('现有奖项文件不存在或为空，创建新文件');
}

// 已存在的award_id集合
const existingIds = new Set(existingAwards.map(a => a.award_id));

// 分类映射
function detectCategory(name, description = '') {
  const text = (name + ' ' + description).toLowerCase();
  
  if (text.includes('architecture') || text.includes('建筑') || text.includes('architect')) {
    return { main: '建筑设计', sub: ['建筑设计', '空间设计'] };
  }
  if (text.includes('interior') || text.includes('室内')) {
    return { main: '室内设计', sub: ['室内设计', '空间设计'] };
  }
  if (text.includes('product') || text.includes('产品') || text.includes('industrial')) {
    return { main: '产品设计', sub: ['产品设计', '工业设计'] };
  }
  if (text.includes('landscape') || text.includes('景观')) {
    return { main: '景观设计', sub: ['景观设计'] };
  }
  if (text.includes('visual') || text.includes('graphic') || text.includes('平面') || text.includes('品牌')) {
    return { main: '视觉传达', sub: ['视觉传达', '品牌设计', '平面设计'] };
  }
  if (text.includes('lighting') || text.includes('照明')) {
    return { main: '照明设计', sub: ['照明设计'] };
  }
  if (text.includes('furniture') || text.includes('家具')) {
    return { main: '家具设计', sub: ['家具设计'] };
  }
  
  return { main: '综合设计', sub: ['综合设计'] };
}

// 转换单个奖项数据
function convertAward(filename, data) {
  const name = filename.replace('_完整字段数据.json', '').replace(/_/g, ' ');
  const basic = data.basic_info || {};
  const contact = data.contact || {};
  
  // 生成award_id
  const awardId = name.toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .substring(0, 30) + '_2026';
  
  // 检查是否已存在
  if (existingIds.has(awardId)) {
    console.log(`  跳过已存在: ${name}`);
    return null;
  }
  
  // 检测分类
  const category = detectCategory(basic.name || name, basic.description);
  
  // 提取邮箱
  let email = contact.contact_email || '';
  if (email.includes(',')) {
    email = email.split(',')[1]?.trim() || email;
  }
  
  return {
    award_id: awardId,
    award_name_cn: basic.name || name,
    award_name_en: basic.name || name,
    award_name_short: name.split(' ')[0],
    organizer: '待补充',
    country: '待补充',
    website: basic.website || '',
    category_main: category.main,
    category_sub: category.sub,
    award_type: '综合奖',
    award_cycle: '年度',
    edition_current: 2026,
    fee_currency: 'USD',
    fee_early_bird: null,
    fee_regular: null,
    fee_final: null,
    fee_student: null,
    deadline_early: null,
    deadline_regular: null,
    deadline_final: null,
    announcement_date: null,
    contact_email: email,
    description: basic.description || '',
    raw_data: data, // 保留原始数据
    data_source: 'auto_collected',
    collected_at: new Date().toISOString()
  };
}

// 主函数
async function main() {
  console.log('========== 奖项数据转换 ==========\n');
  
  // 读取所有JSON文件
  const files = fs.readdirSync(DATA_DIR)
    .filter(f => f.endsWith('_完整字段数据.json'))
    .filter(f => !f.includes('error'));
  
  console.log(`找到 ${files.length} 个奖项数据文件\n`);
  
  const newAwards = [];
  let skipped = 0;
  
  for (const file of files) {
    const filepath = path.join(DATA_DIR, file);
    try {
      const content = fs.readFileSync(filepath, 'utf-8');
      const data = JSON.parse(content);
      
      const award = convertAward(file, data);
      if (award) {
        newAwards.push(award);
        console.log(`✅ 转换: ${award.award_name_cn}`);
      } else {
        skipped++;
      }
    } catch (e) {
      console.log(`❌ 错误: ${file} - ${e.message}`);
    }
  }
  
  console.log(`\n转换完成: ${newAwards.length} 个新奖项`);
  console.log(`跳过已存在: ${skipped} 个`);
  
  // 合并数据
  const allAwards = [...existingAwards, ...newAwards];
  
  // 保存
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allAwards, null, 2), 'utf-8');
  
  console.log(`\n总计: ${allAwards.length} 个奖项`);
  console.log(`保存到: ${OUTPUT_FILE}`);
  
  // 生成分类统计
  const categoryCount = {};
  allAwards.forEach(a => {
    const cat = a.category_main || '未分类';
    categoryCount[cat] = (categoryCount[cat] || 0) + 1;
  });
  
  console.log('\n分类统计:');
  Object.entries(categoryCount).forEach(([cat, count]) => {
    console.log(`  ${cat}: ${count} 个`);
  });
}

main().catch(console.error);
