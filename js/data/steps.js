/* =====================================================================
   SINGLE SOURCE OF TRUTH — Umrah steps and du'as (Arabic / English)

   Sources:
   - IslamQA #154979 "How to perform Umrah" (Shaykh Ibn Uthaymin), AR + EN
   - IslamQA #34744  "Du'a during Umrah" (hadith references per du'a)
   - IslamQA #11356  "Prohibitions of ihram"
   - Hisn al-Muslim (Sa'id al-Qahtani), chapters 11, 96, 115–118
   Every du'a carries: ar (voweled Arabic), translit, en, source.
   ===================================================================== */

window.UMRAH_DATA = (function () {
  "use strict";

  // ---------- shared du'as ----------
  const TALBIYAH = {
    when: { ar: "التلبية", en: "The Talbiyah" },
    ar: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ",
    translit: "Labbayka Allāhumma labbayk, labbayka lā sharīka laka labbayk, inna l-ḥamda wa n-niʿmata laka wa l-mulk, lā sharīka lak.",
    en: "Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Verily all praise, grace and sovereignty are Yours. You have no partner.",
    source: { ar: "البخاري (٥٥٧١) ومسلم (١١٨٤) — حصن المسلم", en: "Al-Bukhari 5571, Muslim 1184 — Hisn al-Muslim" },
    repeat: { ar: "يُكرَّر كثيراً", en: "Repeat often" }
  };

  const RABBANA = {
    when: { ar: "بين الركن اليماني والحجر الأسود", en: "Between the Yemeni Corner and the Black Stone" },
    ar: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    translit: "Rabbanā ātinā fi d-dunyā ḥasanatan wa fi l-ākhirati ḥasanatan wa qinā ʿadhāba n-nār.",
    en: "Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.",
    source: { ar: "البقرة ٢٠١ — أبو داود (١٨٩٢) وصححه الألباني", en: "Quran 2:201 — Abu Dawud 1892, graded sound by al-Albani" },
    repeat: { ar: "في كل شوط", en: "Every circuit" }
  };

  const SAFA_DHIKR = {
    when: { ar: "على الصفا وعلى المروة، مستقبلاً الكعبة رافعاً يديك", en: "On Safa and on Marwah, facing the Kaaba with raised hands" },
    ar: "اللهُ أَكْبَرُ، اللهُ أَكْبَرُ، اللهُ أَكْبَرُ.\nلَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ، أَنْجَزَ وَعْدَهُ، وَنَصَرَ عَبْدَهُ، وَهَزَمَ الْأَحْزَابَ وَحْدَهُ",
    translit: "Allāhu akbar, Allāhu akbar, Allāhu akbar. Lā ilāha illa Llāhu waḥdahu lā sharīka lah, lahu l-mulku wa lahu l-ḥamd, wa huwa ʿalā kulli shayʾin qadīr. Lā ilāha illa Llāhu waḥdah, anjaza waʿdah, wa naṣara ʿabdah, wa hazama l-aḥzāba waḥdah.",
    en: "Allah is the Greatest (×3). There is no god but Allah alone, with no partner. His is the dominion and His is the praise, and He is able to do all things. There is no god but Allah alone; He fulfilled His promise, granted victory to His slave, and defeated the confederates alone.",
    source: { ar: "مسلم (١٢١٨) من حديث جابر — حصن المسلم", en: "Muslim 1218 (hadith of Jabir) — Hisn al-Muslim" },
    repeat: { ar: "٣ مرات، وادعُ بما شئت بينها", en: "3 times, with your own du'a in between" }
  };

  // ---------- STEPS ----------
  const steps = [
    {
      id: "ihram",
      title: { ar: "الإحرام من الميقات", en: "Ihram at the Miqat" },
      place: { ar: "الميقات (أو قبله في الطائرة / الفندق)", en: "The Miqat (or before it: plane / hotel)" },
      illustration: "ihram",
      body: {
        ar: [
          "اغتسل كما تغتسل للجنابة (سنّة للرجل والمرأة، حتى الحائض والنفساء).",
          "الرجل: يتطيَّب في رأسه ولحيته، ثم يلبس إزاراً ورداءً أبيضين بلا مخيط، ونعلين. المرأة: تلبس ما شاءت من الثياب المباحة الساترة، بلا نقاب ولا قفازين.",
          "صَلِّ فريضةً إن كان وقتها حاضراً، وإلا فركعتين تنوي بهما سنة الوضوء. (ليس للإحرام صلاة خاصة.)",
          "انوِ العمرة بقلبك وقل: «لَبَّيْكَ اللَّهُمَّ عُمْرَةً». إن خِفتَ مانعاً من مرض أو غيره قل: «فَإِنْ حَبَسَنِي حَابِسٌ فَمَحِلِّي حَيْثُ حَبَسْتَنِي».",
          "ثم ابدأ بالتلبية، وأكثِر منها حتى تصل مكة."
        ],
        en: [
          "Perform ghusl (full ritual wash), as for janabah. Sunnah for men and women, even menstruating women.",
          "Men: apply perfume to head and beard, then wear the two white unstitched sheets (izar and rida') and sandals. Women: any modest permissible clothing, no face veil (niqab) and no gloves.",
          "Pray the obligatory prayer if it is its time, otherwise two rak'ahs intended as the Sunnah after wudu. (There is no special prayer for ihram.)",
          "Make the intention for Umrah in your heart and say: “Labbayka Allāhumma ʿumratan”. If you fear something may prevent you (illness, etc.) add: “If something detains me, then my place of release is wherever You detain me.”",
          "Then begin the Talbiyah and repeat it often until you reach Makkah."
        ]
      },
      duas: [
        {
          when: { ar: "نية العمرة عند الإحرام", en: "Intention when entering ihram" },
          ar: "لَبَّيْكَ اللَّهُمَّ عُمْرَةً",
          translit: "Labbayka Allāhumma ʿumratan.",
          en: "Here I am, O Allah, for Umrah.",
          source: { ar: "الإسلام سؤال وجواب ١٥٤٩٧٩ — الشيخ ابن عثيمين", en: "IslamQA 154979 — Shaykh Ibn Uthaymin" }
        },
        {
          when: { ar: "الاشتراط (لمن يخاف مانعاً)", en: "Conditional intention (if you fear being prevented)" },
          ar: "فَإِنْ حَبَسَنِي حَابِسٌ فَمَحِلِّي حَيْثُ حَبَسْتَنِي",
          translit: "Fa in ḥabasanī ḥābisun fa maḥillī ḥaythu ḥabastanī.",
          en: "If something detains me, then my place of release is wherever You detain me.",
          source: { ar: "البخاري (٥٠٨٩) ومسلم (١٢٠٧) — حديث ضباعة بنت الزبير", en: "Al-Bukhari 5089, Muslim 1207 — hadith of Duba'ah bint az-Zubayr" }
        },
        TALBIYAH
      ],
      notes: {
        women: { ar: "لا تكشف المرأة شعرها، ولا تلبس النقاب أو القفازين، وتغطي وجهها إذا مرّ بها رجال أجانب. الحائض تُحرم وتلبّي لكن لا تصلي ولا تطوف حتى تطهر.", en: "A woman keeps her hair covered, does not wear niqab or gloves, and covers her face when non-mahram men pass. A menstruating woman enters ihram and recites the Talbiyah, but does not pray or perform tawaf until she is pure." },
        elderly: { ar: "لا تتعجّل: يمكن الاغتسال ولبس الإحرام في الفندق أو المطار قبل الوصول إلى الميقات، ثم تنوي وتلبّي عند الميقات فقط.", en: "Take your time: you may wash and put on the ihram garments at the hotel or airport, then make the intention and Talbiyah only when you reach the Miqat." },
        warn: { ar: "منذ الآن تبدأ محظورات الإحرام: لا قصّ للشعر أو الأظافر، لا طيب، لا صيد، ولا عقد نكاح. انظر «محظورات الإحرام».", en: "From now on the ihram prohibitions apply: no cutting hair or nails, no perfume, no hunting, no marriage contract. See “Ihram prohibitions”." }
      }
    },

    {
      id: "travel",
      title: { ar: "الطريق إلى مكة", en: "The Journey to Makkah" },
      place: { ar: "من الميقات حتى الحرم", en: "From the Miqat to the Haram" },
      illustration: "travel",
      body: {
        ar: [
          "أكثِر من التلبية طوال الطريق. الرجل يرفع صوته بها، والمرأة تخفض صوتها.",
          "اذكر الله وادعُ بما شئت من خير الدنيا والآخرة.",
          "إذا قربتَ من مكة يُستحب أن تغتسل قبل دخولها إن تيسّر (كما فعل النبي ﷺ).",
          "استمر في التلبية حتى تبدأ الطواف."
        ],
        en: [
          "Repeat the Talbiyah throughout the journey. Men raise their voice; women recite quietly.",
          "Remember Allah and make any du'a you wish for this world and the Hereafter.",
          "When close to Makkah, it is recommended to perform ghusl before entering if possible (as the Prophet ﷺ did).",
          "Continue the Talbiyah until you begin tawaf."
        ]
      },
      duas: [TALBIYAH],
      notes: {
        elderly: { ar: "اشرب ماءً كافياً في الطريق، ولا حرج في الجلوس والراحة. التلبية تُقال جالساً أو واقفاً.", en: "Drink enough water on the way and rest when needed. The Talbiyah may be recited seated or standing." }
      }
    },

    {
      id: "enter",
      title: { ar: "دخول المسجد الحرام", en: "Entering Masjid al-Haram" },
      place: { ar: "عند باب المسجد الحرام", en: "At the door of Masjid al-Haram" },
      illustration: "enter",
      body: {
        ar: [
          "ادخل المسجد مقدِّماً رجلك اليمنى، وقل دعاء دخول المسجد.",
          "إذا رأيت الكعبة فادعُ بما شئت؛ ليس هناك دعاء مخصوص ثابت عند رؤيتها.",
          "لا تصلِّ تحية المسجد إذا كنت ستطوف مباشرة؛ فالطواف تحيةُ المسجد الحرام.",
          "اقطع التلبية حين تبدأ الطواف."
        ],
        en: [
          "Enter with your right foot first and say the du'a for entering the mosque.",
          "When you first see the Kaaba, make any du'a you wish; there is no authentic fixed du'a for that moment.",
          "Do not pray the two rak'ahs of greeting the mosque if you will start tawaf right away; tawaf is the greeting of the Sacred Mosque.",
          "Stop the Talbiyah when you begin tawaf."
        ]
      },
      duas: [
        {
          when: { ar: "عند الدخول، مقدِّماً الرجل اليمنى", en: "On entering, right foot first" },
          ar: "بِسْمِ اللهِ، وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللهِ، اللَّهُمَّ اغْفِرْ لِي ذُنُوبِي، وَافْتَحْ لِي أَبْوَابَ رَحْمَتِكَ، أَعُوذُ بِاللهِ الْعَظِيمِ، وَبِوَجْهِهِ الْكَرِيمِ، وَبِسُلْطَانِهِ الْقَدِيمِ، مِنَ الشَّيْطَانِ الرَّجِيمِ",
          translit: "Bismi Llāh, wa ṣ-ṣalātu wa s-salāmu ʿalā rasūli Llāh. Allāhumma ghfir lī dhunūbī wa ftaḥ lī abwāba raḥmatik. Aʿūdhu bi-Llāhi l-ʿaẕīm, wa bi-wajhihi l-karīm, wa bi-sulṭānihi l-qadīm, mina sh-shayṭāni r-rajīm.",
          en: "In the name of Allah, and peace and blessings be upon the Messenger of Allah. O Allah, forgive my sins and open for me the gates of Your mercy. I seek refuge in Allah the Almighty, in His Noble Face and His eternal authority, from the accursed Satan.",
          source: { ar: "حصن المسلم (دعاء دخول المسجد) — أبو داود، ابن ماجه، مسلم (٧١٣)", en: "Hisn al-Muslim (entering the mosque) — Abu Dawud, Ibn Majah, Muslim 713" }
        }
      ],
      notes: {
        elderly: { ar: "للحرم مداخل مخصصة للعربات والكراسي المتحركة، ويمكن استئجار كرسي متحرك أو عربة كهربائية عند الأبواب. الطواف والسعي في الأدوار العليا صحيح ومجزئ.", en: "The Haram has dedicated entrances for wheelchairs, and wheelchairs or electric carts can be rented at the doors. Tawaf and sa'i on the upper floors are valid." }
      }
    },

    {
      id: "tawaf",
      title: { ar: "الطواف حول الكعبة", en: "Tawaf around the Kaaba" },
      place: { ar: "المطاف — ٧ أشواط", en: "The Mataf — 7 circuits" },
      illustration: "tawaf",
      counter: { key: "tawaf", total: 7, label: { ar: "عدّاد أشواط الطواف", en: "Tawaf circuit counter" }, unit: { ar: "شوط", en: "circuit" } },
      body: {
        ar: [
          "الرجل يضطبع: يُخرج كتفه الأيمن ويجعل طرفي الرداء على كتفه الأيسر (في الطواف فقط).",
          "ابدأ من الحجر الأسود (تجده أمام الخط/الضوء الأخضر على الجدار). استلمه وقبِّله إن تيسّر بلا إيذاء، وإلا أشِر إليه بيدك اليمنى وقل: «بِسْمِ اللهِ وَاللهُ أَكْبَرُ».",
          "اجعل الكعبة عن يسارك وطُف سبعة أشواط، كل شوط يبدأ وينتهي عند الحجر الأسود. كلما حاذيتَ الحجر قل «اللهُ أَكْبَرُ».",
          "الرجل يَرمُل (يُسرع المشي) في الأشواط الثلاثة الأولى إن لم يكن زحام، ويمشي في الأربعة الباقية. المرأة لا ترمل.",
          "بين الركن اليماني والحجر الأسود قل: «رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً…». وفي بقية الطواف اذكر الله وادعُ بما شئت واقرأ القرآن.",
          "لا تمسّ من الكعبة إلا الحجر الأسود والركن اليماني. طُف من خارج حِجْر إسماعيل (الجدار نصف الدائري) ولا تدخل من داخله."
        ],
        en: [
          "Men do idtiba': uncover the right shoulder and place both ends of the upper sheet over the left shoulder (during tawaf only).",
          "Start at the Black Stone (in line with the green light on the wall). Touch and kiss it if easily possible without harming anyone; otherwise point to it with your right hand and say “Bismi Llāhi wa Llāhu akbar”.",
          "Keep the Kaaba on your LEFT and walk seven circuits, each starting and ending at the Black Stone. Each time you pass the Black Stone say “Allāhu akbar”.",
          "Men walk briskly (raml) in the first three circuits if it is not crowded, then walk normally for the remaining four. Women do not do raml.",
          "Between the Yemeni Corner and the Black Stone say “Rabbanā ātinā fi d-dunyā ḥasanah…”. For the rest of tawaf remember Allah, make any du'a and recite Quran.",
          "Touch nothing of the Kaaba except the Black Stone and the Yemeni Corner. Walk OUTSIDE the Hijr Isma'il (semicircular wall); do not pass inside it."
        ]
      },
      duas: [
        {
          when: { ar: "عند الحجر الأسود في بداية الطواف", en: "At the Black Stone when starting tawaf" },
          ar: "بِسْمِ اللهِ وَاللهُ أَكْبَرُ، اللَّهُمَّ إِيمَانًا بِكَ، وَتَصْدِيقًا بِكِتَابِكَ، وَوَفَاءً بِعَهْدِكَ، وَاتِّبَاعًا لِسُنَّةِ نَبِيِّكَ مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ",
          translit: "Bismi Llāhi wa Llāhu akbar. Allāhumma īmānan bik, wa taṣdīqan bi-kitābik, wa wafāʾan bi-ʿahdik, wa ttibāʿan li-sunnati nabiyyika Muḥammadin ṣalla Llāhu ʿalayhi wa sallam.",
          en: "In the name of Allah, Allah is the Greatest. O Allah, out of faith in You, belief in Your Book, fulfilment of Your covenant, and following the Sunnah of Your Prophet Muhammad ﷺ.",
          source: { ar: "الإسلام سؤال وجواب ١٥٤٩٧٩ — الشيخ ابن عثيمين", en: "IslamQA 154979 — Shaykh Ibn Uthaymin" }
        },
        {
          when: { ar: "كلما حاذيتَ الحجر الأسود (كل شوط)", en: "Each time you pass the Black Stone (every circuit)" },
          ar: "اللهُ أَكْبَرُ",
          translit: "Allāhu akbar.",
          en: "Allah is the Greatest.",
          source: { ar: "البخاري (١٦١٣) — حصن المسلم", en: "Al-Bukhari 1613 — Hisn al-Muslim" },
          repeat: { ar: "٧ مرات", en: "7 times" }
        },
        RABBANA,
        {
          when: { ar: "في بقية الطواف", en: "During the rest of tawaf" },
          ar: "اذكر الله بما شئت: سُبْحَانَ اللهِ، وَالْحَمْدُ لِلهِ، وَلَا إِلَهَ إِلَّا اللهُ، وَاللهُ أَكْبَرُ — وادعُ بما في قلبك، واقرأ القرآن.",
          translit: "Subḥāna Llāh, wa l-ḥamdu li-Llāh, wa lā ilāha illa Llāh, wa Llāhu akbar — and any du'a from your heart, or Quran.",
          en: "Any remembrance of Allah, any personal du'a, or Quran recitation. There is NO fixed du'a for each circuit; booklets with a du'a per circuit have no basis in the Sunnah.",
          source: { ar: "الإسلام سؤال وجواب ٣٤٧٤٤ و١٠٩٢٤٦ — مجموع فتاوى ابن تيمية ٢٦/١٢٢", en: "IslamQA 34744 & 109246 — Ibn Taymiyyah, Majmu' al-Fatawa 26/122" }
        }
      ],
      notes: {
        women: { ar: "المرأة لا ترمل ولا تضطبع، وتطوف بعيداً عن الزحام. الحائض لا تطوف حتى تطهر.", en: "Women do not do raml or idtiba', and should walk away from the crowd. A menstruating woman does not perform tawaf until she is pure." },
        elderly: { ar: "الطواف في الدور الأول أو الثاني أو السطح صحيح، وهو أقل زحاماً. الكرسي المتحرك جائز. لا تُجهد نفسك لتقبيل الحجر؛ الإشارة إليه تكفي.", en: "Tawaf on the first, second floor or roof is valid and far less crowded. A wheelchair is permitted. Do not exhaust yourself trying to kiss the Stone; pointing to it is enough." },
        warn: { ar: "من دخل من باب حِجْر إسماعيل وخرج من الباب الآخر لم يصح شوطه. إذا شككت في العدد فابنِ على الأقل.", en: "Passing inside the Hijr Isma'il invalidates that circuit. If unsure of the count, assume the lower number." }
      }
    },

    {
      id: "maqam",
      title: { ar: "ركعتا الطواف وماء زمزم", en: "Two Rak'ahs and Zamzam" },
      place: { ar: "خلف مقام إبراهيم — أو أي مكان في المسجد", en: "Behind Maqam Ibrahim — or anywhere in the mosque" },
      illustration: "maqam",
      body: {
        ar: [
          "بعد تمام السبعة، غطِّ كتفك الأيمن (انتهى الاضطباع).",
          "صلِّ ركعتين خلف مقام إبراهيم إن تيسّر، وإلا ففي أي مكان من المسجد. تقرأ في الأولى بعد الفاتحة سورة ﴿قُلْ يَا أَيُّهَا الْكَافِرُونَ﴾ وفي الثانية ﴿قُلْ هُوَ اللهُ أَحَدٌ﴾.",
          "ثم اشرب من ماء زمزم وادعُ بما شئت، فـ«ماءُ زمزمَ لِما شُرِبَ له».",
          "إن تيسّر ارجع إلى الحجر الأسود واستلمه قبل الخروج إلى الصفا، وإلا فلا حرج."
        ],
        en: [
          "After the seventh circuit, cover your right shoulder again (idtiba' ends).",
          "Pray two rak'ahs behind Maqam Ibrahim if easy, otherwise anywhere in the mosque. Recite Surah al-Kafirun (109) in the first rak'ah and Surah al-Ikhlas (112) in the second, after al-Fatihah.",
          "Then drink Zamzam water and make any du'a: “Zamzam water is for whatever it is drunk for.”",
          "If easy, return to touch the Black Stone before heading to Safa; if not, there is no harm."
        ]
      },
      duas: [
        {
          when: { ar: "وأنت متجه إلى مقام إبراهيم", en: "While walking to Maqam Ibrahim" },
          ar: "وَاتَّخِذُوا مِنْ مَقَامِ إِبْرَاهِيمَ مُصَلًّى",
          translit: "Wa ttakhidhū min maqāmi Ibrāhīma muṣallā.",
          en: "“And take the standing-place of Ibrahim as a place of prayer.”",
          source: { ar: "البقرة ١٢٥ — مسلم (١٢١٨)", en: "Quran 2:125 — Muslim 1218" }
        },
        {
          when: { ar: "عند شرب ماء زمزم", en: "When drinking Zamzam" },
          ar: "اشرب وادعُ بما شئت من خير الدنيا والآخرة؛ ليس هناك دعاء مخصوص ثابت، قال النبي ﷺ: «مَاءُ زَمْزَمَ لِمَا شُرِبَ لَهُ»",
          translit: "Drink and make any du'a you wish. There is no fixed authentic du'a. The Prophet ﷺ said: “Māʾu Zamzama limā shuriba lah.”",
          en: "Drink and make any du'a you wish for this world and the Hereafter. There is no fixed authentic du'a. The Prophet ﷺ said: “Zamzam water is for whatever it is drunk for.”",
          source: { ar: "ابن ماجه (٣٠٦٢) وصححه الألباني — الإسلام سؤال وجواب ٣٤٧٤٤", en: "Ibn Majah 3062, graded authentic by al-Albani — IslamQA 34744" }
        }
      ],
      notes: {
        elderly: { ar: "الصلاة على الكرسي جائزة لمن لا يستطيع القيام. لا تصلِّ في ممر الطائفين؛ ابتعد إلى مكان واسع.", en: "Praying seated on a chair is allowed for those unable to stand. Do not pray in the path of those doing tawaf; move to an open area." }
      }
    },

    {
      id: "sai",
      title: { ar: "السعي بين الصفا والمروة", en: "Sa'i between Safa and Marwah" },
      place: { ar: "المسعى — ٧ أشواط", en: "The Mas'a — 7 laps" },
      illustration: "sai",
      counter: { key: "sai", total: 7, label: { ar: "عدّاد أشواط السعي", en: "Sa'i lap counter" }, unit: { ar: "شوط", en: "lap" } },
      body: {
        ar: [
          "اخرج إلى الصفا. عند اقترابك منه اقرأ الآية ﴿إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللهِ…﴾ ثم قل «أَبْدَأُ بِمَا بَدَأَ اللهُ بِهِ». تُقال مرة واحدة فقط في بداية السعي.",
          "اصعد على الصفا، استقبل الكعبة، ارفع يديك، كبِّر ووحِّد الله بالذكر المذكور، ثم ادعُ، وكرِّر الذكر والدعاء ثلاث مرات.",
          "انزل واتجه إلى المروة. الرجل يُسرع (يسعى) بين العلَمين الأخضرين إن لم يؤذِ أحداً، ويمشي في بقية الطريق. المرأة تمشي.",
          "عند المروة اصعد، استقبل الكعبة، وقل مثل ما قلتَ على الصفا (بدون الآية). هذا شوط واحد.",
          "من الصفا إلى المروة شوط، ومن المروة إلى الصفا شوط آخر. تنتهي السبعة عند المروة.",
          "في السعي اذكر الله وادعُ بما شئت؛ لا دعاء مخصوص لكل شوط."
        ],
        en: [
          "Go out to Safa. As you approach it recite the verse “Indeed Safa and Marwah are among the symbols of Allah…” then say “I begin with what Allah began with.” Say this ONCE only, at the start of sa'i.",
          "Climb Safa, face the Kaaba, raise your hands, say the takbir and tahlil dhikr shown below, then make du'a. Repeat dhikr + du'a three times.",
          "Descend and walk toward Marwah. Men hurry between the two green lights if it harms no one, and walk the rest. Women walk.",
          "At Marwah climb, face the Kaaba, and say what you said on Safa (without the verse). That is one lap.",
          "Safa → Marwah is one lap, Marwah → Safa is another. The seventh lap ends at Marwah.",
          "During sa'i remember Allah and make any du'a; there is no fixed du'a per lap."
        ]
      },
      duas: [
        {
          when: { ar: "عند الاقتراب من الصفا — مرة واحدة فقط", en: "Approaching Safa — once only" },
          ar: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللهِ فَمَنْ حَجَّ الْبَيْتَ أَوِ اعْتَمَرَ فَلَا جُنَاحَ عَلَيْهِ أَنْ يَطَّوَّفَ بِهِمَا وَمَنْ تَطَوَّعَ خَيْرًا فَإِنَّ اللهَ شَاكِرٌ عَلِيمٌ.\nأَبْدَأُ بِمَا بَدَأَ اللهُ بِهِ",
          translit: "Inna ṣ-Ṣafā wa l-Marwata min shaʿāʾiri Llāh, fa man ḥajja l-bayta awi ʿtamara fa lā junāḥa ʿalayhi an yaṭṭawwafa bihimā, wa man taṭawwaʿa khayran fa inna Llāha shākirun ʿalīm. Abdaʾu bimā badaʾa Llāhu bih.",
          en: "“Indeed, Safa and Marwah are among the symbols of Allah. So whoever makes Hajj to the House or performs Umrah, there is no blame on him for walking between them. And whoever volunteers good, then indeed Allah is Appreciative and Knowing.” I begin with what Allah began with.",
          source: { ar: "البقرة ١٥٨ — مسلم (١٢١٨)", en: "Quran 2:158 — Muslim 1218" }
        },
        SAFA_DHIKR,
        {
          when: { ar: "بين الصفا والمروة", en: "Walking between Safa and Marwah" },
          ar: "اذكر الله وادعُ بما شئت واقرأ القرآن؛ ليس للسعي دعاء مخصوص لكل شوط.",
          translit: "Any dhikr, any du'a, or Quran recitation. There is no fixed du'a for each lap of sa'i.",
          en: "Any remembrance of Allah, any personal du'a, or Quran recitation. There is no fixed du'a for each lap of sa'i.",
          source: { ar: "الإسلام سؤال وجواب ٣٤٧٤٤ — مجموع فتاوى ابن تيمية ٢٦/١٢٢", en: "IslamQA 34744 — Ibn Taymiyyah, Majmu' al-Fatawa 26/122" }
        }
      ],
      notes: {
        women: { ar: "المرأة لا تُسرع بين العلَمين، وتمشي مشياً عادياً. الحائض يجوز لها السعي عند بعض العلماء إن كانت طافت قبل الحيض.", en: "Women do not hurry between the green lights; they walk normally. Some scholars allow a menstruating woman to perform sa'i if she completed tawaf before her period began." },
        elderly: { ar: "في المسعى مسار مخصص للعربات والكراسي في الوسط، وعربات كهربائية للإيجار. لا يُشترط الصعود إلى أعلى الصفا والمروة؛ يكفي الوصول إليهما.", en: "The Mas'a has a dedicated central lane for wheelchairs and rentable electric carts. You need not climb to the top of Safa and Marwah; reaching them is enough." }
      }
    },

    {
      id: "halq",
      title: { ar: "الحلق أو التقصير", en: "Shaving or Trimming the Hair" },
      place: { ar: "بعد السعي — عند الحلّاقين قرب باب المروة", en: "After sa'i — barbers near the Marwah exit" },
      illustration: "halq",
      body: {
        ar: [
          "الرجل: يحلق رأسه كله (وهو الأفضل) أو يقصِّر من جميع شعره بحيث يظهر ذلك في الرأس.",
          "المرأة: تجمع شعرها وتقصُّ من أطرافه قدر أنملة (رأس الإصبع) فقط، ولا تحلق.",
          "بهذا تمّت عمرتك، وحللتَ من إحرامك حلاً كاملاً: يجوز لك الطيب واللباس المعتاد وكل ما كان محظوراً.",
          "احمد الله على تمام النسك وادعُ بالقبول: اللَّهُمَّ تَقَبَّلْ مِنَّا."
        ],
        en: [
          "Men: shave the whole head (better) or trim all of the hair so that it is visibly shorter all over.",
          "Women: gather the hair and cut about a fingertip's length from the ends only; never shave.",
          "Your Umrah is now complete and you are fully out of ihram: perfume, normal clothing and everything that was prohibited are permitted again.",
          "Praise Allah for completing the rite and ask for acceptance."
        ]
      },
      duas: [
        {
          when: { ar: "عند تمام العمرة", en: "On completing Umrah" },
          ar: "اللَّهُمَّ تَقَبَّلْ مِنَّا، اللَّهُمَّ اجْعَلْهَا عُمْرَةً مَبْرُورَةً وَذَنْبًا مَغْفُورًا",
          translit: "Allāhumma taqabbal minnā. Allāhumma jʿalhā ʿumratan mabrūratan wa dhanban maghfūran.",
          en: "O Allah, accept it from us. O Allah, make it an accepted Umrah and a forgiven sin.",
          source: { ar: "دعاء عام مباح (ليس فيه نص مخصوص)؛ «عمرة مبرورة» من ألفاظ الحديث", en: "General permissible du'a (no specific text is prescribed); “an accepted Umrah” echoes hadith wording" }
        }
      ],
      notes: {
        women: { ar: "لا يحلق الرجل الأجنبي شعر المرأة؛ تقصُّه هي أو محرمها في مكان مستور.", en: "A non-mahram man must not cut a woman's hair; she or her mahram trims it in a private place." },
        elderly: { ar: "الحلّاقون المرخّصون كثيرون خارج باب المروة وفي الأبراج المجاورة، مفتوحون طوال اليوم. يجوز أن تحلق أو تقصِّر لنفسك.", en: "Licensed barbers are plentiful outside the Marwah door and in the nearby towers, open all day. You may also shave or trim your own hair." },
        warn: { ar: "لا تخلع الإحرام ولا تتطيب قبل الحلق أو التقصير.", en: "Do not remove the ihram garments or use perfume before shaving or trimming." }
      }
    }
  ];

  // ---------- REFERENCE SCREENS ----------
  const refs = [
    {
      id: "prohibitions",
      icon: "⛔",
      title: { ar: "محظورات الإحرام", en: "Ihram Prohibitions" },
      illustration: "prohibitions",
      body: {
        ar: [
          "حلق أو قصّ شعر الرأس والجسد، وتقليم الأظافر.",
          "استعمال الطيب في البدن أو الثوب أو الطعام بعد عقد الإحرام.",
          "الجماع ومقدماته والمباشرة لشهوة.",
          "عقد النكاح والخِطبة.",
          "قتل الصيد البرّي أو الإعانة عليه.",
          "للرجال: لبس المخيط المفصَّل على البدن (قميص، سراويل، عمامة، برنس)، وتغطية الرأس بملاصق، ولبس الخفّين. (يجوز الحزام والساعة والنظارة والشمسية.)",
          "للنساء: لبس النقاب والبرقع والقفازين. (تغطي وجهها إذا مرّ بها رجال أجانب.)",
          "من فعل شيئاً من ذلك ناسياً أو جاهلاً أو مكرهاً فلا شيء عليه."
        ],
        en: [
          "Shaving or cutting hair anywhere on the body, and clipping nails.",
          "Using perfume on body, clothes or food after entering ihram.",
          "Sexual intercourse and everything leading to it.",
          "Contracting or proposing marriage.",
          "Hunting land game or helping to hunt.",
          "Men: wearing fitted stitched clothing (shirt, trousers, turban, hooded cloak), covering the head with anything touching it, wearing shoes covering the ankles. (Belt, watch, glasses and umbrella are fine.)",
          "Women: wearing niqab, burqa or gloves. (She covers her face when non-mahram men pass by.)",
          "Whoever does any of these forgetfully, in ignorance or under compulsion owes nothing."
        ]
      },
      source: { ar: "الإسلام سؤال وجواب ١١٣٥٦ — ابن عثيمين", en: "IslamQA 11356 — Ibn Uthaymin" }
    },
    {
      id: "mistakes",
      icon: "⚠️",
      title: { ar: "أخطاء شائعة", en: "Common Mistakes" },
      illustration: "mistakes",
      body: {
        ar: [
          "الاعتماد على كتيبات فيها دعاء مخصوص لكل شوط في الطواف أو السعي: لا أصل لذلك، وادعُ بما شئت.",
          "الدخول من داخل حِجْر إسماعيل أثناء الطواف: يُبطل الشوط.",
          "الإيذاء والتدافع للوصول إلى الحجر الأسود: الإشارة إليه تكفي.",
          "التمسّح بجدران الكعبة أو الكسوة أو مقام إبراهيم وأركانها غير اليماني: لم يفعله النبي ﷺ.",
          "رفع الصوت بالدعاء جماعياً خلف قائد؛ يشوّش على الطائفين. ادعُ بصوت خافت.",
          "الصلاة في ممر الطائفين أو الاصطفاف خلف المقام بما يعطّل الطواف.",
          "نسيان تغطية الكتف الأيمن بعد الطواف، أو الاضطباع في السعي (الاضطباع للطواف فقط).",
          "قص شعرات قليلة فقط في التقصير؛ الواجب التقصير من جميع الرأس.",
          "خلع الإحرام أو التطيب قبل الحلق أو التقصير."
        ],
        en: [
          "Relying on booklets with a specific du'a per circuit of tawaf or per lap of sa'i: this has no basis; make your own du'a.",
          "Walking inside the Hijr Isma'il during tawaf: that circuit does not count.",
          "Pushing and harming others to reach the Black Stone: pointing to it is enough.",
          "Rubbing the Kaaba walls, its cover, Maqam Ibrahim or corners other than the Yemeni: the Prophet ﷺ did not do this.",
          "Loud group du'a behind a leader disturbs others. Supplicate quietly.",
          "Praying in the path of those doing tawaf, or crowding behind Maqam Ibrahim so tawaf is blocked.",
          "Forgetting to cover the right shoulder after tawaf, or doing idtiba' during sa'i (it is for tawaf only).",
          "Cutting only a few hairs when trimming; hair must be shortened all over the head.",
          "Taking off ihram or using perfume before shaving or trimming."
        ]
      },
      source: { ar: "الإسلام سؤال وجواب ١٥٤٩٧٩، ٣٤٧٤٤، ١٠٩٢٤٦", en: "IslamQA 154979, 34744, 109246" }
    },
    {
      id: "general",
      icon: "🤲",
      title: { ar: "أدعية عامة للمسافر", en: "General Du'as for the Traveller" },
      illustration: "general",
      body: { ar: [], en: [] },
      duas: [
        {
          when: { ar: "دعاء السفر (عند الركوب)", en: "Travel du'a (when boarding)" },
          ar: "اللهُ أَكْبَرُ، اللهُ أَكْبَرُ، اللهُ أَكْبَرُ، سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ. اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى، اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ، اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ، وَالْخَلِيفَةُ فِي الْأَهْلِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ وَعْثَاءِ السَّفَرِ، وَكَآبَةِ الْمَنْظَرِ، وَسُوءِ الْمُنْقَلَبِ فِي الْمَالِ وَالْأَهْلِ",
          translit: "Allāhu akbar (×3). Subḥāna lladhī sakhkhara lanā hādhā wa mā kunnā lahu muqrinīn, wa innā ilā rabbinā la-munqalibūn. Allāhumma innā nasʾaluka fī safarinā hādhā l-birra wa t-taqwā, wa mina l-ʿamali mā tarḍā. Allāhumma hawwin ʿalaynā safaranā hādhā wa ṭwi ʿannā buʿdah. Allāhumma anta ṣ-ṣāḥibu fi s-safar, wa l-khalīfatu fi l-ahl. Allāhumma innī aʿūdhu bika min waʿthāʾi s-safar, wa kaʾābati l-manẕar, wa sūʾi l-munqalabi fi l-māli wa l-ahl.",
          en: "Allah is the Greatest (×3). Glory to Him who has subjected this to us, for we could never have done it by ourselves, and to our Lord we shall return. O Allah, we ask You on this journey for righteousness and piety, and for deeds that please You. O Allah, make this journey easy for us and shorten its distance. O Allah, You are the Companion on the journey and the Guardian of the family. O Allah, I seek refuge in You from the hardships of travel, from a distressing sight, and from an evil return in wealth and family.",
          source: { ar: "مسلم (١٣٤٢) — حصن المسلم", en: "Muslim 1342 — Hisn al-Muslim" }
        },
        {
          when: { ar: "دعاء دخول المسجد (أي مسجد)", en: "Entering any mosque" },
          ar: "أَعُوذُ بِاللهِ الْعَظِيمِ، وَبِوَجْهِهِ الْكَرِيمِ، وَسُلْطَانِهِ الْقَدِيمِ، مِنَ الشَّيْطَانِ الرَّجِيمِ. بِسْمِ اللهِ، وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللهِ. اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
          translit: "Aʿūdhu bi-Llāhi l-ʿaẕīm, wa bi-wajhihi l-karīm, wa sulṭānihi l-qadīm, mina sh-shayṭāni r-rajīm. Bismi Llāh, wa ṣ-ṣalātu wa s-salāmu ʿalā rasūli Llāh. Allāhumma ftaḥ lī abwāba raḥmatik.",
          en: "I seek refuge in Allah the Almighty, in His Noble Face and His eternal authority, from the accursed Satan. In the name of Allah, and peace and blessings upon the Messenger of Allah. O Allah, open for me the gates of Your mercy.",
          source: { ar: "حصن المسلم ١١ — أبو داود، مسلم (٧١٣)", en: "Hisn al-Muslim 11 — Abu Dawud, Muslim 713" }
        },
        {
          when: { ar: "دعاء الخروج من المسجد", en: "Leaving the mosque" },
          ar: "بِسْمِ اللهِ، وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللهِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ، اللَّهُمَّ اعْصِمْنِي مِنَ الشَّيْطَانِ الرَّجِيمِ",
          translit: "Bismi Llāh, wa ṣ-ṣalātu wa s-salāmu ʿalā rasūli Llāh. Allāhumma innī asʾaluka min faḍlik. Allāhumma ʿṣimnī mina sh-shayṭāni r-rajīm.",
          en: "In the name of Allah, and peace and blessings upon the Messenger of Allah. O Allah, I ask You from Your bounty. O Allah, protect me from the accursed Satan.",
          source: { ar: "حصن المسلم ١٢ — مسلم (٧١٣)، ابن ماجه", en: "Hisn al-Muslim 12 — Muslim 713, Ibn Majah" }
        },
        {
          when: { ar: "ذكر الرجوع من السفر", en: "Returning from the journey" },
          ar: "آيِبُونَ، تَائِبُونَ، عَابِدُونَ، لِرَبِّنَا حَامِدُونَ",
          translit: "Āyibūn, tāʾibūn, ʿābidūn, li-rabbinā ḥāmidūn.",
          en: "We return, repentant, worshipping, and praising our Lord.",
          source: { ar: "البخاري (١٧٩٧) ومسلم (١٣٤٤) — حصن المسلم ١٠٥", en: "Al-Bukhari 1797, Muslim 1344 — Hisn al-Muslim 105" }
        }
      ]
    }
  ];

  return { steps, refs };
})();
