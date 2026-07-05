# CLAUDE.md

Personal portfolio site for Tobiloba Jagun. Deployed on Vercel: https://tobiloba-jagun-portfolio.vercel.app/

## Stack

- React 19 + TypeScript (mixed TS/JS, `allowJs: true`, strict mode) on Vite 8
- Tailwind CSS v4 via `@tailwindcss/vite` plugin (no tailwind.config file — v4 CSS-first config in `src/index.css`)
- Framer Motion (animations), Lenis (smooth scroll), Spline (`@splinetool/react-spline`, 3D hero canvas)
- Radix Slot + CVA + clsx/tailwind-merge (shadcn-style UI utilities in `src/lib/utils.ts`)
- EmailJS (contact form, browser-side)
- ESLint 10 flat config

## Folder structure

```
src/
  App.tsx, main.tsx        entry
  animations/variants.ts   shared Framer Motion variants
  components/
    layout/                Navbar, Footer
    sections/              Hero, About, Skills, Projects, Experience, Blog, GitHubActivity, Contact
    ui/                    reusable widgets (splite.tsx = Spline wrapper, tubelight-navbar, etc.)
  constants/portfolioData.ts   all portfolio content/data lives here
  hooks/                   useSectionInView.js, useTextScramble.ts
  lib/utils.ts             cn() helper
  types/global.d.ts
```

Path alias: `@/*` → `src/*` (set in vite.config.js, tsconfig.json, and jsconfig.json).

## Commands

- `npm run dev` — dev server
- `npm run build` — production build (no tsc step; run typecheck separately)
- `npm run typecheck` — `tsc -p tsconfig.json` (noEmit)
- `npm run lint` — eslint
- `npm run preview` — preview built dist
- `push-portfolio.bat` — Windows helper: clears stale `.git/index.lock`, stages, commits, pushes (commit message is hardcoded — edit before use)

## Env

EmailJS credentials in `.env` (see `.env.example`): `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`. Must also be set in Vercel project settings.

## Gotchas

- `vite.config.js` `manualChunks` is a **function**, not an object — required by Rolldown (Vite 8's bundler). Don't convert back to object form.
- Tailwind v4: no `tailwind.config.js`; theme/customization goes in CSS. Don't add v3-style config.
- Mixed .js/.ts codebase — new files should be TypeScript; `useSectionInView.js` remains JS.
- `.git/index.lock` gets stale on Windows sometimes (hence the .bat cleanup step).
- Site supports LTR/RTL (English/Arabic) toggle — layout changes must work in both directions.
- Dark-mode default (`#0a0a0a` backdrop); respects OS preference.
