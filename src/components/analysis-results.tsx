"use client"

import { NewsAnalysisResponse } from "@/types/news-analysis"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ImpactRadarChart from "@/components/impact-radar-chart"

interface AnalysisResultsProps {
  analysis: NewsAnalysisResponse
  investmentAdvice: string | null
  includeCharts: boolean
}

export default function AnalysisResults({
  analysis,
  investmentAdvice,
  includeCharts,
}: AnalysisResultsProps) {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>新闻摘要与整体影响</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-accent/30 p-4 rounded-md">{analysis.summary}</div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>影响时长分析</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 gap-1">
                <div className="font-medium">评估结果：</div>
                <div
                  className={`col-span-2 font-semibold ${
                    analysis.duration.assessment === "长期"
                      ? "text-negative"
                      : analysis.duration.assessment === "中期"
                      ? "text-amber-500"
                      : "text-positive"
                  }`}
                >
                  {analysis.duration.assessment}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="font-medium">详细解释：</div>
                <div className="col-span-2">
                  {analysis.duration.explanation}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="font-medium">理论支持：</div>
                <div className="col-span-2">
                  {analysis.duration.theory_support}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="font-medium">调节因素：</div>
                <div className="col-span-2">
                  {analysis.duration.modulating_factors}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>影响力度评估</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 gap-1">
                <div className="font-medium">整体评估：</div>
                <div
                  className={`col-span-2 font-semibold ${
                    analysis.magnitude.overall === "高"
                      ? "text-negative"
                      : analysis.magnitude.overall === "中"
                      ? "text-amber-500"
                      : "text-positive"
                  }`}
                >
                  {analysis.magnitude.overall}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="font-medium">量化估计：</div>
                <div className="col-span-2">
                  {analysis.magnitude.quantitative}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="font-medium">历史对比：</div>
                <div className="col-span-2">
                  {analysis.magnitude.historical_comparison}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="font-medium">敏感性因素：</div>
                <div className="col-span-2">
                  {analysis.magnitude.sensitivity_factors}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="font-medium">超预期情景：</div>
                <div className="col-span-2">
                  {analysis.magnitude.surprise_scenarios}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {includeCharts && (
        <Card>
          <CardHeader>
            <CardTitle>影响力度可视化</CardTitle>
            <CardDescription>各资产类别影响力度雷达图</CardDescription>
          </CardHeader>
          <CardContent>
            <ImpactRadarChart
              stocksImpact={analysis.direction.stocks.overall}
              bondsImpact={analysis.direction.bonds.overall}
              commoditiesImpact={analysis.direction.commodities.overall}
              forexImpact={analysis.direction.forex.overall}
              cryptoImpact={analysis.direction.crypto.overall}
            />
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>影响方向与范围</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">股票市场</h3>
              <div className="mb-1">
                <span className="font-medium">整体影响：</span>
                <span
                  className={`${
                    analysis.direction.stocks.overall === "利好"
                      ? "text-positive"
                      : analysis.direction.stocks.overall === "利空"
                      ? "text-negative"
                      : "text-neutral"
                  } font-semibold`}
                >
                  {analysis.direction.stocks.overall}
                </span>
              </div>
              {analysis.direction.stocks.sectors &&
                analysis.direction.stocks.sectors.length > 0 && (
                  <div>
                    <div className="font-medium mb-1">行业影响：</div>
                    <ul className="list-disc pl-5 space-y-1">
                      {analysis.direction.stocks.sectors.map(
                        (sector, index) => (
                          <li key={index}>
                            <span className="font-medium">
                              {sector.sector}：
                            </span>
                            <span
                              className={`${
                                sector.impact === "利好"
                                  ? "text-positive"
                                  : sector.impact === "利空"
                                  ? "text-negative"
                                  : "text-neutral"
                              } font-semibold`}
                            >
                              {sector.impact}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">债券市场</h3>
              <div className="mb-1">
                <span className="font-medium">整体影响：</span>
                <span
                  className={`${
                    analysis.direction.bonds.overall === "利好"
                      ? "text-positive"
                      : analysis.direction.bonds.overall === "利空"
                      ? "text-negative"
                      : "text-neutral"
                  } font-semibold`}
                >
                  {analysis.direction.bonds.overall}
                </span>
              </div>
              <div className="mb-1">
                <span className="font-medium">收益率曲线：</span>
                <span>{analysis.direction.bonds.yield_curve}</span>
              </div>
              <div>
                <span className="font-medium">详细解释：</span>
                <span>{analysis.direction.bonds.details}</span>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">商品市场</h3>
              <div className="mb-1">
                <span className="font-medium">整体影响：</span>
                <span
                  className={`${
                    analysis.direction.commodities.overall === "利好"
                      ? "text-positive"
                      : analysis.direction.commodities.overall === "利空"
                      ? "text-negative"
                      : "text-neutral"
                  } font-semibold`}
                >
                  {analysis.direction.commodities.overall}
                </span>
              </div>
              {analysis.direction.commodities.details &&
                analysis.direction.commodities.details.length > 0 && (
                  <div>
                    <div className="font-medium mb-1">商品类别：</div>
                    <ul className="list-disc pl-5 space-y-1">
                      {analysis.direction.commodities.details.map(
                        (commodity, index) => (
                          <li key={index}>
                            <span className="font-medium">
                              {commodity.type}：
                            </span>
                            <span
                              className={`${
                                commodity.impact === "利好"
                                  ? "text-positive"
                                  : commodity.impact === "利空"
                                  ? "text-negative"
                                  : "text-neutral"
                              } font-semibold`}
                            >
                              {commodity.impact}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">外汇市场</h3>
              <div className="mb-1">
                <span className="font-medium">整体影响：</span>
                <span>{analysis.direction.forex.overall}</span>
              </div>
              {analysis.direction.forex.pairs &&
                analysis.direction.forex.pairs.length > 0 && (
                  <div>
                    <div className="font-medium mb-1">货币对：</div>
                    <ul className="list-disc pl-5 space-y-1">
                      {analysis.direction.forex.pairs.map((pair, index) => (
                        <li key={index}>
                          <span className="font-medium">{pair.pair}：</span>
                          <span>
                            {pair.impact} ({pair.magnitude})
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">加密货币市场</h3>
              <div className="mb-1">
                <span className="font-medium">整体影响：</span>
                <span
                  className={`${
                    analysis.direction.crypto.overall === "利好"
                      ? "text-positive"
                      : analysis.direction.crypto.overall === "利空"
                      ? "text-negative"
                      : "text-neutral"
                  } font-semibold`}
                >
                  {analysis.direction.crypto.overall}
                </span>
              </div>
              <div className="mb-1">
                <span className="font-medium">详细解释：</span>
                <span>{analysis.direction.crypto.details}</span>
              </div>
              {analysis.direction.crypto.specific_coins &&
                analysis.direction.crypto.specific_coins.length > 0 && (
                  <div>
                    <div className="font-medium mb-1">具体币种：</div>
                    <ul className="list-disc pl-5 space-y-1">
                      {analysis.direction.crypto.specific_coins.map(
                        (coin, index) => (
                          <li key={index}>
                            <span className="font-medium">{coin.coin}：</span>
                            <span
                              className={`${
                                coin.impact === "利好"
                                  ? "text-positive"
                                  : coin.impact === "利空"
                                  ? "text-negative"
                                  : "text-neutral"
                              } font-semibold`}
                            >
                              {coin.impact}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">跨市场传导效应</h3>
              <div>{analysis.direction.cross_market}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>影响消退指标</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">技术指标监测</h3>
              {analysis.monitoring.technical_indicators &&
              analysis.monitoring.technical_indicators.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1">
                  {analysis.monitoring.technical_indicators.map(
                    (indicator, index) => (
                      <li key={index}>
                        <span className="font-medium">
                          {indicator.indicator}：
                        </span>
                        <span>阈值 {indicator.threshold}</span>
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <div>无技术指标详细分析</div>
              )}
            </div>

            <div>
              <h3 className="font-semibold mb-2">情绪指标监测</h3>
              {analysis.monitoring.sentiment_indicators &&
              analysis.monitoring.sentiment_indicators.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1">
                  {analysis.monitoring.sentiment_indicators.map(
                    (indicator, index) => (
                      <li key={index}>
                        <span className="font-medium">
                          {indicator.indicator}：
                        </span>
                        <span>阈值 {indicator.threshold}</span>
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <div>无情绪指标详细分析</div>
              )}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold mb-2">监测时间窗口</h3>
            <div>{analysis.monitoring.monitoring_window}</div>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold mb-2">潜在二次效应</h3>
            <div>{analysis.monitoring.secondary_effects}</div>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold mb-2">长尾风险</h3>
            <div>{analysis.monitoring.tail_risks}</div>
          </div>
        </CardContent>
      </Card>

      {investmentAdvice && (
        <Card>
          <CardHeader>
            <CardTitle>投资建议总结</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-accent/30 p-4 rounded-md">
              {investmentAdvice}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
