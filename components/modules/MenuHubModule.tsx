'use client';

import React from 'react';
import { useStore } from '@/store/useStore';
import { 
  Bot, 
  FileText, 
  BrainCircuit, 
  Timer, 
  Sparkles, 
  Calendar, 
  User, 
  ShoppingBag, 
  Folder,
  Edit3
} from 'lucide-react';

interface ModuleCard {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const modules: ModuleCard[] = [
  { id: 'kairo', title: 'Kairo AI', description: 'Osobní AI asistent a kouč', icon: Bot, color: 'from-purple-500 to-indigo-600' },
  { id: 'solver', title: 'AI Řešitel', description: 'Pomocník pro úkoly a výpočty', icon: Sparkles, color: 'from-amber-500 to-orange-600' },
  { id: 'notes', title: 'Poznámky', description: 'Chytrá správa učebních materiálů', icon: FileText, color: 'from-blue-500 to-cyan-600' },
  { id: 'flashcards', title: 'Kartičky', description: 'Efektivní opakování učiva', icon: BrainCircuit, color: 'from-emerald-500 to-teal-600' },
  { id: 'timer', title: 'Časovač', description: 'Pomodoro a soustředění', icon: Timer, color: 'from-rose-500 to-pink-600' },
  { id: 'planner', title: 'Plánovač', description: 'Úkoly a rozvrh studia', icon: Calendar, color: 'from-violet-500 to-purple-600' },
  { id: 'files', title: 'Soubory', description: 'Správce složek a podkladů', icon: Folder, color: 'from-sky-500 to-blue-600' },
  { id: 'editor', title: 'Editor', description: 'Tvorba a úprava dokumentů', icon: Edit3, color: 'from-fuchsia-500 to-pink-600' },
  { id: 'shop', title: 'Obchod', description: 'Odměny a vylepšení profilu', icon: ShoppingBag, color: 'from-yellow-500 to-amber-600' },
  { id: 'profile', title: 'Profil', description: 'Statistiky a úroveň', icon: User, color: 'from-slate-600 to-slate-800' },
];

export default function MenuHubModule() {
  const setActiveModule = useStore((state) => state.setActiveModule);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-white">Student AI Hub</h1>
        <p className="text-slate-400 mt-1">Vyber si modul a začni pracovat.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((mod) => {
          const Icon = mod.icon;
          return (
            <button
              key={mod.id}
              onClick={() => setActiveModule(mod.id)}
              className="group relative overflow-hidden rounded-2xl bg-slate-800/60 p-6 text-left border border-slate-700/50 hover:border-slate-500/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${mod.color} shadow-lg mb-4 text-white`}>
                <Icon className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
                {mod.title}
              </h2>
              <p className="text-sm text-slate-400 mt-1">{mod.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
