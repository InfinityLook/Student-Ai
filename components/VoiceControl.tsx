'use client';

import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';

interface VoiceControlProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export default function VoiceControl({ activeView, setActiveView }: VoiceControlProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsSupported(false);
    }
  }, []);

  const toggleListening = () => {
    if (!isSupported) return;

    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = 'cs-CZ';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('Poslouchám...');
    };

    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const command = event.results[current][0].transcript.toLowerCase().trim();
      setTranscript(`Rozpoznáno: "${command}"`);

      if (command.includes('kalendář') || command.includes('zkoušk')) {
        setActiveView('calendar');
      } else if (command.includes('řešitel') || command.includes('příklad') || command.includes('spočítat')) {
        setActiveView('solver');
      } else if (command.includes('kartičk')) {
        setActiveView('flashcards');
      } else if (command.includes('obchod') || command.includes('kredit')) {
        setActiveView('store');
      } else if (command.includes('profil') || command.includes('účat')) {
        setActiveView('profile');
      }

      setTimeout(() => setTranscript(''), 3000);
    };

    recognition.onerror = () => {
      setIsListening(false);
      setTranscript('Hlasové ovládání selhalo.');
      setTimeout(() => setTranscript(''), 3000);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  if (!isSupported) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {transcript && (
        <div className="bg-slate-900 border border-slate-800 text-slate-200 text-xs px-3 py-2 rounded-2xl shadow-xl flex items-center gap-2 animate-fade-in">
          <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
          <span>{transcript}</span>
        </div>
      )}

      <button
        onClick={toggleListening}
        className={`p-3.5 rounded-2xl shadow-2xl transition-all duration-300 flex items-center justify-center border ${
          isListening
            ? 'bg-red-600 text-white border-red-400 animate-pulse ring-4 ring-red-500/20'
            : 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-400/30'
        }`}
        title="Hlasové ovládání"
      >
        {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
      </button>
    </div>
  );
          }
