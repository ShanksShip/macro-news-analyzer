export type Impact = "利好" | "利空" | "中性" | "混合" | string

export type Duration = "长期" | "中期" | "短期" | string

export type Magnitude = "高" | "中" | "低" | string

export interface SectorImpact {
  sector: string
  impact: Impact
  reason: string
}

export interface CommodityImpact {
  type: string
  impact: Impact
  reason: string
}

export interface CurrencyPairImpact {
  pair: string
  impact: string
  magnitude: string
}

export interface CryptoImpact {
  coin: string
  impact: Impact
  reason: string
}

export interface IndicatorInfo {
  indicator: string
  threshold: string
  interpretation: string
}

export interface MarketRelation {
  market: string
  signal: string
  interpretation: string
}

export interface NewsAnalysisResponse {
  summary: string
  duration: {
    assessment: Duration
    explanation: string
    theory_support: string
    modulating_factors: string
  }
  direction: {
    stocks: {
      overall: Impact
      sectors: SectorImpact[]
    }
    bonds: {
      overall: Impact
      details: string
      yield_curve: string
    }
    commodities: {
      overall: Impact
      details: CommodityImpact[]
    }
    forex: {
      overall: string
      pairs: CurrencyPairImpact[]
    }
    crypto: {
      overall: Impact
      details: string
      specific_coins: CryptoImpact[]
    }
    cross_market: string
  }
  magnitude: {
    overall: Magnitude
    quantitative: string
    historical_comparison: string
    sensitivity_factors: string
    surprise_scenarios: string
  }
  monitoring: {
    technical_indicators: IndicatorInfo[]
    sentiment_indicators: IndicatorInfo[]
    related_markets: MarketRelation[]
    monitoring_window: string
    secondary_effects: string
    tail_risks: string
  }
}

export interface ModelConfig {
  name: string
  apiUrl: string
  apiKey: string
}
