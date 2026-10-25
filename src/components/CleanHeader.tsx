import React, { useState } from 'react';
import { Flame, Sparkles, Volume2, VolumeX, Palette } from 'lucide-react';
import { Language } from '../types.ts';
import { BrandLogo, ZelligeStar } from './BrandMascot.tsx';
import { BrandShowcaseModal } from './BrandShowcaseModal.tsx';
import { sound } from '../utils/soundEngine.ts';

interface CleanHeaderProps {
  language: Language;
  streakDays: number;
  xp: number;
  onLanguageChange: (lang: Language) => void;
  onStreakClick?: () => void;
}

export const CleanHeader: React.FC<CleanHeaderProps> = ({
  language,
  streakDays,
  xp,
  onLanguageChange,
  onStreakClick,
}) => {
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [isMuted, setIsMuted] = useState(() => sound.isMuted());

  const handleToggleSound = () => {
    const nextMuted = sound.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) {
      sound.playTap();
    }
  };

  const handleLangSelect = (lang: Language) => {
    sound.playTap();
    onLanguageChange(lang);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#F6F2EA]/95 backdrop-blur-md border-b-2.5 border-slate-900 border-neo">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Brand Emblem + Title */}
          <div className="flex items-center gap-2.5">
            <BrandLogo size={42} className="cursor-pointer hover:rotate-6 transition-transform" />
            <div className="flex flex-col">
              <span className="font-black text-slate-950 text-sm sm:text-base tracking-tight font-arabic leading-none">
                دوتش بالدارجة
              </span>
              <span className="text-[10px] sm:text-xs text-slate-700 font-bauhaus font-bold tracking-wider">
                DEUTSCH B'DARIJA
              </span>
            </div>
          </div>

          {/* Right: Gamification HUD & Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Brand Showcase Button */}
            <button
              type="button"
              onClick={() => {
                sound.playTap();
                setShowBrandModal(true);
              }}
              title="Brand Identity & Portfolio Showcase"
              className="btn-neo hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white text-slate-950 font-bold text-xs font-mono cursor-pointer"
            >
              <Palette className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>Brand Identity</span>
            </button>

            {/* Sound Toggle (🔊 / 🔇) */}
            <button
              type="button"
              onClick={handleToggleSound}
              title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
              className="btn-neo p-1.5 sm:p-2 rounded-xl bg-white text-slate-900 cursor-pointer"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-slate-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-[#2563EB]" />
              )}
            </button>

            {/* Streak Counter (Interactive) */}
            <button
              type="button"
              onClick={() => {
                sound.playTap();
                onStreakClick?.();
              }}
              title="Daily Learning Streak"
              className="btn-neo flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl bg-[#FFB800] text-slate-950 font-black text-xs font-mono cursor-pointer"
            >
              <Flame className="w-3.5 h-3.5 fill-[#FF3366] text-[#FF3366] animate-pulse" />
              <span>{streakDays}</span>
            </button>

            {/* XP Counter */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#00D68F] border-neo-2 shadow-neo-sm text-slate-950 font-black text-xs font-mono">
              <ZelligeStar size={14} color="#111827" />
              <span>{xp} XP</span>
            </div>

            {/* 3-Way Segmented Language Switcher Pill */}
            <div className="flex items-center bg-white p-1 rounded-2xl border-neo-2 shadow-neo-sm text-xs font-bold">
              <button
                type="button"
                onClick={() => handleLangSelect('darija')}
                className={`px-2 sm:px-2.5 py-1 rounded-xl transition-all cursor-pointer font-arabic ${
                  language === 'darija'
                    ? 'bg-[#111827] text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                }`}
              >
                🇲🇦 الدارجة
              </button>
              <button
                type="button"
                onClick={() => handleLangSelect('ar')}
                className={`px-2 sm:px-2.5 py-1 rounded-xl transition-all cursor-pointer font-arabic ${
                  language === 'ar'
                    ? 'bg-[#111827] text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                }`}
              >
                🇸🇦 العربية
              </button>
              <button
                type="button"
                onClick={() => handleLangSelect('en')}
                className={`px-2 sm:px-2.5 py-1 rounded-xl transition-all cursor-pointer font-sans ${
                  language === 'en'
                    ? 'bg-[#111827] text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                }`}
              >
                🇬🇧 EN
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Brand Identity Portfolio Modal */}
      <BrandShowcaseModal isOpen={showBrandModal} onClose={() => setShowBrandModal(false)} />
    </>
  );
};
