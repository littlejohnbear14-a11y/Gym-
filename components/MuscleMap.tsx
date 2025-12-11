import React from 'react';
import { MuscleGroup } from '../types';

interface MuscleMapProps {
  highlight: MuscleGroup;
  className?: string;
}

const MuscleMap: React.FC<MuscleMapProps> = ({ highlight, className }) => {
  const baseColor = "#334155"; // slate-700
  const activeColor = "#10b981"; // emerald-500

  // Helper to determine fill color
  const getFill = (group: string) => {
    if (highlight === 'full') return activeColor;
    return highlight === group ? activeColor : baseColor;
  };

  return (
    <svg 
      viewBox="0 0 100 200" 
      className={`w-full h-full ${className}`} 
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Muscle Map</title>
      
      {/* Head */}
      <circle cx="50" cy="15" r="8" fill={baseColor} />

      {/* Shoulders (Deltoids) */}
      <path 
        d="M30 30 Q50 35 70 30 L75 40 L65 45 L50 40 L35 45 L25 40 Z" 
        fill={getFill('shoulders')} 
      />

      {/* Chest (Pectorals) */}
      <path 
        d="M35 45 L65 45 L60 60 L40 60 Z" 
        fill={getFill('chest')} 
      />

      {/* Core (Abs) */}
      <path 
        d="M40 60 L60 60 L58 80 L42 80 Z" 
        fill={getFill('core')} 
      />

      {/* Arms (Biceps/Triceps combined for simplicity) */}
      <path 
        d="M25 40 L35 45 L30 70 L20 65 Z" 
        fill={getFill('arms')} 
      />
      <path 
        d="M75 40 L65 45 L70 70 L80 65 Z" 
        fill={getFill('arms')} 
      />

      {/* Back (Lats - Simplified visualization showing behind) */}
      {highlight === 'back' && (
         <path 
            d="M30 35 L70 35 L65 70 L35 70 Z" 
            fill={activeColor}
            opacity="0.5" 
            className="animate-pulse"
         />
      )}
      
      {/* Glutes (Hips region) */}
      <path 
        d="M35 80 L65 80 L70 95 L30 95 Z" 
        fill={getFill('glutes')} 
      />

      {/* Legs (Quads/Hams/Calves combined) */}
      <path 
        d="M30 95 L48 95 L45 140 L35 140 Z" 
        fill={getFill('legs')} 
      />
       <path 
        d="M52 95 L70 95 L65 140 L55 140 Z" 
        fill={getFill('legs')} 
      />
       {/* Calves */}
      <path 
        d="M35 145 L45 145 L42 180 L38 180 Z" 
        fill={getFill('legs')} 
      />
      <path 
        d="M55 145 L65 145 L62 180 L58 180 Z" 
        fill={getFill('legs')} 
      />

    </svg>
  );
};

export default MuscleMap;
