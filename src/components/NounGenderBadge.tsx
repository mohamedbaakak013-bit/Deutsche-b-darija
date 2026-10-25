import React from 'react';
import { GrammaticalGender } from '../types.ts';

interface NounGenderBadgeProps {
  article: 'der' | 'die' | 'das';
  noun: string;
  gender?: GrammaticalGender;
  plural?: string;
  meaning?: string;
  size?: 'sm' | 'md';
}

export const GENDER_STYLES: Record<
  GrammaticalGender,
  {
    bg: string;
    text: string;
    border: string;
    badgeBg: string;
    badgeText: string;
  }
> = {
  der: {
    bg: 'bg-blue-50/80',
    text: 'text-blue-900',
    border: 'border-blue-200',
    badgeBg: 'bg-blue-600',
    badgeText: 'text-white',
  },
  die: {
    bg: 'bg-pink-50/80',
    text: 'text-pink-900',
    border: 'border-pink-200',
    badgeBg: 'bg-pink-600',
    badgeText: 'text-white',
  },
  das: {
    bg: 'bg-emerald-50/80',
    text: 'text-emerald-900',
    border: 'border-emerald-200',
    badgeBg: 'bg-emerald-600',
    badgeText: 'text-white',
  },
  die_pl: {
    bg: 'bg-purple-50/80',
    text: 'text-purple-900',
    border: 'border-purple-200',
    badgeBg: 'bg-purple-600',
    badgeText: 'text-white',
  },
};

export const NounGenderBadge: React.FC<NounGenderBadgeProps> = ({
  article,
  noun,
  gender,
  plural,
  meaning,
  size = 'md',
}) => {
  const resolvedGender: GrammaticalGender =
    gender || (article === 'der' ? 'der' : article === 'das' ? 'das' : 'die');
  const style = GENDER_STYLES[resolvedGender] || GENDER_STYLES.der;

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-xl border ${style.border} ${style.bg} ${
        size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm'
      }`}
    >
      <bdi dir="ltr" className="inline-flex items-center gap-1.5 font-mono">
        <span
          className={`px-1.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${style.badgeBg} ${style.badgeText}`}
        >
          {article}
        </span>
        <span className={`font-semibold ${style.text}`}>{noun}</span>
        {plural && <span className="text-[11px] text-slate-500 font-sans">({plural})</span>}
      </bdi>

      {meaning && (
        <span className="text-xs text-slate-600 border-l border-slate-200 rtl:border-l-0 rtl:border-r rtl:pr-2 rtl:mr-1 pl-2 ml-1 font-arabic">
          {meaning}
        </span>
      )}
    </div>
  );
};
