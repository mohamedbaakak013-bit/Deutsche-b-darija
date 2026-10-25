import React, { useEffect } from 'react';
import { Flame, X, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language } from '../types.ts';
import { ZelligeStar, OstazBouchaibMascot } from './BrandMascot.tsx';
import { sound } from '../utils/soundEngine.ts';

interface StreakCelebrationModalProps {
  isOpen: boolean;
  streakDays: number;
  bonusXp?: number;
  language: Language;
  onClose: () => void;
}

export const StreakCelebrationModal: React.FC<StreakCelebrationModalProps> = ({
  isOpen,
  streakDays,
  bonusXp = 15,
  language,
  onClose,
}) => {
  const isRtl = language === 'darija' || language === 'ar';

  useEffect(() => {
    if (isOpen) {
      sound.playLevelUp();
      try {
        confetti({
          particleCount: 50,
          spread: 65,
          origin: { y: 0.62 },
          colors: ['#FFB800', '#FF3366', '#00D68F', '#2563EB', '#8B5CF6'],
        });
      } catch {
        // Safe
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getTexts = () => {
    if (language === 'darija') {
      let funnyNote =
        'تبارك الله عليك! الاستمرار اليومي هو السر باش تفهم الألمانية بالخف بلا تعقيد.';
      if (streakDays >= 7) {
        funnyNote =
          'سيمانة كاملة ديال الخدمة! نتا دابا بحال شي برليني أصلي غادي فـ die Autobahn بلا فران!';
      } else if (streakDays >= 3) {
        funnyNote =
          '3 أيام متتالية! الدماغ دابا كيشد القواعد الألمانية ساهلة بحال كاس أتاي بالنعناع مشحر ☕🇩🇪';
      }

      return {
        title: `سلسلة ${streakDays} أيام!`,
        kicker: 'مكافأة الاستمرار اليومي (Tägliche Serie)',
        description: funnyNote,
        bonusLabel: `+${bonusXp} نقطة XP هدية الدخول المتتالي`,
        cta: 'تابع التعلم دابا 🔥',
        dayNames: ['إث', 'ثل', 'أر', 'خم', 'جم', 'سب', 'أح'],
      };
    }

    if (language === 'ar') {
      return {
        title: `سلسلة ${streakDays} أيام متتالية!`,
        kicker: 'مكافأة الالتزام اليومي',
        description:
          'رائع جداً! ممارسة الألمانية يومياً تضمن ترسيخ الكلمات والقواعد في الذاكرة طويلة المدى.',
        bonusLabel: `+${bonusXp} نقطة XP كمكافأة للعودة اليومية`,
        cta: 'متابعة التعلم 🔥',
        dayNames: ['إث', 'ثل', 'أر', 'خم', 'جم', 'سب', 'أح'],
      };
    }

    return {
      title: `${streakDays}-Day Streak!`,
      kicker: 'Daily Streak Reward',
      description:
        'Keep the momentum going! Daily habit is the fastest way to German fluency.',
      bonusLabel: `+${bonusXp} XP daily return reward`,
      cta: 'Continue Learning 🔥',
      dayNames: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    };
  };

  const texts = getTexts();
  const daysInRow = 7;
  const activeCount = Math.min(streakDays, daysInRow);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity"
      onClick={() => {
        sound.playTap();
        onClose();
      }}
    >
      <div
        dir={isRtl ? 'rtl' : 'ltr'}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm bg-[#F6F2EA] rounded-3xl border-neo shadow-neo p-6 text-center transform transition-all animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            sound.playTap();
            onClose();
          }}
          aria-label="Close"
          className="w-8 h-8 rounded-xl bg-white border-neo-2 shadow-neo-sm absolute top-4 right-4 rtl:right-auto rtl:left-4 flex items-center justify-center hover:bg-slate-100 cursor-pointer"
        >
          <X className="w-4 h-4 text-slate-950" />
        </button>

        {/* Animated Mascot & Flame */}
        <div className="relative mx-auto w-20 h-20 mb-3 flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-[#FFB800] border-neo-2 shadow-neo-sm flex items-center justify-center text-slate-950">
            <Flame className="w-9 h-9 fill-[#FF3366] text-[#FF3366] animate-pulse" />
          </div>
        </div>

        {/* Kicker */}
        <p className="text-xs font-mono font-bold text-[#FF3366] uppercase mb-1">
          {texts.kicker}
        </p>

        {/* Title */}
        <h2 className="text-2xl font-black text-slate-950 font-bauhaus tracking-tight mb-2">
          {texts.title}
        </h2>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-700 font-arabic leading-relaxed mb-5 px-2">
          {texts.description}
        </p>

        {/* 7-Day Streak Timeline */}
        <div className="bg-white border-neo-2 rounded-2xl p-3 mb-5 shadow-neo-sm">
          <div className="grid grid-cols-7 gap-1.5 text-center">
            {texts.dayNames.map((name, index) => {
              const isToday = index === 6;
              const isFilled = index >= 7 - activeCount;

              return (
                <div key={index} className="flex flex-col items-center gap-1">
                  <span className="text-[10px] text-slate-600 font-mono font-bold">{name}</span>
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                      isToday
                        ? 'bg-[#FFB800] text-slate-950 border-2 border-slate-950 shadow-xs'
                        : isFilled
                        ? 'bg-[#00D68F] text-slate-950 border-2 border-slate-950'
                        : 'bg-[#F6F2EA] text-slate-400 border border-slate-900/20'
                    }`}
                  >
                    {isToday ? (
                      <Flame className="w-3.5 h-3.5 fill-[#FF3366] text-[#FF3366]" />
                    ) : isFilled ? (
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bonus XP Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#00D68F] border-neo-2 rounded-xl text-slate-950 text-xs font-black font-mono mb-5 shadow-neo-sm">
          <ZelligeStar size={13} color="#111827" />
          <span>{texts.bonusLabel}</span>
        </div>

        {/* Primary Tactile 3D Action Button */}
        <button
          type="button"
          onClick={() => {
            sound.playTap();
            onClose();
          }}
          className="btn-neo w-full py-3.5 px-6 rounded-2xl bg-[#FFB800] hover:bg-[#F59E0B] text-slate-950 font-black text-sm font-arabic cursor-pointer"
        >
          {texts.cta}
        </button>
      </div>
    </div>
  );
};
