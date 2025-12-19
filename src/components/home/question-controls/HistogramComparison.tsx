"use client"

import { useState } from "react"
import { BarChart3 } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { motion } from "motion/react"
import { HistogramBin } from "@/data/mock-questions"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Button } from "@/components/ui/button"

interface HistogramComparisonProps {
  bins: HistogramBin[]
}

export function HistogramComparison({ bins }: HistogramComparisonProps) {
  const [view, setView] = useState<"custom" | "recharts">("custom")

  const maxCount = Math.max(...bins.map((b) => b.count))

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
    <div className="w-full space-y-4">
      {/* Chart Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-primary" />
          <p className="text-sm font-medium text-muted-foreground">
            Property Distribution
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={view === "custom" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("custom")}
          >
            Custom
          </Button>
          <Button
            variant={view === "recharts" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("recharts")}
          >
            Recharts
          </Button>
        </div>
      </div>

      {/* Custom Motion Version */}
      {view === "custom" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-end gap-1 h-48 px-1">
            {bins.map((bin, index) => (
              <motion.div
                key={bin.range}
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: `${(bin.count / maxCount) * 100}%`,
                  opacity: 1,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.05,
                  ease: "easeOut",
                }}
                className="flex-1 min-h-2 rounded-sm bg-gradient-to-t from-primary to-primary/50 hover:from-primary/80 hover:to-primary/40 transition-colors"
                title={`${bin.range}: ${bin.count} properties`}
              />
            ))}
          </div>

          {/* Labels */}
          <div className="flex items-end gap-1 mt-2 text-xs text-muted-foreground">
            {bins.map((bin) => (
              <div key={bin.range} className="flex-1 text-center truncate">
                {bin.range}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Recharts Version */}
      {view === "recharts" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ChartContainer config={chartConfig} className="h-24 w-full">
            <BarChart data={chartData} margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
              <XAxis
                dataKey="range"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              {/* <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} /> */}
              <ChartTooltip cursor={true} content={<ChartTooltipContent hideLabel />} />
              <Bar
                dataKey="count"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
                animationDuration={600}
              />
            </BarChart>
          </ChartContainer>
        </motion.div>
      )}
    </div>
  )
}
