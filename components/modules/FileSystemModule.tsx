"use client";

import React, { useMemo, useState } from "react";
import { useStore } from "@/store/useStore";

export default function FileSystemModule() {
  const { addNotification, files, addFileItem, deleteFileItem, renameFileItem } = useStore();

  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [newItemName, setNewItemName] = useState("");
  const [isCreatingType, setIsCreatingType] = useState<"folder" | "file" | null>(null);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  const currentItems = useMemo(
    () =>
      files
        .filter((item) => item.parentId === currentFolder)
        .sort((a, b) => {
          if (a.type !== b.type) return a.type === "folder" ? -1 : 1;
          return a.name.localeCompare(b.name);
        }),
    [files, currentFolder]
  );

  const childCount = (folderId: string) => files.filter((f) => f.parentId === folderId).length;

  // Poskládá cestu (breadcrumb) od kořene k aktuální složce
  const breadcrumb = useMemo(() => {
    const path: { id: string | null; name: string }[] = [{ id: null, name: "Domů" }];
    let cursor = currentFolder;
    const chain: { id: string | null; name: string }[] = [];
    while (cursor) {
      const folder = files.find((f) => f.id === cursor);
      if (!folder) break;
      chain.unshift({ id: folder.id, name: folder.name });
      cursor = folder.parentId;
    }
    return [...path, ...chain];
  }, [currentFolder, files]);

  const handleCreate = (type: "folder" | "file") => {
    if (!newItemName.trim()) {
      addNotification("Zadej název položky!", "error");
      return;
    }
    addFileItem(newItemName.trim(), type, currentFolder);
    setNewItemName("");
    setIsCreatingType(null);
    addNotification(`Úspěšně vytvořeno: ${newItemName.trim()}`, "success");
  };

  const handleDelete = (id: string, name: string) => {
    deleteFileItem(id);
    if (currentFolder === id) setCurrentFolder(null);
    addNotification(`Smazáno: ${name}`, "info");
  };

  const startRename = (id: string, name: string) => {
    setRenamingId(id);
    setRenameValue(name);
  };

  const confirmRename = () => {
    if (!renamingId) return;
    if (!renameValue.trim()) {
      addNotification("Název nesmí být prázdný.", "error");
      return;
    }
    renameFileItem(renamingId, renameValue.trim());
    setRenamingId(null);
    setRenameValue("");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Hlavička */}
      <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span>📚</span> Předměty & Složky
          </h2>
          <p className="text-gray-400 text-sm mt-1">Hierarchické úložiště tvých studijních materiálů.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCreatingType("folder")}
            className="px-3 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-cyan-400 rounded-xl text-sm font-medium transition-colors"
          >
            + Nová složka
          </button>
          <button
            onClick={() => setIsCreatingType("file")}
            className="px-3 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:brightness-110 text-white rounded-xl text-sm font-medium transition-colors shadow-lg shadow-cyan-500/20"
          >
            + Nový soubor
          </button>
        </div>
      </div>

      {/* Breadcrumb navigace */}
      <div className="flex items-center flex-wrap gap-1.5 px-1 text-sm">
        {breadcrumb.map((crumb, i) => (
          <React.Fragment key={crumb.id ?? "root"}>
            {i > 0 && <span className="text-gray-600">/</span>}
            <button
              onClick={() => setCurrentFolder(crumb.id)}
              className={`px-2 py-1 rounded-lg transition-colors ${
                i === breadcrumb.length - 1
                  ? "text-cyan-400 font-semibold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {i === 0 ? "🏠 Domů" : crumb.name}
            </button>
          </React.Fragment>
        ))}
      </div>

      {/* Formulář pro vytvoření nové položky */}
      {isCreatingType && (
        <div className="bg-white/5 border border-cyan-500/30 p-4 rounded-2xl backdrop-blur-xl shadow-lg flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate(isCreatingType)}
            placeholder={isCreatingType === "folder" ? "Název složky..." : "Název souboru..."}
            className="flex-1 p-2.5 rounded-xl border border-white/10 bg-[#090a0f] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm"
            autoFocus
          />
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleCreate(isCreatingType)}
              className="px-4 py-2.5 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-400 font-medium rounded-xl text-sm transition-colors"
            >
              Vytvořit
            </button>
            <button
              onClick={() => {
                setIsCreatingType(null);
                setNewItemName("");
              }}
              className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-medium rounded-xl text-sm transition-colors"
            >
              Zrušit
            </button>
          </div>
        </div>
      )}

      {/* Seznam položek */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {currentItems.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl text-gray-400 text-sm">
            Tato složka je prázdná. Vytvoř novou složku nebo soubor nahoře.
          </div>
        ) : (
          currentItems.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (renamingId === item.id) return;
                if (item.type === "folder") setCurrentFolder(item.id);
              }}
              className={`bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-xl shadow-lg flex items-center justify-between gap-2 group transition-all ${
                item.type === "folder" ? "cursor-pointer hover:border-cyan-500/40 hover:-translate-y-0.5" : ""
              }`}
            >
              {renamingId === item.id ? (
                <div className="flex items-center gap-1.5 flex-1 min-w-0" onClick={(e) => e.stopPropagation()}>
                  <input
                    autoFocus
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && confirmRename()}
                    className="flex-1 min-w-0 p-1.5 rounded-lg border border-cyan-500/40 bg-[#090a0f] text-white text-sm focus:outline-none"
                  />
                  <button onClick={confirmRename} className="text-emerald-400 text-sm px-1.5 shrink-0">
                    ✓
                  </button>
                  <button onClick={() => setRenamingId(null)} className="text-gray-500 text-sm px-1.5 shrink-0">
                    ×
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-2xl shrink-0">{item.type === "folder" ? "📁" : "📄"}</span>
                    <div className="min-w-0">
                      <div className="font-semibold text-white truncate text-sm">{item.name}</div>
                      {item.type === "folder" && (
                        <div className="text-[11px] text-gray-500">
                          {childCount(item.id)} {childCount(item.id) === 1 ? "položka" : "položek"}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startRename(item.id, item.name);
                      }}
                      className="p-1.5 text-gray-400 hover:text-cyan-400"
                      title="Přejmenovat"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item.id, item.name);
                      }}
                      className="p-1.5 text-gray-400 hover:text-rose-400"
                      title="Smazat"
                    >
                      🗑️
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
    }
                  
