import { useState } from 'react';
import Navbar from './components/Navbar';
import SectionHeading from './components/SectionHeading';
import CategoryFilter from './components/CategoryFilter';
import EventGrid from './components/EventGrid';
import EventModal from './components/EventModal';
import { Registration } from './components/Registration';
import Footer from './components/Footer';
import { events as allEventsData } from './data/events';
import type { EventData } from './types/event';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<'Competitions' | 'Workshops'>('Competitions');
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [registerEvent, setRegisterEvent] = useState<EventData | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);

  // Filter events dynamically based on Category Selector: Competitions vs Workshops
  const filteredEvents = allEventsData.filter((event) => {
    if (activeCategory === 'Competitions') {
      return event.category === 'competition';
    } else {
      return event.category === 'workshop';
    }
  });

  const handleSelectEvent = (event: EventData) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleOpenRegister = (event: EventData) => {
    setIsModalOpen(false);
    setRegisterEvent(event);
    setIsRegisterOpen(true);
  };

  return (
    <main className="relative bg-gradient-to-br from-black via-zinc-900 to-black text-white min-h-screen overflow-hidden font-['Space_Grotesk',sans-serif]">
      {/* Background Radial Glow Overlays matching reference */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.25),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_70%)] pointer-events-none" />

      {/* Navigation */}
      <Navbar />

      {/* EVENTS DISCOVERY SECTION - THE ENTIRE PAGE FOCUS */}
      <section id="events" className="relative z-10 pt-28 sm:pt-32 pb-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header & Subtitle */}
          <SectionHeading />

          {/* Category Selector: Competitions vs Workshops */}
          <CategoryFilter
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Responsive Event Grid */}
          <EventGrid
            events={filteredEvents}
            onSelectEvent={handleSelectEvent}
          />
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Event Details Modal */}
      <EventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRegister={handleOpenRegister}
      />

      {/* Dynamic Multi-Step Event Registration Modal */}
      <Registration
        event={registerEvent}
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </main>
  );
}
