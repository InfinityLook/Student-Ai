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
  Settings 
} from 'lucide-react';
import CalendarModule from './modules/CalendarModule';

export default function DashboardShell() {
  const [activeView, setActiveView] = useState('workspace');
  const [userCredits] = useState(250);
  const [petLevel] = useState(3);
  const [petXp] = useState(75);

  const navItems = [
    { id: 'workspace', label: 'Workspace', icon: LayoutGrid },
    { id: 'pet', label: 'Mazlíček', icon: Heart },
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'store', label: 'Obchod', icon: ShoppingBag },
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
        <div 
          onClick={() => setActiveView('store')}
          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all"
        >
          <Zap className="w-3.5 h-3.5 text-indigo-400" />
          <span>{userCredits} Kreditů</span>
        </div>
      </header>

      {/* Hlavní obsah */}
      <main className="relative z-10 pt-24 pb-36 px-4 md:px-8 max-w-5xl mx-auto">
        
        {/* 1. STUDIJNÍ WORKSPACE */}
        {activeView === 'workspace' && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h1 className="text-3xl font-black tracking-tight mb-2">
                Studijní <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Workspace</span>
              </h1>
              <p className="text-slate-400 text-xs">Vaše centrální zóna pro učení a organizaci.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Kalendář karta */}
              <div 
                onClick={() => setActiveView('calendar')}
                className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-8 hover:border-indigo-500/50 transition-all duration-500 hover:scale-[1.01] cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <CalendarDays className="w-10 h-10 text-indigo-400 mb-6 group-hover:scale-110 transition-transform" />
                <h2 className="text-xl font-bold mb-2">Kalendář & Testy</h2>
                <p className="text-slate-400 text-sm">Spravujte termíny zkoušek a nastavujte si připomínky.</p>
              </div>

              {/* AI Řešitel */}
              <div className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-8 hover:border-emerald-500/50 transition-all duration-500 hover:scale-[1.01] cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Calculator className="w-10 h-10 text-emerald-400 mb-6 group-hover:scale-110 transition-transform" />
                <h2 className="text-xl font-bold mb-2">AI Řešitel úloh</h2>
                <p className="text-slate-400 text-sm">Zadejte příklad a získejte postup krok za krokem.</p>
              </div>

              {/* Kartičky */}
              <div className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-8 hover:border-purple-500/50 transition-all duration-500 hover:scale-[1.01] cursor-pointer md:col-span-2">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Layers className="w-10 h-10 text-purple-400 mb-6 group-hover:scale-110 transition-transform" />
                <h2 className="text-xl font-bold mb-2">AI Kartičky</h2>
                <p className="text-slate-400 text-sm">Generujte chytré sady pro efektivní procvičování.</p>
              </div>
            </div>
          </div>
        )}

        {/* Kalendář modul */}
        {activeView === 'calendar' && (
          <div className="space-y-4">
            <button 
              onClick={() => setActiveView('workspace')}
              className="text-xs text-indigo-400 font-bold hover:underline mb-2 flex items-center gap-1"
            >
              ← Zpět do Workspace
            </button>
            <CalendarModule />
          </div>
        )}

        {/* 2. MAZLÍČEK */}
        {activeView === 'pet' && (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md text-center space-y-6 max-w-lg mx-auto">
            <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-pink-500 to-indigo-500 rounded-3xl flex items-center justify-center shadow-lg shadow-pink-500/20 animate-bounce">
              <Heart className="w-12 h-12 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Váš Studijní Mazlíček</h2>
              <p className="text-xs text-slate-400 mt-1">Úroveň {petLevel} • Rostete spolu s učením!</p>
            </div>
            <div className="bg-black/40 p-4 rounded-2xl border border-white/5 space-y-2 text-left">
              <div className="flex justify-between text-xs font-semibold">
                <span>XP Progress</span>
                <span>{petXp} / 100 XP</span>
              </div>
              <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-pink-500 to-indigo-500 h-full rounded-full" style={{ width: `${petXp}%` }} />
              </div>
            </div>
            <p className="text-xs text-slate-400">Mazlíček získáva energii za každý splněný test a odevzdaný úkol!</p>
          </div>
        )}

        {/* 3. PROFIL */}
        {activeView === 'profile' && (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md max-w-xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold">Můj Profil</h2>
            <div className="flex items-center gap-4 bg-black/40 p-4 rounded-2xl border border-white/5">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center font-bold text-lg">
                ST
              </div>
              <div>
                <h3 className="font-bold text-sm">Aktivní Student</h3>
                <p className="text-xs text-slate-400">student@skola.cz</p>
              </div>
            </div>
          </div>
        )}

        {/* 4. OBCHOD */}
        {activeView === 'store' && (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md max-w-xl mx-auto space-y-6 text-center">
            <h2 className="text-2xl font-bold">Obchod s kredity</h2>
            <p className="text-xs text-slate-400">Dobijte si balíček kreditů pro neomezené AI funkce.</p>
            <div className="bg-gradient-to-br from-indigo-950/50 to-black border border-indigo-500/30 p-6 rounded-3xl space-y-4">
              <h3 className="font-bold text-base">Student Pro Pack</h3>
              <p className="text-3xl font-black text-indigo-400">500 kreditů</p>
              <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-xs font-bold transition">
                Zakoupit za 199 Kč
              </button>
            </div>
          </div>
        )}

        {/* 5. NASTAVENÍ */}
        {activeView === 'settings' && (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md max-w-xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold">Nastavení aplikace</h2>
            <div className="space-y-4 text-xs">
              <div className="flex justify-between items-center bg-black/40 p-4 rounded-2xl border border-white/5">
                <span>Tmavý režim (Dark Mode)</span>
                <span className="text-indigo-400 font-bold">Aktivní</span>
              </div>
              <div className="flex justify-between items-center bg-black/40 p-4 rounded-2xl border border-white/5">
                <span>Notifikace a připomínky</span>
                <span className="text-emerald-400 font-bold">Zapnuto</span>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* PLOVOUCÍ SPODNÍ DOCK */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 p-2 rounded-3xl bg-black/60 backdrop-blur-2xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.6)]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id || (item.id === 'workspace' && activeView === 'calendar');
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`relative flex items-center gap-2 px-3.5 py-3 rounded-2xl transition-all duration-300 ease-out group ${
                isActive ? 'bg-white text-black shadow-lg scale-105' : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
              title={item.label}
            >
              <Icon className="w-4 h-4" />
              <span className="text-xs font-semibold hidden md:inline">{item.label}</span>
              {isActive && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full animate-pulse md:hidden" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
        }
