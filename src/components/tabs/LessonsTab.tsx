import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { CEFRLevel, Language, LessonModule } from '../../types.ts';
import { CURRICULUM_MODULES } from '../../data/curriculumData.ts';
import { CleanLessonPlayer } from '../CleanLessonPlayer.tsx';

interface LessonsTabProps {
  currentLevel: CEFRLevel;
  language: Language;
  completedModuleIds: string[];
  onLevelChange: (lvl: CEFRLevel) => void;
  onCompleteModule: (moduleId: string, xp: number) => void;
}

export const LessonsTab: React.FC<LessonsTabProps> = ({
  currentLevel,
  language,
  completedModuleIds,
  onLevelChange,
  onCompleteModule,
}) => {
  const [activeModule, setActiveModule] = useState<LessonModule | null>(null);

  const levels: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2'];
  const modules = CURRICULUM_MODULES.filter((m) => m.worldId === currentLevel);
  const isRtl = language === 'darija' || language === 'ar';

  const getSubtitle = (m: LessonModule) => {
    if (language === 'darija') return m.descriptionDarija;
    if (language === 'ar') return m.descriptionArabic;
    return m.descriptionEnglish;
  };

  return (
    <div className="space-y-4">
      {/* Level Selector Pills */}
      <div className="flex items-center justify-between bg-white p-1.5 rounded-2xl border border-slate-200/80 shadow-xs">
        {levels.map((lvl) => {
          const isSelected = currentLevel === lvl;
          const completedCount = CURRICULUM_MODULES.filter(
            (m) => m.worldId === lvl && completedModuleIds.includes(m.id)
          ).length;
          const totalCount = CURRICULUM_MODULES.filter((m) => m.worldId === lvl).length;

          return (
            <button
              key={lvl}
              type="button"
              onClick={() => onLevelChange(lvl)}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 font-mono ${
                isSelected
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <span>{lvl}</span>
              <span className={`text-[10px] ${isSelected ? 'text-slate-950 font-normal' : 'text-slate-400'}`}>
                ({completedCount}/{totalCount})
              </span>
            </button>
          );
        })}
      </div>

      {/* Clean Vertical Lesson Card List */}
      <div className="space-y-2.5">
        {modules.map((m) => {
          const isDone = completedModuleIds.includes(m.id);

          return (
            <div
              key={m.id}
              onClick={() => setActiveModule(m)}
              className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3.5">
                {/* Number Badge */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black font-mono shrink-0 ${
                    isDone
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-700 group-hover:bg-amber-100 group-hover:text-amber-900 transition-colors'
                  }`}
                >
                  {m.moduleNumber}
                </div>

                {/* Title & 1-line Subtitle */}
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <bdi dir="ltr" className="font-bold text-slate-900 text-sm sm:text-base font-mono">
                      {m.titleGerman}
                    </bdi>
                    {isDone && (
                      <span className="text-emerald-600 inline-flex items-center gap-0.5 text-xs font-bold font-arabic">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>مكتمل</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 font-arabic line-clamp-1">
                    {getSubtitle(m)}
                  </p>
                </div>
              </div>

              {/* Action arrow */}
              <div className="shrink-0 text-slate-400 group-hover:text-slate-700 transition-colors">
                <ChevronRight className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Focused Lesson Player Modal */}
      {activeModule && (
        <CleanLessonPlayer
          module={activeModule}
          language={language}
          onClose={() => setActiveModule(null)}
          onComplete={(modId, xp) => {
            onCompleteModule(modId, xp);
            setActiveModule(null);
          }}
        />
      )}
    </div>
  );
};
