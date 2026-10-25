import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Gamepad2,
  Trophy,
  Zap,
  Puzzle,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { Language } from '../types.ts';
import {
  DER_DIE_DAS_CARDS,
  LEGO_PUZZLES,
  CULTURAL_PRAISE_DARIJA,
  CULTURAL_MISTAKE_DARIJA,
  DerDieDasCard,
  LegoPuzzle,
} from '../data/miniGamesData.ts';
import { AudioPlayButton } from './AudioPlayButton.tsx';
import { playGermanSpeech } from '../utils/speech.ts';

interface MiniGamesTabProps {
  language: Language;
  onAddXp: (amount: number) => void;
}

export const MiniGamesTab: React.FC<MiniGamesTabProps> = ({ language, onAddXp }) => {
  const [activeGame, setActiveGame] = useState<'slap' | 'lego'>('slap');

  // ==========================================
  // GAME 1: DER-DIE-DAS SLAP STATE
  // ==========================================
  const [cardIndex, setCardIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [comboStreak, setComboStreak] = useState(0);
  const [slapFeedback, setSlapFeedback] = useState<{
    isCorrect: boolean;
    text: string;
    card: DerDieDasCard;
  } | null>(null);

  const isRtl = language === 'darija' || language === 'ar';
  const currentCard = DER_DIE_DAS_CARDS[cardIndex % DER_DIE_DAS_CARDS.length];

  const handleArticleSlap = (chosenArticle: 'der' | 'die' | 'das') => {
    const isCorrect = chosenArticle === currentCard.correctArticle;

    if (isCorrect) {
      const newStreak = comboStreak + 1;
      setComboStreak(newStreak);
      const points = 10 * Math.min(newStreak, 4);
      setScore((prev) => prev + points);
      onAddXp(points);

      const randomPraise =
        CULTURAL_PRAISE_DARIJA[Math.floor(Math.random() * CULTURAL_PRAISE_DARIJA.length)];
      setSlapFeedback({
        isCorrect: true,
        text: randomPraise,
        card: currentCard,
      });

      if (newStreak % 5 === 0) {
        confetti({ particleCount: 50, spread: 60 });
      }

      playGermanSpeech(`${chosenArticle} ${currentCard.noun}`, 1.0);
    } else {
      setComboStreak(0);
      const randomMistake =
        CULTURAL_MISTAKE_DARIJA[Math.floor(Math.random() * CULTURAL_MISTAKE_DARIJA.length)];
      setSlapFeedback({
        isCorrect: false,
        text: `${randomMistake} الجواب الصحيح هو: ${currentCard.correctArticle} ${currentCard.noun}!`,
        card: currentCard,
      });
    }
  };

  const handleNextCard = () => {
    setSlapFeedback(null);
    setCardIndex((prev) => prev + 1);
  };

  // ==========================================
  // GAME 2: SENTENCE LEGO BUILDER STATE
  // ==========================================
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const currentPuzzle: LegoPuzzle = LEGO_PUZZLES[puzzleIndex % LEGO_PUZZLES.length];
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [legoFeedback, setLegoFeedback] = useState<{
    isSuccess?: boolean;
    message?: string;
  } | null>(null);

  const handleWordClick = (word: string) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter((w) => w !== word));
    } else {
      setSelectedWords([...selectedWords, word]);
    }
    setLegoFeedback(null);
  };

  const handleCheckLego = () => {
    const isCorrect =
      selectedWords.length === currentPuzzle.correctSequence.length &&
      selectedWords.every((w, i) => w === currentPuzzle.correctSequence[i]);

    if (isCorrect) {
      setLegoFeedback({
        isSuccess: true,
        message:
          language === 'darija'
            ? 'تبارك الله عليك يا بوشعيب! الترتيب الألماني صحيح 100% والفعل فـ بلاصتو! +30 XP'
            : language === 'ar'
            ? 'ممتاز جداً! ترتيب الكلمات وبنية الجملة الألمانية صحيحة تماماً. +30 نقطة خبرة'
            : 'Flawless syntax! Word order and verb placement are 100% accurate. +30 XP',
      });
      confetti({ particleCount: 50, spread: 50 });
      onAddXp(30);
      playGermanSpeech(selectedWords.join(' '), 1.0);
    } else {
      setLegoFeedback({
        isSuccess: false,
        message:
          language === 'darija'
            ? `ترتيب ماشي هو هذاك. ${currentPuzzle.grammarNoteDarija}`
            : language === 'ar'
            ? `الترتيب غير صحيح. ${currentPuzzle.grammarNoteArabic}`
            : `Incorrect sequence. ${currentPuzzle.grammarNoteEnglish}`,
      });
    }
  };

  const handleNextPuzzle = () => {
    setSelectedWords([]);
    setLegoFeedback(null);
    setPuzzleIndex((prev) => prev + 1);
  };

  return (
    <div className="space-y-6" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header & Mode Switcher */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4 flex-wrap shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold font-mono mb-2">
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Mini-Games Arena (الألعاب والتحديات السريعة)</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white font-arabic">
            ألعاب ترسيخ أدوات التعريف (Der/Die/Das) وتركيب الجمل
          </h2>
        </div>

        {/* Game Mode Switcher */}
        <div className="flex items-center bg-slate-950 p-1.5 rounded-2xl border border-slate-800 shadow-inner">
          <button
            type="button"
            onClick={() => setActiveGame('slap')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 font-arabic ${
              activeGame === 'slap'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Der-Die-Das Slap</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveGame('lego')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 font-arabic ${
              activeGame === 'lego'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Puzzle className="w-3.5 h-3.5" />
            <span>Sentence Lego Builder</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* GAME 1: DER-DIE-DAS SLAP */}
      {/* ======================================================== */}
      {activeGame === 'slap' && (
        <div className="max-w-2xl mx-auto space-y-5">
          {/* Score & Combo HUD */}
          <div className="p-4 sm:p-5 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2.5">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span className="text-xs text-slate-400 font-mono font-bold">Score:</span>
              <span className="text-xl font-black text-white font-mono tabular-nums">{score}</span>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="text-xs text-slate-400 font-mono font-bold">Streak Combo:</span>
              <span
                className={`text-xl font-black font-mono tabular-nums ${
                  comboStreak > 2 ? 'text-amber-400 animate-pulse' : 'text-slate-200'
                }`}
              >
                🔥 {comboStreak}x
              </span>
            </div>
          </div>

          {/* Flashcard Box */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-5 shadow-2xl relative overflow-hidden">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">
              Card {cardIndex + 1} / {DER_DIE_DAS_CARDS.length}
            </span>

            {/* Giant German Noun with LTR isolation */}
            <div className="py-4">
              <bdi dir="ltr" className="text-4xl sm:text-6xl font-black text-white tracking-tight font-mono block">
                {currentCard.noun}
              </bdi>
              <p className="text-sm sm:text-base text-slate-300 font-arabic mt-3 font-medium leading-relaxed">
                {language === 'darija'
                  ? currentCard.meaningDarija
                  : language === 'ar'
                  ? currentCard.meaningArabic
                  : currentCard.meaningEnglish}
              </p>
            </div>

            {/* Phonetic & Audio */}
            <div className="flex items-center justify-center gap-3">
              <AudioPlayButton
                text={currentCard.noun}
                syllables={currentCard.syllables}
                phoneticFranco={currentCard.phoneticFranco}
                size="md"
              />
            </div>

            {/* Trap Hint */}
            {currentCard.trapHintDarija && (
              <div className="p-4 bg-amber-950/25 border border-amber-500/30 rounded-2xl text-xs sm:text-sm text-amber-200 font-arabic leading-relaxed font-medium">
                💡 {currentCard.trapHintDarija}
              </div>
            )}

            {/* Slap Feedback Message */}
            {slapFeedback && (
              <div
                className={`p-4 sm:p-5 rounded-2xl border text-sm sm:text-base font-arabic leading-[1.8] font-medium ${
                  slapFeedback.isCorrect
                    ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                    : 'bg-red-950/40 border-red-500 text-red-200'
                }`}
              >
                {slapFeedback.text}
              </div>
            )}

            {/* 3 Tactile Slap Buttons: DER (Blue), DIE (Pink), DAS (Green) */}
            {!slapFeedback ? (
              <div className="grid grid-cols-3 gap-3.5 pt-4">
                <button
                  type="button"
                  onClick={() => handleArticleSlap('der')}
                  className="py-5 px-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xl shadow-lg active:scale-95 transition-all font-mono btn-tactile-blue"
                >
                  🔵 der
                  <span className="block text-xs font-arabic font-normal mt-1 opacity-90">
                    مذكر
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleArticleSlap('die')}
                  className="py-5 px-3 rounded-2xl bg-pink-600 hover:bg-pink-500 text-white font-black text-xl shadow-lg active:scale-95 transition-all font-mono btn-tactile-pink"
                >
                  🔴 die
                  <span className="block text-xs font-arabic font-normal mt-1 opacity-90">
                    مؤنث
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleArticleSlap('das')}
                  className="py-5 px-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xl shadow-lg active:scale-95 transition-all font-mono btn-tactile-emerald"
                >
                  🟢 das
                  <span className="block text-xs font-arabic font-normal mt-1 opacity-90">
                    محايد
                  </span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleNextCard}
                className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-base shadow-lg transition-all font-arabic btn-tactile-emerald"
              >
                الكلمة الموالية ➔
              </button>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* GAME 2: SENTENCE LEGO BUILDER */}
      {/* ======================================================== */}
      {activeGame === 'lego' && (
        <div className="max-w-2xl mx-auto space-y-5">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
            <div>
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block">
                Lego Puzzle {puzzleIndex + 1} / {LEGO_PUZZLES.length}
              </span>
              <h4 className="text-lg sm:text-xl font-bold text-white font-arabic mt-1">
                رتب الكلمات لبناء جملة ألمانية صحيحة:
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 font-arabic mt-1.5 leading-relaxed font-medium">
                المعنى:{' '}
                <strong className="text-emerald-400">
                  {language === 'darija'
                    ? currentPuzzle.meaningDarija
                    : language === 'ar'
                    ? currentPuzzle.meaningArabic
                    : currentPuzzle.meaningEnglish}
                </strong>
              </p>
            </div>

            {/* Sentence Drop Zone (Selected Blocks) */}
            <div className="min-h-24 p-5 rounded-2xl bg-slate-950 border-2 border-dashed border-slate-800 flex items-center flex-wrap gap-2.5">
              {selectedWords.length === 0 ? (
                <span className="text-xs text-slate-400 font-arabic">
                  كليكي على الكلمات لتحت بالترتيب باش تبني الجملة...
                </span>
              ) : (
                selectedWords.map((word, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleWordClick(word)}
                    className="px-4 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm font-mono shadow-md hover:bg-red-500 hover:text-white transition-colors"
                    title="Click to remove from sentence"
                  >
                    <bdi dir="ltr">{word}</bdi>
                  </button>
                ))
              )}
            </div>

            {/* Word Bank Blocks */}
            <div className="space-y-2.5">
              <span className="text-xs text-slate-400 font-mono font-bold uppercase tracking-wider">
                Word Bank (بنك الكلمات):
              </span>
              <div className="flex items-center flex-wrap gap-2.5">
                {currentPuzzle.scrambledWords.map((word, idx) => {
                  const isUsed = selectedWords.includes(word);
                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isUsed}
                      onClick={() => handleWordClick(word)}
                      className={`px-4 py-3 rounded-2xl border text-sm font-bold font-mono transition-all ${
                        isUsed
                          ? 'bg-slate-900 border-slate-800 text-slate-600 opacity-40 cursor-not-allowed'
                          : 'bg-slate-950 border-slate-800 hover:border-emerald-500 text-white shadow-sm active:scale-95'
                      }`}
                    >
                      <bdi dir="ltr">{word}</bdi>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Feedback Message */}
            {legoFeedback && (
              <div
                className={`p-4 sm:p-5 rounded-2xl border text-sm font-arabic leading-[1.8] flex items-start gap-3.5 shadow-sm ${
                  legoFeedback.isSuccess
                    ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                    : 'bg-red-950/40 border-red-500 text-red-200'
                }`}
              >
                {legoFeedback.isSuccess ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                )}
                <span>{legoFeedback.message}</span>
              </div>
            )}

            {/* Actions: Verify or Next */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleCheckLego}
                disabled={selectedWords.length === 0}
                className="flex-1 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm sm:text-base shadow-md transition-all disabled:opacity-40 font-arabic btn-tactile-emerald"
              >
                تحقق من ترتيب الجملة
              </button>

              {legoFeedback?.isSuccess && (
                <button
                  type="button"
                  onClick={handleNextPuzzle}
                  className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm sm:text-base transition-all font-arabic btn-tactile-blue"
                >
                  الجملة التالية ➔
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
