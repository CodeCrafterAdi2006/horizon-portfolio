import { Menu, X } from "lucide-react";
import { useState } from "react";

import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <nav className="fixed top-0 left-0 w-full z-40 px-8 py-8 md:px-12 pointer-events-none border-b border-border-subtle bg-brand-bg/50 backdrop-blur-md">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-white origin-left"
        style={{ scaleX }}
      />

      <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <span className="text-white font-medium tracking-[0.2em] text-[10px] uppercase">Horizon Portfolio</span>
        </motion.div>

        <div className="hidden md:flex gap-12 text-[10px] uppercase tracking-[0.2em] font-semibold">
          {[
            { label: "01. Projects", id: "work" },
            { label: "02. Skills", id: "skills" },
            { label: "03. Expertise", id: "expertise" },
            { label: "04. Contact", id: "contact" }
          ].map((item, i) => (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-brand-text hover:text-white transition-colors cursor-pointer"
            >
              {item.label}
            </motion.a>
          ))}
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-brand-bg/95 backdrop-blur-xl border-b border-border-subtle p-8 flex flex-col gap-8 pointer-events-auto shadow-2xl"
          >
            {[
              { label: "01. Projects", id: "work" },
              { label: "02. Skills", id: "skills" },
              { label: "03. Expertise", id: "expertise" },
              { label: "04. Contact", id: "contact" }
            ].map((item, i) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-white text-lg font-light tracking-[0.2em] uppercase border-b border-white/5 pb-4 last:border-0"
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
