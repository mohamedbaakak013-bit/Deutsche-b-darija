import React, { useState } from 'react';
import {
  CheckCircle2,
  Sparkles,
  Plane,
  Coffee,
  Zap,
  Crown,
  Play,
  ArrowRight,
  MapPin,
} from 'lucide-react';
import { CEFRLevel, Language, LessonModule } from '../../types.ts';
import { CURRICULUM_MODULES } from '../../data/curriculumData.ts';
import { CleanLessonPlayer } from '../CleanLessonPlayer.tsx';
import { ZelligeStar, UmlautMonster } from '../BrandMascot.tsx';
import { sound } from '../../utils/soundEngine.ts';

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

  const isRtl = language === 'darija' || language === 'ar';
  const modules = CURRICULUM_MODULES.filter((m) => m.worldId === currentLevel);

  const levelConfigs = [
    {
      id: 'A1' as CEFRLevel,
      icon: Plane,
      color: '#2563EB',
      labelDarija: '🛫 A1: كازا -> برلين (The Takeoff)',
      labelArabic: '🛫 A1: من كازا إلى برلين (الانطلاق)',
      labelEnglish: '🛫 A1: Casa to Berlin (Takeoff)',
      checkpoint: 'Casablanca Aeroport -> Frankfurt',
    },
    {
      id: 'A2' as CEFRLevel,
      icon: Coffee,
      color: '#FFB800',
      labelDarija: '🥨 A2: الحياة فـ ألمانيا (Street Survival)',
      labelArabic: '🥨 A2: الحياة في ألمانيا (البقاء والتواصل)',
      labelEnglish: '🥨 A2: Daily Life in Germany (Survival)',
      checkpoint: 'Berlin Alexanderplatz -> Lidl',
    },
    {
      id: 'B1' as CEFRLevel,
      icon: Zap,
      color: '#FF3366',
      labelDarija: '⚙️ B1: بلا فلسفة (Fluency Engine)',
      labelArabic: '⚙️ B1: إتقان القواعد والطلاقة (المحرك)',
      labelEnglish: '⚙️ B1: The Fluency Engine (B1)',
      checkpoint: 'Deutsche Bahn -> Autobahn',
    },
    {
      id: 'B2' as CEFRLevel,
      icon: Crown,
      color: '#8B5CF6',
      labelDarija: '👑 B2: معلم بالدارجة والألمانية (Boss Level)',
      labelArabic: '👑 B2: الاحتراف والبيروقراطية (المستوى الأعلى)',
      labelEnglish: '👑 B2: Master & Bureaucracy (Boss Level)',
      checkpoint: 'Bürgeramt -> Workplace Mastery',
    },
  ];

  const currentConfig = levelConfigs.find((c) => c.id === currentLevel) || levelConfigs[0];

  const getLevelLabel = (cfg: (typeof levelConfigs)[0]) => {
    if (language === 'darija') return cfg.labelDarija;
    if (language === 'ar') return cfg.labelArabic;
    return cfg.labelEnglish;
  };

  const getSubtitle = (m: LessonModule) => {
    if (language === 'darija') return m.descriptionDarija;
    if (language === 'ar') return m.descriptionArabic;
    return m.descriptionEnglish;
  };

  const handleStartLesson = (m: LessonModule) => {
    sound.playTap();
    setActiveModule(m);
  };

  return (
    <div className="space-y-6">
      {/* 1. World Filter Tabs (Rich Tactile Neo-Brutalist Tabs) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {levelConfigs.map((cfg) => {
          const isSelected = currentLevel === cfg.id;
          const completedCount = CURRICULUM_MODULES.filter(
            (m) => m.worldId === cfg.id && completedModuleIds.includes(m.id)
          ).length;
          const totalCount = CURRICULUM_MODULES.filter((m) => m.worldId === cfg.id).length;

          return (
            <button
              key={cfg.id}
              type="button"
              onClick={() => {
                sound.playTap();
                onLevelChange(cfg.id);
              }}
              style={{
                backgroundColor: isSelected ? cfg.color : '#FFFFFF',
                color: isSelected ? '#FFFFFF' : '#111827',
              }}
              className="btn-neo p-2.5 sm:p-3 rounded-2xl flex flex-col items-center justify-between text-center gap-1 cursor-pointer transition-all"
            >
              <div className="flex items-center gap-1.5 font-black text-xs sm:text-sm font-bauhaus">
                <span>{cfg.id}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-md font-mono ${
                    isSelected ? 'bg-black/25 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {completedCount}/{totalCount}
                </span>
              </div>
              <span className="text-[11px] font-bold font-arabic line-clamp-1">
                {language === 'en'
                  ? cfg.labelEnglish.split(':')[1]?.trim()
                  : language === 'ar'
                  ? cfg.labelArabic.split(':')[1]?.trim()
                  : cfg.labelDarija.split(':')[1]?.trim()}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. World Banner & Milestone Header */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border-neo shadow-neo flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div
            className="w-12 h-12 rounded-2xl border-neo flex items-center justify-center shrink-0 shadow-neo-sm"
            style={{ backgroundColor: currentConfig.color }}
          >
            <currentConfig.icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-950 font-arabic">
              {getLevelLabel(currentConfig)}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-600 font-mono mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-[#FF3366]" />
              <span>Route: {currentConfig.checkpoint}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs font-mono font-bold text-slate-700 bg-[#F6F2EA] px-3 py-1.5 rounded-xl border border-slate-900/20">
            {modules.filter((m) => completedModuleIds.includes(m.id)).length} of {modules.length}{' '}
            Completed
          </span>
        </div>
      </div>

      {/* 3. The "Casa-to-Berlin" Winding Roadtrip Transit Map */}
      <div className="relative py-4">
        {/* Continuous Sinuous SVG Transit Road Path in Background */}
        <div className="absolute inset-y-0 left-6 sm:left-1/2 -translate-x-1/2 w-16 pointer-events-none hidden sm:block">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 60 800">
            {/* Outer road border */}
            <path
              d="M30 0 Q 55 100, 30 200 T 30 400 T 30 600 T 30 800"
              fill="none"
              stroke="#111827"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Inner road asphalt */}
            <path
              d="M30 0 Q 55 100, 30 200 T 30 400 T 30 600 T 30 800"
              fill="none"
              stroke="#FFB800"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Animated white dash route */}
            <path
              d="M30 0 Q 55 100, 30 200 T 30 400 T 30 600 T 30 800"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeDasharray="6 6"
              className="animate-roadtrip-dash"
            />
          </svg>
        </div>

        {/* Lesson Waypoint Bento Cards */}
        <div className="space-y-5 relative z-10">
          {modules.map((m, index) => {
            const isDone = completedModuleIds.includes(m.id);
            const isEven = index % 2 === 0;

            return (
              <div
                key={m.id}
                className={`relative flex flex-col sm:flex-row items-center gap-4 ${
                  isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* Milestone Node on Transit Line */}
                <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 z-20 w-10 h-10 rounded-full border-neo bg-white items-center justify-center shadow-neo-sm">
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-[#00D68F] fill-[#00D68F]/20" />
                  ) : (
                    <span className="text-xs font-black font-mono text-slate-900">
                      {m.moduleNumber}
                    </span>
                  )}
                </div>

                {/* Rich Tactile Bento Card */}
                <div
                  onClick={() => handleStartLesson(m)}
                  className={`w-full sm:w-[calc(50%-2rem)] bg-white p-4 sm:p-5 rounded-3xl border-neo shadow-neo card-neo-hover cursor-pointer transition-all ${
                    isDone ? 'border-[#00D68F]' : ''
                  }`}
                >
                  {/* Top Bar: Lesson Badge + XP Tag */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-xl bg-slate-950 text-white flex items-center justify-center text-xs font-black font-mono">
                        #{m.moduleNumber}
                      </span>
                      <span className="text-[11px] font-mono font-bold text-slate-600 uppercase">
                        Station {index + 1}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#FFB800] border-neo-2 shadow-neo-sm text-slate-950 font-black text-xs font-mono">
                      <ZelligeStar size={12} color="#111827" />
                      <span>+{m.xpReward} XP</span>
                    </div>
                  </div>

                  {/* German Title & Cultural Subtitle */}
                  <div className="space-y-1 mb-4">
                    <div className="flex items-center gap-2">
                      <bdi
                        dir="ltr"
                        className="font-black text-slate-950 text-base sm:text-lg font-bauhaus tracking-tight"
                      >
                        {m.titleGerman}
                      </bdi>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 font-arabic leading-relaxed line-clamp-2">
                      {getSubtitle(m)}
                    </p>
                  </div>

                  {/* Bottom Action Strip */}
                  <div className="flex items-center justify-between pt-3 border-t-2 border-slate-900/10">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate-600">
                      <span className="w-2 h-2 rounded-full bg-[#00D68F]" />
                      <span>{m.slides?.length || 4} Interactive Steps</span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartLesson(m);
                      }}
                      className="btn-neo py-1.5 px-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs font-arabic inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>
                        {isDone
                          ? language === 'en'
                            ? 'Review'
                            : 'عاود راجع'
                          : language === 'en'
                          ? 'Start'
                          : 'دخل تقرا'}
                      </span>
                      <Play className="w-3.5 h-3.5 fill-white" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lesson Studio Player Modal */}
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
