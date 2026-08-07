'use client';

import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import { 
  Dog, 
  Heart, 
  Zap, 
  Smile, 
  Utensils, 
  Gamepad2, 
  Moon, 
  Sparkles, 
  Coins, 
  Award,
  TrendingUp,
  RefreshCw
} from 'lucide-react';

export default function PetModule() {
  const credits = useStore((state) => state.credits);
  const deductCredits = useStore((state) => state.deductCredits);
  const addNotification = useStore((state) => state.addNotification);

  // Stav mazlíčka
  const [petName, setPetName] = useState('Byte');
  const [level, setLevel] = useState(3);
  const [xp, setXp] = useState(65);
  const maxXp = 100;

  const [hunger, setHunger] = useState(70); // 0-100 (100 = najedený)
  const [happiness, setHappiness] = useState(85); // 0-100
  const [energy, setEnergy] = useState(60); // 0-100

  // Krmení mazlíčka
  const handleFeed = () => {
    const cost = 15;
    if (credits < cost) {
      addNotification(`Nedostatek kreditů! Potřebuješ ${cost} K.`, 'error');
      return;
    }
    if (hunger >= 100) {
      addNotification(`${petName} už nemá hlad!`, 'info');
      return;
    }

    deductCredits(cost);
    setHunger((prev) => Math.min(100, prev + 25));
    setHappiness((prev) => Math.min(100, prev + 5));
    addNotification(`${petName} se napapal! (+25% Jídlo)`, 'success');
  };

  // Hraní si s mazlíčkem
  const handlePlay = () => {
    if (energy < 15) {
      addNotification(`${petName} je příliš unavený na hraní!`, 'error');
      return;
    }

    setEnergy((prev) => Math.max(0, prev - 15));
    setHappiness((prev) => Math.min(100, prev + 20));

    // Přidání XP
    const newXp = xp + 15;
    if (newXp >= maxXp) {
      setLevel((prev) => prev + 1);
      setXp(newXp - maxXp);
      addNotification(`🎉 ${petName} postoupil na Level ${level + 1}!`, 'success');
    } else {
      setXp(newXp);
      addNotification(`Aktivita dokončena! (+15 XP)`, 'success');
    }
  };

  // Odpočinek
  const handleRest = () => {
    if (energy >= 100) {
      addNotification(`${petName} je plný energie!`, 'info');
      return;
    }
    setEnergy(100);
    setHunger((prev) => Math.max(0, prev - 10));
    addNotification(`${petName} se vyspal a nabral sílu!`, 'success');
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      {/* Hlavička */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
            <Dog className="w-7 h-7 text-pink-400" />
            <span>Studijní Mazlíček</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Staraj se o svého parťáka za kredity získané ze studia.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto bg-amber-500/10 text-amber-400 px-3 py-1.5 rounded-xl text-xs font-semibold border border-amber-500/20">
          <Coins className="w-4 h-4" />
          <span>{credits} K</span>
        </div>
      </div>

      {/* Kartu Mazlíčka */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Vizualizace Mazlíčka */}
        <div className="md:col-span-1 bg-gradient-to-b from-pink-900/20 to-slate-900 border border-pink-500/20 rounded-3xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
          {/* Odznak Levelu */}
          <div className="absolute top-4 left-4 bg-pink-500/20 border border-pink-500/30 text-pink-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <Award className="w-3.5 h-3.5" />
            <span>LVL {level}</span>
          </div>

          {/* Avatar / Ikona */}
          <div className="relative my-6 group">
            <div className="absolute -inset-4 bg-pink-500/20 rounded-full blur-xl group-hover:bg-pink-500/30 transition-all"></div>
            <div className="relative w-28 h-28 bg-slate-800 border-2 border-pink-400/50 rounded-full flex items-center justify-center shadow-2xl">
              <Dog className="w-16 h-16 text-pink-400 animate-bounce" />
            </div>
          </div>

          {/* Jméno a XP Bar */}
          <h2 className="text-xl font-bold text-white">{petName}</h2>
          <p className="text-xs text-slate-400 mb-4">Virtuální studijní společník</p>

          <div className="w-full space-y-1.5">
            <div className="flex justify-between text-[11px] font-semibold text-slate-400">
              <span className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-pink-400" /> Zkušenosti (XP)
              </span>
              <span>{xp} / {maxXp}</span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-700/50">
              <div 
                className="bg-gradient-to-r from-pink-500 to-purple-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${(xp / maxXp) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Statistiky a Akce */}
        <div className="md:col-span-2 space-y-6 flex flex-col justify-between">
          {/* Statistiky potřeba */}
          <div className="bg-slate-800/50 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Stav mazlíčka</span>
            </h3>

            {/* Jídlo / Hlad */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5 text-amber-400" /> Sytost
                </span>
                <span className="font-bold">{hunger}%</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full transition-all duration-300" style={{ width: `${hunger}%` }}></div>
              </div>
            </div>

            {/* Spokojenost */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Smile className="w-3.5 h-3.5 text-emerald-400" /> Nálada
                </span>
                <span className="font-bold">{happiness}%</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full transition-all duration-300" style={{ width: `${happiness}%` }}></div>
              </div>
            </div>

            {/* Energie */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" /> Energie
                </span>
                <span className="font-bold">{energy}%</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div className="bg-cyan-400 h-full rounded-full transition-all duration-300" style={{ width: `${energy}%` }}></div>
              </div>
            </div>
          </div>

          {/* Tlačítka Akcí */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={handleFeed}
              className="flex flex-col items-center justify-center p-4 bg-slate-800/80 border border-amber-500/30 hover:border-amber-500 rounded-2xl transition-all group hover:bg-slate-800"
            >
              <Utensils className="w-6 h-6 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-white">Nakrmit</span>
              <span className="text-[10px] text-amber-400 font-semibold mt-0.5">15 Kreditů</span>
            </button>

            <button
              onClick={handlePlay}
              className="flex flex-col items-center justify-center p-4 bg-slate-800/80 border border-emerald-500/30 hover:border-emerald-500 rounded-2xl transition-all group hover:bg-slate-800"
            >
              <Gamepad2 className="w-6 h-6 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-white">Hrát si</span>
              <span className="text-[10px] text-emerald-400 font-semibold mt-0.5">+15 XP (-15% Energ.)</span>
            </button>

            <button
              onClick={handleRest}
              className="flex flex-col items-center justify-center p-4 bg-slate-800/80 border border-cyan-500/30 hover:border-cyan-500 rounded-2xl transition-all group hover:bg-slate-800"
            >
              <Moon className="w-6 h-6 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-white">Spánek</span>
              <span className="text-[10px] text-cyan-400 font-semibold mt-0.5">Obnoví Energii</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  }
  
