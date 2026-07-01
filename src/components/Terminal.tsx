import { useState, useRef, useEffect } from "react";
import { Terminal as TermIcon, ArrowRight } from "lucide-react";
import { playUiSound } from "../utils/audio";

interface CommandLog {
  command: string;
  output: string;
}

export default function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandLog[]>([
    {
      command: "system_boot",
      output: `ADITYA OS [Version 3.2.6]
(c) 2026 Aditya Singh. Core active relays online.

Type 'help' to review available terminal protocols.`
    }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const consoleBufferRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (consoleBufferRef.current) {
      consoleBufferRef.current.scrollTop = consoleBufferRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let output = "";

    if (trimmed === "") return;

    // Store in history list for ArrowUp/Down traversal
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    switch (trimmed) {
      case "help":
        output = `Available commands in this workstation:
  whoami   - Display system pilot classification details
  skills   - Output Technical Telemetry diagnostic stack
  projects - Fetch Selected Artifact archive list
  clear    - Clear terminal shell log buffer
  sudo hire aditya - Initiate recruitment sequence protocol`;
        break;
      
      case "whoami":
        output = `Host Pilot: Aditya Singh
Classification: AI Engineer & Automation Architect
Focus: Large Language Models, Multi-Agent Swarms, and UI Relays
Status: Available for opportunities
Bio: Bridging intelligence thresholds and building high-performance systems.`;
        break;

      case "skills":
        output = `TECHNICAL SPECIFICATIONS:
  - AI/ML Learning: PyTorch, LangChain, TensorFlow, OpenCV
  - Web Development: React, TypeScript, Next.js, Tailwind v4
  - Game Development: Pygame, Algorithms, Procedural Physics
  - Systems: Docker, Kubernetes, AWS, GitHub Actions CI/CD`;
        break;

      case "projects":
        output = `RETRIEVING SELECTED BUILDS:
  - ShortsForge (AI Video Automation Engine) -> [JS/Node.js/Express]
  - Velox Ecosystem (Web3 Analytics Dashboard) -> [Next.js/Postgres]
  - 1 Line a Day (Pygame Procedural Planner) -> [Python/Pygame]`;
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      case "sudo hire aditya":
        output = `[RECRUITMENT SEQUENCE ENGAGED...]
Initializing secure contact relays... Done.
Please dispatch a mail relay directly to: eragon4273@gmail.com
Thank you for choosing Aditya OS. Session logged.`;
        break;

      default:
        output = `Command not found: "${cmd}". Type 'help' for directory.`;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      
      playUiSound("hover");
      setHistoryIndex((prevIndex) => {
        const nextIndex = prevIndex === -1 ? commandHistory.length - 1 : Math.max(0, prevIndex - 1);
        setInput(commandHistory[nextIndex]);
        return nextIndex;
      });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (commandHistory.length === 0 || historyIndex === -1) return;
      
      playUiSound("hover");
      setHistoryIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex >= commandHistory.length) {
          setInput("");
          return -1;
        } else {
          setInput(commandHistory[nextIndex]);
          return nextIndex;
        }
      });
    }
  };

  return (
    <section 
      id="terminal-sec" 
      className="py-20 px-6 md:px-8 border-b border-border-subtle relative z-10"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* Header telemetry */}
        <div className="border-b border-border-subtle pb-2">
          <span className="text-[10px] font-mono tracking-widest text-brand-dark uppercase">// core.terminal_workstation</span>
        </div>

        {/* Terminal Window Grid */}
        <div className="glass-panel overflow-hidden flex flex-col h-[400px] hover:border-brand-accent/20 transition-all duration-300">
          
          {/* Terminal Title Bar */}
          <div className="flex justify-between items-center border-b border-border-subtle bg-white/5 px-4 py-2 select-none">
            <div className="flex items-center gap-2">
              <TermIcon size={12} className="text-brand-accent animate-pulse" />
              <span className="font-mono text-[9px] uppercase tracking-wider text-white">aditya@workstation: ~/shell</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-brand-accent/50" />
              <div className="w-2 h-2 rounded-full bg-brand-secondary/50" />
              <div className="w-2 h-2 rounded-full bg-brand-dark/50" />
            </div>
          </div>

          {/* Terminal Console Buffer */}
          <div 
            ref={consoleBufferRef}
            className="flex-1 overflow-y-auto bg-black/45 p-4 font-mono text-[10px] text-zinc-300 leading-relaxed flex flex-col gap-4 scrollbar-thin"
          >
            {history.map((log, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                {log.command !== "system_boot" && (
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <span className="text-brand-accent">&gt;</span>
                    <span>{log.command}</span>
                  </div>
                )}
                <div className="text-brand-muted whitespace-pre-wrap pl-2 border-l border-border-subtle/20">
                  {log.output}
                </div>
              </div>
            ))}
          </div>

          {/* Terminal Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              playUiSound("click");
              executeCommand(input);
            }}
            className="flex gap-2 items-center border-t border-border-subtle bg-black/20 p-2.5 focus-within:bg-black/40 transition-colors"
          >
            <span className="text-brand-accent font-bold pl-2 text-[10px] select-none">&gt;</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type 'help' for available commands..."
              className="flex-1 bg-transparent text-[10px] text-white placeholder-brand-dark/60 font-mono outline-none border-none py-1"
            />
            <button
              type="submit"
              onMouseEnter={() => playUiSound("hover")}
              className="p-1.5 bg-brand-accent/5 border border-brand-accent/20 text-brand-accent hover:bg-brand-accent hover:text-white rounded transition-all cursor-pointer"
            >
              <ArrowRight size={10} />
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}
