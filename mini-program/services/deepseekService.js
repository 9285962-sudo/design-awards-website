// DeepSeek AI 服务 - 基于微信云开发
// 提供智能问答能力，支持流式输出

class DeepSeekService {
  constructor() {
    this.model = null;
  }

  // 动态构建系统提示词（根据当前选中的奖项）
  buildSystemPrompt() {
    const app = getApp();
    const award = app.globalData.currentAward;
    
    if (!award) {
      return `你是国际设计大奖的专业咨询助手。请根据用户的问题提供帮助。`;
    }
    
    // 根据币种设置符号
    const currencySymbol = award.fee_currency === 'GBP' ? '£' : (award.fee_currency === 'EUR' ? '€' : '$');
    
    // 安全获取数组字段
    const safeJoin = (arr, separator = '、') => arr && Array.isArray(arr) ? arr.join(separator) : '官方未公布';
    const safeValue = (val, defaultVal = '官方未公布') => val !== null && val !== undefined ? val : defaultVal;
    
    return `你是${award.award_name_cn}的专业咨询助手，基于以下官方数据回答问题：

## 奖项基本信息
- 名称：${award.award_name_cn}（${award.award_name_en}）
- 主办方：${safeValue(award.organizer_cn)}（${award.organizer}）
- 国家：${award.country}
- 官网：${award.website}
- 当前届数：第${award.edition_current}届（${award.first_edition_year}年创办）

## 参赛费用
- 早鸟价：${award.fee_early_bird ? currencySymbol + award.fee_early_bird : '官方未公布'}
- 常规价：${award.fee_regular ? currencySymbol + award.fee_regular : '官方未公布'}
- 最终截止：${award.fee_final ? currencySymbol + award.fee_final : '官方未公布'}
- 延期截止：${award.fee_extended ? currencySymbol + award.fee_extended : '官方未公布'}
- 学生价：${award.fee_student ? currencySymbol + award.fee_student : '官方未公布'}
- 加投类别：${award.fee_additional_category ? currencySymbol + award.fee_additional_category : '官方未公布'}

## 时间节点
- 投稿开始：${safeValue(award.submission_open)}
- 早鸟截止：${safeValue(award.deadline_early)}
- 常规截止：${safeValue(award.deadline_regular)}
- 最终截止：${safeValue(award.deadline_final)}
- 结果公布：${safeValue(award.announcement_date)}

## 作品要求
- 图片：${safeValue(award.image_min_count)}-${safeValue(award.image_max_count)}张，${safeJoin(award.image_format, '/')}, ≤${safeValue(award.image_file_size_max)}
- 分辨率：最低${safeValue(award.image_min_resolution)}，推荐${safeValue(award.image_recommended_resolution)}
- 视频（可选）：≤${safeValue(award.video_max_length)}，${safeJoin(award.video_format, '/')}, ≤${safeValue(award.video_max_file_size)}
- 项目说明：≤${safeValue(award.description_max_length)}字符，${safeValue(award.description_language)}
- 作品年限：${safeValue(award.project_year_limit)}内完成（${safeValue(award.project_year_specific)}）
- 接受阶段：${safeJoin(award.project_stage_accepted, '/')}

## 奖项等级
${safeJoin(award.award_levels, '、')}共${award.award_level_count}级

## 获奖权益
- ${award.trophy ? '✅' : '❌'} 奖杯${award.trophy_material ? '（' + award.trophy_material + '）' : ''}
- ${award.certificate ? '✅' : '❌'} 证书${award.certificate_format && award.certificate_format.length ? '（' + safeJoin(award.certificate_format, '+') + '）' : ''}
- ${award.digital_badge ? '✅' : '❌'} 数字徽章
- ${award.logo_usage_rights ? '✅' : '❌'} 标志使用权${award.logo_usage_duration ? '（' + award.logo_usage_duration + '）' : ''}
- ${award.website_feature ? '✅' : '❌'} 官网展示

## 重要政策
- 退款政策：${safeValue(award.refund_policy)}
- 退赛政策：${safeValue(award.withdrawal_policy)}
- 重新投稿：${safeValue(award.resubmission_policy)}

## 评审信息
- 评审标准：${safeValue(award.judging_criteria)}
- 评审轮次：${safeValue(award.judging_rounds)}轮
- 匿名评审：${award.judging_blind ? '是' : '否'}

## 联系方式
- 邮箱：${safeValue(award.contact_email)}
- 电话：${safeValue(award.contact_phone)}
- 工作时间：${safeValue(award.support_hours)}

## 回答原则
1. 只使用上述官方数据，不确定的信息回答"官方未公布"
2. 回答简洁专业，适当使用emoji增加可读性
3. 对于比较类问题（如"和红点奖比哪个好"），客观分析各自特点，不贬低任何奖项
4. 对于作品评估类问题，提供参考标准但不承诺获奖结果`;
  }

  // 初始化模型
  initModel() {
    if (!this.model) {
      this.model = wx.cloud.extend.AI.createModel("deepseek");
    }
    return this.model;
  }

  // 非流式调用（一次性返回完整回答）
  async generateResponse(userMessage) {
    try {
      const model = this.initModel();
      const res = await model.generateText({
        model: "deepseek-r1",
        messages: [
          { role: "system", content: this.buildSystemPrompt() },
          { role: "user", content: userMessage }
        ]
      });
      
      return {
        success: true,
        content: res.choices?.[0]?.message?.content || '抱歉，暂时没有获得回答'
      };
    } catch (error) {
      console.error('DeepSeek调用失败:', error);
      return {
        success: false,
        error: error.message || 'AI服务暂时不可用'
      };
    }
  }

  // 流式调用（逐字返回，适合实时显示）
  async *streamResponse(userMessage) {
    try {
      const model = this.initModel();
      const res = await model.streamText({
        data: {
          model: "deepseek-r1",
          messages: [
            { role: "system", content: this.buildSystemPrompt() },
            { role: "user", content: userMessage }
          ]
        }
      });

      for await (let event of res.eventStream) {
        if (event.data === '[DONE]') break;
        
        try {
          const data = JSON.parse(event.data);
          // 思维链内容（可选显示）
          const reasoning = data?.choices?.[0]?.delta?.reasoning_content;
          if (reasoning) {
            yield { type: 'reasoning', content: reasoning };
          }
          // 最终回答内容
          const content = data?.choices?.[0]?.delta?.content;
          if (content) {
            yield { type: 'content', content: content };
          }
        } catch (e) {
          console.error('解析流数据失败:', e);
        }
      }
    } catch (error) {
      console.error('DeepSeek流式调用失败:', error);
      yield { type: 'error', content: error.message || 'AI服务暂时不可用' };
    }
  }

  // 智能问答（带意图识别）
  async smartReply(userMessage) {
    // 简单意图识别：高频结构化问题直接查数据
    const lowerMsg = userMessage.toLowerCase();
    
    // 高频结构化问题直接返回（不走AI，更快更省）
    const structuredKeywords = ['费用', '价格', '多少钱', '截止', '时间', '官网'];
    if (structuredKeywords.some(k => lowerMsg.includes(k))) {
      return this.getStructuredAnswer(lowerMsg);
    }
    
    // 其他问题走DeepSeek
    return this.generateResponse(userMessage);
  }

  // 获取结构化数据回答（高频问题快速响应）
  getStructuredAnswer(lowerMsg) {
    const app = getApp();
    const award = app.globalData.currentAward;
    
    if (!award) return null;
    
    // 根据币种设置符号
    const currencySymbol = award.fee_currency === 'GBP' ? '£' : (award.fee_currency === 'EUR' ? '€' : '$');
    const awardShortName = award.award_name_short || award.award_name_cn;
    
    if (lowerMsg.includes('费用') || lowerMsg.includes('价格') || lowerMsg.includes('多少钱')) {
      let feeText = `💰 **${awardShortName}参赛费用**\n\n`;
      
      if (award.fee_early_bird) {
        feeText += `• 早鸟价：${currencySymbol}${award.fee_early_bird}\n`;
      }
      if (award.fee_regular) {
        feeText += `• 常规价：${currencySymbol}${award.fee_regular}\n`;
      }
      if (award.fee_final) {
        feeText += `• 最终截止：${currencySymbol}${award.fee_final}\n`;
      }
      if (award.fee_student) {
        feeText += `• 学生价：${currencySymbol}${award.fee_student}\n`;
      }
      
      if (award.fee_early_bird && award.fee_regular) {
        feeText += `\n💡 建议赶早鸟价，省${currencySymbol}${award.fee_regular - award.fee_early_bird}`;
      }
      
      return {
        success: true,
        content: feeText
      };
    }
    
    if (lowerMsg.includes('截止') || lowerMsg.includes('时间')) {
      let timeText = `⏰ **${awardShortName}重要时间节点**\n\n`;
      
      if (award.deadline_early) {
        timeText += `• 早鸟截止：${award.deadline_early}\n`;
      }
      if (award.deadline_regular) {
        timeText += `• 常规截止：${award.deadline_regular}\n`;
      }
      if (award.deadline_final) {
        timeText += `• 最终截止：${award.deadline_final}\n`;
      }
      if (award.announcement_date) {
        timeText += `• 结果公布：${award.announcement_date}`;
      }
      
      return {
        success: true,
        content: timeText
      };
    }
    
    if (lowerMsg.includes('官网')) {
      return {
        success: true,
        content: `🌐 **${awardShortName}官方网站**\n${award.website}`
      };
    }
    
    // 不匹配结构化问题，返回null让调用方走AI
    return null;
  }
}

// 导出单例
const deepseekService = new DeepSeekService();
export default deepseekService;
