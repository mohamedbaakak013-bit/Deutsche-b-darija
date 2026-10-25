# Implementation Plan: Bauhaus × Moroccan Zellige Transformation

Transform **Deutsch b'Darija (دوتش بالدارجة)** into an unforgettable, tactile, portfolio-grade educational application fusing **German Bauhaus geometry** with **Moroccan Zellige craftsmanship**.

---

## 1. Brand Identity System & Art Direction ("Bauhaus × Zellige")

### Visual Tokens & Neo-Brutalist 3D Surfaces
- **Canvas Colors**:
  - Warm Bauhaus Cream (`#F6F2EA`) for default Light Mode; Deep Obsidian (`#0D1117`) for Dark Mode.
  - Subtle inline SVG background watermark featuring geometric 8-point Moroccan Zellige stars interlocking with Bauhaus circular/triangular grids.
- **Color Palette & Grammatical Roles**:
  - **Majorelle Cobalt (`#2563EB`)**: Brand anchor & `der` masculine badges.
  - **Autobahn Saffron Gold (`#FFB800`)**: Active states, XP coins, highlights.
  - **Berliner Pop Coral (`#FF3366`)**: Verb conjugation endings, `die` feminine badges, hot streaks.
  - **Atay Mint Emerald (`#00D68F`)**: Success states, completed nodes, `das` neuter badges.
  - **Royal Zellige Purple (`#8B5CF6`)**: `die` plural badge & B2 mastery modules.
- **Physical 3D Component Tokens**:
  - Border: `2.5px solid #111827`
  - Radius: `20px` (`rounded-2xl` to `rounded-3xl`)
  - Tactile Shadow: `box-shadow: 0 6px 0 #111827`
  - Hover Transition: `translateY(-3px)`, shadow expands to `0 9px 0 #111827`
  - Active Press: `translateY(5px)`, shadow compresses to `0 1px 0 #111827`
- **Typography & Font Pairing**:
  - Display / Headlines: Google Fonts `'Readex Pro'` and `'Cairo'` for Arabic/Darija; `'Space Grotesk'` for German Bauhaus titles.
  - Body & Data: `'Plus Jakarta Sans'` for clear reading; `'JetBrains Mono'` for tabular numerals and phonetic guides.
- **Custom Inline SVG Art & Mascots**:
  - **Brand Logo**: Geometric fusion of a traditional Moroccan teapot (*Berrad*), Bauhaus round spectacles, and a Bavarian *Brezel* in black, red, gold, and mint.
  - **Mascot: "Ostaz Bouchaib"**: Illustrated Moroccan teacher with German suspenders and animated eyes/arms that celebrate or react.
  - **Mascot: "The Umlaut Monster" (Ä, Ö, Ü)**: Playful geometric blob monster whose expressive eyes widen on correct answers and sweat/wobble on incorrect answers.

---

## 2. Sound Design & Motion Engine

### A. Synthesized Web Audio API (`SoundEngine.ts`)
- Pure client-side Web Audio API synthesizer (no external MP3 downloads):
  - **`playTap()`**: Crisp 40ms high-Q woodblock/pop click for tabs, card flips, and button clicks.
  - **`playSuccess()`**: Ascending 4-tone major arpeggio (C5-E5-G5-C6) with sparkling decay + confetti burst.
  - **`playMistake()`**: Humorous cartoon downward frequency sweep ("boing/buzz").
  - **`playLevelUp()`**: Euphoric fanfare chord.
- **Global Sound Mute Toggle (`🔊 / 🔇`)** in the header.

### B. Native German Audio Synthesis (`speech.ts`)
- Dual speed controls: **🔊 1.0x (Native Speed)** and **🐢 0.6x (Slow Breakdown)**.
- Integrated animated SVG soundwave equalizer pulsing in real time while speaking.
- Server-side fallback via Gemini TTS if local browser synthesis lacks high-quality German voice packs.

---

## 3. Core Screens & Architecture

### A. Sticky Brand Header & Hero HUD
- **Emblem + Typography**: Custom SVG Brand Mark + dual-script typography.
- **Gamification HUD**:
  - Animated Flame Streak (`🔥`), spinning Zellige Star XP counter (`⭐`), and Audio Toggle (`🔊`).
  - **Tactile 3-Way Language Pill (`🇲🇦 الدارجة` | `🇸🇦 العربية` | `🇬🇧 English`)**: Switches active explanation language cleanly with zero multi-language visual clutter.
  - **"Brand Identity & UI Kit Showcase" (`🎨 Brand Identity`)**: Opens an interactive modal displaying Logo Construction geometry, Bauhaus × Zellige swatches, typography hierarchy, and mascot states.

### B. Tab 1: 🗺️ The "Casa-to-Berlin" Interactive Journey Map (Lessons A1–B2)
- **Winding Roadtrip SVG Transit Line**:
  - Sinuous animated SVG path curving down the screen, connecting level waypoints like a high-speed express route from Casablanca Mohammed V Airport to Berlin Brandenburg.
- **World Level Switcher**:
  - `🛫 A1: كازا -> برلين (The Takeoff)`
  - `🥨 A2: الحياة فـ ألمانيا (Street Survival)`
  - `⚙️ B1: بلا فلسفة (Fluency Engine)`
  - `👑 B2: معلم بالدارجة والألمانية (Boss Level)`
- **Interactive Lesson Nodes**:
  - Tactile 3D cards along the path with custom badge icons, German title, Darija/Arabic/English subtitle, XP reward tag, and `"Start / دخل تقرا"` button.
- **Complete Pre-loaded Curriculum**:
  - **A1**: Alphabet & Official Spelling Table, Pronunciation Secrets (The 3 'R's, 'ch' Chameleon, terminal b/d/g hardening), Personal Pronouns & Verb Conjugation, Der/Die/Das & Negation, Numbers/24h Clock/W-Fragen, Everyday Foods.
  - **A2**: Trennbare Verben (with interactive launch animation), Modalverben Battle, Wechselpräpositionen (Static Dativ vs. Movement Akkusativ), Reflexive Verben.
  - **B1**: Nebensätze (Verb Kickers `weil/dass/obwohl`), Zeitformen (Spoken Perfekt vs. Präteritum & Futur I).
  - **B2**: Deutsche Bürokratie (Compound noun gender rule, Einwohnermeldeamt forms), Workplace Idioms & Redewendungen.

### C. Interactive Step-by-Step Lesson Studio (`CleanLessonPlayer.tsx`)
- Distraction-free, single-card player with:
  1. **Top Progress Tracker** + Mascot cheer banner.
  2. **Slide 1 (Concept Hook)**: Comic-style card with mascot and funny cultural explanation.
  3. **Slide 2 (Interactive Lab)**: Clickable 1.0x / 0.6x audio, gender color pills, crimson verb endings, and interactive **Verb Splitter** launch button.
  4. **Slide 3 (Trap Alert)**: High-contrast Saffron warning card for common mistakes.
  5. **Slide 4 (Interactive Challenge)**: Gamified multiple choice & reordering with Web Audio feedback, mascot reactions, and celebratory XP tally.

### D. Tab 2: 🎭 Real-Life Simulators & Story Podcasts (`DialoguesTab.tsx`)
- **Simulators**:
  - *Im Supermarkt (Lidl Cashier Speedrun)*
  - *Am Bahnhof (Deutsche Bahn Delay Survival)*
  - *Im Restaurant (Schnitzel & Drink Ordering)*
  - *Beim Arzt & Apotheke*
  - *Interactive Bureaucracy Form: Anmeldung bei der Meldebehörde* with live field checks!
- **Interactive Chat Theatre**:
  - WhatsApp/Comic bubbles with speaker avatars, audio speed toggles, tap-to-reveal translation in the active language, and a **Vocabulary Loot Box**.

### E. Tab 3: 🎮 Arcade & Ostaz Bouchaib AI (`PracticeTab.tsx`)
- **Game 1: "Der / Die / Das" Arcade Blitz**:
  - 30-second countdown blitz, combo multiplier ($1\times \to 4\times$), tactile 3D Blue (`DER`), Pink (`DIE`), and Green (`DAS`) arcade buttons, screen-shake, and particle feedback.
- **Game 2: "Buchstabieren" Official German Administrative Name Speller**:
  - Input field for any user name, generating the official German spelling table (*M wie Martha, O wie Otto*) with flip-board letters and German audio pronunciation.
- **Ostaz Bouchaib AI Tutor**:
  - Styled retro-futuristic chat booth with instant prompt pills and witty, culturally grounded explanations.

---

## 4. Verification Plan
- **Type Checking & Linting**: Run `lint_applet` (`tsc --noEmit`) to verify strict TypeScript adherence with zero missing types.
- **Build Verification**: Run `compile_applet` (`npm run build`) to ensure successful Vite bundling.
- **Interactive Testing**:
  - Verify Web Audio sound engine triggers tactile clicks and victory arpeggios correctly without console errors.
  - Verify 1.0x and 0.6x German speech synthesis.
  - Verify 3-way language switching cleanly displays only the chosen language.
  - Test the "Brand Identity & UI Kit Showcase" modal for smooth presentation.
