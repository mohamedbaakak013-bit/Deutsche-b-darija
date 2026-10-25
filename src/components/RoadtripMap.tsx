import React, { useState } from 'react';
import {
  CheckCircle2,
  Play,
  Sparkles,
  BookOpen,
  Volume2,
  UserCheck,
  ShieldAlert,
  Clock,
  HelpCircle,
  Scissors,
  Flame,
  Compass,
  Link2,
  Award,
} from 'lucide-react';
import { LessonModule, CEFRLevel, Language } from '../types.ts';
import { CURRICULUM_MODULES } from '../data/curriculumData.ts';
import { LessonViewer } from './LessonViewer.tsx';

interface RoadtripMapProps {
  currentWorld: CEFRLevel;
  completedModuleIds: string[];
  language: Language;
  onCompleteModule: (moduleId: string, xp: number) => void;
  onSelectWorld: (world: CEFRLevel) => void;
}

const WORLD_INFO: Record<
  CEFRLevel,
  {
    titleGerman: string;
    titleDarija: string;
    titleArabic: string;
    titleEnglish: string;
    subtitleDarija: string;
    subtitleArabic: string;
    subtitleEnglish: string;
    themeGradient: string;
    accentColor: string;
  }
> = {
  A1: {
    titleGerman: 'Welt 1: A1 — Bouchaib packt seine Koffer',
    titleDarija: 'العالم 1: A1 — بوشعيب كيجمع فاليزتو (المبتدئ المطلق)',
    titleArabic: 'المستوى الأول: A1 — بوشعيب يحزم حقائبه (المبتدئ)',
    titleEnglish: 'World 1: A1 — Bouchaib Packs His Bags (Beginner)',
    subtitleDarija: 'الحروف الألمانية، سر الوجوه الثلاثة لحرف R، الضمائر، أدوات der/die/das، الأرقام والحياة اليومية.',
    subtitleArabic: 'الأبجدية الألمانية، أسرار النطق، الضمائر وتصريف الأفعال، أدوات التعريف، والأرقام.',
    subtitleEnglish: 'German alphabet, pronunciation secrets, pronouns, regular verbs, articles & daily survival.',
    themeGradient: 'from-emerald-950/50 via-slate-900 to-slate-950',
    accentColor: 'text-emerald-400',
  },
  A2: {
    titleGerman: 'Welt 2: A2 — Überleben in Berlin',
    titleDarija: 'العالم 2: A2 — النجاة فـ برلين (Surviving Berlin)',
    titleArabic: 'المستوى الثاني: A2 — العيش في برلين',
    titleEnglish: 'World 2: A2 — Surviving in Berlin',
    subtitleDarija: 'الأفعال المنفصلة، معركة المودال، لغز الأكوزاتيف والداتيف، وحروف الجر المزدوجة.',
    subtitleArabic: 'الأفعال المنفصلة، أفعال المودال، وحالات النصب والجر وحروف المكان.',
    subtitleEnglish: 'Separable verbs, modal verbs, cases (Akkusativ/Dativ), and two-way prepositions.',
    themeGradient: 'from-amber-950/50 via-slate-900 to-slate-950',
    accentColor: 'text-amber-400',
  },
  B1: {
    titleGerman: 'Welt 3: B1 — Deutsch sprechen',
    titleDarija: 'العالم 3: B1 — الهضرة بالألمانية (المستوى المستقل)',
    titleArabic: 'المستوى الثالث: B1 — التحدث باللغة الألمانية',
    titleEnglish: 'World 3: B1 — Speaking Mostly in German',
    subtitleDarija: 'ربط الجمل المعقدة بـ weil و dass و wenn و obwohl، وضبط جميع الأزمنة.',
    subtitleArabic: 'صياغة الجمل الثانوية المعقدة وأدوات الربط وإتقان تصريف الأزمنة.',
    subtitleEnglish: 'Subordinating connectors (weil, dass), and fluent conversational structures.',
    themeGradient: 'from-blue-950/50 via-slate-900 to-slate-950',
    accentColor: 'text-blue-400',
  },
  B2: {
    titleGerman: 'Welt 4: B2 — Das Boss-Level (Immersiv)',
    titleDarija: 'العالم 4: B2 — ليفيل الوحش الألماني (Immersive German)',
    titleArabic: 'المستوى الرابع: B2 — المستوى المتقدم والأكاديمي',
    titleEnglish: 'World 4: B2 — The Boss Level (Professional Fluency)',
    subtitleDarija: 'الكلمات المركبة العملاقة، لغة العمل والبيروقراطية، وإتقان التفاصيل الدقيقة.',
    subtitleArabic: 'الكلمات المركبة الألمانية، المصطلحات الإدارية والمهنية المتقدمة.',
    subtitleEnglish: 'Massive compound nouns, workplace rhetoric, advanced bureaucracy mastery.',
    themeGradient: 'from-purple-950/50 via-slate-900 to-slate-950',
    accentColor: 'text-purple-400',
  },
};

const ICON_MAP: Record<string, any> = {
  BookOpen,
  Volume2,
  UserCheck,
  ShieldAlert,
  Clock,
  HelpCircle,
  Scissors,
  Flame,
  Compass,
  Link2,
  Award,
};

export const RoadtripMap: React.FC<RoadtripMapProps> = ({
  currentWorld,
  completedModuleIds,
  language,
  onCompleteModule,
  onSelectWorld,
}) => {
  const [activeModule, setActiveModule] = useState<LessonModule | null>(null);

  const worldModules = CURRICULUM_MODULES.filter((m) => m.worldId === currentWorld);
  const currentWorldInfo = WORLD_INFO[currentWorld];
  const worldsList: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2'];
  const isRtl = language === 'darija' || language === 'ar';

  return (
    <div className="space-y-6" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* World Selection Tabs (Bento Style) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {worldsList.map((worldKey) => {
          const info = WORLD_INFO[worldKey];
          const isSelected = currentWorld === worldKey;
          const countCompleted = CURRICULUM_MODULES.filter(
            (m) => m.worldId === worldKey && completedModuleIds.includes(m.id)
          ).length;
          const totalInWorld = CURRICULUM_MODULES.filter((m) => m.worldId === worldKey).length;

          return (
            <button
              key={worldKey}
              type="button"
              onClick={() => onSelectWorld(worldKey)}
              className={`p-4 rounded-3xl border text-left rtl:text-right transition-all relative overflow-hidden shadow-xs ${
                isSelected
                  ? 'bg-slate-900 border-emerald-500 shadow-md ring-1 ring-emerald-500/30'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black font-mono text-white">{worldKey}</span>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded-lg border border-emerald-800/40">
                  {countCompleted}/{totalInWorld}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-200 mt-2 line-clamp-1 font-arabic">
                {language === 'darija' ? info.titleDarija : language === 'ar' ? info.titleArabic : info.titleEnglish}
              </p>
              {isSelected && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Active World Banner */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border border-slate-800 bg-gradient-to-br ${currentWorldInfo.themeGradient} relative overflow-hidden shadow-lg`}
      >
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-xs font-bold font-mono">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-white">{currentWorld} Roadmap</span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight font-arabic leading-snug">
            {language === 'darija'
              ? currentWorldInfo.titleDarija
              : language === 'ar'
              ? currentWorldInfo.titleArabic
              : currentWorldInfo.titleEnglish}
          </h2>

          <p className="text-sm sm:text-base text-slate-200 font-arabic leading-[1.8] pt-1 font-medium">
            {language === 'darija'
              ? currentWorldInfo.subtitleDarija
              : language === 'ar'
              ? currentWorldInfo.subtitleArabic
              : currentWorldInfo.subtitleEnglish}
          </p>
        </div>
      </div>

      {/* Modules Roadmap Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 font-arabic">
            <span>دروس ومغامرات {currentWorld}</span>
            <span className="text-xs font-normal text-slate-400 font-mono">
              ({worldModules.length} Modules)
            </span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {worldModules.map((module) => {
            const isCompleted = completedModuleIds.includes(module.id);
            const IconComponent = ICON_MAP[module.iconName] || BookOpen;

            return (
              <div
                key={module.id}
                className={`p-6 rounded-3xl border transition-all flex flex-col justify-between gap-4 shadow-sm group ${
                  isCompleted
                    ? 'bg-slate-900/90 border-emerald-500/40 hover:border-emerald-500/70'
                    : 'bg-slate-950/80 border-slate-800/90 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black ${
                          isCompleted
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-900 text-slate-300 border border-slate-700'
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
                          Modul {module.moduleNumber}
                        </span>
                        <bdi dir="ltr" className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors font-mono block">
                          {module.titleGerman}
                        </bdi>
                      </div>
                    </div>

                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-xl border border-emerald-500/20 font-arabic">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>مكتمل</span>
                      </span>
                    ) : (
                      <span className="text-xs font-mono font-bold text-slate-300 bg-slate-900 px-3 py-1 rounded-xl border border-slate-800">
                        +{module.xpReward} XP
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 font-arabic mt-3.5 leading-[1.8] font-medium">
                    {language === 'darija'
                      ? module.descriptionDarija
                      : language === 'ar'
                      ? module.descriptionArabic
                      : module.descriptionEnglish}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                  <span className="text-xs text-slate-400 font-mono">
                    {module.slides.length} Slides • Audio & Quiz
                  </span>

                  <button
                    type="button"
                    onClick={() => setActiveModule(module)}
                    className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all font-arabic ${
                      isCompleted
                        ? 'bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700'
                        : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md btn-tactile-emerald'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current rtl:rotate-180" />
                    <span>{isCompleted ? 'مراجعة الدرس' : 'ابدأ الدرس'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Lesson Modal */}
      {activeModule && (
        <LessonViewer
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
