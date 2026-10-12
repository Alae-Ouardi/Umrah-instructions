# دليل العمرة — Umrah Guide

A static, responsive, installable (PWA) website that walks a pilgrim through each step
of Umrah and shows the du'as to say at each place. Arabic (right-to-left) is the default,
English is one tap away. Designed for elderly users: one step per screen, very large
buttons, adjustable text size, high contrast, and it works fully offline once opened.

## Content sources

- IslamQA #154979 — *How to perform Umrah* (Shaykh Ibn Uthaymin), Arabic and English.
- IslamQA #34744 — *Du'a during Umrah* (hadith references for every du'a).
- IslamQA #11356 — *Prohibitions of ihram*.
- Hisn al-Muslim (Sa'id al-Qahtani) — voweled Arabic of the general du'as.

All text lives in one file: `js/data/steps.js`. Every du'a carries the voweled Arabic,
a transliteration, the English meaning and its source. There is deliberately **no**
invented "du'a per circuit"; the sources state none exists.

## Features

- 7 Umrah steps with an illustration each (animated tawaf direction and sa'i).
- Du'a cards: Arabic first, then transliteration (can be hidden) and meaning, with source.
- Notes per step for women and for elderly / wheelchair users.
- Tap-to-count lap counters for tawaf and sa'i (7 each), remembered on the device.
- Reference screens: ihram prohibitions, common mistakes, travel du'as.
- A− / A+ text size control, remembered on the device.
- Install to home screen (Android install button, iPhone step-by-step guide).
- Complete offline support through a service worker.
- Print-friendly stylesheet.

## Run locally

Any static file server works. For example:

```bash
python3 -m http.server 8765
# open http://localhost:8765/
```

The service worker only registers over `https://` or `localhost`.

## Deploy

Upload the whole folder to any static host (GitHub Pages, Netlify, Cloudflare Pages,
an ordinary web server). No build step. Requirements:

- Serve over HTTPS (needed for install and offline).
- Keep the folder structure as is; all paths are relative.
- After changing any file, bump `CACHE_VERSION` in `sw.js` so installed copies update.

## Project layout

```
index.html              app shell (lang=ar dir=rtl)
manifest.webmanifest    PWA manifest
sw.js                   offline service worker (precache list)
css/base.css            tokens, typography, buttons, cards
css/layout.css          responsive layout, RTL/LTR, components
css/print.css           print stylesheet
js/data/steps.js        ALL content (steps, du'as, notes, references)
js/i18n.js              UI strings ar/en, language + direction switch
js/illustrations.js     inline SVG drawings per step
js/app.js               routing, rendering, counters, font size, install
js/sw-register.js       service worker registration
fonts/                  Amiri (SIL Open Font License), self-hosted
icons/                  PWA icons
```

## Editing content

Edit `js/data/steps.js` only. Each step has `title`, `place`, `body` (list of
instructions), `duas` (array of `{when, ar, translit, en, source, repeat?}`), and
optional `notes` (`women`, `elderly`, `warn`) and `counter`. Every text field is an
object with `ar` and `en` keys.

## Live site

https://dalil-umrah.netlify.app

## Redeploy

The folder is already linked to the Netlify project. After changing any file,
**bump `CACHE_VERSION` in `sw.js` first**, otherwise phones that already installed
the guide keep serving the old version. Then:

```bash
npx netlify-cli deploy --prod --dir . --no-build
```

`--no-build` and the empty `command` in `netlify.toml` are both required: Netlify's
framework detection otherwise guesses a build tool and the deploy fails.
