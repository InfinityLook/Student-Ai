'use client';

import React, { useState } from 'react';
import { ArrowLeft, Sparkles, CheckCircle2, Clock } from 'lucide-react';

export default function StudyPlanModule({ onBack }: { onBack: () => void }) {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Zopakovat kapitolu 1-3 z Matematiky', time: 'Dnes, 15:00', done: true },
    { id: 2, title: 'Vyřešit vzorový test fyziky', time: 'Dnes, 17:00', done: false },
    { id: 3, title: 'Projít flashcards anglické slovní zásoby', time: 'Zítra, 10:00', done: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition cursor-pointer bg-white/5 px-4 py-2 rounded-xl border border-white/10"
      >
        <ArrowLeft className="w-4 h-4" /> Zpět do Workspace
      </button>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-pink-400" />
          <h1 className="text-3xl font-black text-white">AI Studijní Plánovač</h1>
        </div>
        <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-lg shadow-pink-500/20 hover:opacity-90 transition cursor-pointer">
          Generovat nový plán ✨
        </button>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div 
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={`p-5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
              task.done 
                ? 'bg-white/[0.02] border-white/5 opacity-60' 
                : 'bg-white/5 border-white/10 hover:border-pink-500/40'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                task.done ? 'bg-pink-500 border-pink-500 text-white' : 'border-white/30'
              }`}>
                {task.done && <CheckCircle2 className="w-4 h-4" />}
              </div>
              <div>
                <h3 className={`font-bold text-sm ${task.done ? 'line-through text-slate-400' : 'text-white'}`}>
                  {task.title}
                </h3>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3.5 h-3.5" /> {task.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
