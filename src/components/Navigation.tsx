import { Menu, X, Home, User, Cpu, Briefcase, Calendar, Terminal as TermIcon, Mail, Github, Linkedin, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playUiSound } from "../utils/audio";

const navItems = [
  { id: "hero", label: "01. HOME", icon: Home },
  { id: "about", label: "02. ABOUT", icon: User },
  { id: "skills", label: "03. SKILLS", icon: Cpu },
  { id: "projects", label: "04. PROJECTS", icon: Briefcase },
  { id: "experience", label: "05. EXPERIENCE", icon: Calendar },
  { id: "terminal-sec", label: "06. TERMINAL", icon: TermIcon },
  { id: "contact", label: "07. CONTACT", icon: Mail },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Scroll Spy: Track active section based on viewport bounding rects
  useEffect(() => {
    const handleScrollSpy = () => {
      const viewportMidline = window.innerHeight * 0.4; // 40% from top of screen

      let currentActive = "hero";

      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        // If the 40% midline of the screen is within the element's top and bottom boundaries
        if (rect.top <= viewportMidline && rect.bottom >= viewportMidline) {
          currentActive = item.id;
          break;
        }
      }

      setActiveSection(currentActive);
    };

    // Listen to scroll events (works with both default and Lenis smooth scroll)
    window.addEventListener("scroll", handleScrollSpy);
    // Trigger once on mount to establish initial state
    handleScrollSpy();

    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  const handleScroll = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* 
        1. DESKTOP VIEW: Vertical HUD Sidebar Navigation
        Hides on screens smaller than 1024px (lg breakpoint)
      */}
      <nav className="hidden lg:flex flex-col gap-4 w-full">
        {/* Navigation Glass Panel */}
        <div className="glass-panel p-6 flex flex-col gap-6">
          <div className="text-[10px] font-mono tracking-widest text-brand-dark uppercase border-b border-border-subtle pb-2">
            // navigation.sys
          </div>

          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onMouseEnter={() => playUiSound("hover")}
                  onClick={() => {
                    playUiSound("click");
                    handleScroll(item.id);
                  }}
                  className={`group w-full flex items-center gap-3 px-4 py-3 text-xs tracking-widest font-mono rounded text-left border transition-all duration-300 ${
                    isActive
                      ? "bg-brand-accent/5 border-brand-accent/20 text-white shadow-[0_0_15px_rgba(255,43,86,0.05)]"
                      : "border-transparent text-brand-muted hover:text-white hover:border-brand-dark/20 hover:bg-white/[0.01]"
                  }`}
                >
                  {/* Glowing active indicator dot */}
                  <div className="relative flex items-center justify-center w-2 h-2">
                    {isActive && (
                      <span className="absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75 animate-ping" />
                    )}
                    <span className={`inline-flex rounded-full h-1.5 w-1.5 ${isActive ? "bg-brand-accent" : "bg-brand-dark/40 group-hover:bg-white/40"} transition-colors`} />
                  </div>

                  <Icon size={14} className={isActive ? "text-brand-accent" : "text-brand-dark group-hover:text-brand-muted"} />
                  <span className="flex-1 font-display font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Social connections panel inside sidebar */}
          <div className="border-t border-border-subtle pt-4 mt-2 flex justify-between items-center text-brand-dark">
            <a href="https://github.com/CodeCrafterAdi2006" target="_blank" rel="noreferrer" className="hover:text-brand-accent transition-colors cursor-pointer">
              <Github size={16} />
            </a>
            <a href="https://www.linkedin.com/in/aditya-singh-0a5a9830b/" target="_blank" rel="noreferrer" className="hover:text-brand-accent transition-colors cursor-pointer">
              <Linkedin size={16} />
            </a>
            <a href="mailto:eragon4273@gmail.com" className="hover:text-brand-accent transition-colors cursor-pointer">
              <Mail size={16} />
            </a>
          </div>
        </div>
      </nav>

      {/* 
        2. MOBILE VIEW: Fixed Top Header with Slide-Down Menu Overlay
        Only visible on screens smaller than 1024px (lg breakpoint)
      */}
      <header className="lg:hidden fixed top-0 left-0 w-full z-40 bg-brand-bg/60 backdrop-blur-md border-b border-border-subtle px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse" />
          <span className="text-white font-display font-bold tracking-[0.2em] text-[10px] uppercase">ADITYA OS</span>
        </div>

        <button
          onClick={() => {
            playUiSound("click");
            setIsOpen(!isOpen);
          }}
          onMouseEnter={() => playUiSound("hover")}
          className="text-white bg-white/5 border border-white/10 p-2 rounded hover:bg-white/10 transition-all"
        >
          {isOpen ? <X size={16} /> : <Menu size={16} />}
        </button>

        {/* Mobile Slide-Down Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-brand-bg/95 backdrop-blur-xl border-b border-border-subtle p-6 flex flex-col gap-6 shadow-2xl z-40"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onMouseEnter={() => playUiSound("hover")}
                    onClick={() => {
                      playUiSound("click");
                      handleScroll(item.id);
                    }}
                    className={`w-full py-3 px-4 text-xs font-display tracking-widest uppercase text-left rounded border transition-all ${
                      activeSection === item.id
                        ? "bg-brand-accent/5 border-brand-accent/20 text-white"
                        : "border-transparent text-brand-muted hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

