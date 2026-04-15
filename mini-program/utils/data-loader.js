/**
 * 数据加载工具
 * 统一从JSON文件加载奖项数据
 */

// 基础奖项列表（精简字段，用于列表展示）
const awardsList = require('../data/awards.json');

// 完整奖项数据映射
const awardDataMap = {
  'muse_design_2026': () => require('../data/awards-muse.json'),
  'dandad_awards_professional': () => require('../data/awards-dandad.json'),
  'dandad_newblood_2026': () => require('../data/awards-newblood.json'),
  'riba_international_awards': () => require('../data/awards-riba.json'),
  'lia_london_international_awards': () => require('../data/awards-lia.json'),
  'andrew_martin_2026': () => require('../data/awards-andrewmartin.json')
};

/**
 * 获取所有奖项列表（精简字段）
 */
function getAwardsList() {
  return awardsList.map(award => ({
    award_id: award.award_id,
    award_name_cn: award.award_name_cn,
    award_name_en: award.award_name_en,
    award_name_short: award.award_name_short,
    category_main: award.category_main,
    country: award.country,
    prestige_level: award.prestige_level,
    difficulty_level: award.difficulty_level,
    fee_currency: award.fee_currency,
    fee_regular: award.fee_regular,
    deadline_final: award.deadline_final,
    logo_url: award.logo_url
  }));
}

/**
 * 获取单个奖项完整数据
 */
function getAwardDetail(awardId) {
  // 优先从完整数据加载
  if (awardDataMap[awardId]) {
    try {
      return awardDataMap[awardId]();
    } catch (e) {
      console.warn(`完整数据加载失败: ${awardId}, 使用基础数据`);
    }
  }
  
  // 回退到基础数据
  return awardsList.find(a => a.award_id === awardId);
}

/**
 * 获取获奖作品数据
 */
function getWinners(awardId, year) {
  try {
    const fileName = `winners-${awardId.replace('_', '-')}-${year}.json`;
    return require(`../data/winners/${fileName}`);
  } catch (e) {
    console.warn(`获奖作品数据不存在: ${awardId} ${year}`);
    return null;
  }
}

/**
 * 按类别筛选奖项
 */
function filterAwardsByCategory(category) {
  if (!category || category === '全部') {
    return getAwardsList();
  }
  return getAwardsList().filter(a => 
    a.category_main === category || 
    a.category_sub?.includes(category)
  );
}

/**
 * 按费用筛选奖项
 */
function filterAwardsByFee(maxFee) {
  return getAwardsList().filter(a => {
    const fee = a.fee_regular || a.fee_early_bird || 9999;
    return fee <= maxFee;
  });
}

module.exports = {
  getAwardsList,
  getAwardDetail,
  getWinners,
  filterAwardsByCategory,
  filterAwardsByFee
};
