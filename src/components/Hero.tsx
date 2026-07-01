import { motion } from "framer-motion";
import { ArrowDownRight, Download, Terminal } from "lucide-react";
import { playUiSound } from "../utils/audio";

export default function Hero() {
  const handleScrollToWork = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex flex-col gap-6 py-16 md:py-24 px-6 md:px-8 border-b border-border-subtle bg-transparent overflow-hidden"
    >
      {/* HUD profile classification indicator */}
      <div className="text-[10px] font-mono tracking-widest text-brand-dark uppercase">
        // workstation.profile
      </div>

      <div className="flex flex-col gap-2">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs font-mono tracking-widest text-brand-muted uppercase"
        >
          Hello, I'm
        </motion.p>

        {/* Partial glitch title: ADI is fancy/glitchy, TYA is static and clean */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-white text-5xl md:text-7xl font-display font-extrabold tracking-tighter uppercase leading-none select-none inline-block"
        >
          <span className="glitch relative" data-text="ADI">ADI</span>
          <span className="glitch-subtle text-white/90 relative" data-text="TYA">TYA</span>
          <span className="text-brand-accent animate-pulse">_</span>
        </motion.h1>

        {/* Subtitle taglines in neon styling */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[10px] md:text-xs text-brand-accent font-mono tracking-wider font-semibold uppercase flex flex-wrap gap-2 items-center mt-2"
        >
          <span>AI Engineer</span>
          <span className="text-brand-dark">•</span>
          <span>Automation Enthusiast</span>
          <span className="text-brand-dark">•</span>
          <span>Problem Solver</span>
        </motion.div>
      </div>

      {/* Profile Statement */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35 }}
        className="text-brand-muted leading-relaxed max-w-xl mt-4 font-mono text-[11px] tracking-wider"
      >
        I build <span className="hover-glow-accent font-bold text-white">&gt; intelligent_systems</span>, 
        automate <span className="hover-glow-accent font-bold text-white">&gt; complex_workflows</span>, 
        and craft digital experiences that make an impact. Specializing in bridging the gap between raw AI capabilities and 
        <span className="hover-glow-accent font-bold text-white"> &gt; production_grade_architecture</span>.
      </motion.p>

      {/* Actions Tray */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.4 }}
        className="flex flex-wrap gap-4 mt-6"
      >
        {/* Explore Work Button (Neon active state) */}
        <a
          href="#projects"
          onMouseEnter={() => playUiSound("hover")}
          onClick={(e) => {
            playUiSound("click");
            handleScrollToWork(e);
          }}
          className="group px-5 py-3 bg-brand-accent/5 border border-brand-accent/20 text-white rounded text-xs font-mono tracking-widest hover:bg-brand-accent hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(255,43,86,0.05)] hover:shadow-[0_0_20px_rgba(255,43,86,0.2)] flex items-center gap-2 cursor-pointer"
        >
          <span className="font-semibold">EXPLORE MY WORK</span>
          <ArrowDownRight size={14} className="group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
        </a>

        {/* Download Resume Button (HUD panel state) */}
        <a
          href="/resume_automation_ai.pdf"
          download="Aditya_Singh_Resume.pdf"
          onMouseEnter={() => playUiSound("hover")}
          onClick={() => playUiSound("click")}
          className="px-5 py-3 bg-white/[0.01] border border-border-subtle text-brand-muted hover:text-white hover:border-brand-dark/40 rounded text-xs font-mono tracking-widest transition-all duration-300 flex items-center gap-2 cursor-pointer"
        >
          <span>DOWNLOAD RESUME</span>
          <Download size={14} />
        </a>
      </motion.div>

      {/* Active telemetry block (Bottom of Hero) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex items-center gap-3 border border-border-subtle bg-white/[0.01] rounded px-4 py-3 self-start text-[10px] font-mono text-brand-dark"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-accent opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-accent"></span>
        </span>
        <span className="text-brand-muted">&gt; CURRENT FOCUS: AGENTIC WORKFLOWS & AUTOMATIONS</span>
      </motion.div>
    </section>
  );
}
