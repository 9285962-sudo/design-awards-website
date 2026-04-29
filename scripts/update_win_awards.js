const fs = require('fs');
const path = require('path');

// 读取awards.json
const awardsPath = path.join(__dirname, '../website/data/awards.json');
const awardsData = JSON.parse(fs.readFileSync(awardsPath, 'utf8'));

// 找到WIN Awards的索引
const winIndex = awardsData.findIndex(a => a.award_id === 'win_awards_2026');

if (winIndex === -1) {
  console.log('WIN Awards not found');
  process.exit(1);
}

// WIN Awards完整更新数据
const winAwards = awardsData[winIndex];

// 基础信息更新
winAwards.award_name_cn = '世界室内新闻奖';
winAwards.award_name_en = 'World Interiors News Awards';
winAwards.award_name_short = 'WIN Awards';
winAwards.award_slogan = '表彰全球室内设计领域的创新精神与杰出作品';
winAwards.organizer = 'World Interiors News';
winAwards.organizer_cn = '英国World Interiors News（隶属于World Architecture News世界建筑新闻）';
winAwards.organizer_type = '商业媒体';
winAwards.country = '英国';
winAwards.city = '伦敦';
winAwards.website = 'https://www.worldinteriorsnewsawards.com/';
winAwards.category_main = '室内设计';
winAwards.award_type = '室内设计奖';
winAwards.award_cycle = '年度';
winAwards.edition_current = 16;
winAwards.prestige_level = '知名';
winAwards.difficulty_level = '中等';

// 参赛类别 - 完整保留原文结构
winAwards.category_sub = [
  // 公共与空间
  'Public & Cultural Interiors 公共与文化空间',
  'Entertainment & Performance Spaces 娱乐与表演空间',
  'Education 教育空间',
  'Transport 交通空间',
  'Civic 公民空间（政府建筑、法院、社区中心等）',
  'Historic 历史建筑室内',
  // 酒店餐饮空间
  'Restaurants & Cafes 餐厅与咖啡馆',
  'Hotel & Other Overnight Accommodation 酒店及其他过夜住宿',
  'Members Clubs 会员俱乐部',
  // 康体空间
  'Sports, Spas & Wellness Spaces 体育、水疗与康体空间',
  'Hospitals & Clinics 医院与诊所',
  // 办公与商业空间
  'Corporate Offices (Under 5,000 sqm) 企业办公（5000平米以下）',
  'Corporate Offices (5,000 - 10,000 sqm) 企业办公（5000-10000平米）',
  'Corporate Offices (Over 10,000 sqm) 企业办公（10000平米以上）',
  'Studios, Co-Working Spaces & Home Offices 工作室、联合办公与居家办公',
  'Communal Areas 公共区域',
  'Independent Shops & Small Chains 独立商店与小连锁店',
  'Retails Chains, Department Stores & Shopping Centres 零售连锁、百货商场与购物中心',
  // 住宅空间
  'One-off Homes (Under £1M) 独栋住宅（100万英镑以下）',
  'One-off Homes (Over £1M) 独栋住宅（100万英镑以上）',
  'Show Flats & Developments 样板房与开发项目',
  'Residential Developments (Apartments) 住宅开发项目（公寓）',
  // 专业与特别类别
  'Lighting Projects 照明设计项目',
  'Temporary, Experiential Projects & Pop Ups 临时性、体验性项目及快闪店',
  'CGI & Visualisation CGI与可视化表现',
  'Excellence in Sustainable Design 卓越可持续设计',
  'Excellence in Inclusive Design 卓越包容性设计',
  'Reuse & Refurbishment Projects 再利用与翻新改造项目'
];

// 费用信息（2025年度参考）
winAwards.fee_currency = 'GBP';
winAwards.fee_notes = '早鸟报名：£405+VAT；常规报名：£515+VAT；最终报名：£555+VAT（2026年度费用近期公布）';
winAwards.fee_early_bird = 405;
winAwards.fee_regular = 515;
winAwards.fee_late = 555;

// 时间轴（2026年度预测）
winAwards.deadline_early = '2026-06上旬（预测）';
winAwards.deadline_regular = '2026-07上旬（预测）';
winAwards.deadline_final = '2026-08上旬（预测）';
winAwards.announcement_date = '2026-11';

// 奖项介绍
winAwards.award_intro = '世界室内新闻奖（World Interiors News Awards，简称WIN Awards）由英国知名设计媒体《世界室内新闻》杂志主办，是全球室内设计领域最受瞩目的年度奖项之一。奖项面向全球的室内设计师、建筑师及产品设计师征集作品，旨在表彰世界各地具有创新精神、远见卓识和富有想象力的室内设计师的杰出作品，涵盖住宅、商业及公共空间等多元领域。WIN Awards始于2010年，至2025年已成功举办十五届，与WAN Awards（世界建筑新闻奖）互为姊妹奖项。';

// 奖项等级
winAwards.award_levels = [
  { level: '参赛类别金奖（Category Winners）', description: '在每一个细分参赛类别中评选出金奖、银奖及入围作品（Shortlist）' },
  { level: '年度新兴室内设计事务所（Emerging Interiors Practice of the Year）', description: '经评审团终审产生的最高荣誉奖项之一' },
  { level: '年度室内设计事务所（Interiors Practice of the Year）', description: '经评审团终审产生的最高荣誉奖项之一' },
  { level: '年度杰出室内设计项目（Outstanding Interiors Project of the Year）', description: '经评审团终审产生的最高荣誉奖项之一' }
];

// 评审标准（原文保留）
winAwards.judging_criteria = [
  { dimension: '创意性（Creativity & Innovation）', weight: '', description: '在空间规划、形式语言、材料运用等方面的原创性与突破性' },
  { dimension: '功能性与用户体验（Functionality & User Experience）', weight: '', description: '空间布局是否高效合理，是否真正满足使用者的功能需求和情感体验' },
  { dimension: '可持续性与社会价值（Sustainability & Social Responsibility）', weight: '', description: '包括低碳材料运用、节能设计、包容性设计等' },
  { dimension: '文化叙事与品牌融合（Cultural Narrative & Brand Integration）', weight: '', description: '设计是否传达独特的文化故事或品牌精神' },
  { dimension: '技术与工艺水准（Technical Excellence & Craftsmanship）', weight: '', description: '灯光、声学、材料细节等专业技术的表现' },
  { dimension: '挑战应对与设计解决（Brief & Response）', weight: '', description: '如何回应客户需求、场地限制等设计挑战' }
];

// 评委介绍（原文保留）
winAwards.judges_intro = '评审团由全球顶尖的室内设计师、建筑师及行业领袖组成，具有高度的国际化与专业性。2026年度评审团主席为Ruud Belmans（比利时WeWantMore联合创始人）。';

// 其他信息
winAwards.notes = '参赛项目须于2022年1月1日之后竣工；快闪店和临时展览项目须于2023年1月1日之后竣工；已提交过的项目不允许重复参赛；参赛者可按需提交多个作品。';

// 更新时间
winAwards.update_time = '2026-04-27';

// 保存
awardsData[winIndex] = winAwards;
fs.writeFileSync(awardsPath, JSON.stringify(awardsData, null, 2), 'utf8');
console.log('WIN Awards updated successfully');
