import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDownRight } from "lucide-react";
import { useRef } from "react";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax and fade transforms
  const textY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[120vh] flex flex-col justify-start pt-40 md:pt-0 md:justify-center px-8 md:px-12 grid-bg border-b border-border-subtle overflow-hidden"
    >
      {/* Background layer for grid parallax */}
      <motion.div
        style={{ y: gridY }}
        className="absolute inset-0 pointer-events-none grid-bg opacity-30"
      />

      <motion.div
        style={{ y: textY, opacity: textOpacity, scale: textScale }}
        className="max-w-7xl mx-auto w-full pt-20 grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10"
      >
        <div className="md:col-span-7 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs text-white backdrop-blur-sm self-start"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            Available for new projects
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] text-white/40 uppercase tracking-[0.3em] mb-6 flex items-center gap-4"
          >
            <span className="bg-white/10 text-white px-2 py-0.5 rounded-sm">Concept Alpha</span>
            <span>Digital Architect</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-white text-[12vw] md:text-[8vw] font-light leading-[0.9] tracking-tighter"
          >
            Building the <br />
            <span className="italic font-serif text-brand-text">Excellence</span> Standard
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 text-sm leading-relaxed max-w-sm text-zinc-500"
          >
            Exploring the intersection of software engineering, artificial intelligence, and user-centered design.
          </motion.p>
        </div>

        <div className="md:col-span-5 flex flex-col justify-center md:items-end gap-12">
          <div className="flex flex-col gap-8 md:text-right">
            <div className="flex items-center gap-4 md:justify-end">
              <span className="text-4xl font-serif italic text-white/10">01</span>
              <div>
                <h3 className="text-white text-[10px] uppercase tracking-wider">Current Module</h3>
                <p className="text-[10px] text-zinc-600">Visual Hierarchy & Grid Design</p>
              </div>
            </div>
          </div>

          <a href="#work" className="flex items-center gap-4 group cursor-pointer">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">Explore Projects</div>
            <div className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
              <ArrowDownRight size={16} />
            </div>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
