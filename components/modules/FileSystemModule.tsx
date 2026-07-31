"use client";

import React, { useState } from "react";
import { useStore } from "@/store/useStore";

interface Item {
  id: string;
  name: string;
  type: "folder" | "file";
  parentId: string | null;
}

export default function FileSystemModule() {
  const { addNotification } = useStore();
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [items, setItems] = useState<Item[]>([
    { id: "1", name: "Matematika", type: "folder", parentId: null },
    { id: "2", name: "Programování", type: "folder", parentId: null },
    { id: "3", name: "Integrály - poznámky.md", type: "file", parentId: "1" },
  ]);
  
  const [newItemName, setNewItemName] = useState("");
  const [isCreatingType, setIsCreatingType] = useState<"folder" | "file" | null>(null);

  // Filtrování položek podle aktuální složky
  const currentItems = items.filter((item) => item.parentId === currentFolder);

  const handleCreate = (type: "folder" | "file") => {
    if (!newItemName.trim()) {
      addNotification("Zadej názv položky!", "error");
      return;
    }

    const newItem: Item = {
      id: Math.random().toString(36).substring(2, 9),
      name: newItemName.trim(),
      type,
      parentId: currentFolder,
    };

    setItems([...items, newItem]);
    setNewItemName("");
    setIsCreatingType(null);
    addNotification(`Úspěšně vytvořeno: ${newItem.name}`, "success");
  };

  const handleDelete = (id: string) => {
    setItems(items.filter((item) => item.id !== id && item.parentId !== id));
    addNotification("Položka byla smazána.", "info");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Hlavička a navigace v hierarchii */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">📚 Předměty & Složky</h2>
          <p className="text-zinc-500 text-sm mt-1">Hierarchické úložiště tvých studijních materiálů.</p>
        </div>

        <div className="flex items-center gap-2">
          {currentFolder && (
            <button
              onClick={() => setCurrentFolder(null)}
              className="px-3 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl text-sm font-medium transition-colors"
            >
              ← Zpět domů
            </button>
          )}
          <button
            onClick={() => setIsCreatingType("folder")}
            className="px-3 py-2 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 rounded-xl text-sm font-medium transition-colors"
          >
            + Nová složka
          </button>
          <button
            onClick={() => setIsCreatingType("file")}
            className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors shadow-lg shadow-indigo-500/20"
          >
            + Nový soubor
          </button>
        </div>
      </div>

      {/* Formulář pro vytvoření nové položky */}
      {isCreatingType && (
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-indigo-500 shadow-sm flex items-center gap-3">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder={isCreatingType === "folder" ? "Název složky..." : "Název souboru..."}
            className="flex-1 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            autoFocus
          />
          <button
            onClick={() => handleCreate(isCreatingType)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl text-sm transition-colors"
          >
            Vytvořit
          </button>
          <button
            onClick={() => {
              setIsCreatingType(null);
              setNewItemName("");
            }}
            className="px-4 py-2.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium rounded-xl text-sm transition-colors"
          >
            Zrušit
          </button>
        </div>
      )}

      {/* Seznam položek */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {currentItems.length === 0 ? (
          <div className="col-span-full text-center py-12 text-zinc-400 text-sm">
            Tato složka je prázdná. Vytvoř novou složku nebo soubor nahoře.
          </div>
        ) : (
          currentItems.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (item.type === "folder") setCurrentFolder(item.id);
              }}
              className={`bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between group transition-all ${
                item.type === "folder" ? "cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-500" : ""
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-2xl">{item.type === "folder" ? "📁" : "📄"}</span>
                <span className="font-semibold text-zinc-900 dark:text-white truncate text-sm">
                  {item.name}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(item.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-1.5 text-zinc-400 hover:text-rose-600 transition-opacity"
                title="Smazat"
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
            }
              
