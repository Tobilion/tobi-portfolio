import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface TerminalLine {
  type: "input" | "output" | "error" | "system";
  text: string;
}

const COMMANDS: Record<string, string | string[]> = {
  whoami: "Tobiloba Jagun — Software Engineer & Front-End Developer",
  help: [
    "Available commands:",
    "  whoami          Who am I",
    "  ls              List directory",
    "  ls projects     Show all projects",
    "  cat about.txt   Read my bio",
    "  cat contact.txt My contact info",
    "  skills          View my tech stack",
    "  github          Open my GitHub",
    "  clear           Clear terminal",
    "  exit            Close terminal",
  ],
  ls: ["about.txt", "contact.txt", "projects/", "skills.json", "cv.pdf"],
  "ls projects": [
    "log-analyzer/",
    "duplicate-file-analyzer/",
    "matchday-exchange/",
    "football-manager-sim/",
    "insightflow/",
    "vaultex-cli/",
  ],
  "cat about.txt": [
    "Hi — I'm Tobi.",
    "A software engineer obsessed with distributed systems,",
    "developer experience, and the craft of high-quality software.",
    "My journey started tinkering with network protocols at 14.",
    "Today I architect systems at scale.",
  ],
  "cat contact.txt": [
    "Email:    tobilobajagun@gmail.com",
    "Phone:    +2347073948340",
    "Location: Ikoyi, Lagos, Nigeria",
    "Status:   Available for freelance & full-time",
  ],
  skills: [
    "Languages:    TypeScript · Python · Rust · Go · SQL · C++",
    "Frontend:     React · Vite · Tailwind · Framer Motion",
    "Backend:      Node · FastAPI · gRPC · GraphQL",
    "Infra:        Docker · Kubernetes · Terraform · AWS",
    "Architecture: Microservices · Event-Driven · CQRS · DDD",
  ],
  github: "__OPEN_GITHUB__",
};

function processCommand(input: string): { lines: string[]; action?: string } {
  const trimmed = input.trim().toLowerCase();

  if (trimmed === "") return { lines: [] };
  if (trimmed === "exit" || trimmed === "q") return { lines: [], action: "EXIT" };
  if (trimmed === "clear") return { lines: [], action: "CLEAR" };

  const result = COMMANDS[trimmed];

  if (!result) {
    return { lines: [`bash: ${trimmed}: command not found. Type 'help' for commands.`] };
  }
  if (result === "__OPEN_GITHUB__") {
    window.open("https://github.com/Tobilion", "_blank");
    return { lines: ["Opening github.com/Tobilion..."] };
  }
  if (Array.isArray(result)) return { lines: result };
  return { lines: [result] };
}

/**
 * Terminal easter egg. Open/close with backtick (`) key.
 */
export function Terminal(): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: "system", text: "Tobiloba Jagun — dev terminal v1.0.0" },
    { type: "system", text: "Type 'help' for available commands." },
    { type: "system", text: "─────────────────────────────────" },
  ]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Toggle on backtick
  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "`" && !e.ctrlKey && !e.metaKey) {
        const tag = (e.target as HTMLElement).tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        e.preventDefault();
        setOpen(prev => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close terminal on unmount
  useEffect(() => {
    return () => setOpen(false);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  // Scroll to bottom on new output
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const submit = useCallback((): void => {
    const cmd = input;
    if (!cmd.trim()) {
      // Empty enter: echo a blank prompt line but don't record it in history
      setHistory(prev => [...prev, { type: "input", text: "$" }]);
      setInput("");
      return;
    }
    setHistory(prev => [...prev, { type: "input", text: `$ ${cmd}` }]);
    setCmdHistory(prev => [cmd, ...prev]);
    setHistIdx(-1);

    const { lines, action } = processCommand(cmd);

    if (action === "EXIT") {
      setOpen(false);
      setInput("");
      return;
    }
    if (action === "CLEAR") {
      setHistory([
        { type: "system", text: "Tobiloba Jagun — dev terminal v1.0.0" },
        { type: "system", text: "Type 'help' for available commands." },
        { type: "system", text: "─────────────────────────────────" },
      ]);
      setInput("");
      return;
    }

    setHistory(prev => [
      ...prev,
      ...lines.map(l => ({ type: "output" as const, text: l })),
    ]);
    setInput("");
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") { submit(); return; }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(next);
      setInput(cmdHistory[next] ?? "");
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? "" : cmdHistory[next] ?? "");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="terminal"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.97 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-[9997] w-[min(560px,calc(100vw-2rem))] rounded-2xl overflow-hidden shadow-2xl border border-zinc-700/80 font-mono text-sm"
          style={{ background: "#0d1117" }}
        >
          {/* Title bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-700/60">
            <div className="flex gap-2">
              <button onClick={() => setOpen(false)} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-xs text-zinc-400 tracking-wide">tobi@portfolio — bash</span>
            <button
              onClick={() => setOpen(false)}
              className="text-zinc-500 hover:text-zinc-200 transition-colors cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>

          {/* Output */}
          <div className="h-72 overflow-y-auto px-4 py-3 space-y-0.5">
            {history.map((line, i) => (
              <div
                key={i}
                className={
                  line.type === "input"   ? "text-[#58a6ff]" :
                  line.type === "system"  ? "text-zinc-500" :
                  line.type === "error"   ? "text-red-400" :
                  "text-[#3fb950]"
                }
              >
                {line.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-4 py-3 border-t border-zinc-700/60 bg-zinc-900/50">
            <span className="text-[#58a6ff] shrink-0">$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-[#3fb950] caret-[#3fb950] placeholder-zinc-600"
              placeholder="type a command..."
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          {/* Hint */}
          <div className="px-4 py-1.5 bg-zinc-950 text-[10px] text-zinc-600 text-center tracking-wider">
            Press ` (backtick) or ESC to close · ↑↓ for command history
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Terminal;
