"use client";
import React, { useState } from "react";

const initialNotes = [
  { id: 1, title: "Nápady na bakalářku", category: "Škola", date: "5. 8. 2026", content: "1. Využít Next.js pro frontend\n2. AI integrace přes OpenAI API\n3. Zaměřit se na uživatelskou přívětivost." },
  { id: 2, title: "Seznam nákupů na zítra", category: "Osobní", date: "4. 8. 2026", content: "- Káva\n- Enerťák\n- Sladkosti do zásoby na kódování" },
  { id: 3, title: "CSS triky pro glassmorphism", category: "Programování", date: "2. 8. 2026", content: "Používat `bg-white/5`, `border-white/10`, a `backdrop-blur-xl` pro parádní skleněný efekt v dark mode." },
];

export default function NotesModule() {
  const [notes, setNotes] = useState(initialNotes);
  const [filter, setFilter] = useState("Vše");
  const [search, setSearch] = useState("");
  
  // Stavy pro přidávání a úpravy
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Škola");
  const [content, setContent] = useState("");

  // Stav pro prohlížeč poznámky
  const [viewingNote, setViewingNote] = useState(null);

  // Dynamické generování filtrů podle kategorií
  const dynamicCategories = ["Vše", ...Array.from(new Set(notes.map(n => n.category).filter(Boolean)))];

  const filteredNotes = notes.filter((item) => {
    const matchesCategory = filter === "Vše" || item.category === filter;
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                          item.content.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSave = () => {
    if (!title.trim()) return;

    const trimmedCategory = category.trim() || "Osobní";

    if (editingId) {
      setNotes(notes.map(n => 
        n.id === editingId 
          ? { ...n, title: title.trim(), category: trimmedCategory, content } 
          : n
      ));
    } else {
      const dateFormatted = new Date().toLocaleDateString("cs-CZ");
      const newNote = {
        id: Date.now(),
        title: title.trim(),
        category: trimmedCategory,
        date: dateFormatted,
        content,
      };
      setNotes([newNote, ...notes]);
    }

    resetForm();
  };

  const handleEditClick = (e, note) => {
    e.stopPropagation();
    setEditingId(note.id);
    setTitle(note.title);
    setCategory(note.category);
    setContent(note.content);
    setIsAdding(true);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    setNotes(notes.filter(n => n.id !== id));
  };

  const resetForm = () => {
    setTitle("");
    setCategory("Škola");
    setContent("");
    setEditingId(null);
    setIsAdding(false);
  };

  const toggleAddingForm = () => {
    if (isAdding) {
      resetForm();
    } else {
      setIsAdding(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 relative">
      
      {/* Hlavička */}
      <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span>📝</span> Poznámky
          </h2>
          <p className="text-gray-400 text-sm mt-1">Tvoje rychlé myšlenky, nápady a zápisky.</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <div className="text-xs uppercase tracking-wider text-gray-400 font-medium">Poznámek</div>
            <div className="text-xl font-bold text-cyan-400">{notes.length}</div>
          </div>
          <button
            onClick={toggleAddingForm}
            className={`px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all shadow-lg active:scale-95 ${
              isAdding 
                ? "bg-white/10 border border-white/20 text-white hover:bg-white/20"
                : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:brightness-110 text-white shadow-cyan-500/20"
            }`}
          >
            {isAdding ? "Zrušit" : "+ Přidat poznámku"}
          </button>
        </div>
      </div>

      {/* Formulář pro přidání / úpravu */}
      {isAdding && (
        <div className="bg-white/5 border border-cyan-500/30 p-6 rounded-3xl backdrop-blur-xl shadow-lg space-y-4">
          <h3 className="font-semibold text-white text-sm">
            {editingId ? "✏️ Upravit poznámku" : "✨ Nová poznámka"}
          </h3>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nadpis poznámky..."
            className="w-full p-3 rounded-xl border border-white/10 bg-[#090a0f] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm"
          />
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Kategorie / Štítek (např. Škola, Osobní)"
            className="w-full p-3 rounded-xl border border-white/10 bg-[#090a0f] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Napiš obsah poznámky..."
            rows={5}
            className="w-full p-3 rounded-xl border border-white/10 bg-[#090a0f] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm resize-none"
          />
          <button
            onClick={handleSave}
            className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:brightness-110 text-white font-semibold rounded-xl text-sm transition-all active:scale-95"
          >
            {editingId ? "Uložit změny" : "Uložit poznámku"}
          </button>
        </div>
      )}

      {/* Vyhledávání a filtrace */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Hledat v poznámkách..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm shadow-lg"
        />
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
          {dynamicCategories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2.5 rounded-2xl whitespace-nowrap text-sm font-semibold transition-all shadow-lg ${
                filter === c
                  ? "bg-white/10 border-white/20 text-white"
                  : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200"
              } border backdrop-blur-xl`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Seznam poznámek */}
      {filteredNotes.length === 0 ? (
        <div className="bg-white/5 border border-white/10 p-12 rounded-3xl backdrop-blur-xl text-center text-gray-400 text-sm">
          Žádné poznámky nebyly nalezeny.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              onClick={() => setViewingNote(note)}
              className="bg-white/5 border border-white/10 p-5 rounded-3xl backdrop-blur-xl shadow-lg flex flex-col justify-between group transition-all hover:bg-white/10 hover:border-cyan-500/30 relative cursor-pointer"
            >
              {/* Trvale viditelná tlačítka */}
              <div className="absolute top-4 right-4 flex gap-1.5 z-10">
                <button 
                  onClick={(e) => handleEditClick(e, note)}
                  className="p-1.5 text-gray-400 hover:text-cyan-400 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors"
                  title="Upravit"
                >
                  ✏️
                </button>
                <button 
                  onClick={(e) => handleDelete(e, note.id)}
                  className="p-1.5 text-gray-400 hover:text-rose-400 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors"
                  title="Smazat"
                >
                  🗑️
                </button>
              </div>

              <div className="pr-20 mb-4">
                <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors text-base line-clamp-1 mb-2">
                  {note.title}
                </h3>
                <p className="text-gray-400 text-xs line-clamp-3 whitespace-pre-wrap">
                  {note.content || "Bez obsahu..."}
                </p>
              </div>
              
              <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <span className="shrink-0 text-xs font-semibold px-2.5 py-1 rounded-lg border bg-white/5 text-gray-300 border-white/10 inline-block w-fit">
                    🏷️ {note.category}
                  </span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider pl-1">
                    {note.date}
                  </span>
                </div>
                <span className="text-xs font-semibold text-cyan-500 group-hover:translate-x-1 transition-transform">
                  Číst →
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Prohlížeč poznámky (Modální okno) */}
      {viewingNote && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#090a0f] border border-white/10 p-6 md:p-8 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative">
            <button 
              onClick={() => setViewingNote(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-xl border border-white/10"
            >
              ✕ Zavřít
            </button>
            
            <div className="mb-6 pr-12">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-lg border bg-white/5 text-gray-300 border-white/10">
                  🏷️ {viewingNote.category}
                </span>
                <span className="text-xs text-gray-500 uppercase tracking-wider">
                  {viewingNote.date}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white leading-tight">
                {viewingNote.title}
              </h2>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 min-h-[200px] text-gray-300 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
              {viewingNote.content || <span className="text-gray-500 italic">Poznámka neobsahuje žádný text.</span>}
            </div>

            <div className="mt-6 flex justify-end">
               <button 
                onClick={() => {
                  setViewingNote(null);
                  handleEditClick({ stopPropagation: () => {} }, viewingNote);
                }}
                className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl text-sm transition-all"
              >
                ✏️ Upravit poznámku
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
    }
      
