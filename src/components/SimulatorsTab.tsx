import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShoppingBag,
  UtensilsCrossed,
  Train,
  Stethoscope,
  Hotel,
  RotateCcw,
} from 'lucide-react';
import { SimulatorScenario, Language } from '../types.ts';
import { SIMULATOR_SCENARIOS } from '../data/simulatorsData.ts';
import { AudioPlayButton } from './AudioPlayButton.tsx';

interface SimulatorsTabProps {
  language: Language;
  completedSimulatorIds: string[];
  onCompleteSimulator: (scenarioId: string, xp: number) => void;
}

export const SimulatorsTab: React.FC<SimulatorsTabProps> = ({
  language,
  completedSimulatorIds,
  onCompleteSimulator,
}) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(SIMULATOR_SCENARIOS[0].id);

  // Form State for Bureaucracy Simulator
  const [formData, setFormData] = useState({
    nachname: '',
    vorname: '',
    geburtsdatum: '',
    geburtsort: '',
    staatsangehoerigkeit: '',
    familienstand: 'ledig',
    adresse: '',
  });
  const [formFeedback, setFormFeedback] = useState<{ isSuccess?: boolean; message?: string } | null>(null);

  // Dialogue Scenario State
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [dialogueFeedback, setDialogueFeedback] = useState<string | null>(null);

  const isRtl = language === 'darija' || language === 'ar';
  const scenario = SIMULATOR_SCENARIOS.find((s) => s.id === selectedScenarioId) || SIMULATOR_SCENARIOS[0];

  const handleScenarioSelect = (id: string) => {
    setSelectedScenarioId(id);
    setCurrentStepIndex(0);
    setSelectedOptionIndex(null);
    setDialogueFeedback(null);
    setFormFeedback(null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const profile = scenario.formProfile;
    if (!profile) return;

    const isNachnameOk = formData.nachname.trim().toLowerCase().includes('idrissi');
    const isVornameOk = formData.vorname.trim().toLowerCase().includes('bouchaib');

    if (isNachnameOk && isVornameOk && formData.adresse.length > 5) {
      setFormFeedback({
        isSuccess: true,
        message:
          language === 'darija'
            ? 'تبارك الله عليك يا بوشعيب! عمرتي الاستمارة الألمانية 100% صحيحة والموظف د البيرو طبع ليك الورقة فـ البلاصة! ربحتي 200 XP.'
            : language === 'ar'
            ? 'أحسنت صنعاً! تم ملء الاستمارة الألمانية بامتياز، وختم الموظف استمارة تسجيلك بنجاح. حصلت على 200 نقطة خبرة!'
            : 'Outstanding! The registration form was accurately filled out and the Bürgeramt officer officially stamped it. +200 XP!',
      });
      confetti({ particleCount: 70, spread: 60 });
      onCompleteSimulator(scenario.id, scenario.xpReward);
    } else {
      setFormFeedback({
        isSuccess: false,
        message:
          language === 'darija'
            ? 'رد البال: فـ ألمانيا Nachname = الكنية (El Idrissi)، و Vorname = الاسم الشخصي (Bouchaib). راجع البروفيل وحاول تعمر العنوان مزيان!'
            : language === 'ar'
            ? 'تنبيه: Nachname يعني اللقب أو الكنية (El Idrissi)، بينما Vorname يعني الاسم الأول (Bouchaib).'
            : 'Check the profile: Nachname is family name, Vorname is given name. Complete the address properly.',
      });
    }
  };

  const handleDialogueChoice = (optionIdx: number) => {
    setSelectedOptionIndex(optionIdx);
    const step = scenario.dialogueSteps?.[currentStepIndex];
    if (!step) return;

    const chosen = step.options[optionIdx];
    const feedbackText =
      language === 'darija'
        ? chosen.feedbackDarija
        : language === 'ar'
        ? chosen.feedbackArabic
        : chosen.feedbackEnglish;

    setDialogueFeedback(feedbackText);

    if (chosen.isAppropriate) {
      if (currentStepIndex === (scenario.dialogueSteps?.length || 1) - 1) {
        confetti({ particleCount: 50, spread: 60 });
        onCompleteSimulator(scenario.id, scenario.xpReward);
      }
    }
  };

  const handleNextDialogueStep = () => {
    if (scenario.dialogueSteps && currentStepIndex < scenario.dialogueSteps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      setSelectedOptionIndex(null);
      setDialogueFeedback(null);
    }
  };

  const handleResetDialogue = () => {
    setCurrentStepIndex(0);
    setSelectedOptionIndex(null);
    setDialogueFeedback(null);
  };

  const getScenarioIcon = (id: string) => {
    if (id.includes('form')) return FileText;
    if (id.includes('supermarket')) return ShoppingBag;
    if (id.includes('restaurant')) return UtensilsCrossed;
    if (id.includes('station')) return Train;
    if (id.includes('doctor')) return Stethoscope;
    return Hotel;
  };

  return (
    <div className="space-y-6" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Intro Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 flex items-start justify-between gap-4 flex-wrap shadow-sm">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Real-Life Action Simulators & Bürokratie</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white font-arabic">
            محاكاة مواقف الحياة اليومية والبيروقراطية الألمانية
          </h2>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl font-arabic leading-[1.8] font-medium">
            تعلم كيفاش تعمر استمارة التسجيل (Anmeldung)، تسلك راسك فـ ليدل، تطلب فـ الريسطو، وتفهم إعلانات القطارات.
          </p>
        </div>
      </div>

      {/* Scenario Selector Carousel (Bento Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {SIMULATOR_SCENARIOS.map((sc) => {
          const isSelected = sc.id === selectedScenarioId;
          const isDone = completedSimulatorIds.includes(sc.id);
          const IconComponent = getScenarioIcon(sc.id);

          return (
            <button
              key={sc.id}
              type="button"
              onClick={() => handleScenarioSelect(sc.id)}
              className={`p-4 rounded-3xl border text-left rtl:text-right transition-all flex flex-col justify-between h-32 relative shadow-xs ${
                isSelected
                  ? 'bg-emerald-950/40 border-emerald-500 shadow-md ring-1 ring-emerald-500/30'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 text-slate-300'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                </div>
                {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">
                  {sc.level}
                </span>
                <bdi dir="ltr" className="text-xs font-bold text-white line-clamp-2 mt-0.5 font-mono block">
                  {sc.titleGerman}
                </bdi>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Simulator Workspace */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        {/* Scenario Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 gap-4 flex-wrap">
          <div>
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
              {scenario.level} • {scenario.location}
            </span>
            <bdi dir="ltr" className="text-xl sm:text-2xl font-black text-white font-mono mt-1 block">
              {scenario.titleGerman}
            </bdi>
            <p className="text-xs sm:text-sm text-slate-300 font-arabic mt-1 font-medium">
              {language === 'darija'
                ? scenario.descriptionDarija
                : language === 'ar'
                ? scenario.descriptionArabic
                : scenario.descriptionEnglish}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-bold">
              +{scenario.xpReward} XP
            </span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* CASE 1: BUREAUCRACY FORM FILLER */}
        {/* ======================================================== */}
        {scenario.type === 'form' && scenario.formProfile && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Character Profile Card */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-2xl border border-emerald-500/30">
                  🇲🇦
                </div>
                <div>
                  <h4 className="text-base font-bold text-white font-arabic">
                    بروفيل بوشعيب (Bouchaib)
                  </h4>
                  <span className="text-xs text-emerald-400 font-mono">Personalausweis-Daten</span>
                </div>
              </div>

              <div className="p-3.5 bg-amber-950/30 border border-amber-500/30 rounded-2xl text-xs sm:text-sm text-amber-200 font-arabic leading-[1.8]">
                {scenario.formProfile.storyTipDarija}
              </div>

              <div className="space-y-2.5 text-xs font-mono bg-slate-900/70 p-4 rounded-2xl border border-slate-800/80">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Nachname (الكنية):</span>
                  <bdi dir="ltr" className="text-white font-bold">{scenario.formProfile.family}</bdi>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Vorname (الاسم الشخصي):</span>
                  <bdi dir="ltr" className="text-white font-bold">{scenario.formProfile.givenName}</bdi>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Geburtsdatum (الازدياد):</span>
                  <bdi dir="ltr" className="text-white">{scenario.formProfile.birthDate}</bdi>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Geburtsort (مكان الازدياد):</span>
                  <bdi dir="ltr" className="text-white">{scenario.formProfile.birthPlace}</bdi>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Staatsangehörigkeit (الجنسية):</span>
                  <bdi dir="ltr" className="text-white">{scenario.formProfile.nationality}</bdi>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Familienstand (الحالة العائلية):</span>
                  <bdi dir="ltr" className="text-white">{scenario.formProfile.maritalStatus}</bdi>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setFormData({
                    nachname: 'El Idrissi',
                    vorname: 'Bouchaib',
                    geburtsdatum: '1998-07-15',
                    geburtsort: 'Casablanca',
                    staatsangehoerigkeit: 'marokkanisch',
                    familienstand: 'ledig',
                    adresse: 'Sonnenallee 42, 12045 Berlin',
                  })
                }
                className="w-full py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors font-arabic"
              >
                تعبئة تلقائية من أوراق بوشعيب (Autofill)
              </button>
            </div>

            {/* Official Registration Form */}
            <div className="lg:col-span-2 bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-5">
              <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-emerald-400 font-mono font-bold">
                    Amtliches Formular
                  </span>
                  <bdi dir="ltr" className="text-lg sm:text-xl font-bold text-white font-mono block">
                    Anmeldung bei der Meldebehörde
                  </bdi>
                </div>
                <span className="text-2xl">🏛️</span>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 font-arabic">
                      1. <bdi dir="ltr" className="font-mono text-emerald-400">Nachname</bdi> (Familienname / الكنية) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="z.B. El Idrissi"
                      value={formData.nachname}
                      onChange={(e) => setFormData({ ...formData, nachname: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 font-arabic">
                      2. <bdi dir="ltr" className="font-mono text-emerald-400">Vorname</bdi> (Rufname / الاسم الشخصي) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="z.B. Bouchaib"
                      value={formData.vorname}
                      onChange={(e) => setFormData({ ...formData, vorname: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 font-arabic">
                      3. <bdi dir="ltr" className="font-mono text-emerald-400">Geburtsdatum</bdi>
                    </label>
                    <input
                      type="date"
                      value={formData.geburtsdatum}
                      onChange={(e) => setFormData({ ...formData, geburtsdatum: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 font-arabic">
                      4. <bdi dir="ltr" className="font-mono text-emerald-400">Geburtsort</bdi> (المدينة)
                    </label>
                    <input
                      type="text"
                      placeholder="Casablanca"
                      value={formData.geburtsort}
                      onChange={(e) => setFormData({ ...formData, geburtsort: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 font-arabic">
                      5. <bdi dir="ltr" className="font-mono text-emerald-400">Familienstand</bdi>
                    </label>
                    <select
                      value={formData.familienstand}
                      onChange={(e) => setFormData({ ...formData, familienstand: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                    >
                      <option value="ledig">ledig (عازب)</option>
                      <option value="verheiratet">verheiratet (متزوج)</option>
                      <option value="geschieden">geschieden (مطلق)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 font-arabic">
                    6. <bdi dir="ltr" className="font-mono text-emerald-400">Neue Wohnung</bdi> (Straße, Hausnummer, PLZ / العنوان ببرلين) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="z.B. Sonnenallee 42, 12045 Berlin"
                    value={formData.adresse}
                    onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {formFeedback && (
                  <div
                    className={`p-4 sm:p-5 rounded-2xl border text-sm font-arabic leading-[1.8] flex items-start gap-3.5 shadow-sm ${
                      formFeedback.isSuccess
                        ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                        : 'bg-red-950/40 border-red-500 text-red-200'
                    }`}
                  >
                    {formFeedback.isSuccess ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    )}
                    <span>{formFeedback.message}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-base shadow-lg shadow-emerald-950/40 transition-all font-arabic btn-tactile-emerald"
                >
                  تقديم الاستمارة للموظف الألماني (Formular einreichen)
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* CASE 2: DIALOGUE ROLEPLAY SIMULATOR */}
        {/* ======================================================== */}
        {scenario.type === 'dialogue' && scenario.dialogueSteps && (
          <div className="space-y-6">
            {/* Step Counter */}
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>
                Schritt {currentStepIndex + 1} von {scenario.dialogueSteps.length}
              </span>
              <button
                type="button"
                onClick={handleResetDialogue}
                className="hover:text-slate-200 flex items-center gap-1 font-arabic"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة المحادثة</span>
              </button>
            </div>

            {/* NPC Speech Card */}
            {(() => {
              const currentStep = scenario.dialogueSteps[currentStepIndex];
              return (
                <div className="space-y-5">
                  <div className="p-5 sm:p-6 rounded-3xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-4 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-800 text-2xl flex items-center justify-center shrink-0 border border-slate-700">
                        {currentStep.avatar}
                      </div>
                      <div>
                        <span className="text-xs font-black uppercase text-amber-400 font-mono block">
                          {currentStep.speaker}
                        </span>
                        <bdi dir="ltr" className="text-base sm:text-lg font-bold text-white font-mono mt-1 block">
                          "{currentStep.npcSpeechGerman}"
                        </bdi>
                        <p className="text-xs sm:text-sm text-slate-300 font-arabic mt-1.5 font-medium leading-relaxed">
                          {language === 'darija'
                            ? currentStep.npcSpeechDarija
                            : language === 'ar'
                            ? currentStep.npcSpeechArabic
                            : currentStep.npcSpeechEnglish}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0">
                      <AudioPlayButton
                        text={currentStep.npcSpeechGerman}
                        showSyllables={false}
                        size="md"
                      />
                    </div>
                  </div>

                  {/* User Response Options */}
                  <div className="space-y-3 pt-2">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-arabic">
                      شنو غادي تجاوب يا بوشعيب؟ (Wähle deine Antwort):
                    </h5>

                    <div className="space-y-3">
                      {currentStep.options.map((opt, idx) => {
                        const isChosen = selectedOptionIndex === idx;
                        let btnStyle = 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-200';
                        if (selectedOptionIndex !== null) {
                          if (opt.isAppropriate) {
                            btnStyle = 'bg-emerald-950/50 border-emerald-500 text-emerald-200 font-bold';
                          } else if (isChosen && !opt.isAppropriate) {
                            btnStyle = 'bg-red-950/50 border-red-500 text-red-200';
                          }
                        }

                        return (
                          <div
                            key={idx}
                            role="button"
                            tabIndex={selectedOptionIndex !== null ? -1 : 0}
                            onClick={() => {
                              if (selectedOptionIndex === null) {
                                handleDialogueChoice(idx);
                              }
                            }}
                            onKeyDown={(e) => {
                              if ((e.key === 'Enter' || e.key === ' ') && selectedOptionIndex === null) {
                                e.preventDefault();
                                handleDialogueChoice(idx);
                              }
                            }}
                            className={`w-full p-4 sm:p-5 rounded-2xl border text-left rtl:text-right transition-all flex items-start justify-between gap-4 cursor-pointer select-none ${btnStyle}`}
                          >
                            <div className="space-y-1 flex-1">
                              <bdi dir="ltr" className="text-sm sm:text-base font-bold font-mono text-white block">
                                {opt.textGerman}
                              </bdi>
                              <p className="text-xs sm:text-sm text-slate-300 font-arabic font-medium leading-relaxed">
                                {language === 'darija'
                                  ? opt.textDarija
                                  : language === 'ar'
                                  ? opt.textArabic
                                  : opt.textEnglish}
                              </p>
                            </div>

                            <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
                              <AudioPlayButton text={opt.textGerman} showSyllables={false} size="sm" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Feedback Card */}
                  {dialogueFeedback && (
                    <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 shadow-md">
                      <div className="text-sm sm:text-base text-slate-200 font-arabic leading-[1.8] font-medium">
                        {dialogueFeedback}
                      </div>

                      {currentStepIndex < scenario.dialogueSteps.length - 1 ? (
                        <button
                          type="button"
                          onClick={handleNextDialogueStep}
                          className="px-6 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm font-arabic shadow-md transition-all btn-tactile-emerald"
                        >
                          المرحلة الموالية ➔
                        </button>
                      ) : (
                        <div className="text-xs sm:text-sm text-emerald-400 font-bold font-arabic flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5" />
                          <span>سالينا هاد السيناريو بنجاح! +{scenario.xpReward} XP فـ جيبك!</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};
