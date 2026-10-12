/* UI strings and language handling. Default: Arabic (RTL). */
window.I18N = (function () {
  "use strict";

  const STRINGS = {
    ar: {
      appName: "دليل العمرة",
      skip: "تخطَّ إلى المحتوى",
      home: "الصفحة الرئيسية",
      switchLang: "English",
      fontDec: "تصغير الخط",
      fontInc: "تكبير الخط",
      prev: "السابق",
      next: "التالي",
      finish: "تمّ",
      heroTitle: "دليل العمرة خطوة بخطوة",
      heroSub: "ما تفعله وما تقوله في كل موضع، من السنّة الصحيحة",
      startBtn: "ابدأ من الخطوة الأولى",
      stepsTitle: "خطوات العمرة",
      refsTitle: "مراجع مفيدة",
      stepOf: "الخطوة {n} من {total}",
      whereLabel: "المكان",
      whatToDo: "ماذا تفعل",
      duasTitle: "ما تقوله هنا",
      notesWomen: "للنساء",
      notesElderly: "لكبار السن وأصحاب الأعذار",
      notesWarn: "تنبيه",
      sourceLabel: "المصدر",
      counterTap: "أتممتُ شوطاً",
      counterReset: "إعادة العدّ",
      counterDone: "اكتملت الأشواط السبعة، الحمد لله",
      translitShow: "إظهار النطق باللاتينية",
      translitHide: "إخفاء النطق باللاتينية",
      install: "تثبيت التطبيق على الهاتف",
      installText: "يمكنك إضافة هذا الدليل كأيقونة على شاشة هاتفك ليعمل بدون إنترنت.",
      later: "لاحقاً",
      iosTitle: "لإضافة الدليل إلى شاشة هاتفك (آيفون)",
      iosStep1: "اضغط زر «مشاركة» في أسفل سفاري",
      iosStep2: "اختر «إضافة إلى الشاشة الرئيسية»",
      iosStep3: "اضغط «إضافة». ستجد الأيقونة مع تطبيقاتك وتعمل بدون إنترنت",
      manualTitle: "لإضافة الدليل إلى شاشة هاتفك",
      manualStep1: "افتح قائمة المتصفح (النقاط الثلاث ⋮ في الأعلى)",
      manualStep2: "اختر «إضافة إلى الشاشة الرئيسية» أو «تثبيت التطبيق»",
      installedOk: "تم تثبيت التطبيق. يعمل الآن بدون إنترنت.",
      offlineReady: "الدليل محفوظ على جهازك ويعمل بدون إنترنت.",
      backHome: "العودة إلى القائمة",
      completeTitle: "تقبّل الله عمرتك",
      completeText: "أتممتَ خطوات العمرة. نسأل الله القبول.",
      figureCaption: {
        ihram: "الاغتسال، لبس الإحرام، النية والتلبية",
        travel: "التلبية في الطريق إلى مكة",
        enter: "الدخول بالرجل اليمنى مع الدعاء",
        tawaf: "سبعة أشواط، الكعبة عن يسارك، البداية من الحجر الأسود",
        maqam: "ركعتان خلف المقام ثم زمزم",
        sai: "من الصفا إلى المروة: سبعة أشواط تنتهي عند المروة",
        halq: "الحلق أو التقصير، وتمّت العمرة",
        prohibitions: "ما يُمنع منه المُحرم",
        mistakes: "أخطاء ينبغي تجنبها",
        general: "أدعية السفر ودخول المسجد"
      }
    },
    en: {
      appName: "Umrah Guide",
      skip: "Skip to content",
      home: "Home",
      switchLang: "العربية",
      fontDec: "Smaller text",
      fontInc: "Larger text",
      prev: "Previous",
      next: "Next",
      finish: "Done",
      heroTitle: "Umrah, Step by Step",
      heroSub: "What to do and what to say at each place, from the authentic Sunnah",
      startBtn: "Start with step one",
      stepsTitle: "Steps of Umrah",
      refsTitle: "Useful references",
      stepOf: "Step {n} of {total}",
      whereLabel: "Where",
      whatToDo: "What to do",
      duasTitle: "What to say here",
      notesWomen: "For women",
      notesElderly: "For the elderly and those with difficulty",
      notesWarn: "Caution",
      sourceLabel: "Source",
      counterTap: "I completed a lap",
      counterReset: "Reset count",
      counterDone: "All seven laps complete, alhamdulillah",
      translitShow: "Show transliteration",
      translitHide: "Hide transliteration",
      install: "Install on your phone",
      installText: "Add this guide as an icon on your home screen so it works without internet.",
      later: "Later",
      iosTitle: "To add the guide to your iPhone home screen",
      iosStep1: "Tap the Share button at the bottom of Safari",
      iosStep2: "Choose “Add to Home Screen”",
      iosStep3: "Tap “Add”. The icon appears with your apps and works offline",
      manualTitle: "To add the guide to your home screen",
      manualStep1: "Open the browser menu (the three dots ⋮ at the top)",
      manualStep2: "Choose “Add to Home screen” or “Install app”",
      installedOk: "App installed. It now works offline.",
      offlineReady: "The guide is saved on your device and works offline.",
      backHome: "Back to the list",
      completeTitle: "May Allah accept your Umrah",
      completeText: "You have completed the steps of Umrah. We ask Allah for acceptance.",
      figureCaption: {
        ihram: "Ghusl, ihram garments, intention and Talbiyah",
        travel: "Talbiyah on the way to Makkah",
        enter: "Enter right foot first with the du'a",
        tawaf: "Seven circuits, Kaaba on your left, starting at the Black Stone",
        maqam: "Two rak'ahs behind Maqam Ibrahim, then Zamzam",
        sai: "Safa to Marwah: seven laps ending at Marwah",
        halq: "Shave or trim, and Umrah is complete",
        prohibitions: "What is forbidden in ihram",
        mistakes: "Mistakes to avoid",
        general: "Du'as for travel and the mosque"
      }
    }
  };

  const STORAGE_KEY = "umrah.lang";
  let current = "ar";

  function load() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "ar") current = saved;
    } catch (_) { /* storage unavailable: keep default */ }
    return current;
  }

  function set(lang) {
    current = lang === "en" ? "en" : "ar";
    try { localStorage.setItem(STORAGE_KEY, current); } catch (_) { /* ignore */ }
    document.documentElement.lang = current;
    document.documentElement.dir = current === "ar" ? "rtl" : "ltr";
    document.title = current === "ar" ? "دليل العمرة — Umrah Guide" : "Umrah Guide — دليل العمرة";
    applyStatic();
    return current;
  }

  function t(key, vars) {
    const table = STRINGS[current] || STRINGS.ar;
    let s = table[key];
    if (s === undefined) s = STRINGS.ar[key] !== undefined ? STRINGS.ar[key] : key;
    if (typeof s === "string" && vars) {
      Object.keys(vars).forEach(function (k) { s = s.replace("{" + k + "}", String(vars[k])); });
    }
    return s;
  }

  /** Pick the current-language value from a {ar, en} object. */
  function pick(obj) {
    if (obj == null) return "";
    if (typeof obj === "string") return obj;
    return obj[current] !== undefined ? obj[current] : (obj.ar || "");
  }

  function applyStatic() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-label]").forEach(function (el) {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-label")));
      el.setAttribute("title", t(el.getAttribute("data-i18n-label")));
    });
  }

  function lang() { return current; }

  return { load, set, t, pick, lang, applyStatic };
})();
