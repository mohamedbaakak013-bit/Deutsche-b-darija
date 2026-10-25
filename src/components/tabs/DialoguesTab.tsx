import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  MessageSquare,
  BookOpen,
  Volume2,
  CheckCircle2,
  Sparkles,
  FileText,
  RotateCcw,
  Check,
  Send,
  Stamp,
  ShoppingBag,
  Train,
  Utensils,
  Stethoscope,
} from 'lucide-react';
import { Language, SimulatorScenario, StoryItem } from '../../types.ts';
import { SIMULATOR_SCENARIOS } from '../../data/simulatorsData.ts';
import { DUAL_STORIES } from '../../data/storiesData.ts';
import { AudioPlayButton } from '../AudioPlayButton.tsx';
import { OstazBouchaibMascot, ZelligeStar } from '../BrandMascot.tsx';
import { sound } from '../../utils/soundEngine.ts';

interface DialoguesTabProps {
  language: Language;
}

export const DialoguesTab: React.FC<DialoguesTabProps> = ({ language }) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(
    SIMULATOR_SCENARIOS[0].id // Anmeldung form or Supermarket
  );
  const [revealedTranslations, setRevealedTranslations] = useState<Record<string, boolean>>({});

  // Bureaucracy Form State
  const [formFields, setFormFields] = useState({
    nachname: 'El Idrissi',
    vorname: 'Bouchaib',
    geburtsdatum: '1998-07-15',
    geburtsort: 'Casablanca (Marokko)',
    staatsangehoerigkeit: 'marokkanisch',
    familienstand: 'ledig',
    adresse: 'Sonnenallee 42, 12045 Berlin',
  });
  const [isFormApproved, setIsFormApproved] = useState(false);

  const scenario =
    SIMULATOR_SCENARIOS.find((s) => s.id === selectedScenarioId) || SIMULATOR_SCENARIOS[0];
  const story = DUAL_STORIES.find((st) => st.id === selectedScenarioId);

  const isFormMode = scenario?.type === 'form';

  const toggleTranslate = (key: string) => {
    sound.playTap();
    setRevealedTranslations((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleApproveForm = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playLevelUp();
    setIsFormApproved(true);
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#2563EB', '#FFB800', '#FF3366', '#00D68F'],
      });
    } catch {
      // Safe
    }
  };

  const getScenarioIcon = (id: string) => {
    if (id.includes('form') || id.includes('anmeldung')) return FileText;
    if (id.includes('supermarkt') || id.includes('lidl')) return ShoppingBag;
    if (id.includes('bahn') || id.includes('zug')) return Train;
    if (id.includes('restaurant') || id.includes('essen')) return Utensils;
    if (id.includes('arzt')) return Stethoscope;
    return MessageSquare;
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
    <div className="space-y-5">
      {/* 1. Interactive Scenario Horizontal Picker */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {SIMULATOR_SCENARIOS.map((sc) => {
          const isSelected = selectedScenarioId === sc.id;
          const Icon = getScenarioIcon(sc.id);

          return (
            <button
              key={sc.id}
              type="button"
              onClick={() => {
                sound.playTap();
                setSelectedScenarioId(sc.id);
                setRevealedTranslations({});
              }}
              className={`btn-neo px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer font-arabic ${
                isSelected ? 'bg-[#2563EB] text-white' : 'bg-white text-slate-800 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{sc.titleGerman.split(':')[0]}</span>
            </button>
          );
        })}

        {/* Stories from dualStories */}
        {DUAL_STORIES.map((st) => {
          const isSelected = selectedScenarioId === st.id;
          return (
            <button
              key={st.id}
              type="button"
              onClick={() => {
                sound.playTap();
                setSelectedScenarioId(st.id);
                setRevealedTranslations({});
              }}
              className={`btn-neo px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer font-arabic ${
                isSelected ? 'bg-[#FF3366] text-white' : 'bg-white text-slate-800 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>{st.titleGerman}</span>
            </button>
          );
        })}
      </div>

      {/* 2. MODE A: Interactive Bureaucracy Form (Anmeldung) */}
      {isFormMode && (
        <div className="bg-white rounded-3xl border-neo shadow-neo p-5 sm:p-7 space-y-5">
          {/* Form Header with Official German Eagle Style */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2.5 border-slate-900 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FFB800] border-neo-2 flex items-center justify-center font-black text-xl shrink-0">
                🏛️
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest block">
                  Bundesrepublik Deutschland • Bürgeramt
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-950 font-bauhaus">
                  {scenario.titleGerman}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-700 bg-[#F6F2EA] px-2.5 py-1 rounded-xl border border-slate-900/20">
                +{scenario.xpReward} XP
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 font-arabic leading-relaxed">
            {language === 'darija'
              ? scenario.descriptionDarija
              : language === 'ar'
              ? scenario.descriptionArabic
              : scenario.descriptionEnglish}
          </p>

          {/* Actual Fillable Form */}
          <form onSubmit={handleApproveForm} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold font-mono text-slate-900 mb-1">
                  1. Familienname / Nachname (النسب / الكنية)
                </label>
                <input
                  type="text"
                  required
                  value={formFields.nachname}
                  onChange={(e) => setFormFields({ ...formFields, nachname: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F6F2EA] rounded-xl border-2 border-slate-900 font-mono text-xs text-slate-900 focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold font-mono text-slate-900 mb-1">
                  2. Vorname (الاسم الشخصي)
                </label>
                <input
                  type="text"
                  required
                  value={formFields.vorname}
                  onChange={(e) => setFormFields({ ...formFields, vorname: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F6F2EA] rounded-xl border-2 border-slate-900 font-mono text-xs text-slate-900 focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold font-mono text-slate-900 mb-1">
                  3. Geburtsdatum (تاريخ الازدياد)
                </label>
                <input
                  type="date"
                  required
                  value={formFields.geburtsdatum}
                  onChange={(e) => setFormFields({ ...formFields, geburtsdatum: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F6F2EA] rounded-xl border-2 border-slate-900 font-mono text-xs text-slate-900 focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold font-mono text-slate-900 mb-1">
                  4. Staatsangehörigkeit (الجنسية)
                </label>
                <input
                  type="text"
                  required
                  value={formFields.staatsangehoerigkeit}
                  onChange={(e) =>
                    setFormFields({ ...formFields, staatsangehoerigkeit: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-[#F6F2EA] rounded-xl border-2 border-slate-900 font-mono text-xs text-slate-900 focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold font-mono text-slate-900 mb-1">
                  5. Familienstand (الحالة العائلية)
                </label>
                <select
                  value={formFields.familienstand}
                  onChange={(e) => setFormFields({ ...formFields, familienstand: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F6F2EA] rounded-xl border-2 border-slate-900 font-mono text-xs text-slate-900 focus:outline-none focus:border-[#2563EB]"
                >
                  <option value="ledig">ledig (عازب)</option>
                  <option value="verheiratet">verheiratet (متزوج)</option>
                  <option value="geschieden">geschieden (مطلق)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold font-mono text-slate-900 mb-1">
                  6. Neue Anschrift (العنوان الجديد في برلين)
                </label>
                <input
                  type="text"
                  required
                  value={formFields.adresse}
                  onChange={(e) => setFormFields({ ...formFields, adresse: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F6F2EA] rounded-xl border-2 border-slate-900 font-mono text-xs text-slate-900 focus:outline-none focus:border-[#2563EB]"
                />
              </div>
            </div>

            {/* Official Bureaucratic Stamp when Approved */}
            {isFormApproved && (
              <div className="p-4 bg-[#00D68F]/20 border-2 border-[#00D68F] rounded-2xl flex items-center justify-between gap-3 animate-in zoom-in-95 duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#00D68F] text-slate-950 border-2 border-slate-950 flex items-center justify-center font-black text-xl rotate-12">
                    ✓
                  </div>
                  <div>
                    <span className="font-mono font-black text-xs text-emerald-950 uppercase tracking-widest block">
                      AMT BEWILLIGT • EINGETRAGEN
                    </span>
                    <p className="text-xs font-arabic text-emerald-900">
                      مبروك! تم اعتماد عنوانك بنجاح في سجل سكان برلين (Meldebestätigung). ربحت 200 نقطة XP!
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="btn-neo py-3 px-6 rounded-2xl bg-[#00D68F] hover:bg-[#059669] text-slate-950 font-black text-xs sm:text-sm font-arabic inline-flex items-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>ختم الاستمارة واعتماد التسجيل (Bestätigen)</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 3. MODE B: WhatsApp-Style Interactive Chat Theatre & Dialogue */}
      {!isFormMode && (
        <div className="bg-white rounded-3xl border-neo shadow-neo p-5 sm:p-7 space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b-2.5 border-slate-900">
            <div>
              <span className="text-[11px] font-mono font-bold text-slate-500 uppercase">
                {scenario?.location || 'Berlin Experience'}
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-950 font-bauhaus">
                {story ? story.titleGerman : scenario.titleGerman}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <AudioPlayButton
                text={
                  story
                    ? story.sentences[0]?.german || 'Guten Tag'
                    : scenario.dialogueSteps?.[0]?.npcSpeechGerman || 'Hallo'
                }
                size="sm"
              />
            </div>
          </div>

          {/* Dialogue Steps (Comic / WhatsApp Style) */}
          <div className="space-y-4">
            {scenario.dialogueSteps?.map((step) => {
              const isRevealed = revealedTranslations[`step-${step.step}`];

              return (
                <div key={step.step} className="space-y-2.5">
                  {/* NPC Speech Bubble */}
                  <div className="flex items-start gap-2.5 max-w-[85%]">
                    <span className="text-2xl shrink-0">{step.avatar || '🤖'}</span>
                    <div className="bg-[#F6F2EA] p-3.5 rounded-2xl border-neo-2 shadow-neo-sm space-y-1">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[10px] font-mono font-bold text-slate-500">
                          {step.speaker}
                        </span>
                        <AudioPlayButton text={step.npcSpeechGerman} size="sm" showEqualizer={false} />
                      </div>

                      <bdi dir="ltr" className="font-bold text-slate-950 font-mono text-sm block">
                        {step.npcSpeechGerman}
                      </bdi>

                      {/* Single Language Translation Reveal */}
                      {isRevealed && (
                        <p className="text-xs text-slate-700 font-arabic pt-1 border-t border-slate-900/10">
                          {getActiveText(step)}
                        </p>
                      )}

                      <button
                        type="button"
                        onClick={() => toggleTranslate(`step-${step.step}`)}
                        className="text-[10px] font-bold text-[#2563EB] hover:underline cursor-pointer block font-arabic pt-0.5"
                      >
                        {isRevealed ? 'إخفاء الترجمة' : '💬 ترجمة بالدارجة'}
                      </button>
                    </div>
                  </div>

                  {/* User Response Options */}
                  <div className="space-y-2 pl-8 rtl:pl-0 rtl:pr-8">
                    {step.options.map((opt, oIdx) => (
                      <div
                        key={oIdx}
                        className="bg-white p-3 rounded-xl border-neo-2 shadow-neo-sm flex items-center justify-between gap-3"
                      >
                        <div className="space-y-0.5">
                          <bdi dir="ltr" className="font-bold text-slate-900 font-mono text-xs sm:text-sm block">
                            {opt.textGerman}
                          </bdi>
                          <span className="text-xs text-slate-600 font-arabic block">
                            {getActiveText(opt)}
                          </span>
                        </div>
                        <AudioPlayButton text={opt.textGerman} size="sm" />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Story Sentences if Story mode */}
            {story?.sentences?.map((sent, sIdx) => {
              const isRevealed = revealedTranslations[`story-${sIdx}`];
              return (
                <div
                  key={sIdx}
                  className="p-4 bg-[#F6F2EA] rounded-2xl border-neo-2 shadow-neo-sm space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-500">
                      #{sIdx + 1}
                    </span>
                    <AudioPlayButton text={sent.german} size="sm" />
                  </div>
                  <bdi dir="ltr" className="font-bold text-slate-950 font-mono text-sm block">
                    {sent.german}
                  </bdi>
                  {isRevealed && (
                    <p className="text-xs sm:text-sm text-slate-700 font-arabic pt-2 border-t border-slate-900/10 leading-relaxed">
                      {getActiveText(sent)}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => toggleTranslate(`story-${sIdx}`)}
                    className="text-xs font-bold text-[#2563EB] hover:underline cursor-pointer font-arabic"
                  >
                    {isRevealed ? 'إخفاء' : 'كشف الشرح بالدارجة'}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Vocabulary Loot Box at bottom */}
          <div className="p-4 bg-[#FFB800] rounded-2xl border-neo shadow-neo text-slate-950 space-y-2">
            <div className="flex items-center gap-2 font-black font-bauhaus text-xs uppercase">
              <Sparkles className="w-4 h-4 text-[#FF3366]" />
              <span>🎁 Vocabulary Loot Box (كلمات ذهبية)</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
              <div className="p-2 bg-white rounded-xl border border-slate-950">
                <span className="font-bold block text-slate-950">die Quittung</span>
                <span className="text-slate-600 font-arabic text-[11px]">التوصيل / Reçu</span>
              </div>
              <div className="p-2 bg-white rounded-xl border border-slate-950">
                <span className="font-bold block text-slate-950">zahlen bitte</span>
                <span className="text-slate-600 font-arabic text-[11px]">بغيت نخلص عافاك</span>
              </div>
              <div className="p-2 bg-white rounded-xl border border-slate-950">
                <span className="font-bold block text-slate-950">der Ausweis</span>
                <span className="text-slate-600 font-arabic text-[11px]">لاكارط ناسيونال</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
