"use client";

interface KairoAvatarProps {
  size?: "sm" | "lg";
}

export default function KairoAvatar({ size = "lg" }: KairoAvatarProps) {
  const isSmall = size === "sm";

  if (isSmall) {
    return (
      <div className="relative w-8 h-8 rounded-full bg-gradient-to-b from-blue-400 to-indigo-600 flex items-center justify-center shadow-md select-none">
        <div className="absolute -top-1 w-1 h-1 bg-amber-400 rounded-full animate-pulse" />
        <span className="text-xs">🤖</span>
      </div>
    );
  }

  return (
    <div className="relative w-36 h-36 flex items-center justify-center select-none animate-bounce duration-1000 my-2">
      {/* Zářící pozadí */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/30 to-blue-500/30 blur-2xl"></div>

      {/* Hlavní tělo Kaira - zvětšené a plně viditelné */}
      <div className="relative w-32 h-32 rounded-full bg-gradient-to-b from-cyan-300 via-blue-500 to-indigo-700 flex flex-col items-center justify-center shadow-2xl border border-white/20 overflow-visible">
        
        {/* Anténa (vytažená výš, aby nebyla uříznutá) */}
        <div className="absolute -top-3 flex flex-col items-center">
          <div className="w-2 h-2 bg-amber-300 rounded-full shadow-[0_0_10px_#fde047] animate-ping" />
          <div className="w-0.5 h-3 bg-blue-200" />
        </div>

        {/* Sluchátko / mikrofon na boku */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-6 bg-blue-300/90 rounded-l-full border-l border-white/40 shadow-md" />

        {/* Obličejová maska / displej */}
        <div className="w-24 h-16 rounded-2xl bg-indigo-950/40 backdrop-blur-md flex flex-col items-center justify-center gap-2 border border-white/10 shadow-inner">
          {/* Oči */}
          <div className="flex gap-5 items-center">
            <div className="w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_6px_white]" />
            <div className="w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_6px_white]" />
          </div>
          {/* Úsměv a tvářičky */}
          <div className="relative flex items-center justify-center">
            <div className="absolute -left-3.5 w-2.5 h-1.5 bg-pink-400/70 rounded-full blur-[1px]" />
            <div className="text-sm text-white font-bold tracking-widest">‿</div>
            <div className="absolute -right-3.5 w-2.5 h-1.5 bg-pink-400/70 rounded-full blur-[1px]" />
          </div>
        </div>

      </div>
    </div>
  );
}
