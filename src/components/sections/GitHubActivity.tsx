import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSectionInView } from "../../hooks/useSectionInView";
import { fadeUp, stagger } from "../../animations/variants";
import { GitCommitHorizontal, GitPullRequest, Star, GitFork, AlertCircle } from "lucide-react";

interface GitHubEvent {
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

interface ActivityItem {
  id: string;
  icon: React.ReactNode;
  text: string;
  repo: string;
  time: string;
  color: string;
}

function timeAgo(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function parseEvent(event: GitHubEvent): ActivityItem | null {
  const repo = event.repo.name.replace("Tobilion/", "");
  const time = timeAgo(event.created_at);

  switch (event.type) {
    case "PushEvent": {
      const msg = event.payload.commits?.[0]?.message ?? "pushed code";
      return {
        id: event.id,
        icon: <GitCommitHorizontal size={14} />,
        text: msg.split("\n")[0].slice(0, 72),
        repo,
        time,
        color: "#0066CC",
      };
    }
    case "PullRequestEvent": {
      const pr = event.payload.pull_request;
      if (!pr) return null;
      return {
        id: event.id,
        icon: <GitPullRequest size={14} />,
        text: pr.title.slice(0, 72),
        repo,
        time,
        color: pr.merged ? "#7c3aed" : "#0ea5e9",
      };
    }
    case "WatchEvent":
      return {
        id: event.id,
        icon: <Star size={14} />,
        text: "starred",
        repo,
        time,
        color: "#f59e0b",
      };
    case "ForkEvent":
      return {
        id: event.id,
        icon: <GitFork size={14} />,
        text: "forked",
        repo,
        time,
        color: "#10b981",
      };
    default:
      return null;
  }
}

function Skeleton(): React.JSX.Element {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-14 rounded-2xl bg-slate-100 dark:bg-zinc-800 animate-pulse" />
      ))}
    </div>
  );
}

export function GitHubActivity(): React.JSX.Element {
  const { ref, isInView } = useSectionInView();
  const [items, setItems] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    fetch("https://api.github.com/users/Tobilion/events?per_page=30")
      .then((r) => {
        if (!r.ok) throw new Error("rate limited");
        return r.json();
      })
      .then((events: GitHubEvent[]) => {
        const parsed = events
          .map(parseEvent)
          .filter((x): x is ActivityItem => x !== null)
          .slice(0, 8);
        setItems(parsed);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [isInView]);

  return (
    <section
      id="activity"
      ref={ref}
      className="py-32 relative bg-white dark:bg-[#0B0B0C] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_1.6fr] gap-16 items-start">
        {/* Left */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.span variants={fadeUp} className="text-xs font-mono text-[#0066CC] tracking-widest uppercase font-semibold">
            07 / Activity
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-extrabold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight mt-3">
            Live on GitHub
          </motion.h2>
          <motion.div variants={fadeUp} className="mt-3 w-12 h-px bg-[#0066cc]/40" />
          <motion.p variants={fadeUp} className="mt-6 text-sm text-[#86868B] dark:text-zinc-400 leading-relaxed max-w-xs">
            Real-time feed pulled directly from the GitHub API. I build in public — here's the proof.
          </motion.p>
          <motion.a
            variants={fadeUp}
            href="https://github.com/Tobilion"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            className="inline-flex items-center gap-2 mt-8 px-5 py-2.5 rounded-full border border-[#0066cc]/30 bg-[#0066cc]/5 hover:bg-[#0066cc]/10 text-xs font-mono font-semibold text-[#0066cc] transition-colors"
          >
            View profile →
          </motion.a>
        </motion.div>

        {/* Right — feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {loading && <Skeleton />}

          {error && (
            <div className="flex items-center gap-3 text-sm text-slate-400 dark:text-zinc-500 p-6 rounded-2xl border border-dashed border-slate-200 dark:border-zinc-800">
              <AlertCircle size={16} />
              GitHub rate limit reached — check back in a minute.
            </div>
          )}

          {!loading && !error && (
            <div className="flex flex-col gap-3">
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="flex items-start gap-4 p-4 rounded-2xl border border-slate-200/60 dark:border-zinc-800/60 bg-[#F5F5F7]/85 dark:bg-zinc-900/85 backdrop-blur-md hover:border-slate-300 dark:hover:border-zinc-700 transition-all duration-200"
                >
                  <div
                    className="mt-0.5 shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: `${item.color}15`, color: item.color }}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#1D1D1F] dark:text-[#F5F5F7] font-medium truncate">{item.text}</p>
                    <p className="text-xs font-mono text-slate-400 dark:text-zinc-500 mt-0.5 truncate">{item.repo}</p>
                  </div>
                  <span className="text-[11px] font-mono text-slate-300 dark:text-zinc-600 shrink-0 pt-0.5">{item.time}</span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default GitHubActivity;
