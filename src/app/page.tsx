'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import SearchInput from "@/components/home/SearchInput"

export default function Home() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-8 pt-48 bg-background text-foreground">
      <div className="w-full max-w-2xl space-y-8 text-center">
        {/* Logo / Title */}
        <div className="space-y-4 fade-in">
          <h1 className=" p-2 text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Propalyst AI
          </h1>
          <p className="text-muted-foreground text-lg">
            Intelligent Real Estate Matching Engine
          </p>

        </div>

        {/* Search Box */}

        <SearchInput />


      </div>
    </div>
  );
}
