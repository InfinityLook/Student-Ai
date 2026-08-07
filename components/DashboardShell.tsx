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
  ArrowRight
} from 'lucide-react';

import CalendarModule from './modules/CalendarModule';

export default function DashboardShell() {
  const [activeView, setActiveView] = useState('dashboard');
  const [userCredits] = useState(250);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'calendar', label: 'Kalendář', icon: CalendarDays },
    { id: 'flashcards', label: 'Kartičky', icon: Layers },
    { id: 'solver', label: 'Řešitel', icon: Calculator },
    { id: 'store', label: 'Obchod', icon: ShoppingBag },
    { id: 'profile', label: 'Profil', icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden relative">
      
      {/* Estetické efekty v pozadí */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-900/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-violet-900/10 blur-[150px] rounded-full" />
      </div>

      {/* Top Bar */}
      <header className="fixed top-0 w-full z-40 px-6 py-4 flex justify-between items-center bg-gradient-to-b from-[#050505] to-transparent">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-sm shadow-[0_0_15px_rgba(79,70,229,0.5)]">S</div>
          <span className="font-bold tracking-tight">STUDENT AI</span>
        </div>
        <div 
          onClick={() => setActiveView('store')}
          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all"
        >
          <Zap className="w-3.5 h-3.5 text-indigo-400" />
          <span>{userCredits} Kredity</span>
        </div>
      </header>

      {/* Hlavní obsah */}
      <main className="pt-24 pb-32 px-6 md:px-12 max-w-6xl mx-auto relative z-10">
        
        {/* DASHBOARD (Bento Grid) */}
        {activeView === 'dashboard' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Vítejte zpět, studente.</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              
              {/* Velká karta kalendáře */}
              <div 
                onClick={() => setActiveView('calendar')}
                className="col-span-1 md:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all cursor-pointer group backdrop-blur-sm"
              >
                <CalendarDays className="w-8 h-8 text-indigo-400 mb-4" />
                <h2 className="text-xl font-bold mb-1">Kalendář událostí</h2>
                <p className="text-slate-400 text-sm max-w-sm">Zobrazte si nadcházející testy a termíny zkoušek.</p>
                <div className="mt-6 flex items-center gap-2 text-indigo-400 font-semibold text-sm group-hover:gap-3 transition-all">
                  Otevřít kalendář <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Rychlé akce */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all cursor-pointer backdrop-blur-sm group" onClick={() => setActiveView('solver')}>
                <Calculator className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="font-bold text-lg">AI Řešitel</h3>
                <p className="text-slate-400 text-sm mt-1">Rychlá pomoc s příklady.</p>
              </div>

              {/* Kartičky */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all cursor-pointer backdrop-blur-sm group" onClick={() => setActiveView('flashcards')}>
                <Layers className="w-8 h-8 text-violet-400 mb-4" />
                <h3 className="font-bold text-lg">Kartičky</h3>
                <p className="text-slate-400 text-sm mt-1">Procvičujte své znalosti.</p>
              </div>
            </div>
          </div>
        )}

        {/* Ostatní moduly */}
        {activeView === 'calendar' && <CalendarModule />}
        {['flashcards', 'solver', 'store', 'profile'].includes(activeView) && (
          <div className="bg-white/5 border border-white/10 p-12 rounded-3xl text-center backdrop-blur-md">
            <h2 className="text-2xl font-bold capitalize">{activeView}</h2>
            <p className="text-slate-400 mt-2">Tato sekce je napojena a připravena.</p>
          </div>
        )}

      </main>

      {/* FLOATING DOCK (Spodní menu) */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#1A1A1A]/80 backdrop-blur-2xl border border-white/10 p-2 rounded-3xl shadow-2xl flex items-center gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-semibold transition-all duration-300 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden md:inline">{item.label}</span>
            </button>
          );
        })}
      </nav>

    </div>
  );
              }
