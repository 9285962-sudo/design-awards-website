const awardsData = require('./website/data/awards.json');

const categoryMap = {
  architecture: ['建筑设计', '空间设计', '景观设计'],
  interior: ['室内设计'],
  product: ['产品设计', '工业设计', '家具设计'],
  visual: ['视觉传达', '品牌设计', '平面设计', '包装设计'],
  marketing: ['广告营销'],
  general: ['综合设计']
};

function filterByCategory(category, limit = 4) {
  const keywords = categoryMap[category] || []
  return awardsData.filter(a => 
    keywords.some(k => 
      a.category_main?.includes(k) || 
      a.category_sub?.includes(k) ||
      a.award_name_cn?.includes(k)
    )
  ).slice(0, limit)
}

console.log('总奖项数:', awardsData.length);
console.log('');

Object.keys(categoryMap).forEach(cat => {
  const results = filterByCategory(cat, 100);
  console.log(`${cat}: ${results.length} 个奖项`);
  if (results.length > 0) {
    console.log('  示例:', results.slice(0, 3).map(a => a.award_name_cn).join(', '));
  }
});
