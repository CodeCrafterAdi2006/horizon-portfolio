import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cpu, Database, Wifi, Activity } from "lucide-react";

interface GaugeProps {
  value: number;
  max: number;
  label: string;
  unit: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

function CircularGauge({ value, max, label, unit, icon: Icon }: GaugeProps) {
  const radius = 28;
  const strokeWidth = 3;
  const circumference = 2 * Math.PI * radius; // ~175.93
  const strokeDashoffset = circumference - (Math.min(value, max) / max) * circumference;

  return (
    <div className="flex flex-col items-center gap-2 flex-1">
      {/* Dynamic Circular SVG */}
      <div className="relative w-16 h-16 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          {/* Background circle ring */}
          <circle
            cx="32"
            cy="32"
            r={radius}
            className="stroke-brand-dark/10 fill-none"
            strokeWidth={strokeWidth}
          />
          {/* Glowing active ring */}
          <circle
            cx="32"
            cy="32"
            r={radius}
            className="stroke-brand-accent fill-none transition-all duration-500 ease-out"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        {/* Core Icon in Center of Dial */}
        <div className="absolute inset-0 flex items-center justify-center text-brand-dark hover:text-brand-accent transition-colors">
          <Icon size={16} className="opacity-80" />
        </div>
      </div>

      {/* Stats Text */}
      <div className="text-center font-mono">
        <div className="text-white text-xs font-bold">{Math.round(value)}{unit}</div>
        <div className="text-[8px] uppercase tracking-wider text-brand-dark mt-0.5">{label}</div>
      </div>
    </div>
  );
}

export default function Diagnostics() {
  const [cpu, setCpu] = useState(42);
  const [ram, setRam] = useState(62.4);
  const [ping, setPing] = useState(24);
  const [uptime, setUptime] = useState(0);

  // 1. Telemetry Simulation
  useEffect(() => {
    const timer = setInterval(() => {
      // Simulate CPU load fluctuating
      setCpu((prev) => {
        const delta = (Math.random() - 0.5) * 15;
        const next = prev + delta;
        return Math.max(15, Math.min(95, next));
      });

      // Simulate network latency shifts
      setPing((prev) => {
        const delta = Math.random() > 0.8 ? (Math.random() - 0.5) * 12 : (Math.random() - 0.5) * 3;
        const next = prev + delta;
        return Math.max(12, Math.min(80, next));
      });

      // Simulate RAM slowly drifting up and down
      setRam((prev) => {
        const delta = (Math.random() - 0.5) * 0.8;
        const next = prev + delta;
        return Math.max(58, Math.min(78, next));
      });
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  // 2. Incremental Uptime Counter
  useEffect(() => {
    const timer = setInterval(() => {
      setUptime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format uptime to hh:mm:ss
  const formatUptime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  const ramUsedGb = ((ram / 100) * 8.0).toFixed(2);

  return (
    <div className="glass-panel p-6 flex flex-col gap-6">
      {/* Header section with telemetry pulse */}
      <div className="flex justify-between items-center border-b border-border-subtle pb-2">
        <div className="text-[10px] font-mono tracking-widest text-brand-dark uppercase">
          // telemetry.sys
        </div>
        <div className="flex items-center gap-1.5 text-[8px] font-mono text-green-500 uppercase tracking-widest">
          <Activity size={10} className="animate-pulse" />
          <span>Status: Normal</span>
        </div>
      </div>

      {/* Visual Progress Gauges Row */}
      <div className="flex justify-between items-center gap-4 py-2 border-b border-border-subtle/50 pb-4">
        <CircularGauge value={cpu} max={100} label="CPU" unit="%" icon={Cpu} />
        <CircularGauge value={ram} max={100} label="RAM" unit="%" icon={Database} />
        <CircularGauge value={ping} max={100} label="PING" unit="ms" icon={Wifi} />
      </div>

      {/* Grid of raw diagnostics values */}
      <div className="grid grid-cols-2 gap-4 text-[9px] font-mono text-brand-muted">
        <div className="flex flex-col gap-1 border-r border-border-subtle/40 pr-2">
          <span className="text-[8px] uppercase tracking-wider text-brand-dark">Host Core Relays</span>
          <span className="text-white font-medium">&gt; 4 CORES ACTIVE</span>
        </div>
        <div className="flex flex-col gap-1 pl-2">
          <span className="text-[8px] uppercase tracking-wider text-brand-dark">Mem Allocation</span>
          <span className="text-white font-medium">&gt; {ramUsedGb} GB / 8.00 GB</span>
        </div>
        <div className="flex flex-col gap-1 border-r border-border-subtle/40 pr-2 pt-2 border-t border-border-subtle/30">
          <span className="text-[8px] uppercase tracking-wider text-brand-dark">Telemetry Sync</span>
          <span className="text-white font-medium">&gt; FREQ: 0.67 HZ</span>
        </div>
        <div className="flex flex-col gap-1 pl-2 pt-2 border-t border-border-subtle/30">
          <span className="text-[8px] uppercase tracking-wider text-brand-dark">Telemetry Uptime</span>
          <span className="text-white font-medium animate-pulse">&gt; {formatUptime(uptime)}</span>
        </div>
      </div>
    </div>
  );
}
