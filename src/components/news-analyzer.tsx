"use client"

import { useEffect, useState } from "react"
import { useNewsStore } from "@/store/news-store"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import SettingsDialog from "@/components/settings-dialog"
import { analyzeNews, getInvestmentAdvice } from "@/lib/analyze-news"
import { generateReport, downloadReport } from "@/lib/generate-report"
import AnalysisResults from "@/components/analysis-results"
import { Download, Loader2 } from "lucide-react"

export default function NewsAnalyzer() {
  // 添加水合状态跟踪
  const [isClient, setIsClient] = useState(false)

  const {
    newsText,
    setNewsText,
    analysis,
    setAnalysis,
    isAnalyzing,
    setIsAnalyzing,
    error,
    setError,
    apiKey,
    detailedAnalysis,
    setDetailedAnalysis,
    includeCharts,
    setIncludeCharts,
    investmentAdvice,
    setInvestmentAdvice,
    selectedModel,
  } = useNewsStore()

  // 在客户端渲染后设置状态
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleAnalysisSubmit = async () => {
    if (!apiKey) {
      setError("请在设置中输入有效的 API 密钥")
      return
    }

    if (!newsText) {
      setError("请输入新闻内容")
      return
    }

    setIsAnalyzing(true)
    setError(null)
    setAnalysis(null)
    setInvestmentAdvice(null)

    try {
      // 1. Perform the main news analysis
      const { analysis: newsAnalysis, error: analysisError } =
        await analyzeNews({
          newsText,
          apiKey,
          model: selectedModel,
          detailedAnalysis,
        })

      if (analysisError) {
        setError(analysisError)
        setIsAnalyzing(false)
        return
      }

      if (!newsAnalysis) {
        setError("分析结果为空")
        setIsAnalyzing(false)
        return
      }

      setAnalysis(newsAnalysis)

      // 2. Get investment advice
      const advice = await getInvestmentAdvice(
        newsText,
        newsAnalysis,
        apiKey,
        selectedModel
      )

      setInvestmentAdvice(advice)
    } catch (err) {
      console.error("Analysis error:", err)
      setError(err instanceof Error ? err.message : "分析过程中出现错误")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleDownloadReport = () => {
    if (!analysis) return

    const report = generateReport(newsText, analysis, investmentAdvice)
    downloadReport(report)
  }

  // 如果尚未在客户端渲染，显示加载指示器
  if (!isClient) {
    return (
      <div className="container mx-auto max-w-5xl h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-5xl">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            MacroInsight 宏观新闻分析工具
          </h1>
          <p className="text-muted-foreground">
            通过 AI 深度分析宏观经济新闻对金融市场的潜在影响
          </p>
        </div>
        <SettingsDialog />
      </header>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>输入新闻</CardTitle>
            <CardDescription>粘贴宏观经济或金融新闻内容</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={newsText}
              onChange={(e) => setNewsText(e.target.value)}
              placeholder="在此粘贴新闻内容..."
              className="min-h-[200px]"
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={detailedAnalysis}
                  onChange={(e) => setDetailedAnalysis(e.target.checked)}
                  className="rounded"
                />
                详细分析
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={includeCharts}
                  onChange={(e) => setIncludeCharts(e.target.checked)}
                  className="rounded"
                />
                包含可视化图表
              </label>
            </div>
            <Button
              onClick={handleAnalysisSubmit}
              disabled={isAnalyzing || !newsText || !apiKey}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  分析中...
                </>
              ) : (
                "分析新闻"
              )}
            </Button>
          </CardFooter>
        </Card>

        {error && (
          <div className="p-4 border border-destructive text-destructive rounded-md">
            {error}
          </div>
        )}

        {analysis && (
          <>
            <AnalysisResults
              analysis={analysis}
              investmentAdvice={investmentAdvice}
              includeCharts={includeCharts}
            />

            <Card>
              <CardHeader>
                <CardTitle>下载报告</CardTitle>
                <CardDescription>导出完整的分析报告</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={handleDownloadReport}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  下载 Markdown 报告
                </Button>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <footer className="mt-12 py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} MacroInsight 宏观新闻分析工具
      </footer>
    </div>
  )
}
