const fs = require('fs');

// 读取数据
const awards = JSON.parse(fs.readFileSync('website/data/awards.json', 'utf8'));

// 找到Andrew Martin奖项
const index = awards.findIndex(a => a.award_id === 'andrew_martin国际室内设计大奖_2026');
if (index === -1) {
    console.log('未找到Andrew Martin奖项');
    process.exit(1);
}

// 更新字段
awards[index] = {
    ...awards[index],
    // 基础信息
    "award_name_en": "Andrew Martin International Interior Design Award",
    "award_name_short": "Andrew Martin",
    "award_slogan": "国际室内设计界的奥斯卡，室内设计的圣经",
    "organizer": "Andrew Martin",
    "organizer_cn": "英国Andrew Martin / 北京安德马丁文化传播有限公司",
    "organizer_type": "企业/媒体",
    "city": "伦敦",
    "category_sub": ["住宅空间", "酒店空间", "办公空间", "商业零售空间", "餐饮空间", "艺术装置", "公共空间"],
    "industry_focus": ["室内设计公司", "建筑事务所", "独立设计师", "软装设计"],
    "award_type": "室内设计奖",
    "edition_current": 30,
    "prestige_level": "顶级",
    "difficulty_level": "高",

    // 费用信息
    "fee_currency": "GBP",
    "fee_early_bird": 95,
    "fee_regular": 95,
    "fee_cny": 900,
    "fee_cny_notes": "中国区申报服务费800-900元/项目",

    // 时间节点
    "deadline_early": "2025-11-01",
    "deadline_regular": "2026-01-15",
    "submission_deadline": "2026-01-31",
    "results_date": "2026-07-01",
    "ceremony_date": "2026-09-01",

    // 奖项等级
    "prize_levels": [
        "年度100强（Top 100）",
        "年度大奖（Interior Designer of the Year）",
        "年鉴收录（Interior Design Review）"
    ],
    "prize_details": "入选年度100强：每年评选出全球100位杰出的室内设计师；年度大奖：在100位中评选出1位全球年度大奖设计师；年鉴收录：作品被收录于500页精装《Andrew Martin国际室内设计大奖年鉴》",

    // 评审标准
    "evaluation_criteria": [
        "对场所与周围环境的理解",
        "对历史的表达与阐释",
        "对光线的利用与驾驭",
        "对艺术与工艺品的策展式搭配",
        "对空间使用者的共情",
        "对色彩、图案与肌理的调配",
        "对尺度与比例的掌控",
        "出人意料的惊喜元素",
        "项目承载的精神与追求",
        "对设计发展方向的见解"
    ],
    "evaluation_process": "评委由社会各行业精英组成（非室内设计专业人士），包括王室成员、好莱坞明星、商业巨子、作家、时装设计师、艺术家等",
    "judging_format": "年鉴收录评审",
    "notes": "国际室内设计界奥斯卡，唯一由设计最终使用者担任评委的奖项",

    // 评委介绍
    "judges_notes": "评委来自社会各行业：Stanley Tucci（好莱坞影星）、Gordon Ramsay（名厨）、Lord Coe（英国前奥运冠军）、Ronnie Wood（滚石乐队成员）、Twiggy（超模）、Jo Malone（香水创始人）、Duchess of York（约克公爵夫人）等",

    // 参赛要求
    "eligibility": "全球设计师/设计公司，不限地域",
    "project_status": "已竣工实景",
    "image_required": true,
    "document_required": true,
    "submission_method": "官网在线提交或中国区授权渠道",
    "submission_language": "英文",

    // 参赛类别
    "submission_categories": [
        "室内空间设计",
        "住宅空间",
        "酒店空间",
        "办公空间",
        "商业零售空间",
        "餐饮空间",
        "艺术装置",
        "公共空间"
    ],

    // 获奖权益
    "recognition_benefits": [
        "国际声誉与媒体曝光",
        "年鉴收录全球发行",
        "权威行业背书",
        "国际设计交流机会"
    ],
    "winner_exhibition": "《Andrew Martin国际室内设计大奖年鉴》全球发行",

    // 其他信息
    "custom_tags": [
        "室内设计奥斯卡",
        "评委跨界多元",
        "年鉴全球发行",
        "华人设计师众多"
    ],
    "chinese_contact": "安德马丁官网：www.andrewmartin-ida.com，微信公众号：安德马丁",
    "history": "创立于1996年，由马丁·沃勒（Martin Waller）在英国伦敦创立，第30届（2026年）",

    // 知名获奖者
    "famous_winners": [
        "梁志天",
        "季裕棠",
        "孙建亚",
        "黄全",
        "于昭",
        "众多华人设计师团队"
    ],
    "chinese_winners_count": "超过210位华人设计师/团队入选",
    "total_entries_count": "全球上万份参赛作品",

    "update_time": "2026-04-27"
};

// 保存
fs.writeFileSync('website/data/awards.json', JSON.stringify(awards, null, 2), 'utf8');

console.log('✅ Andrew Martin国际室内设计大奖字段已更新');
console.log(`奖项名称: ${awards[index].award_name_cn}`);
console.log(`英文名: ${awards[index].award_name_en}`);
console.log(`届次: 第${awards[index].edition_current}届`);
console.log(`费用: £${awards[index].fee_regular}/项目`);
console.log(`截止日期: ${awards[index].deadline_regular}`);
