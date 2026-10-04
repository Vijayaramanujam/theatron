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
      className="group cursor-pointer border border-zinc-800/80 bg-zinc-950 flex flex-col justify-between h-full rounded-xl overflow-hidden transition-all duration-300 hover:border-red-600/60 hover:shadow-xl hover:shadow-red-950/20"
    >
      {/* Event Image Banner */}
      <div className="relative h-52 sm:h-56 overflow-hidden bg-zinc-900 shrink-0">
        <img
          alt={event.name}
          src={event.image}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
        
        {/* Category / Mode Pill Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white bg-red-600/90 backdrop-blur-md rounded-md shadow-md">
            {event.category}
          </span>
          {event.mode && (
            <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-300 bg-zinc-900/90 backdrop-blur-md border border-zinc-700/80 rounded-md">
              {event.mode}
            </span>
          )}
        </div>
      </div>

      {/* Card Content Area - Neat Left Alignment & Generous Spacing */}
      <div className="p-6 sm:p-7 bg-zinc-950 flex flex-col flex-1 justify-between space-y-5 text-left">
        <div className="space-y-3">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug group-hover:text-red-500 transition-colors duration-200">
            {event.name}
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed font-normal line-clamp-3">
            {event.description}
          </p>
        </div>

        <div className="pt-2 space-y-4">
          {/* Thin Red Horizontal Line Divider with Generous Margin */}
          <div className="h-[1.5px] bg-red-600/80 w-full" />

          {/* Bottom Action Footer Row */}
          <div className="flex items-center justify-between gap-4 pt-1">
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest">
                {event.mode ? 'MODE' : 'TYPE'}
              </span>
              <span className="text-red-500 font-bold text-sm uppercase tracking-wider mt-0.5">
                {event.mode || event.category}
              </span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(event);
              }}
              className="bg-red-600 hover:bg-red-700 px-5 py-2.5 text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-md transition-all duration-200 transform group-hover:scale-105 active:scale-95 shadow-md shadow-red-950/40 cursor-pointer"
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
