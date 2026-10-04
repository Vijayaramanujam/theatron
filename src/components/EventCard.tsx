import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { EventData } from '../types/event';

interface Props {
  event: EventData;
  index: number;
  onSelect: (event: EventData) => void;
}

const EventCard: React.FC<Props> = ({ event, index, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(event)}
      className="bg-[#141414] rounded-lg overflow-hidden border border-[#1f1f1f] hover:border-red-600/50 transition-all duration-300 cursor-pointer flex flex-col h-full"
    >
      <div className={`h-52 relative overflow-hidden flex items-center justify-center bg-gradient-to-br ${event.gradient || 'from-neutral-800 to-neutral-900'}`}>
        <div className="absolute inset-0 bg-black/30" />
        <motion.span 
          className="text-6xl z-10 relative"
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {event.icon || '🎟️'}
        </motion.span>

        <div className="absolute top-4 left-4 z-20">
          <span className="text-red-500 font-bold text-xs uppercase tracking-wider bg-black/50 px-2 py-1 rounded">
            {event.category}
          </span>
        </div>

        {event.mode && (
          <div className="absolute top-4 right-4 z-20">
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
              event.mode.toUpperCase() === 'ONLINE' 
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                : 'bg-green-500/20 text-green-400 border border-green-500/30'
            }`}>
              {event.mode.toUpperCase()}
            </span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-2">{event.name}</h3>
        <p className="text-sm text-[#a1a1a1] line-clamp-3 mb-4 flex-grow">
          {event.description}
        </p>
        
        <div className="w-12 h-0.5 bg-red-600 mb-6" />
        
        <div className="flex items-center justify-between mt-auto group">
          <span className="text-sm font-semibold text-white group-hover:text-red-500 transition-colors">
            VIEW DETAILS
          </span>
          <ArrowUpRight className="w-5 h-5 text-neutral-400 group-hover:text-red-500 transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
