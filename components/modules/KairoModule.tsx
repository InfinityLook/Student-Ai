'use client';

import React, { useState, useEffect, useRef } from 'react';
import KairoAvatar3D from '../KairoAvatar3D';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function KairoModule() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [isListening, setIsListening] = useState(false);
  const [talkMode, setTalkMode] = useState(false);
  
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = 'cs-CZ';
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleSendMessage(transcript); 
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Chyba mikrofonu:", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const speak = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'cs-CZ';
    
    const voices = window.speechSynthesis.getVoices();
    const czechVoices = voices.filter(v => v.lang === 'cs-CZ' || v.lang === 'cs_CZ');
    const bestVoice = czechVoices.find(v => v.name.includes('Google') || v.name.includes('Premium') || v.name.includes('Marketa'));
    
    if (bestVoice) {
      utterance.voice = bestVoice;
    } else if (czechVoices.length > 0) {
      utterance.voice = czechVoices[0];
    }

    utterance.pitch = 1.5; 
    utterance.rate = 1.05; 
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      if (talkMode && recognitionRef.current) {
         try {
            recognitionRef.current.start();
            setIsListening(true);
         } catch(e) {}
      }
    };
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const toggleTalkMode = () => {
    if (isListening || talkMode) {
      recognitionRef.current?.stop();
      setIsListening(false);
      setTalkMode(false);
      window.speechSynthesis.cancel();
    } else {
      setTalkMode(true);
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch(e) {}
    }
  };

  const handleSendMessage = async (textToSend: string = input) => {
    if (!textToSend.trim()) return;
    
    setIsLoading(true);
    setIsListening(false);
    if (recognitionRef.current) recognitionRef.current.stop();
    window.speechSynthesis.cancel();
    setIsSpeaking(false);

    try {
      const res = await fetch('/api/kairo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend }),
      });
      
      const data = await res.json();
      
      if (data.reply) {
        setResponse(data.reply);
        speak(data.reply); 
      }
    } catch (error) {
      console.error(error);
      setResponse("Jejda, ztratil jsem spojení.");
    } finally {
      setIsLoading(false);
      if (textToSend === input) setInput('');
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-xl max-w-2xl mx-auto mt-8 border border-gray-100">
      
      <KairoAvatar3D isSpeaking={isSpeaking} />
      
      <div className="mt-8 w-full min-h-[120px] p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 shadow-sm relative">
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-50 rotate-45 border-l border-t border-blue-100"></div>
        
        {isLoading ? (
          <div className="flex items-center space-x-2 text-blue-600 justify-center h-full">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        ) : (
          <p className="text-gray-800 text-lg leading-relaxed text-center">
            {response || "Ahoj! Jsem Kairo. Můžeš mi psát, nebo zapnout mikrofon a povídat si se mnou!"}
          </p>
        )}
      </div>

      <div className="mt-6 flex w-full gap-3 items-center">
        <button 
          onClick={toggleTalkMode}
          className={`p-4 rounded-xl flex-shrink-0 transition-all shadow-md font-bold ${
            isListening 
            ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
            : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
          }`}
          title="Talk to Talk mód (Hlasová konverzace)"
        >
          {isListening ? '🛑 Poslouchám...' : '🎤 Hlasově'}
        </button>

        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Na co se chceš zeptat?..."
          className="flex-1 p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all shadow-sm"
        />
        <button 
          onClick={() => handleSendMessage()}
          disabled={isLoading || !input.trim()}
          className="px-6 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors shadow-md"
        >
          Odeslat
        </button>
      </div>
    </div>
  );
                                                                                                                                              }
