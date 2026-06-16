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
    <section id="work" className="py-32 px-8 md:px-12 bg-transparent border-b border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16 border-b border-white/5 pb-8">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">Portfolio Archive</span>
            <h2 className="text-white text-3xl md:text-5xl font-light tracking-tighter uppercase">Selected <span className="italic font-serif text-brand-text">Artifacts</span></h2>
          </div>
          <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest hidden md:block">
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
              className="group cursor-pointer bg-brand-bg p-8 md:p-12 transition-colors relative overflow-hidden"
            >
              {/* Neon Glow Hover State */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-0 pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="aspect-[16/9] overflow-hidden bg-black/5 mb-10 border border-white/5 relative">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono mb-3 block text-white/20 uppercase tracking-widest">{project.id} // PROJECT</span>
                    <h3 className="text-xl md:text-2xl font-light text-white uppercase tracking-tight mb-4">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.category.split(' • ').map(tech => (
                        <span key={tech} className="inline-flex h-6 items-center justify-center rounded-full border border-white/10 bg-black/50 px-3 py-0.5 text-[10px] font-mono text-white/70 group-hover:border-white/20 group-hover:bg-white/10 transition-colors">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="w-10 h-10 border border-white/5 flex items-center justify-center text-[10px] group-hover:bg-white group-hover:text-black transition-all shrink-0 ml-4">
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
