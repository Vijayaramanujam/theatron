import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Monitor, Users, Phone, ArrowRight, AlertCircle, FileText, CheckCircle2, Sparkles } from 'lucide-react';
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
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 30 }}
          transition={{ type: 'spring', damping: 24, stiffness: 320 }}
          className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto no-scrollbar bg-[#080406] rounded-2xl border border-[#e11d48]/40 shadow-[0_0_50px_rgba(225,29,72,0.35)] flex flex-col z-10 my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2.5 text-white bg-black/80 hover:bg-[#e11d48] rounded-full transition-all z-30 border border-white/20 shadow-xl cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Photographic Banner */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-black shrink-0 border-b border-[#e11d48]/30">
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080406] via-black/30 to-black/60" />

            <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 z-10">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="text-white font-extrabold text-xs uppercase tracking-wider bg-[#e11d48] px-3.5 py-1 rounded-full shadow-md">
                  {event.category}
                </span>
                {event.mode && (
                  <span className={`text-[11px] font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md ${
                    event.mode.toUpperCase() === 'ONLINE'
                      ? 'bg-blue-950/90 text-blue-400 border border-blue-500/50'
                      : 'bg-emerald-950/90 text-emerald-400 border border-emerald-500/50'
                  }`}>
                    {event.mode}
                  </span>
                )}
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
                {event.name}
              </h2>
            </div>
          </div>

          {/* Modal Inner Body - SEPARATED SECTIONS WITH GENERATES MARGINS */}
          <div className="p-6 sm:p-8 space-y-6 flex-grow">
            
            {/* Section 1: Overview */}
            <div className="bg-[#110609] p-6 rounded-xl border border-[#e11d48]/30 space-y-3">
              <h4 className="text-red-500 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-red-500" />
                About This Event
              </h4>
              <p className="text-gray-200 text-sm sm:text-base leading-relaxed font-normal">
                {event.description}
              </p>
            </div>

            {/* Section 2: Format / Mode */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {event.mode && (
                <div className="flex items-start gap-3.5 p-5 bg-[#110609] border border-[#e11d48]/30 rounded-xl">
                  <div className="p-2.5 bg-red-600/20 rounded-lg text-red-400 shrink-0">
                    {event.mode.toUpperCase() === 'ONLINE' ? <Monitor className="w-5 h-5" /> : <MapPin className="w-5 h-5" />}
                  </div>
                  <div>
                    <h5 className="text-white font-bold text-xs uppercase tracking-wider">Format / Mode</h5>
                    <p className="text-gray-300 text-sm capitalize mt-0.5">{event.mode} Competition</p>
                  </div>
                </div>
              )}

              {event.registration?.teamBased && (
                <div className="flex items-start gap-3.5 p-5 bg-[#110609] border border-[#e11d48]/30 rounded-xl">
                  <div className="p-2.5 bg-red-600/20 rounded-lg text-red-400 shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-white font-bold text-xs uppercase tracking-wider">Team Requirement</h5>
                    <p className="text-gray-300 text-sm mt-0.5">
                      {event.registration.teamSize?.fixed
                        ? `${event.registration.teamSize.fixed.join(', ')} participants per team`
                        : `${event.registration.teamSize?.min || 1} to ${event.registration.teamSize?.max || 10} participants per team`}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Section 3: Rules & Guidelines */}
            <div className="bg-[#110609] p-6 rounded-xl border border-[#e11d48]/30 space-y-3">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-red-500" />
                Event Guidelines &amp; Rules
              </h4>
              <ul className="space-y-2.5 text-sm text-gray-300">
                {guidelines.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                    <span className="leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 4: Debate Cap Notice if applicable */}
            {event.id === 'debate' && (
              <div className="p-5 bg-amber-950/40 border border-amber-500/40 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-amber-400 font-bold text-xs uppercase tracking-wider">Limited Team Cap</h5>
                  <p className="text-amber-200/90 text-xs mt-0.5 leading-relaxed">
                    Participation is capped strictly at 20 teams. Early registration is strongly advised.
                  </p>
                </div>
              </div>
            )}

            {/* Section 5: METALLIC RED EVENT COORDINATORS */}
            {event.contacts && event.contacts.length > 0 && (
              <div className="p-6 bg-gradient-to-br from-[#24080e] via-[#160408] to-[#0c0204] rounded-xl border border-[#e11d48]/50 shadow-lg space-y-4">
                <h4 className="text-red-400 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                  <Phone className="w-4 h-4 text-red-500" />
                  Event Coordinators &amp; Contact
                </h4>

                <div className="space-y-3">
                  {event.contacts.map((contact, i) => (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-black/60 border border-red-500/20 rounded-lg gap-2"
                    >
                      <span className="text-white font-bold text-sm">{contact.name}</span>
                      <a
                        href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                        className="text-red-400 font-extrabold text-sm hover:text-red-300 hover:underline flex items-center gap-1.5 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        {contact.phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 6: METALLIC RED REGISTER BUTTON */}
            <div className="pt-2">
              <button
                onClick={() => onRegister(event)}
                className="btn-metallic w-full py-4 text-white font-bold text-sm uppercase tracking-widest rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-white/80" />
                REGISTER NOW
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EventModal;
