import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // useSpring adds that "luxury inertia" feel - smooth outer ring following
  const springConfig = { damping: 28, stiffness: 200 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // default to hide on initial render

  useEffect(() => {
    // Check if the device is mobile/tablet or touch-primary
    const checkDevice = () => {
      const isTouch = window.matchMedia("(max-width: 1024px) or (pointer: coarse)").matches;
      setIsMobile(isTouch);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest(".group") ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  // Disable completely on touch screens to prevent stuck visual bugs
  if (isMobile) return null;

  return (
    <>
      {/* 1. Core Target Point (Zero-lag red laser dot) */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-brand-accent shadow-[0_0_8px_rgba(255,43,86,0.8)] rounded-full z-[9999] pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.4 : 1,
        }}
      />

      {/* 2. Outer HUD Crosshair Ring (Follows with spring inertia and spins on hover) */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-brand-accent/40 z-[9999] pointer-events-none flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          rotate: isHovering ? 360 : 0,
          borderColor: isHovering ? "rgba(255, 43, 86, 0.8)" : "rgba(255, 43, 86, 0.35)",
        }}
        transition={{
          rotate: isHovering 
            ? { repeat: Infinity, duration: 8, ease: "linear" } 
            : { duration: 0.5, ease: "easeOut" },
          scale: { type: "spring", damping: 18, stiffness: 220 },
        }}
      >
        {/* Crosshair Tick Marks at 12, 3, 6, 9 o'clock */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-1.5 bg-brand-accent/50" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-1.5 bg-brand-accent/50" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-[1px] bg-brand-accent/50" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-[1px] bg-brand-accent/50" />
      </motion.div>
    </>
  );
}
