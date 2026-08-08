'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, 
  Folder, 
  FolderPlus, 
  Upload, 
  FileText, 
  Image as ImageIcon, 
  Trash2, 
  Search, 
  ArrowLeft, 
  File, 
  CheckCircle2,
  Sparkles,
  CloudUpload
} from 'lucide-react';

interface StorageModuleProps {
  onBack: () => void;
}

interface StoredFile {
  id: string;
  name: string;
  size: string;
  type: 'image' | 'pdf' | 'doc' | 'other';
  date: string;
  folderId?: string;
}

interface FolderItem {
  id: string;
  name: string;
  color: string;
}

export default function StorageModule({ onBack }: StorageModuleProps) {
  const [folders, setFolders] = useState<FolderItem[]>([
    { id: '1', name: 'Matematika - skripta', color: 'from-cyan-500 to-blue-600' },
    { id: '2', name: 'Programování / Projekty', color: 'from-purple-500 to-indigo-600' },
    { id: '3', name: 'Zápisky z přednášek', color: 'from-pink-500 to-rose-600' },
  ]);

  const [files, setFiles] = useState<StoredFile[]>([
    { id: 'f1', name: 'Analyza_Grafy_2026.pdf', size: '4.2 MB', type: 'pdf', date: 'Dnes', folderId: '1' },
    { id: 'f2', name: 'Schema_Architektura.png', size: '2.8 MB', type: 'image', date: 'Včera', folderId: '2' },
    { id: 'f3', name: 'Tahak_Fyzika.docx', size: '850 KB', type: 'doc', date: 'Před 3 dny' },
  ]);

  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderColor, setNewFolderColor] = useState('from-cyan-500 to-blue-600');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Přidání složky
  const handleCreateFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;

    const newFolder: FolderItem = {
      id: Date.now().toString(),
      name: newFolderName.trim(),
      color: newFolderColor,
    };

    setFolders([...folders, newFolder]);
    setNewFolderName('');
    setIsModalOpen(false);
  };

  // Nahrání souboru / fotky přes input
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files;
    if (!uploadedFiles || uploadedFiles.length === 0) return;

    const newFiles: StoredFile[] = Array.from(uploadedFiles).map((file) => {
      let type: StoredFile['type'] = 'other';
      if (file.type.includes('image')) type = 'image';
      else if (file.type.includes('pdf')) type = 'pdf';
      else if (file.type.includes('word') || file.name.endsWith('.docx') || file.name.endsWith('.doc')) type = 'doc';

      const sizeInMB = (file.size / (1024 * 1024)).toFixed(1) + ' MB';

      return {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        size: sizeInMB,
        type,
        date: 'Právě teď',
        folderId: activeFolderId || undefined,
      };
    });

    setFiles([...newFiles, ...files]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Smazání souboru
  const handleDeleteFile = (id: string) => {
    setFiles(files.filter(f => f.id !== id));
  };

  // Smazání složky
  const handleDeleteFolder = (id: string) => {
    setFolders(folders.filter(f => f.id !== id));
    // Odstranění vazby u souborů v této složce
    setFiles(files.map(f => f.folderId === id ? { ...f, folderId: undefined } : f));
    if (activeFolderId === id) setActiveFolderId(null);
  };

  // Filtrování
  const filteredFiles = files.filter(f => {
    const matchesFolder = activeFolderId ? f.folderId === activeFolderId : true;
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  const getFileIcon = (type: StoredFile['type']) => {
    switch (type) {
      case 'image': return <ImageIcon className="w-5 h-5 text-pink-400" />;
      case 'pdf': return <FileText className="w-5 h-5 text-red-400" />;
      case 'doc': return <FileText className="w-5 h-5 text-blue-400" />;
      default: return <File className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Hlavička */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/[0.03] border border-white/10 p-6 rounded-[32px] backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 inline-flex items-center gap-1.5 mb-2">
              <Database className="w-3.5 h-3.5" /> Cloud Storage
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Úložiště <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">souborů</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 md:flex-initial px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-2xl text-xs transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <FolderPlus className="w-4 h-4 text-cyan-400" /> Nová složka
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 md:flex-initial px-5 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-90 text-white font-bold rounded-2xl text-xs transition shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Upload className="w-4 h-4" /> Vložit soubor / fotku
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            multiple 
            className="hidden" 
            accept="image/*,.pdf,.doc,.docx,.txt"
          />
        </div>
      </div>

      {/* Stav kapacity */}
      <div className="bg-white/[0.03] rounded-[28px] p-6 border border-white/10 space-y-3 backdrop-blur-xl">
        <div className="flex justify-between text-xs text-slate-300 font-bold">
          <span>Využitý prostor cloudu</span>
          <span className="text-cyan-400">1.4 GB / 5 GB</span>
        </div>
        <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden p-0.5">
          <div className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-full rounded-full w-[28%]" />
        </div>
      </div>

      {/* Vyhledávání a navigace mezi složkami */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Hledat soubor..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition"
          />
        </div>

        {activeFolderId && (
          <button
            onClick={() => setActiveFolderId(null)}
            className="text-xs font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-4 py-2.5 rounded-xl hover:bg-cyan-500/20 transition cursor-pointer"
          >
            ← Zpět na všechny soubory
          </button>
        )}
      </div>

      {/* Výpis složek (pokud nejsme uvnitř konkrétní složky) */}
      {!activeFolderId && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-400 tracking-wider uppercase">Složky</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {folders.map((folder) => (
              <div
                key={folder.id}
                onClick={() => setActiveFolderId(folder.id)}
                className="group relative overflow-hidden bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 p-5 rounded-[24px] transition-all cursor-pointer flex items-center justify-between"
              >
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${folder.color} opacity-10 rounded-full blur-2xl group-hover:opacity-30 transition`} />
                <div className="flex items-center gap-3.5">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${folder.color} flex items-center justify-center shadow-md`}>
                    <Folder className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm group-hover:text-cyan-300 transition">{folder.name}</h4>
                    <span className="text-xs text-slate-400">
                      {files.filter(f => f.folderId === folder.id).length} souborů
                    </span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteFolder(folder.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-white/5 transition"
                  title="Smazat složku"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Seznam souborů */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-400 tracking-wider uppercase">
          {activeFolderId ? `Obsah složky` : 'Všechny soubory'}
        </h3>
        
        {filteredFiles.length === 0 ? (
          <div className="text-center py-12 bg-white/[0.02] border border-white/10 rounded-[28px] space-y-3">
            <CloudUpload className="w-12 h-12 text-slate-500 mx-auto" />
            <p className="text-slate-400 text-sm">Žádné soubory k zobrazení.</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {filteredFiles.map((file) => (
              <div 
                key={file.id}
                className="flex items-center justify-between p-4 bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 rounded-2xl transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    {getFileIcon(file.type)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{file.name}</h4>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span>{file.size}</span>
                      <span>•</span>
                      <span>{file.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDeleteFile(file.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-white/5 transition cursor-pointer"
                    title="Smazat"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modální okno pro vytvoření složky */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0b0e14] border border-white/10 rounded-[32px] p-6 md:p-8 w-full max-w-md space-y-6 shadow-2xl"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <FolderPlus className="text-cyan-400 w-5 h-5" /> Nová složka
                </h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-white text-sm font-bold cursor-pointer"
                >
                  Zavřít
                </button>
              </div>

              <form onSubmit={handleCreateFolder} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">Název složky</label>
                  <input
                    type="text"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    placeholder="Např. Biologie - Semestr 2"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">Barevný styl</label>
                  <div className="flex gap-3">
                    {[
                      { id: 'from-cyan-500 to-blue-600', bg: 'bg-cyan-500' },
                      { id: 'from-purple-500 to-indigo-600', bg: 'bg-purple-500' },
                      { id: 'from-pink-500 to-rose-600', bg: 'bg-pink-500' },
                      { id: 'from-amber-500 to-orange-600', bg: 'bg-amber-500' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setNewFolderColor(item.id)}
                        className={`w-9 h-9 rounded-xl ${item.bg} transition transform ${newFolderColor === item.id ? 'scale-110 ring-2 ring-white' : 'opacity-60 hover:opacity-100'} cursor-pointer`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-slate-300 font-bold rounded-2xl text-xs transition cursor-pointer"
                  >
                    Zrušit
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold rounded-2xl text-xs transition shadow-lg shadow-cyan-500/20 cursor-pointer"
                  >
                    Vytvořit složku
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
