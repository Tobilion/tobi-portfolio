import React from "react";
import { motion } from "framer-motion";
import { useSectionInView } from "../../hooks/useSectionInView";
import { fadeUp, stagger } from "../../animations/variants";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  color: string;
}

const POSTS: Post[] = [
  {
    slug: "zero-config-secrets-manager-rust",
    title: "Building a Zero-Config Secrets Manager in Rust",
    excerpt:
      "How I designed Vaultex CLI — a tool that handles end-to-end local encryption, secret rotation, and dynamic sharing without a single config file. A deep dive into AES-256-GCM, the Rust ownership model, and why zero-config UX is harder than it sounds.",
    date: "May 2026",
    readTime: "8 min read",
    tags: ["Rust", "CLI", "Cryptography"],
    color: "#0ea5e9",
  },
  {
    slug: "high-performance-log-analyzer",
    title: "Lessons from Building a High-Performance Log Analyzer",
    excerpt:
      "Real-time log parsing sounds simple until you're processing 50MB/s of unstructured text with sub-second alert latency requirements. Here's how I used async I/O, string tokenizers, and a sliding-window buffer to make it work — and what I'd do differently.",
    date: "Mar 2026",
    readTime: "6 min read",
    tags: ["TypeScript", "Python", "Systems"],
    color: "#00ff88",
  },
  {
    slug: "microservices-latency-lessons",
    title: "How We Cut p95 Latency by 60% Migrating to Microservices",
    excerpt:
      "The rewrite nobody wanted to do but everyone needed. A frank account of migrating a monolith to distributed microservices at Quantum Systems — the good decisions, the costly mistakes, and the one architectural choice that made all the difference.",
    date: "Jan 2026",
    readTime: "10 min read",
    tags: ["Go", "Microservices", "Architecture"],
    color: "#7c3aed",
  },
];

interface PostCardProps {
  post: Post;
  index: number;
}

function PostCard({ post, index }: PostCardProps): React.JSX.Element {
  return (
    <motion.article
      variants={fadeUp}
      custom={index}
      className="group rounded-3xl border border-slate-200/50 dark:border-zinc-800/50 bg-[#F5F5F7]/85 dark:bg-zinc-900/85 backdrop-blur-md overflow-hidden flex flex-col hover:border-slate-300 dark:hover:border-zinc-700 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.01)] dark:shadow-none"
    >
      {/* Colour accent bar */}
      <div className="h-1 w-full" style={{ background: post.color }} />

      <div className="p-7 flex flex-col gap-4 flex-1">
        {/* Meta */}
        <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400 dark:text-zinc-500">
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-[#1D1D1F] dark:text-[#F5F5F7] leading-snug group-hover:text-[#0066CC] dark:group-hover:text-[#0070F3] transition-colors duration-200">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-[#86868B] dark:text-zinc-400 leading-relaxed flex-1">
          {post.excerpt}
        </p>

        {/* Tags + CTA */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2.5 py-1 rounded-md font-mono font-semibold"
                style={{
                  background: `${post.color}10`,
                  color: post.color,
                  border: `1px solid ${post.color}20`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="text-xs font-mono font-semibold text-[#0066CC] dark:text-[#0070F3] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Read →
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export function Blog(): React.JSX.Element {
  const { ref, isInView } = useSectionInView();

  return (
    <section
      id="blog"
      ref={ref}
      className="py-32 relative bg-[#FAF9F6] dark:bg-[#0B0B0C] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col gap-3 mb-16"
        >
          <motion.span variants={fadeUp} className="text-xs font-mono text-[#0066CC] tracking-widest uppercase font-semibold">
            06 / Writing
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-extrabold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
            Technical Writing
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#86868B] dark:text-zinc-400 max-w-md text-sm leading-relaxed">
            Deep dives into systems design, developer tooling, and the lessons behind the projects.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {POSTS.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Blog;
