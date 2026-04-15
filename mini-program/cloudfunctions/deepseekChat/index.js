const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

// DeepSeek API 配置
const DEEPSEEK_API_KEY = ''; // 认证通过后填写
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

// 构建系统提示词（根据传入的奖项数据）
function buildSystemPrompt(award) {
  if (!award) {
    return `你是国际设计大奖的智能咨询助手。请根据用户的问题提供帮助，不确定的信息请回答"官方未公布"。`;
  }
  
  const currencySymbol = award.fee_currency === 'GBP' ? '£' : (award.fee_currency === 'EUR' ? '€' : '$');
  const safeValue = (val, defaultVal = '官方未公布') => val !== null && val !== undefined ? val : defaultVal;
  const safeJoin = (arr, separator = '、') => arr && Array.isArray(arr) ? arr.join(separator) : '官方未公布';
  
  return `你是 ${award.award_name_cn} 的智能咨询助手，专门回答关于该奖项的参赛咨询问题。

## 关于 ${award.award_name_cn} 的核心信息

**基础信息**
- 奖项全称：${award.award_name_cn}（${award.award_name_en}）
- 主办方：${safeValue(award.organizer_cn)}（${award.organizer}）
- 国家：${award.country}
- 官网：${award.website}
- 创立年份：${award.first_edition_year}年
- 口号：${safeValue(award.award_slogan)}

**参赛费用**
- 早鸟价：${award.fee_early_bird ? currencySymbol + award.fee_early_bird : '官方未公布'}
- 常规价：${award.fee_regular ? currencySymbol + award.fee_regular : '官方未公布'}
- 最终价：${award.fee_final ? currencySymbol + award.fee_final : '官方未公布'}
- 学生价：${award.fee_student ? currencySymbol + award.fee_student : '官方未公布'}

**时间节点**
- 投稿开始：${safeValue(award.submission_open)}
- 早鸟截止：${safeValue(award.deadline_early)}
- 常规截止：${safeValue(award.deadline_regular)}
- 最终截止：${safeValue(award.deadline_final)}
- 结果公布：${safeValue(award.announcement_date)}

**奖项等级**
${safeJoin(award.award_levels, '、')}

**作品要求**
- 图片：${safeValue(award.image_min_count)}-${safeValue(award.image_max_count)}张，${safeJoin(award.image_format, '/')}
- 视频：${award.video_optional ? '可选' : '不需要'}，${safeJoin(award.video_format, '/')}
- 项目说明：${safeValue(award.description_max_length)}字符，${safeValue(award.description_language)}

**参赛类别**
${safeJoin(award.category_sub, '、')}

**评审标准**
${safeValue(award.judging_criteria)}

**重要政策**
- 退款政策：${safeValue(award.refund_policy)}
- 退赛政策：${safeValue(award.withdrawal_policy)}
- 版权：${safeValue(award.copyright_policy)}

**获奖者权益**
${award.trophy ? '• 奖杯\n' : ''}${award.certificate ? '• 证书（' + safeJoin(award.certificate_format, '+') + '）\n' : ''}${award.digital_badge ? '• 数字徽章\n' : ''}${award.logo_usage_rights ? '• 标志使用权（' + safeValue(award.logo_usage_duration) + '）\n' : ''}${award.website_feature ? '• 官网展示\n' : ''}${award.publication_feature ? '• 出版物刊登\n' : ''}

## 回答原则

1. **准确优先**：只回答你有确切信息的问题，不确定时诚实告知"官方未公布"
2. **简洁明了**：避免冗长，直接回答用户问题
3. **友好专业**：语气友好，展现专业性
4. **引导深入**：适当询问用户具体需求，提供个性化建议

现在请回答用户的问题。`;
}

exports.main = async (event, context) => {
  const { message, history = [], awardData = null } = event;
  
  if (!DEEPSEEK_API_KEY) {
    return {
      success: false,
      error: 'DeepSeek API Key 未配置'
    };
  }

  try {
    // 根据传入的奖项数据构建系统提示词
    const systemPrompt = buildSystemPrompt(awardData);
    
    // 构建消息历史
    const messages = [
      { role: 'system', content: systemPrompt },
      ...history.map(h => ({
        role: h.type === 'user' ? 'user' : 'assistant',
        content: h.content
      })),
      { role: 'user', content: message }
    ];

    // 调用 DeepSeek API
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: messages,
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    const data = await response.json();

    if (data.error) {
      return {
        success: false,
        error: data.error.message || 'DeepSeek API 调用失败'
      };
    }

    return {
      success: true,
      content: data.choices[0].message.content,
      usage: data.usage
    };

  } catch (error) {
    console.error('DeepSeek 调用错误:', error);
    return {
      success: false,
      error: error.message || '服务暂时不可用'
    };
  }
};