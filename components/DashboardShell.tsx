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
  Trophy, 
  Database 
} from 'lucide-react';

export default function DashboardShell() {
  const [activeView, setActiveView] = useState('workspace');
  const [userCredits] = useState(250);

  const navItems = [
    { id: 'workspace', label: 'Workspace', icon: LayoutGrid },
    { id: 'pet', label: 'Mazlíček', icon: Heart },
    { id: 'rewards', label: 'Odměny', icon: Trophy },
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'store', label: 'Obchod', icon: ShoppingBag },
    { id: 'storage', label: 'Úložiště', icon: Database },
    { id: 'settings', label: 'Nastavení', icon: Settings },
  ];

  // Pomocná komponenta pro brutální kartu
  const BrutalistCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${className}`}>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-black font-sans selection:bg-yellow-300 pb-36">
      
      {/* Top Bar */}
      <header className="border-b-2 border-black px-6 py-4 flex justify-between items-center bg-white sticky top-0 z-40">
        <div className="font-black text-xl tracking-tight flex items-center gap-2">
          <span className="bg-black text-white px-2 py-0.5 text-xs">AI</span>
          STUDENT<span className="text-indigo-600">.</span>
        </div>
        <div 
          onClick={() => setActiveView('store')}
          className="border-2 border-black px-4 py-1.5 font-bold text-xs bg-yellow-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1.5 cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
        >
          <Zap className="w-3.5 h-3.5 fill-black" />
          <span>{userCredits} Kreditů</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 md:p-10 max-w-5xl mx-auto space-y-6">
        
        {activeView === 'workspace' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-black tracking-tight mb-2">Studijní Workspace</h1>
              <p className="text-sm font-medium text-slate-600">Vše pro úspěšné zvládnutí studia na jednom místě.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-indigo-500 text-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
                <div>
                  <CalendarDays className="w-8 h-8 mb-4" />
                  <h2 className="text-2xl font-black mb-1">Kalendář & Úkoly</h2>
                  <p className="text-sm opacity-90">Sledujte nadcházející termíny zkoušek.</p>
                </div>
                <button 
                  onClick={() => setActiveView('workspace')} 
                  className="mt-6 bg-white text-black font-bold px-4 py-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all w-fit text-xs cursor-pointer"
                >
                  Otevřít kalendář
                </button>
              </div>

              <div className="bg-emerald-400 text-black border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
                <div>
                  <Calculator className="w-8 h-8 mb-4" />
                  <h2 className="text-2xl font-black mb-1">AI Řešitel</h2>
                  <p className="text-sm opacity-90">Okamžitý výpočet složitých příkladů.</p>
                </div>
                <button className="mt-6 bg-black text-white font-bold px-4 py-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all w-fit text-xs cursor-pointer">
                  Spustit řešitel
                </button>
              </div>
            </div>
          </div>
        )}

        {activeView === 'pet' && (
          <BrutalistCard className="max-w-xl mx-auto text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-pink-400 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center animate-bounce">
              <Heart className="w-10 h-10 fill-current text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black">Studijní Mazlíček</h2>
              <p className="text-xs font-semibold text-slate-600 mt-1">Úroveň 3 • Roste s každým splněným úkolem</p>
            </div>
            <div className="border-2 border-black p-4 bg-slate-50 space-y-2 text-left">
              <div className="flex justify-between text-xs font-bold">
                <span>XP Progress</span>
                <span>75 / 100 XP</span>
              </div>
              <div className="w-full bg-white border-2 border-black h-4 overflow-hidden">
                <div className="bg-pink-400 h-full w-[75%]" />
              </div>
            </div>
          </BrutalistCard>
        )}

        {activeView === 'rewards' && (
          <BrutalistCard className="max-w-xl mx-auto space-y-6 text-center">
            <Trophy className="w-12 h-12 text-yellow-500 mx-auto" />
            <h2 className="text-2xl font-black">Tvé Odměny</h2>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square border-2 border-black bg-yellow-100 flex items-center justify-center text-3xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  🏆
                </div>
              ))}
            </div>
          </BrutalistCard>
        )}

        {activeView === 'profile' && (
          <BrutalistCard className="max-w-xl mx-auto space-y-4">
            <h2 className="text-2xl font-black">Můj Profil</h2>
            <div className="flex items-center gap-4 border-2 border-black p-4 bg-yellow-50">
              <div className="w-12 h-12 bg-black text-white font-bold flex items-center justify-center">ST</div>
              <div>
                <h3 className="font-bold">Aktivní Student</h3>
                <p className="text-xs text-slate-600">student@skola.cz</p>
              </div>
            </div>
          </BrutalistCard>
        )}

        {activeView === 'store' && (
          <BrutalistCard className="max-w-xl mx-auto space-y-6 text-center bg-indigo-50">
            <h2 className="text-2xl font-black">Obchod s kredity</h2>
            <p className="text-xs font-medium text-slate-600">Získejte neomezené možnosti s AI kredity.</p>
            <div className="border-2 border-black p-6 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
              <h3 className="font-black text-lg">Student Pro Pack</h3>
              <p className="text-3xl font-black text-indigo-600">500 kreditů</p>
              <button className="w-full py-3 bg-black text-white font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all text-xs cursor-pointer">
                Zakoupit za 199 Kč
              </button>
            </div>
          </BrutalistCard>
        )}

        {activeView === 'storage' && (
          <BrutalistCard className="max-w-xl mx-auto space-y-6">
            <h2 className="text-2xl font-black flex items-center gap-3">
              <Database className="text-blue-600" /> Úložiště souborů
            </h2>
            <div className="border-2 border-black p-4 bg-slate-50 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span>Využití cloudu</span>
                <span>1.2 GB / 5 GB</span>
              </div>
              <div className="w-full bg-white border-2 border-black h-4 overflow-hidden">
                <div className="bg-blue-500 h-full w-[24%]" />
              </div>
            </div>
          </BrutalistCard>
        )}

        {activeView === 'settings' && (
          <BrutalistCard className="max-w-xl mx-auto space-y-4">
            <h2 className="text-2xl font-black">Nastavení</h2>
            <div className="space-y-3 text-xs font-bold">
              <div className="flex justify-between items-center border-2 border-black p-4 bg-slate-50">
                <span>Vzhled systému</span>
                <span className="bg-yellow-300 border border-black px-2 py-1">Neo-Brutalism</span>
              </div>
              <div className="flex justify-between items-center border-2 border-black p-4 bg-slate-50">
                <span>Notifikace</span>
                <span className="bg-emerald-300 border border-black px-2 py-1">Aktivní</span>
              </div>
            </div>
          </BrutalistCard>
        )}

      </main>

      {/* Floating Dock */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 border-2 border-black bg-white p-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`p-3 border-2 border-black transition-all cursor-pointer ${
                isActive 
                  ? 'bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[1px] translate-y-[1px]' 
                  : 'bg-white text-black hover:bg-slate-100'
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
