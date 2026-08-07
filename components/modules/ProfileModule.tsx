'use client';

import React, { useState } from 'react';
import { User, Mail, Shield, Bell, LogOut, Save, Camera } from 'lucide-react';

export default function ProfileModule() {
  const [name, setName] = useState('Kairo13');
  const [email, setEmail] = useState('kairo@student-ai.cz');
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8 text-slate-100">
      
      {/* HLAVIČKA */}
      <div>
        <h1 className="text-2xl font-bold text-white">Můj profil</h1>
        <p className="text-slate-400 text-sm mt-1">Správa osobních údajů a nastavení účtu.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* LEVÝ PANEL - AVATAR */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
          <div className="relative w-32 h-32 bg-slate-800 rounded-full flex items-center justify-center mb-4 border border-slate-700">
            <User className="w-16 h-16 text-slate-500" />
            <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 rounded-full text-white hover:bg-indigo-500 transition shadow-lg">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <h2 className="text-lg font-bold">{name}</h2>
          <p className="text-slate-400 text-sm">Premium člen</p>
        </div>

        {/* PRAVÝ PANEL - FORMULÁŘE */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Údaje */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-white">Osobní údaje</h3>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="text-indigo-400 text-sm font-medium hover:text-indigo-300"
              >
                {isEditing ? 'Zrušit' : 'Upravit'}
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Celé jméno</label>
                <input 
                  type="text" 
                  value={name} 
                  disabled={!isEditing}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white disabled:opacity-60 focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Emailová adresa</label>
                <input 
                  type="email" 
                  value={email} 
                  disabled={!isEditing}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white disabled:opacity-60 focus:border-indigo-500 focus:outline-none"
                />
              </div>
              {isEditing && (
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition mt-2">
                  <Save className="w-4 h-4" /> Uložit změny
                </button>
              )}
            </div>
          </div>

          {/* NASTAVENÍ A ZABEZPEČENÍ */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-semibold text-white mb-2">Nastavení</h3>
            
            <button className="flex items-center justify-between w-full p-3 hover:bg-slate-800 rounded-xl transition">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-slate-500" />
                <span className="text-sm">Změnit heslo</span>
              </div>
            </button>

            <button className="flex items-center justify-between w-full p-3 hover:bg-slate-800 rounded-xl transition">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-slate-500" />
                <span className="text-sm">Notifikace</span>
              </div>
            </button>

            <div className="border-t border-slate-800 pt-4 mt-2">
              <button className="flex items-center gap-3 w-full p-3 text-red-400 hover:bg-red-950/20 rounded-xl transition">
                <LogOut className="w-5 h-5" />
                <span className="text-sm">Odhlásit se</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
        }
