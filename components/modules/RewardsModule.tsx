'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Flame, 
  Sparkles, 
  Gift, 
  CheckCircle2, 
  Lock, 
  Zap, 
  Star, 
  Award, 
  ArrowLeft,
  ShieldCheck,
  Crown
} from 'lucide-react';

interface RewardsModuleProps {
  onBack: () => void;
  credits: number;
  onAddCredits: (amount: number) => void;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: string;
}

interface RewardItem {
  id: string;
  title: string;
  cost: number;
  icon: string;
  purchased: boolean;
  category: string;
}

export default function RewardsModule({ onBack, credits, onAddCredits }: RewardsModuleProps) {
  const [dailyClaimed, setDailyClaimed] = useState(false);
  
  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: '1', title: 'Začínající student', description: 'Dokonči svůj první studijní blok.', icon: '🎯', unlocked: true },
    { id: '2', title: '3-denní Streak', description: 'Aktivní studium 3 dny v řadě.', icon: '🔥', unlocked: true },
    { id: '3', title: 'Mistr soustředění', description: 'Dokonči 5 Pomodoro sezení.', icon: '⚡', unlocked: false, progress: '3/5' },
    { id: '4', title: 'AI Vševěd', description: 'Polož AI řešiteli 10 otázek.', icon: '🤖', unlocked: false, progress: '6/10' },
    { id: '5', title: 'Archivář', description: 'Vytvoř si alespoň 3 složky v úložišti.', icon: '📁', unlocked: true },
    { id: '6', title: 'Šplhoun', description: 'Dosáhni 10. levelu.', icon: '👑', unlocked: false, progress: 'Level 4/10' },
  ]);

  const [rewards, setRewards] = useState<RewardItem[]>([
    { id: 'r1', title: 'Exkluzivní Neonový vzhled', cost: 150, icon: '✨', purchased: false, category: 'Personalizace' },
    { id: 'r2', title: '+100 AI Kreditů zdarma', cost: 200, icon: '⚡', purchased: false, category: 'Boost' },
    { id: 'r3', title: 'Zlatá korunka pro mazlíčka', cost: 350, icon: '👑', purchased: false, category: 'Mazlíček' },
    { id: 'r4', title: 'VIP Odznak v profilu', cost: 500, icon: '🏆', purchased: false, category: 'Profil' },
  ]);

  const [notification, setNotification] = useState<string | null>(null);

  const handleClaimDaily = () => {
    if (dailyClaimed) return;
    setDailyClaimed(true);
    onAddCredits(50);
    showNotification('Získal/a jsi denní odměnu +50 kreditů! 🎉');
  };

  const handleBuyReward = (id: string, cost: number) => {
    const item = rewards.find(r => r.id === id);
    if (!item || item.purchased) return;

    if (credits < cost) {
      showNotification('Nemáš dostatek kreditů! ❌');
      return;
    }

    onAddCredits(-cost);
    setRewards(rewards.map(r => r.id === id ? { ...r, purchased: true } : r));
    showNotification(`Úspěšně jsi zakoupil/a: ${item.title}! 🎁`);
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Notifikace */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-2xl shadow-2xl font-bold text-sm flex items-center gap-2 border border-white/20 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4" /> {notification}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hlavička */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/[0.03] border border-white/10 p-6 rounded-[32px] backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 inline-flex items-center gap-1.5 mb-2">
              <Trophy className="w-3.5 h-3.5" /> Hall of Fame
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Síň slávy & <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">Odměny</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 px-5 py-2.5 rounded-2xl text-yellow-400 font-bold text-sm">
          <Zap className="w-4 h-4 fill-yellow-400" />
          <span>{credits} Kreditů</span>
        </div>
      </div>

      {/* Denní odměna banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-yellow-500/15 via-amber-500/10 to-transparent border border-yellow-500/30 rounded-[32px] p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-xs font-bold">
            <Gift className="w-3.5 h-3.5" /> Denní bonus
          </div>
          <h3 className="text-xl md:text-2xl font-black text-white">Vyzvedni si denní dávku XP a kreditů!</h3>
          <p className="text-sm text-slate-300">Získej +50 kreditů za každodenní přihlášení do aplikace.</p>
        </div>

        <button
          onClick={handleClaimDaily}
          disabled={dailyClaimed}
          className={`px-6 py-4 rounded-2xl font-bold text-sm transition shadow-lg flex items-center gap-2 cursor-pointer ${
            dailyClaimed 
              ? 'bg-white/5 text-slate-500 border border-white/5 cursor-not-allowed' 
              : 'bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 hover:opacity-90 shadow-yellow-500/20'
          }`}
        >
          {dailyClaimed ? (
            <>
              <CheckCircle2 className="w-5 h-5 text-slate-500" /> Vyzvednuto dnes
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" /> Vyzvednout +50 kreditů
            </>
          )}
        </button>
      </div>

      {/* Odznaky a úspěchy (Síň slávy) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-400 tracking-wider uppercase flex items-center gap-2">
            <Award className="w-4 h-4 text-yellow-400" /> Odznaky a úspěchy ({achievements.filter(a => a.unlocked).length}/{achievements.length})
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {achievements.map((item) => (
            <div
              key={item.id}
              className={`relative overflow-hidden rounded-[24px] p-5 border transition-all flex flex-col justify-between ${
                item.unlocked 
                  ? 'bg-gradient-to-br from-white/[0.06] to-white/[0.02] border-yellow-500/30 shadow-lg shadow-yellow-500/5' 
                  : 'bg-white/[0.02] border-white/10 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl shadow-inner">
                  {item.icon}
                </div>
                {item.unlocked ? (
                  <span className="p-1.5 rounded-xl bg-yellow-500/20 text-yellow-400">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                ) : (
                  <span className="p-1.5 rounded-xl bg-white/5 text-slate-500">
                    <Lock className="w-4 h-4" />
                  </span>
                )}
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-slate-400 mb-3">{item.description}</p>
              </div>

              {item.progress && !item.unlocked && (
                <div className="text-[11px] font-bold text-yellow-400 bg-yellow-500/10 px-3 py-1 rounded-full w-fit">
                  {item.progress}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Obchod s odměnami / Perks */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-400 tracking-wider uppercase flex items-center gap-2">
            <Crown className="w-4 h-4 text-yellow-400" /> Exkluzivní odměny za kredity
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className="bg-white/[0.03] border border-white/10 hover:border-yellow-500/30 rounded-[24px] p-5 transition-all flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-amber-500/10 border border-yellow-500/30 flex items-center justify-center text-2xl shadow-md">
                  {reward.icon}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded-full inline-block mb-1">
                    {reward.category}
                  </span>
                  <h4 className="font-bold text-white text-sm">{reward.title}</h4>
                  <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-1 font-bold">
                    <Zap className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    <span>{reward.cost} kreditů</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleBuyReward(reward.id, reward.cost)}
                disabled={reward.purchased}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer ${
                  reward.purchased
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30 cursor-default'
                    : 'bg-white/10 hover:bg-yellow-500 hover:text-slate-950 text-white border border-white/10'
                }`}
              >
                {reward.purchased ? 'Zakoupeno' : 'Koupit'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
