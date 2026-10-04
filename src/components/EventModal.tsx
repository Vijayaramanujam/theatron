import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Monitor, Users, Phone, ArrowRight, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
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

  // Elaborate PDF Guidelines based on event type
  const getEventGuidelines = (evt: EventData) => {
    switch (evt.id) {
      case 'quiz-corn':
        return [
          'Covers diverse aspects of cinema including films, actors, directors, music, and trivia.',
          'Open to all film enthusiasts and cinephiles.',
          'Offline competition conducted live at campus venue.'
        ];
      case 'stills-of-soul':
        return [
          'Participants must submit their best original photographs online via Google Drive link.',
          'Ensure shareable Google Drive link has public viewing access enabled.',
          'Top 10 shortlisted teams will be selected for the next round at the college.'
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
          'Ensure the submitted video is accessible, playable, and unlocked.',
          'Top 3 teams will be selected and awarded at CIT.'
        ];
      case 'stage-play':
        return [
          'Team size: 1 to 10 participants maximum.',
          'Brings stories to life through creative scripts, impactful acting, expressive dialogues, and dynamic stage performances.',
          'All team participant names & phone numbers must be submitted during registration.'
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
        {/* Dark Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Pop-up Modal Container with Spacious Padding & Metallic Red Borders */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 40 }}
          transition={{ type: 'spring', damping: 24, stiffness: 280 }}
          className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto bg-[#0a0305] rounded-2xl border border-[#e11d48]/50 shadow-[0_0_50px_rgba(225,29,72,0.4)] flex flex-col font-['Space_Grotesk',sans-serif]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 text-white bg-black/80 hover:bg-[#e11d48] rounded-full transition-all z-30 border border-[#e11d48]/50 shadow-xl cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Photographic Header Banner */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-black flex items-center justify-center border-b border-[#e11d48]/40 shrink-0">
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0305] via-black/40 to-black/60" />

            <div className="absolute bottom-6 left-6 right-6 z-10">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="text-white font-extrabold text-xs uppercase tracking-widest bg-[#e11d48] px-3 py-1 rounded-full shadow-md font-['Syne',sans-serif]">
                  {event.category}
                </span>
                {event.mode && (
                  <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm ${
                    event.mode.toUpperCase() === 'ONLINE'
                      ? 'bg-blue-950/90 text-blue-400 border border-blue-500/50'
                      : 'bg-emerald-950/90 text-emerald-400 border border-emerald-500/50'
                  }`}>
                    {event.mode}
                  </span>
                )}
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-['Syne',sans-serif] drop-shadow-md">
                {event.name}
              </h2>
            </div>
          </div>

          {/* Modal Content Body with Spacious Vertical Gaps */}
          <div className="p-6 sm:p-8 md:p-10 space-y-8 flex-grow">
            
            {/* Elaborate Description Section */}
            <div className="space-y-3">
              <h4 className="text-[#f43f5e] font-extrabold text-xs uppercase tracking-widest flex items-center gap-2 font-['Syne',sans-serif]">
                <FileText className="w-4 h-4 text-[#e11d48]" />
                Event Description &amp; Overview
              </h4>
              <p className="text-gray-200 text-base sm:text-lg leading-relaxed font-normal">
                {event.description}
              </p>
            </div>

            {/* Event Format Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {event.mode && (
                <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-[#16070a] to-[#0a0305] border border-[#e11d48]/40 rounded-xl">
                  <div className="p-2.5 bg-[#e11d48]/20 rounded-lg text-[#f43f5e] shrink-0">
                    {event.mode.toUpperCase() === 'ONLINE' ? <Monitor className="w-5 h-5" /> : <MapPin className="w-5 h-5" />}
                  </div>
                  <div>
                    <h5 className="text-white font-bold text-xs uppercase tracking-wider font-['Syne',sans-serif]">Format / Mode</h5>
                    <p className="text-gray-300 text-sm capitalize mt-0.5">{event.mode} Competition</p>
                  </div>
                </div>
              )}

              {event.registration?.teamBased && (
                <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-[#16070a] to-[#0a0305] border border-[#e11d48]/40 rounded-xl">
                  <div className="p-2.5 bg-[#e11d48]/20 rounded-lg text-[#f43f5e] shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-white font-bold text-xs uppercase tracking-wider font-['Syne',sans-serif]">Team Requirement</h5>
                    <p className="text-gray-300 text-sm mt-0.5">
                      {event.registration.teamSize?.fixed
                        ? `${event.registration.teamSize.fixed.join(', ')} participants per team`
                        : `${event.registration.teamSize?.min || 1} to ${event.registration.teamSize?.max || 10} participants per team`}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Elaborate Guidelines & Submission Requirements */}
            <div className="space-y-3 p-5 bg-gradient-to-br from-[#1a080c] to-[#0d0406] border border-[#e11d48]/30 rounded-xl">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider font-['Syne',sans-serif] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#e11d48]" />
                Event Rules &amp; Guidelines
              </h4>
              <ul className="space-y-2.5 text-sm text-gray-300">
                {guidelines.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e11d48] mt-2 shrink-0" />
                    <span className="leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Debate Alert if applicable */}
            {event.id === 'debate' && (
              <div className="p-4 bg-amber-950/50 border border-amber-500/50 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-amber-400 font-bold text-xs uppercase tracking-wider font-['Syne',sans-serif]">Limited Team Cap</h5>
                  <p className="text-amber-200/90 text-xs mt-1 leading-relaxed">
                    Participation is capped strictly at 20 teams. Early registration is strongly advised.
                  </p>
                </div>
              </div>
            )}

            {/* METALLIC RED EVENT COORDINATORS & CONTACT SECTION */}
            {event.contacts && event.contacts.length > 0 && (
              <div className="p-6 bg-gradient-to-br from-[#24080e] via-[#170508] to-[#0d0305] rounded-xl border border-[#e11d48]/60 shadow-[0_0_20px_rgba(225,29,72,0.3)] space-y-4">
                <h4 className="text-[#f43f5e] font-extrabold text-xs uppercase tracking-widest flex items-center gap-2 font-['Syne',sans-serif]">
                  <Phone className="w-4 h-4 text-[#e11d48]" />
                  Event Coordinators &amp; Contact
                </h4>
                
                <div className="space-y-3">
                  {event.contacts.map((contact, i) => (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-black/40 border border-[#e11d48]/20 rounded-lg gap-2"
                    >
                      <span className="text-white font-bold text-sm tracking-wide">{contact.name}</span>
                      <a
                        href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                        className="text-[#f43f5e] font-extrabold text-sm hover:text-[#fda4af] hover:underline flex items-center gap-1.5 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        {contact.phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* METALLIC RED REGISTER BUTTON FOOTER */}
          <div className="p-6 sm:p-8 border-t border-[#e11d48]/40 bg-[#080203] rounded-b-2xl shrink-0">
            <button
              onClick={() => onRegister(event)}
              className="w-full py-4 text-white font-black text-sm uppercase tracking-widest rounded-xl transition-all shadow-[0_0_30px_rgba(225,29,72,0.5)] flex items-center justify-center gap-2 bg-gradient-to-r from-[#e11d48] via-[#be123c] to-[#800020] hover:from-[#f43f5e] hover:to-[#e11d48] transform hover:scale-[1.02] cursor-pointer"
            >
              REGISTER NOW
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EventModal;
