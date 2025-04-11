"use client"

import { ModelConfig, NewsAnalysisResponse } from "@/types/news-analysis"

interface AnalyzeNewsParams {
  newsText: string
  apiKey: string
  model: ModelConfig
  detailedAnalysis: boolean
}

export const analyzeNews = async ({
  newsText,
  apiKey,
  model,
  detailedAnalysis,
}: AnalyzeNewsParams): Promise<{
  analysis: NewsAnalysisResponse | null
  error: string | null
}> => {
  try {
    // Construct the prompt for news analysis
    const prompt = getAnalysisPrompt(newsText, detailedAnalysis)

    // Call the API
    const response = await fetch(model.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model.name,
        messages: [{ role: "user", content: prompt }],
      }),
    })

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`)
    }

    const result = await response.json()

    // Extract content from API response
    const analysisText = result.choices[0].message.content
    // Extract JSON from the response text
    const startIdx = analysisText.indexOf("{")
    const endIdx = analysisText.lastIndexOf("}") + 1

    if (startIdx >= 0 && endIdx > startIdx) {
      const jsonStr = analysisText.substring(startIdx, endIdx)
      const analysis = JSON.parse(jsonStr) as NewsAnalysisResponse
      return { analysis, error: null }
    } else {
      // If we can't find properly formatted JSON, try to parse the entire text
      try {
        const analysis = JSON.parse(analysisText) as NewsAnalysisResponse
        return { analysis, error: null }
      } catch (err) {
        return {
          analysis: null,
          error: "无法解析 API 返回的 JSON 数据",
        }
      }
    }
  } catch (err) {
    console.error("Analysis error:", err)
    return {
      analysis: null,
      error: err instanceof Error ? err.message : "分析过程中出现错误",
    }
  }
}

export const getInvestmentAdvice = async (
  newsText: string,
  analysis: NewsAnalysisResponse,
  apiKey: string,
  model: ModelConfig
): Promise<string | null> => {
  try {
    // Construct the prompt for investment advice
    const prompt = `
    基于以下宏观新闻分析，提供简明的投资建议总结：

    新闻内容: ${newsText.substring(0, 300)}...

    影响时长: ${analysis.duration.assessment}
    整体影响力度: ${analysis.magnitude.overall}

    股票市场影响: ${analysis.direction.stocks.overall}
    债券市场影响: ${analysis.direction.bonds.overall}
    商品市场影响: ${analysis.direction.commodities.overall}
    加密货币市场影响: ${analysis.direction.crypto.overall}

    请提供200字以内的投资建议总结，包括风险提示。
    `

    // Call the API
    const response = await fetch(model.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model.name,
        messages: [{ role: "user", content: prompt }],
      }),
    })

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`)
    }

    const result = await response.json()

    return result.choices[0].message.content
  } catch (err) {
    console.error("Investment advice error:", err)
    return null
  }
}

function getAnalysisPrompt(
  newsText: string,
  detailedAnalysis: boolean
): string {
  return `
  请对以下宏观经济/金融新闻进行全面分析：

  "${newsText}"

  请从以下四个维度进行专业评估：

  1. 影响时长：
     - 该新闻对市场的影响周期是长期(数月至数年)、中期(数周至数月)还是短期(数小时至数天)?
     - 基于哪些经济/金融理论或历史先例支持您的判断?
     - 影响时长可能受哪些额外因素调节?

  2. 影响方向与范围：
     - 对不同资产类别的影响方向(利好/利空/中性):
       * 股票市场(细分行业影响差异)
       * 债券市场(关注收益率曲线变化)
       * 商品市场(能源、贵金属、农产品等)
       * 外汇市场(主要货币对)
       * 加密货币市场
     - 是否存在跨市场传导效应?

  3. 影响力度评估：
     - 预期市场波动幅度(高/中/低)及量化估计
     - 与历史相似事件的对比分析
     - 当前市场环境下的敏感性因素
     - 可能的超预期反应情景

  4. 影响消退指标：
     - 关键监测指标:
       * 技术指标(价格、交易量、波动率等)
       * 情绪指标(VIX、情绪指数、资金流向等)
       * 关联市场反应
     - 建议监测时间窗口
     - 潜在的二次效应或长尾风险

  ${
    detailedAnalysis
      ? "请提供基于数据和理论支持的详细分析，避免主观臆断，并在适当情况下指出分析的不确定性。"
      : "请提供简明扼要的分析，重点突出关键影响和核心结论。"
  }

  请以JSON格式返回结果，格式如下：
  {
    "summary": "简要总结新闻内容和总体影响",
    "duration": {
      "assessment": "长期/中期/短期",
      "explanation": "详细解释",
      "theory_support": "理论支持",
      "modulating_factors": "可能的调节因素"
    },
    "direction": {
      "stocks": {
        "overall": "利好/利空/中性",
        "sectors": [
          {"sector": "行业1", "impact": "利好/利空/中性", "reason": "原因"},
          {"sector": "行业2", "impact": "利好/利空/中性", "reason": "原因"}
        ]
      },
      "bonds": {
        "overall": "利好/利空/中性",
        "details": "详细解释",
        "yield_curve": "收益率曲线变化"
      },
      "commodities": {
        "overall": "利好/利空/中性",
        "details": [
          {"type": "能源", "impact": "利好/利空/中性", "reason": "原因"},
          {"type": "贵金属", "impact": "利好/利空/中性", "reason": "原因"},
          {"type": "农产品", "impact": "利好/利空/中性", "reason": "原因"}
        ]
      },
      "forex": {
        "overall": "详细说明",
        "pairs": [
          {"pair": "货币对1", "impact": "升值/贬值", "magnitude": "幅度"},
          {"pair": "货币对2", "impact": "升值/贬值", "magnitude": "幅度"}
        ]
      },
      "crypto": {
        "overall": "利好/利空/中性",
        "details": "详细解释",
        "specific_coins": [
          {"coin": "比特币", "impact": "利好/利空/中性", "reason": "原因"},
          {"coin": "以太坊", "impact": "利好/利空/中性", "reason": "原因"}
        ]
      },
      "cross_market": "跨市场传导效应分析"
    },
    "magnitude": {
      "overall": "高/中/低",
      "quantitative": "量化估计",
      "historical_comparison": "历史对比",
      "sensitivity_factors": "敏感性因素",
      "surprise_scenarios": "超预期情景"
    },
    "monitoring": {
      "technical_indicators": [
        {"indicator": "指标1", "threshold": "阈值", "interpretation": "解释"},
        {"indicator": "指标2", "threshold": "阈值", "interpretation": "解释"}
      ],
      "sentiment_indicators": [
        {"indicator": "指标1", "threshold": "阈值", "interpretation": "解释"},
        {"indicator": "指标2", "threshold": "阈值", "interpretation": "解释"}
      ],
      "related_markets": [
        {"market": "市场1", "signal": "信号", "interpretation": "解释"},
        {"market": "市场2", "signal": "信号", "interpretation": "解释"}
      ],
      "monitoring_window": "建议监测时间窗口",
      "secondary_effects": "二次效应分析",
      "tail_risks": "长尾风险"
    }
  }
  `
}
