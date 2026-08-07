'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '@/store/useStore';
import { Send, Volume2, VolumeX, Bot, User, Sparkles, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export default function KairoModule() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Ahoj! Jsem Kairo, tvůj AI studijní asistent. S čím ti dnes pomůžu?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const addCredits = useStore((state) => state.addCredits);

  // Automatické skrolování dolů při nové zprávě
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Funkce pro přečtení textu hlasem (Text-to-Speech)
  const speakText = (text: string) => {
    if (isMuted || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    // Zrušit předchozí řeč, pokud ještě mluví
    window.speechSynthesis.cancel();

    // Odstranění Markdown značek (hvězdičky, mřížky) pro plynulejší čtení
    const cleanText = text.replace(/[*_#`~]/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'cs-CZ';
    utterance.rate = 1.0; // Rychlost
    utterance.pitch = 1.0; // Výška hlasu

    // Najít český hlas v systému, pokud je k dispozici
    const voices = window.speechSynthesis.getVoices();
    const csVoice = voices.find((v) => v.lang.includes('cs') || v.lang.includes('CS'));
    if (csVoice) {
      utterance.voice = csVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');

    const newMessages: Message[] = [
      ...messages,
      { role: 'user', content: userMessage }
    ];

    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch('/api/kairo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: 'Jsi Kairo, přátelský, chytrý a motivující AI studijní asistent pro studenty. Odpovídej věcně, srozumitelně a v češtině.'
            },
            ...newMessages
          ]
        })
      });

      const data = await response.json();

      if (data.choices && data.choices[0]?.message?.content) {
        const reply = data.choices[0].message.content;
        setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);

        // Odměna za aktivní komunikaci
        addCredits(2);

        // Přečíst odpověď hlasem
        speakText(reply);
      } else {
        throw new Error('Neplatná odpověď z API');
      }
    } catch (err) {
      const errorReply = 'Omlouvám se, ale nepodařilo se mi spojit se serverem. Zkontroluj API klíč nebo připojení.';
      setMessages((prev) => [...prev, { role: 'assistant', content: errorReply }]);
      speakText(errorReply);
    } finally {
      setLoading(false);
    }
  };

  const toggleMute = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setIsMuted(!isMuted);
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto p-4 space-y-4">
      {/* Hlavička Kairo AI */}
      <div className="flex items-center justify-between p-4 bg-slate-800/80 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="p-2.5 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-xl text-white shadow-lg">
              <Bot className="w-6 h-6" />
            </div>
            {isSpeaking && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
            )}
          </div>
          <div>
            <h2 className="font-bold text-lg text-white flex items-center gap-2">
              Kairo AI
              {isSpeaking && <span className="text-xs text-cyan-400 font-normal animate-pulse">(Mluví...)</span>}
            </h2>
            <p className="text-xs text-slate-400">Tvůj osobní studijní průvodce</p>
          </div>
        </div>

        {/* Tlačítko pro vypnutí / zapnutí zvuku */}
        <button
          onClick={toggleMute}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            isMuted
              ? 'bg-red-500/10 text-red-400 border border-red-500/20'
              : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20'
          }`}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          <span>{isMuted ? 'Zvuk vypnut' : 'Zvuk zapnut'}</span>
        </button>
      </div>

      {/* Zprávy */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.role === 'assistant' && (
              <div className="p-2 bg-purple-600/20 border border-purple-500/30 rounded-xl text-purple-300 mt-1">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-cyan-600 text-white rounded-tr-none'
                  : 'bg-slate-800 text-slate-200 border border-slate-700/60 rounded-tl-none'
              }`}
            >
              {msg.content}
            </div>

            {msg.role === 'user' && (
              <div className="p-2 bg-cyan-600/20 border border-cyan-500/30 rounded-xl text-cyan-300 mt-1">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-3 text-slate-400 text-sm italic">
            <div className="p-2 bg-purple-600/20 border border-purple-500/30 rounded-xl text-purple-300">
              <Bot className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2 bg-slate-800 px-4 py-2.5 rounded-2xl border border-slate-700/50">
              <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
              <span>Kairo přemýšlí...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Vstupní formulář */}
      <form onSubmit={handleSend} className="relative flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Napiš Kairovi zprávu..."
          className="w-full bg-slate-800/90 border border-slate-700 rounded-2xl py-3.5 pl-4 pr-12 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="absolute right-2 p-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl disabled:opacity-40 hover:opacity-90 transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
