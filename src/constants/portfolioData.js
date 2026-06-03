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
    title: "Orbital — Dev Platform",
    tags: ["TypeScript", "React", "Kubernetes", "Postgres"],
    desc: "An internal developer experience platform with live metrics, deployment pipelines, and incident management baked in.",
    color: "#00ff88",
  },
  {
    title: "Spectra ML Engine",
    tags: ["Python", "PyTorch", "FastAPI", "Redis"],
    desc: "High-throughput inference engine serving custom vision models with sub-20ms response times at scale.",
    color: "#7c3aed",
  },
  {
    title: "Vaultex CLI",
    tags: ["Rust", "AWS", "Terraform", "GitHub Actions"],
    desc: "Open-source secrets management CLI with zero-config setup, encryption at rest, and team sharing capabilities.",
    color: "#0ea5e9",
  },
  {
    title: "Lumina UI Kit",
    tags: ["React", "Storybook", "Figma", "CSS"],
    desc: "A design system and component library used across 4 internal products, with full WCAG 2.1 AA compliance.",
    color: "#f59e0b",
  },
];