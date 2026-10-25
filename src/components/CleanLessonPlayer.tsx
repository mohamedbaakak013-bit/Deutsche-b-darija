import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Zap,
  Volume2,
  Rocket,
  RotateCcw,
} from 'lucide-react';
import { LessonModule, Language } from '../types.ts';
import { AudioPlayButton } from './AudioPlayButton.tsx';
import { OstazBouchaibMascot, UmlautMonster, ZelligeStar } from './BrandMascot.tsx';
import { sound } from '../utils/soundEngine.ts';

interface CleanLessonPlayerProps {
  module: LessonModule;
  language: Language;
  onClose: () => void;
  onComplete: (moduleId: string, xp: number) => void;
}

export const CleanLessonPlayer: React.FC<CleanLessonPlayerProps> = ({
  module,
  language,
  onClose,
  onComplete,
}) => {
  // 4 Steps: 0: Concept Intro, 1: Interactive Lab & Verb Splitter, 2: Trap Alert, 3: Interactive Quiz
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<string | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Verb Splitter Interactive State
  const [isVerbSplit, setIsVerbSplit] = useState(false);

  const isRtl = language === 'darija' || language === 'ar';

  const introSlide = module.slides[0];
  const grammarSlide =
    module.slides.find((s) => s.type === 'grammar') || module.slides[1] || introSlide;
  const vocabSlide =
    module.slides.find((s) => s.vocabList && s.vocabList.length > 0) || module.slides[2];
  const conjugationSlide = module.slides.find((s) => s.conjugationData);
  const quizSlide = module.slides.find((s) => s.quiz) || module.slides[module.slides.length - 1];

  const handleNext = () => {
    sound.playTap();
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Completed lesson
      sound.playLevelUp();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#2563EB', '#FFB800', '#FF3366', '#00D68F', '#8B5CF6'],
        });
      } catch {
        // Safe confetti
      }
      onComplete(module.id, module.xpReward);
      onClose();
    }
  };

  const handlePrev = () => {
    sound.playTap();
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSelectQuiz = (optionId: string, correct: boolean) => {
    if (isQuizSubmitted) return;
    setSelectedQuizAnswer(optionId);
    setIsQuizSubmitted(true);
    setIsCorrect(correct);

    if (correct) {
      sound.playSuccess();
      try {
        confetti({
          particleCount: 35,
          spread: 50,
          origin: { y: 0.65 },
        });
      } catch {
        // Safe
      }
    } else {
      sound.playMistake();
    }
  };

  const getActiveText = (obj?: { darija: string; ar: string; en: string }) => {
    if (!obj) return '';
    if (language === 'darija') return obj.darija;
    if (language === 'ar') return obj.ar;
    return obj.en;
  };

  const stepTitles = [
    {
      darija: '1. الفكرة الأساسية مع أستاذ بوشعيب',
      ar: '1. الفكرة الأساسية مع أستاذ بوشعيب',
      en: '1. Concept Hook & Context',
    },
    {
      darija: '2. مختبر النطق والقواعد التفاعلي',
      ar: '2. مختبر النطق والقواعد التفاعلي',
      en: '2. Interactive Sound & Grammar Lab',
    },
    {
      darija: '3. رد بالك من الفخ! (Achtung)',
      ar: '3. احذر من الفخ الشائع! (Achtung)',
      en: '3. Common Learner Trap (Achtung)',
    },
    {
      darija: '4. تحدي الفهم ونقاط XP',
      ar: '4. تحدي الفهم ونقاط الخبرة',
      en: '4. Mastery Quiz & XP Challenge',
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      dir={isRtl ? 'rtl' : 'ltr'}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
      onClick={() => {
        sound.playTap();
        onClose();
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#F6F2EA] rounded-3xl border-neo shadow-neo w-full max-w-xl flex flex-col max-h-[92vh] overflow-hidden my-auto"
      >
        {/* Top Header with Bauhaus Progress Bar & Mascot Cheer */}
        <div className="p-4 bg-white border-b-2.5 border-slate-900 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 flex-1">
            <OstazBouchaibMascot mood={currentStep === 3 ? 'happy' : 'teaching'} size={42} />
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs font-black text-slate-900 mb-1 font-mono">
                <span>
                  {module.worldId} • Station #{module.moduleNumber}
                </span>
                <span>Step {currentStep + 1} / 4</span>
              </div>
              {/* Tactile Progress Segmented Bar */}
              <div className="w-full bg-[#F6F2EA] h-3 rounded-full border-2 border-slate-900 overflow-hidden p-0.5">
                <div
                  className="bg-[#FFB800] h-full rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / 4) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playTap();
              onClose();
            }}
            className="w-9 h-9 rounded-xl bg-white border-neo-2 shadow-neo-sm flex items-center justify-center hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-4 h-4 text-slate-950" />
          </button>
        </div>

        {/* Step Kicker */}
        <div className="px-5 pt-3 pb-1 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-950 font-arabic bg-white px-2.5 py-1 rounded-xl border border-slate-900/20">
            {language === 'en'
              ? stepTitles[currentStep].en
              : language === 'ar'
              ? stepTitles[currentStep].ar
              : stepTitles[currentStep].darija}
          </span>
          <span className="text-xs font-mono font-bold text-slate-700">+{module.xpReward} XP</span>
        </div>

        {/* Focused Interactive Card Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {/* ================= STEP 1: CONCEPT HOOK ================= */}
          {currentStep === 0 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-white p-5 rounded-2xl border-neo shadow-neo-sm space-y-3">
                <div className="flex items-center gap-2">
                  <bdi
                    dir="ltr"
                    className="text-lg sm:text-xl font-black text-slate-950 font-bauhaus"
                  >
                    {module.titleGerman}
                  </bdi>
                </div>

                {introSlide?.storyContext && (
                  <div className="p-3.5 bg-[#F6F2EA] rounded-xl border-2 border-slate-900/15 text-xs sm:text-sm text-slate-800 leading-relaxed font-arabic">
                    <div className="flex items-center gap-1.5 font-bold text-slate-950 mb-1">
                      <span className="text-base">🎙️</span>
                      <span>
                        {introSlide.storyContext.speaker === 'Bouchaib'
                          ? 'بوشعيب فـ برلين:'
                          : 'جينس كيشرح ليك:'}
                      </span>
                    </div>
                    <p className="italic">
                      "{getActiveText(introSlide.storyContext)}"
                    </p>
                  </div>
                )}

                <p className="text-xs sm:text-sm text-slate-700 font-arabic leading-relaxed whitespace-pre-line">
                  {language === 'darija'
                    ? introSlide?.contentDarija || module.descriptionDarija
                    : language === 'ar'
                    ? introSlide?.contentArabic || module.descriptionArabic
                    : introSlide?.contentEnglish || module.descriptionEnglish}
                </p>
              </div>
            </div>
          )}

          {/* ================= STEP 2: INTERACTIVE LAB & VERB SPLITTER ================= */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* If Separable Verbs: Show Interactive Launch Splitter */}
              {module.id.includes('a2') || module.titleGerman.toLowerCase().includes('trennbar') ? (
                <div className="bg-white p-4 sm:p-5 rounded-2xl border-neo shadow-neo-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-bauhaus text-slate-900 uppercase">
                      🚀 The Verb Splitter Cannon (صاروخ الأفعال المنفصلة)
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        sound.playTap();
                        setIsVerbSplit(!isVerbSplit);
                      }}
                      className="btn-neo py-1 px-3 rounded-lg bg-[#FFB800] text-slate-950 font-bold text-xs font-arabic cursor-pointer inline-flex items-center gap-1"
                    >
                      {isVerbSplit ? <RotateCcw className="w-3.5 h-3.5" /> : <Rocket className="w-3.5 h-3.5" />}
                      <span>{isVerbSplit ? 'إعادة التركيب' : 'فجّر الفعل!'}</span>
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 font-arabic">
                    فـ الألمانية، الأفعال المنفصلة (Trennbare Verben) كيطير البريفيكس ديالهم لآخر الجملة!
                  </p>

                  <div className="p-4 bg-[#F6F2EA] rounded-xl border-2 border-slate-900 text-center select-none font-mono text-sm sm:text-base">
                    {!isVerbSplit ? (
                      <div className="flex items-center justify-center gap-1">
                        <span className="px-2 py-1 bg-[#FF3366] text-white rounded-lg font-bold">
                          auf
                        </span>
                        <span className="px-2 py-1 bg-[#2563EB] text-white rounded-lg font-bold">
                          stehen
                        </span>
                        <span className="text-slate-500 text-xs ml-2">(Infinitiv = يستيقظ)</span>
                      </div>
                    ) : (
                      <div className="flex flex-wrap items-center justify-center gap-2 animate-in zoom-in-95 duration-200">
                        <span className="font-bold text-slate-900">Ich</span>
                        <span className="px-2 py-1 bg-[#2563EB] text-white rounded-lg font-bold">
                          stehe
                        </span>
                        <span className="text-slate-700 font-semibold">um 7:00 Uhr</span>
                        <span className="px-2.5 py-1 bg-[#FF3366] text-white rounded-lg font-black animate-bounce shadow-neo-sm">
                          AUF! 🚀
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center">
                    <AudioPlayButton text={isVerbSplit ? 'Ich stehe um 7 Uhr auf' : 'aufstehen'} />
                  </div>
                </div>
              ) : null}

              {/* Interactive Examples List */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border-neo shadow-neo-sm space-y-3">
                <span className="text-xs font-bold font-bauhaus text-slate-900 uppercase block">
                  🔊 German Audio & Gender Visualizer
                </span>

                <div className="space-y-2.5">
                  {/* Alphabet or Vocab Examples */}
                  {(grammarSlide?.alphabetData?.slice(0, 4) || [
                    {
                      letter: 'W',
                      natoGerman: 'Wilhelm',
                      germanExample: 'Wasser',
                      phonetic: 'Wasser [ˈvasɐ]',
                      note: 'كتنطق V بحال Volkswagen',
                    },
                    {
                      letter: 'J',
                      natoGerman: 'Julius',
                      germanExample: 'Ja',
                      phonetic: 'Ja [ja:]',
                      note: 'كتنطق ياء! Ja = نعم',
                    },
                    {
                      letter: 'Z',
                      natoGerman: 'Zacharias',
                      germanExample: 'Zug',
                      phonetic: 'Zug [tsu:k]',
                      note: 'كتنطق تس بحال القطار',
                    },
                  ]).map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#F6F2EA] rounded-xl border-2 border-slate-900/15 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#FFB800] border-neo-2 text-slate-950 flex items-center justify-center font-black font-mono text-sm shrink-0">
                          {item.letter || idx + 1}
                        </div>
                        <div>
                          <bdi dir="ltr" className="font-bold text-slate-950 font-mono text-sm block">
                            {item.germanExample || item.letter}
                          </bdi>
                          <span className="text-xs text-slate-600 font-arabic">
                            {language === 'darija'
                              ? item.darijaNote || item.note
                              : language === 'ar'
                              ? item.arabicNote || item.note
                              : item.englishNote || item.phonetic}
                          </span>
                        </div>
                      </div>
                      <AudioPlayButton text={item.germanExample || item.letter} size="sm" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 3: TRAP ALERT ================= */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-[#FFB800] p-5 rounded-2xl border-neo shadow-neo text-slate-950 space-y-3">
                <div className="flex items-center gap-2 font-black font-bauhaus text-sm uppercase">
                  <AlertTriangle className="w-5 h-5 text-[#FF3366]" />
                  <span>Achtung! الفخ الكلاسيكي للمغاربة</span>
                </div>

                <div className="flex items-start gap-4 bg-white p-4 rounded-xl border-2 border-slate-950">
                  <UmlautMonster reaction="shocked" size={60} />
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm font-arabic text-slate-950">
                      رد بالك من المقارنة الحرفية مع الدارجة أو الفرنسية!
                    </h3>
                    <p className="text-xs text-slate-700 font-arabic leading-relaxed">
                      {module.slides[2]?.highlightedRule
                        ? getActiveText(module.slides[2]?.highlightedRule)
                        : language === 'darija'
                        ? 'فـ الألمانية، الشمس مؤنثة (die Sonne) والقمر مذكر (der Mond)! وكلمة البنت (das Mädchen) راها محايد حيت كتسالي بـ -chen. ما ترجمش حرفياً من الدارجة!'
                        : language === 'ar'
                        ? 'في الألمانية الشمس مؤنثة (die Sonne) والقمر مذكر (der Mond)، وكلمة الفتاة محايد (das Mädchen) لأنها تنتهي بـ -chen!'
                        : 'In German, the sun is feminine (die Sonne) and the moon is masculine (der Mond). "Mädchen" is neuter (das) because of the diminutive -chen ending!'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 4: INTERACTIVE QUIZ ================= */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-white p-5 rounded-2xl border-neo shadow-neo-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-500 uppercase">
                    Challenge Question
                  </span>
                  <UmlautMonster
                    reaction={!isQuizSubmitted ? 'neutral' : isCorrect ? 'happy' : 'shocked'}
                    size={48}
                  />
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-950 font-arabic">
                    {language === 'darija'
                      ? quizSlide?.quiz?.questionDarija || 'كيفاش كيتنطق حرف W فـ الألمانية؟'
                      : language === 'ar'
                      ? quizSlide?.quiz?.questionArabic || 'كيف ينطق حرف W في الألمانية؟'
                      : quizSlide?.quiz?.questionEnglish || 'How is the letter W pronounced in German?'}
                  </h3>
                  {quizSlide?.quiz?.questionGerman && (
                    <bdi dir="ltr" className="text-xs font-mono text-slate-600 block">
                      {quizSlide.quiz.questionGerman}
                    </bdi>
                  )}
                </div>

                {/* Options List */}
                <div className="space-y-2">
                  {(
                    quizSlide?.quiz?.options || [
                      { id: 'opt1', label: 'بحال حرف V (ڤـ)', isCorrect: true },
                      { id: 'opt2', label: 'بحال الواو فـ الإنجليزية (W)', isCorrect: false },
                      { id: 'opt3', label: 'بحال الخاء (Kh)', isCorrect: false },
                    ]
                  ).map((opt) => {
                    const isSelected = selectedQuizAnswer === opt.id;
                    let btnColor = 'bg-[#F6F2EA] hover:bg-slate-100 text-slate-900';

                    if (isQuizSubmitted) {
                      if (opt.isCorrect) {
                        btnColor = 'bg-[#00D68F] text-slate-950 border-[#00D68F] font-black';
                      } else if (isSelected && !opt.isCorrect) {
                        btnColor = 'bg-[#FF3366] text-white border-[#FF3366] line-through';
                      }
                    }

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        disabled={isQuizSubmitted}
                        onClick={() => handleSelectQuiz(opt.id, opt.isCorrect)}
                        className={`w-full p-3.5 rounded-xl border-neo-2 text-left rtl:text-right font-bold text-xs sm:text-sm font-arabic transition-all flex items-center justify-between cursor-pointer ${btnColor}`}
                      >
                        <span>{opt.label}</span>
                        {isQuizSubmitted && opt.isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-slate-950" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback message */}
                {isQuizSubmitted && (
                  <div
                    className={`p-3 rounded-xl border-2 font-arabic text-xs leading-relaxed animate-in fade-in ${
                      isCorrect
                        ? 'bg-[#00D68F]/20 border-[#00D68F] text-slate-950'
                        : 'bg-[#FF3366]/20 border-[#FF3366] text-slate-950'
                    }`}
                  >
                    {isCorrect
                      ? 'تبارك الله عليك! جواب صحيح، ربحتي نقاط XP!'
                      : 'قريبة! تذكر أن حرف W فـ الألمانية كيتنطق ديما V بحال Volkswagen.'}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation Buttons */}
        <div className="p-4 bg-white border-t-2.5 border-slate-900 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="btn-neo py-2.5 px-4 rounded-xl bg-white text-slate-950 font-bold text-xs font-arabic cursor-pointer disabled:opacity-40"
          >
            السابق
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="btn-neo py-2.5 px-6 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold text-xs sm:text-sm font-arabic inline-flex items-center gap-2 cursor-pointer"
          >
            <span>{currentStep === 3 ? 'إنهاء الدرس وربح XP 🏆' : 'التالي'}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};
