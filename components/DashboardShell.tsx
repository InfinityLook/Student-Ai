'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  CalendarDays, 
  ShoppingBag, 
  User, 
  LayoutGrid, 
  Zap, 
  Heart, 
  Settings, 
  Trophy, 
  Database,
  Sparkles,
  Flame,
  ArrowRight
} from 'lucide-react';
import CalendarModule from './modules/CalendarModule';

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

  const renderView = () => {
    switch (activeView) {
      case 'workspace':
        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20 inline-flex items-center gap-1.5 mb-3">
                  <Flame className="w-3.5 h-3.5 text-pink-400" /> 3 denní streak! 🔥
                </span>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">
                  Studijní <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">Workspace</span> ⚡
                </h1>
              </div>
            </div>

            {/* Hlavní karty ve Workspace */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Kliknutelná karta kalendáře, která hodí uživatele do modulu kalendáře */}
              <div 
                onClick={() => setActiveView('calendar')}
                className="group relative overflow-hidden rounded-[28px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 p-7 hover:border-pink-500/50 transition-all duration-300 hover:scale-[1.01] cursor-pointer flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl group-hover:bg-pink-500/20 transition-all" />
                <div>
                  <CalendarDays className="w-9 h-9 text-pink-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-1">Kalendář & Zkoušky</h3>
                  <p className="text-sm text-slate-400">Máš 3 nadcházející termíny. Zobrazit detail. 🚀</p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-xs font-bold text-pink-400 group-hover:translate-x-1 transition-transform">
                  <span>Otevřít kalendář</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Karta 2: AI Řešitel */}
              <div className="group relative overflow-hidden rounded-[28px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 p-7 hover:border-cyan-500/50 transition-all duration-300 hover:scale-[1.01] cursor-pointer flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all" />
                <div>
                  <Calculator className="w-9 h-9 text-cyan-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-1">AI Řešitel Úloh</h3>
                  <p className="text-sm text-slate-400">Zasekl ses na příkladu? Nech si ho vysvětlit.</p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
                  <span>Spustit řešitel</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        );
      case 'calendar':
        return <CalendarModule onBack={() => setActiveView('workspace')} />;
      case 'pet':
        return (
          <div className="rounded-[32px] bg-gradient-to-b from-purple-900/20 to-black/40 border border-purple-500/20 p-8 max-w-xl mx-auto text-center space-y-6 backdrop-blur-xl">
            <div className="w-28 h-28 mx-auto bg-gradient-to-tr from-pink-500 to-purple-600 rounded-[32px] flex items-center justify-center shadow-2xl shadow-pink-500/30 animate-pulse">
              <Heart className="w-14 h-14 text-white fill-white/20" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">Tvůj AI Mazlíček</h2>
              <p className="text-xs text-purple-300 mt-1">Nálada: Skvělá ✨ • Level 4</p>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-2 text-left">
              <div className="flex justify-between text-xs font-bold text-slate-300">
                <span>XP do dalšího levlu</span>
                <span>85 / 100 XP</span>
              </div>
              <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden p-0.5">
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-full rounded-full w-[85%]" />
              </div>
            </div>
          </div>
        );
      case 'rewards':
        return (
          <div className="rounded-[32px] bg-white/[0.03] border border-white/10 p-8 max-w-2xl mx-auto text-center space-y-6 backdrop-blur-xl">
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto animate-bounce" />
            <h2 className="text-2xl font-black text-white">Síň slávy & Odměny</h2>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl hover:bg-white/10 transition cursor-pointer">
                  🔥
                </div>
              ))}
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="rounded-[32px] bg-white/[0.03] border border-white/10 p-8 max-w-xl mx-auto space-y-6 backdrop-blur-xl">
            <h2 className="text-2xl font-black text-white">Profil</h2>
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500 to-indigo-500 flex items-center justify-center font-bold text-white text-lg">
                ST
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Hustler Student</h3>
                <p className="text-xs text-slate-400">student@skola.cz</p>
              </div>
            </div>
          </div>
        );
      case 'store':
        return (
          <div className="rounded-[32px] bg-white/[0.03] border border-white/10 p-8 max-w-xl mx-auto text-center space-y-6 backdrop-blur-xl">
            <h2 className="text-2xl font-black text-white">Obchod s kredity</h2>
            <div className="bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-indigo-500/10 border border-pink-500/30 p-6 rounded-[28px] space-y-4">
              <h3 className="font-bold text-white text-lg">Mega Boost Pack</h3>
              <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">500 kreditů</p>
              <button className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white font-bold rounded-2xl text-xs transition shadow-lg shadow-pink-500/25 cursor-pointer">
                Koupit za 199 Kč 🚀
              </button>
            </div>
          </div>
        );
      case 'storage':
        return (
          <div className="rounded-[32px] bg-white/[0.03] border border-white/10 p-8 max-w-xl mx-auto space-y-6 backdrop-blur-xl">
            <h2 className="text-2xl font-black text-white flex items-center gap-3">
              <Database className="text-cyan-400" /> Úložiště souborů
            </h2>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-3">
              <div className="flex justify-between text-xs text-slate-300 font-bold">
                <span>Využitý prostor</span>
                <span>1.2 GB / 5 GB</span>
              </div>
              <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden p-0.5">
                <div className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-full rounded-full w-[24%]" />
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="rounded-[32px] bg-white/[0.03] border border-white/10 p-8 max-w-xl mx-auto space-y-6 backdrop-blur-xl">
            <h2 className="text-2xl font-black text-white">Nastavení</h2>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                <span className="text-slate-300 font-medium">Vibe režim</span>
                <span className="text-pink-400 font-bold">Ultra Dark 🌌</span>
              </div>
              <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                <span className="text-slate-300 font-medium">Notifikace</span>
                <span className="text-emerald-400 font-bold">Zapnuté</span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-white font-sans overflow-x-hidden selection:bg-pink-500/30 pb-36">
      
      {/* Glow mesh pozadí */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-pink-600/15 rounded-full blur-[140px]" />
      </div>

      {/* Top Bar */}
      <header className="fixed top-0 w-full z-40 px-6 py-4 flex justify-between items-center bg-[#07090E]/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center font-black text-sm shadow-lg shadow-pink-500/20">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-black tracking-wider text-sm bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            STUDENT.AI
          </span>
        </div>
        <div 
          onClick={() => setActiveView('store')}
          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all shadow-sm"
        >
          <Zap className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
          <span>{userCredits} Kreditů</span>
        </div>
      </header>

      {/* Hlavní obsah s animací */}
      <main className="relative z-10 pt-28 px-4 md:px-8 max-w-5xl mx-auto min-h-[75vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 10, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.99 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Plovoucí dock */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 p-2 rounded-[28px] bg-black/60 backdrop-blur-2xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id || (activeView === 'calendar' && item.id === 'workspace');
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`relative flex items-center justify-center p-3.5 rounded-2xl transition-all duration-300 ease-out group cursor-pointer ${
                isActive 
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/25 scale-105' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
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
