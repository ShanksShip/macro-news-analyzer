"use client"

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { ModelConfig, NewsAnalysisResponse } from "@/types/news-analysis"

interface NewsState {
  newsText: string
  analysis: NewsAnalysisResponse | null
  isAnalyzing: boolean
  error: string | null
  apiKey: string
  detailedAnalysis: boolean
  includeCharts: boolean
  investmentAdvice: string | null
  selectedModel: ModelConfig
  availableModels: ModelConfig[]

  // Actions
  setNewsText: (text: string) => void
  setApiKey: (key: string) => void
  setAnalysis: (analysis: NewsAnalysisResponse | null) => void
  setIsAnalyzing: (isAnalyzing: boolean) => void
  setError: (error: string | null) => void
  setDetailedAnalysis: (detailed: boolean) => void
  setIncludeCharts: (include: boolean) => void
  setInvestmentAdvice: (advice: string | null) => void
  setSelectedModel: (model: ModelConfig) => void
  addModel: (model: ModelConfig) => void
  removeModel: (modelName: string) => void
}

const DEFAULT_MODELS: ModelConfig[] = [
  {
    name: "deepseek-chat",
    apiUrl: "https://api.deepseek.com/v1/chat/completions",
    apiKey: "",
  },
]

export const useNewsStore = create<NewsState>()(
  persist(
    (set) => ({
      newsText: "",
      analysis: null,
      isAnalyzing: false,
      error: null,
      apiKey: "",
      detailedAnalysis: true,
      includeCharts: true,
      investmentAdvice: null,
      selectedModel: DEFAULT_MODELS[0],
      availableModels: DEFAULT_MODELS,

      setNewsText: (text) => set({ newsText: text }),
      setApiKey: (key) => set({ apiKey: key }),
      setAnalysis: (analysis) => set({ analysis }),
      setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
      setError: (error) => set({ error }),
      setDetailedAnalysis: (detailed) => set({ detailedAnalysis: detailed }),
      setIncludeCharts: (include) => set({ includeCharts: include }),
      setInvestmentAdvice: (advice) => set({ investmentAdvice: advice }),
      setSelectedModel: (model) => set({ selectedModel: model }),
      addModel: (model) =>
        set((state) => ({
          availableModels: [...state.availableModels, model],
          selectedModel: model,
        })),
      removeModel: (modelName) =>
        set((state) => {
          const newModels = state.availableModels.filter(
            (m) => m.name !== modelName
          )
          const needUpdateSelected = state.selectedModel.name === modelName
          return {
            availableModels: newModels,
            selectedModel: needUpdateSelected
              ? newModels[0]
              : state.selectedModel,
          }
        }),
    }),
    {
      name: "macroinsight-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        apiKey: state.apiKey,
        selectedModel: state.selectedModel,
        availableModels: state.availableModels,
        detailedAnalysis: state.detailedAnalysis,
        includeCharts: state.includeCharts,
      }),
    }
  )
)
