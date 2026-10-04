import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import ThreeBackground from './components/ThreeBackground';
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

  const containerRef = useRef<HTMLDivElement>(null);

  // Filter events dynamically based on Category Selector: Competitions vs Workshops
  const filteredEvents = allEventsData.filter((event) => {
    if (activeCategory === 'Competitions') {
      return event.category === 'competition';
    } else {
      return event.category === 'workshop';
    }
  });

  // GSAP Animations on load & category change
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out'
        }
      );
    }
  }, [activeCategory]);

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
    <main className="relative bg-gradient-to-br from-black via-[#0d0407] to-black text-white min-h-screen overflow-hidden font-['Space_Grotesk',sans-serif]">
      {/* Three.js Interactive 3D Metallic Red Particle Canvas */}
      <ThreeBackground />

      {/* Radial Metallic Red Glow Overlays */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(225,29,72,0.25),transparent_60%)] pointer-events-none z-0" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(128,0,32,0.3),transparent_70%)] pointer-events-none z-0" />

      {/* Navigation */}
      <Navbar />

      {/* EVENTS DISCOVERY SECTION - THE ENTIRE PAGE FOCUS */}
      <section id="events" className="relative z-10 pt-44 sm:pt-48 md:pt-52 pb-32 px-6 sm:px-8 md:px-12">
        <div className="max-w-7xl mx-auto space-y-16 md:space-y-20">
          {/* Header & Subtitle */}
          <SectionHeading />

          {/* Category Selector: Competitions vs Workshops */}
          <CategoryFilter
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* GSAP Animated Responsive Event Grid */}
          <div ref={containerRef}>
            <EventGrid
              events={filteredEvents}
              onSelectEvent={handleSelectEvent}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Event Details Pop-up Modal with Spacing & Metallic Red Styling */}
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
