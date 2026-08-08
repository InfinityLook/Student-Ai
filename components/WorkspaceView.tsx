'use client';

import React, { useState, useEffect, useCallback } from 'react';
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
  Plus,
  X,
  Sparkles,
  Box,
  Compass,
  Zap,
  Target,
  Maximize2,
  Minimize2,
  FolderPlus,
  Search,
  Command
} from 'lucide-react';
import { useApp } from './AppContext';
import LevelBadge from './LevelBadge';

interface WorkspaceViewProps {
  setActiveView: (v: string) => void;
  openCustomizer: () => void;
}

const ALL_MODULES = [
  { id: 'spatial-learning', title: 'Spatial Learning 3.0', desc: 'Interaktivní 3D modely s AI výkladem a haptikou.', icon: Box, color: 'text-cyan-400', category: 'ai' },
  { id: 'language', title: 'Cyber Jazykový Lektor', desc: 'Trénuj konverzaci a výslovnost s AI společníkem.', icon: Bot, color: 'text-cyan-400', category: 'ai' },
  { id: 'mind-map', title: 'Myšlenkové Mapy', desc: 'Vizuální propojování konceptů a uzlů.', icon: GitBranch, color: 'text-indigo-400', category: 'study' },
  { id: 'solver', title: 'AI Řešitel Úloh', desc: 'Zasekl ses na příkladu? Nech si ho vysvětlit.', icon: Calculator, color: 'text-cyan-400', category: 'ai' },
  { id: 'timer', title: 'Focus Timer', desc: 'Pomodoro časomíra pro soustředěné učení.', icon: Timer, color: 'text-purple-400', category: 'productivity' },
  { id: 'calendar', title: 'Studijní Kalendář', desc: 'Přehled termínů zkoušek a odevzdávek.', icon: CalendarDays, color: 'text-pink-400', category: 'productivity' },
  { id: 'notes', title: 'Inteligentní Poznámky', desc: 'Rychlé poznámky a strukturované taháky.', icon: FileText, color: 'text-amber-400', category: 'study' },
  { id: 'ai-test', title: 'AI Testy', desc: 'Generuj kvízy a zkoušej své znalosti interaktivně.', icon: BrainCircuit, color: 'text-emerald-400', category: 'ai' },
  { id: 'flashcards', title: 'Kartičky', desc: 'Efektivní zapamatování pomocí opakovacích kartiček.', icon: Layers, color: 'text-blue-400', category: 'study' },
  { id: 'analytics', title: 'Analytika', desc: 'Statistiky produktivity a odpracovaného času.', icon: BarChart3, color: 'text-violet-400', category: 'productivity' },
  { id: 'study-plan', title: 'Studijní Plánovač', desc: 'Generování studijních plánů pomocí AI.', icon: Target, color: 'text-rose-400', category: 'productivity' },
  { id: 'ai-vision', title: 'AI Skener (Vision)', desc: 'Vyfoť stránku z učebnice a nech si ji rozebrat.', icon: Camera, color: 'text-teal-400', category: 'ai' },
];

const DEFAULT_MODES = [
  { 
    id: 'general', 
    name: 'Všeobecný Workspace', 
    icon: Compass, 
    desc: 'Vyvážená plocha pro každodenní studium.',
    layout: [
      { id: 'spatial-learning', span: 2 },
      { id: 'timer', span: 1 },
      { id: 'calendar', span: 1 },
      { id: 'notes', span: 2 }
    ]
  },
  { 
    id: 'exam', 
    name: 'Mód: Zkouškové 🔥', 
    icon: Zap, 
    desc: 'Maximální soustředění, testy a záchranné moduly.',
    layout: [
      { id: 'ai-test', span: 2 },
      { id: 'spatial-learning', span: 1 },
      { id: 'solver', span: 1 },
      { id: 'timer', span: 2 }
    ]
  },
  { 
    id: 'project', 
    name: 'Mód: Projekt & Tvorba 🧠', 
    icon: GitBranch, 
    desc: 'Propojení myšlenkových map, poznámek a plánování.',
    layout: [
      { id: 'mind-map', span: 2 },
      { id: 'notes', span: 1 },
      { id: 'study-plan', span: 1 },
      { id: 'ai-vision', span: 2 }
    ]
  },
];

export default function WorkspaceView({ setActiveView }: WorkspaceViewProps) {
  const { streak, level, xp } = useApp();
  
  const [studyModes, setStudyModes] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('student_ai_custom_study_modes_v3');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return DEFAULT_MODES;
  });

  const [activeModeId, setActiveModeId] = useState('general');
  const [modeLayouts, setModeLayouts] = useState<Record<string, { id: string | null; span: number }[]>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('student_ai_study_modes_layouts_v3');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    const initial: Record<string, { id: string | null; span: number }[]> = {};
    DEFAULT_MODES.forEach(m => {
      initial[m.id] = m.layout;
    });
    return initial;
  });

  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isCreatingMode, setIsCreatingMode] = useState(false);
  const [newModeName, setNewModeName] = useState('');
  
  // Stav pro Command Center (Ctrl+K)
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState('');

  // Sledování klávesové zkratky Ctrl+K nebo Cmd+K
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      setIsCommandOpen(prev => !prev);
    }
    if (e.key === 'Escape') {
      setIsCommandOpen(false);
      setSelectedSlotIndex(null);
      setIsCreatingMode(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    localStorage.setItem('student_ai_study_modes_layouts_v3', JSON.stringify(modeLayouts));
  }, [modeLayouts]);

  useEffect(() => {
    localStorage.setItem('student_ai_custom_study_modes_v3', JSON.stringify(studyModes));
  }, [studyModes]);

  const currentSlots = modeLayouts[activeModeId] || studyModes[0].layout;

  const handleAssignModule = (moduleId: string) => {
    if (selectedSlotIndex !== null) {
      const updated = { ...modeLayouts };
      const currentList = [...(updated[activeModeId] || [{ id: null, span: 1 }, { id: null, span: 1 }, { id: null, span: 1 }, { id: null, span: 1 }])];
      currentList[selectedSlotIndex] = { ...currentList[selectedSlotIndex], id: moduleId };
      updated[activeModeId] = currentList;
      setModeLayouts(updated);
      setSelectedSlotIndex(null);
    }
  };

  const handleRemoveModule = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = { ...modeLayouts };
    const currentList = [...updated[activeModeId]];
    currentList[index] = { ...currentList[index], id: null };
    updated[activeModeId] = currentList;
    setModeLayouts(updated);
  };

  const toggleSpan = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = { ...modeLayouts };
    const currentList = [...updated[activeModeId]];
    currentList[index] = { ...currentList[index], span: currentList[index].span === 2 ? 1 : 2 };
    updated[activeModeId] = currentList;
    setModeLayouts(updated);
  };

  const handleCreateMode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModeName.trim()) return;
    const id = 'mode-' + Date.now();
    const newMode = {
      id,
      name: newModeName.trim(),
      icon: Sparkles,
      desc: 'Vlastní uživatelský studijní režim.',
      layout: [
        { id: null, span: 2 },
        { id: null, span: 1 },
        { id: null, span: 1 },
        { id: null, span: 2 }
      ]
    };

    setStudyModes([...studyModes, newMode]);
    setModeLayouts({
      ...modeLayouts,
      [id]: newMode.layout
    });
    setActiveModeId(id);
    setNewModeName('');
    setIsCreatingMode(false);
  };

  const getModuleInfo = (moduleId: string) => {
    return ALL_MODULES.find(m => m.id === moduleId) || ALL_MODULES[0];
  };

  const filteredModules = filterCategory === 'all' 
    ? ALL_MODULES 
    : ALL_MODULES.filter(m => m.category === filterCategory);

  const searchedModules = commandQuery.trim() === ''
    ? ALL_MODULES
    : ALL_MODULES.filter(m => m.title.toLowerCase().includes(commandQuery.toLowerCase()) || m.desc.toLowerCase().includes(commandQuery.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Hlavička + Rychlý Command spouštěč */}
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
            onClick={() => setIsCommandOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-300 transition cursor-pointer shadow-sm"
          >
            <Search className="w-4 h-4 text-pink-400" />
            <span>Rychlé hledání...</span>
            <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-white/10 text-slate-400 font-mono">Ctrl K</kbd>
          </button>
          <div className="w-full md:w-64">
            <LevelBadge level={level} currentXp={xp} maxXp={100} />
          </div>
        </div>
      </div>

      {/* Přepínač studijních módů + Tlačítko pro nový mód */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {studyModes.map((mode: any) => {
          const Icon = mode.icon || Sparkles;
          const isActive = activeModeId === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => setActiveModeId(mode.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isActive 
                  ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-pink-500/50 text-white shadow-lg shadow-pink-500/10 scale-[1.02]' 
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-pink-400' : 'text-slate-400'}`} />
              <span>{mode.name}</span>
            </button>
          );
        })}
        <button
          onClick={() => setIsCreatingMode(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-dashed border-white/20 bg-white/[0.02] hover:bg-white/5 text-xs font-bold text-slate-400 hover:text-white transition whitespace-nowrap cursor-pointer"
        >
          <FolderPlus className="w-4 h-4 text-pink-400" />
          <span>Nový mód</span>
        </button>
      </div>

      <p className="text-xs text-slate-400 italic">
        💡 Aktuální režim: <strong className="text-white">{studyModes.find((m: any) => m.id === activeModeId)?.desc}</strong>
      </p>

      {/* Mřížka widgetů s ovládáním velikosti */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {currentSlots.map((slot: any, index: number) => {
          const isWide = slot.span === 2;
          
          if (slot.id) {
            const info = getModuleInfo(slot.id);
            const Icon = info.icon;
            return (
              <motion.div
                key={`mode-${activeModeId}-slot-${index}-${slot.id}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`group relative overflow-hidden rounded-[28px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 p-7 hover:border-white/25 transition-all shadow-xl cursor-pointer flex flex-col justify-between min-h-[200px] ${
                  isWide ? 'md:col-span-2' : 'col-span-1'
                }`}
                onClick={() => setActiveView(slot.id as string)}
              >
                <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 opacity-40 group-hover:opacity-100 transition">
                  <button
                    onClick={(e) => toggleSpan(index, e)}
                    title={isWide ? 'Zmenšit na klasickou velikost' : 'Roztáhnout na šířku (Hero slot)'}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 transition cursor-pointer"
                  >
                    {isWide ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={(e) => handleRemoveModule(index, e)}
                    title="Odebrat modul"
                    className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-slate-300 transition cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-2xl bg-white/5 ${info.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 text-slate-400 border border-white/5">
                      {isWide ? 'Široký Hero Slot' : `Pozice #{index + 1}`}
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
            return (
              <motion.div
                key={`mode-${activeModeId}-empty-${index}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setSelectedSlotIndex(index)}
                className={`group relative rounded-[28px] border-2 border-dashed border-white/15 bg-white/[0.01] hover:bg-white/[0.04] hover:border-pink-500/50 p-8 transition-all cursor-pointer flex flex-col items-center justify-center text-center min-h-[200px] shadow-sm ${
                  isWide ? 'md:col-span-2' : 'col-span-1'
                }`}
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 group-hover:bg-pink-500/20 group-hover:text-pink-400 text-slate-400 flex items-center justify-center mb-3 transition shadow-md">
                  <Plus className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-pink-400 transition mb-1">Přidat modul na slot #{index + 1}</h3>
                <p className="text-xs text-slate-500">Kliknutím vyber nástroj</p>
              </motion.div>
            );
          }
        })}
      </div>

      {/* AI Command Center (Ctrl+K Spotlight Modal) */}
      <AnimatePresence>
        {isCommandOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-28 p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="bg-[#0D111A] border border-white/15 rounded-[32px] max-w-xl w-full shadow-2xl overflow-hidden"
            >
              <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
                <Command className="w-5 h-5 text-pink-400" />
                <input
                  type="text"
                  value={commandQuery}
                  onChange={(e) => setCommandQuery(e.target.value)}
                  placeholder="Hledej modul nebo akci (např. Spatial Learning, Testy...)..."
                  className="w-full bg-transparent text-white text-sm focus:outline-none placeholder-slate-500"
                  autoFocus
                />
                <button
                  onClick={() => setIsCommandOpen(false)}
                  className="p-1.5 rounded-xl bg-white/5 text-slate-400 hover:text-white transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto p-3 space-y-1">
                {searchedModules.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-500">Žádné moduly neodpovídají hledání.</div>
                ) : (
                  searchedModules.map((mod) => {
                    const Icon = mod.icon;
                    return (
                      <div
                        key={mod.id}
                        onClick={() => {
                          setIsCommandOpen(false);
                          setActiveView(mod.id);
                        }}
                        className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/5 transition cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2.5 rounded-xl bg-white/5 ${mod.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-white group-hover:text-pink-400 transition">{mod.title}</h4>
                            <p className="text-[10px] text-slate-500">{mod.desc}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-white transition" />
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
                    <Sparkles className="w-5 h-5 text-pink-400" /> Vyber modul do slotu
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Zvol si nástroj pro tento režim.</p>
                </div>
                <button
                  onClick={() => setSelectedSlotIndex(null)}
                  className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                {['all', 'ai', 'study', 'productivity'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition capitalize cursor-pointer ${
                      filterCategory === cat 
                        ? 'bg-pink-500 text-white shadow-md' 
                        : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat === 'all' ? 'Všechny' : cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredModules.map((mod) => {
                  const Icon = mod.icon;
                  const isAlreadyUsed = currentSlots.some((s: any) => s.id === mod.id);
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
                        <p className="text-[10px] text-slate-500 truncate">{isAlreadyUsed ? 'Již v tomto módu' : mod.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modální okno pro vytvoření nového studijního módu */}
      <AnimatePresence>
        {isCreatingMode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#0D111A] border border-white/15 rounded-[32px] p-6 md:p-8 max-w-md w-full shadow-2xl space-y-6"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <FolderPlus className="w-5 h-5 text-pink-400" /> Vytvořit vlastní studijní mód
                </h3>
                <button
                  onClick={() => setIsCreatingMode(false)}
                  className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateMode} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-2">Název módu (např. Programování 💻)</label>
                  <input
                    type="text"
                    value={newModeName}
                    onChange={(e) => setNewModeName(e.target.value)}
                    placeholder="Zadej název..."
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-pink-500 transition"
                    autoFocus
                  />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCreatingMode(false)}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-300 transition cursor-pointer"
                  >
                    Zrušit
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-xs font-bold text-white shadow-lg shadow-pink-500/25 transition cursor-pointer"
                  >
                    Vytvořit mód
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
