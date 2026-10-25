import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, Lightbulb, Sparkles } from 'lucide-react';
import { LessonModule, Language } from '../types.ts';
import { AudioPlayButton } from './AudioPlayButton.tsx';
import { NounGenderBadge } from './NounGenderBadge.tsx';
import { VerbEndingHighlighter } from './VerbEndingHighlighter.tsx';

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
  // 4 Steps: 0: Concept Intro, 1: Interactive Examples, 2: Funny Tip, 3: Quiz
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<string | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const isRtl = language === 'darija' || language === 'ar';

  // Gather intro slides
  const introSlide = module.slides[0];
  const grammarSlide = module.slides.find((s) => s.type === 'grammar') || module.slides[1] || introSlide;
  const vocabSlide = module.slides.find((s) => s.vocabList && s.vocabList.length > 0) || module.slides[2];
  const conjugationSlide = module.slides.find((s) => s.conjugationData);
  const quizSlide = module.slides.find((s) => s.quiz) || module.slides[module.slides.length - 1];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Completed lesson
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      onComplete(module.id, module.xpReward);
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const getActiveText = (obj?: { darija: string; ar: string; en: string }) => {
    if (!obj) return '';
    if (language === 'darija') return obj.darija;
    if (language === 'ar') return obj.ar;
    return obj.en;
  };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
    >
      <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-[620px] shadow-2xl flex flex-col max-h-[92vh] overflow-hidden my-auto">
        {/* Top Header with Progress Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1.5 font-mono">
              <span>{module.worldId} • Modul {module.moduleNumber}</span>
              <span>{currentStep + 1} / 4</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${((currentStep + 1) / 4) * 100}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Focused Card Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {/* STEP 1: CONCEPT INTRO */}
          {currentStep === 0 && (
            <div className="space-y-4">
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/60">
                1. الفكرة الأساسية
              </span>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-arabic leading-tight">
                <bdi dir="ltr" className="font-mono">{module.titleGerman}</bdi>
              </h2>

              {introSlide.storyContext && (
                <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/60 flex items-start gap-3">
                  <span className="text-2xl">
                    {introSlide.storyContext.speaker === 'Bouchaib' ? '🇲🇦' : '🇩🇪'}
                  </span>
                  <div>
                    <span className="text-xs font-bold text-amber-900 font-arabic block mb-0.5">
                      {introSlide.storyContext.speaker === 'Bouchaib' ? 'بوشعيب' : 'جينس'}
                    </span>
                    <p className="text-sm text-slate-800 font-arabic leading-relaxed">
                      {getActiveText(introSlide.storyContext)}
                    </p>
                  </div>
                </div>
              )}

              <div className="text-slate-700 text-sm sm:text-base leading-relaxed font-arabic whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                {language === 'darija'
                  ? introSlide.contentDarija
                  : language === 'ar'
                  ? introSlide.contentArabic
                  : introSlide.contentEnglish}
              </div>
            </div>
          )}

          {/* STEP 2: INTERACTIVE EXAMPLES */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60">
                2. أمثلة تفاعلية
              </span>

              <h3 className="text-lg font-bold text-slate-900 font-arabic">
                أمثلة واضحة مع الصوت (🔊 1x / 🐢 0.6x)
              </h3>

              {/* Conjugation if available */}
              {conjugationSlide?.conjugationData ? (
                <VerbEndingHighlighter data={conjugationSlide.conjugationData} language={language} />
              ) : (
                /* Or Vocabulary list */
                <div className="space-y-2.5">
                  {(vocabSlide?.vocabList || introSlide.vocabList || []).slice(0, 4).map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2 flex-wrap">
                        {item.article ? (
                          <NounGenderBadge
                            article={item.article as any}
                            noun={item.german.replace(/^(der|die|das)\s+/i, '')}
                            gender={item.gender}
                            meaning={
                              language === 'darija'
                                ? item.darija
                                : language === 'ar'
                                ? item.arabic
                                : item.english
                            }
                            size="sm"
                          />
                        ) : (
                          <div>
                            <bdi dir="ltr" className="font-bold text-slate-900 font-mono text-sm">
                              {item.german}
                            </bdi>
                            <span className="text-xs text-slate-600 font-arabic mr-2 ml-2">
                              {language === 'darija'
                                ? item.darija
                                : language === 'ar'
                                ? item.arabic
                                : item.english}
                            </span>
                          </div>
                        )}
                      </div>

                      <AudioPlayButton text={item.german} size="sm" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* STEP 3: QUICK FUNNY TIP */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/60">
                3. نصيحة بوشعيب الفكاهية
              </span>

              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3.5">
                <Lightbulb className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <h4 className="text-base font-bold text-amber-950 font-arabic">
                    عنداك تطيح فـ هاد الفخ!
                  </h4>
                  <p className="text-sm text-amber-900 font-arabic leading-relaxed">
                    {grammarSlide.highlightedRule
                      ? getActiveText(grammarSlide.highlightedRule)
                      : 'في الألمانية كل تفصيل مهم: الحروف الصوتية بالأوملاوت (Ä, Ö, Ü) كتغير معنى الكلمة 180 درجة، وما تنساش بلي الفعل ديما كيشد المركز الثاني فـ الجملة الرئيسية!'}
                  </p>
                </div>
              </div>

              {grammarSlide.contentDarija && (
                <div className="text-xs sm:text-sm text-slate-700 font-arabic leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                  {language === 'darija'
                    ? grammarSlide.contentDarija
                    : language === 'ar'
                    ? grammarSlide.contentArabic
                    : grammarSlide.contentEnglish}
                </div>
              )}
            </div>
          )}

          {/* STEP 4: 3-QUESTION QUIZ */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60">
                4. سؤال سريع لتثبيت المعلومة (+XP)
              </span>

              {quizSlide.quiz ? (
                <div className="space-y-4">
                  <div className="space-y-1">
                    {quizSlide.quiz.questionGerman && (
                      <bdi dir="ltr" className="text-base font-bold text-slate-900 font-mono block">
                        {quizSlide.quiz.questionGerman}
                      </bdi>
                    )}
                    <p className="text-sm font-semibold text-slate-800 font-arabic">
                      {language === 'darija'
                        ? quizSlide.quiz.questionDarija
                        : language === 'ar'
                        ? quizSlide.quiz.questionArabic
                        : quizSlide.quiz.questionEnglish}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {quizSlide.quiz.options.map((opt) => {
                      const isSelected = selectedQuizAnswer === opt.id;
                      let btnStyle = 'bg-white border-slate-200 hover:border-slate-300 text-slate-800';
                      if (isQuizSubmitted) {
                        if (opt.isCorrect) {
                          btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                        } else if (isSelected && !opt.isCorrect) {
                          btnStyle = 'bg-red-50 border-red-400 text-red-900';
                        }
                      } else if (isSelected) {
                        btnStyle = 'bg-amber-50 border-amber-500 text-amber-950 font-bold';
                      }

                      return (
                        <button
                          key={opt.id}
                          type="button"
                          disabled={isQuizSubmitted}
                          onClick={() => setSelectedQuizAnswer(opt.id)}
                          className={`w-full p-3.5 rounded-xl border text-left rtl:text-right flex items-center justify-between text-sm transition-all font-arabic ${btnStyle}`}
                        >
                          <span>{opt.label}</span>
                          {isQuizSubmitted && opt.isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                          {isQuizSubmitted && isSelected && !opt.isCorrect && (
                            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {!isQuizSubmitted ? (
                    <button
                      type="button"
                      disabled={!selectedQuizAnswer}
                      onClick={() => {
                        setIsQuizSubmitted(true);
                        const chosen = quizSlide.quiz?.options.find((o) => o.id === selectedQuizAnswer);
                        if (chosen?.isCorrect) {
                          setQuizScore((prev) => prev + 30);
                          confetti({ particleCount: 40, spread: 50 });
                        }
                      }}
                      className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-colors disabled:opacity-40 font-arabic"
                    >
                      تأكيد الإجابة
                    </button>
                  ) : (
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-arabic leading-relaxed">
                      {language === 'darija'
                        ? quizSlide.quiz.explanationDarija
                        : language === 'ar'
                        ? quizSlide.quiz.explanationArabic
                        : quizSlide.quiz.explanationEnglish}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
                  <p className="font-bold text-slate-900 font-arabic">أحسنت! أكملت مراجعة هذا الدرس.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between gap-3 bg-slate-50/50">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 disabled:opacity-30 transition-colors font-arabic"
          >
            {isRtl ? 'السابق' : 'Previous'}
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-sm transition-all font-arabic flex items-center gap-1.5"
          >
            <span>{currentStep === 3 ? 'إنهاء الدرس (+XP)' : 'التالي'}</span>
            {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
