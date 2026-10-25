import React, { useState, useEffect } from 'react';
import { BookOpen, MessageSquare, Target } from 'lucide-react';
import { CEFRLevel, Language, UserProgress } from './types.ts';
import { CleanHeader } from './components/CleanHeader.tsx';
import { LessonsTab } from './components/tabs/LessonsTab.tsx';
import { DialoguesTab } from './components/tabs/DialoguesTab.tsx';
import { PracticeTab } from './components/tabs/PracticeTab.tsx';

const STORAGE_KEY = 'deutsch_bdarija_minimal_v1';

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          return JSON.parse(saved);
        }
      } catch (err) {
        console.error('Failed to load progress:', err);
      }
    }
    return {
      xp: 150,
      streakDays: 3,
      lastActiveDate: new Date().toISOString().split('T')[0],
      completedModuleIds: ['a1-mod-1'],
      completedSimulatorIds: [],
      activeWorld: 'A1',
      language: 'darija',
      audioRate: 1.0,
      derDieDasHighScore: 0,
    };
  });

  const [activeTab, setActiveTab] = useState<'lessons' | 'dialogues' | 'practice'>('lessons');

  const isRtl = progress.language === 'darija' || progress.language === 'ar';

  // Synchronize document dir and lang attribute
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
      document.documentElement.lang = progress.language === 'en' ? 'en' : 'ar';
    }
  }, [isRtl, progress.language]);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Error saving progress:', e);
    }
  }, [progress]);

  const handleLanguageChange = (lang: Language) => {
    setProgress((prev) => ({ ...prev, language: lang }));
  };

  const handleLevelChange = (lvl: CEFRLevel) => {
    setProgress((prev) => ({ ...prev, activeWorld: lvl }));
  };

  const handleCompleteModule = (moduleId: string, xpReward: number) => {
    setProgress((prev) => {
      const alreadyDone = prev.completedModuleIds.includes(moduleId);
      return {
        ...prev,
        xp: prev.xp + (alreadyDone ? Math.floor(xpReward / 4) : xpReward),
        completedModuleIds: alreadyDone
          ? prev.completedModuleIds
          : [...prev.completedModuleIds, moduleId],
      };
    });
  };

  const handleAddXp = (amount: number) => {
    setProgress((prev) => ({ ...prev, xp: prev.xp + amount }));
  };

  const navItems = [
    {
      id: 'lessons',
      labelDarija: 'الدروس',
      labelArabic: 'الدروس',
      labelEnglish: 'Lessons',
      icon: BookOpen,
    },
    {
      id: 'dialogues',
      labelDarija: 'الحوارات والقصص',
      labelArabic: 'الحوارات والقصص',
      labelEnglish: 'Dialogues & Stories',
      icon: MessageSquare,
    },
    {
      id: 'practice',
      labelDarija: 'تمرن',
      labelArabic: 'تمرن',
      labelEnglish: 'Practice',
      icon: Target,
    },
  ];

  const getNavLabel = (item: (typeof navItems)[0]) => {
    if (progress.language === 'darija') return item.labelDarija;
    if (progress.language === 'ar') return item.labelArabic;
    return item.labelEnglish;
  };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950 pb-24 md:pb-12"
    >
      {/* Minimal Apple HIG Header */}
      <CleanHeader
        language={progress.language}
        streakDays={progress.streakDays}
        xp={progress.xp}
        onLanguageChange={handleLanguageChange}
      />

      {/* Main Single Column Container (max-w-[680px]) */}
      <main className="flex-1 w-full max-w-[680px] mx-auto px-4 sm:px-6 py-5 space-y-4">
        {/* Clean 3-Tab Desktop Bar */}
        <div className="flex items-center bg-white p-1 rounded-2xl border border-slate-200/80 shadow-xs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isSelected = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id as any)}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 font-arabic ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{getNavLabel(item)}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Lessons */}
        {activeTab === 'lessons' && (
          <LessonsTab
            currentLevel={progress.activeWorld}
            language={progress.language}
            completedModuleIds={progress.completedModuleIds}
            onLevelChange={handleLevelChange}
            onCompleteModule={handleCompleteModule}
          />
        )}

        {/* Tab 2: Dialogues & Stories */}
        {activeTab === 'dialogues' && <DialoguesTab language={progress.language} />}

        {/* Tab 3: Practice & AI Help */}
        {activeTab === 'practice' && (
          <PracticeTab language={progress.language} onAddXp={handleAddXp} />
        )}
      </main>

      {/* Mobile Floating Bottom Bar */}
      <nav className="md:hidden fixed bottom-3 left-4 right-4 z-40 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-1.5 flex items-center justify-around shadow-lg">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isSelected = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id as any)}
              className={`flex-1 py-2 rounded-xl flex flex-col items-center gap-1 transition-all ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px] font-bold font-arabic line-clamp-1">
                {getNavLabel(item)}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
