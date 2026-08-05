"use client";

interface KairoAvatarProps {
  size?: "sm" | "lg";
}

export default function KairoAvatar({ size = "lg" }: KairoAvatarProps) {
  const isSmall = size === "sm";

  if (isSmall) {
    return (
      <div className="relative w-8 h-8 rounded-full bg-gradient-to-b from-blue-400 to-indigo-600 flex items-center justify-center shadow-md select-none">
        {/* Mini anténa */}
        <div className="absolute -top-1 w-1 h-1 bg-amber-400 rounded-full animate-pulse" />
        <span className="text-xs">🤖</span>
      </div>
    );
  }

  return (
    <div className="relative w-32 h-32 flex items-center justify-center select-none animate-bounce duration-1000">
      {/* Zářící pozadí */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/30 to-blue-500/30 blur-xl"></div>

      {/* Hlavní tělo Kaira */}
      <div className="relative w-28 h-28 rounded-full bg-gradient-to-b from-cyan-300 via-blue-500 to-indigo-700 flex flex-col items-center justify-center shadow-2xl border border-white/20 overflow-hidden">
        
        {/* Anténa */}
        <div className="absolute top-1 flex flex-col items-center">
          <div className="w-1.5 h-1.5 bg-amber-300 rounded-full shadow-[0_0_8px_#fde047] animate-ping" />
          <div className="w-0.5 h-2 bg-blue-200" />
        </div>

        {/* Sluchátko / mikrofon na boku */}
        <div className="absolute right-1 top-1/2 -translate-y-1/2 w-2.5 h-5 bg-blue-300/80 rounded-l-full border-l border-white/40" />

        {/* Obličejová maska / displej */}
        <div className="w-20 h-14 rounded-2xl bg-indigo-950/40 backdrop-blur-md flex flex-col items-center justify-center gap-1.5 border border-white/10 mt-2 shadow-inner">
          {/* Oči */}
          <div className="flex gap-4 items-center">
            <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_5px_white]" />
            <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_5px_white]" />
          </div>
          {/* Úsměv a tvářičky */}
          <div className="relative flex items-center justify-center">
            <div className="absolute -left-3 w-2 h-1 bg-pink-400/60 rounded-full blur-[1px]" />
            <div className="text-xs text-white font-bold tracking-widest">‿</div>
            <div className="absolute -right-3 w-2 h-1 bg-pink-400/60 rounded-full blur-[1px]" />
          </div>
        </div>

      </div>
    </div>
  );
}
