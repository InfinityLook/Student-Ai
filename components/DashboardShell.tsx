'use client';

import React, { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import MenuHubModule from '@/components/modules/MenuHubModule';
import PlochaModule from '@/components/modules/PlochaModule';
import KairoModule from '@/components/modules/KairoModule';
import PetModule from '@/components/modules/PetModule';
import SettingsModule from '@/components/modules/SettingsModule';
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
  Grid3X3,
  Dog,
  Coins,
  User,
  Sparkles,
  BrainCircuit,
  FileText,
  Edit3,
  Calendar,
  Timer,
  Folder,
  ShoppingBag,
  Settings
} from 'lucide-react';

const sidebarItems = [
  { id: 'home', label: 'Hub', icon: LayoutGrid },
  { id: 'plocha', label: 'Plocha', icon: Grid3X3 },
  { id: 'pets', label: 'Mazlíček', icon: Dog },
  { id: 'shop', label: 'Obchod', icon: ShoppingBag },
  { id: 'kairo', label: 'Kairo AI', icon: Bot },
  { id: 'solver', label: 'AI Řešitel', icon: Sparkles },
  { id: 'flashcards', label: 'Kartičky', icon: BrainCircuit },
  { id: 'notes', label: 'Poznámky', icon: FileText },
  { id: 'editor', label: 'Editor', icon: Edit3 },
  { id: 'planner', label: 'Plánovač', icon: Calendar },
  { id: 'timer', label: 'Časovač', icon: Timer },
  { id: 'files', label: 'Soubory', icon: Folder },
  { id: 'profile', label: 'Profil', icon: User },
  { id: 'settings', label: 'Nastavení', icon: Settings },
];

export default function DashboardShell() {
  const activeModule = useStore((state) => state.activeModule);
  const setActiveModule = useStore((state) => state.setActiveModule);
  const credits = useStore((state) => state.credits);
  const checkTaskReminders = useStore((state) => state.checkTaskReminders);

  useEffect(() => {
    checkTaskReminders();
  }, [checkTaskReminders]);

  const renderModule = () => {
    switch (activeModule) {
      case 'home': return <MenuHubModule />;
      case 'plocha': return <PlochaModule />;
      case 'pets': return <PetModule />;
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
      case 'settings': return <SettingsModule />;
      default: return <MenuHubModule />;
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
          {sidebarItems.map((item) => {
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

      {/* Hlavní aplikace */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Mobilní hlavička */}
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

        {/* Zobrazený modul */}
        <main className="flex-1 overflow-y-auto bg-slate-900 pb-20 md:pb-0">
          {renderModule()}
        </main>

        {/* SPODNÍ MENU (HUB, MAZLÍČEK, OBCHOD | PLOCHA UPROSTŘED | KAIRO, PROFIL, NASTAVENÍ) */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 backdrop-blur-xl bg-slate-950/95 border-t border-slate-800/80 px-2 py-2 flex justify-between items-center overflow-x-auto">
          {/* Hub */}
          <button
            onClick={() => setActiveModule('home')}
            className={`flex flex-col items-center justify-center py-1 px-1.5 transition-all min-w-[48px] ${
              activeModule === 'home' ? 'text-cyan-400 font-semibold scale-105' : 'text-slate-400'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="text-[9px] mt-0.5">Hub</span>
          </button>

          {/* Mazlíček */}
          <button
            onClick={() => setActiveModule('pets')}
            className={`flex flex-col items-center justify-center py-1 px-1.5 transition-all min-w-[48px] ${
              activeModule === 'pets' ? 'text-pink-400 font-semibold scale-105' : 'text-slate-400'
            }`}
          >
            <Dog className="w-4 h-4" />
            <span className="text-[9px] mt-0.5">Mazlíček</span>
          </button>

          {/* Obchod */}
          <button
            onClick={() => setActiveModule('shop')}
            className={`flex flex-col items-center justify-center py-1 px-1.5 transition-all min-w-[48px] ${
              activeModule === 'shop' ? 'text-yellow-400 font-semibold scale-105' : 'text-slate-400'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-[9px] mt-0.5">Obchod</span>
          </button>

          {/* PLOCHA (Uprostřed) */}
          <button
            onClick={() => setActiveModule('plocha')}
            className={`flex flex-col items-center justify-center p-2 -mt-3 rounded-2xl shadow-lg transition-all border shrink-0 ${
              activeModule === 'plocha'
                ? 'bg-gradient-to-tr from-cyan-500 to-blue-600 text-white border-cyan-300 shadow-cyan-500/30 scale-105'
                : 'bg-slate-800/90 text-cyan-400 border-slate-700/80 hover:bg-slate-800'
            }`}
          >
            <Grid3X3 className="w-5 h-5 stroke-[2.2]" />
            <span className="text-[9px] font-bold mt-0.5">Plocha</span>
          </button>

          {/* Kairo AI */}
          <button
            onClick={() => setActiveModule('kairo')}
            className={`flex flex-col items-center justify-center py-1 px-1.5 transition-all min-w-[48px] ${
              activeModule === 'kairo' ? 'text-cyan-400 font-semibold scale-105' : 'text-slate-400'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span className="text-[9px] mt-0.5">Kairo</span>
          </button>

          {/* Profil */}
          <button
            onClick={() => setActiveModule('profile')}
            className={`flex flex-col items-center justify-center py-1 px-1.5 transition-all min-w-[48px] ${
              activeModule === 'profile' ? 'text-cyan-400 font-semibold scale-105' : 'text-slate-400'
            }`}
          >
            <User className="w-4 h-4" />
            <span className="text-[9px] mt-0.5">Profil</span>
          </button>

          {/* Nastavení */}
          <button
            onClick={() => setActiveModule('settings')}
            className={`flex flex-col items-center justify-center py-1 px-1.5 transition-all min-w-[48px] ${
              activeModule === 'settings' ? 'text-teal-400 font-semibold scale-105' : 'text-slate-400'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span className="text-[9px] mt-0.5">Nastavení</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
