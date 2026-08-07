'use client';

import React, { useState } from 'react';
import KairoAvatar from './KairoAvatar';
import KairoModule from './modules/KairoModule';

export default function DashboardShell() {
  const [activeModule, setActiveModule] = useState<'kairo' | string>('kairo');

  return (
    <div className="flex h-screen bg-slate-950 text-white overflow-hidden">
      {/* Boční panel / Navigation */}
      <aside className="w-20 bg-slate-900 border-r border-slate-800 flex flex-col items-center py-6 gap-6 shadow-xl z-10">
        <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          AI
        </div>
        
        <button 
          onClick={() => setActiveModule('kairo')}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
            activeModule === 'kairo' 
              ? 'bg-blue-600/20 border border-blue-500/50 text-blue-400 shadow-md' 
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
          title="Kairo Asistent"
        >
          <div className="w-10 h-10 flex items-center justify-center overflow-hidden rounded-full">
            <KairoAvatar size="sm" />
          </div>
          <span className="text-[10px] font-medium mt-1">Kairo</span>
        </button>
      </aside>

      {/* Hlavní obsahová část */}
      <main className="flex-1 overflow-y-auto p-6 bg-slate-950">
        <header className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Studijní Asistent Kairo
          </h1>
        </header>

        <div className="max-w-4xl mx-auto">
          {activeModule === 'kairo' && <KairoModule />}
        </div>
      </main>
    </div>
  );
}
