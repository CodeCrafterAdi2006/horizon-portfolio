import { motion } from "framer-motion";
import { Brain, Code, Network, Gamepad2 } from "lucide-react";

interface Skill {
  name: string;
  percentage: number;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  colorClass: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "AI & AGENT ARCHITECTURES",
    icon: <Brain className="w-4 h-4 text-brand-accent" />,
    colorClass: "border-brand-accent/20 text-brand-accent",
    skills: [
      { name: "PyTorch (Deep Learning)", percentage: 95 },
      { name: "LangChain (LLM Agents)", percentage: 90 },
      { name: "TensorFlow (Models)", percentage: 80 },
      { name: "OpenCV (Computer Vision)", percentage: 75 },
    ]
  },
  {
    title: "GAME DESIGN & SIMULATIONS",
    icon: <Gamepad2 className="w-4 h-4 text-brand-secondary" />,
    colorClass: "border-brand-secondary/20 text-brand-secondary",
    skills: [
      { name: "Pygame framework", percentage: 90 },
      { name: "Complexity Algorithms", percentage: 85 },
      { name: "Procedural Generation", percentage: 80 },
      { name: "Physics & Collisions", percentage: 75 },
    ]
  },
  {
    title: "FULL-STACK WEB RELAYS",
    icon: <Code className="w-4 h-4 text-white" />,
    colorClass: "border-white/10 text-white",
    skills: [
      { name: "React / Typescript", percentage: 95 },
      { name: "Next.js Framework", percentage: 85 },
      { name: "Node.js & Express API", percentage: 90 },
      { name: "Tailwind CSS v4", percentage: 95 },
    ]
  },
  {
    title: "AUTOMATION & SYSTEMS",
    icon: <Network className="w-4 h-4 text-brand-dark" />,
    colorClass: "border-brand-dark/20 text-brand-dark",
    skills: [
      { name: "Docker containers", percentage: 80 },
      { name: "CI/CD (Github Actions)", percentage: 85 },
      { name: "AWS Cloud Deployments", percentage: 75 },
      { name: "n8n / API Automation", percentage: 90 },
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 md:px-8 relative z-10 border-b border-border-subtle">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Section Header */}
        <div className="border-b border-border-subtle pb-4">
          <span className="text-[10px] uppercase tracking-widest text-brand-dark block mb-2 font-mono">// technical.telemetry</span>
          <h2 className="text-white text-3xl md:text-4xl font-display font-extrabold tracking-tighter uppercase">
            Technical <span className="text-brand-accent neon-text-glow">Stack</span>
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-panel p-6 flex flex-col gap-6 hover:border-brand-accent/30 hover:shadow-[0_0_20px_rgba(255,43,86,0.03)] transition-all duration-300"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 border-b border-border-subtle/40 pb-3">
                <div className={`flex h-8 w-8 items-center justify-center rounded border bg-black/45 ${category.colorClass}`}>
                  {category.icon}
                </div>
                <h3 className="font-display font-bold text-white text-xs tracking-wider uppercase">
                  {category.title}
                </h3>
              </div>

              {/* Skills list with Segmented LED Bars */}
              <div className="flex flex-col gap-5">
                {category.skills.map((skill) => {
                  const totalBlocks = 10;
                  const activeBlocks = Math.round(skill.percentage / 10);

                  return (
                    <div key={skill.name} className="flex flex-col gap-2">
                      <div className="flex justify-between items-center text-[10px] font-mono tracking-wider">
                        <span className="text-white uppercase font-medium">{skill.name}</span>
                        <span className="text-brand-accent font-bold">{skill.percentage}%</span>
                      </div>
                      
                      {/* Segmented LED Progress Bar */}
                      <div className="flex gap-[3px] h-2.5 w-full bg-black/20 p-[2px] border border-border-subtle/30 rounded-sm">
                        {Array.from({ length: totalBlocks }).map((_, idx) => {
                          const isActive = idx < activeBlocks;
                          return (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: isActive ? 1 : 0.15 }}
                              viewport={{ once: true }}
                              transition={{ 
                                duration: 0.3, 
                                delay: 0.1 + (idx * 0.05) 
                              }}
                              className={`h-full flex-1 rounded-xs transition-all duration-300 ${
                                isActive
                                  ? "bg-brand-accent shadow-[0_0_8px_rgba(255,43,86,0.4)]"
                                  : "bg-brand-dark/20"
                              }`}
                            />
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
