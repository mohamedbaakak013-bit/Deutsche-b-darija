import { StoryItem } from '../types.ts';

export const DUAL_STORIES: StoryItem[] = [
  // STORY 1: LINA IM SUPERMARKT
  {
    id: 'story-1',
    titleGerman: 'Lina im Supermarkt',
    titleDarija: 'لينا فـ السوبرماركت (Lina im Supermarkt)',
    titleArabic: 'لينا في السوبرماركت',
    titleEnglish: 'Lina at the Supermarket',
    level: 'A1',
    readTimeMinutes: 3,
    topic: 'Lebensmittel & Einkaufen',
    sentences: [
      {
        german: 'Heute ist Samstag und Lina geht in den Supermarkt.',
        darija: 'اليوم السبت ولينا غادية للسوبرماركت.',
        ar: 'اليوم هو السبت ولينا ذاهبة إلى السوبرماركت.',
        en: 'Today is Saturday and Lina is going to the supermarket.',
      },
      {
        german: 'Sie nimmt einen Einkaufswagen am Eingang.',
        darija: 'كتشد واحد الكارو (Chariot) عند الباب ديال الدخلة.',
        ar: 'تأخذ عربة تسوق عند المدخل.',
        en: 'She takes a shopping trolley at the entrance.',
      },
      {
        german: 'Zuerst braucht sie frisches Obst: rote Äpfel und gelbe Bananen.',
        darija: 'فـ الأول خاصها ديسير طري: تفاح حمر وبنان صفر.',
        ar: 'أولاً تحتاج إلى فواكه طازجة: تفاح أحمر وموز أصفر.',
        en: 'First she needs fresh fruit: red apples and yellow bananas.',
      },
      {
        german: 'Danach geht sie zum Bäcker und kauft ein knuspriges Vollkornbrot.',
        darija: 'من بعد كتمشي عند الخباز وكتشري خبيزة مقرمشة د الزرع الكامل.',
        ar: 'بعد ذلك تذهب إلى المخبز وتشتري خبز قمح كامل مقرمشاً.',
        en: 'Then she goes to the bakery and buys crispy wholemeal bread.',
      },
      {
        german: 'An der Kasse bezahlt sie zwanzig Euro mit ihrer Karte.',
        darija: 'عند لاكاس خلصات عشرين أورو بـ لاكارط ديالها.',
        ar: 'عند صندوق الدفع دفعت عشرين يورو ببطاقتها المصرفية.',
        en: 'At the checkout she pays twenty euros with her card.',
      },
      {
        german: 'Sie lächelt und sagt: "Vielen Dank und ein schönes Wochenende!"',
        darija: 'ابتسمات وقالت: "شكراً بزاف وعطلة نهاية أسبوع سعيدة!"',
        ar: 'ابتسمت وقالت: "شكراً جزيلاً وعطلة نهاية أسبوع جميلة!"',
        en: 'She smiles and says: "Thank you very much and have a nice weekend!"',
      },
    ],
    keyVocab: [
      { id: 'kv-1', german: 'der Einkaufswagen', article: 'der', gender: 'der', plural: 'die Einkaufswagen', darija: 'الكارو د السخرة', arabic: 'عربة التسوق', english: 'shopping trolley' },
      { id: 'kv-2', german: 'das Obst', article: 'das', gender: 'das', darija: 'الديسير / الفواكه', arabic: 'الفاكهة', english: 'fruit' },
      { id: 'kv-3', german: 'das Brot', article: 'das', gender: 'das', plural: 'die Brote', darija: 'الخبز', arabic: 'الخبز', english: 'bread' },
      { id: 'kv-4', german: 'die Kasse', article: 'die', gender: 'die', plural: 'die Kassen', darija: 'لاكاس / الصندوق', arabic: 'صندوق الدفع', english: 'cash register / checkout' },
    ],
  },

  // STORY 2: STADTFÜHRUNG IN BERLIN MIT JENS & BOUCHAIB
  {
    id: 'story-2',
    titleGerman: 'Stadtführung in Berlin',
    titleDarija: 'دورة سياحية فـ برلين مع بوشعيب وجينس',
    titleArabic: 'جولة سياحية في برلين مع بوشعيب وجينس',
    titleEnglish: 'City Tour in Berlin with Jens & Bouchaib',
    level: 'A2',
    readTimeMinutes: 4,
    topic: 'Sehenswürdigkeiten & Kultur',
    sentences: [
      {
        german: 'Jens zeigt seinem marokkanischen Freund Bouchaib die Stadt Berlin.',
        darija: 'جينس كيوري لصاحبو المغربي بوشعيب مدينة برلين.',
        ar: 'جينس يُري صديقه المغربي بوشعيب معالم مدينة برلين.',
        en: 'Jens shows his Moroccan friend Bouchaib around the city of Berlin.',
      },
      {
        german: 'Sie starten am Alexanderplatz direkt unter dem berühmten Fernsehturm.',
        darija: 'بداو من ساحة ألكسندربلاتز نيشان تحت برج التلفزة المشهور.',
        ar: 'بدآ من ساحة ألكسندربلاتز مباشرة تحت برج التلفزيون الشهير.',
        en: 'They start at Alexanderplatz right below the famous TV Tower.',
      },
      {
        german: 'Bouchaib staunt: "Dieser Turm ist dreihundertachtundsechzig Meter hoch!"',
        darija: 'بوشعيب تعجب: "هاد البرج فيه 368 متر فـ العلو!"',
        ar: 'تعجب بوشعيب قائلاً: "هذا البرج يبلغ ارتفاعه 368 متراً!"',
        en: 'Bouchaib is amazed: "This tower is 368 metres tall!"',
      },
      {
        german: 'Danach spazieren sie entlang der Spree zum Brandenburger Tor.',
        darija: 'من بعد تمشاو حدا واد شبريه حتى وصلو لبوابة براندنبورغ التاريخية.',
        ar: 'ثم تنزها بمحاذاة نهر شبريه وصولاً إلى بوابة براندنبورغ.',
        en: 'Then they stroll along the River Spree to the Brandenburg Gate.',
      },
      {
        german: 'Bouchaib hat Hunger und sagt: "In Marokko essen wir Tajine, aber hier probiere ich einen Döner!"',
        darija: 'بوشعيب جاه الجوع وقال: "فـ المغرب كناكلو الطاجين، ولكن هنا غادي نجرب الشاورما / الدونر الألماني!"',
        ar: 'شعر بوشعيب بالجوع وقال: "في المغرب نأكل الطاجين، لكن هنا سأجرب الدونر!"',
        en: 'Bouchaib is hungry and says: "In Morocco we eat tagine, but here I will try a German Döner!"',
      },
      {
        german: 'Jens lacht: "Der Berliner Döner schmeckt fantastisch mit Knoblauchsauce!"',
        darija: 'جينس ضحك وقال: "الدونر ديال برلين كيحمق بـ صوص الثومة!"',
        ar: 'ضحك جينس وقال: "دونر برلين لذيذ جداً مع صلصة الثوم!"',
        en: 'Jens laughs: "Berlin\'s Döner tastes fantastic with garlic sauce!"',
      },
    ],
    keyVocab: [
      { id: 'kv-5', german: 'der Fernsehturm', article: 'der', gender: 'der', darija: 'برج التلفزة', arabic: 'برج التلفزيون', english: 'TV Tower' },
      { id: 'kv-6', german: 'das Tor', article: 'das', gender: 'das', plural: 'die Tore', darija: 'الباب / البوابة الكبيرة', arabic: 'البوابة', english: 'gate' },
      { id: 'kv-7', german: 'die Sehenswürdigkeit', article: 'die', gender: 'die', plural: 'die Sehenswürdigkeiten', darija: 'المعلمة السياحية', arabic: 'المَعلَم السياحي', english: 'tourist attraction' },
    ],
  },

  // STORY 3: EIN SONNIGER TAG IM PARK
  {
    id: 'story-3',
    titleGerman: 'Ein sonniger Tag im Park',
    titleDarija: 'نهار مشمس فـ الحديقة (Tempelhofer Feld)',
    titleArabic: 'يوم مشمس في الحديقة',
    titleEnglish: 'A Sunny Day in the Park',
    level: 'A2',
    readTimeMinutes: 3,
    topic: 'Freizeit & Natur',
    sentences: [
      {
        german: 'Die Sonne scheint und die Temperatur liegt bei angenehmen dreiundzwanzig Grad.',
        darija: 'الشمس ضاوية ودرجة الحرارة واصلة لـ 23 درجة مريحة.',
        ar: 'الشمس مشرقة ودرجة الحرارة لطيفة عند 23 درجة مئوية.',
        en: 'The sun is shining and the temperature is a pleasant twenty-three degrees.',
      },
      {
        german: 'Viele Menschen liegen auf dem grünen Rasen und lesen Bücher.',
        darija: 'بزاف د الناس مريحين فوق الربيع الخضر وكيقراو الكتوبة.',
        ar: 'الكثير من الناس يستلقون على العشب الأخضر ويقرأون الكتب.',
        en: 'Many people are lying on the green lawn reading books.',
      },
      {
        german: 'Bouchaib hat eine Decke mitgebracht und schenkt marokkanischen Minztee ein.',
        darija: 'بوشعيب جاب معاه مانطة وكب ليهم أتاي مغربي مشحر بالنعناع.',
        ar: 'أحضر بوشعيب غطاءً وصبّ الشاي المغربي بالنعناع المنعش.',
        en: 'Bouchaib brought a blanket and pours authentic Moroccan mint tea.',
      },
      {
        german: 'Jens ruft begeistert: "Dieser Tee ist süß, warm und riecht wunderbar!"',
        darija: 'جينس عيط فرحان: "هاد أتاي حلو، دافي وريحتو كتحمق!"',
        ar: 'هتف جينس بحماس: "هذا الشاي حلو ودافئ ورائحته رائعة!"',
        en: 'Jens calls out enthusiastically: "This tea is sweet, warm, and smells wonderful!"',
      },
    ],
    keyVocab: [
      { id: 'kv-8', german: 'die Sonne', article: 'die', gender: 'die', darija: 'الشمس', arabic: 'الشمس', english: 'sun' },
      { id: 'kv-9', german: 'der Tee', article: 'der', gender: 'der', darija: 'أتاي / الشاي', arabic: 'الشاي', english: 'tea' },
      { id: 'kv-10', german: 'der Rasen', article: 'der', gender: 'der', darija: 'الربيع / العشب', arabic: 'العشب الأخضر', english: 'lawn / grass' },
    ],
  },

  // STORY 4: SPORT TREIBEN UND FIT BLEIBEN
  {
    id: 'story-4',
    titleGerman: 'Sport treiben und fit bleiben',
    titleDarija: 'الرياضة والانضباط الألماني (Fitnessstudio)',
    titleArabic: 'ممارسة الرياضة والحفاظ على اللياقة',
    titleEnglish: 'Working Out and Staying Fit in Germany',
    level: 'B1',
    readTimeMinutes: 4,
    topic: 'Gesundheit & Fitness',
    sentences: [
      {
        german: 'Bouchaib hat sich in einem Berliner Fitnessstudio angemeldet, um fit zu bleiben.',
        darija: 'بوشعيب قيد راسو فـ لاصال د الرياضة فـ برلين باش يحافظ على لا فورم.',
        ar: 'سجل بوشعيب نفسه في نادٍ رياضي ببرلين للحفاظ على لياقته البدنية.',
        en: 'Bouchaib registered at a Berlin gym to stay fit and healthy.',
      },
      {
        german: 'Sein Trainer Maximilian erklärt ihm die modernen Trainingsgeräte sehr genau.',
        darija: 'الكوتش ديالو ماكسميليان شرح ليه الماكينات د الرياضة العصريين بدقة متناهية.',
        ar: 'شرح له مدربه ماكسميليان كيفية عمل أجهزة التدريب الحديثة بكل دقة.',
        en: 'His coach Maximilian explains the modern gym equipment with great precision.',
      },
      {
        german: 'In Deutschland ist Disziplin wichtig: Man muss immer ein sauberes Handtuch mitbringen.',
        darija: 'فـ ألمانيا الانضباط لابد منو: ديما خاصك تجيب معاك فوطة نقية تحطها فوق الماكينة.',
        ar: 'الانضباط ضروري في ألمانيا: يجب دائماً إحضار منشفة نظيفة لوضعها على الأجهزة.',
        en: 'In Germany, gym discipline is strict: you must always bring a clean towel.',
      },
      {
        german: 'Nach dem Training fühlt sich Bouchaib voller Energie für seinen Deutschunterricht.',
        darija: 'من بعد الحصة الرياضية، بوشعيب حس براسو عامر بالطاقة باش يراجع دروس الألمانية.',
        ar: 'بعد التمرين شعر بوشعيب بطاقة متجددة لمواصلة دراسة اللغة الألمانية.',
        en: 'After the workout, Bouchaib feels full of energy for his German study session.',
      },
    ],
    keyVocab: [
      { id: 'kv-11', german: 'das Handtuch', article: 'das', gender: 'das', plural: 'die Handtücher', darija: 'الفوطة / المنشفة', arabic: 'المنشفة', english: 'towel' },
      { id: 'kv-12', german: 'die Disziplin', article: 'die', gender: 'die', darija: 'الانضباط والالتزام', arabic: 'الانضباط', english: 'discipline' },
      { id: 'kv-13', german: 'das Training', article: 'das', gender: 'das', darija: 'الحصة التدريبية', arabic: 'التدريب', english: 'workout / training' },
    ],
  },

  // STORY 5: KEKS BACKEN MIT PAPA
  {
    id: 'story-5',
    titleGerman: 'Kekse backen im Winter',
    titleDarija: 'توجاد الحلوى والبسكويت فـ البرد د الشتا',
    titleArabic: 'صنع البسكويت في فصل الشتاء',
    titleEnglish: 'Baking Cookies on a Winter Afternoon',
    level: 'A1',
    readTimeMinutes: 3,
    topic: 'Küche & Familie',
    sentences: [
      {
        german: 'Draußen schneit es leise und die Dächer sind ganz weiß.',
        darija: 'على برا التلج كيطيح بشوية والسطوح ولاو بيضين كاملين.',
        ar: 'في الخارج يتساقط الثلج بهدوء وأسطح المنازل غطاها البياض.',
        en: 'Outside it is snowing softly and the rooftops are completely white.',
      },
      {
        german: 'In der warmen Küche rühren wir Mehl, Butter, Eier und Vanillezucker zusammen.',
        darija: 'فـ الكوزينة الدافية كنخلطو الدقيق، الزبدة، البيض وسكر الفانيلا.',
        ar: 'في المطبخ الدافئ نخلط الطحين والزبدة والبيض وسكر الفانيليا.',
        en: 'In the warm kitchen we stir flour, butter, eggs, and vanilla sugar together.',
      },
      {
        german: 'Wir formen Sterne und Tannenbäume aus dem Teig.',
        darija: 'كنصايبو بالمرشم شكال د النجوم وشجيرات الصنوبر من العجينة.',
        ar: 'نشكل نجوماً وأشجار صنوبر جميلة من العجين.',
        en: 'We cut star and tree shapes out of the dough.',
      },
      {
        german: 'Nach fünfzehn Minuten im Ofen duftet die ganze Wohnung herrlich.',
        darija: 'من بعد ربع ساعة فالفران، الدار كاملة عطات بريحة كتشهي.',
        ar: 'بعد خمس عشرة دقيقة في الفرن، فاحت رائحة شهية في أرجاء المنزل.',
        en: 'After fifteen minutes in the oven, the whole apartment smells delightful.',
      },
    ],
    keyVocab: [
      { id: 'kv-14', german: 'der Keks', article: 'der', gender: 'der', plural: 'die Kekse', darija: 'البسكويت / الكاليط', arabic: 'البسكويت', english: 'cookie / biscuit' },
      { id: 'kv-15', german: 'der Schnee', article: 'der', gender: 'der', darija: 'التلج', arabic: 'الثلج', english: 'snow' },
      { id: 'kv-16', german: 'die Küche', article: 'die', gender: 'die', plural: 'die Küchen', darija: 'الكوزينة / المطبخ', arabic: 'المطبخ', english: 'kitchen' },
    ],
  },
];
