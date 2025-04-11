import { NewsAnalysisResponse } from "@/types/news-analysis"

export const generateReport = (
  newsText: string,
  analysis: NewsAnalysisResponse,
  investmentAdvice: string | null
): string => {
  let report = `# 宏观新闻影响分析报告

## 分析新闻
${newsText}

## 新闻摘要与整体影响
${analysis.summary}

## 1. 影响时长分析
- **评估结果：** ${analysis.duration.assessment}
- **详细解释：** ${analysis.duration.explanation}
- **理论支持：** ${analysis.duration.theory_support}
- **调节因素：** ${analysis.duration.modulating_factors}

## 2. 影响方向与范围

### 股票市场
- **整体影响：** ${analysis.direction.stocks.overall}
- **行业影响：**
`

  // 添加行业影响
  if (analysis.direction.stocks.sectors) {
    analysis.direction.stocks.sectors.forEach((sector) => {
      report += `
  - ${sector.sector}: ${sector.impact} - ${sector.reason}`
    })
  }

  report += `

### 债券市场
- **整体影响：** ${analysis.direction.bonds.overall}
- **收益率曲线变化：** ${analysis.direction.bonds.yield_curve}
- **详细解释：** ${analysis.direction.bonds.details}

### 商品市场
- **整体影响：** ${analysis.direction.commodities.overall}
`

  // 添加商品详情
  if (analysis.direction.commodities.details) {
    analysis.direction.commodities.details.forEach((commodity) => {
      report += `
  - ${commodity.type}: ${commodity.impact} - ${commodity.reason}`
    })
  }

  report += `

### 外汇市场
- **整体影响：** ${analysis.direction.forex.overall}
`

  // 添加外汇详情
  if (analysis.direction.forex.pairs) {
    analysis.direction.forex.pairs.forEach((pair) => {
      report += `
  - ${pair.pair}: ${pair.impact} (${pair.magnitude})`
    })
  }

  report += `

### 加密货币市场
- **整体影响：** ${analysis.direction.crypto.overall}
- **详细解释：** ${analysis.direction.crypto.details}
`

  // 添加加密货币详情
  if (analysis.direction.crypto.specific_coins) {
    analysis.direction.crypto.specific_coins.forEach((coin) => {
      report += `
  - ${coin.coin}: ${coin.impact} - ${coin.reason}`
    })
  }

  report += `

### 跨市场传导效应
${analysis.direction.cross_market}

## 3. 影响力度评估
- **整体评估：** ${analysis.magnitude.overall}
- **量化估计：** ${analysis.magnitude.quantitative}
- **历史对比：** ${analysis.magnitude.historical_comparison}
- **敏感性因素：** ${analysis.magnitude.sensitivity_factors}
- **超预期情景：** ${analysis.magnitude.surprise_scenarios}

## 4. 影响消退指标

### 技术指标监测
`

  // 添加技术指标
  if (analysis.monitoring.technical_indicators) {
    analysis.monitoring.technical_indicators.forEach((indicator) => {
      report += `
  - ${indicator.indicator}: ${indicator.threshold} - ${indicator.interpretation}`
    })
  }

  report += `

### 情绪指标监测
`

  // 添加情绪指标
  if (analysis.monitoring.sentiment_indicators) {
    analysis.monitoring.sentiment_indicators.forEach((indicator) => {
      report += `
  - ${indicator.indicator}: ${indicator.threshold} - ${indicator.interpretation}`
    })
  }

  report += `

### 关联市场监测
`

  // 添加关联市场
  if (analysis.monitoring.related_markets) {
    analysis.monitoring.related_markets.forEach((market) => {
      report += `
  - ${market.market}: ${market.signal} - ${market.interpretation}`
    })
  }

  report += `

- **建议监测时间窗口：** ${analysis.monitoring.monitoring_window}
- **二次效应分析：** ${analysis.monitoring.secondary_effects}
- **长尾风险：** ${analysis.monitoring.tail_risks}
`

  // 如果有投资建议，添加到报告中
  if (investmentAdvice) {
    report += `

## 投资建议总结
${investmentAdvice}
`
  }

  report += `

---
*报告生成时间: ${new Date().toLocaleString("zh-CN")}*
*由 MacroInsight 宏观新闻分析工具生成*
`

  return report
}

export const downloadReport = (
  report: string,
  filename = `宏观新闻分析_${new Date().toISOString().replace(/[:.]/g, "")}.md`
) => {
  const blob = new Blob([report], { type: "text/markdown" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
