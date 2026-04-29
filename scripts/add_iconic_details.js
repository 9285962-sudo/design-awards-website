const fs = require('fs');

// 读取award-details.json
const detailsPath = './website/data/award-details.json';
let details = JSON.parse(fs.readFileSync(detailsPath, 'utf8'));

// 检查是否已存在
const existingIndex = details.findIndex(d => d.award_id === 'iconic_awards_2026');

if (existingIndex !== -1) {
  details.splice(existingIndex, 1);
}

// 创建详细数据
const iconicDetails = {
  "award_id": "iconic_awards_2026",
  "award_name": "ICONIC AWARDS：创新建筑",
  "award_name_en": "ICONIC AWARDS: Innovative Architecture",
  "award_name_cn": "德国ICONIC AWARDS标志性设计奖",
  "organizer": "德国设计委员会（German Design Council - Rat für Formgebung）",
  "organizer_intro": "成立于1953年，由德国联邦议院倡导、德国工业界出资设立，是世界上最重要的设计领域专业机构之一。拥有超过330家企业会员。DETAIL杂志是官方媒体合作伙伴。",
  "established": "2013年（前身），2025年起合并创新建筑奖与室内产品奖形成跨学科奖项",
  "history": "2013年创办“标志性设计奖·创新建筑奖”。2025年起与室内产品奖合并，形成覆盖建筑、室内设计、产品创新三大领域的跨学科奖项。",
  "description": "德国官方位阶最高、竞争最激烈的世界顶级设计奖项之一。致力于发掘全球建筑、室内和产品设计领域具有远见卓识的杰出作品，表彰前瞻性的整体项目与可持续解决方案，并将设计、技术与社会责任融为一体的创新理念推向国际舞台。",
  "categories": [
    {
      "main": "建筑设计（Architecture）",
      "sub": ["住宅建筑（Residential）", "公共文化建筑（Public & Cultural）", "教育建筑（Education）", "医疗建筑（Healthcare）", "办公与工作场所（Office & Workplace）", "酒店与休闲空间（Hotel & Leisure）", "城市更新与开发（Urban Regeneration and Development）⬅️2026新增", "混合用途开发（Mixed-Use Development）⬅️2026新增", "改造与活化（Transformation）⬅️2026新增", "工业与物流开发（Industrial & Logistic Development）", "建筑立面与表面（Facade & Surface）"]
    },
    {
      "main": "室内设计（Interior Design）",
      "sub": ["商业空间", "居住空间", "餐饮空间", "办公空间", "公共空间等"]
    },
    {
      "main": "产品设计（Product Design）",
      "sub": ["家具", "智能家居", "建筑材料", "照明", "厨卫产品等"]
    },
    {
      "main": "视觉传达设计（Communication Design）",
      "sub": ["品牌形象", "导视系统", "展览设计", "包装设计等"]
    },
    {
      "main": "概念设计（Concept）",
      "sub": ["开发概念与总体规划（Development Concept & Masterplanning）⬅️2026新增", "改造规划（Transformation）⬅️2026新增", "创新材料（Innovative Materials）", "循环设计（Circular Design）"]
    }
  ],
  "deadlines": [
    { "阶段": "征集启动", "日期": "2026年2月18日" },
    { "阶段": "早鸟报名截止", "日期": "2026年3月27日" },
    { "阶段": "在线报名截止", "日期": "2026年5月15日" },
    { "阶段": "资料补传截止（数据准备）", "日期": "2026年5月27日" },
    { "阶段": "资料补传截止（评审材料）", "日期": "2026年6月9日" },
    { "阶段": "评审会议", "日期": "2026年8月24日" },
    { "阶段": "获奖名单公布", "日期": "2026年8月24日" },
    { "阶段": "颁奖典礼", "日期": "2026年10月6日（慕尼黑宝马世界）" }
  ],
  "fees": [
    { "阶段": "早鸟价（2月18日—3月20日）", "金额": "€300", "备注": "含增值税" },
    { "阶段": "常规价（3月21日—5月15日）", "金额": "€350", "备注": "含增值税" },
    { "阶段": "精选奖获奖服务费（参考）", "金额": "约€1,500", "备注": "加增值税，含年鉴出版、媒体传播、颁奖典礼" },
    { "阶段": "优胜奖获奖服务费（参考）", "金额": "约€1,900", "备注": "加增值税，含年鉴出版、媒体传播、颁奖典礼" }
  ],
  "award_levels": [
    { "level": "至尊奖（Best of Best）", "description": "仅授予在卓越性、创新性和设计品质方面均为非凡顶尖水平的项目。评审团通过这一等级表彰能够为行业树立全新标杆的开创性表现。2025年度共有33个项目获此殊荣。" },
    { "level": "优胜奖（Winner）", "description": "授予年度杰出项目，其卓越品质和创新性给评审团留下深刻印象，代表了当年度的优秀设计水准。" },
    { "level": "精选奖（Selection）", "description": "授予在某一领域具有显著设计亮点的优质项目，是对优秀设计品质的认可。" },
    { "level": "年度建筑师（Architects of the Year）", "description": "特别荣誉，表彰年度杰出建筑师" },
    { "level": "年度室内设计师（Interior Designers of the Year）", "description": "特别荣誉，表彰年度杰出室内设计师" },
    { "level": "年度建筑师客户（Architects' Client of the Year）", "description": "特别荣誉" },
    { "level": "年度首作奖（Debut Work of the Year）", "description": "2025年起新增，奖金€10,000，旨在表彰和支持杰出的新兴设计人才。2025年度获奖者为德国建筑师Gustav Düsing和Max Hacke的Braunschweig学生中心。" }
  ],
  "judging_criteria": [
    { "标准": "创新性与前瞻性（Innovation & Visionary Quality）", "说明": "设计理念是否具有开创性和引领行业的先锋意义" },
    { "标准": "整体性设计品质（Holistic Design Quality）", "说明": "项目是否在建筑、室内、产品及材料运用等方面呈现协调统一的整体表现" },
    { "标准": "可持续性（Sustainability & Responsibility）", "说明": "是否充分考虑资源节约、循环经济、生态责任和低碳策略。设有循环设计、医疗保健、办公与工作场所等专门类别" },
    { "标准": "功能性（Functionality & Usability）", "说明": "设计是否真正服务于人的使用需求，并在实际操作中具有高效性与适应性" },
    { "标准": "技术与材料运用（Technical Excellence & Material Innovation）", "说明": "是否创造性地运用现代建筑技术、新型材料和制造工艺" },
    { "标准": "传达与品牌融合（Communication & Branding）", "说明": "概念设计、视觉传达和品牌策略是否有效增强项目的整体影响力和市场价值" }
  ],
  "judges_2025": [
    { "姓名": "Bram Aerts", "机构": "ATAMA", "领域": "建筑师" },
    { "姓名": "Luis Bellara", "机构": "b720 Arquitectos", "领域": "建筑师" },
    { "姓名": "Felizia Berchtold", "机构": "TUTTO BENE", "领域": "室内设计师" },
    { "姓名": "Jonas Bjerre-Poulsen", "机构": "Norm Architects", "领域": "建筑师" },
    { "姓名": "Elena Boerman", "机构": "卡尔斯鲁厄理工学院（KIT）", "领域": "研究员" },
    { "姓名": "Stefan Diez", "机构": "Diez Office", "领域": "工业设计师" },
    { "姓名": "Gong Dong", "机构": "非常建筑（Vector Architects）", "领域": "建筑师" },
    { "姓名": "Tina Kortmann", "机构": "UNStudio Amsterdam", "领域": "建筑师" },
    { "姓名": "Efrat Friedland", "机构": "materialscout", "领域": "材料专家" },
    { "姓名": "Jeanette Kunsmann", "机构": "DETAIL杂志", "领域": "主编" },
    { "姓名": "Annabelle von Reutern", "机构": "TOMAS", "领域": "室内设计师" },
    { "姓名": "Carsten Schmidt", "机构": "Topothek 1", "领域": "建筑师" },
    { "姓名": "Wei Wu（吴炜）", "机构": "gmp·冯·格康，玛格及合伙人建筑师事务所（上海）", "领域": "建筑师" }
  ],
  "past_winners": [
    "历届获奖项目涵盖国际顶尖事务所：MVRDV、MAD Architects、Bjarke Ingels Group、Adjaye Associates、HENN Architekten等"
  ],
  "requirements": [
    "开放对象：面向全球建筑师、室内设计师、产品设计师、设计事务所、开发商、制造商、工程公司以及规划和创意机构开放报名",
    "作品条件：参赛项目须为已完成或在建的概念性方案。已建成项目须在报名截止日期前完成竣工",
    "提交材料：通过官网在线申报系统提交项目基本信息、英德双语描述、项目照片",
    "知识产权：参赛者须确保对参赛作品拥有完全的知识产权及影像版权"
  ],
  "benefits": [
    "全球媒体曝光：通过德国设计委员会官方渠道及媒体合作伙伴DETAIL杂志在全球范围内进行专题报道",
    "在线名录永久收录：获奖作品收录于ICONIC AWARDS官方在线名录，供全球检索",
    "官方年鉴出版：获奖作品收录于年度获奖年鉴（26.5cm×19.5cm精美画册，售价€99.90），面向全球发行",
    "颁奖典礼与高端社交：受邀参加年度颁奖典礼（2026年10月6日，慕尼黑宝马世界BMW Welt）",
    "全年行业互动：专属行业展览活动参与机会、论坛演讲邀请及与DETAIL杂志合作的深度专业交流平台",
    "市场营销授权：获奖者可在官网、宣传册和市场推广活动中使用ICONIC AWARDS获奖标识"
  ],
  "other_info": [
    "报名通道：通过德国设计委员会官方提交门户submit.german-design-council.de在线完成注册和资料上传",
    "参赛指南：官网免费下载《2026年参赛指南》（Ausschreibungsunterlagen）PDF，已于2026年2月18日发布",
    "语言要求：报名阶段需要提供英德双语项目描述，评审阶段以英文为主要沟通语言",
    "中国区支持：设有大中华区授权执行机构，提供中文申报服务支持",
    "特别提示：ICONIC AWARDS与其他类似名称奖项（如世界建筑节的ICONIC Awards或美国ICON国际摄影奖）不属于同一主办方，请注意甄别",
    "资料说明：所有寄送至评审阶段的参赛资料一经提交不再退还，主办方拥有对获奖作品的出版、展示和宣传权利"
  ],
  "official_url": "https://www.iconic-awards.com/",
  "official_url_de": "https://www.iconic-awards.com/de/"
};

// 添加到数组开头
details.unshift(iconicDetails);

// 保存
fs.writeFileSync(detailsPath, JSON.stringify(details, null, 2), 'utf8');
console.log('✅ award-details.json已更新');
