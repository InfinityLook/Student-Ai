'use client';

import React, { useState } from 'react';
import { 
  Layers, 
  Calculator, 
  CalendarDays, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  Sparkles, 
  Zap, 
  Crown,
  Bell,
  Search
} from 'lucide-react';

import FlashcardsModule from './modules/FlashcardsModule';
import SolverModule from './modules/SolverModule';
import CalendarModule from './modules/CalendarModule';
import StoreModule from './modules/StoreModule';
import VoiceControl from './VoiceControl';

// Náhradní jednoduchý modul profilu pro kompletnost
function ProfileModule() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6 text-slate-100">
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
          <User className="w-7 h-7 text-indigo-400" />
          <span>Můj Profil</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">Správa vašeho účtu, nastavení a AI předvoleb.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-xl font-bold text-white shadow-lg">
            ST
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Student AI Uživatel</h3>
            <p className="text-xs text-slate-400">student@skola.cz</p>
            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Free Plan
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Náhradní modul kartiček (pokud ještě nemáš vlastní v samostatném souboru)
function PlaceholderFlashcards() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6 text-slate-100">
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
          <Layers className="w-7 h-7 text-indigo-400" />
          <span>Kartičky & Procvičování</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">Interaktivní studijní sady a generování AI kartiček.</p>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-400 text-xs">
        Sekce kartiček je připravena k používání.
      </div>
    </div>
  );
}

export default function DashboardShell() {
  const [activeView, setActiveView] = useState('calendar');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userCredits] = useState(250);

  const navSections = [
    {
      title: 'Učení & AI',
      items: [
        { id: 'flashcards', label: 'Kartičky', icon: Layers },
        { id: 'solver', label: 'AI Řešitel úloh', icon: Calculator },
      ]
    },
    {
      title: 'Organizování',
      items: [
        { id: 'calendar', label: 'Kalendář zkoušek & akcí', icon: CalendarDays }
      ]
    },
    {
      title: 'Účet & Systém',
      items: [
        { id: 'store', label: 'Obchod & Předplatné', icon: ShoppingBag },
        { id: 'profile', label: 'Můj profil', icon: User }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* DESKTOPOVÝ SIDEBAR */}
      <aside className="w-64 bg-slate-900/80 backdrop-blur-xl border-r border-slate-800/80 p-5 flex flex-col justify-between hidden md:flex flex-shrink-0">
        <div className="space-y-8">
          
          {/* Logo */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-2xl bg-indigo-600 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-indigo-600/30 border border-indigo-400/30">
              S
            </div>
            <div>
              <span className="font-extrabold text-base text-white tracking-tight block">Student AI</span>
              <span className="text-[10px] text-slate-500 font-medium block -mt-1">Studijní asistent</span>
            </div>
          </div>

          {/* Navigační menu */}
          <nav className="space-y-6">
            {navSections.map((sec, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 px-2">
                  {sec.title}
                </div>
                <div className="space-y-1">
                  {sec.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeView === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveView(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-150 ${
                          isActive
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 border border-indigo-400/20'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Spodní widget kreditů */}
        <div className="bg-slate-950 border border-slate-800/80 p-3.5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Zůstatek kreditů</span>
            <span className="font-extrabold text-indigo-400 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" />
              {userCredits}
            </span>
          </div>
          <button
            onClick={() => setActiveView('store')}
            className="w-full py-2 bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/20 text-indigo-300 rounded-xl text-[11px] font-bold transition text-center block"
          >
            Dobít kredity
          </button>
        </div>
      </aside>

      {/* MOBILNÍ NAVIGACE (HLAVIČKA & DRAWER) */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white text-sm">
            S
          </div>
          <span className="font-bold text-sm text-white">Student AI</span>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-400 hover:text-white bg-slate-950 border border-slate-800 rounded-xl"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobilní menu vysouvací vrstva */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-slate-950/95 backdrop-blur-md z-30 pt-20 p-6 space-y-6 overflow-y-auto">
          {navSections.map((sec, idx) => (
            <div key={idx} className="space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-2">
                {sec.title}
              </div>
              <div className="space-y-1">
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveView(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition ${
                        activeView === item.id
                          ? 'bg-indigo-600 text-white'
                          : 'text-slate-400 bg-slate-900 border border-slate-800/80'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* HLAVNÍ OBSAHOVÁ ČÁST */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* HORNÍ LIŠTA OBSAHU (TOPBAR) */}
        <header className="h-16 border-b border-slate-800/80 px-4 md:px-8 flex items-center justify-between gap-4 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-20">
          <div className="relative max-w-md w-full hidden sm:block">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Vyhledat v učivu, kartičkách nebo událostech..."
              className="w-full bg-slate-900 border border-slate-800/80 rounded-2xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={() => setActiveView('store')}
              className="flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-xs text-indigo-300 font-bold hover:bg-indigo-500/20 transition"
            >
              <Zap className="w-3.5 h-3.5 text-indigo-400" />
              <span>{userCredits} kr.</span>
            </button>

            <button
              onClick={() => setActiveView('profile')}
              className="w-9 h-9 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white transition"
            >
              <User className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* DYNAMICKÝ MODUL */}
        <main className="flex-1 overflow-y-auto pb-24 md:pb-12">
          {activeView === 'flashcards' && <PlaceholderFlashcards />}
          {activeView === 'solver' && <SolverModule />}
          {activeView === 'calendar' && <CalendarModule />}
          {activeView === 'store' && <StoreModule />}
          {activeView === 'profile' && <ProfileModule />}
        </main>
      </div>

      {/* GLOBÁLNÍ HLASOVÉ OVLÁDÁNÍ */}
      <VoiceControl activeView={activeView} setActiveView={setActiveView} />

    </div>
  );
      }
