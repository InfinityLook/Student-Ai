'use client';

import React, { useState } from 'react';
import { ArrowLeft, BrainCircuit, Plus, Award } from 'lucide-react';
import { useNotification } from '../NotificationSystem';

export default function ExamsModule({ onBack }: { onBack: () => void }) {
  const { addNotification } = useNotification();
  const [exams, setExams] = useState([
    { id: 1, subject: 'Umělá inteligence a strojové učení', date: '25. června 2026', room: 'A-102', status: 'Přihlášeno' },
    { id: 2, subject: 'Pokročilé databázové systémy', date: '30. června 2026', room: 'B-305', status: 'Příprava' },
  ]);

  const handleAdd = () => {
    addNotification('success', 'Zkouška byla úspěšně zaregistrována! 🎓');
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
          <BrainCircuit className="w-8 h-8 text-pink-400" />
          <h1 className="text-3xl font-black text-white">Zkoušky & Termíny</h1>
        </div>
        <button 
          onClick={handleAdd}
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-lg shadow-pink-500/20 hover:opacity-90 transition cursor-pointer flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Přidat zkoušku
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {exams.map((ex) => (
          <div key={ex.id} className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-3 backdrop-blur-xl hover:border-pink-500/40 transition">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-white text-base">{ex.subject}</h3>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {ex.status}
              </span>
            </div>
            <p className="text-xs text-slate-300 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-pink-400" /> Termín: {ex.date} | Místnost: {ex.room}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
