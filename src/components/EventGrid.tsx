import React from 'react';
import type { EventData } from '../types/event';
import EventCard from './EventCard';

interface Props {
  events: EventData[];
  onSelectEvent: (event: EventData) => void;
}

const EventGrid: React.FC<Props> = ({ events, onSelectEvent }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-14 lg:gap-16 max-w-7xl mx-auto py-4">
      {events.map((event, index) => (
        <EventCard
          key={event.id}
          event={event}
          index={index}
          onSelect={onSelectEvent}
        />
      ))}
    </div>
  );
};

export default EventGrid;
