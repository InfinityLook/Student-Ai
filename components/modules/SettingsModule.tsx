'use client';

import React, { useState, useEffect } from 'react';
import { Settings, ArrowLeft, Bell, Volume2, Moon, Database, Trash2, Check } from 'lucide-react';

interface SettingsModuleProps {
  onBack?: () => void;
}

export default function SettingsModule({ onBack }: SettingsModuleProps) {
  const [vibeMode, setVibeMode] = useState('Ultra Dark 🌌');
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(false);
  const [savedMessage, setSavedMessage] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('student_ai_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.vibeMode) setVibeMode(parsed.vibeMode);
        if (typeof parsed.notifications === 'boolean') setNotifications(parsed.notifications);
        if (typeof parsed.soundEffects === 'boolean') setSoundEffects(parsed.soundEffects);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSave = () => {
    const settings = { vibeMode, notifications, soundEffects };
    localStorage.setItem('student_ai_settings', JSON.stringify(settings));
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2000);
  };

  const handleResetData = () => {
    if (confirm('Opravdu chceš vymazat všechna lokální data (poznámky, testy, kartičky)?')) {
      localStorage.clear();
      alert('Data byla vymazána.');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto pb-12">
      {onBack && (
        <button 
          onClick={onBack}
          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold transition flex items-center gap-2 cursor-pointer w-fit text-slate-300"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět na Workspace
        </button>
      )}

      <div className="rounded-[32px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 p-8 backdrop-blur-xl shadow-2xl space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-white/10">
          <Settings className="w-6 h-6 text-pink-400" />
          <h2 className="text-xl font-black text-white">Nastavení aplikace</h2>
        </div>

        <div className="space-y-4">
          {/* Vibe režim */}
          <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3">
              <Moon className="w-4 h-4 text-purple-400" />
              <div>
                <span className="text-xs font-bold text-white block">Vibe režim</span>
                <span className="text-[11px] text-slate-400">Vzhled a atmosféra prostředí</span>
              </div>
            </div>
            <select
              value={vibeMode}
              onChange={(e) => setVibeMode(e.target.value)}
              className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-pink-500 cursor-pointer"
            >
              <option value="Ultra Dark 🌌">Ultra Dark 🌌</option>
              <option value="Cyber Neon ⚡">Cyber Neon ⚡</option>
              <option value="Deep Space 🪐">Deep Space 🪐</option>
            </select>
          </div>

          {/* Notifikace */}
          <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-pink-400" />
              <div>
                <span className="text-xs font-bold text-white block">Notifikace</span>
                <span className="text-[11px] text-slate-400">Připomínky zkoušek a streaku</span>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 rounded-full transition-colors relative p-1 cursor-pointer ${
                notifications ? 'bg-pink-500' : 'bg-white/10'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                notifications ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* Zvukové efekty */}
          <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3">
              <Volume2 className="w-4 h-4 text-cyan-400" />
              <div>
                <span className="text-xs font-bold text-white block">Zvukové efekty</span>
                <span className="text-[11px] text-slate-400">Zvuky při dokončení úkolů a timeru</span>
              </div>
            </div>
            <button
              onClick={() => setSoundEffects(!soundEffects)}
              className={`w-12 h-6 rounded-full transition-colors relative p-1 cursor-pointer ${
                soundEffects ? 'bg-cyan-500' : 'bg-white/10'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                soundEffects ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* Správa dat */}
          <div className="flex justify-between items-center bg-red-500/5 p-4 rounded-2xl border border-red-500/20">
            <div className="flex items-center gap-3">
              <Database className="w-4 h-4 text-red-400" />
              <div>
                <span className="text-xs font-bold text-white block">Reset dat</span>
                <span className="text-[11px] text-slate-400">Smaže veškerý lokální obsah</span>
              </div>
            </div>
            <button
              onClick={handleResetData}
              className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" /> Smazat
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          {savedMessage ? (
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
              <Check className="w-4 h-4" /> Uloženo!
            </span>
          ) : (
            <span />
          )}
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white font-extrabold rounded-xl text-xs transition shadow-lg shadow-pink-500/25 cursor-pointer"
          >
            Uložit nastavení
          </button>
        </div>
      </div>
    </div>
  );
}
