import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Monitor, Users, Phone, ArrowRight, AlertCircle } from 'lucide-react';
import type { EventData } from '../types/event';

interface Props {
  event: EventData | null;
  isOpen: boolean;
  onClose: () => void;
  onRegister: (event: EventData) => void;
}

const EventModal: React.FC<Props> = ({ event, isOpen, onClose, onRegister }) => {
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

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Pop-up Modal Container */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 40 }}
          transition={{ type: 'spring', damping: 22, stiffness: 280 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0d0709] rounded-xl border border-[#e11d48]/40 shadow-[0_0_50px_rgba(225,29,72,0.3)] flex flex-col font-['Space_Grotesk',sans-serif]"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 text-white bg-black/70 hover:bg-[#e11d48] rounded-full transition-all z-20 border border-[#e11d48]/40 shadow-lg"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Photographic Header */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-black flex items-center justify-center border-b border-[#e11d48]/30">
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0709] via-black/40 to-black/60" />

            <div className="absolute bottom-6 left-6 right-6 z-10">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-white font-extrabold text-xs uppercase tracking-widest bg-[#e11d48] px-3 py-1 rounded-full shadow-lg">
                  {event.category}
                </span>
                {event.mode && (
                  <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
                    event.mode.toUpperCase() === 'ONLINE'
                      ? 'bg-blue-950/80 text-blue-400 border border-blue-500/50'
                      : 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/50'
                  }`}>
                    {event.mode}
                  </span>
                )}
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-['Syne',sans-serif]">{event.name}</h2>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-8 flex-grow space-y-6">
            <p className="text-gray-300 text-base leading-relaxed whitespace-pre-wrap font-normal">
              {event.description}
            </p>

            {/* Metallic Red Line */}
            <div className="h-[2px] bg-gradient-to-r from-[#e11d48] via-[#be123c] to-transparent my-4" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {event.mode && (
                <div className="flex items-start gap-3 p-4 bg-[#140a0c] border border-[#e11d48]/30 rounded-lg">
                  <div className="p-2.5 bg-[#e11d48]/20 rounded-md text-[#f43f5e]">
                    {event.mode.toUpperCase() === 'ONLINE' ? <Monitor className="w-5 h-5" /> : <MapPin className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xs uppercase tracking-wider font-['Syne',sans-serif]">Format</h4>
                    <p className="text-gray-400 text-sm capitalize">{event.mode} Competition</p>
                  </div>
                </div>
              )}

              {event.registration?.teamBased && (
                <div className="flex items-start gap-3 p-4 bg-[#140a0c] border border-[#e11d48]/30 rounded-lg">
                  <div className="p-2.5 bg-[#e11d48]/20 rounded-md text-[#f43f5e]">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xs uppercase tracking-wider font-['Syne',sans-serif]">Team Structure</h4>
                    <p className="text-gray-400 text-sm">
                      {event.registration.teamSize?.fixed
                        ? `${event.registration.teamSize.fixed.join(', ')} participants`
                        : `${event.registration.teamSize?.min || 1} - ${event.registration.teamSize?.max || 10} participants`}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {event.id === 'debate' && (
              <div className="p-4 bg-amber-950/40 border border-amber-500/50 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-amber-400 font-bold text-xs uppercase tracking-wider font-['Syne',sans-serif]">Limited Availability</h4>
                  <p className="text-amber-300/80 text-xs mt-0.5">Registration is strictly limited to 20 teams on a first-come, first-served basis.</p>
                </div>
              </div>
            )}

            {event.contacts && event.contacts.length > 0 && (
              <div className="p-5 bg-[#140a0c] rounded-lg border border-[#e11d48]/30">
                <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-2 font-['Syne',sans-serif]">
                  <Phone className="w-4 h-4 text-[#f43f5e]" />
                  Event Coordinators
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {event.contacts.map((contact, i) => (
                    <div key={i} className="flex justify-between items-center text-sm">
                      <span className="text-gray-300 font-medium">{contact.name}</span>
                      <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="text-[#f43f5e] hover:underline font-bold text-xs">
                        {contact.phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-[#e11d48]/30 bg-[#070304]">
            <button
              onClick={() => onRegister(event)}
              className="btn-metallic w-full py-4 text-white font-black text-sm uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 group"
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
