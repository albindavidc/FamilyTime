import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, MapPin, Calendar as CalendarIcon, Check } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { Event } from './EventList';

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (event: Omit<Event, 'id'>) => void;
}

const CATEGORIES = [
  { id: 'work', name: 'Work' },
  { id: 'school', name: 'School' },
  { id: 'sports', name: 'Sports' },
  { id: 'music', name: 'Music' },
  { id: 'home', name: 'Household' },
];

const FAMILY_MEMBERS = [
  { id: 'mom', name: 'Mom', color: 'bg-pink-400', label: 'M' },
  { id: 'dad', name: 'Dad', color: 'bg-blue-400', label: 'D' },
  { id: 'sarah', name: 'Sarah', color: 'bg-purple-400', label: 'S' },
  { id: 'tommy', name: 'Tommy', color: 'bg-green-400', label: 'T' },
];

export function AddEventModal({ isOpen, onClose, onAdd }: AddEventModalProps) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('home');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!title || !date || !time) return;

    // Determine color based on category (simplified logic)
    const categoryColors: Record<string, string> = {
      work: 'bg-slate-400',
      school: 'bg-lime-500',
      sports: 'bg-emerald-500',
      music: 'bg-teal-500',
      home: 'bg-green-500'
    };

    onAdd({
      title,
      location,
      date,
      time,
      category: selectedCategory,
      members: selectedMembers,
      color: categoryColors[selectedCategory] || 'bg-emerald-500'
    });

    // Reset and close
    setTitle('');
    setLocation('');
    setDate('');
    setTime('');
    setSelectedCategory('home');
    setSelectedMembers([]);
    onClose();
  };

  const toggleMember = (id: string) => {
    setSelectedMembers(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          
          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-[70] pointer-events-none p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg pointer-events-auto"
            >
              <GlassCard className="flex flex-col max-h-[90vh] overflow-hidden shadow-2xl border-emerald-500/20 bg-emerald-950/90 backdrop-blur-xl">
                
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-emerald-500/20">
                  <h2 className="text-2xl font-bold text-emerald-50">Add New Event</h2>
                  <button 
                    onClick={onClose}
                    className="p-2 hover:bg-white/10 rounded-full text-emerald-200 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Scrollable Form Content */}
                <div className="overflow-y-auto p-6 space-y-6">
                  
                  {/* Title */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-emerald-200 ml-1">Event Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., Family Picnic"
                      className="w-full p-4 rounded-xl bg-black/30 border border-emerald-500/20 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 outline-none transition-all text-emerald-50 placeholder:text-emerald-500/40 font-medium"
                    />
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-emerald-200 ml-1">Date</label>
                      <div className="relative">
                        <CalendarIcon className="absolute left-3.5 top-3.5 w-5 h-5 text-emerald-400" />
                        <input
                          type="text"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          placeholder="Today, Tomorrow..."
                          className="w-full pl-11 p-3.5 rounded-xl bg-black/30 border border-emerald-500/20 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 outline-none transition-all text-emerald-50 placeholder:text-emerald-500/40 font-medium"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-emerald-200 ml-1">Time</label>
                      <div className="relative">
                        <Clock className="absolute left-3.5 top-3.5 w-5 h-5 text-emerald-400" />
                        <input
                          type="text"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          placeholder="10:00 AM"
                          className="w-full pl-11 p-3.5 rounded-xl bg-black/30 border border-emerald-500/20 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 outline-none transition-all text-emerald-50 placeholder:text-emerald-500/40 font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-emerald-200 ml-1">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-3.5 w-5 h-5 text-emerald-400" />
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Add a location..."
                        className="w-full pl-11 p-3.5 rounded-xl bg-black/30 border border-emerald-500/20 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 outline-none transition-all text-emerald-50 placeholder:text-emerald-500/40 font-medium"
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-emerald-200 ml-1">Category</label>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                            selectedCategory === cat.id
                              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                              : 'bg-white/5 text-emerald-400/60 hover:bg-white/10 hover:text-emerald-200 border border-white/5'
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Members */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-emerald-200 ml-1">Family Members</label>
                    <div className="flex gap-3">
                      {FAMILY_MEMBERS.map((member) => {
                        const isSelected = selectedMembers.includes(member.id);
                        return (
                          <button
                            key={member.id}
                            type="button"
                            onClick={() => toggleMember(member.id)}
                            className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                              isSelected 
                                ? 'ring-2 ring-offset-2 ring-emerald-500 scale-110 shadow-md' 
                                : 'opacity-70 hover:opacity-100 hover:scale-105'
                            } ${member.color}`}
                          >
                            <span className="text-white font-bold text-lg">{member.label}</span>
                            {isSelected && (
                              <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-emerald-950 flex items-center justify-center">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* Footer */}
                <div className="p-6 pt-2 bg-black/20 border-t border-emerald-500/20 flex gap-4">
                  <button
                    onClick={onClose}
                    className="flex-1 py-3.5 rounded-xl font-bold text-emerald-200 bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 py-3.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
                  >
                    Add Event
                  </button>
                </div>

              </GlassCard>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}