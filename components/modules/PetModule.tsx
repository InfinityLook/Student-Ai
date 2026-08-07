'use client';

import React, { useState } from 'react';
import { ArrowLeft, Heart, Sparkles, Zap, Utensils, Smile, Trophy } from 'lucide-react';
import { useNotification } from '../NotificationSystem';
import { motion } from 'framer-motion';

export default function PetModule({ onBack }: { onBack: () => void }) {
  const { addNotification } = useNotification();
  const [happiness, setHappiness] = useState(80);
  const [hunger, setHunger] = useState(65);
  const [petLevel, setPetLevel] = useState(4);
  const [xp, setXp] = useState(85);
  const [isClicked, setIsClicked] = useState(false);

  const handleFeed = () => {
    if (hunger >= 100) {
      addNotification('info', 'Mazlíček má plné bříško! 🍔');
      return;
    }
    setHunger(prev => Math.min(100, prev + 20));
    setHappiness(prev => Math.min(100, prev + 10));
    addNotification('success', 'Nakrmil jsi mazlíčka! +10 XP ✨');
  };

  const handlePet = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 400);
    setHappiness(prev => Math.min(100, prev + 15));
    addNotification('success', 'Mazlíček radostně poskočil a vrní! ❤️');
  };

  const handlePlay = () => {
    setHappiness(prev => Math.min(100, prev + 25));
    setHunger(prev => Math.max(0, prev - 15));
    setXp(prev => {
      const nextXp = prev + 15;
      if (nextXp >= 100) {
        setPetLevel(l => l + 1);
        addNotification('success', `Gratulace! Tvůj mazlíček postoupil na Level ${petLevel + 1}! 🚀`);
        return nextXp - 100;
      }
      return nextXp;
    });
    addNotification('success', 'Hráli jste si spolu! +15 XP 🎾');
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition cursor-pointer bg-white/5 px-4 py-2 rounded-xl border border-white/10"
      >
        <ArrowLeft className="w-4 h-4" /> Zpět do Workspace
      </button>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Heart className="w-8 h-8 text-pink-400" />
          <h1 className="text-3xl font-black text-white">AI Mazlíček</h1>
        </div>
        <div className="bg-pink-500/10 border border-pink-500/20 px-4 py-1.5 rounded-full text-xs font-bold text-pink-400 flex items-center gap-1.5 shadow-lg shadow-pink-500/10">
          <Sparkles className="w-3.5 h-3.5" /> Level {petLevel}
        </div>
      </div>

      {/* Main 3D Pet Showcase Card */}
      <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-b from-purple-950/40 via-black/60 to-black/80 border border-purple-500/30 p-8 text-center space-y-6 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
        {/* Glow Effects */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-pink-500/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />

        {/* 3D Cute Pet Container */}
        <div className="py-8 flex justify-center items-center perspective-[1000px]">
          <motion.div 
            animate={{ 
              y: [0, -12, 0],
              rotateX: [0, 5, 0],
              rotateY: [0, 8, 0],
              scale: isClicked ? [1, 0.9, 1.12, 1] : 1 
            }}
            transition={{ 
              y: { repeat: Infinity, duration: 3.5, ease: "easeInOut" },
              rotateX: { repeat: Infinity, duration: 4, ease: "easeInOut" },
              rotateY: { repeat: Infinity, duration: 5, ease: "easeInOut" }
            }}
            onClick={handlePet}
            style={{ transformStyle: 'preserve-3d' }}
            className="relative w-44 h-44 cursor-pointer group"
          >
            {/* Floating 3D Orbits / Rings */}
            <div className="absolute -inset-4 rounded-full border border-pink-500/20 animate-spin duration-1000 pointer-events-none" style={{ animationDuration: '12s' }} />
            <div className="absolute -inset-8 rounded-full border border-purple-500/15 pointer-events-none" style={{ transform: 'rotateX(60deg) rotateY(30deg)' }} />

            {/* Cute 3D Sphere Body */}
            <div className="absolute inset-0 rounded-[48px] bg-gradient-to-tr from-pink-600 via-purple-600 to-indigo-500 shadow-[inset_-12px_-12px_30px_rgba(0,0,0,0.5),0_20px_40px_rgba(236,72,153,0.3)] flex flex-col items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform">
              
              {/* 3D Highlight reflection */}
              <div className="absolute top-3 left-4 w-12 h-6 bg-white/30 rounded-full blur-[2px] transform -rotate-45" />

              {/* Cute Cat / Cyber Ears */}
              <div className="absolute -top-3 left-7 w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg transform -rotate-12 shadow-md border border-white/20" />
              <div className="absolute -top-3 right-7 w-8 h-8 bg-gradient-to-bl from-pink-500 to-purple-600 rounded-lg transform rotate-12 shadow-md border border-white/20" />

              {/* Cute Blinking / Happy Eyes */}
              <div className="flex gap-6 items-center z-10 mt-1">
                <div className="w-4 h-5 bg-white rounded-full relative shadow-[0_0_10px_rgba(255,255,255,0.8)] flex items-center justify-center">
                  <div className="w-2 h-2.5 bg-slate-900 rounded-full absolute bottom-0.5 right-0.5" />
                </div>
                <div className="w-4 h-5 bg-white rounded-full relative shadow-[0_0_10px_rgba(255,255,255,0.8)] flex items-center justify-center">
                  <div className="w-2 h-2.5 bg-slate-900 rounded-full absolute bottom-0.5 right-0.5" />
                </div>
              </div>

              {/* Cute Blushing Cheeks */}
              <div className="flex gap-12 mt-2 z-10">
                <div className="w-3.5 h-1.5 bg-pink-300/60 rounded-full blur-[1px]" />
                <div className="w-3.5 h-1.5 bg-pink-300/60 rounded-full blur-[1px]" />
              </div>

              {/* Cute Smile / Mouth */}
              <div className="w-3 h-1.5 border-b-2 border-white/90 rounded-full mt-1.5 z-10" />

              {/* Little 3D Core Energy Sparkle */}
              <div className="absolute bottom-3 w-6 h-1.5 bg-pink-300/40 rounded-full blur-sm" />
            </div>

            {/* Floating Status Tag */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full text-[10px] font-bold text-pink-300 flex items-center gap-1 shadow-xl whitespace-nowrap">
              <span>✨ Interaktivní</span>
            </div>
          </motion.div>
        </div>

        <div>
          <h2 className="text-2xl font-black text-white tracking-wide">CyberPet "Aura"</h2>
          <p className="text-xs text-purple-300 mt-1 font-medium">Klikni na mazlíčka pro pohlazení! 💖</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <div className="bg-white/[0.04] p-4 rounded-2xl border border-white/10 space-y-2 backdrop-blur-md">
            <div className="flex justify-between text-xs font-bold text-slate-300">
              <span className="flex items-center gap-1.5"><Smile className="w-3.5 h-3.5 text-pink-400" /> Štěstí</span>
              <span>{happiness}%</span>
            </div>
            <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden p-0.5">
              <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-full rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(236,72,153,0.5)]" style={{ width: `${happiness}%` }} />
            </div>
          </div>

          <div className="bg-white/[0.04] p-4 rounded-2xl border border-white/10 space-y-2 backdrop-blur-md">
            <div className="flex justify-between text-xs font-bold text-slate-300">
              <span className="flex items-center gap-1.5"><Utensils className="w-3.5 h-3.5 text-amber-400" /> Sytost</span>
              <span>{hunger}%</span>
            </div>
            <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden p-0.5">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(245,158,11,0.5)]" style={{ width: `${hunger}%` }} />
            </div>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="bg-white/[0.04] p-4 rounded-2xl border border-white/10 space-y-2 text-left backdrop-blur-md">
          <div className="flex justify-between text-xs font-bold text-slate-300">
            <span className="flex items-center gap-1.5"><Trophy className="w-3.5 h-3.5 text-yellow-400" /> Postup do Levelu {petLevel + 1}</span>
            <span>{xp} / 100 XP</span>
          </div>
          <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden p-0.5">
            <div className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 h-full rounded-full transition-all duration-300 shadow-[0_0_12px_rgba(234,179,8,0.5)]" style={{ width: `${xp}%` }} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          <button 
            onClick={handleFeed}
            className="py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-2xl text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95"
          >
            <Utensils className="w-4 h-4 text-amber-400" /> Nakrmit
          </button>
          <button 
            onClick={handlePet}
            className="py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-2xl text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95"
          >
            <Heart className="w-4 h-4 text-pink-400" /> Pohladit
          </button>
          <button 
            onClick={handlePlay}
            className="py-3.5 bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white font-bold rounded-2xl text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-pink-500/25 active:scale-95"
          >
            <Zap className="w-4 h-4 text-white" /> Hrát si
          </button>
        </div>
      </div>
    </div>
  );
            }
