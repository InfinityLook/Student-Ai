'use client';

import React from 'react';
import { 
  Edit3, 
  Sparkles, 
  Clock, 
  Wand2, 
  FileCheck, 
  Rocket, 
  Bot,
  Zap
} from 'lucide-react';

export default function DocumentEditorModule() {
  return (
    <div className="h-full min-h-[80vh] flex flex-col items-center justify-center p-6 relative overflow-hidden bg-slate-900 text-slate-100">
      
      {/* Svetelný animovaný efekt v pozadí */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-600/10 rounded-full blur-2xl pointer-events-none animate-pulse delay-700" />

      {/* Hlavní karta */}
      <div className="relative z-10 max-w-md w-full bg-slate-950/70 border border-slate-800/80 rounded-3xl p-8 md:p-10 backdrop-blur-xl shadow-2xl text-center space-y-6">
        
        {/* Animovaná ikona s točícím se prstencem */}
        <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
          {/* Točící se čárkovaný prstenec */}
          <div className="absolute inset-0 rounded-3xl border-2 border-dashed border-cyan-500/40 animate-[spin_12s_linear_infinite]" />
          
          {/* Pulzující pozadí ikony */}
          <div className="absolute inset-1 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 animate-pulse" />
          
          {/* Ikona */}
          <div className="relative p-5 bg-slate-900/90 rounded-2xl border border-cyan-500/30 text-cyan-400 shadow-lg shadow-cyan-500/20">
            <Edit3 className="w-10 h-10 animate-bounce" />
          </div>

          {/* Odznáček se jiskrou */}
          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 p-1.5 rounded-full shadow-lg">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        {/* Nadpis a status */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wide">
            <Clock className="w-3.5 h-3.5 animate-spin" />
            <span>PŘIPRAVUJEME NÁSTROJ</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Textový Editor <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">2.0</span>
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
            Inteligenci nabitý dokumentový editor s AI asistentem Kairo, exportem do PDF a pokročilým formátováním.
          </p>
        </div>

        {/* Ukazatel průběhu vývoje */}
        <div className="space-y-2 pt-2">
          <div className="flex justify-between text-xs font-medium text-slate-400">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Wand2 className="w-3.5 h-3.5" /> Vývoj probíhá...
            </span>
            <span className="font-mono text-slate-300 font-bold">85 %</span>
          </div>
          
          <div className="w-full bg-slate-900 border border-slate-800 rounded-full h-3 overflow-hidden p-0.5">
            <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 h-full rounded-full w-[85%] animate-pulse shadow-sm shadow-cyan-500/50 transition-all duration-500" />
          </div>
        </div>

        {/* Ukázka chystaných funkcí */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800/80 text-left">
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-2.5">
            <FileCheck className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-slate-200">Export do PDF</div>
              <div className="text-[10px] text-slate-500">Stahování 1-klikem</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-2.5">
            <Bot className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-slate-200">AI Stylistika</div>
              <div className="text-[10px] text-slate-500">Oprava & rewrite</div>
            </div>
          </div>
        </div>

        {/* Oznámení spuštění */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Bude zpřístupněno v nadcházející aktualizaci</span>
        </div>

      </div>
    </div>
  );
}
