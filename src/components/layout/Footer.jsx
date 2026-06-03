import React from "react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-mono text-sm text-white/20">
          <span className="text-[#00ff88]/50">&lt;</span> TJ <span className="text-[#00ff88]/50">/&gt;</span>
          {" "}· Designed & built by Tobiloba Jagun
        </span>
        
        <div className="flex items-center gap-6 flex-wrap justify-center">
          {/* GitHub Link */}
          <a 
            href="https://github.com/Tobilion" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-xs text-white/20 hover:text-[#00ff88] transition-colors duration-200 font-mono"
          >
            GitHub
          </a>

          {/* LinkedIn Link */}
          <a 
            href="https://www.linkedin.com/in/tobiloba-jagun" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-xs text-white/20 hover:text-[#00ff88] transition-colors duration-200 font-mono"
          >
            LinkedIn
          </a>

          {/* Instagram Link */}
          <a 
            href="https://www.instagram.com/theylovejagun?igsh=aWlvYnU3NnJqNGpz&utm_source=qr" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-xs text-white/20 hover:text-[#00ff88] transition-colors duration-200 font-mono"
          >
            Instagram
          </a>

          {/* WhatsApp Link (Linked directly to your phone number +2347073948340) */}
          <a 
            href="https://wa.me/2347073948340" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-xs text-white/20 hover:text-[#00ff88] transition-colors duration-200 font-mono"
          >
            WhatsApp
          </a>

          {/* Email Link */}
          <a 
            href="mailto:tobilobajagun@gmail.com" 
            className="text-xs text-white/20 hover:text-[#00ff88] transition-colors duration-200 font-mono"
          >
            Email
          </a>
        </div>
        <span className="text-xs text-white/15 font-mono">© 2026</span>
      </div>
    </footer>
  );
}

export default Footer;