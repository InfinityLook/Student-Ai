"use client";
import { useState } from "react";

// Ukázková data
const initialMaterials = [
  { id: 1, title: "React Hooks Cheatsheet", type: "odkaz", subject: "Programování", date: "5. 8. 2026" },
  { id: 2, title: "Vzorce pro 1. semestr", type: "pdf", subject: "Fyzika", date: "1. 8. 2026" },
  { id: 3, title: "Základy syntaxe Pythonu", type: "poznámka", subject: "Programování", date: "28. 7. 2026" },
  { id: 4, title: "Nepravidelná slovesa", type: "doc", subject: "Jazyky", date: "20. 7. 2026" },
];

const subjects = ["Vše", "Programování", "Fyzika", "Jazyky"];

export default function StudyLibrary() {
  const [filter, setFilter] = useState("Vše");
  const [search, setSearch] = useState("");

  // Filtrace materiálů
  const filteredMaterials = initialMaterials.filter((item) => {
    const matchesSubject = filter === "Vše" || item.subject === filter;
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  // Pomocná funkce pro ikony
  const getIcon = (type) => {
    switch (type) {
      case "pdf": return "📄";
      case "odkaz": return "🔗";
      case "poznámka": return "📝";
      default: return "📁";
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Hlavička */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">📚 Studijní knihovna</h2>
          <p className="text-gray-500 text-sm">Tvoje uložené materiály, taháky a odkazy.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium transition-colors shadow-sm">
          + Přidat materiál
        </button>
      </div>

      {/* Ovládací panel (Filtry a Hledání) */}
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

      {/* Mřížka s materiály */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMaterials.map((item) => (
          <div
            key={item.id}
            className="p-4 border rounded-2xl hover:shadow-md transition-shadow bg-white dark:bg-gray-900 dark:border-gray-800 flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="text-2xl">{getIcon(item.type)}</span>
                <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg">
                  {item.subject}
                </span>
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>
            </div>
            <div className="mt-4 text-xs text-gray-400 flex justify-between items-center">
              <span>Přidáno: {item.date}</span>
              <span>Otevřít →</span>
            </div>
          </div>
        ))}
        
        {/* Prázdný stav */}
        {filteredMaterials.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
            Nebyl nalezen žádný materiál. Zkus změnit hledání nebo přidej nový!
          </div>
        )}
      </div>
    </div>
  );
      }
