"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useStore } from "@/store/useStore";
import KairoAvatar, { KairoState } from "@/components/KairoAvatar";
import { matchKairoCommand, isBackCommand } from "@/components/kairo/KairoCommands";

const GREETING =
  "Ahoj, jsem Kairo, tvůj studijní parťák. Řekni mi, co potřebuješ, třeba otevři úkoly, nebo se mě na něco zeptej.";

export default function KairoModule() {
  const setActiveModule = useStore((s) => s.setActiveModule);

  const [state, setState] = useState<KairoState>("idle");
  const [heard, setHeard] = useState<string>("");
  const [kairoSays, setKairoSays] = useState<string>(GREETING);
  const [micSupported, setMicSupported] = useState(true);
  const [autoActive, setAutoActive] = useState(true);
  const [typedCommand, setTypedCommand] = useState("");

  // Refy, aby callbacky Web Speech API vždy pracovaly s aktuálním stavem
  const recognitionRef = useRef<any>(null);
  const autoActiveRef = useRef(true);
  const mountedRef = useRef(true);

  useEffect(() => {
    autoActiveRef.current = autoActive;
  }, [autoActive]);

  const speak = useCallback((text: string, afterSpeak?: () => void) => {
    setKairoSays(text);

    if (typeof window === "undefined" || !window.speechSynthesis) {
      afterSpeak?.();
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "cs-CZ";
    utterance.rate = 1.02;
    utterance.pitch = 1.05;

    utterance.onstart = () => setState("speaking");
    utterance.onend = () => {
      if (!mountedRef.current) return;
      setState("idle");
      afterSpeak?.();
    };
    utterance.onerror = () => {
      if (!mountedRef.current) return;
      setState("idle");
      afterSpeak?.();
    };

    window.speechSynthesis.speak(utterance);
  }, []);

  const startListening = useCallback(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setMicSupported(false);
      return;
    }

    // Nespouštět znovu, pokud už jedna instance běží
    if (recognitionRef.current) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "cs-CZ";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      if (!mountedRef.current) return;
      setState("listening");
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setHeard(transcript);
      handleCommand(transcript);
    };

    recognition.onerror = (event: any) => {
      recognitionRef.current = null;
      if (!mountedRef.current) return;
      setState("idle");
      // "no-speech" - prostě nic neřekl, zkusíme to znovu, pokud je automatický režim zapnutý
      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        setMicSupported(false);
        setAutoActive(false);
      } else if (autoActiveRef.current) {
        setTimeout(() => startListening(), 700);
      }
    };

    recognition.onend = () => {
      recognitionRef.current = null;
      if (!mountedRef.current) return;
      setState((prev) => (prev === "listening" ? "idle" : prev));
    };

    recognitionRef.current = recognition;
    recognition.start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCommand = useCallback(
    async (transcript: string) => {
      if (isBackCommand(transcript)) {
        speak("Dobře, zavírám Kaira.", () => setActiveModule("menu"));
        return;
      }

      const match = matchKairoCommand(transcript);

      if (match) {
        speak(match.reply, () => {
          setActiveModule(match.moduleId);
        });
        return;
      }

      // Žádný navigační příkaz nesedí -> zeptáme se AI (Groq, zdarma bez karty)
      setState("thinking");
      try {
        const res = await fetch("/api/kairo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: transcript }),
        });
        const data = await res.json();
        const reply: string = data?.reply || "Tomu jsem úplně nerozuměl, zkus to prosím jinak.";

        speak(reply, () => {
          if (autoActiveRef.current) startListening();
        });
      } catch {
        speak("Nepodařilo se mi připojit na server, zkus to prosím znovu.", () => {
          if (autoActiveRef.current) startListening();
        });
      }
    },
    [setActiveModule, speak, startListening]
  );

  // Kairo se aktivuje automaticky při otevření obrazovky: přivítá se a začne poslouchat
  useEffect(() => {
    mountedRef.current = true;

    const SpeechRecognition =
      typeof window !== "undefined" &&
      ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
    if (!SpeechRecognition) setMicSupported(false);

    speak(GREETING, () => {
      if (autoActiveRef.current) startListening();
    });

    return () => {
      mountedRef.current = false;
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          /* noop */
        }
        recognitionRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleAuto = () => {
    setAutoActive((prev) => {
      const next = !prev;
      if (!next && recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          /* noop */
        }
        recognitionRef.current = null;
        setState("idle");
      }
      if (next) {
        startListening();
      }
      return next;
    });
  };

  const submitTyped = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedCommand.trim()) return;
    setHeard(typedCommand);
    handleCommand(typedCommand);
    setTypedCommand("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl shadow-lg px-8 py-10 max-w-lg w-full flex flex-col items-center">
        <KairoAvatar size="lg" state={state} />

        <div className="mt-6 min-h-[3.5rem] max-w-sm">
          <p className="text-white text-sm leading-relaxed">{kairoSays}</p>
        </div>

        {heard && (
          <p className="mt-3 text-xs text-gray-500 italic">Slyšel jsem: „{heard}“</p>
        )}

        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={() => (state === "listening" ? null : startListening())}
            disabled={!micSupported}
            className="px-5 py-2.5 rounded-2xl bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/30 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed text-sm font-medium"
          >
            {state === "listening" ? "🎧 Poslouchám…" : "🎙️ Mluvit s Kairem"}
          </button>

          <button
            onClick={toggleAuto}
            className={`px-4 py-2.5 rounded-2xl border text-xs font-medium transition cursor-pointer ${
              autoActive
                ? "bg-emerald-500/10 border-emerald-400/30 text-emerald-300 hover:bg-emerald-500/20"
                : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
            }`}
          >
            {autoActive ? "🔁 Automatický režim: zapnutý" : "⏸️ Automatický režim: vypnutý"}
          </button>
        </div>

        {!micSupported && (
          <div className="mt-5 w-full">
            <p className="text-xs text-amber-400 mb-2">
              Hlasové ovládání tvůj prohlížeč nepodporuje (nebo jsi nepovolil mikrofon). Zkus
              Chrome nebo Edge, nebo napiš příkaz ručně:
            </p>
            <form onSubmit={submitTyped} className="flex gap-2">
              <input
                value={typedCommand}
                onChange={(e) => setTypedCommand(e.target.value)}
                placeholder="např. otevři úkoly"
                className="flex-1 px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400/50"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/30 transition cursor-pointer text-sm"
              >
                Odeslat
              </button>
            </form>
          </div>
        )}

        <p className="mt-6 text-[11px] text-gray-500">
          Zkus říct: „otevři úkoly“, „ukaž kartičky“, „spusť časovač“, „zpět do menu“…
        </p>
      </div>
    </div>
  );
}
