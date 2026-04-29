const fs = require('fs');
const awards = JSON.parse(fs.readFileSync('./website/data/awards.json', 'utf8'));

// 检查是否已存在
if (awards.find(x => x.award_id === 'architizer_awards_2026')) {
  console.log('Architizer A+Awards 已在 awards.json 中');
  process.exit(0);
}

const entry = {
  award_id: "architizer_awards_2026",
  award_name: "Architizer A+Awards",
  short_name: "A+Awards",
  category_main: "建筑设计",
  update_time: "2026-04-27",
  organizer: "Architizer",
  organizer_country: "美国",
  website: "https://awards.architizer.com",
  award_intro: "全球最大、最全面的建筑与空间设计奖项之一，由全球知名建筑网站 Architizer 于2013年在美国纽约创办。旨在表彰年度最具创新性与社会价值的建筑、室内与景观作品，推动公众鉴赏全球范围内有意义的建筑。奖项以不到5%入围率的竞争机制闻名，2026年第14届以'Craft'（匠心工艺）为年度核心主题。",

  // 时间轴
  timeline: [
    { 阶段: "报名启动", 时间: "2025-10-13" },
    { 阶段: "早鸟截止", 时间: "2025-10-31" },
    { 阶段: "常规截止", 时间: "2025-12-12" },
    { 阶段: "最终截止", 时间: "2026-01-30" },
    { 阶段: "延期截止", 时间: "2026-02-27" },
    { 阶段: "评审团投票", 时间: "2026-04" },
    { 阶段: "公众投票", 时间: "2026-05" },
    { 阶段: "获奖公布", 时间: "2026-06" }
  ],

  // 截止日期（用于筛选）
  deadline_early: "2025-10-31",
  deadline_regular: "2025-12-12",
  deadline_final: "2026-01-30",
  deadline_extended: "2026-02-27",

  // 费用
  fee_currency: "USD",
  fee_early_bird: 275,
  fee_regular: 325,
  fee_final: 375,
  fee_extended: 425,

  // 费用明细
  fee_timeline: [
    { period: "早鸟（至2025.10.31）", price: 275, currency: "USD" },
    { period: "常规（至2025.12.12）", price: 325, currency: "USD" },
    { period: "最终（至2026.01.30）", price: 375, currency: "USD" },
    { period: "延期（至2026.02.27）", price: 425, currency: "USD" },
    { period: "年度项目参评附加费", price: 195, currency: "USD", note: "不计入单项目报名费" }
  ],

  // 奖项等级
  award_levels: [
    { level: "专业评审奖（Jury Winner）", description: "由250+人规模的国际化评审团投票选出，体现专业判断" },
    { level: "大众评审奖（Popular Choice Winner）", description: "通过网络公众投票产生，体现社会广泛认可" },
    { level: "年度项目大奖（Project of the Year）", description: "由Architizer编辑团队从所有参赛作品中遴选最具远见和文化相关性的作品" }
  ],

  // 评审标准
  judging_criteria: [
    { name: "创新性", description: "设计理念的前瞻性和独特的解决问题方式" },
    { name: "工艺与匠心（Craft）", description: "材料的运用、构造细节的打磨、对工艺的精益求精——2026年度核心关注点" },
    { name: "在地性回应", description: "建筑是否深刻理解和尊重其所在地的文化、历史与生态环境" },
    { name: "可持续价值", description: "是否在可持续系统、材料选择和建造实践上体现出对环境和社会的责任感" },
    { name: "社会与文化影响力", description: "建筑如何回应更广泛的社会议题，产生超越使用功能的文化意义" },
    { name: "公众吸引力", description: "项目的视觉表现力和对公众的感染力（影响大众评审的选择）" }
  ],

  // 参赛要求
  requirements: {
    "开放对象": "面向全球所有从事建筑、室内设计、景观设计、规划和施工的公司及个人开放",
    "作品年限": "类型学、Plus和可持续类别须为过去三年内竣工的项目（未建成类别除外）",
    "公司类别作品年限": "须包含至少三个过去十年内竣工的项目",
    "提交数量": "无提交数量和报名类别的上限",
    "图片要求": "1-12张高分辨率项目图片（含封面图），单张10MB以内，JPG/JPEG/TIFF/PNG格式",
    "可选材料": "视频补充材料",
    "知识产权": "参赛者须确保对参赛作品拥有独立的知识产权及影像版权"
  },

  // 获奖权益
  benefits: [
    "全球媒体曝光：获奖项目及团队通过Architizer官网、Architizer Journal及全球合作媒体网络获得广泛国际媒体报道",
    "年鉴收录：被收录于年度特别出版物《The World's Best Architecture》精装画册，全球发行",
    "A+List荣誉：获奖事务所将被列入Architizer的A+List——全球领先建筑事务所年度名录",
    "颁奖典礼：受邀参加年度颁奖典礼及交流活动，第13届曾在纽约、巴黎和深圳举办",
    "奖杯：获得Architizer特别定制的A+Awards奖杯",
    "年度项目大奖额外权益：在Architizer Journal获得定制化编辑报道，优先获得行业演讲机会"
  ],

  // 参赛类别
  categories: [
    { main: "类型学类别（Typology）", sub: ["住宅", "商业办公", "酒店与接待", "体育与休闲", "文化建筑", "教育机构", "景观与规划", "交通建筑"] },
    { main: "建筑+类别（Plus）", sub: ["概念（Concepts）", "细节（Details）", "建筑+当地环境（新增）", "建筑+工艺（新增）", "建筑+家居"] },
    { main: "可持续类别（Sustainability）", sub: ["可持续系统", "气候友好材料", "健康建材", "道德建造实践", "未建成类别"] },
    { main: "公司类别（Firm）", sub: ["按规模分类", "按专业方向分类", "最佳工艺事务所（新增）"] }
  ],

  // 补充字段
  note: "2026年第14届以Craft（匠心工艺）为核心主题；中国区独家折扣码SUNSHINEPR可减免$25报名费"
};

// 插入到同类（建筑设计）奖项的第一位
const archIdx = awards.findIndex(x => x.category_main === '建筑设计');
if (archIdx !== -1) {
  awards.splice(archIdx, 0, entry);
} else {
  awards.push(entry);
}

fs.writeFileSync('./website/data/awards.json', JSON.stringify(awards, null, 2), 'utf8');
console.log('awards.json 已添加 Architizer A+Awards');
