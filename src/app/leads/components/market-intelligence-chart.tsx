'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

interface MarketIntelligenceChartProps {
  title: string;
  data: Array<{ name: string; count: number; highlighted?: boolean }>;
  color: string;
}

export function MarketIntelligenceChart({
  title,
  data,
  color
}: MarketIntelligenceChartProps) {
  const hasData = data && data.length > 0;

  return (
    <div className="bg-secondary/30 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>

      {!hasData ? (
        <div className="flex flex-col items-center justify-center min-h-[250px]">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">No data available</p>
          </div>
        </div>
      ) : (
        <ChartContainer
          config={{
            count: {
              label: "Properties",
              color: color,
            },
          } satisfies ChartConfig}
          className="min-h-[250px] w-full"
        >
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Bar
              dataKey="count"
              radius={4}
              shape={(props: any) => {
                const { x, y, width, height, payload } = props;
                const fillColor = payload?.highlighted ? color : '#e5e7eb';
                return (
                  <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    fill={fillColor}
                    rx={4}
                    ry={4}
                  />
                );
              }}
            />
          </BarChart>
        </ChartContainer>
      )}
    </div>
  );
}
