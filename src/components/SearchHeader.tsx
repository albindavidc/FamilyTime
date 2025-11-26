import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

interface SearchHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function SearchHeader({ searchQuery, setSearchQuery }: SearchHeaderProps) {
  return (
    <header className="mb-8">
      <div className="flex justify-center items-center mb-8">
        <h1 className="text-3xl font-bold text-emerald-50 tracking-tight drop-shadow-sm font-[ADLaM_Display]">
          Family Time
        </h1>
      </div>

      <div className="relative">
        <GlassCard className="p-1 flex items-center rounded-2xl overflow-visible focus-within:ring-2 ring-emerald-500/30 transition-all bg-black/20">
          <div className="pl-4 pr-2">
            <Search className="w-6 h-6 text-emerald-400/70" />
          </div>
          <input
            type="text"
            placeholder="Search for events, tasks, or family members..."
            className="w-full h-14 bg-transparent border-none focus:outline-none text-emerald-50 placeholder:text-emerald-500/50 text-lg font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="hidden sm:block bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-500 transition-all hover:shadow-lg active:scale-95 mr-1">
            Search
          </button>
        </GlassCard>
      </div>
    </header>
  );
}
