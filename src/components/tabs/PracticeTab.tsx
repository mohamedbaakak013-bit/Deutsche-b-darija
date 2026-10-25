import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Zap,
  Send,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  Bot,
  Flame,
  Volume2,
  Clock,
  SpellCheck,
} from 'lucide-react';
import { Language } from '../../types.ts';
import {
  DER_DIE_DAS_CARDS,
  CULTURAL_PRAISE_DARIJA,
  CULTURAL_MISTAKE_DARIJA,
  DerDieDasCard,
} from '../../data/miniGamesData.ts';
import { AudioPlayButton } from '../AudioPlayButton.tsx';
import { playGermanSpeech } from '../../utils/speech.ts';
import { sound } from '../../utils/soundEngine.ts';
import { OstazBouchaibMascot, UmlautMonster, ZelligeStar } from '../BrandMascot.tsx';

interface PracticeTabProps {
  language: Language;
  onAddXp: (amount: number) => void;
}

interface Message {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
}

// Official German Spelling Alphabet (Buchstabiertafel)
const BUCHSTABIER_TABLE: Record<string, { nato: string; phonetic: string; darija: string }> = {
  A: { nato: 'Anton', phonetic: 'ah [a:]', darija: 'أ بحال أنطون' },
  B: { nato: 'Berta', phonetic: 'be [be:]', darija: 'ب بحال بيرتا' },
  C: { nato: 'Cäsar', phonetic: 'tse [tse:]', darija: 'سيزَار' },
  D: { nato: 'Dora', phonetic: 'de [de:]', darija: 'دورا' },
  E: { nato: 'Emil', phonetic: 'eh [e:]', darija: 'إيميل' },
  F: { nato: 'Friedrich', phonetic: 'ef [ɛf]', darija: 'فريدريش' },
  G: { nato: 'Gustav', phonetic: 'ge [ge:]', darija: 'غوستاف' },
  H: { nato: 'Heinrich', phonetic: 'ha [ha:]', darija: 'هاينريش' },
  I: { nato: 'Ida', phonetic: 'ee [i:]', darija: 'إيدا' },
  J: { nato: 'Julius', phonetic: 'yot [jɔt]', darija: 'يوليوس (ياء)' },
  K: { nato: 'Kaufmann', phonetic: 'ka [ka:]', darija: 'كاوفمان' },
  L: { nato: 'Ludwig', phonetic: 'el [ɛl]', darija: 'لودفيغ' },
  M: { nato: 'Martha', phonetic: 'em [ɛm]', darija: 'مارتا' },
  N: { nato: 'Nordpol', phonetic: 'en [ɛn]', darija: 'نوردبول' },
  O: { nato: 'Otto', phonetic: 'oh [o:]', darija: 'أوتو' },
  P: { nato: 'Paula', phonetic: 'pe [pe:]', darija: 'باولا' },
  Q: { nato: 'Quelle', phonetic: 'ku [ku:]', darija: 'كفيلي' },
  R: { nato: 'Richard', phonetic: 'er [ɛr]', darija: 'ريشارد' },
  S: { nato: 'Samuel', phonetic: 'es [ɛs]', darija: 'صامويل' },
  T: { nato: 'Theodor', phonetic: 'te [te:]', darija: 'تيودور' },
  U: { nato: 'Ulrich', phonetic: 'oo [u:]', darija: 'أولريش' },
  V: { nato: 'Viktor', phonetic: 'fau [faʊ]', darija: 'فيكتور (فاء)' },
  W: { nato: 'Wilhelm', phonetic: 've [ve:]', darija: 'فيلهيلم (ڤاء)' },
  X: { nato: 'Xantippe', phonetic: 'iks [ɪks]', darija: 'إكس' },
  Y: { nato: 'Ypsilon', phonetic: 'üpsilon', darija: 'إبسيلون' },
  Z: { nato: 'Zacharias', phonetic: 'tset [tsɛt]', darija: 'تْسْ بحال تسوخارياس' },
  Ä: { nato: 'Ärger', phonetic: 'ae', darija: 'إيرغر' },
  Ö: { nato: 'Ökonom', phonetic: 'oe', darija: 'أوكونوم' },
  Ü: { nato: 'Übermut', phonetic: 'ue', darija: 'أوبيرموت' },
};

export const PracticeTab: React.FC<PracticeTabProps> = ({ language, onAddXp }) => {
  const [activeSubTab, setActiveSubTab] = useState<'blitz' | 'speller' | 'ai'>('blitz');

  // Game 1: Arcade Blitz State
  const [cardIndex, setCardIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [shake, setShake] = useState(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const currentCard: DerDieDasCard = DER_DIE_DAS_CARDS[cardIndex % DER_DIE_DAS_CARDS.length];

  const handleArticleClick = (article: 'der' | 'die' | 'das') => {
    const isCorrect = article === currentCard.correctArticle;

    if (isCorrect) {
      sound.playSuccess();
      const newCombo = combo + 1;
      setCombo(newCombo);
      const multiplier = Math.min(newCombo, 4);
      const points = 10 * multiplier;
      setScore((prev) => prev + points);
      onAddXp(points);

      const praise =
        CULTURAL_PRAISE_DARIJA[Math.floor(Math.random() * CULTURAL_PRAISE_DARIJA.length)];
      setFeedback({
        isCorrect: true,
        text: `${praise} (${multiplier}x Combo!)`,
      });

      if (newCombo % 3 === 0) {
        try {
          confetti({ particleCount: 40, spread: 60 });
        } catch {}
      }

      playGermanSpeech(`${article} ${currentCard.noun}`, 1.0);
    } else {
      sound.playMistake();
      setCombo(0);
      setShake(true);
      setTimeout(() => setShake(false), 400);

      const mistake =
        CULTURAL_MISTAKE_DARIJA[Math.floor(Math.random() * CULTURAL_MISTAKE_DARIJA.length)];
      setFeedback({
        isCorrect: false,
        text: `${mistake} الجواب الصحيح: ${currentCard.correctArticle.toUpperCase()} ${
          currentCard.noun
        }!`,
      });
    }
  };

  const handleNextCard = () => {
    sound.playTap();
    setFeedback(null);
    setCardIndex((prev) => prev + 1);
  };

  // Game 2: Buchstabieren Name Speller
  const [spellerInput, setSpellerInput] = useState('MOHAMED');

  const getSpelledLetters = () => {
    const clean = spellerInput.toUpperCase().replace(/[^A-ZÄÖÜ]/g, '');
    return clean.split('').map((char) => ({
      letter: char,
      info: BUCHSTABIER_TABLE[char] || {
        nato: char,
        phonetic: char,
        darija: char,
      },
    }));
  };

  const handleSpeakSpelling = () => {
    sound.playTap();
    const letters = getSpelledLetters();
    const speechText = letters.map((l) => `${l.letter} wie ${l.info.nato}`).join(', ');
    playGermanSpeech(speechText, 0.9);
  };

  // Game 3: AI Tutor State
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'tutor',
      text: 'أهلاً بك أ سيدي! أنا أستاذ بوشعيب، سولني أي سؤال فـ الألمانية من A1 حتى B2، ونشرحها ليك بالدارجة والأمثلة الحية بلا فلسفة زايدة!',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputVal.trim();
    if (!textToSend || isTyping) return;

    sound.playTap();
    const userMsg: Message = { id: String(Date.now()), sender: 'user', text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    if (!customPrompt) setInputVal('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/gemini/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: textToSend,
          language,
        }),
      });

      if (!response.ok) throw new Error('API failed');
      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'tutor',
          text: data.reply || 'واخا أ سيدي، الألمانية راها ساهلة غير ركز معايا مزيان!',
        },
      ]);
      sound.playSuccess();
    } catch {
      // Fallback response with cultural wisdom
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'tutor',
          text: 'يا بوشعيب، هاد القاعدة بحال الطاجين! الأفعال فـ الألمانية كيجيو ديما فـ المرتبة الثانية (Position 2)، إلا يلا دخلات عليهم شي أداة ربط بحال weil ولا dass اللي كتدفع الفعل لآخر الجملة!',
        },
      ]);
      sound.playSuccess();
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* 3-Game Mode Selector Switcher */}
      <div className="flex items-center bg-white p-1.5 rounded-2xl border-neo shadow-neo gap-1">
        <button
          type="button"
          onClick={() => {
            sound.playTap();
            setActiveSubTab('blitz');
          }}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-black font-arabic transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeSubTab === 'blitz'
              ? 'bg-[#FFB800] text-slate-950 shadow-xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Zap className="w-4 h-4 fill-slate-950" />
          <span>Der/Die/Das Arcade Blitz</span>
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playTap();
            setActiveSubTab('speller');
          }}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-black font-arabic transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeSubTab === 'speller'
              ? 'bg-[#2563EB] text-white shadow-xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <SpellCheck className="w-4 h-4" />
          <span>التهجئة الرسمية (Buchstabieren)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playTap();
            setActiveSubTab('ai');
          }}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-black font-arabic transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeSubTab === 'ai'
              ? 'bg-[#00D68F] text-slate-950 shadow-xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>أستاذ بوشعيب AI</span>
        </button>
      </div>

      {/* ================= GAME 1: DER/DIE/DAS ARCADE BLITZ ================= */}
      {activeSubTab === 'blitz' && (
        <div
          className={`bg-white rounded-3xl border-neo shadow-neo p-5 sm:p-7 space-y-6 ${
            shake ? 'animate-bounce' : ''
          }`}
        >
          {/* Top Arcade HUD */}
          <div className="flex items-center justify-between pb-4 border-b-2.5 border-slate-900">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-[#FFB800] border-neo-2 flex items-center justify-center font-black text-sm">
                ⚡
              </span>
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">
                  Combo Blitz Engine
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-black text-slate-950 font-bauhaus text-base">
                    {score} Points
                  </span>
                  {combo > 1 && (
                    <span className="px-2 py-0.5 rounded-lg bg-[#FF3366] text-white font-black font-mono text-xs animate-bounce shadow-neo-sm">
                      {combo}x COMBO! 🔥
                    </span>
                  )}
                </div>
              </div>
            </div>

            <UmlautMonster
              reaction={!feedback ? 'neutral' : feedback.isCorrect ? 'happy' : 'shocked'}
              size={54}
            />
          </div>

          {/* Flashcard Body */}
          <div className="bg-[#F6F2EA] p-6 sm:p-8 rounded-3xl border-neo shadow-neo text-center space-y-3 relative overflow-hidden">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block">
              Noun #{cardIndex + 1}
            </span>

            {/* German Noun in Big Bauhaus Type */}
            <bdi
              dir="ltr"
              className="text-3xl sm:text-4xl font-black text-slate-950 font-bauhaus block tracking-tight select-none"
            >
              {currentCard.noun}
            </bdi>

            <div className="flex items-center justify-center gap-2">
              <span className="text-xs font-mono text-slate-600 bg-white px-3 py-1 rounded-xl border border-slate-900/15">
                Plural: {currentCard.plural}
              </span>
              <AudioPlayButton text={currentCard.noun} size="sm" showEqualizer={false} />
            </div>

            <p className="text-sm font-bold font-arabic text-slate-700">
              {language === 'darija'
                ? currentCard.meaningDarija
                : language === 'ar'
                ? currentCard.meaningArabic
                : currentCard.meaningEnglish}
            </p>

            {/* Trap Hint */}
            {currentCard.trapHintDarija && (
              <span className="inline-block text-[11px] font-arabic font-semibold text-amber-900 bg-amber-100/80 px-2.5 py-1 rounded-lg border border-amber-300">
                💡 {currentCard.trapHintDarija}
              </span>
            )}
          </div>

          {/* Tactile 3D DER / DIE / DAS Smash Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              disabled={!!feedback}
              onClick={() => handleArticleClick('der')}
              className="btn-neo py-4 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-black text-lg sm:text-xl font-bauhaus cursor-pointer shadow-neo disabled:opacity-50"
            >
              DER
            </button>

            <button
              type="button"
              disabled={!!feedback}
              onClick={() => handleArticleClick('die')}
              className="btn-neo py-4 rounded-2xl bg-[#FF3366] hover:bg-[#E11D48] text-white font-black text-lg sm:text-xl font-bauhaus cursor-pointer shadow-neo disabled:opacity-50"
            >
              DIE
            </button>

            <button
              type="button"
              disabled={!!feedback}
              onClick={() => handleArticleClick('das')}
              className="btn-neo py-4 rounded-2xl bg-[#00D68F] hover:bg-[#059669] text-slate-950 font-black text-lg sm:text-xl font-bauhaus cursor-pointer shadow-neo disabled:opacity-50"
            >
              DAS
            </button>
          </div>

          {/* Feedback & Next Button */}
          {feedback && (
            <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-[#F6F2EA] rounded-2xl border-neo gap-3 animate-in fade-in">
              <span
                className={`text-xs sm:text-sm font-bold font-arabic ${
                  feedback.isCorrect ? 'text-emerald-900' : 'text-rose-900'
                }`}
              >
                {feedback.text}
              </span>

              <button
                type="button"
                onClick={handleNextCard}
                className="btn-neo py-2 px-5 rounded-xl bg-[#111827] text-white font-bold text-xs font-arabic cursor-pointer shrink-0"
              >
                الكلمة الموالية ➔
              </button>
            </div>
          )}
        </div>
      )}

      {/* ================= GAME 2: BUCHSTABIEREN NAME SPELLER ================= */}
      {activeSubTab === 'speller' && (
        <div className="bg-white rounded-3xl border-neo shadow-neo p-5 sm:p-7 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b-2.5 border-slate-900">
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">
                Official German Bureaucracy Tool
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-950 font-bauhaus">
                Buchstabiertafel (جدول التهجئة عند القنصلية)
              </h3>
            </div>
            <button
              type="button"
              onClick={handleSpeakSpelling}
              className="btn-neo py-2 px-4 rounded-xl bg-[#FFB800] text-slate-950 font-black text-xs font-mono cursor-pointer inline-flex items-center gap-1.5"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nطق بالكامل</span>
            </button>
          </div>

          {/* Name Input Field */}
          <div className="space-y-2">
            <label className="block text-xs font-bold font-arabic text-slate-800">
              اكتب سميتك أو أي كلمة بالفرنسية باش تشوف كيفاش كيتهجاها الموظف الألماني:
            </label>
            <input
              type="text"
              value={spellerInput}
              onChange={(e) => setSpellerInput(e.target.value.toUpperCase())}
              placeholder="مثلاً: MOHAMED, AMINA..."
              maxLength={15}
              className="w-full px-4 py-3 bg-[#F6F2EA] rounded-2xl border-neo font-bauhaus font-black text-lg text-slate-950 focus:outline-none uppercase tracking-wider"
            />
          </div>

          {/* Animated Flip-Board Letters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {getSpelledLetters().map((item, idx) => (
              <div
                key={idx}
                className="p-3 bg-[#F6F2EA] rounded-2xl border-neo-2 shadow-neo-sm flex flex-col items-center text-center space-y-1 hover:scale-105 transition-transform"
              >
                <div className="w-10 h-10 rounded-xl bg-[#111827] text-white flex items-center justify-center font-black font-bauhaus text-lg">
                  {item.letter}
                </div>
                <span className="font-black text-xs font-bauhaus text-slate-950">
                  wie {item.info.nato}
                </span>
                <span className="text-[10px] font-arabic text-slate-600 line-clamp-1">
                  {item.info.darija}
                </span>
                <AudioPlayButton text={`${item.letter} wie ${item.info.nato}`} size="sm" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= GAME 3: OSTAZ BOUCHAIB AI TUTOR ================= */}
      {activeSubTab === 'ai' && (
        <div className="bg-white rounded-3xl border-neo shadow-neo p-5 sm:p-7 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b-2.5 border-slate-900">
            <div className="flex items-center gap-3">
              <OstazBouchaibMascot mood="teaching" size={46} />
              <div>
                <h3 className="text-base font-black text-slate-950 font-arabic">
                  كشك أستاذ بوشعيب للذكاء الاصطناعي
                </h3>
                <span className="text-[10px] font-mono text-slate-500">
                  Witty German explanations in 100% pure Moroccan Darija
                </span>
              </div>
            </div>
          </div>

          {/* Quick Prompt Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-arabic">
            <button
              type="button"
              onClick={() => handleSendMessage('شنو هو الفرق بين kein و nicht بالدارجة؟')}
              className="btn-neo px-3 py-1.5 rounded-xl bg-[#F6F2EA] hover:bg-[#FFB800] text-slate-900 font-bold whitespace-nowrap cursor-pointer text-xs"
            >
              kein vs nicht؟
            </button>
            <button
              type="button"
              onClick={() => handleSendMessage('كيفاش كيتصرف فعل sein فـ الحاضر والماضي؟')}
              className="btn-neo px-3 py-1.5 rounded-xl bg-[#F6F2EA] hover:bg-[#00D68F] text-slate-900 font-bold whitespace-nowrap cursor-pointer text-xs"
            >
              تصريف فعل sein؟
            </button>
            <button
              type="button"
              onClick={() => handleSendMessage('علاش das Mädchen محايد واخا كتعني بنت؟')}
              className="btn-neo px-3 py-1.5 rounded-xl bg-[#F6F2EA] hover:bg-[#FF3366] hover:text-white text-slate-900 font-bold whitespace-nowrap cursor-pointer text-xs"
            >
              علاش das Mädchen محايد؟
            </button>
          </div>

          {/* Chat Messages Log */}
          <div className="h-64 overflow-y-auto space-y-3 p-3 bg-[#F6F2EA] rounded-2xl border-neo-2">
            {messages.map((m) => {
              const isUser = m.sender === 'user';
              return (
                <div
                  key={m.id}
                  className={`flex items-start gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && <OstazBouchaibMascot mood="teaching" size={32} />}
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl border-neo-2 shadow-neo-sm text-xs sm:text-sm font-arabic leading-relaxed ${
                      isUser
                        ? 'bg-[#2563EB] text-white rounded-br-xs'
                        : 'bg-white text-slate-950 rounded-bl-xs'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              );
            })}
            {isTyping && (
              <div className="flex items-center gap-2 text-xs font-arabic text-slate-500">
                <OstazBouchaibMascot mood="thinking" size={28} />
                <span>أستاذ بوشعيب كيكتب ليك الجواب...</span>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 pt-1"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="سول أستاذ بوشعيب أي سؤال فـ الألمانية..."
              className="flex-1 px-4 py-3 bg-[#F6F2EA] rounded-2xl border-neo font-arabic text-xs sm:text-sm text-slate-950 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputVal.trim() || isTyping}
              className="btn-neo p-3 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white cursor-pointer disabled:opacity-40"
            >
              <Send className="w-4 h-4 rtl:rotate-180" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
