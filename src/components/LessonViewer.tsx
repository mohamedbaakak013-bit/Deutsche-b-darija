import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { LessonModule, Language, LessonSlide } from '../types.ts';
import { AudioPlayButton } from './AudioPlayButton.tsx';
import { NounGenderBadge } from './NounGenderBadge.tsx';
import { VerbEndingHighlighter } from './VerbEndingHighlighter.tsx';

interface LessonViewerProps {
  module: LessonModule;
  language: Language;
  onClose: () => void;
  onComplete: (moduleId: string, xp: number) => void;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({
  module,
  language,
  onClose,
  onComplete,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);

  const isRtl = language === 'darija' || language === 'ar';
  const slide: LessonSlide = module.slides[currentSlideIndex];
  const isLastSlide = currentSlideIndex === module.slides.length - 1;

  const handleNext = () => {
    if (currentSlideIndex < module.slides.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
      setSelectedQuizOption(null);
      setIsQuizSubmitted(false);
    } else {
      triggerFinish();
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
      setSelectedQuizOption(null);
      setIsQuizSubmitted(false);
    }
  };

  const triggerFinish = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    onComplete(module.id, module.xpReward);
  };

  const getSlideTitle = () => {
    if (language === 'darija') return slide.titleDarija;
    if (language === 'ar') return slide.titleArabic;
    return slide.titleEnglish;
  };

  const getSlideContent = () => {
    if (language === 'darija') return slide.contentDarija;
    if (language === 'ar') return slide.contentArabic;
    return slide.contentEnglish;
  };

  const getStoryContextText = () => {
    if (!slide.storyContext) return '';
    if (language === 'darija') return slide.storyContext.darija;
    if (language === 'ar') return slide.storyContext.ar;
    return slide.storyContext.en;
  };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between gap-4 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-black font-mono shadow-xs">
              {module.moduleNumber}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 font-mono">
                  {module.worldId} • Modul {module.moduleNumber}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white leading-tight font-arabic mt-0.5">
                <bdi dir="ltr" className="font-mono">{module.titleGerman}</bdi>{' '}
                <span className="text-slate-300 font-medium text-sm sm:text-base">
                  —{' '}
                  {language === 'darija'
                    ? module.titleDarija
                    : language === 'ar'
                    ? module.titleArabic
                    : module.titleEnglish}
                </span>
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors shadow-xs"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-1.5">
          <div
            className="bg-emerald-500 h-1.5 transition-all duration-300"
            style={{
              width: `${((currentSlideIndex + 1) / module.slides.length) * 100}%`,
            }}
          />
        </div>

        {/* Main Content Area */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {/* Slide Title */}
          <div className="flex items-center justify-between gap-3 border-b border-slate-800/80 pb-3 flex-wrap">
            <h3 className="text-lg sm:text-xl font-bold text-white font-arabic">
              {getSlideTitle()}
            </h3>
            <span className="text-xs font-mono text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-xl border border-slate-700/60">
              Slide {currentSlideIndex + 1} / {module.slides.length}
            </span>
          </div>

          {/* Story Context Callout (Bouchaib / Jens) */}
          {slide.storyContext && (
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/25 border border-amber-500/30 flex items-start gap-3.5 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center text-2xl shrink-0 border border-amber-500/30">
                {slide.storyContext.speaker === 'Bouchaib' ? '🇲🇦' : '🇩🇪'}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase text-amber-400 font-arabic">
                    {slide.storyContext.speaker === 'Bouchaib' ? 'بوشعيب (Bouchaib)' : 'جينس (Jens)'}
                  </span>
                  <span className="text-[10px] text-amber-400/80 font-mono px-2 py-0.5 rounded-full bg-amber-900/30 border border-amber-700/30">
                    Story Vignette
                  </span>
                </div>
                <p className="text-sm sm:text-base text-amber-100/90 mt-1.5 leading-[1.8] font-arabic">
                  {getStoryContextText()}
                </p>
              </div>
            </div>
          )}

          {/* Main Slide Prose with High Readability */}
          {slide.contentDarija && (
            <div className="text-slate-200 text-sm sm:text-base leading-[1.9] font-arabic whitespace-pre-line space-y-3 bg-slate-950/40 p-5 rounded-2xl border border-slate-800/70">
              {getSlideContent()}
            </div>
          )}

          {/* Alphabet Spelling Table */}
          {slide.alphabetData && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {slide.alphabetData.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3 hover:border-slate-700 transition-colors shadow-xs"
                >
                  <div className="flex items-center gap-3.5">
                    <bdi
                      dir="ltr"
                      className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 flex items-center justify-center font-black text-2xl font-mono shrink-0"
                    >
                      {item.letter}
                    </bdi>
                    <div>
                      <div className="flex items-center gap-2">
                        <bdi dir="ltr" className="text-xs font-mono font-bold text-amber-400">
                          {item.phonetic}
                        </bdi>
                        <bdi dir="ltr" className="text-xs text-slate-300 font-mono">
                          ({item.germanExample})
                        </bdi>
                      </div>
                      <bdi dir="ltr" className="text-xs text-emerald-400 font-bold block mt-0.5">
                        "{item.letter} wie {item.natoGerman}"
                      </bdi>
                      <p className="text-xs text-slate-300 font-arabic mt-1 font-medium leading-normal">
                        {language === 'darija'
                          ? item.darijaNote
                          : language === 'ar'
                          ? item.arabicNote
                          : item.englishNote}
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <AudioPlayButton text={`${item.letter} wie ${item.natoGerman}`} showSyllables={false} size="sm" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Highlighted Rule Banner */}
          {slide.highlightedRule && (
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-sm font-arabic leading-[1.8] flex items-center gap-3.5 shadow-sm">
              <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                {language === 'darija'
                  ? slide.highlightedRule.darija
                  : language === 'ar'
                  ? slide.highlightedRule.ar
                  : slide.highlightedRule.en}
              </span>
            </div>
          )}

          {/* Vocabulary List */}
          {slide.vocabList && slide.vocabList.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                Schlüsselwörter (الكلمات المفتاحية)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {slide.vocabList.map((vocab) => (
                  <div
                    key={vocab.id}
                    className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex flex-col gap-2.5 shadow-xs"
                  >
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      {vocab.article ? (
                        <NounGenderBadge
                          article={vocab.article as any}
                          noun={vocab.german.replace(/^(der|die|das)\s+/i, '')}
                          gender={vocab.gender}
                          plural={vocab.plural}
                          meaning={language === 'darija' ? vocab.darija : language === 'ar' ? vocab.arabic : vocab.english}
                          size="sm"
                        />
                      ) : (
                        <div>
                          <bdi dir="ltr" className="font-bold text-amber-400 font-mono text-base">
                            {vocab.german}
                          </bdi>
                          <span className="text-xs text-slate-300 font-arabic font-medium mr-2 ml-2">
                            {language === 'darija' ? vocab.darija : language === 'ar' ? vocab.arabic : vocab.english}
                          </span>
                        </div>
                      )}
                    </div>
                    <AudioPlayButton
                      text={vocab.german}
                      syllables={vocab.syllables}
                      phoneticFranco={vocab.phoneticFranco}
                      phoneticArabic={vocab.phoneticArabic}
                      size="sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Verb Conjugation Table */}
          {slide.conjugationData && (
            <div className="pt-2">
              <VerbEndingHighlighter data={slide.conjugationData} language={language} />
            </div>
          )}

          {/* Dialogue Lines */}
          {slide.dialogueLines && slide.dialogueLines.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                Dialog (المحادثة الصوتية)
              </h4>
              <div className="space-y-3">
                {slide.dialogueLines.map((line, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-start justify-between gap-3 shadow-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black uppercase text-amber-400 font-arabic">
                          {line.speaker}:
                        </span>
                        <bdi dir="ltr" className="text-sm sm:text-base font-bold text-white font-mono">
                          {line.german}
                        </bdi>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 font-arabic mt-1.5 leading-relaxed font-medium">
                        {language === 'darija' ? line.darija : language === 'ar' ? line.ar : line.en}
                      </p>
                    </div>
                    <div className="shrink-0">
                      <AudioPlayButton text={line.german} showSyllables={false} size="sm" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quiz Section */}
          {slide.quiz && (
            <div className="mt-4 p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-wider font-mono">
                  Test Your Knowledge
                </span>
                <span className="text-xs text-amber-400 font-bold font-arabic">+30 XP</span>
              </div>

              <div className="space-y-1.5">
                {slide.quiz.questionGerman && (
                  <bdi dir="ltr" className="text-base sm:text-lg font-bold text-white font-mono block">
                    {slide.quiz.questionGerman}
                  </bdi>
                )}
                <p className="text-sm sm:text-base text-slate-200 font-arabic font-medium leading-relaxed">
                  {language === 'darija'
                    ? slide.quiz.questionDarija
                    : language === 'ar'
                    ? slide.quiz.questionArabic
                    : slide.quiz.questionEnglish}
                </p>
              </div>

              <div className="space-y-2.5">
                {slide.quiz.options.map((opt) => {
                  const isSelected = selectedQuizOption === opt.id;
                  let btnColor = 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-200';
                  if (isQuizSubmitted) {
                    if (opt.isCorrect) {
                      btnColor = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold';
                    } else if (isSelected && !opt.isCorrect) {
                      btnColor = 'bg-red-950/60 border-red-500 text-red-200';
                    }
                  } else if (isSelected) {
                    btnColor = 'bg-emerald-950/40 border-emerald-500 text-emerald-300';
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={isQuizSubmitted}
                      onClick={() => setSelectedQuizOption(opt.id)}
                      className={`w-full p-4 rounded-2xl border text-left rtl:text-right flex items-center justify-between text-sm sm:text-base transition-all font-arabic ${btnColor}`}
                    >
                      <span>{opt.label}</span>
                      {isQuizSubmitted && opt.isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                      {isQuizSubmitted && isSelected && !opt.isCorrect && (
                        <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {!isQuizSubmitted ? (
                <button
                  type="button"
                  disabled={!selectedQuizOption}
                  onClick={() => {
                    setIsQuizSubmitted(true);
                    const chosen = slide.quiz?.options.find((o) => o.id === selectedQuizOption);
                    if (chosen?.isCorrect) {
                      confetti({ particleCount: 40, spread: 50 });
                    }
                  }}
                  className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm sm:text-base transition-all disabled:opacity-40 font-arabic btn-tactile-emerald"
                >
                  تأكيد الإجابة
                </button>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 font-arabic leading-[1.8]">
                  {language === 'darija'
                    ? slide.quiz.explanationDarija
                    : language === 'ar'
                    ? slide.quiz.explanationArabic
                    : slide.quiz.explanationEnglish}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Navigation Bar */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentSlideIndex === 0}
            className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors disabled:opacity-40 font-arabic"
          >
            <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
            <span>السابق</span>
          </button>

          <div className="flex items-center gap-1.5">
            {module.slides.map((_, i) => (
              <span
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === currentSlideIndex
                    ? 'w-7 bg-emerald-500'
                    : i < currentSlideIndex
                    ? 'w-2 bg-emerald-800'
                    : 'w-2 bg-slate-700'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-black flex items-center gap-2 shadow-lg shadow-emerald-950/50 transition-all font-arabic btn-tactile-emerald"
          >
            <span>{isLastSlide ? 'إنهاء الدرس (+XP)' : 'التالي'}</span>
            <ChevronRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};
