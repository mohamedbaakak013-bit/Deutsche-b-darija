import React, { useState } from 'react';
import { Volume2, Turtle } from 'lucide-react';
import { playGermanSpeech } from '../utils/speech.ts';
import { sound } from '../utils/soundEngine.ts';

interface AudioPlayButtonProps {
  text: string;
  size?: 'sm' | 'md' | 'lg';
  showEqualizer?: boolean;
  syllables?: string[];
  phoneticFranco?: string;
  phoneticArabic?: string;
  showSyllables?: boolean;
}

export const AudioPlayButton: React.FC<AudioPlayButtonProps> = ({
  text,
  size = 'md',
  showEqualizer = true,
}) => {
  const [isPlayingNormal, setIsPlayingNormal] = useState(false);
  const [isPlayingSlow, setIsPlayingSlow] = useState(false);

  const isSpeaking = isPlayingNormal || isPlayingSlow;

  const handlePlay = async (rate: number, isSlow: boolean) => {
    sound.playTap();
    if (isSlow) {
      setIsPlayingSlow(true);
    } else {
      setIsPlayingNormal(true);
    }

    try {
      await playGermanSpeech(text, rate);
    } catch {
      // Audio fallback handled
    } finally {
      setIsPlayingNormal(false);
      setIsPlayingSlow(false);
    }
  };

  const btnPad =
    size === 'sm'
      ? 'px-2 py-1 text-[11px]'
      : size === 'lg'
      ? 'px-3.5 py-2 text-sm'
      : 'px-2.5 py-1.5 text-xs';

  return (
    <div
      className="inline-flex items-center gap-1.5 select-none"
      onClick={(e) => e.stopPropagation()}
    >
      {/* 1.0x Normal Speed Button */}
      <button
        type="button"
        onClick={() => handlePlay(1.0, false)}
        disabled={isSpeaking}
        className={`${btnPad} btn-neo rounded-xl bg-white hover:bg-[#FFB800] text-slate-950 font-bold font-mono inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50`}
        title="Play Native German Speed (1.0x)"
      >
        <Volume2
          className={`w-3.5 h-3.5 ${
            isPlayingNormal ? 'text-[#FF3366] animate-bounce' : 'text-slate-900'
          }`}
        />
        <span>1.0x</span>
      </button>

      {/* 0.6x Slow Breakdown Button */}
      <button
        type="button"
        onClick={() => handlePlay(0.6, true)}
        disabled={isSpeaking}
        className={`${btnPad} btn-neo rounded-xl bg-white hover:bg-[#00D68F] text-slate-950 font-bold font-mono inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50`}
        title="Play Slow Breakdown Speed (0.6x)"
      >
        <Turtle
          className={`w-3.5 h-3.5 ${
            isPlayingSlow ? 'text-[#00D68F] animate-bounce' : 'text-slate-900'
          }`}
        />
        <span>0.6x</span>
      </button>

      {/* Animated SVG Soundwave Equalizer (Pulsing while speaking) */}
      {showEqualizer && isSpeaking && (
        <div className="flex items-center gap-0.5 px-2 py-1 bg-white rounded-lg border-2 border-slate-900 shadow-neo-sm">
          <span className="w-1 h-3.5 bg-[#FF3366] rounded-full animate-pulse" />
          <span className="w-1 h-5 bg-[#FFB800] rounded-full animate-bounce" />
          <span className="w-1 h-3 bg-[#00D68F] rounded-full animate-pulse" />
          <span className="w-1 h-4 bg-[#2563EB] rounded-full animate-bounce" />
        </div>
      )}
    </div>
  );
};
