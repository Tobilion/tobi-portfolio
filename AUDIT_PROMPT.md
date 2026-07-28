# Repository Fix Prompt — ALL REMAINING TASKS (30 New Issues)

Both `npm run typecheck` and `npm run lint` pass. The agent found 30 additional issues during a fresh full-codebase audit. Organized by severity.

---

## 🔴 CRITICAL (Production-Breaking)

### 1. Race Condition in `SplineScene` — Mount Guard Missing
**File:** `src/components/ui/splite.tsx:55-65`  
**Issue:** `requestIdleCallback` can fire after unmount → `setCanMount(true)` on unmounted component.  
**Fix:** Add `mounted` guard in the effect cleanup.

```tsx
// In SplineScene component, replace the useEffect (lines 55-65):
useEffect(() => {
  let mounted = true;
  if ('requestIdleCallback' in window) {
    const id = requestIdleCallback(() => { if (mounted) setCanMount(true); }, { timeout: 3000 });
    return () => { mounted = false; cancelIdleCallback(id); };
  } else {
    const id = setTimeout(() => { if (mounted) setCanMount(true); }, 1500);
    return () => { mounted = false; clearTimeout(id); };
  }
}, []);
```

---

### 2. `useTextScramble` — Leaks Timers on Rapid Re-renders/Unmount
**File:** `src/hooks/useTextScramble.ts:16-58`  
**Issue:** Multiple `setTimeout` calls can stack; cleanup only clears latest.  
**Fix:** Track all timer IDs in an array and clear all on cleanup.

```ts
// Replace the useEffect body (lines 16-58):
useEffect(() => {
  let started = false;
  const timers: ReturnType<typeof setTimeout>[] = [];

  const start = (): void => {
    started = true;
    frame.current = 0;
    const totalFrames = text.length * 3;

    const tick = (): void => {
      const progress = frame.current / totalFrames;
      const resolvedCount = Math.floor(progress * text.length);

      const scrambled = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < resolvedCount) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplay(scrambled);
      frame.current++;

      if (frame.current <= totalFrames) {
        const id = setTimeout(tick, speed);
        timers.push(id);
      } else {
        setDisplay(text);
      }
    };
    tick();
  };

  const delayId = setTimeout(start, delay);
  timers.push(delayId);

  return () => {
    timers.forEach(clearTimeout);
    if (started) setDisplay(text);
  };
}, [text, delay, speed]);
```

---

### 3. `SolarSystem` — CSS Style Element Never Cleaned Up
**File:** `src/components/ui/solar-system.tsx:63-73`  
**Issue:** Injects `<style id="solar-orbit-keyframes">` into `<head>` on mount; never removed on unmount → duplicate styles on lazy remount.  
**Fix:** Add cleanup to remove the style element.

```tsx
// Replace the useEffect (lines 63-73):
useEffect(() => {
  const styleId = "solar-orbit-keyframes";
  if (document.getElementById(styleId)) return;
  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    @keyframes orbit-cw { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes orbit-label { from { transform: translateX(-50%) rotate(0deg); } to { transform: translateX(-50%) rotate(-360deg); } }
  `;
  document.head.appendChild(style);
  return () => { const el = document.getElementById(styleId); el?.remove(); };
}, []);
```

---

## 🟠 HIGH (Runtime Bugs / Security / UX)

### 4. `tubelight-navbar` Scroll-Spy — Broken by Lazy Section Fallbacks
**File:** `src/components/ui/tubelight-navbar.tsx:44-69`  
**Issue:** `ready` delay (1.5s) doesn't help because `scrollHeight` includes all `SectionFallback` (`min-h-screen`) placeholders → "Contact" lights up immediately.  
**Fix:** Replace scroll-position math with `IntersectionObserver` per section.

```tsx
// Replace the entire "Scroll spy" useEffect (lines 44-70):
useEffect(() => {
  const observers = items.map((item) => {
    const targetId = item.url.replace("#", "");
    if (!targetId) return null;
    const el = document.getElementById(targetId);
    if (!el) return null;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActiveTab(item.name);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );
    obs.observe(el);
    return obs;
  });
  return () => observers.forEach((o) => o?.disconnect());
}, [items]);
```

---

### 5. `AnimatedCounter` in `Experience` — Restarts on Stack/Timeline Toggle
**File:** `src/components/sections/Experience.tsx:22-41`  
**Issue:** `useInView` with `once: true` fires again when `TimelineNode` remounts on `isExpanded` toggle.  
**Fix:** Add `hasAnimated` guard.

```tsx
// In AnimatedCounter component (lines 22-41):
function AnimatedCounter({ value, suffix, prefix = "" }: { value: number; suffix: string; prefix?: string }): React.JSX.Element {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || hasAnimated) return;
    setHasAnimated(true);
    const duration = 1200;
    const startTime = performance.now();
    const timer = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value, hasAnimated]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}
```

---

### 6. GitHub Token Exposed in Client Bundle
**File:** `src/components/sections/GitHubActivity.tsx:105`  
**Issue:** `VITE_GITHUB_TOKEN` is inlined into production JS bundle.  
**Fix:** Move GitHub API call to a Vercel Edge Function / API route.

**Steps:**
1. Create `api/github-activity.ts` (Vercel Edge Function):
```ts
// api/github-activity.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const token = process.env.GITHUB_TOKEN; // Server-side only
  const response = await fetch("https://api.github.com/users/Tobilion/events?per_page=30", {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const events = await response.json();
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
  res.status(200).json(events);
}
```

2. In `GitHubActivity.tsx`, replace the `fetch` call:
```ts
// Remove token logic, change fetch URL:
const response = await fetch("/api/github-activity");
const events = await response.json();
```

3. Add `GITHUB_TOKEN` to Vercel Project Settings → Environment Variables (NOT prefixed `VITE_`).

---

### 7. EmailJS Service ID + Template ID in Client Bundle
**File:** `src/components/sections/Contact.tsx:9-17`  
**Issue:** `VITE_EMAILJS_SERVICE_ID` and `VITE_EMAILJS_TEMPLATE_ID` are inlined. Public key is fine (designed for client), but service/template IDs allow quota abuse.  
**Fix:** Move to serverless function (same pattern as GitHub).

**Steps:**
1. Create `api/send-email.ts`:
```ts
// api/send-email.ts
import emailjs from '@emailjs/browser';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { name, email, phone, subject, message } = req.body;
  
  await emailjs.send(
    process.env.EMAILJS_SERVICE_ID!,
    process.env.EMAILJS_TEMPLATE_ID!,
    { from_name: name, from_email: email, phone, subject: subject || "Portfolio Contact", message, to_email: "tobilobajagun@gmail.com" },
    { publicKey: process.env.EMAILJS_PUBLIC_KEY! }
  );
  res.status(200).json({ ok: true });
}
```

2. In `Contact.tsx`, change `handleSend` to POST to `/api/send-email` instead of calling `emailjs.send` directly.

3. Move `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY` to Vercel env vars (no `VITE_` prefix).

---

### 8. `Navbar` + `ThemeToggle` — Duplicate Theme Logic, Race Condition
**Files:** `src/components/layout/Navbar.tsx:22-39`, `src/components/ui/theme-toggle.tsx:13-40`  
**Issue:** Both manage theme independently; `Navbar` reads `localStorage` in render (race with `index.html` pre-hydration script).  
**Fix:** Centralize in a `ThemeProvider` context.

**Create:** `src/providers/ThemeProvider.tsx`:
```tsx
"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark";
const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void } | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme") as Theme | null;
      if (stored) return stored;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
```

**Update `src/main.tsx`:**
```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './providers/ThemeProvider'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
```

**Update `Navbar.tsx`:** Remove lines 22-39 (theme state + useEffect), import `useTheme` from provider.

**Update `theme-toggle.tsx`:** Remove all theme logic, use `useTheme()`.

**Delete** the inline `<script>` from `index.html` (lines 5-13) — now handled in provider.

---

## 🟡 MEDIUM (Performance / Accessibility / Architecture)

### 9. `Projects.tsx` — 450+ Lines of Inline SVG Graphics
**File:** `src/components/sections/Projects.tsx:24-471`  
**Fix:** Extract each SVG to `src/components/ui/project-graphics/*.tsx` and lazy-import.

```bash
# Create directory and files:
mkdir -p src/components/ui/project-graphics
# Move each graphic function to its own file, e.g.:
# src/components/ui/project-graphics/NetPulseGraphic.tsx
```

Then in `Projects.tsx`:
```tsx
const NetPulseGraphic = lazy(() => import("../ui/project-graphics/NetPulseGraphic"));
// ... etc
```
Wrap in `<Suspense fallback={<div className="h-44" />}>` where used.

---

### 10. `SolarSystem` — Layout Thrashing on Resize
**File:** `src/components/ui/solar-system.tsx:53-83`  
**Fix:** Debounce `setContainerWidth`.

```tsx
// Add at top of component:
const [debouncedWidth, setDebouncedWidth] = useState(containerWidth);

useEffect(() => {
  const t = setTimeout(() => setDebouncedWidth(containerWidth), 150);
  return () => clearTimeout(t);
}, [containerWidth]);

// Use `debouncedWidth` instead of `containerWidth` for orbitConfig calculations (lines 75-86).
```

---

### 11. `TiltCard` / `MagneticButton` / `SpotlightCard` — No `prefers-reduced-motion` Guard
**Files:** `src/components/ui/TiltCard.tsx`, `MagneticButton.tsx`, `SpotlightCard.tsx`  
**Fix:** Add media query guard in each component.

```tsx
// In each component, add at top:
const prefersReduced = useMediaQuery("(prefers-reduced-motion: reduce)");
if (prefersReduced) return <>{children}</>;
```
Need `useMediaQuery` hook — add `src/hooks/useMediaQuery.ts`:
```ts
import { useState, useEffect } from "react";
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);
  return matches;
}
```

---

### 12. `Lenis` Global on `window` — Namespace Pollution
**Files:** `src/App.tsx:37`, `src/components/ui/tubelight-navbar.tsx:76`, `src/components/layout/Navbar.tsx:93`  
**Fix:** Create `LenisProvider` context.

**Create:** `src/providers/LenisProvider.tsx`:
```tsx
"use client";
import { createContext, useContext, useEffect, useRef, ReactNode } from "react";
import Lenis from "lenis";

const LenisContext = createContext<Lenis | null>(null);

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const lenis = new Lenis({
      duration: isMobile ? 0.6 : 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: isMobile ? 1.2 : 2,
      wheelMultiplier: isMobile ? 0.8 : 1.2,
    });
    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number): void {
      if (lenisRef.current) lenisRef.current.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <LenisContext.Provider value={lenisRef.current}>{children}</LenisContext.Provider>;
}

export function useLenis() {
  const ctx = useContext(LenisContext);
  if (!ctx) throw new Error("useLenis must be used within LenisProvider");
  return ctx;
}
```

**Update `App.tsx`:** Wrap `<main>` with `<LenisProvider>`, remove local Lenis init + `window.lenis`.

**Update consumers** (`Navbar.tsx`, `tubelight-navbar.tsx`): Use `const lenis = useLenis()` instead of `(window as any).lenis`.

---

### 13. `useSectionInView` — Threshold Too Low (5%)
**File:** `src/hooks/useSectionInView.js:6`  
**Fix:** Increase to 25% or use `rootMargin`.

```js
// Change line 6:
const isInView = useInView(ref, { once: false, amount: 0.25 });
// OR:
const isInView = useInView(ref, { once: false, margin: "-20%" });
```

---

### 14. `ProjectCard` — Inline Styles Block Tailwind JIT
**File:** `src/components/sections/Projects.tsx:519-524, 550-557`  
**Fix:** Define CSS variables for project colors in `index.css`, use via Tailwind arbitrary values.

```css
/* src/index.css — add to :root */
:root {
  --proj-netpulse: #38bdf8;
  --proj-loganalyzer: #00ff88;
  --proj-duplicate: #7c3aed;
  --proj-bet: #10b981;
  --proj-manager: #f43f5e;
  --proj-insight: #f59e0b;
  --proj-dreamkick: #00d4a3;
  --proj-habitline: #10b981;
  --proj-studyflash: #6366f1;
}
```
In `ProjectCard`:
```tsx
// Replace style={{ background: `${project.color}08` }} with:
className={`bg-[var(--proj-${slug})]/5`} // where slug maps title to variable name
// Replace style={{ background: project.color }} with:
className={`bg-[var(--proj-${slug})]`}
```

---

### 15. `Terminal` — Listener Leaks if Section Unmounts While Open
**File:** `src/components/ui/Terminal.tsx:93-105`  
**Fix:** Close terminal on unmount.

```tsx
// Add inside Terminal component:
useEffect(() => {
  return () => setOpen(false);
}, []);
```

---

### 16. `ErrorBoundary` — No Error Reporting Callback
**File:** `src/components/ui/ErrorBoundary.tsx:28-30`  
**Fix:** Add `onError` prop.

```tsx
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
  onError?: (error: Error, info: React.ErrorInfo) => void;
}

// In componentDidCatch:
componentDidCatch(error: unknown, info: React.ErrorInfo): void {
  console.error("ErrorBoundary caught:", error, info.componentStack);
  this.props.onError?.(error as Error, info);
}
```

Wire to your error tracking service in `App.tsx` where boundaries are used.

---

## 🟢 LOW (Type Safety / Code Quality / Config)

### 17. `any` Types — Type Safety Gaps
**Files:** 
- `src/App.tsx:37,50` → `(window as any).lenis` (fixed by LenisProvider)
- `src/components/ui/tubelight-navbar.tsx:76,80` → same
- `src/components/layout/Navbar.tsx:93` → same
- `src/components/sections/GitHubActivity.tsx` → missing `GitHubEvent` type

**Fix:** Create `src/types/github.d.ts`:
```ts
export interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  payload: {
    commits?: { message: string }[];
    pull_request?: { title: string; merged: boolean };
    action?: string;
    ref?: string;
  };
  created_at: string;
}
```
Import in `GitHubActivity.tsx`.

---

### 18. Missing ARIA / Keyboard Support
**Components:** `TiltCard`, `MagneticButton`, `SpotlightCard`, `SolarSystem` planets, `DisplayCard`  
**Fix:** Add `role="button"`, `tabIndex={0}`, `onKeyDown` (Enter/Space) to interactive `div`s. Or wrap in `<button>`.

---

### 19. `ContactCard` — Clipboard Fallback Missing
**File:** `src/components/sections/Contact.tsx:38-48`  
**Fix:** Add `execCommand('copy')` fallback for Safari/HTTP.

```ts
// In handleCopy catch block:
.catch(() => {
  // Fallback for non-secure contexts
  const textarea = document.createElement('textarea');
  textarea.value = value;
  document.body.appendChild(textarea);
  textarea.select();
  try { document.execCommand('copy'); } catch {}
  document.body.removeChild(textarea);
  setCopyError(true);
  setTimeout(() => setCopyError(false), 3000);
});
```

---

### 20. `index.html` — Inline Script Blocks CSP
**File:** `index.html:5-13`  
**Fix:** Move to `ThemeProvider` (already covered in Task 8). Delete the script block.

---

### 21. `sitemap.xml` / `robots.txt` — Hardcoded Vercel Subdomain
**Files:** `public/robots.txt:4`, `public/sitemap.xml:4`  
**Fix:** Generate at build time via Vite plugin, or use a script.

```bash
# Add to package.json scripts:
"build": "vite build && node scripts/generate-sitemap.js"
```
Create `scripts/generate-sitemap.js` that reads `process.env.VERCEL_URL` or custom domain env var.

---

### 22. `package.json` — Bleeding Edge Dependencies
**File:** `package.json:24,41`  
**Note:** React 19.2.6, Vite 8, Tailwind v4 are very new. Consider pinning to stable for production:
- `react@18.3.1`, `react-dom@18.3.1`
- `vite@5.4.0`
- `tailwindcss@3.4.0`
- `@tailwindcss/vite` → remove (v4 only)

If staying on v4, ensure all plugins are compatible and test on Node 22+.

---

### 23. `eslint.config.js` — `no-unused-vars` Ignores Legitimate Unused
**File:** `eslint.config.js:25`  
**Fix:** Remove `varsIgnorePattern`; fix actual unused vars.

```js
rules: {
  'no-unused-vars': 'error',
}
```
Then run `npm run lint` and fix reported issues.

---

### 24. `cv.pdf` — 220KB in Repo, No Source
**File:** `public/Tobiloba_Jagun_CV.pdf`  
**Fix:** Move to Git LFS or external storage (Vercel Blob). Regenerate from ReportLab script per AGENTS.md.

---

### 25. `"use client"` Directives — Ignored by Vite
**Files:** `splite.tsx:1`, `tubelight-navbar.tsx:1`, `theme-toggle.tsx:1`, `display-cards.tsx:1`, `solar-system.tsx:1`  
**Fix:** Remove all `"use client"` lines.

---

### 26. `GlassFilter` — Duplicated SVG Filter on Every Button
**File:** `src/components/ui/liquid-glass-button.tsx:113-172`  
**Fix:** Hoist to app root.

```tsx
// In App.tsx, inside the root div:
<div className="...">  // existing root div
  <GlassFilter />  // add this once
  <ScrollProgressBar />
  ...
</div>
```
Modify `GlassFilter` to not render inside `LiquidButton` — just define the filter globally.

---

### 27. `ScrollProgressBar` — Spring Jitters with Lenis
**File:** `src/components/ui/ScrollProgressBar.tsx:8`  
**Fix:** Remove spring or tune for stability.

```tsx
// Change line 8:
const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
// Or if you want slight smoothing:
const scaleX = useSpring(scrollYProgress, { stiffness: 500, damping: 50, mass: 0.5 });
```

---

### 28. `tubelight-navbar` — 1500ms Magic Number Delay
**File:** `src/components/ui/tubelight-navbar.tsx:25-27`  
**Fix:** Remove `ready` state and delay entirely (IntersectionObserver in Task 4 makes it unnecessary).

---

### 29. `NavBar` Desktop Pill — `layoutId` on 8 Items Causes Layout Thrashing
**File:** `src/components/ui/tubelight-navbar.tsx:104`  
**Issue:** Shared `layoutId="lamp"` on 8 nav items forces Framer Motion to track all 8 for layout animations.  
**Fix:** Only render the indicator for the active item.

```tsx
// Replace lines 102-114:
{isActive && (
  <motion.div
    layoutId="lamp"
    className="absolute inset-0 w-full bg-zinc-200/20 dark:bg-zinc-800/20 rounded-full -z-10"
    initial={false}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
  >
    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#0066CC] dark:bg-[#0070F3] rounded-full">
      <div className="absolute w-12 h-6 bg-[#0066CC]/30 dark:bg-[#0070F3]/30 rounded-full blur-md -top-2 -left-2" />
      <div className="absolute w-8 h-6 bg-[#0066CC]/30 dark:bg-[#0070F3]/30 rounded-full blur-md -top-1" />
      <div className="absolute w-4 h-4 bg-[#0066CC]/30 dark:bg-[#0070F3]/30 rounded-full blur-sm top-0 left-2" />
    </div>
  </motion.div>
)}
```

---

### 30. `DisplayCards` / `DisplayCard` — Unused in `Experience` (Only Mock Data)
**File:** `src/components/ui/display-cards.tsx` — only used with hardcoded `defaultCards` in `Experience.tsx`  
**Note:** The `experienceStackCards` array in `Experience.tsx` duplicates the mock data structure. Consider unifying or removing the component if not reused elsewhere.

---

## Verification Checklist

After all changes:

```bash
npm run typecheck
npm run lint
npm run build
npm run preview  # test production build locally
```

Verify manually:
- [ ] No console errors on load / navigation
- [ ] Scroll-spy highlights correct section
- [ ] Theme toggle persists, no flash
- [ ] GitHub activity loads (configure Vercel env var)
- [ ] Contact form sends (configure Vercel env vars)
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Lenis smooth scroll works
- [ ] No duplicate style elements in `<head>`
- [ ] Keyboard navigation works on all interactive elements