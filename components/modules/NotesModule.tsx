"use client";

import React from "react";

export default function NotesModule() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl shadow-lg">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span>📝</span> Poznámky
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Editor poznámek pro tvoje předměty.
        </p>
      </div>

      <div className="bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-xl shadow-lg text-center space-y-3">
        <div className="text-4xl">🚧</div>
        <h3 className="text-lg font-semibold text-white">Tato funkce se právě připravuje</h3>
        <p className="text-gray-400 text-sm max-w-sm mx-auto">
          Brzy tu budeš moct psát a organizovat poznámky ke svým předmětům.
        </p>
      </div>
    </div>
  );
}
