'use client';

import React from 'react';
import { Trophy } from 'lucide-react';

interface LevelBadgeProps {
  level?: number;
  currentXp?: number;
  maxXp?: number;
  className?: string;
}

export default function LevelBadge({
  level = 4,
  currentXp = 85,
  maxXp = 100,
  className = ''
}: LevelBadgeProps) {
  const percentage = Math.min(100, Math.max(0, (currentXp / maxXp) * 100));

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900/40 via-pink-900/20 to-black/40 border border-purple-500/30 p-4 backdrop-blur-xl shadow-lg ${className}`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
      
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center font-black text-white shadow-md shadow-pink-500/20">
            <Trophy className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-pink-400 tracking-wider block">Úroveň</span>
            <h4 className="text-sm font-black text-white">Level {level} ⚡</h4>
          </div>
        </div>
        <span className="text-xs font-mono font-bold text-slate-300">
          {currentXp} / {maxXp} XP
        </span>
      </div>

      <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden p-0.5">
        <div 
          className="bg-gradient-to-r from-pink-500 to-purple-500 h-full rounded-full transition-all duration-500" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
