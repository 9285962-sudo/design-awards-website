#!/usr/bin/env node
/**
 * 将采集的奖项数据合并到现有awards.json
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', '奖项数据');
const AWARDS_FILE = path.join(__dirname, '..', 'website', 'data', 'awards.json');

// 读取现有的awards.json
let existingAwards = [];
try {
  const content = fs.readFileSync(AWARDS_FILE, 'utf-8');
  existingAwards = JSON.parse(content);
  console.log(`✅ 读取现有奖项: ${existingAwards.length} 个`);
} catch (e) {
  console.log('⚠️  现有奖项文件读取失败，创建新数组');
  existingAwards = [];
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
  const baseId = name.toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .substring(0, 25);
  const awardId = baseId + '_2026';
  
  // 检查是否已存在
  if (existingIds.has(awardId)) {
    return null;
  }
  
  // 检测分类
  const category = detectCategory(basic.name || name, basic.description);
  
  // 提取邮箱
  let email = contact.contact_email || '';
  if (email.includes(',')) {
    email = email.split(',')[1]?.trim() || email;
  }
  if (email.includes('@2x.png')) {
    email = '';
  }
  
  // 生成短名称
  const shortName = basic.name ? basic.name.split(' ').slice(0, 2).join(' ') : name.split(' ')[0];
  
  return {
    award_id: awardId,
    award_name_cn: basic.name || name,
    award_name_en: basic.name || name,
    award_name_short: shortName,
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
    data_source: 'auto_collected',
    collected_at: new Date().toISOString()
  };
}

// 主函数
async function main() {
  console.log('========== 奖项数据合并 ==========\n');
  
  // 读取所有JSON文件
  const files = fs.readdirSync(DATA_DIR)
    .filter(f => f.endsWith('_完整字段数据.json'))
    .filter(f => !f.includes('error'))
    .filter(f => !f.includes('MUSE')) // 跳过已存在的MUSE
    .filter(f => !f.includes('D&AD')) // 跳过已存在的D&AD
    .filter(f => !f.includes('RIBA')) // 跳过已存在的RIBA
    .filter(f => !f.includes('LIA')) // 跳过已存在的LIA
    .filter(f => !f.includes('AndrewMartin')); // 跳过已存在的Andrew Martin
  
  console.log(`找到 ${files.length} 个待合并的奖项数据文件\n`);
  
  const newAwards = [];
  let skipped = 0;
  let errors = 0;
  
  for (const file of files) {
    const filepath = path.join(DATA_DIR, file);
    try {
      const content = fs.readFileSync(filepath, 'utf-8');
      const data = JSON.parse(content);
      
      const award = convertAward(file, data);
      if (award) {
        newAwards.push(award);
        console.log(`✅ ${award.award_name_cn}`);
      } else {
        skipped++;
        console.log(`⏭️  跳过已存在: ${file.replace('_完整字段数据.json', '')}`);
      }
    } catch (e) {
      errors++;
      console.log(`❌ 错误: ${file} - ${e.message}`);
    }
  }
  
  console.log(`\n转换完成: ${newAwards.length} 个新奖项`);
  console.log(`跳过已存在: ${skipped} 个`);
  console.log(`错误: ${errors} 个`);
  
  if (newAwards.length === 0) {
    console.log('\n没有新奖项需要添加');
    return;
  }
  
  // 合并数据
  const allAwards = [...existingAwards, ...newAwards];
  
  // 保存
  fs.writeFileSync(AWARDS_FILE, JSON.stringify(allAwards, null, 2), 'utf-8');
  
  console.log(`\n✅ 总计: ${allAwards.length} 个奖项`);
  console.log(`   原有: ${existingAwards.length} 个`);
  console.log(`   新增: ${newAwards.length} 个`);
  console.log(`\n保存到: ${AWARDS_FILE}`);
  
  // 生成分类统计
  const categoryCount = {};
  newAwards.forEach(a => {
    const cat = a.category_main || '未分类';
    categoryCount[cat] = (categoryCount[cat] || 0) + 1;
  });
  
  console.log('\n新增奖项分类:');
  Object.entries(categoryCount).forEach(([cat, count]) => {
    console.log(`  ${cat}: ${count} 个`);
  });
  
  console.log('\n下一步:');
  console.log('  1. 运行: cd website && npm run build');
  console.log('  2. 部署: npx wrangler pages deploy out --branch=main');
}

main().catch(err => {
  console.error('程序错误:', err);
  process.exit(1);
});
