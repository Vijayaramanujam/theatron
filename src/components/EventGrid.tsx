import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { EventData } from '../types/event';
import EventCard from './EventCard';

interface Props {
  events: EventData[];
  onSelectEvent: (event: EventData) => void;
}

const EventGrid: React.FC<Props> = ({ events, onSelectEvent }) => {
  return (
    <motion.div 
      layout
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <AnimatePresence mode="popLayout">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3 }}
          >
            <EventCard 
              event={event} 
              index={index} 
              onSelect={onSelectEvent} 
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default EventGrid;
