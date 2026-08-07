'use client';

import React from 'react';
import { ArrowLeft, BarChart3, TrendingUp, Clock, Award } from 'lucide-react';

export default function AnalyticsModule({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition cursor-pointer bg-white/5 px-4 py-2 rounded-xl border border-white/10"
      >
        <ArrowLeft className="w-4 h-4" /> Zpět do Workspace
      </button>

      <div className="flex items-center gap-3">
        <BarChart3 className="w-8 h-8 text-cyan-400" />
        <h1 className="text-3xl font-black text-white">Statistiky & Analytika</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
            <span>Celkový čas učení</span>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-3xl font-black text-white">14.5 hod</p>
          <p className="text-xs text-emerald-400">+12% tento týden</p>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
            <span>Průměrné skóre</span>
            <Award className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-3xl font-black text-white">88%</p>
          <p className="text-xs text-purple-400">Skvělý výsledek</p>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
            <span>Aktivní Streak</span>
            <TrendingUp className="w-4 h-4 text-pink-400" />
          </div>
          <p className="text-3xl font-black text-white">3 dny</p>
          <p className="text-xs text-pink-400">Nepřetržitě</p>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-4">
        <h3 className="text-lg font-bold text-white">Týdenní aktivita</h3>
        <div className="h-48 flex items-end justify-between gap-2 pt-6">
          {['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'].map((day, idx) => {
            const heights = ['h-[40%]', 'h-[70%]', 'h-[30%]', 'h-[90%]', 'h-[60%]', 'h-[80%]', 'h-[50%]'];
            return (
              <div key={day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div className={`w-full bg-gradient-to-t from-cyan-500 to-indigo-500 rounded-xl ${heights[idx]} transition-all hover:opacity-80`} />
                <span className="text-xs text-slate-400 font-bold">{day}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
