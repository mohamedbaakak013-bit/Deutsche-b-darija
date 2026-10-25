import { GrammaticalGender } from '../types.ts';

export interface DerDieDasCard {
  id: string;
  noun: string;
  correctArticle: 'der' | 'die' | 'das';
  correctGender: GrammaticalGender;
  plural: string;
  meaningDarija: string;
  meaningArabic: string;
  meaningEnglish: string;
  phoneticFranco: string;
  syllables: string[];
  trapHintDarija?: string;
}

export interface LegoPuzzle {
  id: string;
  meaningDarija: string;
  meaningArabic: string;
  meaningEnglish: string;
  scrambledWords: string[];
  correctSequence: string[];
  grammarNoteDarija: string;
  grammarNoteArabic: string;
  grammarNoteEnglish: string;
}

export const DER_DIE_DAS_CARDS: DerDieDasCard[] = [
  {
    id: 'ddd-1',
    noun: 'Mädchen',
    correctArticle: 'das',
    correctGender: 'das',
    plural: 'die Mädchen',
    meaningDarija: 'البنت (محايد حيت كتسالي بـ chen!)',
    meaningArabic: 'الفتاة',
    meaningEnglish: 'girl',
    phoneticFranco: 'Meyd-shen',
    syllables: ['Mäd', 'chen'],
    trapHintDarija: 'عنداك تقول die! أي تصغير كيسالي بـ -chen كيكون das!',
  },
  {
    id: 'ddd-2',
    noun: 'Tisch',
    correctArticle: 'der',
    correctGender: 'der',
    plural: 'die Tische',
    meaningDarija: 'الطابلة / المائدة (مذكر فـ الألمانية!)',
    meaningArabic: 'الطاولة / المائدة',
    meaningEnglish: 'table',
    phoneticFranco: 'Tish',
    syllables: ['Tisch'],
    trapHintDarija: 'واخا الطابلة مؤنثة فالمغرب، فـ ألمانيا راها der Tisch!',
  },
  {
    id: 'ddd-3',
    noun: 'Sonne',
    correctArticle: 'die',
    correctGender: 'die',
    plural: 'die Sonnen',
    meaningDarija: 'الشمس (مؤنثة)',
    meaningArabic: 'الشمس',
    meaningEnglish: 'sun',
    phoneticFranco: 'Zon-neh',
    syllables: ['Son', 'ne'],
  },
  {
    id: 'ddd-4',
    noun: 'Auto',
    correctArticle: 'das',
    correctGender: 'das',
    plural: 'die Autos',
    meaningDarija: 'الطوموبيل (محايدة)',
    meaningArabic: 'السيارة',
    meaningEnglish: 'car',
    phoneticFranco: 'Ow-to',
    syllables: ['Au', 'to'],
  },
  {
    id: 'ddd-5',
    noun: 'Apfel',
    correctArticle: 'der',
    correctGender: 'der',
    plural: 'die Äpfel',
    meaningDarija: 'التفاحة (مذكرة)',
    meaningArabic: 'التفاحة',
    meaningEnglish: 'apple',
    phoneticFranco: 'Ap-fel',
    syllables: ['Ap', 'fel'],
  },
  {
    id: 'ddd-6',
    noun: 'Buch',
    correctArticle: 'das',
    correctGender: 'das',
    plural: 'die Bücher',
    meaningDarija: 'الكتاب (محايد)',
    meaningArabic: 'الكتاب',
    meaningEnglish: 'book',
    phoneticFranco: 'Bookh',
    syllables: ['Buch'],
  },
  {
    id: 'ddd-7',
    noun: 'Lampe',
    correctArticle: 'die',
    correctGender: 'die',
    plural: 'die Lampen',
    meaningDarija: 'البولة / المصباح (مؤنثة)',
    meaningArabic: 'المصباح',
    meaningEnglish: 'lamp',
    phoneticFranco: 'Lam-peh',
    syllables: ['Lam', 'pe'],
    trapHintDarija: 'الكلمات اللي كيساليو بـ -e غالباً 90% كيكونو مؤنثين die!',
  },
  {
    id: 'ddd-8',
    noun: 'Schlüssel',
    correctArticle: 'der',
    correctGender: 'der',
    plural: 'die Schlüssel',
    meaningDarija: 'الساروت (مذكر)',
    meaningArabic: 'المفتاح',
    meaningEnglish: 'key',
    phoneticFranco: 'Shloos-sel',
    syllables: ['Schlüs', 'sel'],
  },
  {
    id: 'ddd-9',
    noun: 'Zeitung',
    correctArticle: 'die',
    correctGender: 'die',
    plural: 'die Zeitungen',
    meaningDarija: 'الجريدة / الجورنال (مؤنثة)',
    meaningArabic: 'الجريدة',
    meaningEnglish: 'newspaper',
    phoneticFranco: 'Tsay-toong',
    syllables: ['Zei', 'tung'],
    trapHintDarija: 'أي كلمة كتسالي بـ -ung ديما كتكون مؤنثة die 100%!',
  },
  {
    id: 'ddd-10',
    noun: 'Handy',
    correctArticle: 'das',
    correctGender: 'das',
    plural: 'die Handys',
    meaningDarija: 'التيليفون المحمول (محايد)',
    meaningArabic: 'الهاتف المحمول',
    meaningEnglish: 'mobile phone',
    phoneticFranco: 'Hen-dee',
    syllables: ['Han', 'dy'],
  },
  {
    id: 'ddd-11',
    noun: 'Kaffee',
    correctArticle: 'der',
    correctGender: 'der',
    plural: 'die Kaffees',
    meaningDarija: 'القهوة (مذكرة)',
    meaningArabic: 'القهوة',
    meaningEnglish: 'coffee',
    phoneticFranco: 'Kaf-fay',
    syllables: ['Kaf', 'fee'],
  },
  {
    id: 'ddd-12',
    noun: 'Wasser',
    correctArticle: 'das',
    correctGender: 'das',
    plural: 'die Wässer',
    meaningDarija: 'الما (محايد)',
    meaningArabic: 'الماء',
    meaningEnglish: 'water',
    phoneticFranco: 'Vas-sah',
    syllables: ['Was', 'ser'],
  },
];

export const LEGO_PUZZLES: LegoPuzzle[] = [
  {
    id: 'lego-1',
    meaningDarija: 'بوشعيب كيتعلم الألمانية اليوم بجدية.',
    meaningArabic: 'يتعلم بوشعيب الألمانية اليوم باجتهاد.',
    meaningEnglish: 'Bouchaib is studying German diligently today.',
    scrambledWords: ['Deutsch', 'heute', 'Bouchaib', 'fleißig', 'lernt'],
    correctSequence: ['Bouchaib', 'lernt', 'heute', 'fleißig', 'Deutsch'],
    grammarNoteDarija: 'الفعل ديما خاصو يكون فـ المركز الثاني فـ الجملة الرئيسية: Bouchaib (1) -> lernt (2)!',
    grammarNoteArabic: 'الفعل المصرف يأتي دائماً في المركز الثاني في الجملة الألمانية الرئيسية.',
    grammarNoteEnglish: 'The conjugated verb MUST be placed in Position 2 in main clauses.',
  },
  {
    id: 'lego-2',
    meaningDarija: 'أنا كنفيق كل صباح مع الـ 6 د الصباح.',
    meaningArabic: 'أستيقظ كل صباح في تمام الساعة السادسة.',
    meaningEnglish: 'I wake up every morning at 6 o\'clock.',
    scrambledWords: ['stehe', 'auf', 'Ich', 'Morgen', 'jeden', 'um', '6 Uhr'],
    correctSequence: ['Ich', 'stehe', 'jeden', 'Morgen', 'um', '6 Uhr', 'auf'],
    grammarNoteDarija: 'فعل منفصل (aufstehen): stehe فـ المركز 2، والبادئة auf كتهرب لآخر كلمة فـ الجملة!',
    grammarNoteArabic: 'فعل منفصل aufstehen: يصرف stehe في المركز الثاني، وتذهب البادئة auf للنهاية.',
    grammarNoteEnglish: 'Separable verb: "stehe" takes Position 2 while prefix "auf" flies to the very end.',
  },
  {
    id: 'lego-3',
    meaningDarija: 'حنا بغينا نشربو قهيوة عفاك.',
    meaningArabic: 'نود أن نشرب قهوة من فضلك.',
    meaningEnglish: 'We would like to drink a coffee, please.',
    scrambledWords: ['trinken', 'einen', 'Wir', 'möchten', 'Kaffee', 'bitte'],
    correctSequence: ['Wir', 'möchten', 'bitte', 'einen', 'Kaffee', 'trinken'],
    grammarNoteDarija: 'مع الأفعال المساعدة (möchten)، الفعل الثاني (trinken) كيبقى فـ المصدر فاللخر!',
    grammarNoteArabic: 'مع الأفعال المودال، يأتي الفعل الأساسي في المصدر بنهاية الجملة.',
    grammarNoteEnglish: 'With modal verbs (möchten), the main lexical verb stays in the infinitive at the end.',
  },
  {
    id: 'lego-4',
    meaningDarija: 'هو جلس فـ الدار حيت كطيح الشتا بزاف.',
    meaningArabic: 'بقي في المنزل لأن المطر ينهمر بغزارة.',
    meaningEnglish: 'He stays at home because it is raining heavily.',
    scrambledWords: ['bleibt', 'Hause', 'regnet', 'Er', 'weil', 'es', 'zu', 'stark'],
    correctSequence: ['Er', 'bleibt', 'zu', 'Hause', 'weil', 'es', 'stark', 'regnet'],
    grammarNoteDarija: 'الرابط weil كيشوطي الفعل regnet للخر د الجملة قبل النقطة!',
    grammarNoteArabic: 'أداة الربط weil ترسل الفعل المصرف regnet إلى المركز الأخير تماماً.',
    grammarNoteEnglish: 'Subordinating conjunction "weil" kicks the conjugated verb "regnet" to the final spot.',
  },
];

export const CULTURAL_PRAISE_DARIJA = [
  'تبارك الله عليك أ معلم! راك غادي تطير فـ برلين!',
  'نتا هو بوشعيب الحقيقي، هاد الألمانية ما تخلعكش!',
  'صحيحة 100%! البريتزل ديالك عامر فرماج وXP!',
  'برافو! النطق والقواعد فـ الجيب يا سيدي!',
  'قاضي الغرض! القنصلية الألمانية تعتارف بيك دابا!',
];

export const CULTURAL_MISTAKE_DARIJA = [
  'عاود جمع راسك شوية، راه كاس د أتاي غادي يقاد ليك التركيز!',
  'رد البال! هادي راها فخ كيطيحو فيه حراقة الكراماتيك!',
  'ما تزربش، فكر مزيان قبل ما تختار الـ Artikel!',
  'وا السي بوشعيب! الألمان ما كيقبلوش التبدال فـ der و die!',
  'قريبة، ولكن عاود راجع قاعدة النهايات!',
];
