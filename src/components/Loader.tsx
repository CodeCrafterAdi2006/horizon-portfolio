import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("INITIALIZING SYSTEM CORE...");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress > 30 && progress < 70) {
      setLoadingText("LOADING ASSETS...");
    } else if (progress >= 70 && progress < 100) {
      setLoadingText("ESTABLISHING CONNECTION...");
    } else if (progress >= 100) {
      setLoadingText("ACCESS GRANTED.");
      setTimeout(() => {
        setIsDone(true);
        setTimeout(onComplete, 400); // Give time for exit animation
      }, 200);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080808] text-white"
        >
          <div className="w-full max-w-md px-8 font-mono">
            <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-widest" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              <span>{loadingText}</span>
              <span>{Math.min(progress, 100)}%</span>
            </div>
            
            <div className="h-[2px] w-full overflow-hidden" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
              <motion.div
                className="h-full"
                style={{ backgroundColor: '#ffffff' }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: "linear", duration: 0.2 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
