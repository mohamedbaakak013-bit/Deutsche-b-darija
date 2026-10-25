import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  User,
  RotateCcw,
} from 'lucide-react';
import { Language } from '../types.ts';
import { AudioPlayButton } from './AudioPlayButton.tsx';

interface Message {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  germanAudioSnippets?: string[];
}

interface AiTutorTabProps {
  language: Language;
}

const QUICK_PROMPTS = [
  {
    darija: 'علاش البنت das Mädchen محايدة فـ الألمانية؟',
    ar: 'لماذا كلمة das Mädchen محايدة في الألمانية؟',
    en: 'Why is das Mädchen neuter in German?',
  },
  {
    darija: 'شرح ليا الفرق بين Dativ و Akkusativ بكاس د أتاي',
    ar: 'اشرح لي الفرق بين Dativ و Akkusativ ببساطة',
    en: 'Explain Dativ vs Akkusativ with an analogy',
  },
  {
    darija: 'شنو هما الحالات الـ 3 ديال نطق حرف R فـ الألمانية؟',
    ar: 'ما هي الحالات الثلاث لنطق حرف الراء بالألمانية؟',
    en: 'What are the 3 faces of the German letter R?',
  },
  {
    darija: 'كيفاش نسول على الروطار د التران فـ برلين؟',
    ar: 'كيف أستفسر عن تأخر القطار في محطة برلين؟',
    en: 'How do I ask about train delays at DB?',
  },
];

export const AiTutorTab: React.FC<AiTutorTabProps> = ({ language }) => {
  const isRtl = language === 'darija' || language === 'ar';

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'tutor',
      text:
        language === 'darija'
          ? 'مرحباً بيك أ سيدي! أنا أستاذ بوشعيب-هانس (Ostaz Bouchaib-Hans). عايش فـ برلين هادي 10 سنين مع جينس، وحافظ كاع قوالب الكراماتيك والبيرو والأوملاوت. سولني أي حاجة بالدارجة ولا بالألمانية ونجاوبك فـ البلاصة!'
          : language === 'ar'
          ? 'أهلاً بك! أنا أستاذ بوشعيب-هانس، معلمك الخاص في اللغة الألمانية من المستوى A1 حتى B2. اسألني عن أي قاعدة نحوية، نطق، أو استفسار وسأجيبك فوراً.'
          : 'Welcome! I am Ostaz Bouchaib-Hans, your personal German tutor from A1 to B2. Ask me any question about German grammar, pronunciation, or culture and I will explain it with clarity!',
      germanAudioSnippets: ['Herzlich willkommen in Deutschland!'],
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const history = messages.slice(-6).map((m) => ({
        role: (m.sender === 'user' ? 'user' : 'model') as 'user' | 'model',
        text: m.text,
      }));

      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history,
          language,
        }),
      });

      const data = await res.json();
      const replyText = data.reply || 'عذراً، وقع عطب فـ الاتصال. عاود سولني!';

      // Extract bold German snippets for audio buttons if any
      const boldRegex = /\*\*([A-Za-zÄÖÜäöüß\s]+)\*\*/g;
      const extractedSnippets: string[] = [];
      let match;
      while ((match = boldRegex.exec(replyText)) !== null) {
        if (match[1].length > 2 && match[1].length < 30) {
          extractedSnippets.push(match[1]);
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'tutor',
          text: replyText,
          germanAudioSnippets: extractedSnippets.slice(0, 3),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'tutor',
          text: 'أستاذ بوشعيب كيعتذر، وقع مشكل فـ السيرفر. عاود طرح السؤال ديالك!',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickPrompt = (p: (typeof QUICK_PROMPTS)[0]) => {
    const text = language === 'darija' ? p.darija : language === 'ar' ? p.ar : p.en;
    handleSend(text);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4 flex-wrap shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-emerald-600 via-amber-500 to-red-600 flex items-center justify-center text-white text-3xl shadow-lg border border-slate-700 shrink-0">
            👨‍🏫
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg sm:text-xl font-black text-white font-arabic">
                أستاذ بوشعيب-هانس (Ostaz Bouchaib-Hans)
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                Gemini 3.8 Flash
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-arabic mt-1 font-medium">
              مدرس الألمانية بروح مغربية فكاهية وذكاء اصطناعي فوري
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            setMessages([
              {
                id: 'init-1',
                sender: 'tutor',
                text: 'مرحباً بيك من جديد! جاهز لأي سؤال ألماني!',
              },
            ])
          }
          className="px-4 py-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-2 transition-colors font-arabic shadow-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>محادثة جديدة</span>
        </button>
      </div>

      {/* Quick Prompt Carousel */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-bold text-slate-400 shrink-0 font-arabic">
          أسئلة سريعة:
        </span>
        {QUICK_PROMPTS.map((p, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleQuickPrompt(p)}
            className="px-4 py-2 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs text-slate-200 transition-all font-arabic whitespace-nowrap shrink-0 shadow-xs font-medium"
          >
            {language === 'darija' ? p.darija : language === 'ar' ? p.ar : p.en}
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 min-h-[440px] max-h-[580px] overflow-y-auto space-y-5 shadow-xl">
        {messages.map((m) => {
          const isUser = m.sender === 'user';

          return (
            <div
              key={m.id}
              className={`flex items-start gap-3.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 text-sm font-bold shadow-xs ${
                  isUser
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-gradient-to-tr from-amber-600 to-red-600 text-white'
                }`}
              >
                {isUser ? <User className="w-5 h-5" /> : '🇩🇪'}
              </div>

              <div
                className={`p-5 rounded-3xl max-w-[85%] sm:max-w-[78%] space-y-3 shadow-sm ${
                  isUser
                    ? 'bg-emerald-600 text-white rounded-tr-sm rtl:rounded-tr-3xl rtl:rounded-tl-sm'
                    : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-sm rtl:rounded-tl-3xl rtl:rounded-tr-sm'
                }`}
              >
                <p className="text-sm sm:text-base leading-[1.9] font-arabic whitespace-pre-line font-medium">
                  {m.text}
                </p>

                {/* Audio snippet buttons for German words */}
                {m.germanAudioSnippets && m.germanAudioSnippets.length > 0 && (
                  <div className="pt-2.5 border-t border-slate-800/80 flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] text-slate-400 uppercase font-mono font-bold">
                      Listen (استمع):
                    </span>
                    {m.germanAudioSnippets.map((snip, i) => (
                      <AudioPlayButton key={i} text={snip} showSyllables={false} size="sm" />
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-slate-800 flex items-center justify-center text-sm shrink-0">
              👨‍🏫
            </div>
            <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 text-slate-300 text-sm flex items-center gap-2.5 font-arabic">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span>أستاذ بوشعيب كيفكر ويكتب لك الجواب...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2.5 rounded-3xl shadow-lg">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
          placeholder="سول أستاذ بوشعيب بالدارجة ولا الألمانية (مثال: علاش كنديرو Akkusativ مع für؟)..."
          className="flex-1 px-4 py-3 bg-transparent text-white text-sm sm:text-base focus:outline-none font-arabic placeholder:text-slate-500 font-medium"
        />

        <button
          type="button"
          onClick={() => handleSend()}
          disabled={!inputText.trim() || isLoading}
          className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm flex items-center gap-2 transition-all disabled:opacity-40 font-arabic btn-tactile-emerald shrink-0"
        >
          <Send className="w-4 h-4 rtl:rotate-180" />
          <span>إرسال</span>
        </button>
      </div>
    </div>
  );
};
