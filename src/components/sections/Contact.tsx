import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useSectionInView } from "../../hooks/useSectionInView";
import { fadeUp, stagger } from "../../animations/variants";

// EmailJS credentials come from environment variables.
// Set these in .env (locally) and in Vercel → Project Settings → Environment Variables.
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string | undefined;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string | undefined;

// True only when all three keys are present and not the placeholder values
const EMAILJS_READY =
  !!EMAILJS_SERVICE_ID  && !EMAILJS_SERVICE_ID.includes("xxxxxxx") &&
  !!EMAILJS_TEMPLATE_ID && !EMAILJS_TEMPLATE_ID.includes("xxxxxxx") &&
  !!EMAILJS_PUBLIC_KEY  && !EMAILJS_PUBLIC_KEY.includes("xxxxxxx");

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface ContactCardProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  status?: boolean;
}

function ContactCard({ label, value, icon, status = false }: ContactCardProps): React.JSX.Element {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback((): void => {
    if (label === "Email") {
      navigator.clipboard.writeText(value).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => { /* clipboard unavailable (insecure context / permission denied) */ });
    }
  }, [label, value]);

  return (
    <div
      onClick={label === "Email" ? handleCopy : undefined}
      className={`flex items-center gap-5 p-5 rounded-3xl border border-slate-200/60 dark:border-zinc-800/60 bg-[#F5F5F7]/85 dark:bg-zinc-900/85 backdrop-blur-md shadow-sm hover:border-slate-300 dark:hover:border-zinc-700 transition-all duration-200 ${label === "Email" ? "cursor-pointer select-none" : ""}`}
    >
      <div className="w-12 h-12 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-center text-slate-500 dark:text-zinc-400 shrink-0">
        {status ? (
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0066cc] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#0066cc]" />
          </span>
        ) : icon}
      </div>
      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-500 uppercase tracking-widest font-semibold">{label}</span>
        <span className="text-sm font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mt-0.5 truncate">{value}</span>
      </div>
      {label === "Email" && (
        <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-500 shrink-0 transition-colors duration-200">
          {copied ? (
            <span className="text-emerald-500 font-semibold">✓ Copied!</span>
          ) : (
            <span className="opacity-60">Click to copy</span>
          )}
        </span>
      )}
    </div>
  );
}

type SendState = "idle" | "sending" | "success" | "error";

export function Contact(): React.JSX.Element {
  const { ref, isInView } = useSectionInView();
  const [formData, setFormData] = useState<FormData>({
    name: "", email: "", phone: "", subject: "", message: "",
  });
  const [sendState, setSendState] = useState<SendState>("idle");
  const [errorMsg,  setErrorMsg]  = useState<string>("");

  const handleInputChange = (field: keyof FormData, val: string): void => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleSend = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setSendState("sending");
    setErrorMsg("");

    if (EMAILJS_READY) {
      // ── EmailJS path: sends silently without opening the mail client ──
      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID!,
          EMAILJS_TEMPLATE_ID!,
          {
            from_name:  formData.name,
            from_email: formData.email,
            phone:      formData.phone,
            subject:    formData.subject || "Portfolio Contact",
            message:    formData.message,
            to_email:   "tobilobajagun@gmail.com",
          },
          { publicKey: EMAILJS_PUBLIC_KEY! }
        );
        setSendState("success");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
        setErrorMsg(msg);
        setSendState("error");
      }
    } else {
      // ── Fallback path: open system mail client (used until EmailJS is configured) ──
      const recipient   = "tobilobajagun@gmail.com";
      const subjectLine = encodeURIComponent(formData.subject || "Project Brief / Say Hello");
      const emailBody   = encodeURIComponent(
        `Hi Tobiloba,\n\n${formData.message}\n\nClient Details:\n- Name: ${formData.name}\n- Email: ${formData.email}\n- Phone: ${formData.phone}`
      );
      window.location.href = `mailto:${recipient}?subject=${subjectLine}&body=${emailBody}`;
      setSendState("success");
    }
  };

  const isSending = sendState === "sending";
  const isSent    = sendState === "success";
  const isError   = sendState === "error";

  return (
    <section id="contact" ref={ref} className="py-32 relative bg-white dark:bg-[#0B0B0C] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-start">

        {/* ── Left: info cards ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-3">
            <motion.span variants={fadeUp} className="text-xs font-mono text-[#0066cc] tracking-widest uppercase font-semibold">
              CONTACT ME
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-extrabold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight leading-tight">
              Let's work<br />
              <span className="text-slate-400 dark:text-zinc-500">together.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm text-[#86868B] dark:text-zinc-400 leading-relaxed max-w-sm mt-2">
              Whether you have a project in mind, a role to fill, or just want to talk shop about systems design — my inbox is open.
            </motion.p>
          </div>

          <motion.div variants={fadeUp} className="flex flex-col gap-4 mt-2 max-w-md">
            <ContactCard label="Email" value="tobilobajagun@gmail.com" icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            } />
            <ContactCard label="Phone" value="+2347073948340" icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a20.373 20.373 0 01-6.708-6.708c-.415-.441-.3-.122.138-.413l1.293-.97a1.125 1.125 0 00.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            } />
            <ContactCard label="Status" value="Available for freelance & full-time" status={true} />
            <ContactCard label="Location" value="Ikoyi, Lagos, Nigeria" icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            } />
          </motion.div>
        </motion.div>

        {/* ── Right: form ── */}
        <motion.form
          onSubmit={handleSend}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="rounded-3xl border border-slate-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 p-8 flex flex-col gap-5 shadow-lg shadow-slate-200/10 dark:shadow-none backdrop-blur-md"
        >
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono text-slate-500 dark:text-zinc-400 uppercase tracking-widest font-bold">Your Name *</label>
            <input
              required disabled={isSending || isSent}
              type="text" placeholder="e.g. Ade Okafor"
              value={formData.name}
              onChange={e => handleInputChange("name", e.target.value)}
              className="bg-[#F5F5F7] dark:bg-zinc-950 border border-slate-200/60 dark:border-zinc-800 rounded-xl px-4 py-3.5 text-sm text-[#1D1D1F] dark:text-[#F5F5F7] placeholder-slate-400 dark:placeholder-zinc-600 outline-none transition-all duration-200 focus:border-[#0066cc]/50 focus:bg-white dark:focus:bg-zinc-900 focus:shadow-[0_0_20px_rgba(0,102,204,0.05)] disabled:opacity-60"
            />
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono text-slate-500 dark:text-zinc-400 uppercase tracking-widest font-bold">Email Address *</label>
              <input
                required disabled={isSending || isSent}
                type="email" placeholder="you@example.com"
                value={formData.email}
                onChange={e => handleInputChange("email", e.target.value)}
                className="bg-[#F5F5F7] dark:bg-zinc-950 border border-slate-200/60 dark:border-zinc-800 rounded-xl px-4 py-3.5 text-sm text-[#1D1D1F] dark:text-[#F5F5F7] placeholder-slate-400 dark:placeholder-zinc-600 outline-none transition-all duration-200 focus:border-[#0066cc]/50 focus:bg-white dark:focus:bg-zinc-900 focus:shadow-[0_0_20px_rgba(0,102,204,0.05)] disabled:opacity-60"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono text-slate-500 dark:text-zinc-400 uppercase tracking-widest font-bold">Phone Number</label>
              <input
                disabled={isSending || isSent}
                type="tel" placeholder="+234..."
                value={formData.phone}
                onChange={e => handleInputChange("phone", e.target.value)}
                className="bg-[#F5F5F7] dark:bg-zinc-950 border border-slate-200/60 dark:border-zinc-800 rounded-xl px-4 py-3.5 text-sm text-[#1D1D1F] dark:text-[#F5F5F7] placeholder-slate-400 dark:placeholder-zinc-600 outline-none transition-all duration-200 focus:border-[#0066cc]/50 focus:bg-white dark:focus:bg-zinc-900 focus:shadow-[0_0_20px_rgba(0,102,204,0.05)] disabled:opacity-60"
              />
            </div>
          </div>

          {/* Subject */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono text-slate-500 dark:text-zinc-400 uppercase tracking-widest font-bold">Subject *</label>
            <input
              required disabled={isSending || isSent}
              type="text" placeholder="Project Collaboration"
              value={formData.subject}
              onChange={e => handleInputChange("subject", e.target.value)}
              className="bg-[#F5F5F7] dark:bg-zinc-950 border border-slate-200/60 dark:border-zinc-800 rounded-xl px-4 py-3.5 text-sm text-[#1D1D1F] dark:text-[#F5F5F7] placeholder-slate-400 dark:placeholder-zinc-600 outline-none transition-all duration-200 focus:border-[#0066cc]/50 focus:bg-white dark:focus:bg-zinc-900 focus:shadow-[0_0_20px_rgba(0,102,204,0.05)] disabled:opacity-60"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono text-slate-500 dark:text-zinc-400 uppercase tracking-widest font-bold">Message *</label>
            <textarea
              required disabled={isSending || isSent}
              rows={5} placeholder="Tell me about your project ideas..."
              value={formData.message}
              onChange={e => handleInputChange("message", e.target.value)}
              className="bg-[#F5F5F7] dark:bg-zinc-950 border border-slate-200/60 dark:border-zinc-800 rounded-xl px-4 py-3.5 text-sm text-[#1D1D1F] dark:text-[#F5F5F7] placeholder-slate-400 dark:placeholder-zinc-600 outline-none resize-none transition-all duration-200 focus:border-[#0066cc]/50 focus:bg-white dark:focus:bg-zinc-900 focus:shadow-[0_0_20px_rgba(0,102,204,0.05)] disabled:opacity-60"
            />
          </div>

          {/* Error banner */}
          <AnimatePresence>
            {isError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-sm text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20 rounded-xl px-4 py-3"
              >
                ⚠️ {errorMsg || "Failed to send — please try again or email me directly."}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit / success button */}
          <AnimatePresence mode="wait">
            {!isSent ? (
              <motion.button
                key="send"
                type="submit"
                disabled={isSending}
                whileHover={!isSending ? { scale: 1.02, boxShadow: "0 4px 15px rgba(0,102,204,0.15)" } : {}}
                whileTap={!isSending ? { scale: 0.98 } : {}}
                className="mt-2 px-8 py-4 rounded-2xl font-bold text-sm text-white bg-[#0066cc] hover:bg-[#0055b3] disabled:opacity-70 transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer shadow-sm"
              >
                {isSending ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
                    />
                    Sending...
                  </>
                ) : (
                  "Send Message →"
                )}
              </motion.button>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-2 flex flex-col items-center gap-3"
              >
                <div className="w-full px-8 py-4 rounded-xl font-bold text-sm text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-950/20 text-center">
                  ✓ Message sent! I'll get back to you soon.
                </div>
                <button
                  type="button"
                  onClick={() => setSendState("idle")}
                  className="text-xs font-mono text-slate-400 dark:text-zinc-500 hover:text-[#0066cc] dark:hover:text-blue-400 transition-colors underline underline-offset-2"
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* EmailJS config hint — only shown in dev when keys aren't set yet */}
          {!EMAILJS_READY && import.meta.env.DEV && (
            <p className="text-[10px] font-mono text-amber-500/80 text-center leading-relaxed">
              ⚙️ EmailJS not configured — using mailto fallback.<br />
              Add keys to <code>.env</code> to enable direct sending.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}

export default Contact;
