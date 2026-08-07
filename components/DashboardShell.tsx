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
  LayoutGrid,
  Menu,
  X,
  ShieldCheck,
  Check
} from 'lucide-react';

import CalendarModule from './modules/CalendarModule';

export default function DashboardShell() {
  const [activeView, setActiveView] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userCredits] = useState(250);

  const navItems = [
    { id: 'dashboard', label: 'Přehled Hubu', icon: LayoutGrid },
    { id: 'calendar', label: 'Kalendář & Testy', icon: CalendarDays },
    { id: 'flashcards', label: 'AI Kartičky', icon: Layers },
    { id: 'solver', label: 'AI Řešitel', icon: Calculator },
    { id: 'store', label: 'Obchod & Kredity', icon: ShoppingBag },
    { id: 'profile', label: 'Můj profil', icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col md:flex-row font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* DESKTOPOVÝ SIDEBAR */}
      <aside className="w-64 bg-[#111623]/90 backdrop-blur-xl border-r border-slate-800/60 p-6 hidden md:flex flex-col justify-between flex-shrink-0">
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
          <nav className="space-y-1.5">
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
        <div className="bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-500/20 p-4 rounded-3xl space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Zůstatek kreditů</span>
            <span className="font-extrabold text-indigo-400 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> {userCredits}
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

      {/* MOBILNÍ NAVIGACE */}
      <div className="md:hidden bg-[#111623] border-b border-slate-800 p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white text-sm">
            S
          </div>
          <span className="font-bold text-sm text-white">STUDENT AI</span>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobilní menu drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-[#0B0F17]/98 backdrop-blur-md z-40 pt-20 p-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold ${
                  activeView === item.id ? 'bg-indigo-600 text-white' : 'text-slate-400 bg-[#111623] border border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* HLAVNÍ OBSAHOVÁ PLOCHA */}
      <main className="flex-1 overflow-y-auto p-4 md:p-10">
        
        {/* 1. PŘEHLED HUBU (BENTO GRID) */}
        {activeView === 'dashboard' && (
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex justify-between items-center border-b border-slate-800/80 pb-5">
              <div>
                <h1 className="text-2xl font-black text-white">Vítejte zpět, studente!</h1>
                <p className="text-xs text-slate-400 mt-1">Vaše centrální AI platforma pro efektivní studium.</p>
              </div>
              <div className="hidden sm:flex items-center gap-2 bg-[#111623] border border-slate-800 px-3.5 py-2 rounded-2xl text-xs text-indigo-300 font-bold">
                <Zap className="w-4 h-4 text-indigo-400" />
                <span>{userCredits} kreditů k dispozici</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div 
                onClick={() => setActiveView('calendar')} 
                className="bg-[#111623] border border-slate-800/80 p-6 rounded-3xl hover:border-indigo-500/50 cursor-pointer transition group shadow-xl"
              >
                <CalendarDays className="w-8 h-8 text-indigo-400 mb-4 group-hover:scale-110 transition" />
                <h3 className="font-bold text-white text-base">Kalendář událostí</h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">Spravujte testy, termíny zkoušek a nastavujte si připomínky s notifikacemi.</p>
              </div>

              <div 
                onClick={() => setActiveView('solver')} 
                className="bg-[#111623] border border-slate-800/80 p-6 rounded-3xl hover:border-emerald-500/50 cursor-pointer transition group shadow-xl"
              >
                <Calculator className="w-8 h-8 text-emerald-400 mb-4 group-hover:scale-110 transition" />
                <h3 className="font-bold text-white text-base">AI Řešitel úloh</h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">Vložte matematický příklad či fyzikální zadání a získejte postup krok za krokem.</p>
              </div>

              <div 
                onClick={() => setActiveView('flashcards')} 
                className="bg-[#111623] border border-slate-800/80 p-6 rounded-3xl hover:border-purple-500/50 cursor-pointer transition group shadow-xl"
              >
                <Layers className="w-8 h-8 text-purple-400 mb-4 group-hover:scale-110 transition" />
                <h3 className="font-bold text-white text-base">AI Kartičky</h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">Generujte inteligentní studijní sady a procvičujte látku efektivní metodou.</p>
              </div>
            </div>
          </div>
        )}

        {/* 2. KALENDÁŘ MODUL */}
        {activeView === 'calendar' && <CalendarModule />}

        {/* 3. AI KARTIČKY */}
        {activeView === 'flashcards' && (
          <div className="max-w-4xl mx-auto bg-[#111623] border border-slate-800 p-8 rounded-3xl space-y-6 shadow-xl">
            <div className="border-b border-slate-800 pb-4">
              <h1 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
                <Layers className="w-7 h-7 text-purple-400" />
                <span>AI Kartičky & Procvičování</span>
              </h1>
              <p className="text-xs text-slate-400 mt-1">Interaktivní studijní sady vygenerované z vašich poznámek.</p>
            </div>
            <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-10 text-center text-slate-400 text-xs">
              Modul pro kartičky je připraven k použití.
            </div>
          </div>
        )}

        {/* 4. AI ŘEŠITEL */}
        {activeView === 'solver' && (
          <div className="max-w-4xl mx-auto bg-[#111623] border border-slate-800 p-8 rounded-3xl space-y-6 shadow-xl">
            <div className="border-b border-slate-800 pb-4">
              <h1 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
                <Calculator className="w-7 h-7 text-emerald-400" />
                <span>AI Řešitel úloh</span>
              </h1>
              <p className="text-xs text-slate-400 mt-1">Zadejte příklad a nechte AI vygenerovat detailní řešení.</p>
            </div>
            <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-10 text-center text-slate-400 text-xs">
              AI Řešitel je připraven k zadání úlohy.
            </div>
          </div>
        )}

        {/* 5. OBCHOD & KREDITY */}
        {activeView === 'store' && (
          <div className="max-w-4xl mx-auto bg-[#111623] border border-slate-800 p-8 rounded-3xl space-y-6 shadow-xl">
            <div className="border-b border-slate-800 pb-4">
              <h1 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
                <ShoppingBag className="w-7 h-7 text-indigo-400" />
                <span>Obchod & AI Kredity</span>
              </h1>
              <p className="text-xs text-slate-400 mt-1">Dobijte si kredity nebo zvolte prémiový balíček.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#0B0F17] border border-indigo-500/40 rounded-2xl p-6 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-indigo-400" />
                  <span>Student Pro (500 kreditů)</span>
                </h3>
                <p className="text-2xl font-black text-white">199 Kč</p>
                <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-xl text-xs font-bold transition">
                  Zakoupit balíček
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 6. MŮJ PROFIL */}
        {activeView === 'profile' && (
          <div className="max-w-4xl mx-auto bg-[#111623] border border-slate-800 p-8 rounded-3xl space-y-6 shadow-xl">
            <div className="border-b border-slate-800 pb-4">
              <h1 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
                <User className="w-7 h-7 text-indigo-400" />
                <span>Můj Profil</span>
              </h1>
              <p className="text-xs text-slate-400 mt-1">Správa vašeho účtu a studijních preferencí.</p>
            </div>
            <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center font-bold text-white text-lg">
                ST
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Student AI Uživatel</h3>
                <p className="text-xs text-slate-400">student@skola.cz</p>
              </div>
            </div>
          </div>
        )}

      </main>

    </div>
  );
            }
