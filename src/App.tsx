import React, { useState, useMemo } from 'react';
import { SidebarFilters, FilterState } from './components/SidebarFilters';
import { EventList, Event } from './components/EventList';
import { SearchHeader } from './components/SearchHeader';
import { AddEventModal } from './components/AddEventModal';
import { EventDetailsModal } from './components/EventDetailsModal';
import { Plus, ArrowDownUp } from 'lucide-react';

// Mock Data
const INITIAL_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Soccer Practice',
    time: '4:00 PM - 5:30 PM',
    date: 'Today',
    location: 'City Fields, Pitch 3',
    members: ['tommy', 'dad'],
    category: 'sports',
    color: 'bg-emerald-500'
  },
  {
    id: '2',
    title: 'Piano Lesson',
    time: '5:00 PM - 6:00 PM',
    date: 'Today',
    location: 'Music Academy',
    members: ['sarah', 'mom'],
    category: 'music',
    color: 'bg-teal-500'
  },
  {
    id: '3',
    title: 'Family Dinner',
    time: '7:30 PM - 9:00 PM',
    date: 'Today',
    location: 'Home',
    members: ['mom', 'dad', 'sarah', 'tommy'],
    category: 'home',
    color: 'bg-green-600'
  },
  {
    id: '4',
    title: 'Grocery Shopping',
    time: '10:00 AM - 11:30 AM',
    date: 'Tomorrow',
    location: 'Whole Foods',
    members: ['dad'],
    category: 'home',
    color: 'bg-green-500'
  },
  {
    id: '5',
    title: 'Math Tutoring',
    time: '3:30 PM - 4:30 PM',
    date: 'Tomorrow',
    location: 'Library',
    members: ['sarah'],
    category: 'school',
    color: 'bg-lime-500'
  },
  {
    id: '6',
    title: 'Client Meeting',
    time: '1:00 PM - 2:00 PM',
    date: 'Tomorrow',
    location: 'Zoom',
    members: ['mom'],
    category: 'work',
    color: 'bg-slate-400'
  }
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filters, setFilters] = useState<FilterState>({
    members: [],
    categories: []
  });

  const handleAddEvent = (newEvent: Omit<Event, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setEvents(prev => [
      { ...newEvent, id },
      ...prev
    ]);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  // Filter Logic
  const filteredEvents = useMemo(() => {
    let result = events.filter(event => {
      // Search Query
      const matchesSearch = 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (!matchesSearch) return false;

      // Member Filter
      if (filters.members.length > 0) {
        const hasMember = event.members.some(m => filters.members.includes(m));
        if (!hasMember) return false;
      }

      // Category Filter
      if (filters.categories.length > 0) {
        if (!filters.categories.includes(event.category)) return false;
      }

      return true;
    });

    // Sorting (Simplified date sorting based on Today/Tomorrow strings for demo)
    // In a real app, use real Date objects.
    result.sort((a, b) => {
      const dateValue = (d: string) => {
        if (d.toLowerCase() === 'today') return 0;
        if (d.toLowerCase() === 'tomorrow') return 1;
        return 2; // Future dates
      };

      const diff = dateValue(a.date) - dateValue(b.date);
      return sortOrder === 'asc' ? diff : -diff;
    });

    return result;
  }, [searchQuery, filters, events, sortOrder]);

  return (
    <div className="min-h-screen w-full bg-[#051f15] relative selection:bg-emerald-900 selection:text-emerald-200 font-sans">
      {/* Mesh Gradient Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-900/30 blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-teal-900/30 blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[20%] right-[20%] w-[40%] h-[40%] rounded-full bg-lime-900/20 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-3 xl:col-span-3 space-y-6">
             <div className="lg:sticky lg:top-8">
               <SidebarFilters filters={filters} setFilters={setFilters} />
             </div>
          </aside>

          {/* Results Area */}
          <main className="lg:col-span-9 xl:col-span-9">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-emerald-100">
                {searchQuery ? `Results for "${searchQuery}"` : 'Upcoming Events'}
                <span className="ml-2 text-sm font-medium text-emerald-300 bg-emerald-900/50 px-2.5 py-1 rounded-full shadow-sm">
                  {filteredEvents.length}
                </span>
              </h2>
              
              <div className="flex gap-2">
                <button 
                  onClick={toggleSortOrder}
                  className="px-4 py-2 bg-emerald-900/40 hover:bg-emerald-800/40 rounded-xl text-emerald-100 transition-colors font-medium text-sm shadow-sm flex items-center gap-2 border border-emerald-500/20"
                >
                   <ArrowDownUp className="w-4 h-4" />
                   Sort by Date {sortOrder === 'asc' ? '(Earliest)' : '(Latest)'}
                </button>
              </div>
            </div>

            <EventList 
              events={filteredEvents} 
              onDelete={handleDeleteEvent}
              onViewDetails={setSelectedEvent}
            />
          </main>
        </div>
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={() => setIsAddModalOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg shadow-emerald-600/30 flex items-center justify-center transition-all hover:scale-105 hover:rotate-90 z-50 focus:ring-4 focus:ring-emerald-300"
      >
        <Plus className="w-8 h-8" />
      </button>

      {/* Add Event Modal */}
      <AddEventModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddEvent}
      />

      {/* View Details Modal */}
      <EventDetailsModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
}
