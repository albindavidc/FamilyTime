import React from 'react';
import { GlassCard } from './ui/GlassCard';
import { Calendar, User, Briefcase, BookOpen, Dumbbell, Music, Home } from 'lucide-react';

export interface FilterState {
  members: string[];
  categories: string[];
}

interface SidebarFiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const FAMILY_MEMBERS = [
  { id: 'mom', name: 'Mom', color: 'bg-pink-400' },
  { id: 'dad', name: 'Dad', color: 'bg-blue-400' },
  { id: 'sarah', name: 'Sarah', color: 'bg-purple-400' },
  { id: 'tommy', name: 'Tommy', color: 'bg-green-400' },
];

const CATEGORIES = [
  { id: 'work', name: 'Work', icon: Briefcase },
  { id: 'school', name: 'School', icon: BookOpen },
  { id: 'sports', name: 'Sports', icon: Dumbbell },
  { id: 'music', name: 'Music', icon: Music },
  { id: 'home', name: 'Household', icon: Home },
];

export function SidebarFilters({ filters, setFilters }: SidebarFiltersProps) {
  const toggleMember = (id: string) => {
    setFilters(prev => ({
      ...prev,
      members: prev.members.includes(id)
        ? prev.members.filter(m => m !== id)
        : [...prev.members, id]
    }));
  };

  const toggleCategory = (id: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(id)
        ? prev.categories.filter(c => c !== id)
        : [...prev.categories, id]
    }));
  };

  return (
    <div className="space-y-6">
      <GlassCard className="p-6 bg-black/20">
        <h3 className="text-lg font-bold text-emerald-100 mb-5 flex items-center gap-2.5">
          <div className="p-1.5 bg-emerald-900/50 rounded-lg text-emerald-400">
            <User className="w-4 h-4" /> 
          </div>
          Family Member
        </h3>
        <div className="space-y-2.5">
          {FAMILY_MEMBERS.map((member) => (
            <div
              key={member.id}
              onClick={() => toggleMember(member.id)}
              className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all duration-200 ${
                filters.members.includes(member.id) 
                  ? 'bg-emerald-900/40 ring-1 ring-emerald-500/30 shadow-inner' 
                  : 'hover:bg-white/5 hover:pl-4'
              }`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm ring-2 ring-black/20 ${member.color}`}>
                {member.name[0]}
              </div>
              <span className={`font-medium transition-colors ${
                filters.members.includes(member.id) ? 'text-emerald-200' : 'text-emerald-400/60'
              }`}>
                {member.name}
              </span>
              {filters.members.includes(member.id) && (
                <div className="ml-auto w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              )}
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-6 bg-black/20">
        <h3 className="text-lg font-bold text-emerald-100 mb-5 flex items-center gap-2.5">
          <div className="p-1.5 bg-emerald-900/50 rounded-lg text-emerald-400">
            <Calendar className="w-4 h-4" />
          </div>
           Categories
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = filters.categories.includes(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => toggleCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 active:scale-95 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 ring-1 ring-emerald-500/50'
                    : 'bg-white/5 text-emerald-400/60 hover:bg-white/10 hover:text-emerald-200 border border-transparent hover:border-emerald-500/20'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-100' : 'text-emerald-500/50'}`} />
                {cat.name}
              </button>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
}
