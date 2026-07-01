import { useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface AudioControllerProps {
  currentTrack: "off" | "horizons" | "ascension";
  setCurrentTrack: React.Dispatch<React.SetStateAction<"off" | "horizons" | "ascension">>;
}

export default function AudioController({ currentTrack, setCurrentTrack }: AudioControllerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Audio once on mount
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Sync audio source and state changes
  useEffect(() => {
    if (!audioRef.current) return;

    if (currentTrack === "off") {
      audioRef.current.pause();
    } else {
      const src = currentTrack === "horizons" ? "/Horizons.mp3" : "/sb_ascension.mp3";
      audioRef.current.src = src;
      audioRef.current.load();
      audioRef.current.play().catch((err) => {
        console.warn("Audio play blocked by browser: ", err);
      });
    }
  }, [currentTrack]);

  const cycleMusic = () => {
    setCurrentTrack((prev) => {
      if (prev === "off") return "horizons";
      if (prev === "horizons") return "ascension";
      return "off";
    });
  };

  return (
    <>
      {/* 
        Floating Glassmorphic Audio Capsule
        Pinned to the bottom-right corner of the viewport (always accessible)
      */}
      <div 
        className="fixed bottom-6 right-6 z-50 glass-panel px-4 py-2.5 flex items-center gap-4 shadow-2xl transition-all duration-300 hover:border-brand-accent/40 group hover:shadow-[0_0_20px_rgba(255,43,86,0.15)]"
      >
        <button
          onClick={cycleMusic}
          className="hover:text-brand-accent cursor-pointer transition-colors flex items-center gap-2.5 text-white font-mono text-[9px] tracking-wider"
        >
          {currentTrack === "off" ? (
            <VolumeX size={12} className="text-brand-dark group-hover:text-brand-accent transition-colors" />
          ) : (
            <Volume2 size={12} className="text-brand-accent animate-bounce" />
          )}
          <span className="uppercase font-semibold select-none">
            {currentTrack === "off" ? "MUSIC: OFF" : `${currentTrack}`}
          </span>
        </button>

        {/* Vertical divider line */}
        <div className="w-[1px] h-3 bg-border-subtle" />

        {/* Animated wave bars */}
        <div className="flex items-end gap-[2.5px] h-[12px] w-[20px] select-none">
          {[0.6, 0.9, 0.7, 1.1, 0.8].map((speed, i) => (
            <div
              key={i}
              style={{
                animation: currentTrack !== "off" ? `audio-bar-wave ${speed}s ease-in-out infinite` : "none",
                animationDelay: `${i * 0.1}s`,
                height: currentTrack !== "off" ? undefined : "2px"
              }}
              className="w-[2.5px] bg-brand-accent rounded-sm transition-all duration-300"
            />
          ))}
        </div>
      </div>

      {/* Styled audio waveform keyframes */}
      <style>{`
        @keyframes audio-bar-wave {
          0%, 100% { height: 2px; }
          50% { height: 12px; }
        }
      `}</style>
    </>
  );
}
