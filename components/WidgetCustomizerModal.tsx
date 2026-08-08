'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, EyeOff, RotateCcw, LayoutGrid } from 'lucide-react';
import { useWidgets } from './WidgetContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WidgetCustomizerModal({ isOpen, onClose }: ModalProps) {
  const { widgets, toggleWidget, resetWidgets } = useWidgets();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-md rounded-[32px] bg-[#0c1017] border border-white/15 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.9)] z-10 flex flex-col"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
                  <LayoutGrid className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Přizpůsobit Workspace</h3>
              </div>
              <button onClick={onClose} className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-400 mb-5 leading-relaxed">
              Vyber si, které widgety chceš mít zobrazené na hlavní studijní ploše.
            </p>

            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1 custom-scrollbar">
              {widgets.map((widget) => (
                <div
                  key={widget.id}
                  onClick={() => toggleWidget(widget.id)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition ${
                    widget.enabled 
                      ? 'bg-white/[0.06] border-white/15 text-white' 
                      : 'bg-white/[0.02] border-white/5 text-slate-500'
                  }`}
                >
                  <span className="text-sm font-semibold">{widget.title}</span>
                  <div className="flex items-center gap-2 text-xs font-bold">
                    {widget.enabled ? (
                      <span className="flex items-center gap-1.5 text-pink-400">
                        <Eye className="w-4 h-4" /> Aktivní
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <EyeOff className="w-4 h-4" /> Skrytý
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-5 mt-5 border-t border-white/10">
              <button
                onClick={resetWidgets}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Obnovit výchozí
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold transition shadow-lg shadow-pink-500/20 cursor-pointer"
              >
                Hotovo
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
