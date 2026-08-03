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

  const currentItems = items.filter((item) => item.parentId === currentFolder);

  const handleCreate = (type: "folder" | "file") => {
    if (!newItemName.trim()) {
      addNotification("Zadej název položky!", "error");
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
      <div className="bg-surface p-6 rounded-2xl border border-edge shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-ink">📚 Předměty & Složky</h2>
          <p className="text-muted text-sm mt-1">Hierarchické úložiště tvých studijních materiálů.</p>
        </div>

        <div className="flex items-center gap-2">
          {currentFolder && (
            <button
              onClick={() => setCurrentFolder(null)}
              className="px-3 py-2 bg-surface-hover hover:bg-edge text-ink rounded-xl text-sm font-medium transition-colors border border-edge"
            >
              ← Zpět domů
            </button>
          )}
          <button
            onClick={() => setIsCreatingType("folder")}
            className="px-3 py-2 bg-violet/10 text-violet hover:bg-violet/20 rounded-xl text-sm font-medium transition-colors"
          >
            + Nová složka
          </button>
          <button
            onClick={() => setIsCreatingType("file")}
            className="px-3 py-2 bg-violet hover:brightness-110 text-ink rounded-xl text-sm font-medium transition-all shadow-lg shadow-violet/20"
          >
            + Nový soubor
          </button>
        </div>
      </div>

      {isCreatingType && (
        <div className="bg-surface p-4 rounded-2xl border border-violet shadow-sm flex items-center gap-3">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder={isCreatingType === "folder" ? "Název složky..." : "Název souboru..."}
            className="flex-1 p-2.5 rounded-xl border border-edge bg-canvas text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-violet text-sm"
            autoFocus
          />
          <button
            onClick={() => handleCreate(isCreatingType)}
            className="px-4 py-2.5 bg-violet hover:brightness-110 text-ink font-medium rounded-xl text-sm transition-all"
          >
            Vytvořit
          </button>
          <button
            onClick={() => {
              setIsCreatingType(null);
              setNewItemName("");
            }}
            className="px-4 py-2.5 bg-surface-hover text-ink font-medium rounded-xl text-sm transition-colors border border-edge"
          >
            Zrušit
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {currentItems.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted text-sm">
            Tato složka je prázdná. Vytvoř novou složku nebo soubor nahoře.
          </div>
        ) : (
          currentItems.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (item.type === "folder") setCurrentFolder(item.id);
              }}
              className={`bg-surface p-4 rounded-2xl border border-edge shadow-sm flex items-center justify-between group transition-all ${
                item.type === "folder" ? "cursor-pointer hover:border-violet" : ""
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-2xl">{item.type === "folder" ? "📁" : "📄"}</span>
                <span className="font-semibold text-ink truncate text-sm">{item.name}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(item.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-1.5 text-muted hover:text-coral transition-opacity"
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
