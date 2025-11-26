import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, MapPin, Calendar, Tag, User } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { Event } from './EventList';

interface EventDetailsModalProps {
  event: Event | null;
  onClose: () => void;
}

const MEMBER_AVATARS: Record<string, { color: string; label: string; name: string }> = {
  mom: { color: 'bg-pink-400', label: 'M', name: 'Mom' },
  dad: { color: 'bg-blue-400', label: 'D', name: 'Dad' },
  sarah: { color: 'bg-purple-400', label: 'S', name: 'Sarah' },
  tommy: { color: 'bg-green-400', label: 'T', name: 'Tommy' },
};

export function EventDetailsModal({ event, onClose }: EventDetailsModalProps) {
  if (!event) return null;

  return (
    <AnimatePresence>
      {event && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <div className="fixed inset-0 flex items-center justify-center z-[70] pointer-events-none p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md pointer-events-auto"
            >
              <GlassCard className="overflow-hidden shadow-2xl border-emerald-500/20 bg-emerald-950/95">
                <div className={`h-24 ${event.color} relative`}>
                  <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors backdrop-blur-md"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="absolute -bottom-8 left-8 p-4 bg-emerald-900 rounded-2xl shadow-lg border border-emerald-500/30">
                    <Calendar className={`w-8 h-8 ${event.color.replace('bg-', 'text-')}`} />
                  </div>
                </div>

                <div className="pt-12 px-8 pb-8">
                  <div className="mb-6">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-900/50 text-emerald-200 mb-2 border border-emerald-500/20">
                      {event.category}
                    </span>
                    <h2 className="text-2xl font-bold text-emerald-50 leading-tight">{event.title}</h2>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 text-emerald-100/80">
                      <div className="w-10 h-10 rounded-full bg-emerald-900/40 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-emerald-400/60 uppercase">Time</p>
                        <p className="font-medium">{event.time}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-emerald-100/80">
                      <div className="w-10 h-10 rounded-full bg-emerald-900/40 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-emerald-400/60 uppercase">Location</p>
                        <p className="font-medium">{event.location}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-emerald-100/80">
                       <div className="w-10 h-10 rounded-full bg-emerald-900/40 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                        <Tag className="w-5 h-5" />
                      </div>
                       <div>
                        <p className="text-xs font-bold text-emerald-400/60 uppercase">Date</p>
                        <p className="font-medium">{event.date}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-emerald-500/20 pt-6">
                    <h4 className="text-sm font-bold text-emerald-400/60 uppercase mb-4 flex items-center gap-2">
                      <User className="w-4 h-4" /> Attendees
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {event.members.map((m) => {
                        const member = MEMBER_AVATARS[m];
                        return (
                          <div key={m} className="flex items-center gap-2 bg-white/5 pr-4 rounded-full border border-white/5">
                             <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${member?.color || 'bg-gray-400'}`}>
                                {member?.label}
                             </div>
                             <span className="text-sm font-semibold text-emerald-100">{member?.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}