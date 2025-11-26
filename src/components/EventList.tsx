import React from 'react';
import { GlassCard } from './ui/GlassCard';
import { Clock, MapPin, Trash2, Users } from 'lucide-react';
import { motion } from 'motion/react';

export interface Event {
  id: string;
  title: string;
  time: string;
  date: string;
  location: string;
  members: string[];
  category: string;
  color: string;
}

interface EventListProps {
  events: Event[];
  onDelete: (id: string) => void;
  onViewDetails: (event: Event) => void;
}

const MEMBER_AVATARS: Record<string, { color: string; label: string }> = {
  mom: { color: 'bg-pink-400', label: 'M' },
  dad: { color: 'bg-blue-400', label: 'D' },
  sarah: { color: 'bg-purple-400', label: 'S' },
  tommy: { color: 'bg-green-400', label: 'T' },
};

export function EventList({ events, onDelete, onViewDetails }: EventListProps) {
  if (events.length === 0) {
    return (
      <GlassCard className="p-10 flex flex-col items-center justify-center text-center bg-black/20">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 ring-1 ring-emerald-500/20">
          <Users className="w-8 h-8 text-emerald-500/50" />
        </div>
        <h3 className="text-xl font-semibold text-emerald-100">No events found</h3>
        <p className="text-emerald-400/60 mt-2">Try adjusting your filters or search terms.</p>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <motion.div
          layout
          key={event.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <GlassCard hoverEffect className="p-0 flex flex-col sm:flex-row group bg-black/20">
            {/* Color Strip */}
            <div className={`h-2 sm:h-auto sm:w-2 ${event.color}`} />
            
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-2 items-center mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-200 bg-emerald-900/60 px-2.5 py-1 rounded-md shadow-sm ring-1 ring-emerald-500/30">
                    {event.category}
                  </span>
                  <span className="text-sm font-medium text-emerald-400/60 ml-2">
                    {event.date}
                  </span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(event.id);
                  }}
                  className="text-emerald-400/40 hover:text-red-400 transition-colors p-2 hover:bg-red-900/20 rounded-full opacity-0 group-hover:opacity-100 focus:opacity-100"
                  title="Delete Event"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <h3 className="text-xl font-bold text-emerald-50 mb-4">{event.title}</h3>

              <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-emerald-200/80 mb-6">
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span className="font-medium">{event.time}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span className="font-medium">{event.location}</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-emerald-500/20 pt-4 mt-2">
                <div className="flex -space-x-3 pl-1">
                  {event.members.map((m) => (
                    <div
                      key={m}
                      className={`w-9 h-9 rounded-full border-[3px] border-emerald-950 flex items-center justify-center text-white text-xs font-bold shadow-sm transition-transform hover:translate-y-[-2px] ${
                        MEMBER_AVATARS[m]?.color || 'bg-gray-400'
                      }`}
                      title={MEMBER_AVATARS[m]?.label}
                    >
                      {MEMBER_AVATARS[m]?.label}
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => onViewDetails(event)}
                  className="px-5 py-2.5 bg-emerald-900/50 hover:bg-emerald-800/50 text-emerald-200 text-sm font-bold rounded-xl transition-all hover:shadow-md active:scale-95 border border-emerald-500/20"
                >
                  View Details
                </button>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}