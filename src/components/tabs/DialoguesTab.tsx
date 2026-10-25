import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  MessageSquare,
  BookOpen,
  Volume2,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  RotateCcw,
} from 'lucide-react';
import { Language, SimulatorScenario, StoryItem } from '../../types.ts';
import { SIMULATOR_SCENARIOS } from '../../data/simulatorsData.ts';
import { DUAL_STORIES } from '../../data/storiesData.ts';
import { AudioPlayButton } from '../AudioPlayButton.tsx';

interface DialoguesTabProps {
  language: Language;
}

export const DialoguesTab: React.FC<DialoguesTabProps> = ({ language }) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(SIMULATOR_SCENARIOS[1].id); // Supermarkt default
  const [revealedTranslations, setRevealedTranslations] = useState<Record<string, boolean>>({});

  const scenario = SIMULATOR_SCENARIOS.find((s) => s.id === selectedScenarioId) || SIMULATOR_SCENARIOS[1];
  const story = DUAL_STORIES.find((st) => st.id === selectedScenarioId);

  const toggleTranslate = (key: string) => {
    setRevealedTranslations((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const getActiveText = (item: {
    darija?: string;
    ar?: string;
    en?: string;
    npcSpeechDarija?: string;
    npcSpeechArabic?: string;
    npcSpeechEnglish?: string;
    textDarija?: string;
    textArabic?: string;
    textEnglish?: string;
  }) => {
    if (language === 'darija') return item.darija || item.npcSpeechDarija || item.textDarija || '';
    if (language === 'ar') return item.ar || item.npcSpeechArabic || item.textArabic || '';
    return item.en || item.npcSpeechEnglish || item.textEnglish || '';
  };

  return (
    <div className="space-y-4">
      {/* Scenario Picker Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {SIMULATOR_SCENARIOS.map((sc) => {
          const isSelected = selectedScenarioId === sc.id;
          return (
            <button
              key={sc.id}
              type="button"
              onClick={() => {
                setSelectedScenarioId(sc.id);
                setRevealedTranslations({});
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all font-arabic ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80'
              }`}
            >
              {sc.titleGerman.split(':')[0]}
            </button>
          );
        })}

        {/* Stories */}
        {DUAL_STORIES.map((st) => {
          const isSelected = selectedScenarioId === st.id;
          return (
            <button
              key={st.id}
              type="button"
              onClick={() => {
                setSelectedScenarioId(st.id);
                setRevealedTranslations({});
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all font-arabic ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80'
              }`}
            >
              📖 {st.titleGerman}
            </button>
          );
        })}
      </div>

      {/* Main Conversation Container (WhatsApp Style) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-6 space-y-4 shadow-xs">
        {/* Header of Scenario */}
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base font-mono">
              {story ? story.titleGerman : scenario.titleGerman}
            </h3>
            <p className="text-xs text-slate-500 font-arabic mt-0.5">
              {story
                ? language === 'darija' ? story.titleDarija : language === 'ar' ? story.titleArabic : story.titleEnglish
                : language === 'darija' ? scenario.titleDarija : language === 'ar' ? scenario.titleArabic : scenario.titleEnglish}
            </p>
          </div>
          <span className="text-xs px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 font-mono font-bold border border-amber-200/60">
            {story ? story.level : scenario.level}
          </span>
        </div>

        {/* DIALOGUE BUBBLES */}
        {scenario.dialogueSteps && !story && (
          <div className="space-y-4">
            {scenario.dialogueSteps.map((step, idx) => {
              const isRevealedNpc = revealedTranslations[`npc-${idx}`];
              const bestOption = step.options.find((o) => o.isAppropriate) || step.options[0];
              const isRevealedUser = revealedTranslations[`user-${idx}`];

              return (
                <div key={idx} className="space-y-2.5">
                  {/* NPC Bubble (Left aligned) */}
                  <div className="flex items-start gap-2.5 max-w-[85%] sm:max-w-[75%]">
                    <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm shrink-0">
                      {step.avatar}
                    </span>
                    <div className="bg-slate-100/90 rounded-2xl rounded-tl-xs p-3.5 space-y-1.5 border border-slate-200/60">
                      <span className="text-[10px] font-bold text-slate-500 uppercase font-mono block">
                        {step.speaker}
                      </span>
                      <bdi dir="ltr" className="font-bold text-slate-900 font-mono text-sm block">
                        "{step.npcSpeechGerman}"
                      </bdi>

                      {isRevealedNpc && (
                        <p className="text-xs text-slate-600 font-arabic pt-1 border-t border-slate-200/60">
                          {getActiveText(step)}
                        </p>
                      )}

                      <div className="flex items-center gap-2 pt-1">
                        <AudioPlayButton text={step.npcSpeechGerman} size="sm" />
                        <button
                          type="button"
                          onClick={() => toggleTranslate(`npc-${idx}`)}
                          className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 underline underline-offset-2 font-arabic"
                        >
                          {isRevealedNpc ? 'إخفاء' : 'ترجمة'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* User Response Bubble (Right aligned) */}
                  <div className="flex items-start gap-2.5 max-w-[85%] sm:max-w-[75%] ms-auto justify-end">
                    <div className="bg-emerald-50 rounded-2xl rounded-tr-xs p-3.5 space-y-1.5 border border-emerald-200/80">
                      <span className="text-[10px] font-bold text-emerald-800 uppercase font-mono block">
                        Bouchaib (بوشعيب)
                      </span>
                      <bdi dir="ltr" className="font-bold text-emerald-950 font-mono text-sm block">
                        "{bestOption.textGerman}"
                      </bdi>

                      {isRevealedUser && (
                        <p className="text-xs text-emerald-800 font-arabic pt-1 border-t border-emerald-200/60">
                          {getActiveText(bestOption)}
                        </p>
                      )}

                      <div className="flex items-center gap-2 pt-1">
                        <AudioPlayButton text={bestOption.textGerman} size="sm" />
                        <button
                          type="button"
                          onClick={() => toggleTranslate(`user-${idx}`)}
                          className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 underline underline-offset-2 font-arabic"
                        >
                          {isRevealedUser ? 'إخفاء' : 'ترجمة'}
                        </button>
                      </div>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-sm shrink-0">
                      🇲🇦
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* STORY SENTENCE BUBBLES */}
        {story && (
          <div className="space-y-3">
            {story.sentences.map((sent, idx) => {
              const isRevealed = revealedTranslations[`story-${idx}`];

              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <bdi dir="ltr" className="font-bold text-slate-900 font-mono text-sm sm:text-base">
                      {sent.german}
                    </bdi>
                    <AudioPlayButton text={sent.german} size="sm" />
                  </div>

                  {isRevealed && (
                    <p className="text-xs sm:text-sm text-slate-600 font-arabic pt-1 border-t border-slate-200/60 leading-relaxed">
                      {language === 'darija' ? sent.darija : language === 'ar' ? sent.ar : sent.en}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={() => toggleTranslate(`story-${idx}`)}
                    className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 underline underline-offset-2 font-arabic block"
                  >
                    {isRevealed ? 'إخفاء الترجمة' : 'ترجمة الجملة'}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
