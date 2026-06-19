export const NAV_LINKS = ["About", "Skills", "Experience", "Projects", "Contact"];

export const SKILLS = {
  Languages: ["TypeScript", "Python", "Rust", "Go", "SQL", "C++", "Bash", "Java"],
  "Dev Tools": ["Docker", "Kubernetes", "Git", "Webpack", "Vite", "Terraform", "AWS", "CI/CD"],
  Architecture: ["Microservices", "Event-Driven", "CQRS", "GraphQL", "REST", "WebSockets", "gRPC", "DDD"],
};

export const EXPERIENCES = [
  {
    type: "education",
    role: "B.Sc. Computer Science",
    company: "Covenant University",
    period: "2024 – Present",
    desc: "Currently pursuing a degree in Computer Science, focusing on core computing systems, algorithm design, and software engineering principles.",
  },
  {
    type: "work",
    role: "Senior Software Engineer",
    company: "Quantum Systems Inc.",
    period: "2023 – Present",
    desc: "Led migration of monolithic backend to distributed microservices, reducing p95 latency by 60%. Architected a real-time event pipeline handling 2M+ events/day.",
  },
  {
    type: "work",
    role: "Full-Stack Engineer",
    company: "NexaCloud",
    period: "2021 – 2023",
    desc: "Built internal developer platform used by 200+ engineers. Owned frontend performance — reduced bundle size by 45% through code splitting and lazy loading.",
  },
  {
    type: "work",
    role: "Software Developer",
    company: "Vertex Labs",
    period: "2019 – 2021",
    desc: "Delivered 3 major product features shipped to 500K users. Introduced testing culture that brought coverage from 12% to 78% in 6 months.",
  },
];

export const PROJECTS = [
  {
    title: "Log Analyzer",
    tags: ["TypeScript", "React", "Python", "Vite"],
    desc: "An asynchronous system utility that monitors active server log directories, parses incoming logs in real time, and triggers safety alerts on critical stack traces using string tokenizers.",
    color: "#00ff88",
    githubUrl: "https://github.com/Tobilion/log_analyzer",
    demoUrl: "https://ai.studio/apps/d926e70d-03e5-4d04-9c14-676f97e1e86b",
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
    desc: "A web-based football betting simulator where users can manage virtual bankrolls, place bets on real-time simulated odds, and track their performance history.",
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
    title: "Vaultex CLI — lightweight secrets manager",
    tags: ["Rust", "CLI", "Cryptography", "AWS"],
    desc: "An open-source, zero-configuration secrets management tool written in Rust, featuring end-to-end local encryption, dynamic sharing patterns, and secret rotation workflows.",
    color: "#0ea5e9",
    githubUrl: "https://github.com/Tobilion/vaultex-cli",
    demoUrl: "",
  },
];