const fs = require('fs');
const details = JSON.parse(fs.readFileSync('./website/data/award-details.json', 'utf8'));

// 检查是否已存在
if (details.find(x => x.award_id === 'architizer_awards_2026')) {
  console.log('Architizer A+Awards 已在 award-details.json 中');
  process.exit(0);
}

const entry = {
  award_id: "architizer_awards_2026",
  award_name: "Architizer A+Awards",
  award_name_en: "Architizer A+Awards",
  award_name_cn: "Architizer A+奖",

  organizer: "Architizer",
  organizer_intro: "全球最具影响力的建筑网站，总部位于美国纽约，致力于连接建筑师与建筑设计产品。其在线档案库收录了全球数万个建筑项目，是建筑师获取灵感与行业资源的重要平台。",

  established: "2013年",
  history: "A+Awards于2013年举办首届，2026年已进入第14届。2024年第13届颁奖典礼分别在纽约、巴黎和深圳三地举行，体现了奖项的全球化视野。",

  description: "全球最大、最全面的建筑与空间设计奖项之一。奖项旨在表彰年度最具创新性与社会价值的建筑、室内与景观作品，推动公众鉴赏全球范围内有意义的建筑，并提倡建筑对日常生活产生的积极影响。奖项以其全面、严谨和权威的评审过程，及不到5%入围率的竞争机制，在全球建筑界享有极高的含金量。2026年第14届以'Craft'（匠心工艺）为年度核心主题，致敬那些平衡技术创新与永恒工艺的建筑作品。",

  // 参赛类别
  categories: [
    { main: "类型学类别（Typology）", sub: ["住宅", "商业办公", "酒店与接待", "体育与休闲", "文化建筑", "教育机构", "景观与规划", "交通建筑"] },
    { main: "建筑+类别（Plus）", sub: ["概念（Concepts）", "细节（Details）", "建筑+当地环境（Architecture+Context）", "建筑+工艺（Architecture+Craft）", "建筑+家居（Architecture+Home）"] },
    { main: "可持续类别（Sustainability）", sub: ["可持续系统", "气候友好材料", "健康建材", "道德建造实践", "未建成类别"] },
    { main: "公司类别（Firm）", sub: ["按规模分类", "按专业方向分类", "最佳工艺事务所（Best in Craft Firm）"] }
  ],

  // 时间轴
  deadlines: [
    { 阶段: "报名启动", 时间: "2025-10-13" },
    { 阶段: "早鸟截止", 时间: "2025-10-31" },
    { 阶段: "常规截止", 时间: "2025-12-12" },
    { 阶段: "最终截止", 时间: "2026-01-30" },
    { 阶段: "延期截止", 时间: "2026-02-27" },
    { 阶段: "评审团投票", 时间: "2026-04" },
    { 阶段: "公众投票", 时间: "2026-05" },
    { 阶段: "获奖公布", 时间: "2026-06" }
  ],

  // 费用明细
  fees: [
    { 阶段: "早鸟", 价格: "$275", 截止日期: "2025-10-31", 备注: "可使用折扣码SUNSHINEPR减免$25" },
    { 阶段: "常规", 价格: "$325", 截止日期: "2025-12-12", 备注: "可使用折扣码SUNSHINEPR减免$25" },
    { 阶段: "最终", 价格: "$375", 截止日期: "2026-01-30", 备注: "可使用折扣码SUNSHINEPR减免$25" },
    { 阶段: "延期", 价格: "$425", 截止日期: "2026-02-27", 备注: "可使用折扣码SUNSHINEPR减免$25" },
    { 阶段: "年度项目参评附加费", 价格: "$195", 备注: "不计入单项目报名费，可在提交时勾选" }
  ],

  // 奖项等级
  award_levels: [
    { level: "专业评审奖（Jury Winner）", description: "由250+人规模的国际化评审团（Jury Academy）投票选出，体现专业判断。每个类别均评选出专业评审奖获得者。" },
    { level: "大众评审奖（Popular Choice Winner）", description: "通过网络公众投票产生，体现社会广泛认可。每个类别均评选出大众评审奖获得者。" },
    { level: "年度项目大奖（Project of the Year）", description: "由Architizer编辑团队从所有参赛作品中遴选出最具远见和文化相关性的作品，颁发此特别荣誉。参选需在提交过程中额外勾选对应选项。" }
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

  // 评委介绍
  judges_2025: [
    { 姓名: "Carlo Ratti", 头衔: "Carlo Ratti Associati 创始人", 公司: "2025年威尼斯建筑双年展总策展人" },
    { 姓名: "Ma Yansong（马岩松）", 头衔: "创始合伙人", 公司: "MAD建筑事务所" },
    { 姓名: "Benedetta Tagliabue", 头衔: "主持建筑师", 公司: "EMBT Architects，Enric Miralles基金会创始人兼总监" },
    { 姓名: "Andrés Jaque", 头衔: "创始人，哥伦比亚大学GSAPP建筑学院院长", 公司: "OFFPOLINN" },
    { 姓名: "Carson Chan", 头衔: "首席策展人", 公司: "赫尔辛基建筑与设计博物馆" },
    { 姓名: "Llisa Demetrios", 头衔: "首席策展人", 公司: "Eames研究所" },
    { 姓名: "Michael Magill", 头衔: "RSP全球设计负责人暨迪拜区域执行总监", 公司: "RSP" },
    { 姓名: "Kathy Scott", 头衔: "合伙人", 公司: "Walker Warner" },
    { 姓名: "Greg Mottola", 头衔: "CEO", 公司: "Walker Warner" }
  ],

  // 往届获奖者
  past_winners: "历届获奖项目涵盖国际顶尖事务所，包括MVRDV、MAD Architects、Bjarke Ingels Group、Adjaye Associates等。",

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
    "年鉴收录：被收录于年度特别出版物《The World's Best Architecture》精装画册，面向全球发行",
    "A+List荣誉：获奖事务所将被列入Architizer的A+List——全球领先建筑事务所年度名录",
    "颁奖典礼：受邀参加年度颁奖典礼及交流活动。第13届颁奖典礼曾在纽约、巴黎和深圳三座城市举办区域性活动",
    "奖杯：获得Architizer特别定制的A+Awards奖杯",
    "年度项目大奖额外权益：在Architizer Journal获得定制化编辑报道，优先获得行业演讲机会和活动邀请"
  ],

  // 其他信息
  other_info: [
    "报名通道：通过官网awards.architizer.com在线提交",
    "年度主题：2026年第14届以Craft（匠心工艺）为核心主题",
    "中国区折扣码：SUNSHINEPR可减免$25报名费",
    "特别提示：第14届报名窗口已关闭，公众投票和评审正在进行中",
    "类别数量：共设124个细分参赛类别，分为类型学、建筑+、可持续、公司四大类体系"
  ],

  official_url: "https://awards.architizer.com"
};

details.push(entry);
fs.writeFileSync('./website/data/award-details.json', JSON.stringify(details, null, 2), 'utf8');
console.log('award-details.json 已添加 Architizer A+Awards');
