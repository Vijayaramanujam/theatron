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
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#141414] rounded-2xl border border-[#1f1f1f] shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className={`p-8 relative overflow-hidden flex flex-col items-center justify-center text-center border-b border-[#1f1f1f] bg-gradient-to-br ${event.gradient || 'from-neutral-800 to-neutral-900'}`}>
            <span className="text-7xl mb-4">{event.icon || '🎟️'}</span>
            
            <div className="flex items-center gap-3 mb-4">
              <span className="text-red-500 font-bold text-xs uppercase tracking-wider">
                {event.category}
              </span>
              {event.mode && (
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  event.mode.toUpperCase() === 'ONLINE' 
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                    : 'bg-green-500/20 text-green-400 border border-green-500/30'
                }`}>
                  {event.mode.toUpperCase()}
                </span>
              )}
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{event.name}</h2>
            <div className="w-16 h-1 bg-red-600 rounded-full" />
          </div>

          <div className="p-6 sm:p-8 flex-grow">
            <div className="prose prose-invert max-w-none">
              <p className="text-[#a1a1a1] text-base leading-relaxed mb-8 whitespace-pre-wrap">
                {event.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {event.mode && (
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-neutral-900 rounded-lg text-red-500">
                    {event.mode.toUpperCase() === 'ONLINE' ? <Monitor className="w-5 h-5" /> : <MapPin className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">Mode</h4>
                    <p className="text-neutral-400 text-sm">{event.mode}</p>
                  </div>
                </div>
              )}

              {event.registration?.teamBased && (
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-neutral-900 rounded-lg text-red-500">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">Team Event</h4>
                    <p className="text-neutral-400 text-sm">
                      {event.registration.teamSize?.fixed
                        ? `${event.registration.teamSize.fixed.join(', ')} participants`
                        : `${event.registration.teamSize?.min || 1} - ${event.registration.teamSize?.max || 10} participants`}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {event.id === 'debate' && (
              <div className="mb-8 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-orange-400 font-medium text-sm mb-1">Registration Note</h4>
                  <p className="text-orange-400/80 text-sm">Limited to 20 teams on a first-come, first-served basis.</p>
                </div>
              </div>
            )}

            {event.contacts && event.contacts.length > 0 && (
              <div className="mb-8 p-5 bg-neutral-900/50 rounded-xl border border-neutral-800">
                <h4 className="text-white font-medium text-sm mb-3 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-red-500" />
                  Contact Organizers
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {event.contacts.map((contact, i) => (
                    <div key={i} className="flex justify-between items-center text-sm">
                      <span className="text-neutral-300">{contact.name}</span>
                      <a href={`tel:${contact.phone}`} className="text-red-400 hover:text-red-300 font-medium">
                        {contact.phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-[#1f1f1f] bg-black/20 mt-auto">
            <button
              onClick={() => onRegister(event)}
              className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 group"
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
