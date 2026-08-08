'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Mic, 
  Volume2, 
  Zap, 
  Sparkles, 
  ArrowLeft, 
  Cpu, 
  Radio, 
  RefreshCw,
  Award,
  Terminal,
  Globe
} from 'lucide-react';

interface LanguagePetModuleProps {
  onBack: () => void;
  onAddCredits: (amount: number) => void;
}

export default function LanguagePetModule({ onBack, onAddCredits }: LanguagePetModuleProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'de' | 'es'>('en');
  const [level, setLevel] = useState(3);
  const [energy, setEnergy] = useState(85);
  const [isListening, setIsListening] = useState(false);
  const [aiResponse, setAiResponse] = useState("System online. Ready for conversation practice. Choose a mode or speak up.");
  const [chatMode, setChatMode] = useState<'interview' | 'casual' | 'slang'>('casual');

  const languages = {
    en: { name: 'Angličtina (C1/Pro)', flag: '🇬🇧' },
    de: { name: 'Němčina (B2)', flag: '🇩🇪' },
    es: { name: 'Španělština (B1)', flag: '🇪🇸' },
  };

  const handleSimulateVoice = () => {
    setIsListening(true);
    setAiResponse("Listening to audio stream...");
    setTimeout(() => {
      setIsListening(false);
      setEnergy(prev => Math.min(100, prev + 5));
      onAddCredits(10);
      setAiResponse("Pronunciation check: Excellent tone and flow! +10 XP & Credits unlocked. 🚀");
    }, 2500);
  };

  const feedDataPack = () => {
    setEnergy(prev => Math.min(100, prev + 15));
    onAddCredits(25);
    setAiResponse("Data pack uploaded successfully! Neural core upgraded. 🔋");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
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
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 inline-flex items-center gap-1.5 mb-2">
              <Bot className="w-3.5 h-3.5" /> Cyber AI Tutor v2.4
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Jazykový <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">Cyber Companion</span> ⚡
            </h1>
          </div>
        </div>

        {/* Výběr jazyka */}
        <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10">
          {(Object.keys(languages) as Array<keyof typeof languages>).map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                selectedLanguage === lang 
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>{languages[lang].flag}</span>
              <span className="hidden sm:inline">{languages[lang].name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 3D / Holografický vizuál avatara (2 sloupce) */}
        <div className="lg:col-span-2 relative overflow-hidden rounded-[32px] bg-gradient-to-br from-cyan-950/20 via-slate-900/40 to-indigo-950/20 border border-cyan-500/30 p-8 flex flex-col items-center justify-between min-h-[420px] backdrop-blur-xl shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Status bar avatara */}
          <div className="w-full flex justify-between items-center z-10">
            <div className="flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-4 py-1.5 rounded-full text-xs font-bold text-cyan-300">
              <Cpu className="w-3.5 h-3.5 animate-pulse" /> Core Level {level}
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs font-bold text-slate-300">
              <Radio className="w-3.5 h-3.5 text-green-400 animate-ping" /> Neural Link Active
            </div>
          </div>

          {/* Holografická vizualizace (CSS 3D simulace) */}
          <div className="relative my-8 flex items-center justify-center">
            <motion.div 
              animate={{ 
                rotateY: [0, 360],
                y: [0, -10, 0]
              }}
              transition={{ 
                rotateY: { duration: 10, repeat: Infinity, ease: "linear" },
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
              className="w-44 h-44 rounded-3xl bg-gradient-to-tr from-cyan-500/20 via-indigo-500/30 to-purple-500/20 border border-cyan-400/50 shadow-[0_0_50px_rgba(6,182,212,0.3)] flex items-center justify-center backdrop-blur-md relative"
            >
              <div className="absolute inset-2 border border-cyan-400/20 rounded-2xl" />
              <Bot className={`w-20 h-20 text-cyan-300 transition-all ${isListening ? 'scale-110 text-pink-400 drop-shadow-[0_0_20px_rgba(236,72,153,0.8)]' : ''}`} />
            </motion.div>
          </div>

          {/* Výstup AI / Dialog */}
          <div className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 z-10 backdrop-blur-md space-y-2">
            <div className="flex items-center justify-between text-[11px] text-cyan-400 font-mono">
              <span className="flex items-center gap-1"><Terminal className="w-3 h-3" /> CYBER_AI_OUTPUT</span>
              <span>{chatMode.toUpperCase()} MODE</span>
            </div>
            <p className="text-sm text-slate-200 font-medium italic">
              "{aiResponse}"
            </p>
          </div>
        </div>

        {/* Ovládací panel a tréninkové režimy (1 sloupec) */}
        <div className="space-y-4 flex flex-col justify-between">
          <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-6 backdrop-blur-xl space-y-4">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Tréninkové Režimy</h3>
            
            <div className="space-y-2">
              {[
                { id: 'casual', label: '☕ Coffee Chat (Small talk)', desc: 'Běžná denní konverzace' },
                { id: 'interview', label: '💼 Job Interview Prep', desc: 'Formální firemní angličtina' },
                { id: 'slang', label: '🔥 Native Slang & Idioms', desc: 'Hovorové fráze z ulice' },
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => {
                    setChatMode(mode.id as any);
                    setAiResponse(`Switched to ${mode.label}. Let's begin!`);
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl border transition cursor-pointer ${
                    chatMode === mode.id 
                      ? 'bg-cyan-500/15 border-cyan-500/40 text-white' 
                      : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="font-bold text-xs">{mode.label}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{mode.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Akční tlačítka (Mikrofon & Krmení daty) */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleSimulateVoice}
              disabled={isListening}
              className={`py-4 px-4 rounded-2xl font-bold text-xs flex flex-col items-center justify-center gap-2 transition shadow-lg cursor-pointer ${
                isListening 
                  ? 'bg-pink-500 text-white animate-pulse shadow-pink-500/30' 
                  : 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white hover:opacity-90 shadow-cyan-500/20'
              }`}
            >
              <Mic className="w-5 h-5" />
              <span>{isListening ? 'Poslouchám...' : 'Mluvit nahlas'}</span>
            </button>

            <button
              onClick={feedDataPack}
              className="py-4 px-4 rounded-2xl font-bold text-xs bg-white/5 hover:bg-white/10 border border-white/10 text-white flex flex-col items-center justify-center gap-2 transition cursor-pointer shadow-sm"
            >
              <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span>Nahrát Data Pack</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
