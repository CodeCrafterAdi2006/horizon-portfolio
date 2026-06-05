import { motion } from "motion/react";
import { ArrowUpRight, Github, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-bg pt-32 relative overflow-hidden">
      <div id="expertise" className="max-w-7xl mx-auto px-8 md:px-12 mb-40">
        <h2 className="text-white/80 text-[10px] uppercase tracking-[0.4em] mb-16 px-2 border-l border-white/10">System.Expertise</h2>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-md shadow-2xl relative"
        >
          {/* Neon Glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-cyan-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none z-0"></div>
          
          <div className="relative z-10 flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500/80"></div>
            <div className="h-3 w-3 rounded-full bg-green-500/80"></div>
            <span className="ml-2 font-mono text-xs text-white/40">aditya@horizon-portfolio:~</span>
          </div>
          <div className="relative z-10 p-6 md:p-8 font-mono text-sm leading-relaxed text-white/70">
            <div className="mb-6">
              <div className="flex gap-2">
                <span className="text-green-400">$</span>
                <span className="text-white">whoami</span>
              </div>
              <div className="mt-2 text-white/50">&gt; aditya_singh</div>
            </div>
            
            <div className="mb-6">
              <div className="flex gap-2">
                <span className="text-green-400">$</span>
                <span className="text-white">cat core_competencies.json</span>
              </div>
              <div className="mt-2 text-white/50">
                [<br/>
                &nbsp;&nbsp;"React &amp; React Native",<br/>
                &nbsp;&nbsp;"TypeScript &amp; Node.js",<br/>
                &nbsp;&nbsp;"AI Integration &amp; LLMs",<br/>
                &nbsp;&nbsp;"Next.js &amp; Serverless",<br/>
                &nbsp;&nbsp;"Framer Motion"<br/>
                ]
              </div>
            </div>

            <div>
              <div className="flex gap-2">
                <span className="text-green-400">$</span>
                <span className="text-white">echo $STATUS</span>
              </div>
              <div className="mt-2 text-white/50">&gt; Building the Excellence Standard.</div>
            </div>
          </div>
        </motion.div>
      </div>

      <div id="contact" className="px-8 md:px-12 pb-20">
        <div className="max-w-7xl mx-auto border-t border-white/5 pt-32">
          <motion.a
            href="mailto:eragon4273@gmail.com"
            whileHover={{ x: 10 }}
            className="group inline-flex items-center gap-12 transition-all"
          >
            <h2 className="text-white text-[8vw] md:text-[6vw] font-light uppercase tracking-tighter leading-none">
              <span className="block group-hover:hidden">Initiate <br /><span className="italic font-serif text-brand-text/40">Sequence</span></span>
              <span className="hidden group-hover:block">Write <br /><span className="italic font-serif text-brand-text/40">Mail</span></span>
            </h2>
            <div className="w-20 h-20 md:w-24 md:h-24 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
              <ArrowUpRight size={32} />
            </div>
          </motion.a>

          <div className="mt-40 flex flex-col md:flex-row justify-between items-center gap-12 border-t border-white/5 pt-12 text-zinc-600">
            <div className="flex gap-12 text-[10px] uppercase font-bold tracking-[0.2em]">
              <a href="https://www.instagram.com/code_crafter2705/" target="_blank" rel="noopener noreferrer" className="hover:text-white cursor-pointer transition-colors">Instagram</a>
              <a href="https://github.com/CodeCrafterAdi2006" target="_blank" rel="noopener noreferrer" className="hover:text-white cursor-pointer transition-colors">Github</a>
              <a href="https://www.linkedin.com/in/aditya-singh-0a5a9830b/" target="_blank" rel="noopener noreferrer" className="hover:text-white cursor-pointer transition-colors">Linkedin</a>
            </div>
            <div className="text-[10px] uppercase tracking-[0.3em]">
              SESSION V.0.1.4A // HORIZON PORTFOLIO
            </div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-[10px] uppercase font-bold tracking-[0.3em] hover:text-white transition-colors"
            >
              System.Reset(); ↑
            </button>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-10 -right-10 opacity-[0.01] pointer-events-none select-none">
        <h2 className="text-[30vw] font-black uppercase tracking-tighter leading-none">
          ALPHA
        </h2>
      </div>
    </footer>
  );
}
