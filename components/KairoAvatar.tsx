"use client";

export type KairoState = "idle" | "listening" | "thinking" | "speaking";

interface KairoAvatarProps {
  size?: "sm" | "lg";
  state?: KairoState;
}

const STATE_RING: Record<KairoState, string> = {
  idle: "from-cyan-500/30 to-blue-500/30",
  listening: "from-emerald-400/50 to-cyan-500/50",
  thinking: "from-violet-500/40 to-blue-500/40",
  speaking: "from-cyan-400/60 to-blue-400/60",
};

const STATE_LABEL: Record<KairoState, string> = {
  idle: "Kairo je připraven",
  listening: "Kairo poslouchá…",
  thinking: "Kairo přemýšlí…",
  speaking: "Kairo mluví…",
};

export default function KairoAvatar({ size = "lg", state = "idle" }: KairoAvatarProps) {
  const isSmall = size === "sm";

  if (isSmall) {
    return (
      <div
        className={`relative w-8 h-8 rounded-full bg-gradient-to-b from-blue-400 to-indigo-600 flex items-center justify-center shadow-md select-none ${
          state === "listening" ? "ring-2 ring-emerald-400/70 animate-pulse" : ""
        } ${state === "speaking" ? "animate-bounce" : ""}`}
      >
        <div className="absolute -top-1 w-1 h-1 bg-amber-400 rounded-full animate-pulse" />
        <span className="text-xs">🤖</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`relative w-40 h-40 flex items-center justify-center select-none my-2 ${
          state === "idle" ? "animate-bounce duration-1000" : ""
        }`}
      >
        {/* Zářící pozadí, mění barvu podle stavu */}
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-tr ${STATE_RING[state]} blur-2xl transition-all duration-500 ${
            state === "listening" ? "scale-110 animate-pulse" : ""
          } ${state === "thinking" ? "animate-spin-slow" : ""}`}
        />

        {/* Pulzující vnější prstenec, aktivní při poslechu */}
        {state === "listening" && (
          <div className="absolute inset-2 rounded-full border-2 border-emerald-400/60 animate-ping" />
        )}
        {state === "thinking" && (
          <div className="absolute inset-3 rounded-full border-2 border-dashed border-violet-400/60 animate-spin-slow" />
        )}

        {/* Hlavní tělo Kaira */}
        <div
          className={`relative w-32 h-32 rounded-full bg-gradient-to-b from-cyan-300 via-blue-500 to-indigo-700 flex flex-col items-center justify-center shadow-2xl border border-white/20 overflow-visible transition-transform duration-300 ${
            state === "speaking" ? "scale-105" : ""
          }`}
        >
          {/* Anténa */}
          <div className="absolute -top-3 flex flex-col items-center">
            <div
              className={`w-2 h-2 rounded-full shadow-[0_0_10px_#fde047] ${
                state === "speaking" ? "bg-emerald-300 animate-ping" : "bg-amber-300 animate-ping"
              }`}
            />
            <div className="w-0.5 h-3 bg-blue-200" />
          </div>

          {/* Sluchátko / mikrofon na boku */}
          <div
            className={`absolute right-0 top-1/2 -translate-y-1/2 w-3 h-6 rounded-l-full border-l border-white/40 shadow-md transition-colors ${
              state === "listening" ? "bg-emerald-300 animate-pulse" : "bg-blue-300/90"
            }`}
          />

          {/* Obličejová maska / displej */}
          <div className="w-24 h-16 rounded-2xl bg-indigo-950/40 backdrop-blur-md flex flex-col items-center justify-center gap-2 border border-white/10 shadow-inner">
            {/* Oči */}
            <div className="flex gap-5 items-center">
              <div
                className={`w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_6px_white] ${
                  state === "thinking" ? "animate-pulse" : ""
                }`}
              />
              <div
                className={`w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_6px_white] ${
                  state === "thinking" ? "animate-pulse" : ""
                }`}
              />
            </div>
            {/* Ústa - animují se při mluvení */}
            <div className="relative flex items-center justify-center h-3">
              <div className="absolute -left-3.5 w-2.5 h-1.5 bg-pink-400/70 rounded-full blur-[1px]" />
              {state === "speaking" ? (
                <div className="flex gap-0.5 items-end h-3">
                  <span className="w-1 bg-white rounded-full animate-[bounce_0.5s_ease-in-out_infinite] h-1.5" />
                  <span className="w-1 bg-white rounded-full animate-[bounce_0.5s_ease-in-out_infinite_0.15s] h-3" />
                  <span className="w-1 bg-white rounded-full animate-[bounce_0.5s_ease-in-out_infinite_0.3s] h-2" />
                </div>
              ) : (
                <div className="text-sm text-white font-bold tracking-widest">‿</div>
              )}
              <div className="absolute -right-3.5 w-2.5 h-1.5 bg-pink-400/70 rounded-full blur-[1px]" />
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs font-medium text-gray-400 tracking-wide">{STATE_LABEL[state]}</p>
    </div>
  );
}
