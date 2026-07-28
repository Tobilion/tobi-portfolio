# Portfolio Site — Complete Bug Fix & Functionality Prompt for Claude

## Context
This is a React 19 + TypeScript + Vite 8 portfolio site for Tobiloba Jagun (Front-End Developer & CS Student). Deployed on Vercel: https://tobiloba-jagun-portfolio.vercel.app/

**Stack:** React 19, TypeScript (strict, allowJs), Vite 8 (Rolldown), Tailwind CSS v4 (@tailwindcss/vite), Framer Motion 12, Lenis 1 (smooth scroll), Spline (@splinetool/react-spline), EmailJS, Radix Slot + CVA + clsx/tailwind-merge.

**Structure:**
```
src/
  App.tsx, main.tsx
  animations/variants.ts
  components/
    layout/Navbar.tsx, Footer.tsx
    sections/Hero, About, Skills, Experience, Projects, Blog, GitHubActivity, Contact
    ui/ (SplineScene, ErrorBoundary, ScrollProgressBar, Terminal, tubelight-navbar, theme-toggle, liquid-glass-button, MagneticButton, GlowOrb, TiltCard, SpotlightCard, solar-system, display-cards, project-graphics/*)
  constants/portfolioData.ts
  hooks/useSectionInView.js, useTextScramble.ts, useMediaQuery.ts
  lib/utils.ts
  providers/ThemeProvider.tsx, LenisProvider.tsx
  types/global.d.ts
public/
  robots.txt, sitemap.xml, Images/, Tobiloba_Jagun_CV.pdf
api/
  github-activity.ts, send-email.ts  (Vercel serverless functions)
```

---

## Current Status
**All 30 audit items + 3 follow-ups implemented and verified:**
- `npm run typecheck` ✓
- `npm run lint` ✓  
- `npm run build` ✓ (with sitemap/robots generation)

---

## Remaining Issues to Fix

### 1. GitHub Activity Not Loading in Local Dev
**Problem:** `/api/github-activity` is a Vercel serverless function — returns 404 in `vite dev`.
**Expected:** Works when running `npx vercel dev` (starts Vite + API routes on localhost:3000).
**Fix needed:** Document this clearly. Optionally add a fallback mock data mode for `vite dev`.

### 2. SVG Animation Errors in Console (Development)
**Errors:**
```
Error: <circle> attribute r: Expected length, "undefined"
Error: <path> attribute d: Expected moveto path command ('M' or 'm'), "undefined"
```
**Cause:** 9 project-graphics files use `motion.path`/`motion.circle` with `animate={{ d: [...] }}` or `animate={{ r: [...] }}` but no initial valid value.
**Files:** `src/components/ui/project-graphics/*.tsx` (9 files)
**Fix:** Add valid initial `d`/`r` values to each animated SVG element, or suppress these specific warnings in dev.

### 3. Scroll Wheel Not Working in Some Browsers/Environments
**Status:** Fixed in LenisProvider with `wrapper: window, content: document.documentElement` and StrictMode-safe instance creation. Verify it works.

### 4. Contact Form EmailJS in Dev
**Problem:** EmailJS credentials are server-side now (in `/api/send-email`), but the fallback `mailto:` path is used when `EMAILJS_READY` is false.
**Expected:** In production (Vercel), form submits via `/api/send-email`. In local dev without Vercel, falls back to mailto.

---

## Expected Functionality (Verify All Work)

### Core Navigation & Scroll
- [ ] **Mouse wheel scroll** works smoothly (Lenis)
- [ ] **Keyboard scroll** (arrow keys, space, page up/down) works
- [ ] **Navbar scroll-spy** highlights correct section (IntersectionObserver-based)
- [ ] **Smooth scroll to sections** on nav click (Lenis `scrollTo`)
- [ ] **Mobile hamburger drawer** opens/closes, links work
- [ ] **Skip-to-content link** works (Tab from top)

### Sections
- [ ] **Hero:** Spline 3D scene loads, fallback image shows during load, text scramble animations run
- [ ] **About:** Solar System loads, planets clickable (mouse + keyboard), info card opens
- [ ] **Skills:** Bento grid cards, tilt/magnetic/spotlight effects work, respects `prefers-reduced-motion`
- [ ] **Experience:** Stack cards → click → timeline expands, animated counters count up once
- [ ] **Projects:** 9 cards, lazy-loaded SVG graphics, screenshots for 2 projects, links work
- [ ] **Blog (Now):** 3 cards, static content
- [ ] **GitHub Activity:** Loads from `/api/github-activity` (requires `vercel dev`), shows error gracefully if unavailable
- [ ] **Contact:** Form submits (EmailJS in prod, mailto fallback in dev), copy email works with clipboard fallback
- [ ] **Footer:** Links work, current year updates

### Animations & Effects
- [ ] **Framer Motion** animations run on scroll into view (`useSectionInView` threshold 0.25)
- [ ] **TiltCard** (Projects, Skills) — mouse tilt, disabled for `prefers-reduced-motion`
- [ ] **MagneticButton** (Hero CTAs) — magnetic pull, disabled for `prefers-reduced-motion`
- [ ] **SpotlightCard** (Skills, Projects) — radial gradient follow, disabled for `prefers-reduced-motion`
- [ ] **SolarSystem** — CSS-orbiting planets, click/keyboard interaction, paused on card open
- [ ] **Terminal** — backtick (`) toggles, commands work (`whoami`, `help`, `ls`, `github`, etc.)
- [ ] **ScrollProgressBar** — thin blue line at top, smooth progress
- [ ] **GlowOrb** (Hero) — animated gradient orbs
- [ ] **LiquidGlassButton / MetalButton** — glassmorphism + press effects

### Theme & Accessibility
- [ ] **Dark/Light toggle** persists in localStorage, respects OS preference initially
- [ ] **No flash of wrong theme** on load (ThemeProvider initializes before render)
- [ ] **`prefers-reduced-motion`** disables all motion effects (TiltCard, MagneticButton, SpotlightCard, CSS animations)
- [ ] **Keyboard navigation** works on all interactive elements (SolarSystem planets have `role="button"`, `tabIndex=0`, `onKeyDown`)
- [ ] **ARIA labels** on icon-only buttons
- [ ] **Focus visible** states on all interactive elements

### Performance
- [ ] **Lazy loading** — all sections except Hero load via `Suspense` + `SectionFallback` (min-h-screen)
- [ ] **Code splitting** — each section + each project graphic = separate chunk
- [ ] **Content-visibility** on sections for offscreen paint skipping
- [ ] **WebP images** with JPEG fallback (Hero, project screenshots)
- [ ] **DNS prefetch/preconnect** for Spline CDN

### SEO & Meta
- [ ] **Canonical URL** matches Vercel domain
- [ ] **Open Graph / Twitter cards** correct
- [ ] **JSON-LD Person schema** in index.html
- [ ] **robots.txt** and **sitemap.xml** generated at build time with correct domain
- [ ] **No hardcoded Vercel subdomain** in generated files (uses env var)

### Dev/Deploy
- [ ] `npm run dev` — Vite dev server (no API routes)
- [ ] `npx vercel dev` — Vite + Vercel API routes (full functionality locally)
- [ ] `npm run build` — production build + sitemap/robots generation
- [ ] `npm run typecheck` — TypeScript strict check
- [ ] `npm run lint` — ESLint flat config (includes TS files)
- [ ] `push-portfolio.bat` — git commit/push helper (prompts for message)

---

## Files That May Need Attention

### High Priority
1. **`src/components/ui/project-graphics/*.tsx` (9 files)** — Add initial values to `motion.path` `d` and `motion.circle` `r` attributes to silence console errors
2. **`src/components/sections/GitHubActivity.tsx`** — Consider adding mock data fallback for `vite dev`
3. **`src/providers/LenisProvider.tsx`** — Verify scroll works in all browsers (current: ref-based, StrictMode-safe)

### Medium Priority
4. **`src/components/sections/Contact.tsx`** — Verify EmailJS serverless function works in production
5. **`src/components/ui/solar-system.tsx`** — Verify `scaleFactor` calculation doesn't produce NaN
6. **`src/hooks/useTextScramble.ts`** — Timer cleanup verified, but check for rapid re-renders

### Low Priority
7. **`src/components/ui/ScrollProgressBar.tsx`** — Spring config (stiffness: 500) may need tuning
8. **`src/components/ui/liquid-glass-button.tsx`** — `GlassFilter` hoisted to App root, verify no duplicate SVG filters
9. **`index.html`** — Inline theme script removed, verify no CSP issues

---

## Testing Checklist for Claude

Run these commands and verify:
```bash
# 1. TypeScript strict check
npm run typecheck

# 2. Lint (includes TS files)
npm run lint

# 3. Production build + sitemap generation
npm run build

# 4. Local dev WITH API routes (full functionality)
npx vercel dev
# Open http://localhost:3000 — test everything

# 5. Preview production build
npm run preview
```

**In browser console (vercel dev):**
- [ ] No red errors (except possibly the SVG ones if not fixed)
- [ ] GitHub Activity loads real data
- [ ] Contact form submits (check Network tab for `/api/send-email`)
- [ ] Mouse wheel scrolls smoothly
- [ ] All animations respect `prefers-reduced-motion` (test in DevTools → Rendering → Emulate CSS prefers-reduced-motion)
- [ ] Keyboard navigation works (Tab through all interactive elements)
- [ ] No layout shift on load (CLS = 0)

---

## Environment Variables Required

**Vercel Project Settings → Environment Variables:**
```
GITHUB_TOKEN                    # GitHub personal access token (read:user scope)
EMAILJS_SERVICE_ID              # EmailJS service ID
EMAILJS_TEMPLATE_ID             # EmailJS template ID
EMAILJS_PUBLIC_KEY              # EmailJS public key
SITE_URL                        # Optional: custom domain (e.g., tobiloba.dev)
VERCEL_URL                      # Auto-set by Vercel (used for sitemap generation)
```

**Local `.env` (for `vercel dev`):**
```
GITHUB_TOKEN=ghp_xxx
EMAILJS_SERVICE_ID=service_xxx
EMAILJS_TEMPLATE_ID=template_xxx
EMAILJS_PUBLIC_KEY=xxx
SITE_URL=http://localhost:3000
```

---

## Known Limitations
- **Spline chunk (4.5MB / 1.4MB gzipped)** — Unavoidable, heavy WebGL runtime
- **GitHub Activity** — Requires `vercel dev` or deployed Vercel; won't work in plain `vite dev`
- **EmailJS** — Client-side fallback to `mailto:` when not configured; serverless in production
- **`prefers-reduced-motion`** — Only disables JS-driven motion (Framer Motion); CSS animations disabled via media query in `index.css`

---

## Deliverables for This Task
1. Fix SVG animation initial values in all 9 project-graphics files
2. Add mock data fallback for GitHub Activity in `vite dev` (optional)
3. Verify all functionality in `npx vercel dev`
4. Confirm `npm run typecheck && npm run lint && npm run build` all pass
5. Provide summary of any remaining issues