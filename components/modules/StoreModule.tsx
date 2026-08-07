'use client';

import React from 'react';
import { ShoppingBag, Zap, Check, ShieldCheck } from 'lucide-react';

export default function StoreModule() {
  const creditPackages = [
    { id: 'p1', title: 'Startovací balíček', credits: 100, price: '49 Kč', popular: false },
    { id: 'p2', title: 'Student Pro', credits: 500, price: '199 Kč', popular: true },
    { id: 'p3', title: 'Neomezený semestr', credits: 2000, price: '599 Kč', popular: false }
  ];

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8 text-slate-100">
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
          <ShoppingBag className="w-7 h-7 text-indigo-400" />
          <span>Obchod & AI Kredity</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Dobijte si kredity pro okamžité generování řešení, kartiček a souhrnů.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {creditPackages.map((pkg) => (
          <div
            key={pkg.id}
            className={`bg-slate-900 rounded-3xl p-6 border flex flex-col justify-between space-y-6 relative ${
              pkg.popular
                ? 'border-indigo-500 shadow-xl shadow-indigo-600/10'
                : 'border-slate-800'
            }`}
          >
            {pkg.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] uppercase font-black px-3 py-1 rounded-full border border-indigo-400">
                Nejoblíbenější
              </span>
            )}

            <div className="space-y-4">
              <h3 className="text-base font-bold text-white">{pkg.title}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-white">{pkg.price}</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center gap-2">
                <Zap className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold text-indigo-300">{pkg.credits} AI kreditů</span>
              </div>

              <ul className="space-y-2 text-xs text-slate-400 pt-2">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Plný přístup k AI Řešiteli</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Generování studijních kartiček</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Bez časových omezení</span>
                </li>
              </ul>
            </div>

            <button className={`w-full py-3 rounded-2xl text-xs font-bold transition ${
              pkg.popular 
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20' 
                : 'bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800'
            }`}>
              Zakoupit balíček
            </button>
          </div>
        ))}
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 flex items-center gap-3 text-xs text-slate-400">
        <ShieldCheck className="w-5 h-5 text-indigo-400 flex-shrink-0" />
        <span>Bezpečné platby zajištěny. Kredity vám zůstanou na účtu bez expirace.</span>
      </div>
    </div>
  );
}
