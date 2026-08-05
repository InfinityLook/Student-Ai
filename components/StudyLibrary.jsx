"use client";
import React, { useState } from "react";

const initialMaterials = [
  { id: 1, title: "React Hooks Cheatsheet", type: "odkaz", subject: "Programování", date: "5. 8. 2026", content: "https://react.dev/reference/react" },
  { id: 2, title: "Vzorce pro 1. semestr", type: "pdf", subject: "Fyzika", date: "1. 8. 2026", content: "Tento soubor obsahuje základní kinematické rovnice a Newtonovy zákony. (Simulovaný náhled PDF)" },
  { id: 3, title: "Základy syntaxe Pythonu", type: "poznámka", subject: "Programování", date: "28. 7. 2026", content: "Python nepoužívá složené závorky, ale odsazování. Proměnné se nedeklarují s typem..." },
  { id: 4, title: "Nepravidelná slovesa", type: "doc", subject: "Jazyky", date: "20. 7. 2026", content: "Go - went - gone\nBe - was/were - been\nDo - did - done\n(Simulovaný dokument)" },
];

const subjects = ["Vše", "Programování", "Fyzika", "Jazyky", "Ostatní"];
const types = ["pdf", "odkaz", "poznámka", "doc"];

export default function StudyLibrary() {
  const [materials, setMaterials] = useState(initialMaterials);
  const [filter, setFilter] = useState("Vše");
  const [search, setSearch] = useState("");
  
  // Stavy pro přidávání a úpravy
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("pdf");
  const [subject, setSubject] = useState("Programování");
  const [content, setContent] = useState("");

  // Stav pro prohlížeč (zobrazení souboru)
  const [viewingItem, setViewingItem] = useState(null);

  const filteredMaterials = materials.filter((item) => {
    const matchesSubject = filter === "Vše" || item.subject === filter;
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  const getIcon = (type) => {
    switch (type) {
      case "pdf": return "📄";
      case "odkaz": return "🔗";
      case "poznámka": return "📝";
      case "doc": return "📑";
      default: return "📁";
    }
  };

  // Uložení nového NEBO upraveného materiálu
  const handleSave = () => {
    if (!title.trim()) return;

    if (editingId) {
      // Úprava existujícího
      setMaterials(materials.map(m => 
        m.id === editingId 
          ? { ...m, title: title.trim(), type, subject, content } 
          : m
      ));
    } else {
      // Přidání nového
      const dateFormatted = new Date().toLocaleDateString("cs-CZ");
      const addedItem = {
        id: Date.now(),
        title: title.trim(),
        type,
        subject,
        date: dateFormatted,
        content,
      };
      setMaterials([addedItem, ...materials]);
    }

    resetForm();
  };

  const handleEditClick = (e, item) => {
    e.stopPropagation(); // Zabrání otevření prohlížeče při kliknutí na tužku
    setEditingId(item.id);
    setTitle(item.title);
    setType(item.type);
    setSubject(item.subject);
    setContent(item.content || "");
    setIsAdding(true);
    // Skrolování na formulář by tu mohlo být, ale vzhledem k UI to necháme jednoduché
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    setMaterials(materials.filter(m => m.id !== id));
  };

  const resetForm = () => {
    setTitle("");
    setType("pdf");
    setSubject("Programování");
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
            <span>📚</span> Studijní knihovna
          </h2>
          <p className="text-gray-400 text-sm mt-1">Tvoje uložené materiály, taháky a odkazy.</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <div className="text-xs uppercase tracking-wider text-gray-400 font-medium">Uloženo</div>
            <div className="text-xl font-bold text-cyan-400">{materials.length}</div>
          </div>
          <button
            onClick={toggleAddingForm}
            className={`px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all shadow-lg active:scale-95 ${
              isAdding 
                ? "bg-white/10 border border-white/20 text-white hover:bg-white/20"
                : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:brightness-110 text-white shadow-cyan-500/20"
            }`}
          >
            {isAdding ? "Zrušit" : "+ Přidat materiál"}
          </button>
        </div>
      </div>

      {/* Formulář pro přidání / úpravu */}
      {isAdding && (
        <div className="bg-white/5 border border-cyan-500/30 p-6 rounded-3xl backdrop-blur-xl shadow-lg space-y-4">
          <h3 className="font-semibold text-white text-sm">
            {editingId ? "✏️ Upravit materiál" : "✨ Nový materiál"}
          </h3>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Název materiálu (např. Tahák na matiku)"
            className="w-full p-3 rounded-xl border border-white/10 bg-[#090a0f] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <select 
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-3 rounded-xl border border-white/10 bg-[#090a0f] text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm appearance-none"
            >
              {types.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <select 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-3 rounded-xl border border-white/10 bg-[#090a0f] text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm appearance-none"
            >
              {subjects.filter(s => s !== "Vše").map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={type === "odkaz" ? "Vlož URL adresu odkazu..." : "Obsah poznámky / popis souboru..."}
            rows={3}
            className="w-full p-3 rounded-xl border border-white/10 bg-[#090a0f] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm resize-none"
          />
          <button
            onClick={handleSave}
            className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:brightness-110 text-white font-semibold rounded-xl text-sm transition-all active:scale-95"
          >
            {editingId ? "Uložit změny" : "Uložit materiál"}
          </button>
        </div>
      )}

      {/* Vyhledávání a filtrace */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Hledat materiál..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm shadow-lg"
        />
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
          {subjects.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2.5 rounded-2xl whitespace-nowrap text-sm font-semibold transition-all shadow-lg ${
                filter === s
                  ? "bg-white/10 border-white/20 text-white"
                  : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200"
              } border backdrop-blur-xl`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Seznam materiálů */}
      {filteredMaterials.length === 0 ? (
        <div className="bg-white/5 border border-white/10 p-12 rounded-3xl backdrop-blur-xl text-center text-gray-400 text-sm">
          Nebyl nalezen žádný materiál. Zkus změnit hledání nebo přidej nový výše.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMaterials.map((item) => (
            <div
              key={item.id}
              onClick={() => setViewingItem(item)}
              className="bg-white/5 border border-white/10 p-5 rounded-3xl backdrop-blur-xl shadow-lg flex flex-col justify-between group transition-all hover:bg-white/10 hover:border-cyan-500/30 relative cursor-pointer"
            >
              {/* Tlačítka pro úpravu a smazání (zobrazí se na hover) */}
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={(e) => handleEditClick(e, item)}
                  className="p-1.5 text-gray-500 hover:text-cyan-400 bg-[#090a0f]/50 rounded-lg backdrop-blur-sm transition-colors"
                  title="Upravit materiál"
                >
                  ✏️
                </button>
                <button 
                  onClick={(e) => handleDelete(e, item.id)}
                  className="p-1.5 text-gray-500 hover:text-rose-400 bg-[#090a0f]/50 rounded-lg backdrop-blur-sm transition-colors"
                  title="Smazat materiál"
                >
                  🗑️
                </button>
              </div>

              <div className="pr-16">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-3xl bg-white/5 p-2 rounded-xl border border-white/5">{getIcon(item.type)}</span>
                </div>
                <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors text-base line-clamp-2">
                  {item.title}
                </h3>
              </div>
              
              <div className="mt-5 pt-4 border-t border-white/10 flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <span className="shrink-0 text-xs font-semibold px-2.5 py-1 rounded-lg border bg-white/5 text-gray-300 border-white/10 inline-block w-fit">
                    {item.subject}
                  </span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider pl-1">
                    Přidáno: {item.date}
                  </span>
                </div>
                <span className="text-xs font-semibold text-cyan-500 group-hover:translate-x-1 transition-transform">
                  Otevřít →
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Prohlížeč obsahu (Modální okno) */}
      {viewingItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#090a0f] border border-white/10 p-6 md:p-8 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative">
            <button 
              onClick={() => setViewingItem(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-xl border border-white/10"
            >
              ✕ Zavřít
            </button>
            
            <div className="flex items-center gap-4 mb-6 pr-12">
              <span className="text-4xl bg-white/5 p-3 rounded-2xl border border-white/5">
                {getIcon(viewingItem.type)}
              </span>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md border bg-white/5 text-gray-300 border-white/10">
                    {viewingItem.subject}
                  </span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider">
                    {viewingItem.date}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white leading-tight">
                  {viewingItem.title}
                </h2>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 min-h-[200px] text-gray-300 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
              {viewingItem.content ? (
                viewingItem.type === "odkaz" ? (
                  <a href={viewingItem.content} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline flex items-center gap-2 break-all">
                    🔗 Otevřít odkaz na nové kartě
                  </a>
                ) : (
                  viewingItem.content
                )
              ) : (
                <span className="text-gray-500 italic">Tento materiál zatím nemá žádný obsah. Můžeš ho přidat přes tlačítko úprav.</span>
              )}
            </div>

            <div className="mt-6 flex justify-end">
               <button 
                onClick={() => {
                  setViewingItem(null);
                  handleEditClick({ stopPropagation: () => {} }, viewingItem);
                }}
                className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl text-sm transition-all"
              >
                ✏️ Upravit obsah
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
          }
