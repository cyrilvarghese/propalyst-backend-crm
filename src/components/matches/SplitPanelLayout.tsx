"use client"

import { ReactNode } from "react"

interface SplitPanelLayoutProps {
  leftPanel: ReactNode
  rightPanel: ReactNode
}

/**
 * Split panel layout: 30% left, 70% right
 * Responsive: stacks vertically on mobile
 */
export function SplitPanelLayout({ leftPanel, rightPanel }: SplitPanelLayoutProps) {
  return (
    <div className="flex h-full w-full bg-background">
      {/* Left Panel - 30% */}
      <div className="hidden md:flex w-[30%] border-r border-border flex-col overflow-hidden bg-card">
        {leftPanel}
      </div>

      {/* Right Panel - 70% */}
      <div className="w-full md:w-[70%] flex flex-col overflow-hidden">
        {rightPanel}
      </div>
    </div>
  )
}
