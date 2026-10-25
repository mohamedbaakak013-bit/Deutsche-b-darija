import React, { useState, useEffect } from 'react';
import { BookOpen, MessageSquare, Target, Compass, Sparkles } from 'lucide-react';
import { CEFRLevel, Language, UserProgress } from './types.ts';
import { CleanHeader } from './components/CleanHeader.tsx';
import { StreakCelebrationModal } from './components/StreakCelebrationModal.tsx';
import { LessonsTab } from './components/tabs/LessonsTab.tsx';
import { DialoguesTab } from './components/tabs/DialoguesTab.tsx';
import { PracticeTab } from './components/tabs/PracticeTab.tsx';
import { sound } from './utils/soundEngine.ts';

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
      xp: 240,
      streakDays: 4,
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
  const [showStreakModal, setShowStreakModal] = useState<boolean>(false);

  const isRtl = progress.language === 'darija' || progress.language === 'ar';

  // Check for consecutive day return on mount to trigger streak celebration
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const lastActive = progress.lastActiveDate;

    if (!lastActive) {
      setProgress((prev) => ({ ...prev, lastActiveDate: today }));
      return;
    }

    if (lastActive === today) {
      return;
    }

    const parseDateToMs = (d: string) => {
      const [y, m, day] = d.split('-').map(Number);
      return new Date(y, m - 1, day).getTime();
    };

    const diffDays = Math.round(
      (parseDateToMs(today) - parseDateToMs(lastActive)) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 1) {
      const newStreak = (progress.streakDays || 0) + 1;
      const bonusXp = 25;
      setProgress((prev) => ({
        ...prev,
        streakDays: newStreak,
        xp: prev.xp + bonusXp,
        lastActiveDate: today,
      }));

      const timer = setTimeout(() => {
        setShowStreakModal(true);
      }, 500);
      return () => clearTimeout(timer);
    } else if (diffDays > 1) {
      setProgress((prev) => ({
        ...prev,
        streakDays: 1,
        lastActiveDate: today,
      }));
    }
  }, []);

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

  const handleTabChange = (tabId: 'lessons' | 'dialogues' | 'practice') => {
    sound.playTap();
    setActiveTab(tabId);
  };

  const navItems = [
    {
      id: 'lessons',
      labelDarija: '🗺️ خريطة الدروس (A1-B2)',
      labelArabic: '🗺️ خارطة الدروس (A1-B2)',
      labelEnglish: '🗺️ Roadtrip Map (A1-B2)',
      icon: Compass,
      color: '#2563EB',
    },
    {
      id: 'dialogues',
      labelDarija: '🎭 الحوارات والقصص',
      labelArabic: '🎭 الحوارات والقصص اليومية',
      labelEnglish: '🎭 Simulators & Stories',
      icon: MessageSquare,
      color: '#FF3366',
    },
    {
      id: 'practice',
      labelDarija: '🎮 ألعاب وتمرن مع AI',
      labelArabic: '🎮 ألعاب وتدريب مع الذكاء الاصطناعي',
      labelEnglish: '🎮 Arcade Blitz & AI Tutor',
      icon: Target,
      color: '#00D68F',
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
      className="min-h-screen text-slate-950 flex flex-col font-sans selection:bg-[#FFB800] selection:text-slate-950 pb-28 md:pb-14"
    >
      {/* Bauhaus x Zellige Sticky Header & Live HUD */}
      <CleanHeader
        language={progress.language}
        streakDays={progress.streakDays}
        xp={progress.xp}
        onLanguageChange={handleLanguageChange}
        onStreakClick={() => setShowStreakModal(true)}
      />

      {/* Main Container (max-w-4xl for tactile spacious layout) */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-3 sm:px-6 py-5 sm:py-7 space-y-6">
        {/* Tactile 3-Tab Neo-Brutalist Navigation Bar */}
        <div className="flex items-center bg-white p-1.5 rounded-3xl border-neo shadow-neo gap-1.5 sm:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isSelected = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleTabChange(item.id as any)}
                style={{
                  backgroundColor: isSelected ? item.color : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : '#111827',
                }}
                className={`flex-1 py-3 px-3 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 font-arabic cursor-pointer ${
                  isSelected ? 'shadow-neo-sm border-neo-2' : 'hover:bg-slate-50 text-slate-800'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{getNavLabel(item)}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: The "Casa-to-Berlin" Interactive Journey Map */}
        {activeTab === 'lessons' && (
          <LessonsTab
            currentLevel={progress.activeWorld}
            language={progress.language}
            completedModuleIds={progress.completedModuleIds}
            onLevelChange={handleLevelChange}
            onCompleteModule={handleCompleteModule}
          />
        )}

        {/* Tab 2: Simulators & Chat Theatre */}
        {activeTab === 'dialogues' && <DialoguesTab language={progress.language} />}

        {/* Tab 3: Arcade Blitz, Name Speller & Ostaz Bouchaib AI Tutor */}
        {activeTab === 'practice' && (
          <PracticeTab language={progress.language} onAddXp={handleAddXp} />
        )}
      </main>

      {/* Mobile Floating Bottom Bar with Tactile 3D Styling */}
      <nav className="md:hidden fixed bottom-3 left-3 right-3 z-40 bg-[#F6F2EA]/95 backdrop-blur-md border-neo shadow-neo rounded-3xl p-1.5 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isSelected = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleTabChange(item.id as any)}
              style={{
                backgroundColor: isSelected ? item.color : 'transparent',
                color: isSelected ? '#FFFFFF' : '#111827',
              }}
              className={`flex-1 py-2 rounded-2xl flex flex-col items-center gap-0.5 transition-all cursor-pointer ${
                isSelected ? 'border-neo-2 shadow-neo-sm' : 'text-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px] font-black font-arabic line-clamp-1">
                {progress.language === 'en'
                  ? item.labelEnglish.split(' ')[1]
                  : item.labelDarija.split(' ')[1]}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Streak Celebration Modal */}
      <StreakCelebrationModal
        isOpen={showStreakModal}
        streakDays={progress.streakDays}
        bonusXp={25}
        language={progress.language}
        onClose={() => setShowStreakModal(false)}
      />
    </div>
  );
}
