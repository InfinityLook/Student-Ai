'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

export default function LoadingSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
      <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center shadow-xl shadow-pink-500/20 animate-pulse">
        <Sparkles className="w-8 h-8 text-white animate-spin" />
      </div>
      <p className="text-sm font-bold text-slate-400 tracking-wider">Načítám modul...</p>
    </div>
  );
}
