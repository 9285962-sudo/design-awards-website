const fs = require('fs');
const path = require('path');

// 读取award-details.json
const detailsPath = path.join(__dirname, '../website/data/award-details.json');
const detailsData = JSON.parse(fs.readFileSync(detailsPath, 'utf8'));

// 找到WIN Awards的索引
const winIndex = detailsData.findIndex(a => a.award_id === 'win_awards_2026');

if (winIndex === -1) {
  console.log('WIN Awards not found in award-details.json');
  process.exit(1);
}

// WIN Awards详细数据更新
detailsData[winIndex] = {
  ...detailsData[winIndex],
  
  // 基本信息
  name: '世界室内新闻奖',
  name_en: 'World Interiors News Awards',
  
  // 奖项介绍（原文保留）
  award_intro: '世界室内新闻奖（World Interiors News Awards，简称WIN Awards）由英国知名设计媒体《世界室内新闻》杂志主办，是全球室内设计领域最受瞩目的年度奖项之一。奖项面向全球的室内设计师、建筑师及产品设计师征集作品，旨在表彰世界各地具有创新精神、远见卓识和富有想象力的室内设计师的杰出作品，涵盖住宅、商业及公共空间等多元领域。WIN Awards始于2010年，至2025年已成功举办十五届。所有入围及获奖作品将在World Interiors News及World Architecture News等全球性平台进行广泛报道和展示。',
  
  // 主办方介绍
  organizer: 'World Interiors News',
  organizer_intro: '英国World Interiors News，隶属于全球顶尖的建筑领域出版机构——World Architecture News（世界建筑新闻）。WIN Awards与WAN Awards（世界建筑新闻奖）互为姊妹奖项，共同构成该集团在建筑与室内设计领域的权威奖项体系。',
  organizer_location: '英国伦敦',
  
  // 参赛类别（原文结构）
  category: [
    // 公共与空间（Public & Cultural）
    'Public & Cultural Interiors 公共与文化空间',
    'Entertainment & Performance Spaces 娱乐与表演空间',
    'Education 教育空间',
    'Transport 交通空间',
    'Civic 公民空间（政府建筑、法院、社区中心等）',
    'Historic 历史建筑室内',
    // 酒店餐饮空间（Hospitality Interiors）
    'Restaurants & Cafes 餐厅与咖啡馆',
    'Hotel & Other Overnight Accommodation 酒店及其他过夜住宿',
    'Members Clubs 会员俱乐部',
    // 康体空间（Sports & Wellness Interiors）
    'Sports, Spas & Wellness Spaces 体育、水疗与康体空间',
    'Hospitals & Clinics 医院与诊所',
    // 办公与商业空间（Workspace & Commercial）
    'Corporate Offices (Under 5,000 sqm) 企业办公（5000平米以下）',
    'Corporate Offices (5,000 - 10,000 sqm) 企业办公（5000-10000平米）',
    'Corporate Offices (Over 10,000 sqm) 企业办公（10000平米以上）',
    'Studios, Co-Working Spaces & Home Offices 工作室、联合办公与居家办公',
    'Communal Areas 公共区域',
    'Independent Shops & Small Chains 独立商店与小连锁店',
    'Retails Chains, Department Stores & Shopping Centres 零售连锁、百货商场与购物中心',
    // 住宅空间（Residential Interiors）
    'One-off Homes (Under £1M) 独栋住宅（100万英镑以下）',
    'One-off Homes (Over £1M) 独栋住宅（100万英镑以上）',
    'Show Flats & Developments 样板房与开发项目',
    'Residential Developments (Apartments) 住宅开发项目（公寓）',
    // 专业与特别类别（Specialist Interiors）
    'Lighting Projects 照明设计项目',
    'Temporary, Experiential Projects & Pop Ups 临时性、体验性项目及快闪店',
    'CGI & Visualisation CGI与可视化表现',
    'Excellence in Sustainable Design 卓越可持续设计',
    'Excellence in Inclusive Design 卓越包容性设计',
    'Reuse & Refurbishment Projects 再利用与翻新改造项目'
  ],
  
  // 费用时间轴（2025年度参考）
  fee_timeline: [
    {
      period: '早鸟报名',
      date: '2026-06上旬（预测）',
      price: 405,
      currency: 'GBP',
      note: '£405+VAT，2026年度费用近期公布'
    },
    {
      period: '常规报名',
      date: '2026-07上旬（预测）',
      price: 515,
      currency: 'GBP',
      note: '£515+VAT'
    },
    {
      period: '最终报名',
      date: '2026-08上旬（预测）',
      price: 555,
      currency: 'GBP',
      note: '£555+VAT'
    }
  ],
  fee_note: '参赛者可按需提交多个作品；完成缴费提交后，可于当年8月8日前登录系统对参赛信息进行修改。',
  
  // 时间轴
  timeline: [
    { 阶段: '早鸟报名', 时间: '2026-06上旬（预测）' },
    { 阶段: '常规报名', 时间: '2026-07上旬（预测）' },
    { 阶段: '最终报名', 时间: '2026-08上旬（预测）' },
    { 阶段: '入围名单公布', 时间: '2026-10上旬（预测）' },
    { 阶段: '颁奖典礼', 时间: '2026-11' }
  ],
  
  // 奖项等级（原文保留）
  award_levels: [
    { level: '参赛类别金奖（Category Winners）', description: '在每一个细分参赛类别中评选出金奖、银奖及入围作品（Shortlist）' },
    { level: '年度新兴室内设计事务所（Emerging Interiors Practice of the Year）', description: '经评审团终审产生，在所有参赛类别金奖得主中评选' },
    { level: '年度室内设计事务所（Interiors Practice of the Year）', description: '经评审团终审产生，在所有参赛类别金奖得主中评选' },
    { level: '年度杰出室内设计项目（Outstanding Interiors Project of the Year）', description: '经评审团终审产生，在所有参赛类别金奖得主中评选' }
  ],
  level_note: 'WIN Awards共设置约27个参赛类别，设有两个年度工作室大奖和一个年度项目大奖（Grand Prix Awards），自动从参赛类别获奖者中评选。',
  
  // 评审标准（原文保留）
  judging_criteria: [
    { dimension: '创意性（Creativity & Innovation）', description: '在空间规划、形式语言、材料运用等方面的原创性与突破性' },
    { dimension: '功能性与用户体验（Functionality & User Experience）', description: '空间布局是否高效合理，是否真正满足使用者的功能需求和情感体验' },
    { dimension: '可持续性与社会价值（Sustainability & Social Responsibility）', description: '包括低碳材料运用、节能设计、包容性设计等。奖项设有专门的"卓越可持续设计"和"卓越包容性设计"类别' },
    { dimension: '文化叙事与品牌融合（Cultural Narrative & Brand Integration）', description: '设计是否传达独特的文化故事或品牌精神' },
    { dimension: '技术与工艺水准（Technical Excellence & Craftsmanship）', description: '灯光、声学、材料细节等专业技术的表现' },
    { dimension: '挑战应对与设计解决（Brief & Response）', description: '如何回应客户需求、场地限制等设计挑战。建议参赛者在500字以内清晰阐述以上维度' }
  ],
  judging_note: 'WIN Awards评审团由全球顶尖的室内设计师、建筑师及行业领袖组成，具有高度的国际化与专业性。2026年度评审团主席为Ruud Belmans（比利时WeWantMore联合创始人）。',
  
  // 评委介绍
  judges: [
    { name: 'Ruud Belmans', title: '联合创始人', company: 'WeWantMore（比利时）', note: '2026年度评审团主席' },
    { name: 'Nada Elsaid', title: '国际知名室内设计师', company: '', note: '2025年度评委' },
    { name: 'Duyi Han', title: '国际知名设计师、艺术家', company: '', note: '2025年度评委' }
  ],
  
  // 参赛要求
  requirements: {
    global: '奖项面向全球所有从事室内设计或委托室内设计的个人及公司开放，包括室内设计师、建筑师、开发商、零售商、酒店经营者、餐厅经营者、制造商和供应商等',
    completion: '参赛项目须于2022年1月1日之后竣工；快闪店和临时展览项目须于2023年1月1日之后竣工',
    repeat: '已提交过的项目不允许重复参赛',
    quantity: '参赛者提交项目数量没有上限，可按需提交多个作品'
  },
  requirements_note: '参赛者需通过官网在线系统提交，包括：项目基本信息、500字以内的项目说明文字、一张项目主图（705×350px）、一张缩略图（614×614px）、一份A3 PDF展板、最多八张高分辨率项目图片（1280×854px）。',
  
  // 获奖权益
  benefits: [
    '全球媒体报道：入围及获奖作品将在世界室内新闻官网、世界建筑新闻网等全球顶级设计媒体上进行专题报道',
    '年度画册收录：所有入围及获奖作品将被收录于WIN Awards官方年鉴及年度画册',
    '颁奖典礼：受邀参加年度颁奖典礼及交流晚宴，与全球顶尖设计师进行面对面交流',
    '奖杯与证书：金奖及年度大奖获得者将获得定制奖杯及荣誉证书',
    '官网永久展示：所有获奖项目将在WIN Awards官网进行永久展示',
    '市场推广筹码：获奖项目可于商业推广、宣传材料中标明WIN Awards获奖身份'
  ],
  
  // 联系方式
  contact: {
    官网: 'https://www.worldinteriorsnewsawards.com/',
    邮箱: 'morgan.lovegrove@haymarket.com',
    电话: '+44 (0) 7508787310'
  },
  
  // 备注
  notes: '2026年度为第十六届WIN Awards。以上日程为基于往年规律的预测，正式日期以官网公布为准。2025年度各项截止日期分别为：早鸟2025年6月5日、常规2025年7月8日、最终2025年8月8日。',
  
  updated_at: '2026-04-27'
};

// 保存
fs.writeFileSync(detailsPath, JSON.stringify(detailsData, null, 2), 'utf8');
console.log('WIN Awards details updated successfully');
