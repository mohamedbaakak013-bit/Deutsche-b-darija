export type Language = 'darija' | 'ar' | 'en';

export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2';

export type GrammaticalGender = 'der' | 'die' | 'das' | 'die_pl';

export interface VocabItem {
  id: string;
  german: string;
  article?: 'der' | 'die' | 'das' | 'die';
  gender?: GrammaticalGender;
  plural?: string;
  syllables?: string[];
  phoneticFranco?: string;
  phoneticArabic?: string;
  darija: string;
  arabic: string;
  english: string;
  culturalNote?: {
    darija: string;
    ar: string;
    en: string;
  };
  exampleGerman?: string;
  exampleDarija?: string;
  exampleArabic?: string;
  exampleEnglish?: string;
}

export interface VerbConjugation {
  verb: string;
  meaningDarija: string;
  meaningArabic: string;
  meaningEnglish: string;
  stem: string;
  isIrregular?: boolean;
  forms: {
    pronoun: string;
    pronounArabic: string;
    pronounDarija: string;
    pronounEnglish: string;
    stem: string;
    ending: string;
    full: string;
  }[];
}

export interface QuizQuestion {
  id: string;
  questionGerman?: string;
  questionDarija: string;
  questionArabic: string;
  questionEnglish: string;
  options: {
    id: string;
    label: string;
    isCorrect: boolean;
    gender?: GrammaticalGender;
  }[];
  explanationDarija: string;
  explanationArabic: string;
  explanationEnglish: string;
}

export interface LessonSlide {
  id: string;
  type: 'intro' | 'alphabet' | 'pronunciation' | 'grammar' | 'conjugation' | 'vocab' | 'dialogue' | 'quiz';
  titleGerman: string;
  titleDarija: string;
  titleArabic: string;
  titleEnglish: string;
  storyContext?: {
    speaker: 'Bouchaib' | 'Jens' | 'Narrator';
    darija: string;
    ar: string;
    en: string;
  };
  contentDarija?: string;
  contentArabic?: string;
  contentEnglish?: string;
  highlightedRule?: {
    darija: string;
    ar: string;
    en: string;
  };
  vocabList?: VocabItem[];
  conjugationData?: VerbConjugation;
  alphabetData?: {
    letter: string;
    phonetic: string;
    germanExample: string;
    natoGerman: string; // e.g. "A wie Anton"
    darijaNote: string;
    arabicNote: string;
    englishNote: string;
  }[];
  dialogueLines?: {
    speaker: string;
    german: string;
    darija: string;
    ar: string;
    en: string;
  }[];
  quiz?: QuizQuestion;
}

export interface LessonModule {
  id: string;
  worldId: CEFRLevel;
  moduleNumber: number;
  titleGerman: string;
  titleDarija: string;
  titleArabic: string;
  titleEnglish: string;
  descriptionDarija: string;
  descriptionArabic: string;
  descriptionEnglish: string;
  iconName: string;
  xpReward: number;
  slides: LessonSlide[];
}

export interface StorySentence {
  german: string;
  darija: string;
  ar: string;
  en: string;
  highlightWords?: string[];
}

export interface StoryItem {
  id: string;
  titleGerman: string;
  titleDarija: string;
  titleArabic: string;
  titleEnglish: string;
  level: CEFRLevel;
  readTimeMinutes: number;
  topic: string;
  sentences: StorySentence[];
  keyVocab: VocabItem[];
}

export interface SimulatorScenario {
  id: string;
  type: 'form' | 'dialogue';
  titleGerman: string;
  titleDarija: string;
  titleArabic: string;
  titleEnglish: string;
  descriptionDarija: string;
  descriptionArabic: string;
  descriptionEnglish: string;
  level: CEFRLevel;
  xpReward: number;
  location: string;
  // For Form type
  formProfile?: {
    fullName: string;
    givenName: string;
    family: string;
    birthDate: string;
    birthPlace: string;
    nationality: string;
    maritalStatus: string;
    address: string;
    purpose: string;
    storyTipDarija: string;
  };
  // For Dialogue type
  dialogueSteps?: {
    step: number;
    speaker: string;
    avatar: string;
    npcSpeechGerman: string;
    npcSpeechDarija: string;
    npcSpeechArabic: string;
    npcSpeechEnglish: string;
    options: {
      textGerman: string;
      textDarija: string;
      textArabic: string;
      textEnglish: string;
      isAppropriate: boolean;
      feedbackDarija: string;
      feedbackArabic: string;
      feedbackEnglish: string;
    }[];
  }[];
}

export interface UserProgress {
  xp: number;
  streakDays: number;
  lastActiveDate: string;
  completedModuleIds: string[];
  completedSimulatorIds: string[];
  activeWorld: CEFRLevel;
  language: Language;
  audioRate: number; // 1.0 or 0.6
  derDieDasHighScore: number;
}
