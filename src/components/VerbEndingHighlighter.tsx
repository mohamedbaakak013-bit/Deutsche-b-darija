import React from 'react';
import { VerbConjugation, Language } from '../types.ts';
import { AudioPlayButton } from './AudioPlayButton.tsx';

interface VerbEndingHighlighterProps {
  data: VerbConjugation;
  language: Language;
}

export const VerbEndingHighlighter: React.FC<VerbEndingHighlighterProps> = ({
  data,
  language,
}) => {
  const getMeaning = () => {
    if (language === 'darija') return data.meaningDarija;
    if (language === 'ar') return data.meaningArabic;
    return data.meaningEnglish;
  };

  const getPronounMeaning = (form: VerbConjugation['forms'][0]) => {
    if (language === 'darija') return form.pronounDarija;
    if (language === 'ar') return form.pronounArabic;
    return form.pronounEnglish;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
        <div>
          <div className="flex items-center gap-2">
            <bdi dir="ltr" className="text-xl font-black text-slate-900 font-mono">
              {data.verb}
            </bdi>
            <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-mono">
              Stamm: <strong>{data.stem}</strong>
            </span>
          </div>
          <p className="text-xs text-slate-500 font-arabic mt-1">{getMeaning()}</p>
        </div>
        <AudioPlayButton text={data.verb} size="sm" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {data.forms.map((form, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200/60"
          >
            <div className="flex items-center gap-2">
              <div className="w-16">
                <bdi dir="ltr" className="text-slate-800 font-mono text-xs font-bold block">
                  {form.pronoun}
                </bdi>
                <span className="text-[10px] text-slate-500 font-arabic">
                  {getPronounMeaning(form)}
                </span>
              </div>

              <bdi dir="ltr" className="font-mono text-sm tracking-wide">
                <span className="text-slate-700">{form.stem}</span>
                <span className="text-red-600 font-black text-base">-{form.ending}</span>
              </bdi>
            </div>

            <AudioPlayButton text={form.full} size="sm" />
          </div>
        ))}
      </div>
    </div>
  );
};
