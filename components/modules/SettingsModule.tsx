'use client';

import React from 'react';
import { useStore } from '@/store/useStore';
import { Settings, Moon, Bell, Volume2, Database } from 'lucide-react';

export default function SettingsModule() {
  const addNotification = useStore((state) => state.addNotification);

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
          <Settings className="w-7 h-7 text-teal-400" />
          <span>Nastavení Aplikace</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Správa předvoleb, zvuku, oznámení a zálohování dat.
        </p>
      </div>

      <div className="space-y-4">
        {/* Vzhled & Téma */}
        <div className="bg-slate-800/50 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-800 text-teal-400">
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-white">Tmavý režim</h3>
              <p className="text-xs text-slate-400">Výchozí tmavý vzhled prostředí</p>
            </div>
          </div>
          <span className="text-xs text-teal-400 font-semibold bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">Aktivní</span>
        </div>

        {/* Zvuk & Hlas Kairo */}
        <div className="bg-slate-800/50 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-800 text-purple-400">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-white">Hlasová syntéza (Kairo)</h3>
              <p className="text-xs text-slate-400">Přehrávání hlasu asistenta</p>
            </div>
          </div>
          <input type="checkbox" defaultChecked className="w-4 h-4 accent-cyan-500 cursor-pointer" />
        </div>

        {/* Notifikace */}
        <div className="bg-slate-800/50 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-800 text-amber-400">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-white">Notifikace a Připomínky</h3>
              <p className="text-xs text-slate-400">Upozornění na úkoly a studijní plány</p>
            </div>
          </div>
          <input type="checkbox" defaultChecked className="w-4 h-4 accent-cyan-500 cursor-pointer" />
        </div>

        {/* Záloha & Data */}
        <div className="bg-slate-800/50 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-800 text-blue-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-white">Ukládání dat</h3>
              <p className="text-xs text-slate-400">Automatické ukládání do místního úložiště</p>
            </div>
          </div>
          <button 
            onClick={() => addNotification('Data byla úspěšně synchornizována.', 'success')}
            className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 px-3 py-1.5 rounded-xl border border-cyan-500/20 transition-colors"
          >
            Uložit data
          </button>
        </div>
      </div>
    </div>
  );
}
