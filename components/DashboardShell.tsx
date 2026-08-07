'use client';

import React, { useState } from 'react';
import { 
  Layers, 
  Calculator, 
  CalendarDays, 
  ShoppingBag, 
  User 
} from 'lucide-react';

import CalendarModule from './modules/CalendarModule';

export default function DashboardShell() {
  const [activeView, setActiveView] = useState('calendar');

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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-5 flex flex-col justify-between hidden md:flex flex-shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-2 px-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center font-extrabold text-white">S</div>
            <span className="font-bold text-lg text-white">Student AI</span>
          </div>

          <nav className="space-y-6">
            {navSections.map((sec, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 px-2">
                  {sec.title}
                </div>
                <div className="space-y-1">
                  {sec.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveView(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                          activeView === item.id
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
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
          </nav>
        </div>
      </aside>

      {/* OBSAH */}
      <main className="flex-1 overflow-y-auto">
        {activeView === 'calendar' && <CalendarModule />}
        {activeView !== 'calendar' && (
          <div className="p-8 text-center text-slate-500 text-xs">
            Sekce je připravena k používání.
          </div>
        )}
      </main>
    </div>
  );
}
