import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Cloud } from 'lucide-react';

type TimePhase = 'morning' | 'afternoon' | 'evening' | 'night';

export default function DynamicBackground() {
  const [phase, setPhase] = useState<TimePhase>('night'); // Default, gets updated on mount
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const hour = new Date().getHours();
    let currentPhase: TimePhase = 'night';
    if (hour >= 6 && hour < 12) currentPhase = 'morning';
    else if (hour >= 12 && hour < 17) currentPhase = 'afternoon';
    else if (hour >= 17 && hour < 20) currentPhase = 'evening';
    
    setPhase(currentPhase);
    
    if (currentPhase === 'morning' || currentPhase === 'afternoon') {
      document.documentElement.classList.add('theme-light');
    } else {
      document.documentElement.classList.remove('theme-light');
    }
  }, []);

  // Gradients
  const gradients = {
    morning: 'linear-gradient(to bottom, #a18cd1 0%, #fbc2eb 100%)',
    afternoon: 'linear-gradient(to bottom, #4facfe 0%, #00f2fe 100%)',
    evening: 'linear-gradient(to bottom, #fa709a 0%, #fee140 100%)',
    night: 'linear-gradient(to bottom, #0f2027 0%, #203a43 50%, #2c5364 100%)',
  };

  // -------------------------------------------------------------
  // ANIMATIONS BASED ON SCROLL
  // -------------------------------------------------------------

  // Sun / Moon vertical movement
  // Morning: Sun rises from bottom (100% to 50%)
  // Afternoon: Sun is high (20% to 10%)
  // Evening: Sun sets (50% to 90%)
  // Night: Moon is high (10% to 5%)
  
  const sunYMorning = useTransform(scrollYProgress, [0, 1], ['80vh', '30vh']);
  const sunYAfternoon = useTransform(scrollYProgress, [0, 1], ['20vh', '5vh']);
  const sunYEvening = useTransform(scrollYProgress, [0, 1], ['40vh', '90vh']);
  const moonY = useTransform(scrollYProgress, [0, 1], ['15vh', '5vh']);

  // Parallax for stars
  const starsY1 = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const starsY2 = useTransform(scrollYProgress, [0, 1], ['0%', '-100%']);
  const starsY3 = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);

  const cloudsY1 = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const cloudsY2 = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);
  const cloudsY3 = useTransform(scrollYProgress, [0, 1], ['0%', '-90%']);

  const getSunY = () => {
    switch (phase) {
      case 'morning': return sunYMorning;
      case 'afternoon': return sunYAfternoon;
      case 'evening': return sunYEvening;
      default: return sunYMorning;
    }
  };

  const getSunColor = () => {
    switch (phase) {
      case 'morning': return 'radial-gradient(circle, #ffe259 0%, #ffa751 100%)';
      case 'afternoon': return 'radial-gradient(circle, #fffbd5 0%, #b20a2c 100%)'; // Actually just bright yellow
      case 'evening': return 'radial-gradient(circle, #f12711 0%, #f5af19 100%)';
      default: return '#ffe259';
    }
  };

  const isNight = phase === 'night';

  // We need multiple star layers for parallax depth
  const StarLayer = ({ y, count, size, opacity }: { y: any, count: number, size: number, opacity: number }) => {
    const stars = Array.from({ length: count }).map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`
    }));

    return (
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              left: star.left,
              top: star.top,
              width: size,
              height: size,
              animationDelay: star.animationDelay,
            }}
          />
        ))}
      </motion.div>
    );
  };

  const CloudLayer = ({ y, count, size, opacity }: { y: any, count: number, size: number, opacity: number }) => {
    const clouds = Array.from({ length: count }).map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      scale: 0.5 + Math.random(),
    }));

    return (
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0 text-white pointer-events-none">
        {clouds.map((cloud, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: cloud.left,
              top: cloud.top,
              transform: `scale(${cloud.scale})`,
            }}
          >
            <Cloud size={size} fill="currentColor" strokeWidth={0} className="drop-shadow-lg" />
          </div>
        ))}
      </motion.div>
    );
  };

  return (
    <div 
      className="fixed inset-0 z-[-10] overflow-hidden transition-colors duration-1000"
      style={{ background: gradients[phase] }}
    >
      {/* Stars - Only visible at night */}
      {isNight && (
        <>
          <StarLayer y={starsY1} count={100} size={1} opacity={0.4} />
          <StarLayer y={starsY2} count={50} size={2} opacity={0.6} />
          <StarLayer y={starsY3} count={20} size={3} opacity={0.8} />
        </>
      )}

      {/* Clouds - Visible during day/evening */}
      {!isNight && (
        <>
          <CloudLayer y={cloudsY1} count={6} size={120} opacity={0.15} />
          <CloudLayer y={cloudsY2} count={4} size={200} opacity={0.3} />
          <CloudLayer y={cloudsY3} count={3} size={300} opacity={0.5} />
        </>
      )}

      {/* Celestial Body (Sun or Moon) */}
      {!isNight && (
        <motion.div
          style={{
            y: getSunY(),
            background: getSunColor(),
          }}
          className="absolute left-1/2 -translate-x-1/2 w-64 h-64 md:w-96 md:h-96 rounded-full blur-[1px] opacity-90 shadow-[0_0_100px_40px_rgba(255,255,255,0.4)]"
        />
      )}

      {isNight && (
        <motion.div
          style={{ y: moonY }}
          className="absolute left-[60%] w-40 h-40 md:w-60 md:h-60 rounded-full bg-[#f4f6f0] blur-[1px] opacity-90 shadow-[0_0_80px_20px_rgba(255,255,255,0.2)]"
        >
          {/* Moon craters */}
          <div className="absolute top-[20%] left-[30%] w-8 h-8 bg-black/10 rounded-full" />
          <div className="absolute top-[50%] left-[20%] w-12 h-12 bg-black/10 rounded-full" />
          <div className="absolute top-[40%] left-[60%] w-6 h-6 bg-black/10 rounded-full" />
        </motion.div>
      )}

      {/* Foreground gradient to ensure text remains readable */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
    </div>
  );
}
