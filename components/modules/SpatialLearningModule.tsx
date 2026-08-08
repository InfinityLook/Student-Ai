'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Box, 
  ArrowLeft, 
  Sparkles, 
  Volume2, 
  Vibrate, 
  HelpCircle, 
  CheckCircle2 
} from 'lucide-react';

interface SpatialLearningModuleProps {
  onBack: () => void;
}

export default function SpatialLearningModule({ onBack }: SpatialLearningModuleProps) {
  const [selectedModel, setSelectedModel] = useState('mitochondria');
  const [showQuiz, setShowQuiz] = useState(false);
  const [hapticTriggered, setHapticTriggered] = useState(false);

  const models = {
    mitochondria: {
      title: 'Mitochondrie (Elektrárna buňky)',
      desc: 'Automaticky detekováno z tvých posledních poznámek o buněčném dýchání.',
      dialogue: 'Jsem mitochondrie. V mých záhybech (kristách) probíhá oxidativní fosforylace, kde měním glukózu na energii ATP.',
    },
    heart: {
      title: 'Lidské srdce a krevní oběh',
      desc: 'Detekováno ze studijního materiálu: Fyziologie člověka.',
      dialogue: 'Srdce funguje jako dvoudílná pumpa. Pravá síň posílá krev do plic, levá do celého těla.',
    },
    dna: {
      title: 'DNA Helix',
      desc: 'Detekováno z lekce: Genetika a dědičnost.',
      dialogue: 'Jsem dvoušroubovice DNA. Moje báze Adenin se váže s Thyminem a Cytosin s Guaninem.',
    }
  };

  const current = models[selectedModel as keyof typeof models];

  const triggerHaptics = () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate([50, 100, 50]);
    }
    setHapticTriggered(true);
    setTimeout(() => setHapticTriggered(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs transition flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět na Workspace
        </button>
        <div className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          <Sparkles className="w-3.5 h-3.5" /> Spatial Learning 3.0 (Active Sync)
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(models).map(([key, val]) => (
          <button
            key={key}
            onClick={() => setSelectedModel(key)}
            className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
              selectedModel === key 
                ? 'bg-cyan-500/10 border-cyan-500/50 text-white shadow-lg' 
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <h4 className="text-xs font-bold mb-1">{val.title}</h4>
            <p className="text-[10px] text-slate-500 line-clamp-1">{val.desc}</p>
          </button>
        ))}
      </div>

      {/* Hlavní 3D plátno simulace */}
      <div className="relative rounded-[32px] bg-gradient-to-br from-white/[0.05] to-white/[0.01] border border-white/10 p-8 min-h-[380px] flex flex-col items-center justify-center text-center overflow-hidden shadow-2xl">
        <div className="absolute top-6 left-6 flex items-center gap-2 text-xs text-slate-400 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
          <Box className="w-4 h-4 text-cyan-400 animate-pulse" /> 3D Workspace Engine Active
        </div>

        <motion.div
          animate={{ rotate: 360, scale: [1, 1.05, 1] }}
          transition={{ rotate: { repeat: Infinity, duration: 20, ease: "linear" }, scale: { repeat: Infinity, duration: 4 } }}
          className="w-44 h-44 rounded-full bg-gradient-to-tr from-cyan-500/20 via-purple-500/20 to-pink-500/20 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.15)] my-8"
        >
          <div className="w-28 h-28 rounded-full bg-cyan-500/10 flex items-center justify-center">
            <Box className="w-14 h-14 text-cyan-400" />
          </div>
        </motion.div>

        <h2 className="text-2xl font-black text-white mb-2">{current.title}</h2>
        <p className="text-sm text-slate-400 max-w-md mb-6">{current.desc}</p>

        {/* AI Voiceover bublina */}
        <div className="bg-black/60 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-4 max-w-lg w-full flex items-start gap-3 text-left shadow-lg">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 mt-0.5">
            <Volume2 className="w-5 h-5 animate-bounce" />
          </div>
          <div className="flex-1">
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">AI Embodiment (Hlasový výklad)</span>
            <p className="text-xs text-slate-200 italic">"{current.dialogue}"</p>
          </div>
        </div>

        {/* Ovládací lišta */}
        <div className="flex items-center gap-3 mt-6 flex-wrap justify-center">
          <button 
            onClick={triggerHaptics}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white transition flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Vibrate className="w-4 h-4 text-purple-400" /> 
            {hapticTriggered ? 'Haptická odezva aktivní!' : 'Otestovat haptiku'}
          </button>
          <button 
            onClick={() => setShowQuiz(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-xs font-bold text-white transition flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20"
          >
            <HelpCircle className="w-4 h-4" /> Spustit Interaction Quiz
          </button>
        </div>
      </div>

      {/* Quick Quiz Loop okno */}
      {showQuiz && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[28px] bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/30 p-6 space-y-4 shadow-xl"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-cyan-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Interaction-to-Quiz Loop
            </h3>
            <button onClick={() => setShowQuiz(false)} className="text-xs text-slate-400 hover:text-white cursor-pointer">Zavřít</button>
          </div>
          <p className="text-xs text-slate-200">Na základě tvé manipulace s modelem: Jaká hlavní struktura zajišťuje danou funkci?</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button onClick={() => alert('Správně! Získáváš +20 XP.')} className="p-3 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-xs text-white border border-white/10 transition text-left cursor-pointer">A) Hlavní aktivní zóna / Kristy</button>
            <button onClick={() => alert('Chyba, zkus to znovu.')} className="p-3 rounded-xl bg-white/5 hover:bg-red-500/20 text-xs text-white border border-white/10 transition text-left cursor-pointer">B) Vnější pasivní plášť</button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
