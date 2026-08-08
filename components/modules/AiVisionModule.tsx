'use client';

import React, { useState } from 'react';
import { ArrowLeft, Camera, Upload, Sparkles, Image as ImageIcon, CheckCircle2, RefreshCw } from 'lucide-react';

export default function AiVisionModule({ onBack }: { onBack: () => void }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setAnalysisResult(null);
    }
  };

  const handleAnalyze = () => {
    if (!selectedImage) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult({
        title: 'Detekován matematický graf & rovnice',
        subject: 'Matematická analýza',
        explanation: 'AI úspěšně rozpoznala derivaci funkce a graf v intervalu $x \\in [-5, 5]$. Klíčovým bodem je lokální extrém v bodě $x = 2$.',
        steps: [
          '1. Identifikace vstupní funkce z obrázku',
          '2. Výpočet první derivace $f\'(x)$',
          '3. Nalezení stacionárních bodů položením derivace do nuly'
        ]
      });
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Zpět tlačítko */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition cursor-pointer bg-white/5 px-4 py-2 rounded-xl border border-white/10"
      >
        <ArrowLeft className="w-4 h-4" /> Zpět do Workspace
      </button>

      {/* Hlavička modulu */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Camera className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white">AI Vision Scanner</h1>
            <p className="text-xs text-slate-400">Nahraj fotku příkladu, grafu nebo zápisků a nech AI rovnou vyřešit úkol.</p>
          </div>
        </div>
      </div>

      {/* Hlavní obsah */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Levá část: Nahrání obrázku */}
        <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-6 backdrop-blur-xl flex flex-col justify-between space-y-6">
          <div>
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <Upload className="w-4 h-4 text-cyan-400" /> Vstupní zdroj
            </h3>
            <p className="text-xs text-slate-400 mb-6">Podporuje PNG, JPG nebo snímek obrazovky.</p>

            {selectedImage ? (
              <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video bg-black/40 flex items-center justify-center">
                <img src={selectedImage} alt="Nahraný soubor" className="w-full h-full object-contain" />
                <button 
                  onClick={() => { setSelectedImage(null); setAnalysisResult(null); }}
                  className="absolute top-3 right-3 bg-black/70 hover:bg-black text-white text-xs px-3 py-1.5 rounded-xl border border-white/10 transition cursor-pointer"
                >
                  Změnit fotku
                </button>
              </div>
            ) : (
              <label className="border-2 border-dashed border-white/15 hover:border-cyan-500/50 rounded-2xl aspect-video flex flex-col items-center justify-center gap-3 cursor-pointer transition bg-white/[0.01] hover:bg-cyan-500/[0.02]">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-white">Klikni pro výběr souboru</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">nebo přetáhni obrázek sem</p>
                </div>
                <input type="file" accept="image/*" onChange={handleSimulateUpload} className="hidden" />
              </label>
            )}
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!selectedImage || isAnalyzing}
            className={`w-full py-3.5 rounded-2xl font-bold text-xs transition flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
              !selectedImage || isAnalyzing 
                ? 'bg-white/5 text-slate-500 border border-white/5 cursor-not-allowed shadow-none' 
                : 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-cyan-500/25 hover:opacity-90'
            }`}
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" /> Analyzuji snímek přes AI...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Spustit AI Analýzu
              </>
            )}
          </button>
        </div>

        {/* Pravá část: Výsledek analýzy */}
        <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-6 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-400" /> Výsledek rozpoznání
            </h3>
            <p className="text-xs text-slate-400 mb-6">Detailní výstup z počítačového vidění.</p>

            {analysisResult ? (
              <div className="space-y-4">
                <div className="bg-cyan-500/10 border border-cyan-500/20 p-4 rounded-2xl space-y-1">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300">
                    {analysisResult.subject}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-1">{analysisResult.title}</h4>
                  <p className="text-xs text-slate-300 mt-1">{analysisResult.explanation}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-400">Postup řešení:</p>
                  {analysisResult.steps.map((step: string, idx: number) => (
                    <div key={idx} className="bg-white/5 border border-white/5 p-3 rounded-xl text-xs text-slate-200 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-center p-6 border border-white/5 rounded-2xl bg-white/[0.01]">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 mb-3">
                  <Camera className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-slate-400">Zatím žádná data</p>
                <p className="text-[11px] text-slate-500 mt-1">Nahraj obrázek a spusť analýzu pro zobrazení výsledků.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
