"use client";
import { useState } from "react";

const initialMaterials = [
  { id: 1, title: "React Hooks Cheatsheet", type: "odkaz", subject: "Programování", date: "5. 8. 2026" },
  { id: 2, title: "Vzorce pro 1. semestr", type: "pdf", subject: "Fyzika", date: "1. 8. 2026" },
  { id: 3, title: "Základy syntaxe Pythonu", type: "poznámka", subject: "Programování", date: "28. 7. 2026" },
  { id: 4, title: "Nepravidelná slovesa", type: "doc", subject: "Jazyky", date: "20. 7. 2026" },
];

const subjects = ["Vše", "Programování", "Fyzika", "Jazyky", "Ostatní"];
const types = ["pdf", "odkaz", "poznámka", "doc"];

export default function StudyLibrary() {
  // Stavy aplikace
  const [materials, setMaterials] = useState(initialMaterials);
  const [filter, setFilter] = useState("Vše");
  const [search, setSearch] = useState("");
  
  // Stavy pro modální okno přidávání
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMaterial, setNewMaterial] = useState({ title: "", type: "pdf", subject: "Programování" });

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

  const handleAddMaterial = (e) => {
    e.preventDefault();
    if (!newMaterial.title.trim()) return;

    const dateFormatted = new Date().toLocaleDateString("cs-CZ");
    
    const addedItem = {
      id: Date.now(),
      title: newMaterial.title,
      type: newMaterial.type,
      subject: newMaterial.subject,
      date: dateFormatted,
    };

    setMaterials([addedItem, ...materials]);
    setIsModalOpen(false);
    setNewMaterial({ title: "", type: "pdf", subject: "Programování" }); // Reset formuláře
  };

  const handleDelete = (id) => {
    setMaterials(materials.filter(m => m.id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto relative">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">📚 Studijní knihovna</h2>
          <p className="text-gray-500 text-sm">Tvoje uložené materiály, taháky a odkazy.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium transition-colors shadow-sm"
        >
          + Přidat materiál
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Hledat materiál..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {subjects.map((subject) => (
            <button
              key={subject}
              onClick={() => setFilter(subject)}
              className={`px-4 py-2 rounded-xl whitespace-nowrap text-sm font-medium transition-colors ${
                filter === subject
                  ? "bg-gray-800 text-white dark:bg-white dark:text-gray-900"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
              }`}
            >
              {subject}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMaterials.map((item) => (
          <div
            key={item.id}
            className="p-4 border rounded-2xl hover:shadow-md transition-all bg-white dark:bg-gray-900 dark:border-gray-800 flex flex-col justify-between group relative"
          >
            {/* Tlačítko pro smazání (zobrazí se při najetí myší) */}
            <button 
              onClick={() => handleDelete(item.id)}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              title="Smazat materiál"
            >
              ✕
            </button>

            <div className="cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <span className="text-2xl">{getIcon(item.type)}</span>
                <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg mr-4">
                  {item.subject}
                </span>
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 transition-colors pr-6">
                {item.title}
              </h3>
            </div>
            <div className="mt-4 text-xs text-gray-400 flex justify-between items-center cursor-pointer">
              <span>Přidáno: {item.date}</span>
              <span className="group-hover:translate-x-1 transition-transform">Otevřít →</span>
            </div>
          </div>
        ))}
        
        {filteredMaterials.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
            Nebyl nalezen žádný materiál. Zkus změnit hledání nebo přidej nový!
          </div>
        )}
      </div>

      {/* Modální okno pro přidání materiálu */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md shadow-xl border dark:border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Přidat nový materiál</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-800 dark:hover:text-white">✕</button>
            </div>
            
            <form onSubmit={handleAddMaterial} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Název</label>
                <input 
                  type="text" 
                  required
                  value={newMaterial.title}
                  onChange={(e) => setNewMaterial({...newMaterial, title: e.target.value})}
                  className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white outline-none"
                  placeholder="Např. Tahák na matiku"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Typ</label>
                  <select 
                    value={newMaterial.type}
                    onChange={(e) => setNewMaterial({...newMaterial, type: e.target.value})}
                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white outline-none"
                  >
                    {types.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Předmět</label>
                  <select 
                    value={newMaterial.subject}
                    onChange={(e) => setNewMaterial({...newMaterial, subject: e.target.value})}
                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white outline-none"
                  >
                    {subjects.filter(s => s !== "Vše").map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium transition-colors"
              >
                Uložit materiál
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
                }
