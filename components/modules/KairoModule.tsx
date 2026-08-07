'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '@/store/useStore';
import { Send, Volume2, VolumeX, Bot, User, Loader2, Play } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export default function KairoModule() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      role: 'assistant', 
      content: 'Ahoj! Jsem Kairo, tvůj AI studijní asistent. S čím ti dnes pomůžu?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeSpeakingId, setActiveSpeakingId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const addCredits = useStore((state) => state.addCredits);

  // Automatické skrolovaní
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Načtení hlasů v prohlížeči (řeší asynchronní načítání v Chrome/Safari)
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        window.speechSynthesis.getVoices();
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Funkce pro přečtení konkrétního textu
  const speakText = (text: string, messageId?: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    // Zrušit předchozí čtení
    window.speechSynthesis.cancel();

    if (isMuted && !messageId) return;

    // Odstranění Markdown značek pro čistý přednes
    const cleanText = text.replace(/[*_#`~]/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'cs-CZ';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Najít český hlas
    const voices = window.speechSynthesis.getVoices();
    const csVoice = voices.find((v) => v.lang.includes('cs') || v.lang.includes('CS'));
    if (csVoice) {
      utterance.voice = csVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      if (messageId) setActiveSpeakingId(messageId);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setActiveSpeakingId(null);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setActiveSpeakingId(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    // DŮLEŽITÉ: Odemčení zvukového kontextu přímou interakcí na stisk tlačítka
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.resume();
    }

    const userMessage = input.trim();
    setInput('');

    const newMsgId = Math.random().toString(36).substring(2, 9);
    const updatedMessages: Message[] = [
      ...messages,
      { id: newMsgId, role: 'user', content: userMessage }
    ];

    setMessages(updatedMessages);
    setLoading(true);

    try {
      const response = await fetch('/api/kairo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: 'Jsi Kairo, přátelský, chytrý a motivující AI studijní asistent pro studenty. Odpovídej věcně, stručně a v češtině.'
            },
            ...updatedMessages.map(({ role, content }) => ({ role, content }))
          ]
        })
      });

      const data = await response.json();

      if (data.choices && data.choices[0]?.message?.content) {
        const reply = data.choices[0].message.content;
        const replyId = Math.random().toString(36).substring(2, 9);

        setMessages((prev) => [...prev, { id: replyId, role: 'assistant', content: reply }]);
        addCredits(2);

        // Přečtení odpovědi
        if (!isMuted) {
          speakText(reply, replyId);
        }
      } else {
        throw new Error('Chyba odpovědi');
      }
    } catch (err) {
      const errorReply = 'Omlouvám se, ale nepodařilo se mi spojit se serverem. Zkontroluj API klíč na Vercelu.';
      const errId = Math.random().toString(36).substring(2, 9);
      setMessages((prev) => [...prev, { id: errId, role: 'assistant', content: errorReply }]);
      if (!isMuted) speakText(errorReply, errId);
    } finally {
      setLoading(false);
    }
  };

  const toggleMute = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setActiveSpeakingId(null);
    }
    setIsMuted(!isMuted);
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto p-4 space-y-4">
      {/* Hlavička */}
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

        {/* Tlačítko zvuku */}
        <button
          onClick={toggleMute}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            isMuted
              ? 'bg-red-500/10 text-red-400 border border-red-500/20'
              : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20'
          }`}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          <span>{isMuted ? 'Hlas vypnut' : 'Hlas zapnut'}</span>
        </button>
      </div>

      {/* Zprávy */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.role === 'assistant' && (
              <div className="p-2 bg-purple-600/20 border border-purple-500/30 rounded-xl text-purple-300 mt-1">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div className="group relative max-w-[80%]">
              <div
                className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-cyan-600 text-white rounded-tr-none'
                    : 'bg-slate-800 text-slate-200 border border-slate-700/60 rounded-tl-none'
                }`}
              >
                {msg.content}
              </div>

              {/* Tlačítko pro manuální přehrání hlasem u AI zpráv */}
              {msg.role === 'assistant' && (
                <button
                  onClick={() => speakText(msg.content, msg.id)}
                  className={`mt-1 flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md transition-colors ${
                    activeSpeakingId === msg.id
                      ? 'text-cyan-400 font-bold'
                      : 'text-slate-400 hover:text-cyan-300'
                  }`}
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>{activeSpeakingId === msg.id ? 'Přehrává se...' : 'Přehrát hlasem'}</span>
                </button>
              )}
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
