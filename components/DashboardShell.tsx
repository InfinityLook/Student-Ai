'use client';

import React, { useState } from 'react';
import { 
  Layers, 
  Calculator, 
  CalendarDays, 
  ShoppingBag, 
  User,
  Sparkles,
  Zap,
  LayoutGrid
} from 'lucide-react';

import CalendarModule from './modules/CalendarModule';

export default function DashboardShell() {
  const [activeView, setActiveView] = useState('calendar');

  const navItems = [
    { id: 'dashboard', label: 'Přehled Hubu', icon: LayoutGrid, cat: 'Hlavní' },
    { id: 'calendar', label: 'Kalendář & Testy', icon: CalendarDays, cat: 'Organizování' },
    { id: 'flashcards', label: 'AI Kartičky', icon: Layers, cat: 'Učení' },
    { id: 'solver', label: 'AI Řešitel', icon: Calculator, cat: 'Učení' },
    { id: 'store', label: 'Obchod', icon: ShoppingBag, cat: 'Účet' },
    { id: 'profile', label: 'Můj profil', icon: User, cat: 'Účet' },
  ];

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex font-sans">
      
      {/* Pevný levý panel s technickým skleněným efektem */}
      <aside className="w-64 bg-[#111623]/90 border-r border-slate-800/60 p-6 flex flex-col justify-between flex-shrink-0">
        <div className="space-y-8">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-indigo-500/25">
              S
            </div>
            <div>
              <span className="font-extrabold text-sm text-white tracking-wide block">STUDENT AI</span>
              <span className="text-[10px] text-indigo-400 font-semibold tracking-wider uppercase block">Workspace</span>
            </div>
          </div>

          {/* Navigace */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Kredity Karta */}
        <div className="bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-500/20 p-4 rounded-3xl space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Kredity</span>
            <span className="font-extrabold text-indigo-400 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> 250
            </span>
          </div>
          <button 
            onClick={() => setActiveView('store')}
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[11px] font-bold transition shadow-md shadow-indigo-600/20"
          >
            Dobít kredity
          </button>
        </div>
      </aside>

      {/* Hlavní pracovní plocha */}
      <main className="flex-1 overflow-y-auto p-8">
        {activeView === 'calendar' && <CalendarModule />}
        
        {activeView === 'dashboard' && (
          <div className="max-w-5xl mx-auto space-y-6">
            <h1 className="text-2xl font-black text-white">Přehled studia</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div 
                onClick={() => setActiveView('calendar')} 
                className="bg-[#111623] border border-slate-800/80 p-6 rounded-3xl hover:border-indigo-500/50 cursor-pointer transition"
              >
                <CalendarDays className="w-8 h-8 text-indigo-400 mb-3" />
                <h3 className="font-bold text-white text-base">Kalendář událostí</h3>
                <p className="text-xs text-slate-400 mt-1">Spravujte testy, zkoušky a notifikace.</p>
              </div>

              <div 
                onClick={() => setActiveView('solver')} 
                className="bg-[#111623] border border-slate-800/80 p-6 rounded-3xl hover:border-indigo-500/50 cursor-pointer transition"
              >
                <Calculator className="w-8 h-8 text-emerald-400 mb-3" />
                <h3 className="font-bold text-white text-base">AI Řešitel</h3>
                <p className="text-xs text-slate-400 mt-1">Vložte příklad a získejte postup krok za krokem.</p>
              </div>

              <div 
                onClick={() => setActiveView('flashcards')} 
                className="bg-[#111623] border border-slate-800/80 p-6 rounded-3xl hover:border-indigo-500/50 cursor-pointer transition"
              >
                <Layers className="w-8 h-8 text-purple-400 mb-3" />
                <h3 className="font-bold text-white text-base">Procvičování</h3>
                <p className="text-xs text-slate-400 mt-1">Generování studijních kartiček.</p>
              </div>
            </div>
          </div>
        )}

        {['flashcards', 'solver', 'store', 'profile'].includes(activeView) && (
          <div className="max-w-4xl mx-auto bg-[#111623] border border-slate-800 p-8 rounded-3xl text-center space-y-4">
            <Sparkles className="w-10 h-10 text-indigo-400 mx-auto" />
            <h2 className="text-xl font-bold text-white capitalize">Sekce: {activeView}</h2>
            <p className="text-xs text-slate-400">Tato sekce je napojena v menu a připravena na váš obsah.</p>
          </div>
        )}
      </main>

    </div>
  );
              }
