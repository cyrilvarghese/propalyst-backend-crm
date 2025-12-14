'use client';

import SearchFlow from "@/components/home/search-flow"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-8 pt-48 bg-background text-foreground">
      {/* Logo / Title */}
      <div className="w-full max-w-2xl space-y-8 text-center">
        <div className="space-y-4 fade-in">
          <h1 className="p-2 text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
            Propalyst AI
          </h1>
          <p className="text-muted-foreground text-lg pb-4">
            Your AI-Powered Personal Real Estate Concierge
          </p>
        </div>
      </div>

      {/* Main Search Flow */}
      <SearchFlow />
    </div>
  );
}
