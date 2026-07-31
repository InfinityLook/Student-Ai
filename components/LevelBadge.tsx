"use client";

import { useStore } from "@/store/useStore";
import { getLevelInfo } from "@/lib/gamification";

export default function LevelBadge({ size = 44 }: { size?: number }) {
  const { totalCreditsEarned } = useStore();
  const { level, progress } = getLevelInfo(totalCreditsEarned);

  const stroke = 3;
  const radius = (size - stroke * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  return (
    <div
      className="relative flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
      title={`Level ${level}`}
    >
      <svg width={size} height={size} className="-rotate-90 absolute inset-0">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#332C54" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#FFC53D"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <span className="font-mono font-bold text-ink" style={{ fontSize: size * 0.36 }}>
        {level}
      </span>
    </div>
  );
}
