"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ThemePage() {
    const colors = [
        { name: "Background", var: "background", fg: "foreground" },
        { name: "Foreground", var: "foreground", bg: "background" },
        { name: "Primary", var: "primary", fg: "primary-foreground" },
        { name: "Primary Foreground", var: "primary-foreground", bg: "primary" },
        { name: "Secondary", var: "secondary", fg: "secondary-foreground" },
        { name: "Secondary Foreground", var: "secondary-foreground", bg: "secondary" },
        { name: "Muted", var: "muted", fg: "muted-foreground" },
        { name: "Muted Foreground", var: "muted-foreground", bg: "muted" },
        { name: "Accent", var: "accent", fg: "accent-foreground" },
        { name: "Accent Foreground", var: "accent-foreground", bg: "accent" },
        { name: "Destructive", var: "destructive", fg: "destructive-foreground" },
        { name: "Destructive Foreground", var: "destructive-foreground", bg: "destructive" },
        { name: "Card", var: "card", fg: "card-foreground" },
        { name: "Card Foreground", var: "card-foreground", bg: "card" },
        { name: "Popover", var: "popover", fg: "popover-foreground" },
        { name: "Popover Foreground", var: "popover-foreground", bg: "popover" },
        { name: "Border", var: "border", fg: "foreground" },
        { name: "Input", var: "input", fg: "foreground" },
        { name: "Ring", var: "ring", fg: "foreground" },
    ]

    const chartColors = [
        { name: "Chart 1", var: "chart-1" },
        { name: "Chart 2", var: "chart-2" },
        { name: "Chart 3", var: "chart-3" },
        { name: "Chart 4", var: "chart-4" },
        { name: "Chart 5", var: "chart-5" },
    ]

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                        Theme Color Palette
                    </h1>
                    <p className="text-muted-foreground">
                        All theme colors and their HSL values
                    </p>
                </div>

                {/* Main Colors */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Main Colors</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {colors.map((color) => (
                            <Card key={color.name} className="p-4 space-y-3">
                                <div
                                    className={`h-24 rounded-md flex items-center justify-center text-sm font-medium bg-${color.var} ${color.fg ? `text-${color.fg}` : ''}`}
                                    style={{
                                        backgroundColor: `hsl(var(--${color.var}))`,
                                        color: color.fg ? `hsl(var(--${color.fg}))` : undefined,
                                    }}
                                >
                                    {color.name}
                                </div>
                                <div className="space-y-1 text-xs">
                                    <div className="font-mono text-muted-foreground">
                                        --{color.var}
                                    </div>
                                    <div className="font-mono text-xs opacity-70">
                                        hsl(var(--{color.var}))
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Chart Colors */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Chart Colors</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {chartColors.map((color) => (
                            <Card key={color.name} className="p-4 space-y-3">
                                <div
                                    className="h-24 rounded-md"
                                    style={{
                                        backgroundColor: `hsl(var(--${color.var}))`,
                                    }}
                                />
                                <div className="space-y-1 text-xs">
                                    <div className="font-medium">{color.name}</div>
                                    <div className="font-mono text-muted-foreground">
                                        --{color.var}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Button Variants */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Button Variants</h2>
                    <Card className="p-6">
                        <div className="flex flex-wrap gap-4">
                            <Button variant="default">Default</Button>
                            <Button variant="secondary">Secondary</Button>
                            <Button variant="destructive">Destructive</Button>
                            <Button variant="outline">Outline</Button>
                            <Button variant="ghost">Ghost</Button>
                            <Button variant="link">Link</Button>
                        </div>
                    </Card>
                </div>

                {/* Button Sizes */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Button Sizes</h2>
                    <Card className="p-6">
                        <div className="flex flex-wrap items-center gap-4">
                            <Button size="sm">Small</Button>
                            <Button size="default">Default</Button>
                            <Button size="lg">Large</Button>
                            <Button size="icon">🎨</Button>
                        </div>
                    </Card>
                </div>

                {/* Gradient Examples */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Gradient Examples</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="p-6">
                            <div className="h-32 rounded-md bg-gradient-to-r from-primary to-cyan-400 flex items-center justify-center text-white font-semibold">
                                Primary to Cyan
                            </div>
                            <p className="text-xs text-muted-foreground mt-2 font-mono">
                                bg-gradient-to-r from-primary to-cyan-400
                            </p>
                        </Card>
                        <Card className="p-6">
                            <div className="h-32 rounded-md bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-semibold">
                                Primary to Primary/80
                            </div>
                            <p className="text-xs text-muted-foreground mt-2 font-mono">
                                bg-gradient-to-br from-primary to-primary/80
                            </p>
                        </Card>
                        <Card className="p-6">
                            <div className="h-32 rounded-md bg-gradient-to-r from-secondary to-secondary/70 flex items-center justify-center text-secondary-foreground font-semibold">
                                Secondary to Secondary/70
                            </div>
                            <p className="text-xs text-muted-foreground mt-2 font-mono">
                                bg-gradient-to-r from-secondary to-secondary/70
                            </p>
                        </Card>
                        <Card className="p-6">
                            <div className="h-32 rounded-md bg-gradient-to-r from-destructive to-destructive/80 flex items-center justify-center text-white font-semibold">
                                Destructive Gradient
                            </div>
                            <p className="text-xs text-muted-foreground mt-2 font-mono">
                                bg-gradient-to-r from-destructive to-destructive/80
                            </p>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
