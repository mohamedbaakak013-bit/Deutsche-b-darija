import React, { useState } from 'react';
import {
  Headphones,
  Volume2,
  Clock,
  ListPlus,
} from 'lucide-react';
import { StoryItem, Language } from '../types.ts';
import { DUAL_STORIES } from '../data/storiesData.ts';
import { AudioPlayButton } from './AudioPlayButton.tsx';
import { NounGenderBadge } from './NounGenderBadge.tsx';
import { playGermanSpeech } from '../utils/speech.ts';

interface DualReaderTabProps {
  language: Language;
}

export const DualReaderTab: React.FC<DualReaderTabProps> = ({ language }) => {
  const [selectedStoryId, setSelectedStoryId] = useState<string>(DUAL_STORIES[0].id);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState<number | null>(null);

  const isRtl = language === 'darija' || language === 'ar';
  const story: StoryItem = DUAL_STORIES.find((s) => s.id === selectedStoryId) || DUAL_STORIES[0];

  const handleSentencePlay = async (text: string, idx: number) => {
    setActiveSentenceIndex(idx);
    await playGermanSpeech(text, 1.0);
    setActiveSentenceIndex(null);
  };

  const handlePlayEntireStory = async () => {
    for (let i = 0; i < story.sentences.length; i++) {
      setActiveSentenceIndex(i);
      await playGermanSpeech(story.sentences[i].german, 1.0);
    }
    setActiveSentenceIndex(null);
  };

  return (
    <div className="space-y-6" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 flex items-start justify-between gap-4 flex-wrap shadow-sm">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold font-mono">
            <Headphones className="w-3.5 h-3.5" />
            <span>Story Podcasts & Dual-Reader</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white font-arabic">
            قصص وبودكاست تفاعلي (القراءة والاستماع المزدوج)
          </h2>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl font-arabic leading-[1.8] font-medium">
            كليكي على أي جملة باش تسمع النطق الألماني النقي، وقارن الترجمة بالدارجة، الفصحى، أو الإنجليزية فـ نفس اللحظة!
          </p>
        </div>

        <button
          type="button"
          onClick={handlePlayEntireStory}
          className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-950/40 transition-all btn-tactile-emerald font-arabic"
        >
          <Volume2 className="w-4 h-4 fill-current" />
          <span>استمع للقصة كاملة</span>
        </button>
      </div>

      {/* Story Selector Carousel */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {DUAL_STORIES.map((st) => {
          const isSelected = st.id === selectedStoryId;

          return (
            <button
              key={st.id}
              type="button"
              onClick={() => {
                setSelectedStoryId(st.id);
                setActiveSentenceIndex(null);
              }}
              className={`p-4 rounded-3xl border text-left rtl:text-right transition-all flex flex-col justify-between h-32 shadow-xs ${
                isSelected
                  ? 'bg-blue-950/40 border-blue-500 ring-1 ring-blue-500/30 shadow-md'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">
                    {st.level}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{st.readTimeMinutes}m</span>
                  </span>
                </div>
                <bdi dir="ltr" className="text-xs font-bold text-white font-mono mt-1.5 line-clamp-1 block">
                  {st.titleGerman}
                </bdi>
              </div>
              <p className="text-xs text-slate-300 font-arabic line-clamp-1 font-medium">
                {language === 'darija' ? st.titleDarija : language === 'ar' ? st.titleArabic : st.titleEnglish}
              </p>
            </button>
          );
        })}
      </div>

      {/* Story Reader Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Text Dual Columns */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
              {story.level} • {story.topic}
            </span>
            <bdi dir="ltr" className="text-2xl sm:text-3xl font-black text-white font-mono mt-1 block">
              {story.titleGerman}
            </bdi>
            <p className="text-sm text-slate-300 font-arabic mt-1 font-medium">
              {language === 'darija' ? story.titleDarija : language === 'ar' ? story.titleArabic : story.titleEnglish}
            </p>
          </div>

          <div className="space-y-3.5 pt-2">
            {story.sentences.map((sent, idx) => {
              const isActive = activeSentenceIndex === idx;

              return (
                <div
                  key={idx}
                  onClick={() => handleSentencePlay(sent.german, idx)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 group ${
                    isActive
                      ? 'bg-blue-950/40 border-blue-500 shadow-md ring-1 ring-blue-500/20'
                      : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1.5 flex-1">
                    <bdi
                      dir="ltr"
                      className={`text-base sm:text-lg font-bold font-mono leading-relaxed block transition-colors ${
                        isActive ? 'text-amber-300' : 'text-slate-100 group-hover:text-emerald-300'
                      }`}
                    >
                      {sent.german}
                    </bdi>
                    <p className="text-xs sm:text-sm text-slate-300 font-arabic leading-[1.8] font-medium">
                      {language === 'darija' ? sent.darija : language === 'ar' ? sent.ar : sent.en}
                    </p>
                  </div>

                  <div className="shrink-0 pt-1" onClick={(e) => e.stopPropagation()}>
                    <AudioPlayButton text={sent.german} showSyllables={false} size="sm" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Key Vocabulary Extractor Drawer */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 self-start shadow-xl">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <ListPlus className="w-4 h-4 text-emerald-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              Wortschatz (معجم القصة)
            </h4>
          </div>

          <p className="text-xs text-slate-300 font-arabic leading-[1.8] font-medium">
            الكلمات المفتاحية الملونة بالأزرق، الوردي، والأخضر:
          </p>

          <div className="space-y-3 pt-1">
            {story.keyVocab.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5 shadow-xs"
              >
                {item.article ? (
                  <NounGenderBadge
                    article={item.article as any}
                    noun={item.german.replace(/^(der|die|das)\s+/i, '')}
                    gender={item.gender}
                    plural={item.plural}
                    meaning={language === 'darija' ? item.darija : language === 'ar' ? item.arabic : item.english}
                    size="sm"
                  />
                ) : (
                  <div>
                    <bdi dir="ltr" className="font-bold text-amber-400 font-mono text-sm block">
                      {item.german}
                    </bdi>
                    <span className="text-xs text-slate-300 font-arabic font-medium block mt-1">
                      {language === 'darija' ? item.darija : language === 'ar' ? item.arabic : item.english}
                    </span>
                  </div>
                )}

                <AudioPlayButton text={item.german} showSyllables={false} size="sm" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
