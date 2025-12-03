'use client';

import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', query);
    // TODO: Navigate to dashboard with query
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-slate-950 text-slate-50">
      <div className="w-full max-w-2xl space-y-8 text-center">
        {/* Logo / Title */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Propalyst CRM
          </h1>
          <p className="text-slate-400 text-lg">
            Intelligent Real Estate Matching Engine
          </p>
        </div>

        {/* Search Box */}
        <form onSubmit={handleSearch} className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Describe your requirement (e.g., 3BHK in Indiranagar under 5Cr)"
              className="w-full px-6 py-4 bg-slate-900 border border-slate-800 rounded-lg text-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-xl transition-all"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 px-6 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-md transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </button>
          </div>
        </form>

        {/* Quick Suggestions */}
        <div className="flex flex-wrap justify-center gap-2 text-sm text-slate-500">
          <span>Try:</span>
          <button
            onClick={() => setQuery("3BHK apartment in Indiranagar")}
            className="hover:text-blue-400 transition-colors"
          >
            "3BHK apartment in Indiranagar"
          </button>
          <span>•</span>
          <button
            onClick={() => setQuery("Villa in Koramangala for rent")}
            className="hover:text-blue-400 transition-colors"
          >
            "Villa in Koramangala for rent"
          </button>
        </div>
      </div>
    </div>
  );
}
