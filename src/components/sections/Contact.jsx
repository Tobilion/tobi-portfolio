import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSectionInView } from "../../hooks/useSectionInView";
import { fadeUp, stagger } from "../../animations/variants";

function ContactCard({ label, value, icon, status = false }) {
  return (
    <div className="flex items-center gap-5 p-5 rounded-2xl border border-white/5 bg-[#121214] shadow-md hover:border-white/10 transition-all duration-200">
      <div className="w-12 h-12 rounded-xl border border-white/10 bg-[#161618] flex items-center justify-center text-white/60">
        {status ? (
          /* Pulsing Green Dot */
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff88] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00ff88]" />
          </span>
        ) : (
          icon
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{label}</span>
        <span className="text-sm font-semibold text-white/80 mt-0.5">{value}</span>
      </div>
    </div>
  );
}

export function Contact() {
  const { ref, isInView } = useSectionInView();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleInputChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSend = (e) => {
    e.preventDefault();
    setSending(true);

    // Build the mailto parameters
    const recipient = "tobilobajagun@gmail.com";
    const subjectLine = encodeURIComponent(formData.subject || "Project Brief / Say Hello");
    const emailBody = encodeURIComponent(
      `Hi Tobiloba,\n\n${formData.message}\n\nClient Details:\n- Name: ${formData.name}\n- Email: ${formData.email}\n- Phone: ${formData.phone}`
    );

    setTimeout(() => {
      setSending(false);
      setSent(true);
      // Trigger the client-side email client compose window
      window.location.href = `mailto:${recipient}?subject=${subjectLine}&body=${emailBody}`;
    }, 1200);
  };

  return (
    <section id="contact" ref={ref} className="py-32">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-start">
        {/* Left Side: Custom Cards aligned with visual references */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-3">
            <motion.span variants={fadeUp} className="text-xs font-mono text-[#00ff88] tracking-widest uppercase">
              CONTACT ME
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Let's work
              <br />
              <span className="text-white/25">together.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm text-white/35 leading-relaxed max-w-sm mt-2">
              Whether you have a project in mind, a role to fill, or just want to talk shop about systems design — my inbox is open.
            </motion.p>
          </div>

          <motion.div variants={fadeUp} className="flex flex-col gap-4 mt-2 max-w-md">
            {/* EMAIL CARD */}
            <ContactCard 
              label="Email" 
              value="tobilobajagun@gmail.com" 
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              }
            />
            {/* PHONE CARD */}
            <ContactCard 
              label="Phone" 
              value="+2347073948340" 
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a20.373 20.373 0 01-6.708-6.708c-.415-.441-.3-.122.138-.413l1.293-.97a1.125 1.125 0 00.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              }
            />
            {/* STATUS CARD */}
            <ContactCard 
              label="Status" 
              value="Available for freelance & full-time" 
              status={true} 
            />
            {/* LOCATION CARD */}
            <ContactCard 
              label="Location" 
              value="Ikoyi, Lagos, Nigeria" 
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              }
            />
          </motion.div>
        </motion.div>

        {/* Right Side: Form Aligned with Layout Reference */}
        <motion.form
          onSubmit={handleSend}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="rounded-2xl border border-white/5 bg-[#121214] p-8 flex flex-col gap-5 shadow-2xl"
        >
          {/* Row 1: Full Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-semibold">Your Name *</label>
            <input
              required
              type="text"
              placeholder="e.g. Ade Okafor"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="bg-[#161618] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white/80 placeholder-white/20 outline-none transition-all duration-200 focus:border-[#00ff88]/50 focus:shadow-[0_0_20px_rgba(0,255,136,0.08)]"
            />
          </div>

          {/* Row 2: Split Columns (Email + Phone) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-semibold">Email Address *</label>
              <input
                required
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="bg-[#161618] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white/80 placeholder-white/20 outline-none transition-all duration-200 focus:border-[#00ff88]/50 focus:shadow-[0_0_20px_rgba(0,255,136,0.08)]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-semibold">Phone Number *</label>
              <input
                required
                type="tel"
                placeholder="+234..."
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="bg-[#161618] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white/80 placeholder-white/20 outline-none transition-all duration-200 focus:border-[#00ff88]/50 focus:shadow-[0_0_20px_rgba(0,255,136,0.08)]"
              />
            </div>
          </div>

          {/* Row 3: Subject */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-semibold">Subject *</label>
            <input
              required
              type="text"
              placeholder="Project Collaboration"
              value={formData.subject}
              onChange={(e) => handleInputChange("subject", e.target.value)}
              className="bg-[#161618] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white/80 placeholder-white/20 outline-none transition-all duration-200 focus:border-[#00ff88]/50 focus:shadow-[0_0_20px_rgba(0,255,136,0.08)]"
            />
          </div>

          {/* Row 4: Message */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-semibold">Message *</label>
            <textarea
              required
              rows={5}
              placeholder="Tell me about your project ideas..."
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              className="bg-[#161618] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white/80 placeholder-white/20 outline-none resize-none transition-all duration-200 focus:border-[#00ff88]/50 focus:shadow-[0_0_20px_rgba(0,255,136,0.08)]"
            />
          </div>

          <AnimatePresence mode="wait">
            {!sent ? (
              <motion.button
                key="send"
                type="submit"
                disabled={sending}
                whileHover={!sending ? { scale: 1.02, boxShadow: "0 0 30px #00ff8840" } : {}}
                whileTap={!sending ? { scale: 0.98 } : {}}
                className="mt-2 px-8 py-4 rounded-xl font-bold text-sm text-[#0a0a0a] bg-[#00ff88] hover:bg-[#00e07a] disabled:opacity-70 transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer"
              >
                {sending ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-[#0a0a0a]/40 border-t-[#0a0a0a] rounded-full"
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
                className="mt-2 px-8 py-4 rounded-xl font-bold text-sm text-[#00ff88] border border-[#00ff88]/30 bg-[#00ff88]/5 text-center"
              >
                ✓ Message sent — opening mail client!
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  );
}

export default Contact;