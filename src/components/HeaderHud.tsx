import React from 'react';
import { Flame, Coins, Globe } from 'lucide-react';
import { CEFRLevel, Language } from '../types.ts';

interface HeaderHudProps {
  level: CEFRLevel;
  xp: number;
  streakDays: number;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onSelectLevel: (lvl: CEFRLevel) => void;
}

export const HeaderHud: React.FC<HeaderHudProps> = ({
  level,
  xp,
  streakDays,
  currentLanguage,
  onLanguageChange,
  onSelectLevel,
}) => {
  const levels: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2'];
  const isRtl = currentLanguage === 'darija' || currentLanguage === 'ar';

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4 flex-wrap">
        {/* Zone 1: Single Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 via-amber-500 to-red-600 flex items-center justify-center font-black text-white text-lg shadow-md border border-white/10 shrink-0">
            🇩🇪
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white font-arabic">
                دوتش بالدارجة
              </span>
              <span className="text-[11px] font-bold text-emerald-400 font-mono tracking-wider hidden sm:inline px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                Deutsch b'Darija
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-arabic">
              {currentLanguage === 'darija'
                ? 'رحلة بوشعيب وجينس من A1 حتى B2'
                : currentLanguage === 'ar'
                ? 'رحلة تعلم الألمانية من A1 حتى B2'
                : 'German A1–B2 with Bouchaib & Jens'}
            </span>
          </div>
        </div>

        {/* Zone 2: Level Badges Selector */}
        <div className="flex items-center bg-slate-900/90 p-1 rounded-2xl border border-slate-800 shadow-inner">
          {levels.map((lvl) => {
            const isSelected = level === lvl;
            return (
              <button
                key={lvl}
                type="button"
                onClick={() => onSelectLevel(lvl)}
                className={`px-3 py-1 text-xs font-black rounded-xl transition-all font-mono ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950 shadow-sm font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {lvl}
              </button>
            );
          })}
        </div>

        {/* Zone 3: Streak, XP & Language Switcher */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Kaskrout & Brezel Streak */}
          <div
            className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-xl text-amber-400"
            title="Kaskروط / Brezel Streak — أيام التعلم المتتالية"
          >
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
            <span className="text-xs font-extrabold font-mono tabular-nums">{streakDays}</span>
            <span className="text-[11px] font-bold font-arabic hidden md:inline">كاسكروط</span>
          </div>

          {/* Dirham-Euro XP */}
          <div
            className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl text-emerald-400"
            title="Dirham-Euro XP Coins"
          >
            <Coins className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-extrabold font-mono tabular-nums">{xp}</span>
            <span className="text-[10px] font-bold text-emerald-500 hidden md:inline">XP</span>
          </div>

          {/* Tri-Lingual Switcher */}
          <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-2xl shadow-inner">
            <Globe className="w-3.5 h-3.5 text-slate-400 mx-1.5 shrink-0" />
            <button
              type="button"
              onClick={() => onLanguageChange('darija')}
              className={`px-2.5 py-1 text-xs font-bold rounded-xl transition-all font-arabic ${
                currentLanguage === 'darija'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🇲🇦 دارجة
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('ar')}
              className={`px-2.5 py-1 text-xs font-bold rounded-xl transition-all font-arabic ${
                currentLanguage === 'ar'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🇸🇦 فصحى
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 text-xs font-bold rounded-xl transition-all font-mono ${
                currentLanguage === 'en'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🇬🇧 EN
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
