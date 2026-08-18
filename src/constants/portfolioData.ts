export const NAV_LINKS = ["About", "Skills", "Experience", "Projects", "Contact"];

export interface SkillSet {
  Languages: string[];
  "Dev Tools": string[];
  Frameworks: string[];
}

export const SKILLS: SkillSet = {
  Languages: ["JavaScript", "TypeScript", "Python", "HTML/CSS"],
  "Dev Tools": ["Git & GitHub", "Vite", "VS Code", "Vercel", "npm"],
  Frameworks: ["React", "Tailwind CSS", "Framer Motion", "Flask", "PySide6", "Pandas"],
};

export interface Experience {
  type: "education" | "work";
  role: string;
  company: string;
  period: string;
  desc: string;
}

export const EXPERIENCES: Experience[] = [
  {
    type: "education",
    role: "B.Sc. Computer Science",
    company: "Covenant University",
    period: "2024 – 2028 (expected)",
    desc: "Studying core computing systems, algorithm design, and software engineering principles. Aiming for First Class honours while building and shipping personal projects alongside coursework.",
  },
  {
    type: "work",
    role: "Intern",
    company: "VDT Communications",
    period: "Aug – Sep 2025",
    desc: "Rotated across IT, Network Servicing, Customer Service, and Field Engineering at one of Nigeria's leading broadband providers — designing ERDs, running IP diagnostics (latency and packet-loss analysis), and supporting engineers maintaining networking infrastructure.",
  },
  {
    type: "work",
    role: "Intern",
    company: "VDT Communications",
    period: "July – August 2026",
    desc: "Returned for a second internship at one of Nigeria's leading broadband providers — building on the network diagnostics and infrastructure support from the first stint with more responsibility across IT and field engineering teams.",
  },
  {
    type: "work",
    role: "Office Assistant",
    company: "Jagun Associates",
    period: "School holidays",
    desc: "Help out at the family estate-management firm during breaks — client records, property documentation, and day-to-day office operations.",
  },
  {
    type: "education",
    role: "WASSCE",
    company: "Rainbow College, Lagos",
    period: "2018 – 2024",
    desc: "A1 in Mathematics, Further Mathematics, Physics, and Computer Studies. Represented the school at the Mathematics Olympiad and was an active member of the STEM and LEGO Robotics clubs.",
  },
];

export interface Project {
  title: string;
  tags: string[];
  desc: string;
  color: string;
  githubUrl: string;
  demoUrl: string;
  npmUrl?: string;
  npmInstall?: string;
}

export const PROJECTS: Project[] = [
  {
    title: "Matchday Exchange",
    tags: ["React", "Vite", "Tailwind CSS", "Local Storage"],
    desc: "A fully client-side football simulation and prediction market: a tick-by-tick match engine drives live-shifting odds, single/accumulator slips, a same-game multi builder, mid-match cash-out, club ownership with a transfer market, and a 14-game casino suite. 96 Vitest tests with enforced coverage floors on the money-math, and an optional server-authoritative wallet that falls back gracefully to local computation.",
    color: "#10b981",
    githubUrl: "https://github.com/Tobilion/football-bet-simulator",
    demoUrl: "https://matchday-exchange.vercel.app/",
  },
  {
    title: "Local Project Console",
    tags: ["Node.js", "React", "WebSocket", "Ollama"],
    desc: "An offline command dispatcher and optional local AI coding assistant for managing multiple projects from one web UI — semantic intent matching across 141 intents and ~2,860 example phrases, a sandboxed tool-calling loop for opt-in AI mode, git safety checkpoints, and a self-learning confidence model. Published to npm as local-project-console; zero external API calls, everything stays on-device.",
    color: "#ec4899",
    githubUrl: "https://github.com/Tobilion/Project-console",
    demoUrl: "",
    npmUrl: "https://www.npmjs.com/package/local-project-console",
    npmInstall: "npm i local-project-console",
  },
  {
    title: "Dream Kick — 3D Football Game",
    tags: ["JavaScript", "Three.js", "PWA", "Game Dev"],
    desc: "A browser-based 3D football game with live playable 11v11 matches, AI opponents, ball physics, and a full career mode — built in vanilla JavaScript + Three.js with no build step and zero external assets: every texture, badge, and icon is generated in code at runtime. Deterministic seeded match engine, installable as an offline PWA, covered by 11 headless test suites.",
    color: "#00d4a3",
    githubUrl: "https://github.com/Tobilion/dream-kick",
    demoUrl: "https://dream-kick.vercel.app/",
  },
  {
    title: "footysim — Spatial Football Match Engine",
    tags: ["Python", "Simulation", "Physics", "Testing"],
    desc: "A headless, tick-driven 11v11 football match engine: 22 player agents and a ball resolved from real pitch geometry and player attributes at the point of contact, not top-level probability rolls. Deterministic (seeded matches are byte-identical), calibrated against real-world statistics (shots ~15, goals ~1.3 per match), and covered by an acceptance test suite.",
    color: "#84cc16",
    githubUrl: "https://github.com/Tobilion/footysim",
    demoUrl: "",
  },
  {
    title: "InsightFlow — Data Analysis Utility",
    tags: ["Python", "PySide6", "Pandas", "REST API"],
    desc: "A desktop stock-analysis tool with a guided three-step wizard: pulls daily price history from Alpha Vantage through a strictly layered pipeline (network → SQLite cache → cleaning → analysis → charts), computing returns, 20-day rolling mean and volatility, max drawdown, and ±2σ anomaly flags. Ships a bundled offline demo dataset, typed handling for every API failure mode, and 87 unit tests that need no network or display server.",
    color: "#f59e0b",
    githubUrl: "https://github.com/Tobilion/insightflow",
    demoUrl: "",
  },
  {
    title: "SportSim Pro",
    tags: ["React", "Vite", "Tailwind CSS", "Simulation"],
    desc: "A football management simulation game: full simulated seasons across 36 procedurally seeded clubs, squad building with a visual pitch formation editor, transfers with a youth academy, injury and morale systems, and a boardroom with facility upgrades. The watched match runs on a deterministic spatial match engine in a Web Worker, calibrated to real-world stat ranges.",
    color: "#f43f5e",
    githubUrl: "https://github.com/Tobilion/Sport-sim",
    demoUrl: "https://sport-sim-three.vercel.app/",
  },
  {
    title: "StudyFlash — Spaced Repetition Flashcards",
    tags: ["React", "Node.js", "SQLite", "PWA"],
    desc: "A full-stack spaced-repetition flashcard PWA: organize cards by Year → Semester → Course → Topic, review with the SM-2 algorithm, and study offline with the same scheduling mirrored client-side — ratings queue up and sync back automatically. Includes a Pomodoro focus timer, GitHub-style stats, leech detection with cram mode, and CSV/Anki export. Node's built-in SQLite keeps the backend dependency-free.",
    color: "#6366f1",
    githubUrl: "https://github.com/Tobilion/StudyFlash",
    demoUrl: "",
  },
  {
    title: "Log Analyzer",
    tags: ["TypeScript", "React", "Python", "Vite"],
    desc: "A security-log analysis CLI plus an interactive React companion: the zero-dependency Python CLI parses Common/Combined server logs, aggregates traffic metrics with stream buffering, and flags SQL-injection, path-traversal, and brute-force patterns; the web app runs the pipeline in the browser with CS-theory explainers.",
    color: "#00ff88",
    githubUrl: "https://github.com/Tobilion/log_analyzer",
    demoUrl: "https://log-analyzer-blue-gamma.vercel.app/",
  },
  {
    title: "Habitline — Habit Tracker",
    tags: ["JavaScript", "Canvas", "LocalStorage", "PWA"],
    desc: "A dependency-free habit tracker: streak logic counts only scheduled days, with a GitHub-style activity heatmap, per-weekday scheduling, flame badges, and JSON export/import — built as vanilla ES modules with no build step and no backend, every chart hand-rolled SVG and canvas.",
    color: "#10b981",
    githubUrl: "https://github.com/Tobilion/habitline",
    demoUrl: "https://habitline-chi.vercel.app/",
  },
  {
    title: "NetPulse — ISP Performance Tracker",
    tags: ["Python", "Flask", "SQLite", "Chart.js"],
    desc: "Logs real internet performance over time — speed tests, latency, packet loss, and outages — into SQLite, with a dark dashboard showing uptime %, hour-of-day congestion patterns, and outage history. Built in Lagos to get evidence for advertised speed vs. actual experience; CLI, Flask API, and dashboard are independently tested. Built on the IP diagnostics skills from my VDT internship.",
    color: "#38bdf8",
    githubUrl: "https://github.com/Tobilion/netpulse",
    demoUrl: "",
  },
  {
    title: "Joke Kick",
    tags: ["JavaScript", "Canvas", "PWA", "Game Dev"],
    desc: "The 2D prototype that became Dream Kick — a playable canvas-based football match with keyboard/touch controls, squad and tactics screens, and 100% code-drawn graphics, built to prove the concept before the game was rebuilt in 3D with Three.js.",
    color: "#facc15",
    githubUrl: "https://github.com/Tobilion/joke-kick",
    demoUrl: "",
  },
  {
    title: "Duplicate File Analyzer",
    tags: ["Python", "CLI", "Cryptography", "Hashing"],
    desc: "A Python CLI that finds duplicate files by content, not name: streaming SHA-256 hashing reads files in chunks so large databases never exhaust memory, and a Storage Analyzer report quantifies wasted space per duplicate cluster. Skips unreadable files and mid-scan deletions gracefully.",
    color: "#7c3aed",
    githubUrl: "https://github.com/Tobilion/Duplicate-File-Analyzer",
    demoUrl: "",
  },
];
