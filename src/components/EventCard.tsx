import React from 'react';
import type { EventData } from '../types/event';

interface Props {
  event: EventData;
  index: number;
  onSelect: (event: EventData) => void;
}

const EventCard: React.FC<Props> = ({ event, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(event)}
      className="group cursor-pointer border border-gray-800 bg-black flex flex-col justify-between h-full transition duration-300 hover:border-gray-600"
    >
      {/* Event Image Banner */}
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gray-900">
        <img
          alt={event.name}
          src={event.image}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          loading="lazy"
        />
      </div>

      {/* Card Content Area - Neat Left Alignment matching Reference */}
      <div className="p-4 sm:p-5 md:p-6 bg-black flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 md:mb-3 font-sans">
            {event.name}
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm mb-3 md:mb-4 leading-relaxed line-clamp-3 font-normal">
            {event.description}
          </p>
        </div>

        <div>
          {/* Thin Red Horizontal Line Divider */}
          <div className="h-px bg-red-600 mb-3 md:mb-4 w-full" />

          {/* Bottom Action Footer Row */}
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5 font-semibold uppercase tracking-wider">
                {event.mode ? 'MODE' : 'CATEGORY'}
              </p>
              <p className="text-red-600 font-bold text-sm md:text-lg uppercase">
                {event.mode || event.category}
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(event);
              }}
              className="bg-red-600 px-4 sm:px-6 py-2 text-white font-bold text-xs sm:text-sm hover:bg-red-700 transition uppercase tracking-wider"
            >
              REGISTER →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
