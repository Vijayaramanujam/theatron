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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] rounded-sm border border-[#222] shadow-2xl flex flex-col font-['Space_Grotesk',sans-serif]"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white bg-black/60 hover:bg-red-600 rounded-full transition-colors z-20 border border-white/10"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header Image */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-black flex items-center justify-center border-b border-[#222]">
            {event.image ? (
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${event.gradient || 'from-neutral-900 to-black'} flex items-center justify-center`}>
                <span className="text-4xl font-extrabold text-white">{event.name}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/40" />

            <div className="absolute bottom-6 left-6 right-6 z-10">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[#dc2626] font-extrabold text-xs uppercase tracking-widest bg-black/80 px-2.5 py-1 rounded-sm border border-[#333]">
                  {event.category}
                </span>
                {event.mode && (
                  <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-sm uppercase tracking-wider ${
                    event.mode.toUpperCase() === 'ONLINE'
                      ? 'bg-blue-950/80 text-blue-400 border border-blue-500/40'
                      : 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40'
                  }`}>
                    {event.mode}
                  </span>
                )}
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{event.name}</h2>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-8 flex-grow space-y-6">
            <p className="text-gray-300 text-base leading-relaxed whitespace-pre-wrap font-normal">
              {event.description}
            </p>

            {/* Red accent line */}
            <div className="w-full h-[1px] bg-[#dc2626]/80 my-4" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {event.mode && (
                <div className="flex items-start gap-3 p-4 bg-[#111] border border-[#222] rounded-sm">
                  <div className="p-2 bg-[#1f1f1f] rounded-sm text-[#dc2626]">
                    {event.mode.toUpperCase() === 'ONLINE' ? <Monitor className="w-5 h-5" /> : <MapPin className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xs uppercase tracking-wider">Format</h4>
                    <p className="text-gray-400 text-sm capitalize">{event.mode} Competition</p>
                  </div>
                </div>
              )}

              {event.registration?.teamBased && (
                <div className="flex items-start gap-3 p-4 bg-[#111] border border-[#222] rounded-sm">
                  <div className="p-2 bg-[#1f1f1f] rounded-sm text-[#dc2626]">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xs uppercase tracking-wider">Team Structure</h4>
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
              <div className="p-4 bg-amber-950/30 border border-amber-500/40 rounded-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-amber-400 font-bold text-xs uppercase tracking-wider">Limited Availability</h4>
                  <p className="text-amber-300/80 text-xs mt-0.5">Registration is strictly limited to 20 teams on a first-come, first-served basis.</p>
                </div>
              </div>
            )}

            {event.contacts && event.contacts.length > 0 && (
              <div className="p-5 bg-[#111] rounded-sm border border-[#222]">
                <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#dc2626]" />
                  Event Coordinators
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {event.contacts.map((contact, i) => (
                    <div key={i} className="flex justify-between items-center text-sm">
                      <span className="text-gray-300 font-medium">{contact.name}</span>
                      <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="text-red-500 hover:underline font-bold text-xs">
                        {contact.phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-[#222] bg-[#050505]">
            <button
              onClick={() => onRegister(event)}
              className="w-full py-4 bg-[#dc2626] hover:bg-[#ef4444] text-white font-black text-sm uppercase tracking-widest rounded-sm transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 group"
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
