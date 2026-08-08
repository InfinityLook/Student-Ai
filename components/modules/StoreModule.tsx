'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  ArrowLeft, 
  Zap, 
  Sparkles, 
  ShieldCheck, 
  Flame, 
  Award, 
  CheckCircle2,
  Cpu
} from 'lucide-react';

interface StoreModuleProps {
  onBack: () => void;
  userCredits: number;
  onAddCredits: (amount: number) => void;
}

export default function StoreModule({ onBack, userCredits, onAddCredits }: StoreModuleProps) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handlePurchase = (name: string, credits: number, price: string) => {
    onAddCredits(credits);
    setSuccessMessage(`Úspěšně zakoupeno: ${name}! Přičteno +${credits} kreditů. 🎉`);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 4000);
  };

  const creditPacks = [
    { 
      id: 1, 
      name: 'Starter Pack', 
      credits: 100, 
      price: '49 Kč', 
      desc: 'Ideální na vyzkoušení AI funkcí a rychlé úkoly.',
      popular: false,
      gradient: 'from-slate-500/10 to-cyan-500/10',
      border: 'border-white/10',
      iconColor: 'text-slate-300'
    },
    { 
      id: 2, 
      name: 'Mega Cyber Pack', 
      credits: 500, 
      price: '199 Kč', 
      desc: 'Nejvýhodnější volba pro aktivní studenty na zkouškové období.',
      popular: true,
      gradient: 'from-pink-500/15 via-purple-500/15 to-indigo-500/15',
      border: 'border-pink-500/40',
      iconColor: 'text-pink-400'
    },
    { 
      id: 3, 
      name: 'Ultimate AI Master', 
      credits: 1500, 
      price: '449 Kč', 
      desc: 'Neomezené možnosti pro hloubkové studium po celý semestr.',
      popular: false,
      gradient: 'from-cyan-500/15 to-indigo-500/15',
      border: 'border-cyan-500/30',
      iconColor: 'text-cyan-400'
    },
  ];

  const powerUps = [
    {
      id: 'streak',
      name: 'Streak Freeze',
      price: '100 kreditů',
      creditsValue: 0,
      desc: 'Ochrana tvého denního streaku v případě, že jeden den vynecháš.',
      icon: Flame,
      color: 'text-orange-400'
    },
    {
      id: 'xp',
      name: 'Double XP Boost (24h)',
      price: '150 kreditů',
      creditsValue: 0,
      desc: 'Získej dvojnásobné množství zkušenostních bodů za každou aktivitu.',
      icon: Award,
      color: 'text-yellow-400'
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Horní lišta / Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/[0.03] border border-white/10 p-6 rounded-[32px] backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20 inline-flex items-center gap-1.5 mb-2">
              <ShoppingBag className="w-3.5 h-3.5" /> Student.ai Store
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Obchod & <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Power-upy</span> ⚡
            </h1>
          </div>
        </div>

        {/* Aktuální stav kreditů */}
        <div className="flex items-center gap-3 bg-white/5 px-5 py-3 rounded-2xl border border-white/10">
          <div className="w-9 h-9 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-pink-400 fill-pink-400" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Zůstatek</div>
            <div className="text-lg font-black text-white">{userCredits} Kreditů</div>
          </div>
        </div>
      </div>

      {/* Úspěšná hláška po nákupu */}
      {successMessage && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-500/15 border border-green-500/30 p-4 rounded-2xl flex items-center gap-3 text-green-300 text-sm font-bold backdrop-blur-md"
        >
          <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
          <span>{successMessage}</span>
        </motion.div>
      )}

      {/* Sekce: Kreditové balíčky */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-pink-400" /> Kreditové balíčky
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {creditPacks.map((pack) => (
            <div 
              key={pack.id}
              className={`relative overflow-hidden rounded-[28px] bg-gradient-to-br ${pack.gradient} border ${pack.border} p-6 flex flex-col justify-between backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] shadow-xl`}
            >
              {pack.popular && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-pink-500/30">
                  Nejvýhodnější
                </div>
              )}

              <div>
                <div className={`w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 ${pack.iconColor}`}>
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{pack.name}</h3>
                <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-3">
                  +{pack.credits} Kreditů
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{pack.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-lg font-black text-white">{pack.price}</span>
                <button
                  onClick={() => handlePurchase(pack.name, pack.credits, pack.price)}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-black font-bold text-xs transition shadow-md cursor-pointer"
                >
                  Koupit 🚀
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sekce: Speciální Power-upy */}
      <div className="space-y-4 pt-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-cyan-400" /> Vylepšení & Power-upy
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {powerUps.map((item) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={item.id}
                className="bg-white/[0.03] border border-white/10 p-5 rounded-[24px] flex items-center justify-between gap-4 backdrop-blur-xl hover:border-white/20 transition"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 ${item.color}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{item.name}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (userCredits >= 100) {
                      onAddCredits(-100);
                      setSuccessMessage(`Aktivováno: ${item.name}! ⚡`);
                      setTimeout(() => setSuccessMessage(null), 3500);
                    } else {
                      setSuccessMessage(`Nedostatek kreditů pro nákup ${item.name}! ❌`);
                      setTimeout(() => setSuccessMessage(null), 3500);
                    }
                  }}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-xs transition shrink-0 cursor-pointer"
                >
                  {item.price}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
                    }
