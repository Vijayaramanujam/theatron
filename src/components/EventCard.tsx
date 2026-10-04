import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { EventData } from '../types/event';

interface Props {
  event: EventData;
  index: number;
  onSelect: (event: EventData) => void;
}

const EventCard: React.FC<Props> = ({ event, index, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      onClick={() => onSelect(event)}
      className="bg-[#050505] rounded-sm overflow-hidden border border-[#1f1f1f] hover:border-[#dc2626]/70 transition-all duration-300 cursor-pointer flex flex-col justify-between h-full group shadow-xl"
    >
      {/* Visual Image Header */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black flex items-center justify-center">
        {event.image ? (
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${event.gradient || 'from-neutral-900 to-black'} flex items-center justify-center`}>
            <span className="text-3xl font-extrabold text-white/40 uppercase tracking-widest">{event.name}</span>
          </div>
        )}

        {/* Overlay subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/30 opacity-60" />

        {/* Category Pill Top Left */}
        <div className="absolute top-3 left-3 z-10">
          <span className="text-[10px] font-bold uppercase tracking-widest bg-black/80 border border-[#2a2a2a] text-[#dc2626] px-2.5 py-1 rounded-sm">
            {event.category}
          </span>
        </div>

        {/* Mode Badge Top Right */}
        {event.mode && (
          <div className="absolute top-3 right-3 z-10">
            <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-sm uppercase tracking-wider ${
              event.mode.toUpperCase() === 'ONLINE'
                ? 'bg-blue-950/80 text-blue-400 border border-blue-500/40'
                : 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40'
            }`}>
              {event.mode}
            </span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-1 justify-between bg-[#050505]">
        <div>
          <h3 className="text-2xl font-bold text-white mb-3 font-['Space_Grotesk',sans-serif] tracking-tight group-hover:text-red-500 transition-colors">
            {event.name}
          </h3>
          <p className="text-sm text-[#a1a1a1] leading-relaxed font-normal line-clamp-3 mb-6 font-['Space_Grotesk',sans-serif]">
            {event.description}
          </p>
        </div>

        <div>
          {/* Solid Thin Red Divider Line matching Reference */}
          <div className="w-full h-[1px] bg-[#dc2626]/80 mb-5" />

          {/* Card Footer Action Row matching Reference */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">STATUS</span>
              <span className="text-xs font-semibold text-gray-300 uppercase">{event.mode || event.category}</span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(event);
              }}
              className="bg-[#dc2626] hover:bg-[#ef4444] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-sm shadow-md transition-all flex items-center gap-1.5 group-hover:shadow-red-600/40"
            >
              REGISTER
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
