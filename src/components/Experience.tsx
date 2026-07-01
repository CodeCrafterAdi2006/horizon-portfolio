import { motion } from "framer-motion";
import { Calendar, Briefcase, Award } from "lucide-react";
import { playUiSound } from "../utils/audio";

interface TimelineItem {
  year: string;
  role: string;
  company: string;
  description: string;
  tag: string;
  icon: React.ReactNode;
}

const timelineData: TimelineItem[] = [
  {
    year: "2026 - Present",
    role: "AI & AGENT ARCHITECT",
    company: "Autonomous Engineering & Research",
    description: "Built ShortsForge (an autonomous AI-driven short video creation engine) using JavaScript, Node.js, Express, and canvas rendering. Designing RAG systems and autonomous agentic workflows using LangChain, OpenAI API, and PyTorch.",
    tag: "Active Core",
    icon: <Briefcase className="w-4 h-4 text-brand-accent" />
  },
  {
    year: "2025",
    role: "FULL-STACK DIGITAL ARCHITECT",
    company: "Web Ecosystems & Telemetry",
    description: "Designed Velox Ecosystem, a Web3 transaction database explorer and live dashboard, utilizing React, TypeScript, Tailwind CSS, Next.js, and PostgreSQL for real-time relational analytics data.",
    tag: "Completed Module",
    icon: <Award className="w-4 h-4 text-brand-secondary" />
  },
  {
    year: "2024",
    role: "ALGORITHMS & GRAPHICS DESIGNER",
    company: "Simulation Simulations",
    description: "Created '1 Line a Day' digital journal in Pygame, coding custom mathematical procedural generation algorithms, custom grid layouts, and collision physics engines entirely in Python.",
    tag: "Archive Relay",
    icon: <Calendar className="w-4 h-4 text-white" />
  }
];

export default function Experience() {
  return (
    <section 
      id="experience" 
      className="py-24 px-6 md:px-8 border-b border-border-subtle relative z-10"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Section Header */}
        <div className="border-b border-border-subtle pb-4">
          <span className="text-[10px] font-mono tracking-widest text-brand-dark block mb-2">// journey.telemetry</span>
          <h2 className="text-white text-3xl md:text-4xl font-display font-extrabold tracking-tighter uppercase">
            Development <span className="text-brand-accent neon-text-glow">Timeline</span>
          </h2>
        </div>

        {/* Timeline Core Layout */}
        <div className="relative border-l border-dashed border-border-subtle/50 pl-6 ml-4 flex flex-col gap-12">
          
          {timelineData.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              onMouseEnter={() => playUiSound("hover")}
              className="relative group"
            >
              {/* Timeline Indicator Ring Node */}
              <div 
                className="absolute -left-[31px] top-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-brand-bg border border-border-subtle group-hover:border-brand-accent transition-colors duration-300"
              >
                {/* Center glowing core */}
                <div className="h-2 w-2 rounded-full bg-brand-dark/40 group-hover:bg-brand-accent group-hover:shadow-[0_0_8px_rgba(255,43,86,0.6)] transition-all duration-300" />
              </div>

              {/* Glass Details Card */}
              <div className="glass-panel p-6 flex flex-col gap-4 hover:border-brand-accent/25 hover:shadow-[0_0_20px_rgba(255,43,86,0.03)] transition-all duration-300">
                {/* Meta details row */}
                <div className="flex justify-between items-start gap-4 flex-wrap border-b border-border-subtle/30 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded border border-border-subtle/50 bg-black/40">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-white text-xs tracking-wider uppercase">
                        {item.role}
                      </h3>
                      <p className="text-[10px] text-brand-dark font-mono mt-0.5">{item.company}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 font-mono text-[9px] text-right">
                    <span className="text-white font-bold tracking-widest">{item.year}</span>
                    <span className="text-brand-accent uppercase text-[8px] border border-brand-accent/20 px-2 py-0.5 rounded bg-brand-accent/5">
                      {item.tag}
                    </span>
                  </div>
                </div>

                {/* Description details */}
                <p className="text-brand-muted text-xs leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}
