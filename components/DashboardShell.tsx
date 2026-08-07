'use client';

import React, { useEffect } from 'react';
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
  Coins
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Hub', icon: LayoutGrid },
  { id: 'kairo', label: 'Kairo AI', icon: Bot },
  { id: 'solver', label: 'AI Řešitel', icon: Sparkles },
  { id: 'notes', label: 'Poznámky', icon: FileText },
  { id: 'flashcards', label: 'Kartičky', icon: BrainCircuit },
  { id: 'timer', label: 'Časovač', icon: Timer },
  { id: 'planner', label: 'Plánovač', icon: Calendar },
  { id: 'files', label: 'Soubory', icon: Folder },
  { id: 'editor', label: 'Editor', icon: Edit3 },
  { id: 'shop', label: 'Obchod', icon: ShoppingBag },
  { id: 'profile', label: 'Profil', icon: User },
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
      case 'home':
        return <MenuHubModule />;
      case 'kairo':
        return <KairoModule />;
      case 'notes':
        return <NotesModule />;
      case 'flashcards':
        return <FlashcardsModule />;
      case 'timer':
        return <FocusTimerModule />;
      case 'solver':
        return <AISolver />;
      case 'planner':
        return <TaskPlannerModule />;
      case 'profile':
        return <ProfileModule />;
      case 'shop':
        return <ShopModule />;
      case 'files':
        return <FileSystemModule />;
      case 'editor':
        return <DocumentEditorModule />;
      default:
        return <MenuHubModule />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden relative">
      <NotificationSystem />

      {/* Boční navigace pro desktopy */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-950 border-r border-slate-800">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <button 
            onClick={() => setActiveModule('home')}
            className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          >
            Student AI
          </button>
          <div className="flex items-center gap-1 bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-full text-xs font-semibold border border-amber-500/20">
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
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Hlavní obsahová část */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Mobilní hlavička */}
        <header className="md:hidden flex items-center justify-between p-4 bg-slate-950 border-b border-slate-800">
          <button 
            onClick={() => setActiveModule('home')}
            className="font-bold text-lg text-cyan-400"
          >
            Student AI
          </button>
          <div className="flex items-center gap-1 bg-amber-500/10 text-amber-400 px-2 py-1 rounded-full text-xs font-semibold">
            <Coins className="w-3.5 h-3.5" />
            <span>{credits}</span>
          </div>
        </header>

        {/* Dynamicky vložený modul */}
        <main className="flex-1 overflow-y-auto bg-slate-900">
          {renderModule()}
        </main>

        {/* Mobilní spodní lišta */}
        <nav className="md:hidden border-t border-slate-800 bg-slate-950 flex justify-around p-2">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id)}
                className={`flex flex-col items-center p-2 text-xs ${
                  isActive ? 'text-cyan-400' : 'text-slate-400'
                }`}
              >
                <Icon className="w-5 h-5" />
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
