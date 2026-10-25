import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Zap, Send, Sparkles, CheckCircle2, RotateCcw, Bot, Puzzle } from 'lucide-react';
import { Language } from '../../types.ts';
import {
  DER_DIE_DAS_CARDS,
  LEGO_PUZZLES,
  CULTURAL_PRAISE_DARIJA,
  CULTURAL_MISTAKE_DARIJA,
  DerDieDasCard,
} from '../../data/miniGamesData.ts';
import { AudioPlayButton } from '../AudioPlayButton.tsx';
import { playGermanSpeech } from '../../utils/speech.ts';

interface PracticeTabProps {
  language: Language;
  onAddXp: (amount: number) => void;
}

interface Message {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
}

export const PracticeTab: React.FC<PracticeTabProps> = ({ language, onAddXp }) => {
  const [activeSubTab, setActiveSubTab] = useState<'flashcards' | 'lego' | 'ai'>('flashcards');

  // Flashcards state
  const [cardIndex, setCardIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const currentCard: DerDieDasCard = DER_DIE_DAS_CARDS[cardIndex % DER_DIE_DAS_CARDS.length];

  const handleArticleClick = (article: 'der' | 'die' | 'das') => {
    const isCorrect = article === currentCard.correctArticle;

    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      const points = 10 * Math.min(newStreak, 3);
      setScore((prev) => prev + points);
      onAddXp(points);

      const praise = CULTURAL_PRAISE_DARIJA[Math.floor(Math.random() * CULTURAL_PRAISE_DARIJA.length)];
      setFeedback({
        isCorrect: true,
        text: praise,
      });

      if (newStreak % 5 === 0) {
        confetti({ particleCount: 50, spread: 60 });
      }

      playGermanSpeech(`${article} ${currentCard.noun}`, 1.0);
    } else {
      setStreak(0);
      const mistake = CULTURAL_MISTAKE_DARIJA[Math.floor(Math.random() * CULTURAL_MISTAKE_DARIJA.length)];
      setFeedback({
        isCorrect: false,
        text: `${mistake} الجواب الصحيح هو: ${currentCard.correctArticle} ${currentCard.noun}!`,
      });
    }
  };

  const handleNextCard = () => {
    setFeedback(null);
    setCardIndex((prev) => prev + 1);
  };

  // Lego State
  const [puzzleIdx, setPuzzleIdx] = useState(0);
  const currentPuzzle = LEGO_PUZZLES[puzzleIdx % LEGO_PUZZLES.length];
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [legoFeedback, setLegoFeedback] = useState<{ isSuccess?: boolean; message?: string } | null>(null);

  const handleLegoCheck = () => {
    const isCorrect =
      selectedWords.length === currentPuzzle.correctSequence.length &&
      selectedWords.every((w, i) => w === currentPuzzle.correctSequence[i]);

    if (isCorrect) {
      setLegoFeedback({
        isSuccess: true,
        message: 'تبارك الله عليك! ترتيب الجملة الألمانية صحيح 100%! +30 XP',
      });
      confetti({ particleCount: 40, spread: 50 });
      onAddXp(30);
      playGermanSpeech(selectedWords.join(' '), 1.0);
    } else {
      setLegoFeedback({
        isSuccess: false,
        message: `الترتيب غير صحيح. ${currentPuzzle.grammarNoteDarija}`,
      });
    }
  };

  // AI Chat State
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'tutor',
      text:
        language === 'darija'
          ? 'سلام! أنا أستاذ بوشعيب، عايش فـ برلين هادي 10 سنين. سولني أي سؤال على الألمانية ونجاوبك فـ البلاصة وبكل بساطة!'
          : language === 'ar'
          ? 'مرحباً! أنا أستاذ بوشعيب. اسألني عن أي قاعدة في اللغة الألمانية وسأشرحها لك بكل بساطة ووضوح.'
          : 'Hi! I am Ostaz Bouchaib. Ask me any question about German grammar or words and I will explain it simply!',
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isLoading]);

  const handleSendChat = async () => {
    const q = chatInput.trim();
    if (!q || isLoading) return;

    setChatMessages((prev) => [...prev, { id: Date.now().toString(), sender: 'user', text: q }]);
    setChatInput('');
    setIsLoading(true);

    try {
      const history = chatMessages.slice(-6).map((m) => ({
        role: (m.sender === 'user' ? 'user' : 'model') as 'user' | 'model',
        text: m.text,
      }));

      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: q, history, language }),
      });

      const data = await res.json();
      setChatMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: 'tutor', text: data.reply || 'عذراً، وقع عطب فـ الاتصال.' },
      ]);
    } catch {
      setChatMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: 'tutor', text: 'أستاذ بوشعيب كيعتذر، وقع مشكل فـ السيرفر.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* 3-way Practice Segmented Switch */}
      <div className="flex items-center bg-white p-1 rounded-2xl border border-slate-200/80 shadow-xs">
        <button
          type="button"
          onClick={() => setActiveSubTab('flashcards')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all font-arabic ${
            activeSubTab === 'flashcards'
              ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          🎯 بطاقات Der/Die/Das
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('lego')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all font-arabic ${
            activeSubTab === 'lego'
              ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          🧩 تركيب الجمل
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('ai')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all font-arabic ${
            activeSubTab === 'ai'
              ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          🤖 أستاذ بوشعيب
        </button>
      </div>

      {/* 1. DER-DIE-DAS FLASHCARD */}
      {activeSubTab === 'flashcards' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 space-y-6 text-center shadow-xs">
          {/* Card Meta & Streak */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>Card {cardIndex + 1} / {DER_DIE_DAS_CARDS.length}</span>
            <span className="font-bold text-amber-600">Streak: 🔥 {streak}x</span>
          </div>

          {/* Flashcard Noun */}
          <div className="py-4 space-y-2">
            <bdi dir="ltr" className="text-4xl sm:text-5xl font-black text-slate-900 font-mono block">
              {currentCard.noun}
            </bdi>
            <p className="text-sm text-slate-500 font-arabic">
              {language === 'darija'
                ? currentCard.meaningDarija
                : language === 'ar'
                ? currentCard.meaningArabic
                : currentCard.meaningEnglish}
            </p>
          </div>

          <div className="flex justify-center">
            <AudioPlayButton text={currentCard.noun} size="sm" />
          </div>

          {/* Feedback */}
          {feedback && (
            <div
              className={`p-3.5 rounded-xl text-xs sm:text-sm font-arabic font-medium leading-relaxed ${
                feedback.isCorrect
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                  : 'bg-red-50 border border-red-200 text-red-900'
              }`}
            >
              {feedback.text}
            </div>
          )}

          {/* 3 Big Clean Buttons: der, die, das */}
          {!feedback ? (
            <div className="grid grid-cols-3 gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleArticleClick('der')}
                className="py-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 font-bold text-lg font-mono transition-all active:scale-95"
              >
                der
                <span className="block text-[10px] text-blue-700 font-arabic font-normal mt-0.5">مذكر</span>
              </button>
              <button
                type="button"
                onClick={() => handleArticleClick('die')}
                className="py-4 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-900 border border-pink-200 font-bold text-lg font-mono transition-all active:scale-95"
              >
                die
                <span className="block text-[10px] text-pink-700 font-arabic font-normal mt-0.5">مؤنث</span>
              </button>
              <button
                type="button"
                onClick={() => handleArticleClick('das')}
                className="py-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 font-bold text-lg font-mono transition-all active:scale-95"
              >
                das
                <span className="block text-[10px] text-emerald-700 font-arabic font-normal mt-0.5">محايد</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleNextCard}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-colors font-arabic"
            >
              الكلمة التالية ➔
            </button>
          )}
        </div>
      )}

      {/* 2. LEGO SENTENCE BUILDER */}
      {activeSubTab === 'lego' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 space-y-5 shadow-xs">
          <div>
            <span className="text-xs font-mono font-bold text-slate-400 uppercase">
              Puzzle {puzzleIdx + 1} / {LEGO_PUZZLES.length}
            </span>
            <p className="text-sm font-bold text-slate-800 font-arabic mt-1">
              رتب الكلمات لبناء الجملة:{' '}
              <span className="text-amber-600 font-normal">
                {language === 'darija' ? currentPuzzle.meaningDarija : language === 'ar' ? currentPuzzle.meaningArabic : currentPuzzle.meaningEnglish}
              </span>
            </p>
          </div>

          {/* Drop Slot */}
          <div className="min-h-16 p-3.5 rounded-xl bg-slate-50 border border-dashed border-slate-300 flex items-center flex-wrap gap-2">
            {selectedWords.length === 0 ? (
              <span className="text-xs text-slate-400 font-arabic">اضغط على الكلمات بالترتيب...</span>
            ) : (
              selectedWords.map((word, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedWords(selectedWords.filter((w) => w !== word))}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs font-mono shadow-2xs hover:bg-red-500 hover:text-white transition-colors"
                >
                  <bdi dir="ltr">{word}</bdi>
                </button>
              ))
            )}
          </div>

          {/* Word Bank */}
          <div className="flex items-center flex-wrap gap-2">
            {currentPuzzle.scrambledWords.map((word, i) => {
              const isUsed = selectedWords.includes(word);
              return (
                <button
                  key={i}
                  type="button"
                  disabled={isUsed}
                  onClick={() => setSelectedWords([...selectedWords, word])}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-bold font-mono transition-all ${
                    isUsed
                      ? 'bg-slate-100 border-slate-200 text-slate-400 opacity-40'
                      : 'bg-white border-slate-300 text-slate-800 hover:border-slate-400 shadow-2xs'
                  }`}
                >
                  <bdi dir="ltr">{word}</bdi>
                </button>
              );
            })}
          </div>

          {legoFeedback && (
            <div
              className={`p-3 rounded-xl text-xs font-arabic ${
                legoFeedback.isSuccess ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-red-50 text-red-900 border border-red-200'
              }`}
            >
              {legoFeedback.message}
            </div>
          )}

          <div className="flex gap-2">
            <button
              type="button"
              disabled={selectedWords.length === 0}
              onClick={handleLegoCheck}
              className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs font-arabic disabled:opacity-40 transition-colors"
            >
              تحقق من الترتيب
            </button>
            {legoFeedback?.isSuccess && (
              <button
                type="button"
                onClick={() => {
                  setSelectedWords([]);
                  setLegoFeedback(null);
                  setPuzzleIdx((prev) => prev + 1);
                }}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-arabic transition-colors"
              >
                التالي ➔
              </button>
            )}
          </div>
        </div>
      )}

      {/* 3. NOTION-STYLE AI TUTOR CHAT */}
      {activeSubTab === 'ai' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 space-y-4 shadow-xs">
          {/* Chat Messages */}
          <div className="min-h-[280px] max-h-[380px] overflow-y-auto space-y-3 p-1">
            {chatMessages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <span className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-xs shrink-0">
                    {isUser ? '👤' : '👨‍🏫'}
                  </span>
                  <div
                    className={`p-3 rounded-2xl max-w-[85%] text-xs sm:text-sm leading-relaxed font-arabic ${
                      isUser
                        ? 'bg-slate-900 text-white rounded-tr-xs rtl:rounded-tr-2xl rtl:rounded-tl-xs'
                        : 'bg-slate-50 text-slate-800 border border-slate-200/70 rounded-tl-xs rtl:rounded-tl-2xl rtl:rounded-tr-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}
            {isLoading && (
              <div className="text-xs text-slate-400 font-arabic flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                <span>أستاذ بوشعيب يكتب الرد...</span>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Simple Input Box */}
          <div className="flex items-center gap-2 border-t border-slate-100 pt-3">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendChat();
              }}
              placeholder="اطرح سؤالك على أستاذ بوشعيب..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-400 font-arabic"
            />
            <button
              type="button"
              onClick={handleSendChat}
              disabled={!chatInput.trim() || isLoading}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition-colors disabled:opacity-40 font-arabic"
            >
              <Send className="w-3.5 h-3.5 rtl:rotate-180" />
              <span>إرسال</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
