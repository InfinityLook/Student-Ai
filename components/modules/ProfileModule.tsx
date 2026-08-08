'use client';

import React, { useState } from 'react';
import { ArrowLeft, User, Mail, BookOpen, Shield, Award, Edit3, Save, Sparkles } from 'lucide-react';

export default function ProfileModule({ onBack }: { onBack: () => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Hustler Student',
    email: 'student@skola.cz',
    school: 'Univerzita Karlova',
    program: 'Umělá inteligence a datová věda',
    bio: 'Budoucí AI engineer & cyberpunk enthusiast ⚡',
  });

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Zpět tlačítko */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition cursor-pointer bg-white/5 px-4 py-2 rounded-xl border border-white/10"
      >
        <ArrowLeft className="w-4 h-4" /> Zpět do Workspace
      </button>

      {/* Hlavička */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/20">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white">Profil studenta</h1>
            <p className="text-xs text-slate-400">Správa osobních údajů a nastavení účtu</p>
          </div>
        </div>
        <button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs px-5 py-2.5 rounded-2xl transition cursor-pointer flex items-center gap-2 shadow-sm"
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4 text-emerald-400" /> Uložit změny
            </>
          ) : (
            <>
              <Edit3 className="w-4 h-4 text-pink-400" /> Upravit profil
            </>
          )}
        </button>
      </div>

      {/* Hlavní karta profilu */}
      <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-6 md:p-8 backdrop-blur-xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-pink-400" /> Celé jméno
            </label>
            {isEditing ? (
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-pink-500 transition"
              />
            ) : (
              <div className="bg-white/5 border border-white/5 rounded-2xl px-4 py-3 text-white text-sm font-semibold">
                {profile.name}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-cyan-400" /> E-mailová adresa
            </label>
            {isEditing ? (
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-pink-500 transition"
              />
            ) : (
              <div className="bg-white/5 border border-white/5 rounded-2xl px-4 py-3 text-white text-sm font-semibold">
                {profile.email}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-purple-400" /> Škola / Univerzita
            </label>
            {isEditing ? (
              <input
                type="text"
                value={profile.school}
                onChange={(e) => setProfile({ ...profile, school: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-pink-500 transition"
              />
            ) : (
              <div className="bg-white/5 border border-white/5 rounded-2xl px-4 py-3 text-white text-sm font-semibold">
                {profile.school}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-amber-400" /> Studijní program
            </label>
            {isEditing ? (
              <input
                type="text"
                value={profile.program}
                onChange={(e) => setProfile({ ...profile, program: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-pink-500 transition"
              />
            ) : (
              <div className="bg-white/5 border border-white/5 rounded-2xl px-4 py-3 text-white text-sm font-semibold">
                {profile.program}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Bio / Motto
          </label>
          {isEditing ? (
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              rows={2}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-pink-500 transition resize-none"
            />
          ) : (
            <div className="bg-white/5 border border-white/5 rounded-2xl px-4 py-3 text-white text-sm">
              {profile.bio}
            </div>
          )}
        </div>
      </div>

      {/* Rychlé statistiky účtu */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/[0.03] border border-white/10 p-5 rounded-3xl backdrop-blur-xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold">
            🔥
          </div>
          <div>
            <p className="text-xs text-slate-400">Aktuální streak</p>
            <h4 className="text-lg font-black text-white">3 dny</h4>
          </div>
        </div>

        <div className="bg-white/[0.03] border border-white/10 p-5 rounded-3xl backdrop-blur-xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
            ⭐
          </div>
          <div>
            <p className="text-xs text-slate-400">Úroveň účtu</p>
            <h4 className="text-lg font-black text-white">Level 4</h4>
          </div>
        </div>

        <div className="bg-white/[0.03] border border-white/10 p-5 rounded-3xl backdrop-blur-xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
            ⚡
          </div>
          <div>
            <p className="text-xs text-slate-400">AI Kredity</p>
            <h4 className="text-lg font-black text-white">250 krystalů</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
