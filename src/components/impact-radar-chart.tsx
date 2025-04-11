"use client"

import { Impact } from "@/types/news-analysis"
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

interface ImpactData {
  subject: string
  impact: number
  fullMark: number
}

interface ImpactRadarChartProps {
  stocksImpact: Impact
  bondsImpact: Impact
  commoditiesImpact: Impact
  forexImpact: string
  cryptoImpact: Impact
  className?: string
}

const getImpactValue = (impact: string): number => {
  const impactMap: Record<string, number> = {
    强烈利好: 0.9,
    显著利好: 0.9,
    强利好: 0.9,
    利好: 0.7,
    正面: 0.7,
    积极: 0.7,
    轻微利好: 0.6,
    小幅利好: 0.6,
    中性: 0.5,
    混合: 0.5,
    轻微利空: 0.4,
    小幅利空: 0.4,
    利空: 0.3,
    负面: 0.3,
    消极: 0.3,
    强烈利空: 0.1,
    显著利空: 0.1,
    强利空: 0.1,
  }

  return impactMap[impact.toLowerCase()] || 0.5
}

export default function ImpactRadarChart({
  stocksImpact,
  bondsImpact,
  commoditiesImpact,
  forexImpact,
  cryptoImpact,
  className,
}: ImpactRadarChartProps) {
  const data: ImpactData[] = [
    {
      subject: "股票市场",
      impact: getImpactValue(stocksImpact) * 100,
      fullMark: 100,
    },
    {
      subject: "债券市场",
      impact: getImpactValue(bondsImpact) * 100,
      fullMark: 100,
    },
    {
      subject: "商品市场",
      impact: getImpactValue(commoditiesImpact) * 100,
      fullMark: 100,
    },
    {
      subject: "外汇市场",
      impact: getImpactValue(forexImpact) * 100,
      fullMark: 100,
    },
    {
      subject: "加密货币市场",
      impact: getImpactValue(cryptoImpact) * 100,
      fullMark: 100,
    },
  ]

  return (
    <div className={`w-full h-[400px] ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tickFormatter={(value) => {
              if (value === 0) return "强烈利空"
              if (value === 25) return "利空"
              if (value === 50) return "中性"
              if (value === 75) return "利好"
              if (value === 100) return "强烈利好"
              return ""
            }}
          />
          <Radar
            name="影响力度"
            dataKey="impact"
            stroke="#2563eb"
            fill="#3b82f6"
            fillOpacity={0.6}
          />
          <Tooltip formatter={(value) => `${value}%`} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
