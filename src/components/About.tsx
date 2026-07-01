import { motion } from "framer-motion";
import { playUiSound } from "../utils/audio";

export default function About() {
  return (
    <section 
      id="about" 
      className="py-24 px-6 md:px-8 border-b border-border-subtle relative z-10 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Section Header */}
        <div className="border-b border-border-subtle pb-4">
          <span className="text-[10px] font-mono tracking-widest text-brand-dark block mb-2 font-mono">// pilot.biometrics</span>
          <h2 className="text-white text-3xl md:text-4xl font-display font-extrabold tracking-tighter uppercase">
            About <span className="text-brand-accent neon-text-glow">Me</span>
          </h2>
        </div>

        {/* 2-Column HUD Layout */}
        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-10 items-start">
          
          {/* Left Column: Biometrics Avatar Card */}
          <div 
            onMouseEnter={() => playUiSound("hover")}
            className="glass-panel p-4 flex flex-col gap-4 relative overflow-hidden select-none hover:border-brand-accent/30 transition-all duration-300"
          >
            {/* Target Brackets around the photo wrapper */}
            <div className="aspect-[3/4] relative overflow-hidden rounded border border-border-subtle/40 bg-black/40">
              {/* Corner brackets */}
              <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-brand-accent/50 z-20" />
              <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-brand-accent/50 z-20" />
              <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-brand-accent/50 z-20" />
              <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-brand-accent/50 z-20" />

              {/* Glowing Emerald Holographic Scanning Laser */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/25 to-transparent w-full h-[15%] pointer-events-none z-20 animate-scanline-emerald" />

              {/* Profile Image */}
              <img 
                loading="lazy"
                src="/me.png" 
                alt="Aditya Singh Profile" 
                className="w-full h-full object-cover opacity-80 filter brightness-90 contrast-105"
              />
            </div>

            {/* Diagnostic biometrics readouts */}
            <div className="flex flex-col gap-1.5 font-mono text-[9px] text-brand-dark tracking-wider uppercase border-t border-border-subtle/30 pt-3">
              <div className="flex justify-between">
                <span>&gt; PILOT_ID</span>
                <span className="text-white font-semibold">ADI_2705</span>
              </div>
              <div className="flex justify-between">
                <span>&gt; STATUS</span>
                <span className="text-emerald-400 font-semibold animate-pulse">SYNAPSE_ACTIVE</span>
              </div>
              <div className="flex justify-between">
                <span>&gt; NEURAL_SYNC</span>
                <span className="text-brand-accent font-semibold">98.4%</span>
              </div>
              <div className="flex justify-between">
                <span>&gt; CONNECTION</span>
                <span className="text-white font-semibold">SECURE_STABLE</span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Details */}
          <div className="flex flex-col gap-6 font-mono text-xs">
            
            {/* Identity prompt block */}
            <div className="glass-panel p-6 flex flex-col gap-4 bg-black/25">
              <div className="flex items-center gap-1 text-brand-accent font-bold text-[10px] select-none">
                <span>&gt; core.identity_relay_initiated</span>
                <span className="cursor-blink text-brand-accent font-extrabold">_</span>
              </div>
              <motion.p 
                initial={{ opacity: 0, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-brand-muted leading-relaxed text-xs"
              >
                I am <span className="hover-glow-accent font-bold text-white">Aditya Singh</span>, an 
                <span className="hover-glow-accent font-bold text-white"> AI Engineer</span> and 
                <span className="hover-glow-accent font-bold text-white"> Full-Stack developer</span> specializing in bridging the gap between raw machine intelligence models and responsive 
                <span className="hover-glow-accent font-bold text-white"> production-grade interfaces</span>. 
                I design and implement 
                <span className="hover-glow-accent font-bold text-white"> autonomous multi-agent swarms</span>, 
                <span className="hover-glow-accent font-bold text-white"> RAG knowledge retrievers</span>, and highly interactive frontend relays that make complex operations visual and accessible.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-brand-muted leading-relaxed text-xs border-t border-border-subtle/20 pt-3 mt-1"
              >
                Driven by a core mission to build 
                <span className="hover-glow-accent font-bold text-white"> high-performance software</span>, I continuously research 
                <span className="hover-glow-accent font-bold text-white"> autonomous agent architectures</span>, 
                <span className="hover-glow-accent font-bold text-white"> complexity algorithms</span>, and 
                <span className="hover-glow-accent font-bold text-white"> real-time simulations</span>.
              </motion.p>
            </div>

            {/* Core Pillars */}
            <div className="grid gap-4 sm:grid-cols-3 mt-2">
              
              {/* Pillar 1 */}
              <div className="border border-border-subtle/35 p-4 rounded bg-black/10 flex flex-col gap-2 hover:border-brand-accent/20 transition-all duration-300">
                <span className="text-brand-accent font-bold text-[10px]">01 / AI AGENTS</span>
                <p className="text-zinc-400 text-[10px] leading-relaxed">
                  Structuring autonomous agent chains, multi-agent frameworks, and RAG pipelines.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="border border-border-subtle/35 p-4 rounded bg-black/10 flex flex-col gap-2 hover:border-brand-accent/20 transition-all duration-300">
                <span className="text-brand-accent font-bold text-[10px]">02 / SYSTEMS CODE</span>
                <p className="text-zinc-400 text-[10px] leading-relaxed">
                  Coding mathematical simulation frameworks, physics algorithms, and physics loops.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="border border-border-subtle/35 p-4 rounded bg-black/10 flex flex-col gap-2 hover:border-brand-accent/20 transition-all duration-300">
                <span className="text-brand-accent font-bold text-[10px]">03 / UI RELAYS</span>
                <p className="text-zinc-400 text-[10px] leading-relaxed">
                  Engineering lightning-fast React, TypeScript interfaces and glowing HUD panels.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Styled emerald scanning animations */}
      <style>{`
        @keyframes scan-emerald {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(450%); }
        }
        .animate-scanline-emerald {
          animation: scan-emerald 3.2s linear infinite;
        }
      `}</style>
    </section>
  );
}
