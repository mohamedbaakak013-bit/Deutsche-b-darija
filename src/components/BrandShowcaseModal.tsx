import React from 'react';
import { X, Sparkles, Check, Volume2, Shield, Palette } from 'lucide-react';
import { BrandLogo, OstazBouchaibMascot, UmlautMonster, ZelligeStar } from './BrandMascot.tsx';
import { sound } from '../utils/soundEngine.ts';

interface BrandShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandShowcaseModal: React.FC<BrandShowcaseModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const colorSwatches = [
    {
      name: 'Majorelle Cobalt',
      hex: '#2563EB',
      role: 'Brand Primary & Masculine Gender (der)',
      arabic: 'أزرق ماجوريل المراكشي — أداة التذكير (der)',
    },
    {
      name: 'Autobahn Saffron Gold',
      hex: '#FFB800',
      role: 'Active Waypoints, XP Coins & Highlights',
      arabic: 'زعفران الأوتوبان الذهبي — نقاط الخبرة والتميز',
    },
    {
      name: 'Berliner Pop Coral',
      hex: '#FF3366',
      role: 'Feminine Gender (die), Verb Endings & Hot Streaks',
      arabic: 'مرجان برلين الحيوي — أداة التأنيث (die) ونهايات الأفعال',
    },
    {
      name: 'Atay Mint Emerald',
      hex: '#00D68F',
      role: 'Neuter Gender (das) & Verified Nodes',
      arabic: 'نعناع الأتاي المغربي — أداة المحايد (das) والنجاح',
    },
    {
      name: 'Royal Zellige Purple',
      hex: '#8B5CF6',
      role: 'Plural Gender (die_pl) & B2 Fluency Mastery',
      arabic: 'أرجوان الزليج الفاسي — الجمع ومستوى الاحتراف B2',
    },
    {
      name: 'Warm Bauhaus Cream',
      hex: '#F6F2EA',
      role: 'Primary Canvas Background with Zellige Grid',
      arabic: 'كريم الباوهاوس الدافئ — خلفية الشاشة الهادئة',
    },
    {
      name: 'Tactile Ink Shadow',
      hex: '#111827',
      role: '2.5px Solid Borders & Hard 3D Bottom Shadows',
      arabic: 'حبر النيو-بروتاليزم — حدود 3D ملموسة وضغطات واقعية',
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs transition-opacity overflow-y-auto"
      onClick={() => {
        sound.playTap();
        onClose();
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#F6F2EA] rounded-3xl border-neo shadow-neo p-5 sm:p-7 max-h-[92vh] overflow-y-auto my-auto"
      >
        {/* Header with Title and Close Button */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b-2 border-slate-900/15">
          <div className="flex items-center gap-3">
            <BrandLogo size={48} />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold bg-[#FFB800] text-slate-950 px-2 py-0.5 rounded-md border border-slate-900">
                  PORTFOLIO SHOWCASE
                </span>
                <span className="text-xs font-mono text-slate-600">v2.5</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 font-bauhaus tracking-tight">
                Bauhaus × Moroccan Zellige Identity
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              sound.playTap();
              onClose();
            }}
            aria-label="Close"
            className="w-10 h-10 rounded-xl bg-white border-neo shadow-neo-sm flex items-center justify-center hover:bg-slate-100 active:translate-y-1 cursor-pointer transition-all"
          >
            <X className="w-5 h-5 text-slate-900" />
          </button>
        </div>

        {/* 1. CONCEPT & PHILOSOPHY */}
        <section className="mb-6 bg-white p-4 sm:p-5 rounded-2xl border-neo shadow-neo-sm">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-950 font-bauhaus uppercase mb-2">
            <Sparkles className="w-4 h-4 text-[#FFB800]" />
            <span>01. The Design Manifesto</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans mb-3">
            <strong>"Deutsch b'Darija"</strong> repudiates boring, flat AI templates. We engineered a hybrid aesthetic fusing <strong>Weimar 1919 Bauhaus functional minimalism</strong> (primary geometry, heavy ink lines, tactile physical affordances) with the <strong>geometric mathematics of Moroccan Zellige</strong> (8-point celestial stars, rich Majorelle Cobalt, Atay Mint, and Saffron Gold).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono text-slate-700">
            <div className="p-2.5 bg-[#F6F2EA] rounded-xl border border-slate-900/20">
              <span className="font-bold block text-slate-950">📐 Strict Geometry</span>
              Circles, octagons, and 2.5px ink lines.
            </div>
            <div className="p-2.5 bg-[#F6F2EA] rounded-xl border border-slate-900/20">
              <span className="font-bold block text-slate-950">☕ Cultural Soul</span>
              Mint Tea Berrad + Bavarian Brezel fusion.
            </div>
            <div className="p-2.5 bg-[#F6F2EA] rounded-xl border border-slate-900/20">
              <span className="font-bold block text-slate-950">⚡ Tactile 3D</span>
              Heavy 6px box-shadows that physically depress.
            </div>
          </div>
        </section>

        {/* 2. LOGO CONSTRUCTION BREAKDOWN */}
        <section className="mb-6 bg-white p-4 sm:p-5 rounded-2xl border-neo shadow-neo-sm">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-950 font-bauhaus uppercase mb-3">
            <Shield className="w-4 h-4 text-[#2563EB]" />
            <span>02. Logo Construction Anatomy</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="p-4 bg-[#F6F2EA] rounded-2xl border-neo flex items-center justify-center shrink-0">
              <BrandLogo size={80} />
            </div>
            <div className="space-y-2 text-xs text-slate-700 flex-1">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-md bg-[#FFB800] text-slate-950 flex items-center justify-center font-bold font-mono text-[11px] shrink-0">
                  1
                </span>
                <span><strong>The 8-Point Zellige Star:</strong> Moroccan interlocking squares rotated at 45° representing geometric mastery and cultural identity.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-md bg-[#111827] text-white flex items-center justify-center font-bold font-mono text-[11px] shrink-0">
                  2
                </span>
                <span><strong>The Moroccan Berrad (Teapot):</strong> Handcrafted silver silhouette serving warm hospitality and wisdom.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-md bg-[#00D68F] text-slate-950 flex items-center justify-center font-bold font-mono text-[11px] shrink-0">
                  3
                </span>
                <span><strong>Bauhaus Spectacles:</strong> Clean round lenses symbolizing razor-sharp German grammar precision.</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. COLOR SYSTEM & GRAMMAR ASSIGNMENT */}
        <section className="mb-6 bg-white p-4 sm:p-5 rounded-2xl border-neo shadow-neo-sm">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-950 font-bauhaus uppercase mb-3">
            <Palette className="w-4 h-4 text-[#FF3366]" />
            <span>03. Color Architecture & Grammatical Roles</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {colorSwatches.map((swatch) => (
              <div
                key={swatch.name}
                className="flex items-center gap-3 p-2.5 bg-[#F6F2EA] rounded-xl border border-slate-900/20"
              >
                <div
                  className="w-10 h-10 rounded-xl border-2 border-slate-950 shrink-0 shadow-xs"
                  style={{ backgroundColor: swatch.hex }}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-950 truncate">
                      {swatch.name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {swatch.hex}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-1">{swatch.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. MASCOT EXPRESSIONS */}
        <section className="mb-6 bg-white p-4 sm:p-5 rounded-2xl border-neo shadow-neo-sm">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-950 font-bauhaus uppercase mb-3">
            <Volume2 className="w-4 h-4 text-[#8B5CF6]" />
            <span>04. Mascot Character Rig</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 bg-[#F6F2EA] rounded-xl border border-slate-900/20 flex flex-col items-center">
              <OstazBouchaibMascot mood="teaching" size={60} />
              <span className="text-xs font-bold text-slate-900 mt-2 font-arabic">أستاذ بوشعيب</span>
              <span className="text-[10px] text-slate-500 font-mono">Teaching Mode</span>
            </div>
            <div className="p-3 bg-[#F6F2EA] rounded-xl border border-slate-900/20 flex flex-col items-center">
              <OstazBouchaibMascot mood="happy" size={60} />
              <span className="text-xs font-bold text-slate-900 mt-2 font-arabic">مبروك عليك!</span>
              <span className="text-[10px] text-slate-500 font-mono">Celebration</span>
            </div>
            <div className="p-3 bg-[#F6F2EA] rounded-xl border border-slate-900/20 flex flex-col items-center">
              <UmlautMonster reaction="neutral" size={54} />
              <span className="text-xs font-bold text-slate-900 mt-2 font-bauhaus">Umlaut (Ä, Ö, Ü)</span>
              <span className="text-[10px] text-slate-500 font-mono">Ready to Train</span>
            </div>
            <div className="p-3 bg-[#F6F2EA] rounded-xl border border-slate-900/20 flex flex-col items-center">
              <UmlautMonster reaction="shocked" size={54} />
              <span className="text-xs font-bold text-slate-900 mt-2 font-arabic">رد بالك من الفخ!</span>
              <span className="text-[10px] text-slate-500 font-mono">Trap Alert</span>
            </div>
          </div>
        </section>

        {/* 5. TACTILE COMPONENT TEST PLAYGROUND */}
        <section className="bg-white p-4 sm:p-5 rounded-2xl border-neo shadow-neo-sm">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-950 font-bauhaus uppercase mb-2">
            <Check className="w-4 h-4 text-[#00D68F]" />
            <span>05. Interactive 3D Physics Test</span>
          </div>
          <p className="text-xs text-slate-600 mb-4">
            Test the physical 3D bounce and Web Audio API feedback below:
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => sound.playTap()}
              className="btn-neo py-2.5 px-4 rounded-xl bg-[#2563EB] text-white font-bold text-xs font-mono cursor-pointer"
            >
              Test Tap SFX
            </button>
            <button
              type="button"
              onClick={() => sound.playSuccess()}
              className="btn-neo py-2.5 px-4 rounded-xl bg-[#00D68F] text-slate-950 font-bold text-xs font-mono cursor-pointer"
            >
              Test Victory Arpeggio
            </button>
            <button
              type="button"
              onClick={() => sound.playMistake()}
              className="btn-neo py-2.5 px-4 rounded-xl bg-[#FF3366] text-white font-bold text-xs font-mono cursor-pointer"
            >
              Test Mistake Boing
            </button>
            <button
              type="button"
              onClick={() => sound.playLevelUp()}
              className="btn-neo py-2.5 px-4 rounded-xl bg-[#FFB800] text-slate-950 font-bold text-xs font-mono cursor-pointer"
            >
              Test Level Up Fanfare
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
