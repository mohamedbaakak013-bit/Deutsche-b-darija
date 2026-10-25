import React from 'react';
import { Flame, Coins } from 'lucide-react';
import { Language } from '../types.ts';

interface CleanHeaderProps {
  language: Language;
  streakDays: number;
  xp: number;
  onLanguageChange: (lang: Language) => void;
}

export const CleanHeader: React.FC<CleanHeaderProps> = ({
  language,
  streakDays,
  xp,
  onLanguageChange,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-[680px] mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <span className="text-xl">🇩🇪</span>
          <div className="flex flex-col">
            <span className="font-extrabold text-slate-900 text-sm tracking-tight font-arabic leading-none">
              دوتش بالدارجة
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              Deutsch b'Darija
            </span>
          </div>
        </div>

        {/* Right side: Streak, XP & 3-Way Language Pill */}
        <div className="flex items-center gap-2">
          {/* Streak & XP Counters */}
          <div className="hidden sm:flex items-center gap-2 mr-1">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200/60 font-mono">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              {streakDays}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200/60 font-mono">
              <Coins className="w-3.5 h-3.5 text-emerald-600" />
              {xp}
            </span>
          </div>

          {/* 3-Way Segmented Language Switcher */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs">
            <button
              type="button"
              onClick={() => onLanguageChange('darija')}
              className={`px-2 py-1 rounded-lg font-bold transition-all font-arabic ${
                language === 'darija'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🇲🇦 الدارجة
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('ar')}
              className={`px-2 py-1 rounded-lg font-bold transition-all font-arabic ${
                language === 'ar'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🇸🇦 العربية
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-1 rounded-lg font-bold transition-all font-sans ${
                language === 'en'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🇬🇧 English
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
