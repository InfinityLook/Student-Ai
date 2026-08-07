'use client';

import React, { useEffect, useState } from 'react';
import { useStore, getPlochaSlotCost } from '@/store/useStore';
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
  Trash2,
  Grid3X3,
  Dog,
  Settings
} from 'lucide-react';

interface ModuleOption {
  id: string;
  label: string;
  icon: React.ElementType;
}

// Všechny dostupné moduly z Hubu k přidání na Plochu
const hubModules: ModuleOption[] = [
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

export default function DashboardShell() {
  const activeModule = useStore((state) => state.activeModule);
  const setActiveModule = useStore((state) => state.setActiveModule);
  const credits = useStore((state) => state.credits);
  const checkTaskReminders = useStore((state) => state.checkTaskReminders);

  const plochaSlots = useStore((state) => state.plochaSlots);
  const unlockedPlochaSlots = useStore((state) => state.unlockedPlochaSlots);
  const unlockPlochaSlot = useStore((state) => state.unlockPlochaSlot);
  const setPlochaSlot = useStore((state) => state.setPlochaSlot);

  // Stav pro otevření okna Plocha a výběr modulu
  const [isPlochaOpen, setIsPlochaOpen] = useState(false);
  const [selectedSlotForPicker, setSelectedSlotForPicker] = useState<number | null>(null);

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

  const handlePlochaTileClick = (index: number) => {
    const isUnlocked = unlockedPlochaSlots.includes(index);
    if (!isUnlocked) {
      // Odemknout políčko
      unlockPlochaSlot(index);
    } else {
      const assignedId = plochaSlots[index];
      if (assignedId) {
        // Spustit modul a zavřít Plochu
        setActiveModule(assignedId);
        setIsPlochaOpen(false);
      } else {
        // Otevřít výběr modulu
        setSelectedSlotForPicker(index);
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
          {hubModules.map((item) => {
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

        {/* Mobilní spodní lišta (Hub, Plocha uprostřed, Kairo AI) */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 backdrop-blur-xl bg-slate-950/95 border-t border-slate-800/80 px-6 py-2 flex justify-center items-center gap-10">
          {/* Hub */}
          <button
            onClick={() => setActiveModule('home')}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
              activeModule === 'home' ? 'text-cyan-400 font-semibold scale-105' : 'text-slate-400'
            }`}
          >
            <LayoutGrid className="w-5 h-5" />
            <span className="text-[10px] mt-1">Hub</span>
          </button>

          {/* PLOCHA (Uprostřed) */}
          <button
            onClick={() => setIsPlochaOpen(true)}
            className="flex flex-col items-center justify-center p-2.5 -mt-4 bg-gradient-to-tr from-cyan-500 to-blue-600 text-white rounded-2xl shadow-lg shadow-cyan-500/25 active:scale-95 transition-transform border border-cyan-400/30"
          >
            <Grid3X3 className="w-6 h-6 stroke-[2.2]" />
            <span className="text-[10px] font-bold mt-0.5">Plocha</span>
          </button>

          {/* Kairo AI */}
          <button
            onClick={() => setActiveModule('kairo')}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
              activeModule === 'kairo' ? 'text-cyan-400 font-semibold scale-105' : 'text-slate-400'
            }`}
          >
            <Bot className="w-5 h-5" />
            <span className="text-[10px] mt-1">Kairo</span>
          </button>
        </nav>
      </div>

      {/* OKNO PLOCHY (3x5 Mřížka s vypnutým scrollem) */}
      {isPlochaOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-end sm:justify-center items-center p-3 sm:p-4 overflow-hidden">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-5 space-y-4 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Hlavička Plochy */}
            <div className="flex justify-between items-center border-b border-slate-800 pb-3 flex-shrink-0">
              <div>
                <h3 className="font-bold text-lg text-white flex items-center gap-2">
                  <Grid3X3 className="w-5 h-5 text-cyan-400" />
                  <span>Moje Plocha (3×5)</span>
                </h3>
                <p className="text-xs text-slate-400">Rychlé zkratky na tvoje oblíbené moduly</p>
              </div>
              <button
                onClick={() => setIsPlochaOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white bg-slate-800/80"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mřížka 3x5 – Zakázaný scroll (`overflow-hidden`) */}
            <div className="grid grid-cols-3 gap-2.5 flex-1 overflow-hidden p-1">
              {Array.from({ length: 15 }).map((_, index) => {
                const isUnlocked = unlockedPlochaSlots.includes(index);
                const cost = getPlochaSlotCost(index);
                const assignedId = plochaSlots[index];
                const assignedModule = hubModules.find((m) => m.id === assignedId);

                return (
                  <button
                    key={index}
                    onClick={() => handlePlochaTileClick(index)}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      if (isUnlocked && assignedId) {
                        setSelectedSlotForPicker(index);
                      }
                    }}
                    className={`relative flex flex-col items-center justify-center p-2 rounded-2xl border transition-all duration-200 aspect-square overflow-hidden ${
                      !isUnlocked
                        ? 'bg-slate-950/60 border-amber-500/30 text-amber-400 hover:border-amber-500/60'
                        : assignedModule
                        ? 'bg-slate-800/90 border-cyan-500/40 text-cyan-400 hover:bg-slate-800 shadow-md'
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
                        <assignedModule.icon className="w-6 h-6 mb-1 text-cyan-400" />
                        <span className="text-[11px] font-medium text-slate-200 truncate max-w-full px-1">
                          {assignedModule.label}
                        </span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-6 h-6 text-slate-400 mb-0.5" />
                        <span className="text-[9px] text-slate-500 font-medium">Přidat</span>
                      </>
                    )}
                  </button>
                );
              })}
            </div>

            <p className="text-[11px] text-center text-slate-500 flex-shrink-0 pt-1">
              První 3 řady jsou zdarma. Podržením políčka ho změníš.
            </p>
          </div>
        </div>
      )}

      {/* MODAL PRO VÝBĚR MODULU DO POLÍČKA PLOCHY */}
      {selectedSlotForPicker !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-sm rounded-3xl p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-base text-white">
                  Vyber modul na Políčko {selectedSlotForPicker + 1}
                </h3>
                <p className="text-xs text-slate-400">Co má toto tlačítko otevírat?</p>
              </div>
              <button
                onClick={() => setSelectedSlotForPicker(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Výběr modulů z Hubu */}
            <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto p-1">
              {hubModules.map((mod) => {
                const Icon = mod.icon;
                const isSelected = plochaSlots[selectedSlotForPicker] === mod.id;
                return (
                  <button
                    key={mod.id}
                    onClick={() => {
                      setPlochaSlot(selectedSlotForPicker, mod.id);
                      setSelectedSlotForPicker(null);
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

            {plochaSlots[selectedSlotForPicker] && (
              <button
                onClick={() => {
                  setPlochaSlot(selectedSlotForPicker, null);
                  setSelectedSlotForPicker(null);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-medium hover:bg-red-500/20 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Odebrat modul z políčka</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
        }
                
