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
    desc: "Rotated across IT, Network Servicing, Customer Service, and Field Engineering at one of Nigeria's leading broadband providers — designing ERDs, running IP diagnostics (latency and packet-loss analysis), and supporting engineers maintaining networking infrastructure. Returning July – August 2026.",
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
}

export const PROJECTS: Project[] = [
  {
    title: "NetPulse — ISP Performance Tracker",
    tags: ["Python", "Flask", "SQLite", "Chart.js"],
    desc: "Logs real internet performance over time — speed tests, latency, packet loss, and outages — into SQLite, with a dark-themed dashboard showing uptime %, hour-of-day congestion patterns, and outage history. Built on the IP diagnostics skills from my VDT internship.",
    color: "#38bdf8",
    githubUrl: "https://github.com/Tobilion/netpulse",
    demoUrl: "",
  },
  {
    title: "Log Analyzer",
    tags: ["TypeScript", "React", "Python", "Vite"],
    desc: "An asynchronous system utility that monitors active server log directories, parses incoming logs in real time, and triggers safety alerts on critical stack traces using string tokenizers.",
    color: "#00ff88",
    githubUrl: "https://github.com/Tobilion/log_analyzer",
    demoUrl: "https://log-analyzer-blue-gamma.vercel.app/",
  },
  {
    title: "Duplicate File Analyzer",
    tags: ["Python", "CLI", "Cryptography", "Hashing"],
    desc: "A high-performance command-line utility that identifies duplicate files and analyzes storage footprints using cryptographic chunked hashing for maximum speed and accuracy.",
    color: "#7c3aed",
    githubUrl: "https://github.com/Tobilion/Duplicate-File-Analyzer",
    demoUrl: "",
  },
  {
    title: "Football Bet Simulator",
    tags: ["React", "Vite", "Tailwind CSS", "Local Storage"],
    desc: "An offline-first football simulation and sportsbook: a real-time match engine drives live-shifting odds, single/accumulator slips, Bet Builder, mid-match Cash Out, club ownership with a transfer market, and a 14-game casino suite — all client-side.",
    color: "#10b981",
    githubUrl: "https://github.com/Tobilion/football-bet-simulator",
    demoUrl: "https://football-bet-simulator.vercel.app/",
  },
  {
    title: "Football Manager Simulator",
    tags: ["React", "Vite", "Tailwind CSS", "Simulation"],
    desc: "A sports management simulation game allowing users to take control of a club, formulate tactics, schedule matches, and guide their team to success through database simulation.",
    color: "#f43f5e",
    githubUrl: "https://github.com/Tobilion/Sport-sim",
    demoUrl: "https://sport-sim-three.vercel.app/",
  },
  {
    title: "InsightFlow — Data Analysis Utility",
    tags: ["Python", "PySide6", "Pandas", "REST API"],
    desc: "A modular, desktop-based data analysis utility with a guided wizard interface. Features real-time financial data retrieval, automated cleaning, and analysis using Pandas.",
    color: "#f59e0b",
    githubUrl: "https://github.com/Tobilion/insightflow",
    demoUrl: "",
  },
  {
    title: "Dream Kick — 3D Football Game",
    tags: ["JavaScript", "Three.js", "PWA", "Game Dev"],
    desc: "A browser-based 3D football game with live playable 11v11 matches, AI opponents, ball physics, and a career mode — built in vanilla JavaScript with zero external assets: every texture, badge, and icon is generated in code at runtime. Installable as an offline PWA.",
    color: "#00d4a3",
    githubUrl: "https://github.com/Tobilion/dream-kick",
    demoUrl: "https://dream-kick.vercel.app/",
  },
  {
    title: "Habitline — Habit Tracker",
    tags: ["JavaScript", "Canvas", "LocalStorage", "PWA"],
    desc: "A habit tracker with streak tracking, a GitHub-style activity heatmap, per-weekday scheduling, and JSON export/import — built as a single dependency-free HTML file with hand-rolled SVG charts and canvas confetti.",
    color: "#10b981",
    githubUrl: "https://github.com/Tobilion/habitline",
    demoUrl: "https://habitline-chi.vercel.app/",
  },
  {
    title: "StudyFlash — Spaced Repetition Flashcards",
    tags: ["React", "Node.js", "SQLite", "PWA"],
    desc: "A full-stack flashcard app for students: organize cards by Year → Semester → Course → Topic, review with the SM-2 spaced-repetition algorithm, track streaks and mastery, export to CSV/Anki, and keep reviewing offline with automatic sync-back.",
    color: "#6366f1",
    githubUrl: "https://github.com/Tobilion/StudyFlash",
    demoUrl: "",
  },
];
