import React from 'react';
import { motion } from 'framer-motion';
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
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -10, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onSelect(event)}
      className="group cursor-pointer metallic-card rounded-md overflow-hidden flex flex-col justify-between h-full transform transition-all duration-300"
    >
      {/* Real Photography Header */}
      <div className="relative h-56 sm:h-60 md:h-64 overflow-hidden bg-black">
        <img
          alt={event.name}
          src={event.image}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        {/* Metallic Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a0c] via-transparent to-black/40 opacity-80" />

        {/* Category Pill Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="text-[10px] font-extrabold uppercase tracking-widest bg-black/80 text-[#f43f5e] border border-[#e11d48]/40 px-3 py-1 rounded-full shadow-md backdrop-blur-sm">
            {event.category}
          </span>
        </div>

        {/* Online / Offline Mode Badge */}
        {event.mode && (
          <div className="absolute top-3 right-3 z-10">
            <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm ${
              event.mode.toUpperCase() === 'ONLINE'
                ? 'bg-blue-950/80 text-blue-400 border border-blue-500/50'
                : 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/50'
            }`}>
              {event.mode}
            </span>
          </div>
        )}
      </div>

      {/* Metallic Content Area */}
      <div className="p-5 sm:p-6 bg-[#0f0a0c] flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-white mb-2 font-['Syne',sans-serif] tracking-tight group-hover:text-red-400 transition-colors">
            {event.name}
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm mb-4 leading-relaxed line-clamp-3 font-normal font-['Space_Grotesk',sans-serif]">
            {event.description}
          </p>
        </div>

        <div>
          {/* Metallic Red Line Divider */}
          <div className="h-[2px] bg-gradient-to-r from-[#e11d48] via-[#be123c] to-transparent mb-4" />

          {/* Bottom Action Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            <div>
              <p className="text-[10px] text-gray-500 mb-0.5 font-bold uppercase tracking-widest">
                {event.mode ? 'FORMAT' : 'CATEGORY'}
              </p>
              <p className="text-[#f43f5e] font-extrabold text-xs sm:text-sm uppercase tracking-wider">
                {event.mode || event.category}
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(event);
              }}
              className="btn-metallic px-5 py-2.5 text-white font-extrabold text-xs tracking-widest uppercase rounded-sm w-full sm:w-auto flex items-center justify-center gap-1.5"
            >
              REGISTER →
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
