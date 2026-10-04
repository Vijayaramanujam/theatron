import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SectionHeading from './components/SectionHeading';
import CategoryFilter from './components/CategoryFilter';
import EventGrid from './components/EventGrid';
import EventModal from './components/EventModal';
import { Registration } from './components/Registration';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { events as allEventsData } from './data/events';
import type { EventData } from './types/event';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [registerEvent, setRegisterEvent] = useState<EventData | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);

  const categories = ['ALL', 'COMPETITIONS', 'WORKSHOPS', 'ONLINE', 'OFFLINE'];

  const filteredEvents = allEventsData.filter((event) => {
    if (activeCategory === 'ALL') return true;
    if (activeCategory === 'COMPETITIONS') return event.category === 'competition';
    if (activeCategory === 'WORKSHOPS') return event.category === 'workshop';
    if (activeCategory === 'ONLINE') return event.mode === 'online';
    if (activeCategory === 'OFFLINE') return event.mode === 'offline';
    return true;
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

  const handleGlobalRegisterCTA = () => {
    // Default to first event if none selected
    setRegisterEvent(allEventsData[0]);
    setIsRegisterOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-['Space_Grotesk',sans-serif]">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Main Events & Discovery Section */}
      <section id="events" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="DISCOVER & PARTICIPATE"
          title="Events & Workshops"
          description="Explore our lineup of cinematic competitions and hands-on creative workshops."
        />

        <div className="mt-12 flex justify-center">
          <CategoryFilter
            categories={categories}
            active={activeCategory}
            onChange={setActiveCategory}
          />
        </div>

        <div className="mt-12">
          <EventGrid events={filteredEvents} onSelectEvent={handleSelectEvent} />
        </div>
      </section>

      {/* Dedicated Workshops Highlight Section if filtered directly or linked */}
      <section id="workshops" className="py-20 bg-[#101010] border-y border-[#1f1f1f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="HANDS-ON MASTERCLASSES"
            title="Creative Workshops"
            description="Learn directly from passionate student artists and master key creative disciplines."
          />

          <div className="mt-12">
            <EventGrid
              events={allEventsData.filter((e) => e.category === 'workshop')}
              onSelectEvent={handleSelectEvent}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <About />

      {/* Registration Anchor / CTA Section */}
      <section id="register" className="py-24 bg-[#0d0d0d] border-b border-[#1f1f1f] text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-red-500 font-bold text-xs uppercase tracking-widest">
            JOIN THE EXPERIENCE
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-6">
            Ready to Showcase Your Talent?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Select any competition or workshop to begin your registration. Unconditional creativity awaits.
          </p>
          <button
            onClick={handleGlobalRegisterCTA}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-10 py-4 rounded-xl shadow-lg shadow-red-600/30 transition-all transform hover:scale-105"
          >
            START REGISTRATION NOW
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />

      {/* Event Details Modal */}
      <EventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRegister={handleOpenRegister}
      />

      {/* Dynamic Multi-step Registration Modal */}
      <Registration
        event={registerEvent}
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </div>
  );
}
