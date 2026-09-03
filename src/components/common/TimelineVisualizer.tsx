import React from 'react';
import { TimelineData } from '../../types';

interface TimelineVisualizerProps {
  timeline: TimelineData;
  tenseName: string;
}

export const TimelineVisualizer: React.FC<TimelineVisualizerProps> = ({ timeline, tenseName }) => {
  const { timePosition, description, visualAnchor } = timeline;

  // Visual layout helpers
  const isPast = timePosition.startsWith('past');
  const isPresent = timePosition.startsWith('present') || timePosition === 'past-to-present';
  const isFuture = timePosition.startsWith('future');
  const isContinuous = timePosition.includes('continuous');
  const isPerfect = timePosition.includes('perfect') || timePosition.includes('before') || timePosition === 'past-to-present';

  return (
    <div className="bg-[#121212] rounded-2xl p-5 border border-zinc-800">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            Timeline Visualization
          </h4>
        </div>
        <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-zinc-800 text-emerald-400 border border-zinc-700">
          {visualAnchor}
        </span>
      </div>

      {/* Interactive Timeline Bar */}
      <div className="relative py-8 px-4 my-2">
        {/* Main Horizon line */}
        <div className="h-1.5 w-full bg-zinc-800 rounded-full relative">
          {/* NOW Indicator Center */}
          <div className="absolute left-1/2 -top-2.5 -translate-x-1/2 flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-amber-500 border-4 border-[#121212] shadow-md flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-black" />
            </div>
            <span className="mt-2 text-[10px] font-mono font-bold tracking-widest uppercase text-amber-400">
              NOW
            </span>
          </div>

          {/* Left Arrow (Past) */}
          <div className="absolute left-0 -top-2 text-[10px] font-mono font-bold tracking-wider text-zinc-500">
            ◀ PAST
          </div>

          {/* Right Arrow (Future) */}
          <div className="absolute right-0 -top-2 text-[10px] font-mono font-bold tracking-wider text-zinc-500">
            FUTURE ▶
          </div>

          {/* Active Tense Marker / Wave */}
          {timePosition === 'present-regular' && (
            // Repeated dots across past, present, future
            <div className="absolute inset-0 flex justify-between items-center px-12">
              {[-3, -2, -1, 0, 1, 2, 3].map((step) => (
                <div
                  key={step}
                  className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#121212] shadow-sm animate-pulse"
                  title="Repeated habit / truth"
                />
              ))}
            </div>
          )}

          {timePosition === 'present-now' && (
            // Continuous pulsating block at NOW
            <div className="absolute left-1/2 -translate-x-1/2 -top-3 w-28 h-7 bg-emerald-500/20 border border-emerald-500/50 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-[10px] font-bold text-emerald-300">
                Happening Right Now
              </span>
            </div>
          )}

          {timePosition === 'past-to-present' && (
            // Bridge line starting in past and touching NOW
            <div className="absolute left-1/4 right-1/2 -top-2.5 h-6 border-b-4 border-l-4 border-emerald-500 rounded-bl-xl flex items-start">
              <span className="text-[10px] font-bold text-emerald-300 -mt-5 ml-2 bg-zinc-900 px-1.5 py-0.5 rounded border border-emerald-500/30">
                Began in past ➔ Results in NOW
              </span>
            </div>
          )}

          {timePosition === 'past-completed' && (
            // Solid point in past
            <div className="absolute left-1/4 -top-3 -translate-x-1/2 flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-amber-500 border-4 border-[#121212] shadow-lg flex items-center justify-center">
                <span className="text-[10px] text-black font-bold">✓</span>
              </div>
              <span className="text-[10px] font-bold text-amber-400 mt-2 bg-zinc-800 px-1.5 py-0.5 rounded shadow-sm border border-zinc-700">
                Completed & Closed
              </span>
            </div>
          )}

          {timePosition === 'past-continuous' && (
            // Ribbon in past with sudden interruption
            <div className="absolute left-[15%] w-1/4 -top-2.5 h-6 bg-amber-500/20 border-t-2 border-b-2 border-amber-500/60 rounded flex items-center justify-center">
              <span className="text-[9px] font-bold text-amber-300">
                In progress in past
              </span>
            </div>
          )}

          {timePosition === 'past-before-past' && (
            // Flashback marker before another past point
            <div className="absolute left-[10%] -top-3 flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-purple-500 border-2 border-[#121212] shadow flex items-center justify-center">
                <span className="text-[10px] text-white font-bold">1st</span>
              </div>
              <span className="text-[9px] font-bold text-purple-300 mt-2">
                Happened 1st
              </span>
              <div className="absolute left-16 top-0 w-5 h-5 rounded-full bg-zinc-600 border border-zinc-500 flex items-center justify-center">
                <span className="text-[8px] text-zinc-300 font-bold">2nd</span>
              </div>
            </div>
          )}

          {timePosition === 'future-simple' && (
            // Single point in future
            <div className="absolute right-1/4 -top-3 translate-x-1/2 flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-teal-500 border-4 border-[#121212] shadow-lg flex items-center justify-center animate-bounce">
                <span className="text-[10px] text-black font-bold">★</span>
              </div>
              <span className="text-[10px] font-bold text-teal-400 mt-2 bg-zinc-800 px-1.5 py-0.5 rounded shadow-sm border border-zinc-700">
                Future Event / Decision
              </span>
            </div>
          )}

          {timePosition === 'future-continuous' && (
            // Ribbon in future
            <div className="absolute left-[60%] w-1/4 -top-2.5 h-6 bg-teal-500/20 border-t-2 border-b-2 border-teal-500/60 rounded flex items-center justify-center">
              <span className="text-[9px] font-bold text-teal-300">
                In progress in future
              </span>
            </div>
          )}

          {timePosition === 'future-before-future' && (
            // Action before future deadline
            <div className="absolute left-[55%] -top-3 flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-amber-500 border-2 border-[#121212] shadow flex items-center justify-center">
                <span className="text-[9px] text-black font-bold">DONE</span>
              </div>
              <span className="text-[9px] font-bold text-amber-300 mt-2">
                Finished by deadline
              </span>
              <div className="absolute left-20 -top-1 w-0.5 h-7 bg-rose-500" title="Deadline" />
            </div>
          )}
        </div>
      </div>

      {/* Description text */}
      <p className="text-xs text-zinc-400 leading-relaxed text-center mt-3 pt-3 border-t border-zinc-800">
        <strong className="text-zinc-200 font-semibold">{tenseName} Concept: </strong>
        {description}
      </p>
    </div>
  );
};
