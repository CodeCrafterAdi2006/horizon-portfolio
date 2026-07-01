import { motion } from "motion/react";
import oneLineImg from "../assets/Screenshot 2026-06-05 092300.png";
import shortsForgeImg from "../assets/shortsforge.png";

interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  link: string;
}

const projects: Project[] = [
  {
    id: "01",
    title: "ShortsForge",
    category: "JavaScript • Node.js • Express • CSS",
    year: "2026",
    image: shortsForgeImg,
    link: "https://github.com/CodeCrafterAdi2006/ShortsForge",
  },
  {
    id: "02",
    title: "Velox Ecosystem",
    category: "Next.js • Node.js • Web3 • Postgres",
    year: "2026",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=2564&auto=format&fit=crop",
    link: "#",
  },
  {
    id: "03",
    title: "1 Line a Day",
    category: "Python • Pygame • Algorithms • Game Design",
    year: "2026",
    image: oneLineImg,
    link: "https://github.com/CodeCrafterAdi2006/one-line-a-day",
  },
];

export default function ProjectList() {
  return (
    <section id="projects" className="py-32 px-8 md:px-12 bg-transparent border-b border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16 border-b border-border-subtle/50 pb-8">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-dark font-mono">// selected.artifacts</span>
            <h2 className="text-white text-3xl md:text-4xl font-display font-extrabold tracking-tighter uppercase">Selected <span className="text-brand-accent neon-text-glow">Artifacts</span></h2>
          </div>
          <div className="text-[10px] font-mono text-brand-dark uppercase tracking-widest hidden md:block">
            System Core 1.0
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
          {projects.map((project, i) => (
            <motion.a
              key={project.id}
              href={project.link}
              target={project.link !== "#" ? "_blank" : undefined}
              rel={project.link !== "#" ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.1 }}
              className="group cursor-pointer bg-brand-bg/40 p-8 md:p-12 hover:bg-black/30 border border-border-subtle/40 hover:border-brand-accent/25 transition-all duration-300 relative overflow-hidden"
            >
              {/* Neon Glow Hover State */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/5 via-brand-secondary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-0 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="aspect-[16/9] overflow-hidden bg-black/35 mb-10 border border-border-subtle/50 relative group/img">
                  {/* Glowing HUD Target Lock Corners */}
                  <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-brand-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-all duration-300 pointer-events-none z-20" />
                  <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-brand-accent opacity-0 group-hover:opacity-100 group-hover:-translate-x-0.5 group-hover:translate-y-0.5 transition-all duration-300 pointer-events-none z-20" />
                  <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-brand-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 pointer-events-none z-20" />
                  <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-brand-accent opacity-0 group-hover:opacity-100 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 pointer-events-none z-20" />

                  {/* Holographic Diagnostic Scanline */}
                  <div className="absolute inset-0 bg-gradient-to-b from-brand-accent/0 via-brand-accent/15 to-brand-accent/0 w-full h-[30%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 animate-scanline-sweep" />

                  <motion.img
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-75 group-hover:opacity-95 transition-opacity"
                  />
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono mb-3 block text-brand-dark uppercase tracking-widest">{project.id} // SELECTED_BUILD</span>
                    <h3 className="text-xl md:text-2xl font-display font-bold text-white uppercase tracking-tight mb-4 group-hover:text-brand-accent transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.category.split(' • ').map(tech => (
                        <span key={tech} className="inline-flex h-6 items-center justify-center rounded border border-border-subtle bg-black/40 px-3 py-0.5 text-[9px] font-mono text-zinc-300 group-hover:border-brand-accent/35 group-hover:bg-brand-accent/5 transition-colors">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="w-12 h-12 border border-border-subtle bg-black/40 text-brand-accent flex items-center justify-center font-mono text-xs rounded shadow-[0_0_8px_rgba(255,43,86,0.05)] group-hover:border-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all duration-300 shrink-0 ml-4">
                    {project.year}
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
