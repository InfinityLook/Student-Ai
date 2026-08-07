'use client';

import React, { useState } from 'react';
import { Layers, Calculator, CalendarDays, ShoppingBag, User, LayoutGrid, Zap, ChevronRight } from 'lucide-react';

export default function ModernDashboard() {
  const [activeView, setActiveView] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', icon: LayoutGrid },
    { id: 'calendar', icon: CalendarDays },
    { id: 'flashcards', icon: Layers },
    { id: 'solver', icon: Calculator },
    { id: 'store', icon: ShoppingBag },
    { id: 'profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans overflow-x-hidden selection:bg-indigo-500/30">
      <style jsx global>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 10s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>

      {/* ANIMOVANÉ POZADÍ */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-indigo-600 rounded-full mix-blend-screen filter blur-[128px] animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-violet-600 rounded-full mix-blend-screen filter blur-[128px] animate-blob animation-delay-2000"></div>
      </div>

      {/* OBSAH */}
      <main className="relative z-10 pt-20 px-6 pb-32 max-w-5xl mx-auto">
        <h1 className="text-4xl font-black tracking-tight mb-12">
          Studijní <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Workspace</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bento Card 1 */}
          <div className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-8 hover:border-indigo-500/50 transition-all duration-500 hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CalendarDays className="w-10 h-10 text-indigo-400 mb-6" />
            <h2 className="text-xl font-bold mb-2">Plánovač zkoušek</h2>
            <p className="text-slate-400 text-sm">Všechny termíny na jednom místě.</p>
          </div>

          {/* Bento Card 2 */}
          <div className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-8 hover:border-emerald-500/50 transition-all duration-500 hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Calculator className="w-10 h-10 text-emerald-400 mb-6" />
            <h2 className="text-xl font-bold mb-2">AI Řešitel</h2>
            <p className="text-slate-400 text-sm">Okamžité výpočty krok za krokem.</p>
          </div>
        </div>
      </main>

      {/* FLOATING GLASS DOCK (VYLEPŠENÝ) */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 p-2 rounded-3xl bg-black/40 backdrop-blur-2xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`relative p-4 rounded-2xl transition-all duration-300 ease-out group ${
                isActive ? 'bg-white text-black' : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="w-5 h-5" />
              {isActive && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
