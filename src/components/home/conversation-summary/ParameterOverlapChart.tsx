"use client"

import { motion } from "motion/react"
import { Card } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface ParameterOverlapChartProps {
  answers: Record<string, any>
}

/**
 * Generates chart data based on user answers
 * Shows how different search parameters overlap and relate to each other
 */
function generateChartData(answers: Record<string, any>) {
  const budget = answers.budget as [number, number] | undefined
  const bedroomCount = parseInt(answers.bedroom_count || 0)

  // Create data points showing parameter overlap
  // X-axis represents price points, Y-axis shows availability/relevance
  const dataPoints = []

  if (budget) {
    const [min, max] = budget
    const step = (max - min) / 8

    for (let i = 0; i <= 8; i++) {
      const price = min + step * i
      const priceNorm = (price - min) / (max - min) * 100

      // Calculate mock availability metrics based on parameters
      const bedroomRelevance = bedroomCount > 0 ? (bedroomCount / 4) * 100 : 50
      const priceRelevance = 100 - Math.abs(priceNorm - 50) * 0.5
      const marketFit = (priceRelevance + bedroomRelevance) / 2

      dataPoints.push({
        price: `₹${price.toFixed(1)}Cr`,
        priceValue: price,
        "Your Match": Math.round(marketFit),
        "Market Availability": Math.round(100 - Math.abs(priceNorm - 50) * 0.3),
        "Best Value": Math.round(Math.max(0, 100 - Math.abs(priceNorm - 50) * 0.7)),
      })
    }
  }

  return dataPoints.length > 0 ? dataPoints : []
}

export function ParameterOverlapChart({
  answers,
}: ParameterOverlapChartProps) {
  const chartData = generateChartData(answers)

  if (chartData.length === 0) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.4 }}
      className="bg-card border border-border rounded-lg p-6 space-y-4"
    >
      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-primary" />
        Parameter Overlap Analysis
      </h3>

      <p className="text-sm text-muted-foreground">
        How your search criteria align with market availability across your budget range
      </p>

      <Card className="bg-muted/30 p-4">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
            <defs>
              <linearGradient id="colorYourMatch" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorMarketAvailability" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorBestValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="price"
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: "12px" }}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: "12px" }}
              label={{ value: "Relevance Score (%)", angle: -90, position: "insideLeft" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              cursor={{ fill: "hsl(var(--primary))", opacity: 0.1 }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="Your Match"
              stroke="hsl(var(--primary))"
              fillOpacity={1}
              fill="url(#colorYourMatch)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="Market Availability"
              stroke="hsl(var(--secondary))"
              fillOpacity={1}
              fill="url(#colorMarketAvailability)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="Best Value"
              stroke="#10b981"
              fillOpacity={1}
              fill="url(#colorBestValue)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-primary/5 rounded p-3 border border-primary/20">
          <p className="text-muted-foreground">Your Match</p>
          <p className="font-semibold text-primary">How well properties match your criteria</p>
        </div>
        <div className="bg-secondary/5 rounded p-3 border border-secondary/20">
          <p className="text-muted-foreground">Market Availability</p>
          <p className="font-semibold text-secondary">Properties available in your budget</p>
        </div>
        <div className="bg-green-500/10 rounded p-3 border border-green-500/20">
          <p className="text-muted-foreground">Best Value</p>
          <p className="font-semibold text-green-600">Optimal price-to-quality ratio</p>
        </div>
      </div>
    </motion.div>
  )
}
