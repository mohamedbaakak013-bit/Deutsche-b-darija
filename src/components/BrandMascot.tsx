import React from 'react';

// 1. BRAND EMBLEM: Moroccan Mint Tea Berrad + Bauhaus Spectacles + Bavarian Brezel
export const BrandLogo: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 40,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm select-none"
      >
        {/* Moroccan Zellige 8-point star background badge */}
        <rect
          x="12"
          y="12"
          width="76"
          height="76"
          rx="18"
          fill="#FFB800"
          stroke="#111827"
          strokeWidth="3.5"
        />
        <rect
          x="12"
          y="12"
          width="76"
          height="76"
          rx="18"
          transform="rotate(45 50 50)"
          fill="#2563EB"
          stroke="#111827"
          strokeWidth="3.5"
          opacity="0.9"
        />
        <circle cx="50" cy="50" r="32" fill="#F6F2EA" stroke="#111827" strokeWidth="3" />

        {/* Moroccan Berrad Teapot Body */}
        <path
          d="M38 64 C38 70 62 70 62 64 L65 46 C65 42 35 42 35 46 Z"
          fill="#111827"
        />
        {/* Berrad Spout */}
        <path
          d="M35 48 C27 46 25 36 29 34 C31 32 35 38 37 42"
          fill="none"
          stroke="#111827"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Berrad Handle */}
        <path
          d="M64 45 C73 45 74 60 63 62"
          fill="none"
          stroke="#111827"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Berrad Golden Lid */}
        <path
          d="M40 42 L60 42 L55 36 L45 36 Z"
          fill="#FFB800"
          stroke="#111827"
          strokeWidth="2"
        />
        <circle cx="50" cy="33" r="3" fill="#FF3366" />

        {/* Bauhaus Round Glasses */}
        <circle cx="44" cy="52" r="5" fill="#FFFFFF" stroke="#00D68F" strokeWidth="2.5" />
        <circle cx="56" cy="52" r="5" fill="#FFFFFF" stroke="#00D68F" strokeWidth="2.5" />
        <line x1="49" y1="52" x2="51" y2="52" stroke="#111827" strokeWidth="2" />
        <circle cx="45" cy="52" r="2" fill="#111827" />
        <circle cx="57" cy="52" r="2" fill="#111827" />

        {/* Bavarian Pretzel / Mint Leaf Detail in Center */}
        <path
          d="M47 62 C48 60 52 60 53 62"
          stroke="#FFB800"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

// 2. MASCOT: Ostaz Bouchaib (Moroccan Tarbouch Fez + German Bauhaus Suspenders)
export const OstazBouchaibMascot: React.FC<{
  mood?: 'teaching' | 'happy' | 'thinking';
  size?: number;
  className?: string;
}> = ({ mood = 'teaching', size = 90, className = '' }) => {
  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full select-none"
      >
        {/* Head Shadow */}
        <ellipse cx="60" cy="110" rx="36" ry="6" fill="#111827" opacity="0.15" />

        {/* Moroccan Fez / Tarbouch with Tassel */}
        <path
          d="M44 42 L76 42 L72 18 L48 18 Z"
          fill="#FF3366"
          stroke="#111827"
          strokeWidth="3"
        />
        <line
          x1="60"
          y1="18"
          x2="78"
          y2="28"
          stroke="#111827"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="79" cy="30" r="3" fill="#111827" />

        {/* Head */}
        <circle
          cx="60"
          cy="66"
          r="26"
          fill="#FFE0B2"
          stroke="#111827"
          strokeWidth="3.5"
        />

        {/* Big Bauhaus Round Spectacles */}
        <circle cx="50" cy="64" r="9" fill="#FFFFFF" stroke="#111827" strokeWidth="3" />
        <circle cx="70" cy="64" r="9" fill="#FFFFFF" stroke="#111827" strokeWidth="3" />
        <line x1="59" y1="64" x2="61" y2="64" stroke="#111827" strokeWidth="3" />

        {/* Pupils */}
        {mood === 'happy' ? (
          <>
            <path
              d="M46 65 Q50 60 54 65"
              stroke="#111827"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M66 65 Q70 60 74 65"
              stroke="#111827"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </>
        ) : (
          <>
            <circle cx="51" cy="64" r="3.5" fill="#2563EB" />
            <circle cx="52" cy="63" r="1.2" fill="#FFFFFF" />
            <circle cx="71" cy="64" r="3.5" fill="#2563EB" />
            <circle cx="72" cy="63" r="1.2" fill="#FFFFFF" />
          </>
        )}

        {/* Famous Moroccan Mustache */}
        <path
          d="M48 76 C52 74 58 76 60 78 C62 76 68 74 72 76 C70 81 50 81 48 76 Z"
          fill="#111827"
        />

        {/* Smile */}
        <path
          d="M52 82 Q60 88 68 82"
          fill="none"
          stroke="#111827"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Shirt & German Bauhaus Suspenders */}
        <path
          d="M36 94 C36 88 48 88 60 88 C72 88 84 88 84 94 L88 112 L32 112 Z"
          fill="#F6F2EA"
          stroke="#111827"
          strokeWidth="3.5"
        />
        {/* Left Suspender (Autobahn Gold) */}
        <rect
          x="44"
          y="88"
          width="6"
          height="24"
          fill="#FFB800"
          stroke="#111827"
          strokeWidth="2"
        />
        {/* Right Suspender (Majorelle Cobalt) */}
        <rect
          x="70"
          y="88"
          width="6"
          height="24"
          fill="#2563EB"
          stroke="#111827"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};

// 3. MASCOT: The Umlaut Monster (Ä, Ö, Ü)
export const UmlautMonster: React.FC<{
  reaction?: 'neutral' | 'happy' | 'shocked';
  size?: number;
  className?: string;
}> = ({ reaction = 'neutral', size = 80, className = '' }) => {
  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full select-none"
      >
        {/* Shadow */}
        <ellipse cx="50" cy="92" rx="28" ry="5" fill="#111827" opacity="0.15" />

        {/* The Famous Floating Umlaut Dots (Two playful horns) */}
        <circle
          cx="38"
          cy="20"
          r="6"
          fill="#FF3366"
          stroke="#111827"
          strokeWidth="2.5"
          className={reaction === 'happy' ? 'animate-bounce' : ''}
        />
        <circle
          cx="62"
          cy="20"
          r="6"
          fill="#FF3366"
          stroke="#111827"
          strokeWidth="2.5"
          className={reaction === 'happy' ? 'animate-bounce' : ''}
        />
        <line x1="38" y1="26" x2="38" y2="34" stroke="#111827" strokeWidth="2.5" />
        <line x1="62" y1="26" x2="62" y2="34" stroke="#111827" strokeWidth="2.5" />

        {/* Monster Body (Bauhaus Emerald Mint Blob) */}
        <path
          d="M24 60 C24 40 36 34 50 34 C64 34 76 40 76 60 C76 80 66 88 50 88 C34 88 24 80 24 60 Z"
          fill="#00D68F"
          stroke="#111827"
          strokeWidth="3.5"
        />

        {/* Eyes */}
        {reaction === 'shocked' ? (
          <>
            <circle cx="40" cy="56" r="8" fill="#FFFFFF" stroke="#111827" strokeWidth="2.5" />
            <circle cx="60" cy="56" r="8" fill="#FFFFFF" stroke="#111827" strokeWidth="2.5" />
            <circle cx="40" cy="56" r="2.5" fill="#111827" />
            <circle cx="60" cy="56" r="2.5" fill="#111827" />
            {/* Sweat Drop */}
            <path
              d="M78 48 C78 44 82 40 82 40 C82 40 86 44 86 48 C86 51 82 52 78 48 Z"
              fill="#2563EB"
            />
            {/* Wobbly mouth */}
            <path
              d="M42 74 Q50 68 58 74"
              stroke="#111827"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </>
        ) : reaction === 'happy' ? (
          <>
            <path
              d="M34 56 Q40 48 46 56"
              stroke="#111827"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M54 56 Q60 48 66 56"
              stroke="#111827"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            {/* Big Open Cheerful Mouth */}
            <path
              d="M40 68 Q50 82 60 68 Z"
              fill="#FF3366"
              stroke="#111827"
              strokeWidth="2.5"
            />
          </>
        ) : (
          <>
            <circle cx="40" cy="56" r="6" fill="#FFFFFF" stroke="#111827" strokeWidth="2.5" />
            <circle cx="60" cy="56" r="6" fill="#FFFFFF" stroke="#111827" strokeWidth="2.5" />
            <circle cx="42" cy="56" r="2.5" fill="#111827" />
            <circle cx="62" cy="56" r="2.5" fill="#111827" />
            {/* Cute Smile */}
            <path
              d="M44 70 Q50 76 56 70"
              stroke="#111827"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </>
        )}
      </svg>
    </div>
  );
};

// 4. ZELLIGE 8-POINT STAR BADGE
export const ZelligeStar: React.FC<{ size?: number; className?: string; color?: string }> = ({
  size = 24,
  className = '',
  color = '#FFB800',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="2"
        fill={color}
        stroke="#111827"
        strokeWidth="1.5"
      />
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="2"
        transform="rotate(45 12 12)"
        fill={color}
        stroke="#111827"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="3" fill="#111827" />
    </svg>
  );
};
