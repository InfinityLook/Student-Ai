'use client';

import React, { useState } from 'react';
import { ArrowLeft, GitBranch, Plus, Sparkles, Network, Layers, Trash2, Edit3, Check, X, Move } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Node {
  id: string;
  title: string;
  category: 'Hlavní téma' | 'Podtéma' | 'Aplikace';
  color: string;
}

export default function MindMapModule({ onBack }: { onBack: () => void }) {
  const [nodes, setNodes] = useState<Node[]>([
    { id: '1', title: 'Matematická analýza', category: 'Hlavní téma', color: 'bg-gradient-to-tr from-pink-500 to-purple-600' },
    { id: '2', title: 'Derivace funkcí', category: 'Podtéma', color: 'bg-gradient-to-tr from-cyan-500 to-blue-600' },
    { id: '3', title: 'Integrály', category: 'Podtéma', color: 'bg-gradient-to-tr from-purple-500 to-indigo-600' },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const addNode = () => {
    const newNode: Node = {
      id: Date.now().toString(),
      title: 'Nový koncept',
      category: 'Podtéma',
      color: 'bg-gradient-to-tr from-emerald-500 to-teal-600'
    };
    setNodes([...nodes, newNode]);
  };

  const startEdit = (node: Node) => {
    setEditingId(node.id);
    setEditValue(node.title);
  };

  const saveEdit = (id: string) => {
    setNodes(nodes.map(n => n.id === id ? { ...n, title: editValue } : n));
    setEditingId(null);
  };

  const deleteNode = (id: string) => setNodes(nodes.filter(n => n.id !== id));

  return (
    <div className="space-y-6 max-w-5xl mx-auto min-h-[80vh] flex flex-col">
      {/* Horní ovládání */}
      <div className="flex items-center justify-between shrink-0">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition cursor-pointer bg-white/5 px-4 py-2 rounded-xl border border-white/10 hover:border-white/20"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět
        </button>
        <button 
          onClick={addNode}
          className="flex items-center gap-2 text-xs font-bold bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-xl transition cursor-pointer shadow-lg shadow-indigo-500/20"
        >
          <Plus className="w-4 h-4" /> Nový uzel
        </button>
      </div>

      {/* Canvas (Mapa) */}
      <div className="relative flex-1 bg-white/[0.02] border border-white/5 rounded-[32px] p-8 overflow-hidden backdrop-blur-xl">
        {/* Pozadí - mřížka */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
          <AnimatePresence>
            {nodes.map((node) => (
              <motion.div
                key={node.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="group relative bg-[#0B0E14] border border-white/10 rounded-2xl p-5 hover:border-indigo-500/50 transition-all shadow-xl"
              >
                {/* Barevný indikátor */}
                <div className={`absolute -left-1 top-5 w-2 h-10 rounded-r-lg ${node.color}`} />

                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 bg-white/5 px-2 py-0.5 rounded-md">
                    {node.category}
                  </span>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => startEdit(node)} className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400"><Edit3 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => deleteNode(node.id)} className="p-1.5 hover:bg-red-500/20 rounded-lg text-slate-400 hover:text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>

                {editingId === node.id ? (
                  <div className="flex items-center gap-2">
                    <input 
                      value={editValue} 
                      onChange={(e) => setEditValue(e.target.value)}
                      className="bg-white/5 border border-indigo-500 rounded-lg px-2 py-1 text-xs text-white w-full outline-none"
                    />
                    <button onClick={() => saveEdit(node.id)} className="text-green-400"><Check className="w-4 h-4" /></button>
                  </div>
                ) : (
                  <h3 className="text-sm font-bold text-white leading-tight">{node.title}</h3>
                )}
                
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                    <Move className="w-3 h-3" /> Přetažení
                  </div>
                  <div className={`w-6 h-6 rounded-full ${node.color} opacity-20`} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Info o funkci */}
      <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 p-4 rounded-2xl flex items-center gap-4">
        <Sparkles className="w-6 h-6 text-indigo-400" />
        <p className="text-xs text-slate-300">
          <strong>Tip:</strong> Kliknutím na ikonu tužky upravíš název uzlu. Uzly se automaticky řadí do sítě. Brzy přibude možnost propojování čarami.
        </p>
      </div>
    </div>
  );
}
