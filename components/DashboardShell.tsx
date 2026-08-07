'use client';

import React, { useState } from 'react';
import { 
  Layers, 
  Calculator, 
  CalendarDays, 
  ShoppingBag, 
  User, 
  LayoutGrid, 
  Zap, 
  Heart, 
  Settings,
  Trophy,     // Nová ikona
  Database    // Nová ikona
} from 'lucide-react';
import CalendarModule from './modules/CalendarModule';

export default function DashboardShell() {
  const [activeView, setActiveView] = useState('workspace');
  const [userCredits] = useState(250);

  // Aktualizované menu
  const navItems = [
    { id: 'workspace', label: 'Workspace', icon: LayoutGrid },
    { id: 'pet', label: 'Mazlíček', icon: Heart },
    { id: 'rewards', label: 'Odměny', icon: Trophy },
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'store', label: 'Obchod', icon: ShoppingBag },
    { id: 'storage', label: 'Úložiště', icon: Database },
    { id: 'settings', label: 'Nastavení', icon: Settings },
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

      {/* Animované pozadí */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-indigo-600 rounded-full mix-blend-screen filter blur-[128px] animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-violet-600 rounded-full mix-blend-screen filter blur-[128px] animate-blob animation-delay-2000"></div>
      </div>

      {/* Top Bar */}
      <header className="fixed top-0 w-full z-40 px-6 py-4 flex justify-between items-center bg-gradient-to-b from-[#020202] to-transparent backdrop-blur-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-sm shadow-[0_0_15px_rgba(79,70,229,0.5)]">S</div>
          <span className="font-bold tracking-wider text-sm">STUDENT AI</span>
        </div>
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all hover:bg-white/10">
          <Zap className="w-3.5 h-3.5 text-indigo-400" />
          <span>{userCredits} Kreditů</span>
        </div>
      </header>

      {/* Hlavní obsah */}
      <main className="relative z-10 pt-24 pb-36 px-4 md:px-8 max-w-5xl mx-auto min-h-[80vh]">
        
        {/* Renderování obsahu podle aktivního view */}
        {activeView === 'workspace' && (
          <div className="space-y-8">
            <h1 className="text-3xl font-black tracking-tight">Studijní Workspace</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Zde by byl Váš grid */}
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                 <h2 className="font-bold mb-2">Kalendář</h2>
                 <p className="text-slate-400 text-sm">Naplánované úkoly.</p>
              </div>
            </div>
          </div>
        )}

        {/* --- NOVÉ SEKCE --- */}

        {activeView === 'rewards' && (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md max-w-2xl mx-auto text-center space-y-6">
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto" />
            <h2 className="text-2xl font-bold">Tvé Odměny</h2>
            <p className="text-slate-400">Zde uvidíš získané badge a odměny za studium.</p>
            <div className="grid grid-cols-3 gap-4 mt-8">
                {[1,2,3].map(i => (
                    <div key={i} className="aspect-square rounded-2xl bg-white/5 flex items-center justify-center border border-white/5">
                        <span className="text-2xl">🏆</span>
                    </div>
                ))}
            </div>
          </div>
        )}

        {activeView === 'storage' && (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-3">
                <Database className="text-blue-400" /> Úložiště souborů
            </h2>
            <div className="bg-black/40 rounded-2xl p-6 border border-white/5">
                <div className="flex justify-between mb-2 text-sm">
                    <span>Využití cloudu</span>
                    <span>1.2 GB / 5 GB</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full w-[24%]" />
                </div>
            </div>
          </div>
        )}

        {/* (Ostatní moduly jako pet, profile, store, settings zůstávají stejné jako předtím) */}
        {activeView === 'pet' && <div className="text-center">Sekce Mazlíček...</div>}
        {activeView === 'profile' && <div className="text-center">Sekce Profil...</div>}
        {activeView === 'store' && <div className="text-center">Sekce Obchod...</div>}
        {activeView === 'settings' && <div className="text-center">Sekce Nastavení...</div>}

      </main>

      {/* PLOVOUCÍ SPODNÍ DOCK */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 p-2 rounded-3xl bg-black/60 backdrop-blur-2xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.6)]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`relative flex items-center justify-center p-3 rounded-2xl transition-all duration-300 ease-out ${
                isActive ? 'bg-white text-black shadow-lg scale-105' : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
              title={item.label}
            >
              <Icon className="w-5 h-5" />
            </button>
          );
        })}
      </nav>
    </div>
  );
}
