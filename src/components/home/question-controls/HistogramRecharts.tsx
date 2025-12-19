"use client"

import { BarChart3 } from "lucide-react"
import { Bar, BarChart, XAxis } from "recharts"
import { HistogramBin } from "@/data/mock-questions"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

interface HistogramRechartsProps {
  bins: HistogramBin[]
  title: string
}

export function HistogramRecharts({ bins, title }: HistogramRechartsProps) {
  const chartData = bins.map((bin) => ({
    range: bin.range,
    count: bin.count,
  }))

  const chartConfig = {
    count: {
      label: "Properties",
      color: "hsl(var(--primary))",
    },
  } satisfies ChartConfig

  return (
    <div className="w-full">
      {/* Chart Title */}
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="w-4 h-4 text-primary" />
        <p className="text-sm font-medium text-muted-foreground">
          {title}
        </p>
      </div>

      {/* Chart */}
      <ChartContainer config={chartConfig} className="h-24 w-full ">
        <BarChart data={chartData} margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="fillPrimary" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="range"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => value.replace(/Cr/g, '')}
          />
          {/* <ChartTooltip cursor={true} content={<ChartTooltipContent hideLabel />} /> */}
          <Bar

            dataKey="count"
            fill="url(#fillPrimary)"
            radius={[4, 4, 0, 0]}
            animationDuration={600}
          />
        </BarChart>
      </ChartContainer>
    </div>
  )
}
