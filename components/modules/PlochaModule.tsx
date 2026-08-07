'use client';

import React, { useState } from 'react';
import { useStore, getPlochaSlotCost } from '@/store/useStore';
import { 
  User, 
  Bot, 
  Sparkles, 
  BrainCircuit, 
  FileText, 
  Edit3, 
  Calendar, 
  Timer, 
  Folder, 
  Dog, 
  ShoppingBag, 
  Settings, 
  Plus, 
  Lock, 
  X, 
  Trash2, 
  Grid3X3,
  Coins
} from 'lucide-react';

export interface ModuleOption {
  id: string;
  label: string;
  icon: React.ElementType;
}

export className ModuleList {
  static list: ModuleOption[] = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'kairo', label: 'Kairo AI', icon: Bot },
    { id: 'solver', label: 'AI Řešitel', icon: Sparkles },
    { id: 'flashcards', label: 'Kartičky', icon: BrainCircuit },
    { id: 'notes', label: 'Poznámky', icon: FileText },
    { id: 'editor', label: 'Editor', icon: Edit3 },
    { id: 'planner', label: 'Plánovač', icon: Calendar },
    { id: 'timer', label: 'Časovač', icon: Timer },
    { id: 'files', label: 'Soubory', icon: Folder },
    { id: 'pets', label: 'Mazlíčci', icon: Dog },
    { id: 'shop', label: 'Obchod', icon: ShoppingBag },
    { id: 'settings', label: 'Nastavení', icon: Settings },
  ];
}

export default function PlochaModule() {
  const setActiveModule = useStore((state) => state.setActiveModule);
  const credits = useStore((state) => state.credits);
  const plochaSlots = useStore((state) => state.plochaSlots);
  const unlockedPlochaSlots = useStore((state) => state.unlockedPlochaSlots);
  const unlockPlochaSlot = useStore((state) => state.unlockPlochaSlot);
  const setPlochaSlot = useStore((state) => state.setPlochaSlot);

  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  const handleTileClick = (index: number) => {
    const isUnlocked = unlockedPlochaSlots.includes(index);
    if (!isUnlocked) {
      unlockPlochaSlot(index);
    } else {
      const assignedId = plochaSlots[index];
      if (assignedId) {
        setActiveModule(assignedId);
      } else {
        setSelectedSlot(index);
      }
    }
  };

  return (
    <div className="h-full max-h-[calc(100vh-80px)] flex flex-col p-4 max-w-2xl mx-auto overflow-hidden">
      {/* Hlavička */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 flex-shrink-0">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Grid3X3 className="w-6 h-6 text-cyan-400" />
            <span>Moje Plocha</span>
          </h1>
          <p className="text-xs text-slate-400">3×5 rychlých zkratek pro tvůj rozcestník</p>
        </div>
        <div className="flex items-center gap-1.5 bg-amber-500/10 text-amber-400 px-3 py-1.5 rounded-xl text-xs font-semibold border border-amber-500/20">
          <Coins className="w-4 h-4" />
          <span>{credits} K</span>
        </div>
      </div>

      {/* Mřížka 3x5 s pevně zakázaným scrollujícím prostorem */}
      <div className="grid grid-cols-3 grid-rows-5 gap-2.5 my-auto py-3 flex-1 overflow-hidden">
        {Array.from({ length: 15 }).map((_, index) => {
          const isUnlocked = unlockedPlochaSlots.includes(index);
          const cost = getPlochaSlotCost(index);
          const assignedId = plochaSlots[index];
          const assignedModule = ModuleList.list.find((m) => m.id === assignedId);

          return (
            <div
              key={index}
              onClick={() => handleTileClick(index)}
              onContextMenu={(e) => {
                e.preventDefault();
                if (isUnlocked) setSelectedSlot(index);
              }}
              className={`relative flex flex-col items-center justify-center p-2 rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden ${
                !isUnlocked
                  ? 'bg-slate-950/60 border-amber-500/30 text-amber-400 hover:border-amber-500/60'
                  : assignedModule
                  ? 'bg-slate-800/90 border-cyan-500/40 text-cyan-400 hover:scale-[1.02] hover:bg-slate-800 shadow-lg'
                  : 'bg-slate-800/30 border-dashed border-slate-700/80 text-slate-500 hover:border-slate-500 hover:text-slate-300'
              }`}
            >
              {!isUnlocked ? (
                <>
                  <Lock className="w-5 h-5 mb-1 text-amber-400" />
                  <span className="text-[10px] font-bold text-amber-400">{cost} K</span>
                </>
              ) : assignedModule ? (
                <>
                  <assignedModule.icon className="w-7 h-7 mb-1 text-cyan-400" />
                  <span className="text-xs font-semibold text-slate-200 truncate max-w-full px-1">
                    {assignedModule.label}
                  </span>
                </>
              ) : (
                <>
                  <Plus className="w-7 h-7 text-slate-400 mb-0.5" />
                  <span className="text-[10px] text-slate-500 font-medium">Přidat</span>
                </>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-[11px] text-center text-slate-500 flex-shrink-0">
        První 3 řady jsou zdarma. Podržením políčka ho můžeš upravit nebo vymazat.
      </p>

      {/* Modal pro výběr modulu */}
      {selectedSlot !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-sm rounded-3xl p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-base text-white">
                  Vyber modul na Políčko {selectedSlot + 1}
                </h3>
                <p className="text-xs text-slate-400">Co chceš mít po ruce?</p>
              </div>
              <button
                onClick={() => setSelectedSlot(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto p-1">
              {ModuleList.list.map((mod) => {
                const Icon = mod.icon;
                const isSelected = plochaSlots[selectedSlot] === mod.id;
                return (
                  <button
                    key={mod.id}
                    onClick={() => {
                      setPlochaSlot(selectedSlot, mod.id);
                      setSelectedSlot(null);
                    }}
                    className={`flex flex-col items-center p-3 rounded-2xl border text-center transition-all ${
                      isSelected
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400 font-semibold'
                        : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <Icon className="w-5 h-5 mb-1.5" />
                    <span className="text-[11px] font-medium">{mod.label}</span>
                  </button>
                );
              })}
            </div>

            {plochaSlots[selectedSlot] && (
              <button
                onClick={() => {
                  setPlochaSlot(selectedSlot, null);
                  setSelectedSlot(null);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-medium hover:bg-red-500/20 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Odebrat z okénka</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
                                        }
                                        
