import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Monitor, Users, Phone, FileText, CheckCircle2 } from 'lucide-react';
import type { EventData } from '../types/event';

interface Props {
  event: EventData | null;
  isOpen: boolean;
  onClose: () => void;
  onRegister: (event: EventData) => void;
}

export const EventModal: React.FC<Props> = ({ event, isOpen, onClose, onRegister }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen || !event) return null;

  const getEventGuidelines = (evt: EventData) => {
    switch (evt.id) {
      case 'quiz-corn':
        return [
          'Explores diverse aspects of cinema including films, actors, directors, music, and trivia.',
          'Open to all film enthusiasts and cinephiles.',
          'Offline competition conducted live at campus venue.'
        ];
      case 'stills-of-soul':
        return [
          'Participants must submit their best original photographs online via Google Drive link.',
          'Ensure shareable Google Drive link has public viewing access enabled.',
          'Top 10 shortlisted teams will be selected for the next round at college.'
        ];
      case 'graphics-grid':
        return [
          'Poster design submission must be uploaded online.',
          'Accepted formats: JPG, JPEG, PNG, or PDF.',
          'Top 10 shortlisted teams will be selected for the final round at college.'
        ];
      case 'cineplus':
        return [
          'Submit original short film submission link online.',
          'Maximum video duration: 3 minutes strictly.',
          'Ensure submitted video is accessible, playable, and unlocked.',
          'Top 3 teams will be selected and awarded at CIT.'
        ];
      case 'stage-play':
        return [
          'Team size: 1 to 10 participants maximum.',
          'Brings stories to life through creative scripts, impactful acting, and dynamic stage performance.',
          'All participant names & phone numbers must be submitted during registration.'
        ];
      case 'adaptune':
        return [
          'Adapt moves to randomly changing songs on the spot.',
          'Showcase spontaneity, versatility, rhythm, and passion.',
          'Individual dance competition conducted live on stage.'
        ];
      case 'brainstorm':
        return [
          'Each participant is assigned a unique logline on the spot.',
          'Develop the logline into a structured screenplay within the time limit.',
          'Evaluated on screenplay structure, character depth, and narrative flow.'
        ];
      case 'debate':
        return [
          'Team size options: 2, 3, or 4 participants.',
          'Topics revealed on the spot testing knowledge, spontaneity, and communication.',
          'STRICTLY LIMITED TO 20 TEAMS on a first-come, first-served basis.'
        ];
      default:
        return [
          'Hands-on creative workshop exploring core artistic techniques.',
          'Interactive session with live demonstrations and guidance.',
          'Open to all registered festival participants.'
        ];
    }
  };

  const guidelines = getEventGuidelines(event);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto font-sans">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Center Pop-Up Modal Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto no-scrollbar bg-black rounded-lg border border-gray-700 shadow-2xl flex flex-col z-10 my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white bg-black/80 hover:bg-red-600 rounded-full transition z-30 border border-gray-700 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Photographic Banner */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-900 shrink-0 border-b border-gray-800">
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 z-10">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="text-white font-bold text-xs uppercase tracking-wider bg-red-600 px-3 py-1 rounded">
                  {event.category}
                </span>
                {event.mode && (
                  <span className="text-xs font-bold px-3 py-1 rounded uppercase tracking-wider bg-gray-800 text-gray-200 border border-gray-700">
                    {event.mode}
                  </span>
                )}
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {event.name}
              </h2>
            </div>
          </div>

          {/* Modal Inner Body - Crisp, Clean Alignment */}
          <div className="p-6 sm:p-8 space-y-6 flex-grow bg-black">
            
            {/* Overview */}
            <div className="space-y-2">
              <h4 className="text-red-600 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4" />
                About This Event
              </h4>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-normal">
                {event.description}
              </p>
            </div>

            <div className="h-px bg-red-600 w-full" />

            {/* Format */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {event.mode && (
                <div className="flex items-start gap-3 p-4 bg-gray-900/50 border border-gray-800 rounded">
                  <div className="p-2 bg-red-600/20 rounded text-red-500 shrink-0">
                    {event.mode.toUpperCase() === 'ONLINE' ? <Monitor className="w-5 h-5" /> : <MapPin className="w-5 h-5" />}
                  </div>
                  <div>
                    <h5 className="text-white font-bold text-xs uppercase tracking-wider">Format</h5>
                    <p className="text-gray-400 text-sm capitalize mt-0.5">{event.mode} Competition</p>
                  </div>
                </div>
              )}

              {event.registration?.teamBased && (
                <div className="flex items-start gap-3 p-4 bg-gray-900/50 border border-gray-800 rounded">
                  <div className="p-2 bg-red-600/20 rounded text-red-500 shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-white font-bold text-xs uppercase tracking-wider">Team Requirement</h5>
                    <p className="text-gray-400 text-sm mt-0.5">
                      {event.registration.teamSize?.fixed
                        ? `${event.registration.teamSize.fixed.join(', ')} participants`
                        : `${event.registration.teamSize?.min || 1} - ${event.registration.teamSize?.max || 10} participants`}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Rules */}
            <div className="space-y-2 p-4 bg-gray-900/50 border border-gray-800 rounded">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-red-600" />
                Guidelines &amp; Rules
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {guidelines.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 shrink-0" />
                    <span className="leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacts */}
            {event.contacts && event.contacts.length > 0 && (
              <div className="p-4 bg-gray-900/50 border border-gray-800 rounded space-y-3">
                <h4 className="text-red-600 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Event Coordinators
                </h4>

                <div className="space-y-2">
                  {event.contacts.map((contact, i) => (
                    <div key={i} className="flex justify-between items-center text-sm">
                      <span className="text-gray-300 font-medium">{contact.name}</span>
                      <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="text-red-500 font-bold hover:underline">
                        {contact.phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Register CTA */}
            <div className="pt-2">
              <button
                onClick={() => onRegister(event)}
                className="bg-red-600 hover:bg-red-700 w-full py-3.5 text-white font-bold text-sm uppercase tracking-wider transition rounded"
              >
                REGISTER NOW →
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EventModal;
