"use client"

import { motion } from "motion/react"
import { BarChart3 } from "lucide-react"
import { HistogramBin } from "@/data/mock-questions"

interface HistogramChartProps {
  bins: HistogramBin[]
}

export function HistogramChart({ bins }: HistogramChartProps) {
  const maxCount = Math.max(...bins.map((b) => b.count))

  return (
    <div>
      {/* Chart Title */}
      <div className="flex items-center gap-2 mb-3">
        <BarChart3 className="w-4 h-4 text-primary" />
        <p className="text-sm font-medium text-muted-foreground">
          Property Distribution
        </p>
      </div>

      {/* Bars Container - flex row with items aligned to bottom */}
      <div className="flex items-end gap-1 h-24 px-1">
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
    </div>
  )
}
