'use client';

import React, { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import MenuHubModule from '@/components/modules/MenuHubModule';
import KairoModule from '@/components/modules/KairoModule';
import NotesModule from '@/components/modules/NotesModule';
import FlashcardsModule from '@/components/modules/FlashcardsModule';
import FocusTimerModule from '@/components/modules/FocusTimerModule';
import AISolver from '@/components/modules/AISolver';
import TaskPlannerModule from '@/components/modules/TaskPlannerModule';
import ProfileModule from '@/components/modules/ProfileModule';
import ShopModule from '@/components/modules/ShopModule';
import FileSystemModule from '@/components/modules/FileSystemModule';
import DocumentEditorModule from '@/components/DocumentEditorModule';
import NotificationSystem from '@/components/NotificationSystem';

import { 
  LayoutGrid, 
  Bot, 
  FileText, 
  BrainCircuit, 
  Timer, 
  Sparkles, 
  Calendar, 
  User, 
  ShoppingBag, 
  Folder,
  Edit3,
  Coins,
  Plus,
  Lock,
  X,
  Trash2
} from 'lucide-react';

interface ModuleOption {
  id: string;
  label: string;
  icon: React.ElementType;
}

// Všechny dostupné moduly pro výběr do vlastních slotů
const selectableModules: ModuleOption[] = [
  { id: 'solver', label: 'Řešitel', icon: Sparkles },
  { id: 'notes', label: 'Poznámky', icon: FileText },
  { id: 'flashcards', label: 'Kartičky', icon: BrainCircuit },
  { id: 'timer', label: 'Časovač', icon: Timer },
  { id: 'planner', label: 'Plánovač', icon: Calendar },
  { id: 'files', label: 'Soubory', icon: Folder },
  { id: 'editor', label: 'Editor', icon: Edit3 },
  { id: 'shop', label: 'Obchod', icon: ShoppingBag },
  { id: 'profile', label: 'Profil', icon: User },
];

const navItems = [
  { id: 'home', label: 'Hub', icon: LayoutGrid },
  { id: 'kairo', label: 'Kairo AI', icon: Bot },
  ...selectableModules,
];

// Konfigurace cen pro 3 přizpůsobitelné sloty
const slotConfigs = [
  { cost: 0, label: 'Zdarma' },
  { cost: 50, label: '50 K' },
  { cost: 200, label: '200 K' },
];

export default function DashboardShell() {
  const activeModule = useStore((state) => state.activeModule);
  const setActiveModule = useStore((state) => state.setActiveModule);
  const credits = useStore((state) => state.credits);
  const checkTaskReminders = useStore((state) => state.checkTaskReminders);

  const unlockedNavSlots = useStore((state) => state.unlockedNavSlots);
  const customNavSlots = useStore((state) => state.customNavSlots);
  const unlockNavSlot = useStore((state) => state.unlockNavSlot);
  const setCustomNavSlot = useStore((state) => state.setCustomNavSlot);

  // Stav dialogového okna pro výběr modulu nebo odemčení
  const [activeSlotModal, setActiveSlotModal] = useState<number | null>(null);

  useEffect(() => {
    checkTaskReminders();
  }, [checkTaskReminders]);

  const renderModule = () => {
    switch (activeModule) {
      case 'home': return <MenuHubModule />;
      case 'kairo': return <KairoModule />;
      case 'notes': return <NotesModule />;
      case 'flashcards': return <FlashcardsModule />;
      case 'timer': return <FocusTimerModule />;
      case 'solver': return <AISolver />;
      case 'planner': return <TaskPlannerModule />;
      case 'profile': return <ProfileModule />;
      case 'shop': return <ShopModule />;
      case 'files': return <FileSystemModule />;
      case 'editor': return <DocumentEditorModule />;
      default: return <MenuHubModule />;
    }
  };

  const handleSlotClick = (slotIndex: number) => {
    const isUnlocked = unlockedNavSlots.includes(slotIndex);
    if (!isUnlocked) {
      // Nabídnout odemčení za kredity
      const config = slotConfigs[slotIndex];
      if (unlockNavSlot(slotIndex, config.cost)) {
        setActiveSlotModal(slotIndex);
      }
    } else {
      const assignedModuleId = customNavSlots[slotIndex];
      if (assignedModuleId) {
        setActiveModule(assignedModuleId);
      } else {
        setActiveSlotModal(slotIndex);
      }
    }
  };

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden relative">
      <NotificationSystem />

      {/* Desktopové boční menu */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-950 border-r border-slate-800/80">
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
          <button 
            onClick={() => setActiveModule('home')}
            className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          >
            Student AI
          </button>
          <div className="flex items-center gap-1.5 bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-xs font-semibold border border-amber-500/20">
            <Coins className="w-3.5 h-3.5" />
            <span>{credits}</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : ''}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Hlavní obsahová plocha */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Mobilní horní lišta */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 z-40">
          <button 
            onClick={() => setActiveModule('home')}
            className="font-bold text-lg bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          >
            Student AI
          </button>
          <div className="flex items-center gap-1.5 bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-full text-xs font-semibold border border-amber-500/20">
            <Coins className="w-3.5 h-3.5" />
            <span>{credits}</span>
          </div>
        </header>

        {/* Vybraný modul */}
        <main className="flex-1 overflow-y-auto bg-slate-900 pb-20 md:pb-0">
          {renderModule()}
        </main>

        {/* Mobilní spodní lišta (Hub, Kairo + 3 sloty) */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-950/90 border-t border-slate-800/80 px-2 py-1.5 flex justify-around items-center">
          {/* 1. Pevný Hub */}
          <button
            onClick={() => setActiveModule('home')}
            className={`relative flex flex-col items-center justify-center py-1.5 px-2.5 rounded-xl transition-all duration-200 ${
              activeModule === 'home' ? 'text-cyan-400 font-semibold scale-105' : 'text-slate-400'
            }`}
          >
            {activeModule === 'home' && <span className="absolute inset-0 bg-cyan-500/10 rounded-xl border border-cyan-500/20 -z-10" />}
            <LayoutGrid className="w-5 h-5 stroke-[2px]" />
            <span className="text-[10px] mt-1">Hub</span>
          </button>

          {/* 2. Pevné Kairo */}
          <button
            onClick={() => setActiveModule('kairo')}
            className={`relative flex flex-col items-center justify-center py-1.5 px-2.5 rounded-xl transition-all duration-200 ${
              activeModule === 'kairo' ? 'text-cyan-400 font-semibold scale-105' : 'text-slate-400'
            }`}
          >
            {activeModule === 'kairo' && <span className="absolute inset-0 bg-cyan-500/10 rounded-xl border border-cyan-500/20 -z-10" />}
            <Bot className="w-5 h-5 stroke-[2px]" />
            <span className="text-[10px] mt-1">Kairo</span>
          </button>

          {/* 3 Nastavitelné sloty */}
          {slotConfigs.map((config, index) => {
            const isUnlocked = unlockedNavSlots.includes(index);
            const assignedId = customNavSlots[index];
            const assignedModule = selectableModules.find((m) => m.id === assignedId);
            const isActive = assignedId && activeModule === assignedId;

            return (
              <button
                key={index}
                onClick={() => handleSlotClick(index)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  if (isUnlocked) setActiveSlotModal(index);
                }}
                className={`relative flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all duration-200 active:scale-95 ${
                  isActive
                    ? 'text-cyan-400 font-semibold scale-105'
                    : isUnlocked
                    ? assignedModule
                      ? 'text-slate-300'
                      : 'text-slate-500 hover:text-slate-300'
                    : 'text-amber-400/80'
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 bg-cyan-500/10 rounded-xl border border-cyan-500/20 -z-10" />
                )}

                {!isUnlocked ? (
                  <>
                    <Lock className="w-4 h-4 mb-0.5 text-amber-400" />
                    <span className="text-[9px] font-bold text-amber-400">{config.label}</span>
                  </>
                ) : assignedModule ? (
                  <>
                    <assignedModule.icon className="w-5 h-5 stroke-[2px]" />
                    <span className="text-[10px] mt-1">{assignedModule.label}</span>
                  </>
                ) : (
                  <>
                    <div className="w-5 h-5 rounded-full border border-dashed border-slate-600 flex items-center justify-center">
                      <Plus className="w-3 h-3 text-slate-400" />
                    </div>
                    <span className="text-[9px] mt-1 text-slate-500">{config.label}</span>
                  </>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Modal pro výber nebo změnu modulu ve slotu */}
      {activeSlotModal !== null && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-sm rounded-2xl p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-semibold text-lg text-white">
                  Nastavit Slot {activeSlotModal + 1}
                </h3>
                <p className="text-xs text-slate-400">Vyber si modul pro rychlý přístup do lišty</p>
              </div>
              <button
                onClick={() => setActiveSlotModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2.5 max-h-60 overflow-y-auto p-1">
              {selectableModules.map((mod) => {
                const Icon = mod.icon;
                const isSelected = customNavSlots[activeSlotModal] === mod.id;
                return (
                  <button
                    key={mod.id}
                    onClick={() => {
                      setCustomNavSlot(activeSlotModal, mod.id);
                      setActiveSlotModal(null);
                    }}
                    className={`flex flex-col items-center p-3 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400 font-semibold'
                        : 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <Icon className="w-5 h-5 mb-1.5" />
                    <span className="text-xs">{mod.label}</span>
                  </button>
                );
              })}
            </div>

            {customNavSlots[activeSlotModal] && (
              <button
                onClick={() => {
                  setCustomNavSlot(activeSlotModal, null);
                  setActiveSlotModal(null);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-medium hover:bg-red-500/20 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Odebrat modul ze slotu</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
      }
            
