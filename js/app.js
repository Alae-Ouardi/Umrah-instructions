/* Application: routing, rendering, counters, font size, install prompt. */
(function () {
  "use strict";

  const DATA = window.UMRAH_DATA;
  const I18N = window.I18N;
  const ILL = window.ILLUSTRATIONS;

  const $ = (sel) => document.querySelector(sel);
  const main = $("#main");
  const nav = $("#stepnav");
  const btnPrev = $("#btn-prev");
  const btnNext = $("#btn-next");
  const progress = $("#progress");

  const KEYS = { scale: "umrah.scale", translit: "umrah.translit", counter: "umrah.counter." };
  const SCALE_MIN = 0.85, SCALE_MAX = 1.6, SCALE_STEP = 0.15;

  // ---------- storage helpers (never throw) ----------
  function store(key, val) { try { localStorage.setItem(key, String(val)); } catch (_) { /* ignore */ } }
  function read(key, fallback) {
    try { const v = localStorage.getItem(key); return v === null ? fallback : v; } catch (_) { return fallback; }
  }

  // ---------- escaping ----------
  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function nl(s) { return esc(s).replace(/\n/g, "<br>"); }

  // ---------- routing (hash based, works offline and as installed app) ----------
  function route() {
    const h = (location.hash || "#/").replace(/^#/, "");
    const m = h.match(/^\/step\/([a-z]+)$/);
    if (m) return { view: "step", id: m[1] };
    const r = h.match(/^\/ref\/([a-z]+)$/);
    if (r) return { view: "ref", id: r[1] };
    if (h === "/done") return { view: "done" };
    if (h === "/install") return { view: "install" };
    return { view: "home" };
  }

  function go(hash) { location.hash = hash; }

  // ---------- font scale ----------
  let scale = parseFloat(read(KEYS.scale, "1")) || 1;
  function applyScale() {
    document.documentElement.style.setProperty("--scale", scale.toFixed(2));
    $("#btn-font-dec").disabled = scale <= SCALE_MIN + 0.01;
    $("#btn-font-inc").disabled = scale >= SCALE_MAX - 0.01;
  }
  function changeScale(delta) {
    scale = Math.min(SCALE_MAX, Math.max(SCALE_MIN, +(scale + delta).toFixed(2)));
    store(KEYS.scale, scale);
    applyScale();
  }

  // ---------- transliteration toggle ----------
  function translitHidden() { return read(KEYS.translit, I18N.lang() === "ar" ? "hide" : "show") === "hide"; }
  function applyTranslit() { document.body.classList.toggle("hide-translit", translitHidden()); }

  // ---------- renderers ----------
  function renderDua(d) {
    const rep = d.repeat ? `<span class="dua__repeat">${esc(I18N.pick(d.repeat))}</span>` : "";
    return `<article class="dua">
      <div class="dua__when"><span class="ico" aria-hidden="true">🤲</span><span>${esc(I18N.pick(d.when))}</span>${rep}</div>
      <p class="dua__ar" lang="ar" dir="rtl">${nl(d.ar)}</p>
      <p class="dua__translit" lang="en" dir="ltr">${nl(d.translit)}</p>
      <p class="dua__en">${nl(I18N.lang() === "ar" ? "" : d.en)}</p>
      <p class="dua__src"><strong>${esc(I18N.t("sourceLabel"))}:</strong> ${esc(I18N.pick(d.source))}</p>
    </article>`;
  }

  function renderNotes(notes) {
    if (!notes) return "";
    const parts = [];
    if (notes.warn) parts.push(`<div class="note note--warn"><div class="note__title"><span aria-hidden="true">⚠️</span>${esc(I18N.t("notesWarn"))}</div><p>${esc(I18N.pick(notes.warn))}</p></div>`);
    if (notes.women) parts.push(`<div class="note note--women"><div class="note__title"><span aria-hidden="true">🧕</span>${esc(I18N.t("notesWomen"))}</div><p>${esc(I18N.pick(notes.women))}</p></div>`);
    if (notes.elderly) parts.push(`<div class="note note--elderly"><div class="note__title"><span aria-hidden="true">♿</span>${esc(I18N.t("notesElderly"))}</div><p>${esc(I18N.pick(notes.elderly))}</p></div>`);
    return parts.length ? `<div class="notes">${parts.join("")}</div>` : "";
  }

  function renderFigure(name) {
    const svg = ILL.get(name);
    if (!svg) return "";
    const cap = I18N.t("figureCaption")[name] || "";
    return `<figure class="step__figure">${svg}<figcaption>${esc(cap)}</figcaption></figure>`;
  }

  function renderCounter(step) {
    const c = step.counter;
    if (!c) return "";
    const n = Math.min(c.total, parseInt(read(KEYS.counter + c.key, "0"), 10) || 0);
    const dots = Array.from({ length: c.total }, (_, i) => `<span class="counter__dot ${i < n ? "counter__dot--on" : ""}"></span>`).join("");
    const done = n >= c.total;
    return `<section class="counter" data-counter="${c.key}" data-total="${c.total}">
      <div class="counter__title">${esc(I18N.pick(c.label))}</div>
      <div class="counter__value" aria-live="polite">${n}</div>
      <div class="counter__of">${esc(I18N.pick(c.unit))} ${n} / ${c.total}</div>
      <div class="counter__dots" aria-hidden="true">${dots}</div>
      ${done ? `<div class="counter__done">✅ ${esc(I18N.t("counterDone"))}</div>` : ""}
      <div class="counter__actions">
        <button type="button" class="btn btn--primary btn--big" data-action="count" ${done ? "disabled" : ""}>＋ ${esc(I18N.t("counterTap"))}</button>
        <button type="button" class="btn btn--ghost" data-action="reset">${esc(I18N.t("counterReset"))}</button>
      </div>
    </section>`;
  }

  function translitToggle() {
    const hidden = translitHidden();
    return `<div class="toggle-row"><button type="button" class="btn btn--ghost" data-action="translit">${esc(I18N.t(hidden ? "translitShow" : "translitHide"))}</button></div>`;
  }

  function renderHome() {
    const items = DATA.steps.map((s, i) => `
      <li><button type="button" class="steplist__item" data-go="#/step/${s.id}">
        <span class="steplist__num" aria-hidden="true">${i + 1}</span>
        <span class="steplist__body">
          <p class="steplist__title">${esc(I18N.pick(s.title))}</p>
          <p class="steplist__place">${esc(I18N.pick(s.place))}</p>
        </span>
        <span class="steplist__chev" aria-hidden="true">${I18N.lang() === "ar" ? "‹" : "›"}</span>
      </button></li>`).join("");

    const refs = DATA.refs.map((r) => `
      <li><button type="button" class="steplist__item steplist__item--ref" data-go="#/ref/${r.id}">
        <span class="steplist__num" aria-hidden="true">${r.icon}</span>
        <span class="steplist__body"><p class="steplist__title">${esc(I18N.pick(r.title))}</p></span>
        <span class="steplist__chev" aria-hidden="true">${I18N.lang() === "ar" ? "‹" : "›"}</span>
      </button></li>`).join("");

    const installItem = `
      <li><button type="button" class="steplist__item steplist__item--ref steplist__item--wide" data-go="#/install">
        <span class="steplist__num" aria-hidden="true">📲</span>
        <span class="steplist__body"><p class="steplist__title">${esc(I18N.t("install"))}</p><p class="steplist__place">${esc(I18N.t("installText"))}</p></span>
        <span class="steplist__chev" aria-hidden="true">${I18N.lang() === "ar" ? "‹" : "›"}</span>
      </button></li>`;

    main.innerHTML = `
      <section class="hero">
        <h1 class="hero__title">${esc(I18N.t("heroTitle"))}</h1>
        <p class="hero__sub">${esc(I18N.t("heroSub"))}</p>
        <div class="hero__actions"><button type="button" class="btn btn--primary btn--big" data-go="#/step/${DATA.steps[0].id}">${esc(I18N.t("startBtn"))}</button></div>
      </section>
      <h2 class="section-title">${esc(I18N.t("stepsTitle"))}</h2>
      <ol class="steplist">${items}</ol>
      <h2 class="section-title">${esc(I18N.t("refsTitle"))}</h2>
      <ul class="steplist">${refs}${installItem}</ul>`;
    nav.hidden = true;
  }

  function renderStep(id) {
    const idx = DATA.steps.findIndex((s) => s.id === id);
    if (idx < 0) { go("#/"); return; }
    const s = DATA.steps[idx];
    const total = DATA.steps.length;
    const body = I18N.pick(s.body).map((p) => `<li>${esc(p)}</li>`).join("");
    const duas = s.duas.map(renderDua).join("");

    main.innerHTML = `
      <header class="step__header">
        <p class="step__kicker">${esc(I18N.t("stepOf", { n: idx + 1, total }))}</p>
        <h1 class="step__title">${esc(I18N.pick(s.title))}</h1>
        <span class="step__place"><span aria-hidden="true">📍</span>${esc(I18N.pick(s.place))}</span>
      </header>
      ${renderFigure(s.illustration)}
      <section class="card">
        <h2 class="card__title"><span class="ico" aria-hidden="true">📋</span>${esc(I18N.t("whatToDo"))}</h2>
        <ol class="step__body">${body}</ol>
      </section>
      ${renderCounter(s)}
      <h2 class="section-title">${esc(I18N.t("duasTitle"))}</h2>
      ${translitToggle()}
      ${duas}
      ${renderNotes(s.notes)}`;

    nav.hidden = false;
    const rtl = document.documentElement.dir === "rtl";
    $("#arrow-prev").textContent = rtl ? "›" : "‹";
    $("#arrow-next").textContent = rtl ? "‹" : "›";
    progress.textContent = `${idx + 1} / ${total}`;
    btnPrev.disabled = idx === 0;
    btnPrev.dataset.go = idx > 0 ? `#/step/${DATA.steps[idx - 1].id}` : "#/";
    btnNext.dataset.go = idx < total - 1 ? `#/step/${DATA.steps[idx + 1].id}` : "#/done";
    btnNext.querySelector("[data-i18n]").textContent = I18N.t(idx < total - 1 ? "next" : "finish");
  }

  function renderRef(id) {
    const r = DATA.refs.find((x) => x.id === id);
    if (!r) { go("#/"); return; }
    const body = I18N.pick(r.body);
    const list = body.length ? `<section class="card"><ul class="step__body">${body.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>${r.source ? `<p class="dua__src"><strong>${esc(I18N.t("sourceLabel"))}:</strong> ${esc(I18N.pick(r.source))}</p>` : ""}</section>` : "";
    const duas = (r.duas || []).map(renderDua).join("");
    main.innerHTML = `
      <header class="step__header"><h1 class="step__title">${r.icon} ${esc(I18N.pick(r.title))}</h1></header>
      ${renderFigure(r.illustration)}
      ${list}
      ${duas ? translitToggle() + duas : ""}
      <div class="hero__actions"><button type="button" class="btn btn--ghost btn--block" data-go="#/">${esc(I18N.t("backHome"))}</button></div>`;
    nav.hidden = true;
  }

  function renderDone() {
    main.innerHTML = `
      <section class="hero">
        <div style="font-size:5rem" aria-hidden="true">🕋</div>
        <h1 class="hero__title">${esc(I18N.t("completeTitle"))}</h1>
        <p class="hero__sub">${esc(I18N.t("completeText"))}</p>
        <p class="dua__ar" lang="ar" dir="rtl">اللَّهُمَّ تَقَبَّلْ مِنَّا</p>
        <div class="hero__actions">
          <button type="button" class="btn btn--primary btn--big" data-go="#/">${esc(I18N.t("backHome"))}</button>
        </div>
      </section>`;
    nav.hidden = true;
  }

  function renderInstall() {
    const ios = isIOS();
    const standalone = isStandalone();
    let content;
    if (standalone) {
      content = `<div class="card card--accent"><p>✅ ${esc(I18N.t("installedOk"))}</p></div>`;
    } else if (ios) {
      content = `<section class="card ios-guide">
        <h2 class="card__title">${esc(I18N.t("iosTitle"))}</h2>
        <ol>
          <li><span class="ico" aria-hidden="true">⬆️</span> ${esc(I18N.t("iosStep1"))}</li>
          <li><span class="ico" aria-hidden="true">➕</span> ${esc(I18N.t("iosStep2"))}</li>
          <li><span class="ico" aria-hidden="true">✅</span> ${esc(I18N.t("iosStep3"))}</li>
        </ol></section>`;
    } else {
      content = deferredPrompt
        ? `<section class="card"><p>${esc(I18N.t("installText"))}</p>
            <button type="button" class="btn btn--primary btn--big btn--block" id="btn-install-page">📲 ${esc(I18N.t("install"))}</button></section>`
        : `<section class="card ios-guide">
            <h2 class="card__title">${esc(I18N.t("manualTitle"))}</h2>
            <ol>
              <li><span class="ico" aria-hidden="true">⋮</span> ${esc(I18N.t("manualStep1"))}</li>
              <li><span class="ico" aria-hidden="true">➕</span> ${esc(I18N.t("manualStep2"))}</li>
            </ol>
            <p class="dua__src">${esc(I18N.t("offlineReady"))}</p>
          </section>`;
    }
    main.innerHTML = `
      <header class="step__header"><h1 class="step__title">📲 ${esc(I18N.t("install"))}</h1></header>
      ${content}
      <div class="hero__actions"><button type="button" class="btn btn--ghost btn--block" data-go="#/">${esc(I18N.t("backHome"))}</button></div>`;
    nav.hidden = true;
    const b = $("#btn-install-page");
    if (b) b.addEventListener("click", promptInstall);
  }

  function render() {
    const r = route();
    if (r.view === "step") renderStep(r.id);
    else if (r.view === "ref") renderRef(r.id);
    else if (r.view === "done") renderDone();
    else if (r.view === "install") renderInstall();
    else renderHome();
    window.scrollTo({ top: 0, behavior: "instant" });
    main.focus({ preventScroll: true });
  }

  // ---------- install (PWA) ----------
  let deferredPrompt = null;
  function isIOS() { return /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream; }
  function isStandalone() { return window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true; }

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (read("umrah.installDismissed", "") !== "1" && !isStandalone()) {
      $("#install-text").textContent = I18N.t("installText");
      $("#install-banner").hidden = false;
    }
  });
  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    $("#install-banner").hidden = true;
    if (route().view === "install") renderInstall();
  });
  async function promptInstall() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    try { await deferredPrompt.userChoice; } catch (_) { /* user closed */ }
    deferredPrompt = null;
    $("#install-banner").hidden = true;
  }
  $("#btn-install").addEventListener("click", promptInstall);
  $("#btn-install-dismiss").addEventListener("click", () => {
    store("umrah.installDismissed", "1");
    $("#install-banner").hidden = true;
  });

  // ---------- events ----------
  document.addEventListener("click", (e) => {
    const goEl = e.target.closest("[data-go]");
    if (goEl) { go(goEl.dataset.go); return; }

    const act = e.target.closest("[data-action]");
    if (!act) return;
    const action = act.dataset.action;

    if (action === "translit") {
      store(KEYS.translit, translitHidden() ? "show" : "hide");
      applyTranslit();
      render();
      return;
    }
    const counterEl = act.closest("[data-counter]");
    if (counterEl) {
      const key = KEYS.counter + counterEl.dataset.counter;
      const total = parseInt(counterEl.dataset.total, 10);
      const cur = parseInt(read(key, "0"), 10) || 0;
      if (action === "count") store(key, Math.min(total, cur + 1));
      if (action === "reset") store(key, 0);
      if (navigator.vibrate) navigator.vibrate(30);
      const y = window.scrollY;
      render();
      window.scrollTo({ top: y });
    }
  });

  $("#btn-home").addEventListener("click", () => go("#/"));
  $("#btn-lang").addEventListener("click", () => {
    I18N.set(I18N.lang() === "ar" ? "en" : "ar");
    render();
  });
  $("#btn-font-dec").addEventListener("click", () => changeScale(-SCALE_STEP));
  $("#btn-font-inc").addEventListener("click", () => changeScale(SCALE_STEP));
  window.addEventListener("hashchange", render);

  // keyboard: arrows move between steps
  document.addEventListener("keydown", (e) => {
    if (nav.hidden) return;
    const rtl = document.documentElement.dir === "rtl";
    const nextKey = rtl ? "ArrowLeft" : "ArrowRight";
    const prevKey = rtl ? "ArrowRight" : "ArrowLeft";
    if (e.key === nextKey) go(btnNext.dataset.go);
    if (e.key === prevKey && !btnPrev.disabled) go(btnPrev.dataset.go);
  });

  // ---------- boot ----------
  I18N.set(I18N.load());
  applyScale();
  applyTranslit();
  render();
})();
