'use client';

import React from 'react';
import { useStore } from '@/store/useStore';
import { 
  Bot, 
  Sparkles, 
  BrainCircuit, 
  FileText, 
  Edit3, 
  Grid3X3,
  Wrench,
  GraduationCap,
  ArrowRight
} from 'lucide-react';

export default function MenuHubModule() {
  const setActiveModule = useStore((state) => state.setActiveModule);

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      {/* Hlavička Hubu */}
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
          <GraduationCap className="w-8 h-8 text-cyan-400" />
          <span>Studijní Hub</span>
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Všechny tvoje studijní nástroje a AI asistenti na jednom místě.
        </p>
      </div>

      {/* Rychlý přechod na Plochu */}
      <div 
        onClick={() => setActiveModule('plocha')}
        className="bg-gradient-to-r from-cyan-900/30 via-slate-800/80 to-blue-900/30 border border-cyan-500/30 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer hover:border-cyan-500/60 transition-all group shadow-xl"
      >
        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-cyan-500/20 text-cyan-400 rounded-2xl border border-cyan-500/30 group-hover:scale-110 transition-transform">
            <Grid3X3 className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
              Moje Plocha
            </h2>
            <p className="text-xs text-slate-400">
              Přizpůsobitelný 3×5 mřížkový rozcestník pro nejčastější zástupce
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 bg-cyan-500/10 px-4 py-2 rounded-xl border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-all">
          <span>Otevřít plochu</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* Sekce: AI & Učení */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-200 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <span>AI & Studium</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Kairo AI */}
          <div 
            onClick={() => setActiveModule('kairo')}
            className="bg-slate-800/50 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-5 cursor-pointer transition-all hover:scale-[1.02] hover:bg-slate-800 group"
          >
            <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl w-fit mb-3 group-hover:bg-cyan-500/20 transition-colors">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-sm mb-1">Kairo AI</h3>
            <p className="text-xs text-slate-400">Chytrý osobní lektor a hlasový asistent</p>
          </div>

          {/* AI Řešitel */}
          <div 
            onClick={() => setActiveModule('solver')}
            className="bg-slate-800/50 border border-slate-800 hover:border-purple-500/50 rounded-2xl p-5 cursor-pointer transition-all hover:scale-[1.02] hover:bg-slate-800 group"
          >
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl w-fit mb-3 group-hover:bg-purple-500/20 transition-colors">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-sm mb-1">AI Řešitel</h3>
            <p className="text-xs text-slate-400">Příklady, rovnice a vysvětlení látky krok za krokem</p>
          </div>

          {/* Kartičky */}
          <div 
            onClick={() => setActiveModule('flashcards')}
            className="bg-slate-800/50 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-5 cursor-pointer transition-all hover:scale-[1.02] hover:bg-slate-800 group"
          >
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl w-fit mb-3 group-hover:bg-emerald-500/20 transition-colors">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-sm mb-1">Kartičky</h3>
            <p className="text-xs text-slate-400">Interaktivní opakovací kartičky s algoritmem paměti</p>
          </div>
        </div>
      </div>

      {/* Sekce: Nástroje (pouze Poznámky a Editor) */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-200 flex items-center gap-2">
          <Wrench className="w-5 h-5 text-amber-400" />
          <span>Nástroje</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Poznámky */}
          <div 
            onClick={() => setActiveModule('notes')}
            className="bg-slate-800/50 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-5 cursor-pointer transition-all hover:scale-[1.02] hover:bg-slate-800 group"
          >
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl w-fit mb-3 group-hover:bg-amber-500/20 transition-colors">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-sm mb-1">Poznámky</h3>
            <p className="text-xs text-slate-400">Rychlé zápisky z hodin a přehledy předmětů</p>
          </div>

          {/* Textový Editor */}
          <div 
            onClick={() => setActiveModule('editor')}
            className="bg-slate-800/50 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-5 cursor-pointer transition-all hover:scale-[1.02] hover:bg-slate-800 group"
          >
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl w-fit mb-3 group-hover:bg-blue-500/20 transition-colors">
              <Edit3 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-sm mb-1">Textový Editor</h3>
            <p className="text-xs text-slate-400">Plnohodnotný dokumentový editor s exportem</p>
          </div>
        </div>
      </div>
    </div>
  );
}
