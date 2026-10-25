import React, { useState } from 'react';
import { Volume2, Turtle } from 'lucide-react';
import { playGermanSpeech } from '../utils/speech.ts';

interface AudioPlayButtonProps {
  text: string;
  size?: 'sm' | 'md';
  syllables?: string[];
  phoneticFranco?: string;
  phoneticArabic?: string;
  showSyllables?: boolean;
}

export const AudioPlayButton: React.FC<AudioPlayButtonProps> = ({
  text,
  size = 'md',
}) => {
  const [isPlayingNormal, setIsPlayingNormal] = useState(false);
  const [isPlayingSlow, setIsPlayingSlow] = useState(false);

  const handlePlay = async (rate: number, isSlow: boolean) => {
    if (isSlow) {
      setIsPlayingSlow(true);
    } else {
      setIsPlayingNormal(true);
    }

    await playGermanSpeech(text, rate);

    setIsPlayingNormal(false);
    setIsPlayingSlow(false);
  };

  const btnClasses = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-2.5 py-1 text-xs';

  return (
    <div className="inline-flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        onClick={() => handlePlay(1.0, false)}
        disabled={isPlayingNormal || isPlayingSlow}
        className={`${btnClasses} inline-flex items-center gap-1 font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80 transition-colors disabled:opacity-50`}
        title="Play 1.0x"
      >
        <Volume2 className={`w-3.5 h-3.5 ${isPlayingNormal ? 'text-amber-600 animate-pulse' : 'text-slate-600'}`} />
        <span>1x</span>
      </button>

      <button
        type="button"
        onClick={() => handlePlay(0.6, true)}
        disabled={isPlayingNormal || isPlayingSlow}
        className={`${btnClasses} inline-flex items-center gap-1 font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80 transition-colors disabled:opacity-50`}
        title="Play slow motion 0.6x"
      >
        <Turtle className={`w-3.5 h-3.5 ${isPlayingSlow ? 'text-amber-600 animate-pulse' : 'text-slate-600'}`} />
        <span>0.6x</span>
      </button>
    </div>
  );
};
