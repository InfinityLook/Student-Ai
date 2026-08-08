'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  CalendarDays, 
  Bot, 
  GitBranch, 
  Timer, 
  FileText, 
  BrainCircuit, 
  Layers, 
  BarChart3, 
  Camera, 
  ArrowRight,
  Flame,
  SlidersHorizontal,
  Plus,
  X,
  Sparkles
} from 'lucide-react';
import { useApp } from './AppContext';
import LevelBadge from './LevelBadge';

interface WorkspaceViewProps {
  setActiveView: (v: string) => void;
  openCustomizer: () => void;
}

const ALL_MODULES = [
  { id: 'language', title: 'Cyber Jazykový Lektor', desc: 'Trénuj konverzaci a výslovnost s AI společníkem.', icon: Bot, color: 'text-cyan-400', category: 'ai' },
  { id: 'mindmap', title: 'Myšlenkové Mapy', desc: 'Vizuální propojování konceptů a uzlů.', icon: GitBranch, color: 'text-indigo-400', category: 'study' },
  { id: 'solver', title: 'AI Řešitel Úloh', desc: 'Zasekl ses na příkladu? Nech si ho vysvětlit.', icon: Calculator, color: 'text-cyan-400', category: 'ai' },
  { id: 'timer', title: 'Focus Timer', desc: 'Pomodoro časomíra pro soustředěné učení.', icon: Timer, color: 'text-purple-400', category: 'productivity' },
  { id: 'calendar', title: 'Studijní Kalendář', desc: 'Přehled termínů zkoušek a odevzdávek.', icon: CalendarDays, color: 'text-pink-400', category: 'productivity' },
  { id: 'notes', title: 'Inteligentní Poznámky', desc: 'Rychlé poznámky a strukturované taháky.', icon: FileText, color: 'text-amber-400', category: 'study' },
  { id: 'ai-test', title: 'AI Testy', desc: 'Generuj kvízy a zkoušej své znalosti interaktivně.', icon: BrainCircuit, color: 'text-emerald-400', category: 'ai' },
  { id: 'flashcards', title: 'Kartičky', desc: 'Efektivní zapamatování pomocí opakovacích kartiček.', icon: Layers, color: 'text-blue-400', category: 'study' },
  { id: 'analytics', title: 'Analytika', desc: 'Statistiky produktivity a odpracovaného času.', icon: BarChart3, color: 'text-violet-400', category: 'productivity' },
  { id: 'study-plan', title: 'Studijní Plánovač', desc: 'Generování studijních plánů pomocí AI.', icon: CalendarDays, color: 'text-rose-400', category: 'productivity' },
  { id: 'ai-vision', title: 'AI Skener (Vision)', desc: 'Vyfoť stránku z učebnice a nech si ji rozebrat.', icon: Camera, color: 'text-teal-400', category: 'ai' },
];

export default function WorkspaceView({ setActiveView, openCustomizer }: WorkspaceViewProps) {
  const { streak, level, xp } = useApp();
  
  // 4 sloty na ploše (mřížka 2x2)
  const [slots, setSlots] = useState<(string | null)[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('student_ai_workspace_slots_4x4');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return ['language', 'timer', 'calendar', null]; // Výchozí obsazení prvních tří slotů, čtvrtý prázdný s +
  });

  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem('student_ai_workspace_slots_4x4', JSON.stringify(slots));
  }, [slots]);

  const handleAssignModule = (moduleId: string) => {
    if (selectedSlotIndex !== null) {
      const newSlots = [...slots];
      newSlots[selectedSlotIndex] = moduleId;
      setSlots(newSlots);
      setSelectedSlotIndex(null);
    }
  };

  const handleRemoveModule = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSlots = [...slots];
    newSlots[index] = null;
    setSlots(newSlots);
  };

  const getModuleInfo = (moduleId: string) => {
    return ALL_MODULES.find(m => m.id === moduleId) || ALL_MODULES[0];
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20 inline-flex items-center gap-1.5 mb-3">
            <Flame className="w-3.5 h-3.5 text-pink-400" /> {streak} denní streak! 🔥
          </span>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">
            Studijní <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">Workspace</span> ⚡
          </h1>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={openCustomizer}
            className="px-4 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs transition flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4 text-pink-400" /> Nastavení plochy
          </button>
          <div className="w-full md:w-72">
            <LevelBadge level={level} currentXp={xp} maxXp={100} />
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-400 italic">
        💡 Tip: Kliknutím na tlačítko <span className="text-pink-400 font-bold">+</span> v dlaždici si můžeš na danou pozici vybrat a přiřadit libovolný modul.
      </p>

      {/* 4 Dlaždice (Grid 2x2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {slots.map((moduleId, index) => {
          if (moduleId) {
            const info = getModuleInfo(moduleId);
            const Icon = info.icon;
            return (
              <motion.div
                key={`slot-${index}-${moduleId}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group relative overflow-hidden rounded-[28px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 p-7 hover:border-white/25 transition-all shadow-xl cursor-pointer flex flex-col justify-between min-h-[200px]"
                onClick={() => setActiveView(moduleId)}
              >
                {/* Tlačítko pro odebrání modulu ze slotu */}
                <button
                  onClick={(e) => handleRemoveModule(index, e)}
                  title="Odebrat modul z pozice"
                  className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-slate-400 opacity-40 group-hover:opacity-100 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-2xl bg-white/5 ${info.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 text-slate-400 border border-white/5">
                      Pozice #{index + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{info.title}</h3>
                  <p className="text-sm text-slate-400">{info.desc}</p>
                </div>

                <div className={`mt-6 flex items-center gap-2 text-xs font-bold ${info.color}`}>
                  <span>Otevřít modul</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            );
          } else {
            // Prázdný slot s +
            return (
              <motion.div
                key={`slot-empty-${index}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setSelectedSlotIndex(index)}
                className="group relative rounded-[28px] border-2 border-dashed border-white/15 bg-white/[0.01] hover:bg-white/[0.04] hover:border-pink-500/50 p-8 transition-all cursor-pointer flex flex-col items-center justify-center text-center min-h-[200px] shadow-sm"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 group-hover:bg-pink-500/20 group-hover:text-pink-400 text-slate-400 flex items-center justify-center mb-3 transition shadow-md">
                  <Plus className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-pink-400 transition mb-1">Přidat modul na pozici #{index + 1}</h3>
                <p className="text-xs text-slate-500">Kliknutím vyber, co chceš mít po ruce</p>
              </motion.div>
            );
          }
        })}
      </div>

      {/* Modální okno pro výběr modulu do slotu */}
      <AnimatePresence>
        {selectedSlotIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#0D111A] border border-white/15 rounded-[32px] p-6 md:p-8 max-w-xl w-full shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-pink-400" /> Vyber modul pro pozici #{selectedSlotIndex + 1}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Zvol si nástroj, který se na této dlaždici zobrazí.</p>
                </div>
                <button
                  onClick={() => setSelectedSlotIndex(null)}
                  className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ALL_MODULES.map((mod) => {
                  const Icon = mod.icon;
                  const isAlreadyUsed = slots.includes(mod.id);
                  return (
                    <div
                      key={mod.id}
                      onClick={() => !isAlreadyUsed && handleAssignModule(mod.id)}
                      className={`group relative rounded-2xl border p-4 transition-all flex items-center gap-3.5 ${
                        isAlreadyUsed 
                          ? 'opacity-40 border-white/5 bg-white/[0.01] cursor-not-allowed' 
                          : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-pink-500/50 cursor-pointer'
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl bg-white/5 ${mod.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-white group-hover:text-pink-400 transition truncate">{mod.title}</h4>
                        <p className="text-[10px] text-slate-500 truncate">{isAlreadyUsed ? 'Již umístěno na ploše' : mod.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
              }
