'use client';

import React, { useState } from 'react';
import { ArrowLeft, User, Mail, GraduationCap, Save } from 'lucide-react';
import { useNotification } from '../NotificationSystem';

export default function ProfileModule({ onBack }: { onBack: () => void }) {
  const { addNotification } = useNotification();
  const [name, setName] = useState('Hustler Student');
  const [email, setEmail] = useState('student@skola.cz');
  const [major, setMajor] = useState('Informatika & Kybernetika');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addNotification('success', 'Profil byl úspěšně aktualizován! ✨');
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition cursor-pointer bg-white/5 px-4 py-2 rounded-xl border border-white/10"
      >
        <ArrowLeft className="w-4 h-4" /> Zpět do Workspace
      </button>

      <div className="flex items-center gap-3">
        <User className="w-8 h-8 text-pink-400" />
        <h1 className="text-3xl font-black text-white">Uživatelský profil</h1>
      </div>

      {/* Profile Card Header */}
      <div className="bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 border border-white/10 p-6 rounded-3xl flex flex-col md:flex-row items-center gap-6 backdrop-blur-xl">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-pink-500 to-indigo-500 flex items-center justify-center font-black text-white text-3xl shadow-xl shadow-pink-500/20">
          ST
        </div>
        <div className="text-center md:text-left space-y-1">
          <h2 className="text-xl font-bold text-white">{name}</h2>
          <p className="text-xs text-slate-400">{email}</p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
              Level 4 ⚡
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              VIP Student 🛡️
            </span>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <form onSubmit={handleSave} className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-5 backdrop-blur-xl">
        <h3 className="text-lg font-bold text-white mb-2">Osobní údaje</h3>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-pink-400" /> Uživatelské jméno
          </label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-pink-500 transition"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-purple-400" /> E-mailová adresa
          </label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500 transition"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" /> Studijní obor / Škola
          </label>
          <input 
            type="text" 
            value={major} 
            onChange={(e) => setMajor(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500 transition"
          />
        </div>

        <div className="pt-2">
          <button 
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white font-bold rounded-2xl text-xs transition shadow-lg shadow-pink-500/25 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" /> Uložit změny
          </button>
        </div>
      </form>
    </div>
  );
          }
