import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { playUiSound } from "../utils/audio";

interface LoaderProps {
  onComplete: () => void;
  onEnter?: () => void;
}

export default function Loader({ onComplete, onEnter }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("CONNECTING TO NEURAL NETWORK...");
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Simulate loading progress with varying increments
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 12) + 4;
        return next > 100 ? 100 : next;
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress > 25 && progress < 60) {
      setLoadingText("INITIALIZING NEURAL COCKPIT...");
    } else if (progress >= 60 && progress < 90) {
      setLoadingText("SYNCHRONIZING SATELLITE CORE...");
    } else if (progress >= 90 && progress < 100) {
      setLoadingText("CALIBRATING HUD TELEMETRY...");
    } else if (progress === 100) {
      setLoadingText("SYSTEMS READY. SYNAPSE STABLE.");
      setShowButton(true);
    }
  }, [progress]);

  const handleEnter = () => {
    playUiSound("click");
    if (onEnter) onEnter();
    onComplete(); // Immediately trigger parent unmount in App.tsx
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] text-white select-none"
    >
      {/* Nebular background glows */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-brand-accent/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-brand-secondary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="flex flex-col items-center gap-12 font-mono max-w-xl w-full px-8 relative z-10">
        
        {/* 1. Cyber Katana Assembly */}
        <div className="flex items-center relative py-6 scale-110">
          
          {/* Tsuka (Handle) with Wrapped grip diamond details */}
          <div className="w-20 h-4 bg-zinc-900 border border-zinc-700 relative rounded-l-xs flex items-center justify-around shadow-[0_0_8px_rgba(0,0,0,0.8)]">
            <div className="w-2 h-2 rotate-45 border-r border-b border-zinc-600 bg-zinc-800" />
            <div className="w-2 h-2 rotate-45 border-r border-b border-zinc-600 bg-zinc-800" />
            <div className="w-2 h-2 rotate-45 border-r border-b border-zinc-600 bg-zinc-800" />
            <div className="w-2 h-2 rotate-45 border-r border-b border-zinc-600 bg-zinc-800" />
          </div>

          {/* Tsuba (Handguard) */}
          <div className="w-2 h-8 bg-zinc-700 border-x border-zinc-500 rounded-sm relative z-20 shadow-[0_0_10px_rgba(0,0,0,0.6)]" />

          {/* Habaki (Blade Collar) */}
          <div className="w-4 h-3 bg-yellow-600/80 border-y border-r border-yellow-500/50 relative z-10" />

          {/* Nagasa (Blade Slot) */}
          <div className="w-64 h-3 bg-zinc-950/95 border-y border-r border-zinc-800/80 rounded-r-md relative overflow-hidden flex items-center">
            
            {/* Glowing growing Cyber Katana Blade */}
            <motion.div
              className="h-full bg-gradient-to-r from-red-600 via-brand-accent to-rose-400 relative"
              style={{
                boxShadow: "0 0 16px #FF2B56, 0 0 4px #FF66A3",
                clipPath: "polygon(0% 0%, 96% 0%, 100% 50%, 96% 100%, 0% 100%)", // Kissaki sloped sword tip!
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.15 }}
            >
              {/* Bleeding pulse laser beam running down the blade */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent w-[30%] h-full animate-[pulse-sweep_1.5s_linear_infinite]" />
            </motion.div>
            
          </div>

        </div>

        {/* 2. Status Log */}
        <div className="w-full flex flex-col gap-2 border-t border-border-subtle/30 pt-6">
          <div className="flex justify-between items-center text-[10px] tracking-widest text-brand-dark uppercase">
            <span>{loadingText}</span>
            <span className="text-white font-bold">{Math.min(progress, 100)}%</span>
          </div>
          <div className="flex justify-between items-center text-[9px] text-zinc-600">
            <span>MODULE_ID: SECURE_ADI_BOOT</span>
            <span>SEC_GRID_ACTIVE</span>
          </div>
        </div>

        {/* 3. Enter Gate Button (Reveals at 100%) */}
        <div className="h-14 w-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            {showButton && (
              <motion.button
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ type: "spring", damping: 15, stiffness: 200 }}
                onClick={handleEnter}
                onMouseEnter={() => playUiSound("hover")}
                className="py-3 px-8 bg-brand-accent/5 border border-brand-accent/30 text-brand-accent rounded font-bold uppercase tracking-widest text-[11px] cursor-pointer hover:bg-brand-accent hover:text-white hover:border-brand-accent hover:shadow-[0_0_20px_rgba(255,43,86,0.35)] transition-all duration-300 flex items-center gap-2 select-none"
              >
                <span>INITIALIZE WORKSTATION; // [ENTER]</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Keyframe animation for bleeding glow beam */}
      <style>{`
        @keyframes pulse-sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(350%); }
        }
      `}</style>

    </motion.div>
  );
}
