'use client';

import React from 'react';
import KairoAvatar3D from './KairoAvatar3D';

export type KairoState = 'idle' | 'listening' | 'thinking' | 'speaking' | 'happy' | 'sad';

interface KairoAvatarProps {
  state?: KairoState;
  isSpeaking?: boolean;
}

export default function KairoAvatar({ state, isSpeaking }: KairoAvatarProps) {
  const speakingState = isSpeaking || state === 'speaking';
  return <KairoAvatar3D isSpeaking={speakingState} />;
}
