import { motion } from "motion/react";
import { Brain, Code, Network, Gamepad2 } from "lucide-react";

const skillCategories = [
  {
    title: "AI/ML Learning",
    icon: <Brain className="w-5 h-5 text-purple-400" />,
    skills: [
      { name: "PyTorch", percentage: 95 },
      { name: "LangChain", percentage: 90 },
      { name: "TensorFlow", percentage: 80 },
      { name: "OpenCV", percentage: 75 },
    ]
  },
  {
    title: "Game Development",
    icon: <Gamepad2 className="w-5 h-5 text-orange-400" />,
    skills: [
      { name: "Pygame", percentage: 90 },
      { name: "Algorithms", percentage: 85 },
      { name: "Procedural Generation", percentage: 80 },
      { name: "Game Design", percentage: 75 },
    ]
  },
  {
    title: "Web Development",
    icon: <Code className="w-5 h-5 text-cyan-400" />,
    skills: [
      { name: "React", percentage: 95 },
      { name: "TypeScript", percentage: 90 },
      { name: "Next.js", percentage: 85 },
      { name: "Tailwind CSS", percentage: 95 },
    ]
  },
  {
    title: "Infrastructure",
    icon: <Network className="w-5 h-5 text-green-400" />,
    skills: [
      { name: "Docker", percentage: 80 },
      { name: "Kubernetes", percentage: 70 },
      { name: "AWS", percentage: 75 },
      { name: "CI/CD", percentage: 85 },
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-8 md:px-12 relative z-10 border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 border-b border-white/5 pb-8">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 block mb-2">// core_competencies</span>
          <h2 className="text-white text-3xl md:text-5xl font-light tracking-tighter uppercase">
            Technical <span className="italic font-serif text-brand-text">Stack</span>
          </h2>
        </div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="flex flex-col gap-6 p-8 rounded-xl border border-white/5 bg-black/40 shadow-xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-black/50">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-white tracking-wide">{category.title}</h3>
              </div>

              <div className="space-y-6">
                {category.skills.map((skill, j) => (
                  <div key={skill.name}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-mono text-white/80">{skill.name}</span>
                      <span className="text-[10px] font-mono text-white/40">{skill.percentage}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.2 + (j * 0.1), ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-white/40 to-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
