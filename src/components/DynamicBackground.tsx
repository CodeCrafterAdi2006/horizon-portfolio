import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

type TimePhase = 'morning' | 'afternoon' | 'evening' | 'night';
const phases: TimePhase[] = ['morning', 'afternoon', 'evening', 'night'];

interface Petal {
  x: number;
  y: number;
  r: number;
  density: number;
  opacity: number;
  color: string;
  angle: number;
  spin: number;
  speedY: number;
  speedX: number;
}

interface Star {
  x: number;
  y: number;
  size: number;
  phase: number;
  phaseSpeed: number;
}

export default function DynamicBackground() {
  const [phase, setPhase] = useState<TimePhase>('night');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const phaseRef = useRef(phase);
  const lastTransitionTimeRef = useRef(Date.now());

  // Sync phase state with ref for canvas continuous animation access
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  // Shared transition controller with 6.5s cooldown guard
  const triggerTransition = (): boolean => {
    const now = Date.now();
    if (now - lastTransitionTimeRef.current < 6500) {
      return false; // Transition blocked by cooldown
    }
    lastTransitionTimeRef.current = now;

    setPhase((curr) => {
      const others = phases.filter((p) => p !== curr);
      const next = others[Math.floor(Math.random() * others.length)];
      return next;
    });
    return true; // Transition accepted
  };

  // 1. Scheduler: Random Timer Phase Transitions (12s to 24s interval)
  useEffect(() => {
    const scheduleNext = () => {
      const delay = 12000 + Math.random() * 12000;
      return setTimeout(() => {
        triggerTransition();
        timerRef.current = scheduleNext();
      }, delay);
    };

    const timerRef = { current: scheduleNext() };

    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  // 2. Scheduler: Random Scroll Delta Transitions (scrolling 250px to 550px)
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let threshold = 250 + Math.random() * 300; // Scroll threshold spacing

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY);

      if (delta >= threshold) {
        const accepted = triggerTransition();
        if (accepted) {
          // Regenerate new random scroll threshold if transition was accepted
          threshold = 250 + Math.random() * 300;
        }
        lastScrollY = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 3. Setup Canvas Particle Engine (Runs once on mount)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let petals: Petal[] = [];
    let stars: Star[] = [];

    // Initialize all particles on load (stars & petals)
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      petals = Array.from({ length: 65 }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: 3 + Math.random() * 5,
        density: 0.5 + Math.random() * 1.5,
        opacity: 0.3 + Math.random() * 0.5,
        color: Math.random() > 0.3 ? 'rgba(255, 43, 86, 0.6)' : 'rgba(255, 102, 163, 0.5)',
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.02,
        speedY: 1 + Math.random() * 1.5,
        speedX: -1 + Math.random() * 0.5,
      }));

      stars = Array.from({ length: 120 }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 0.5 + Math.random() * 1.8,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.01 + Math.random() * 0.03,
      }));
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Continuous physics update loop
    let time = 0;
    let starOpacityMultiplier = 0.0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.002;

      // Target star visibility based on night/evening
      const targetStarOpacity = (phaseRef.current === 'night' || phaseRef.current === 'evening') ? 1.0 : 0.0;
      starOpacityMultiplier += (targetStarOpacity - starOpacityMultiplier) * 0.03;

      // Render Twinkling Stars
      if (starOpacityMultiplier > 0.01) {
        stars.forEach((star) => {
          star.phase += star.phaseSpeed;
          const baseOpacity = 0.2 + (Math.sin(star.phase) + 1) * 0.4;
          const starOpacity = baseOpacity * starOpacityMultiplier;

          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${starOpacity})`;
          ctx.fill();
        });
      }

      // Physics & Drawing Sakura Petals
      petals.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-p.r, -p.r / 2, -p.r, p.r / 2, 0, p.r * 1.5);
        ctx.bezierCurveTo(p.r, p.r / 2, p.r, -p.r / 2, 0, 0);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.restore();

        p.y += p.speedY + Math.sin(time + p.density) * 0.2;
        p.x += p.speedX + Math.cos(time + p.density) * 0.4;
        p.angle += p.spin;

        // Mouse Repulsion Field (Radius: 160px)
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const radius = 160;

        if (distance < radius) {
          const force = (radius - distance) / radius;
          const repulsionAngle = Math.atan2(dy, dx);
          p.x += Math.cos(repulsionAngle) * force * 5;
          p.y += Math.sin(repulsionAngle) * force * 5;
        }

        // Recycle offscreen particles
        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -20) {
          p.x = canvas.width + 20;
        } else if (p.x > canvas.width + 20) {
          p.x = -20;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Background Scenery Images mapped to active phase cycles
  const backgroundImages = {
    morning: '/Background/image.png',
    afternoon: '/Background/image copy.png',
    evening: '/Background/image copy 2.png',
    night: '/Background/image copy 3.png',
  };

  // Celestial sun position map (smooth framer-motion transitions)
  const getSunY = () => {
    switch (phase) {
      case 'morning': return '55vh';
      case 'afternoon': return '12vh';
      case 'evening': return '38vh';
      default: return '80vh';
    }
  };

  const getSunColor = () => {
    switch (phase) {
      case 'morning': return 'radial-gradient(circle, rgba(255, 102, 163, 0.45) 0%, rgba(255, 43, 86, 0.05) 70%)';
      case 'afternoon': return 'radial-gradient(circle, rgba(255, 255, 255, 0.25) 0%, rgba(255, 43, 86, 0.03) 60%)';
      default: return 'radial-gradient(circle, rgba(255, 43, 86, 0.4) 0%, rgba(255, 102, 163, 0.05) 70%)';
    }
  };

  const getSunOpacity = () => {
    return phase !== 'night' ? 0.7 : 0.0;
  };

  const getMoonOpacity = () => {
    return phase === 'night' ? 0.15 : 0.0;
  };

  const getMoonY = () => {
    return phase === 'night' ? '12vh' : '2vh';
  };

  return (
    <div className="fixed inset-0 z-[-10] overflow-hidden bg-black select-none">
      
      {/* 
        1. Layered cross-fading background images 
        Increased opacity to 0.38 for clearer scenery details
      */}
      {phases.map((p) => (
        <div
          key={p}
          className="absolute inset-0 transition-opacity duration-[1800ms] ease-in-out"
          style={{ 
            opacity: phase === p ? 0.38 : 0 
          }}
        >
          <img 
            src={backgroundImages[p]} 
            alt={`scenery-${p}`} 
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* 2. Nebula Ambient Glow Multi-Layer */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-screen transition-opacity duration-1000"
        style={{
          background: phase === 'night'
            ? 'radial-gradient(circle at 70% 30%, rgba(255, 43, 86, 0.08) 0%, transparent 60%), radial-gradient(circle at 20% 70%, rgba(255, 102, 163, 0.05) 0%, transparent 50%)'
            : 'radial-gradient(circle at 80% 20%, rgba(255, 43, 86, 0.12) 0%, transparent 50%)',
        }}
      />

      {/* 3. Cyber grid backdrop overlay */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* 4. HTML5 Canvas Particles (continuous Stars & Sakura) */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* 5. Celestial Sun Orb (Smooth sliding & fading) */}
      <motion.div
        animate={{
          y: getSunY(),
          opacity: getSunOpacity(),
        }}
        transition={{
          duration: 2.0,
          ease: [0.16, 1, 0.3, 1]
        }}
        style={{
          background: getSunColor(),
        }}
        className="absolute left-[70%] -translate-x-1/2 w-80 h-80 md:w-[480px] md:h-[480px] rounded-full blur-[2px] pointer-events-none"
      />

      {/* 6. Celestial Moon Orb (Smooth sliding & fading) */}
      <motion.div
        animate={{
          y: getMoonY(),
          opacity: getMoonOpacity(),
        }}
        transition={{
          duration: 2.0,
          ease: [0.16, 1, 0.3, 1]
        }}
        style={{
          background: 'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 43, 86, 0.03) 70%)',
          boxShadow: '0 0 80px 10px rgba(255, 43, 86, 0.05)',
        }}
        className="absolute left-[75%] w-48 h-48 md:w-80 md:h-80 rounded-full blur-[1px] pointer-events-none"
      />

      {/* 7. Vignette mask to ensure readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
    </div>
  );
}
