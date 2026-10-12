/* Inline SVG illustrations, one per step. Simple, high-contrast, animated where it
   helps understanding (tawaf direction, sa'i back-and-forth). All decorative:
   the figure caption carries the meaning for screen readers. */
window.ILLUSTRATIONS = (function () {
  "use strict";

  const C = {
    bg: "#eef4f1", ground: "#d9cbb0", kaaba: "#1a1a1a", gold: "#b8860b",
    green: "#0f5c4a", greenLight: "#3fa37f", skin: "#c68642", white: "#ffffff",
    grey: "#8a948f", red: "#a3261e", blue: "#2a6f97", stone: "#3b3b3b", text: "#14211d", goldText: "#7a5a00"
  };

  // A simple standing person in ihram (two white sheets), used in several scenes.
  function person(x, y, scale, opts) {
    const o = opts || {};
    const s = scale || 1;
    const sheet = o.dress || C.white;
    const head = o.female
      ? `<path d="M-20 -60 q20 -34 40 0 v42 q-20 10 -40 0z" fill="${sheet}" stroke="${C.grey}" stroke-width="1.5"/><circle cx="0" cy="-56" r="11" fill="${C.skin}"/>`
      : `<circle cx="0" cy="-58" r="14" fill="${C.skin}"/>`;
    return `<g transform="translate(${x} ${y}) scale(${s})">
      ${head}
      <path d="M-20 -40 h40 v42 h-40z" fill="${sheet}" stroke="${C.grey}" stroke-width="1.5"/>
      ${o.female ? "" : `<path d="M-20 -40 L-8 -12 L-20 2z" fill="${C.skin}"/>`}
      <path d="M-18 2 h36 v38 h-36z" fill="${sheet}" stroke="${C.grey}" stroke-width="1.5"/>
      <path d="M-14 40 v14 M14 40 v14" stroke="${C.skin}" stroke-width="7" stroke-linecap="round"/>
      <path d="M-22 -34 l-10 26 M22 -34 l10 26" stroke="${C.skin}" stroke-width="7" stroke-linecap="round"/>
    </g>`;
  }

  function kaaba(x, y, w) {
    const h = w * 1.05;
    return `<g transform="translate(${x} ${y})">
      <rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" fill="${C.kaaba}" rx="3"/>
      <rect x="${-w / 2}" y="${-h * 0.72}" width="${w}" height="${h * 0.09}" fill="${C.gold}"/>
      <rect x="${-w * 0.12}" y="${-h * 0.55}" width="${w * 0.2}" height="${h * 0.5}" fill="${C.gold}" opacity="0.9"/>
    </g>`;
  }

  function frame(inner, label) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400" aria-hidden="true" focusable="false" style="direction:ltr">
      <rect width="640" height="400" fill="${C.bg}"/>
      ${inner}
    </svg>`;
  }

  const draw = {
    ihram() {
      return frame(`
        <rect x="0" y="300" width="640" height="100" fill="${C.ground}"/>
        <!-- water drops = ghusl -->
        <g fill="${C.blue}" opacity="0.8">
          <path d="M120 90 q10 20 0 30 q-10 -10 0 -30z"/><path d="M150 60 q10 20 0 30 q-10 -10 0 -30z"/><path d="M175 100 q10 20 0 30 q-10 -10 0 -30z"/>
        </g>
        ${person(150, 300, 1.3)}
        ${person(330, 300, 1.3, { female: true })}
        <!-- speech bubble: talbiyah -->
        <g transform="translate(470 120)">
          <rect x="-110" y="-60" width="220" height="90" rx="20" fill="${C.white}" stroke="${C.green}" stroke-width="3"/>
          <path d="M-60 30 l-15 25 l35 -25z" fill="${C.white}" stroke="${C.green}" stroke-width="3"/>
          <text x="0" y="-15" text-anchor="middle" font-size="30" font-family="Amiri, serif" fill="${C.green}" direction="rtl">لَبَّيْكَ اللَّهُمَّ</text>
          <text x="0" y="20" text-anchor="middle" font-size="30" font-family="Amiri, serif" fill="${C.green}" direction="rtl">عُمْرَةً</text>
        </g>`);
    },

    travel() {
      return frame(`
        <rect x="0" y="280" width="640" height="120" fill="${C.ground}"/>
        <path d="M0 330 H640" stroke="${C.white}" stroke-width="6" stroke-dasharray="40 30"/>
        <!-- distant Makkah -->
        <g transform="translate(560 250)">
          ${kaaba(0, 0, 40)}
          <path d="M-60 0 v-70 l6 -14 l6 14 v70" fill="${C.grey}"/>
          <path d="M40 0 v-90 l6 -14 l6 14 v90" fill="${C.grey}"/>
        </g>
        <!-- bus -->
        <g transform="translate(200 300)">
          <rect x="-110" y="-90" width="220" height="90" rx="14" fill="${C.green}"/>
          <rect x="-95" y="-75" width="50" height="35" rx="4" fill="${C.white}"/>
          <rect x="-30" y="-75" width="50" height="35" rx="4" fill="${C.white}"/>
          <rect x="35" y="-75" width="50" height="35" rx="4" fill="${C.white}"/>
          <circle cx="-65" cy="10" r="18" fill="${C.kaaba}"/><circle cx="65" cy="10" r="18" fill="${C.kaaba}"/>
        </g>
        <g transform="translate(330 150)">
          <rect x="-130" y="-70" width="260" height="110" rx="22" fill="${C.white}" stroke="${C.green}" stroke-width="3"/>
          <path d="M-40 40 l-20 30 l50 -30z" fill="${C.white}" stroke="${C.green}" stroke-width="3"/>
          <text x="0" y="-25" text-anchor="middle" font-size="28" font-family="Amiri, serif" fill="${C.green}" direction="rtl">لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ</text>
          <text x="0" y="15" text-anchor="middle" font-size="28" font-family="Amiri, serif" fill="${C.green}" direction="rtl">لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ</text>
        </g>`);
    },

    enter() {
      return frame(`
        <rect x="0" y="320" width="640" height="80" fill="${C.ground}"/>
        <!-- mosque gate -->
        <g transform="translate(400 320)">
          <rect x="-160" y="-260" width="320" height="260" fill="#e6dccb" stroke="${C.grey}" stroke-width="3"/>
          <path d="M-90 0 v-150 a90 90 0 0 1 180 0 v150z" fill="${C.green}"/>
          <path d="M-70 0 v-140 a70 70 0 0 1 140 0 v140z" fill="#0a4236"/>
          <rect x="-160" y="-290" width="320" height="30" fill="${C.gold}"/>
          <path d="M-120 -290 v-60 l8 -16 l8 16 v60 M104 -290 v-60 l8 -16 l8 16 v60" fill="#e6dccb" stroke="${C.grey}" stroke-width="2"/>
        </g>
        ${person(150, 320, 1.4)}
        <!-- right foot highlight + arrow -->
        <ellipse cx="172" cy="322" rx="26" ry="9" fill="${C.gold}" opacity="0.8"/>
        <path d="M200 280 H260" stroke="${C.gold}" stroke-width="10" stroke-linecap="round"/>
        <path d="M258 262 l28 18 l-28 18z" fill="${C.gold}"/>
        <text x="150" y="130" text-anchor="middle" font-size="28" font-family="Amiri, serif" fill="${C.green}" font-weight="bold">الرِّجْل اليمنى أولاً</text>`);
    },

    tawaf() {
      // Counter-clockwise loop seen from above; Kaaba in centre, Black Stone marker at east corner.
      return frame(`
        <style>
          @keyframes ccw { from { transform: rotate(0deg);} to { transform: rotate(-360deg);} }
          .orbit { transform-origin: 320px 200px; animation: ccw 12s linear infinite; }
        </style>
        <!-- orbit path (counter-clockwise: E → N → W → S → E) with direction arrows -->
        <circle cx="320" cy="200" r="135" fill="none" stroke="${C.green}" stroke-width="6" stroke-dasharray="14 12" opacity="0.7"/>
        <g fill="${C.green}">
          <path d="M300 65 l30 -16 l0 32z" transform="rotate(180 315 65)"/>   <!-- top: heading west -->
          <path d="M185 180 l16 30 l-32 0z" transform="rotate(180 185 195)"/>  <!-- left: heading south -->
          <path d="M340 335 l-30 -16 l0 32z" transform="rotate(180 325 335)"/> <!-- bottom: heading east -->
          <path d="M455 220 l-16 -30 l32 0z" transform="rotate(180 455 205)"/> <!-- right: heading north -->
        </g>
        <!-- Kaaba top view as a diamond: E = Black Stone, S = Yemeni, W = Shami, N = Iraqi -->
        <g transform="translate(320 200) rotate(45)">
          <rect x="-52" y="-52" width="104" height="104" fill="${C.kaaba}"/>
          <rect x="-52" y="-52" width="104" height="12" fill="${C.gold}"/>
        </g>
        <!-- Hijr Isma'il: semicircular wall on the north-west side; pilgrims walk outside it -->
        <path d="M246 200 A 52 52 0 0 1 320 126" fill="none" stroke="${C.grey}" stroke-width="8" stroke-linecap="round"/>
        <!-- Black Stone corner (east) -->
        <circle cx="393" cy="200" r="13" fill="${C.stone}" stroke="${C.gold}" stroke-width="4"/>
        <text x="560" y="150" text-anchor="middle" font-size="22" font-family="Amiri, serif" fill="${C.stone}" font-weight="bold">الحجر الأسود</text>
        <path d="M520 160 L408 195" stroke="${C.stone}" stroke-width="3"/>
        <!-- Yemeni corner (south) -->
        <circle cx="320" cy="274" r="10" fill="${C.gold}"/>
        <text x="320" y="315" text-anchor="middle" font-size="20" font-family="Amiri, serif" fill="${C.goldText}" font-weight="bold">الركن اليماني</text>
        <!-- moving pilgrim starts at the Black Stone -->
        <g class="orbit"><circle cx="455" cy="200" r="16" fill="${C.white}" stroke="${C.green}" stroke-width="4"/><circle cx="455" cy="200" r="6" fill="${C.skin}"/></g>
        <text x="320" y="32" text-anchor="middle" font-size="24" font-family="Amiri, serif" fill="${C.green}" font-weight="bold">٧ أشواط — الكعبة عن يسارك</text>
        <text x="320" y="388" text-anchor="middle" font-size="20" font-family="Amiri, serif" fill="${C.text}">البداية والنهاية عند الحجر الأسود</text>`);
    },

    maqam() {
      return frame(`
        <rect x="0" y="300" width="640" height="100" fill="${C.ground}"/>
        ${kaaba(160, 300, 130)}
        <!-- Maqam Ibrahim glass case -->
        <g transform="translate(330 300)">
          <path d="M-30 0 v-70 q0 -30 30 -30 q30 0 30 30 v70z" fill="${C.gold}" opacity="0.85" stroke="#8a6508" stroke-width="3"/>
          <rect x="-36" y="-6" width="72" height="12" fill="#8a6508"/>
        </g>
        <!-- praying person (sujud) -->
        <g transform="translate(470 290)">
          <path d="M-60 0 q0 -50 40 -50 q30 0 40 30 q10 20 10 20z" fill="${C.white}" stroke="${C.grey}" stroke-width="2"/>
          <circle cx="-60" cy="-8" r="14" fill="${C.skin}"/>
        </g>
        <!-- Zamzam cup -->
        <g transform="translate(590 285)">
          <path d="M-22 -40 h44 l-6 40 h-32z" fill="${C.blue}" opacity="0.85"/>
          <text x="0" y="-52" text-anchor="middle" font-size="20" font-family="Amiri, serif" fill="${C.blue}" font-weight="bold">زمزم</text>
        </g>
        <text x="330" y="60" text-anchor="middle" font-size="26" font-family="Amiri, serif" fill="${C.green}" font-weight="bold">ركعتان خلف مقام إبراهيم</text>`);
    },

    sai() {
      return frame(`
        <style>
          @keyframes shuttle { 0% { transform: translateX(0);} 50% { transform: translateX(360px);} 100% { transform: translateX(0);} }
          .walker { animation: shuttle 8s ease-in-out infinite; }
        </style>
        <rect x="0" y="260" width="640" height="140" fill="${C.ground}"/>
        <!-- corridor -->
        <rect x="80" y="230" width="480" height="70" fill="#e6dccb" stroke="${C.grey}" stroke-width="3"/>
        <!-- hills -->
        <path d="M20 300 q60 -110 130 0z" fill="${C.grey}"/>
        <path d="M490 300 q60 -110 130 0z" fill="${C.grey}"/>
        <text x="85" y="200" text-anchor="middle" font-size="30" font-family="Amiri, serif" fill="${C.green}" font-weight="bold">الصفا</text>
        <text x="555" y="200" text-anchor="middle" font-size="30" font-family="Amiri, serif" fill="${C.green}" font-weight="bold">المروة</text>
        <!-- green lights -->
        <rect x="255" y="215" width="14" height="90" fill="${C.greenLight}"/><circle cx="262" cy="212" r="10" fill="#4ade80"/>
        <rect x="375" y="215" width="14" height="90" fill="${C.greenLight}"/><circle cx="382" cy="212" r="10" fill="#4ade80"/>
        <!-- double arrow -->
        <path d="M130 130 H510" stroke="${C.green}" stroke-width="8" stroke-linecap="round"/>
        <path d="M130 130 l25 -15 v30z M510 130 l-25 -15 v30z" fill="${C.green}"/>
        <text x="320" y="110" text-anchor="middle" font-size="24" font-family="Amiri, serif" fill="${C.green}" font-weight="bold">٧ أشواط — تنتهي عند المروة</text>
        <!-- walker -->
        <g class="walker">${person(140, 300, 0.75)}</g>`);
    },

    halq() {
      return frame(`
        <rect x="0" y="300" width="640" height="100" fill="${C.ground}"/>
        ${person(220, 300, 1.4)}
        <!-- razor / scissors -->
        <g transform="translate(300 180) rotate(-30)">
          <rect x="-8" y="-60" width="16" height="60" rx="4" fill="${C.grey}"/>
          <rect x="-22" y="-80" width="44" height="22" rx="4" fill="${C.stone}"/>
        </g>
        <g transform="translate(430 220)">
          <circle cx="-14" cy="20" r="14" fill="none" stroke="${C.stone}" stroke-width="6"/>
          <circle cx="14" cy="20" r="14" fill="none" stroke="${C.stone}" stroke-width="6"/>
          <path d="M-10 8 l30 -70 M10 8 l-30 -70" stroke="${C.stone}" stroke-width="6" stroke-linecap="round"/>
        </g>
        <!-- check mark -->
        <g transform="translate(540 120)">
          <circle r="50" fill="${C.green}"/>
          <path d="M-25 0 l15 18 l35 -40" fill="none" stroke="${C.white}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <text x="320" y="380" text-anchor="middle" font-size="28" font-family="Amiri, serif" fill="${C.green}" font-weight="bold">تمّت العمرة، تقبّل الله</text>`);
    },

    prohibitions() {
      return frame(`
        <g transform="translate(320 200)">
          <circle r="150" fill="none" stroke="${C.red}" stroke-width="18"/>
          <path d="M-105 -105 L105 105" stroke="${C.red}" stroke-width="18" stroke-linecap="round"/>
          <!-- perfume bottle -->
          <g transform="translate(-60 20)"><rect x="-25" y="-40" width="50" height="70" rx="10" fill="${C.gold}"/><rect x="-10" y="-60" width="20" height="22" fill="${C.grey}"/></g>
          <!-- scissors -->
          <g transform="translate(60 -10)"><circle cx="-12" cy="30" r="12" fill="none" stroke="${C.stone}" stroke-width="6"/><circle cx="12" cy="30" r="12" fill="none" stroke="${C.stone}" stroke-width="6"/><path d="M-8 20 l25 -60 M8 20 l-25 -60" stroke="${C.stone}" stroke-width="6" stroke-linecap="round"/></g>
        </g>`);
    },

    mistakes() {
      return frame(`
        <g transform="translate(320 200)">
          <path d="M0 -150 L150 120 H-150z" fill="${C.gold}" stroke="#8a6508" stroke-width="6" stroke-linejoin="round"/>
          <rect x="-14" y="-70" width="28" height="110" rx="10" fill="${C.kaaba}"/>
          <circle cy="75" r="16" fill="${C.kaaba}"/>
        </g>`);
    },

    general() {
      return frame(`
        <rect x="0" y="300" width="640" height="100" fill="${C.ground}"/>
        <!-- raised hands -->
        <g transform="translate(320 250)" fill="${C.skin}">
          <path d="M-90 40 q-10 -90 20 -120 q20 -20 30 20 v100z"/>
          <path d="M90 40 q10 -90 -20 -120 q-20 -20 -30 20 v100z"/>
        </g>
        <!-- plane -->
        <g transform="translate(120 90) rotate(-15)" fill="${C.blue}">
          <path d="M-60 0 h100 l30 -10 l10 10 l-10 10 l-30 -10 h-100z"/>
          <path d="M-10 0 l-30 -40 h20 l40 40z M-10 0 l-30 40 h20 l40 -40z"/>
        </g>
        <!-- mosque dome with crescent -->
        <g transform="translate(520 300)">
          <path d="M-70 0 v-60 a70 70 0 0 1 140 0 v60z" fill="${C.green}"/>
          <path d="M0 -130 v-16" stroke="${C.gold}" stroke-width="5"/>
          <path d="M8 -160 a16 16 0 1 0 0 30 a11 11 0 1 1 0 -30z" fill="${C.gold}"/>
        </g>
        <!-- suitcase -->
        <g transform="translate(120 300)">
          <rect x="-50" y="-70" width="100" height="70" rx="10" fill="${C.gold}"/>
          <rect x="-18" y="-86" width="36" height="16" rx="6" fill="none" stroke="${C.gold}" stroke-width="6"/>
          <path d="M-50 -40 h100" stroke="#8a6508" stroke-width="4"/>
        </g>`);
    }
  };

  function get(name) {
    const fn = draw[name];
    return fn ? fn() : "";
  }

  return { get };
})();
