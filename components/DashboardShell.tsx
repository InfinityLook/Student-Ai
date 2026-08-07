'use client';

import React, { useState } from 'react';
import { 
  Layers, 
  Calculator, 
  Calendar, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  Zap, 
  Search
} from 'lucide-react';

import CalendarModule from './modules/CalendarModule';

export default function DashboardShell() {
  const [activeView, setActiveView] = useState('calendar');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userCredits] = useState(250);

  const menuItems = [
    { id: 'flashcards', label: 'Kartičky', icon: Layers },
    { id: 'solver', label: 'AI Řešitel', icon: Calculator },
    { id: 'calendar', label: 'Kalendář událostí', icon: Calendar },
    { id: 'store', label: 'Obchod', icon: ShoppingBag },
    { id: 'profile', label: 'Můj profil', icon: User }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row antialiased">
      
      {/* DESKTOPOVÝ SIDEBAR */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-5 flex flex-col justify-between hidden md:flex flex-shrink-0">
        <div className="space-y-6">
          
          {/* Logo */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center font-black text-white text-base shadow-lg shadow-indigo-600/30">
              S
            </div>
            <span className="font-bold text-base text-white tracking-tight">Student AI</span>
          </div>

          {/* Menu */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Kredity */}
        <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex items-center justify-between text-xs">
          <span className="text-slate-400">Kredity</span>
          <span className="font-bold text-indigo-400 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" />
            {userCredits}
          </span>
        </div>
      </aside>

      {/* MOBILNÍ NAVIGACE */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-xs">
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

      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-slate-950/95 z-30 pt-20 p-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold ${
                  activeView === item.id ? 'bg-indigo-600 text-white' : 'text-slate-400 bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* OBSAH */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 overflow-y-auto">
          {activeView === 'calendar' && <CalendarModule />}
          {activeView !== 'calendar' && (
            <div className="p-8 text-center text-slate-500 text-xs">
              Sekce je připravena k používání.
            </div>
          )}
        </main>
      </div>

    </div>
  );
                         }
