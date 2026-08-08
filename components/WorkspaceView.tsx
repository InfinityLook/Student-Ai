'use client';

import React from 'react';
import { Box, Brain, BookOpen, MessageSquare, Target, Zap } from 'lucide-react';

// Definice všech modulů v aplikaci
export const ALL_MODULES = [
  { id: 'spatial-learning', title: 'Spatial Learning 3.0', desc: 'Interaktivní 3D modely s AI výkladem a haptikou.', icon: Box, color: 'text-cyan-400', category: 'ai' },
  { id: 'ai-tutor', title: 'AI Studijní Kouč', desc: 'Personalizovaný plán a adaptivní testování.', icon: Brain, color: 'text-purple-400', category: 'ai' },
  { id: 'notes', title: 'Digitální poznámky', desc: 'Pokročilé skripta s AI shrnutím.', icon: BookOpen, color: 'text-blue-400', category: 'tools' },
  { id: 'chat', title: 'Studijní Chat', desc: 'Debata nad učivem v reálném čase.', icon: MessageSquare, color: 'text-green-400', category: 'tools' },
  { id: 'goals', title: 'Projektový Manažer', desc: 'Rozklad úkolů na mikro-milníky.', icon: Target, color: 'text-orange-400', category: 'tools' },
  { id: 'quick-fire', title: 'Quick Fire', desc: 'Bleskové procvičování kartiček.', icon: Zap, color: 'text-yellow-400', category: 'tools' },
];

interface WorkspaceViewProps {
  onSelectModule: (id: string) => void;
}

export default function WorkspaceView({ onSelectModule }: WorkspaceViewProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {ALL_MODULES.map((module) => (
        <button
          key={module.id}
          onClick={() => onSelectModule(module.id)}
          className="group flex flex-col p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all hover:scale-[1.02] cursor-pointer"
        >
          <module.icon className={`w-8 h-8 ${module.color} mb-4`} />
          <h3 className="text-sm font-bold text-white mb-1">{module.title}</h3>
          <p className="text-[10px] text-slate-400">{module.desc}</p>
        </button>
      ))}
    </div>
  );
}
