import React, { useState } from "react";
import { ArrowUpRight, Github, Linkedin, Instagram, Send, Cpu, Wifi } from "lucide-react";
import { playUiSound } from "../utils/audio";

export default function Footer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "encrypting" | "transmitting" | "success">("idle");
  const [progress, setProgress] = useState(0);

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    playUiSound("click");
    setStatus("encrypting");
    setProgress(15);

    // Simulated satellite transmission sequence
    setTimeout(() => {
      setProgress(50);
      setStatus("transmitting");
    }, 800);

    setTimeout(() => {
      setProgress(90);
    }, 1400);

    setTimeout(() => {
      setProgress(100);
      setStatus("success");
      
      // Trigger actual mail client launch prefilled with data
      const subject = encodeURIComponent(`OS Signal from ${name}`);
      const body = encodeURIComponent(`${message}\n\n---\nSender: ${name} (${email})`);
      window.location.href = `mailto:eragon4273@gmail.com?subject=${subject}&body=${body}`;
    }, 2000);
  };

  const resetDispatcher = () => {
    setName("");
    setEmail("");
    setMessage("");
    setStatus("idle");
    setProgress(0);
    playUiSound("click");
  };

  return (
    <footer className="bg-brand-bg pt-20 relative overflow-hidden">
      
      {/* 
        Interactive Comms Dispatcher Panel
        Maps to id="contact" for navigation links
      */}
      <div id="contact" className="px-8 md:px-12 pb-20">
        <div className="max-w-7xl mx-auto border-t border-border-subtle pt-24">
          
          {/* Header telemetry */}
          <div className="border-b border-border-subtle/50 pb-4 mb-12">
            <span className="text-[10px] font-mono tracking-widest text-brand-dark uppercase block mb-2">// comms.satellite_relay_portal</span>
            <h2 className="text-white text-3xl md:text-4xl font-display font-extrabold tracking-tighter uppercase">
              Establish <span className="text-brand-accent neon-text-glow">Relay Connection</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 items-stretch">
            
            {/* Left Box: Satellite Network Telemetry */}
            <div className="glass-panel p-6 flex flex-col justify-between gap-6 select-none bg-black/35 hover:border-brand-accent/20 transition-all duration-300">
              <div className="flex flex-col gap-4 font-mono text-[9px] tracking-wider text-brand-dark">
                <div className="flex items-center gap-2 text-white font-bold text-[10px] border-b border-border-subtle/30 pb-2">
                  <Wifi size={12} className="text-brand-accent animate-pulse" />
                  <span>RELAY_STATUS: STANDBY</span>
                </div>
                <div className="flex justify-between">
                  <span>&gt; GATEWAY</span>
                  <span className="text-white">MAILTO_ADI_OS</span>
                </div>
                <div className="flex justify-between">
                  <span>&gt; FREQUENCY</span>
                  <span className="text-white">2.482 GHz</span>
                </div>
                <div className="flex justify-between">
                  <span>&gt; LATENCY</span>
                  <span className="text-emerald-400">42 ms</span>
                </div>
                <div className="flex justify-between">
                  <span>&gt; CRYPTO</span>
                  <span className="text-brand-accent">SHIELD_AES256</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 font-mono text-[9px] text-zinc-500 border-t border-border-subtle/30 pt-4 leading-relaxed">
                <p>&gt; Fill out telemetry fields and dispatch packets directly to host. Native email client redirect triggers automatically on package encryption success.</p>
              </div>
            </div>

            {/* Right Box: Interactive Form */}
            <div className="glass-panel p-6 md:p-8 bg-black/45 hover:border-brand-accent/20 transition-all duration-300">
              
              {status === "idle" ? (
                <form onSubmit={handleDispatch} className="flex flex-col gap-6 font-mono text-xs text-white">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-brand-dark text-[9px] uppercase font-bold tracking-widest">SENDER_NAME_RAW</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="ENTER IDENTIFICATION..."
                        className="bg-black/40 border border-border-subtle/60 rounded px-4 py-2.5 outline-none focus:border-brand-accent/50 transition-colors placeholder-brand-dark/40"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-brand-dark text-[9px] uppercase font-bold tracking-widest">SENDER_EMAIL_RELAY</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ENTER ROUTING ADDRESS..."
                        className="bg-black/40 border border-border-subtle/60 rounded px-4 py-2.5 outline-none focus:border-brand-accent/50 transition-colors placeholder-brand-dark/40"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-brand-dark text-[9px] uppercase font-bold tracking-widest">SIGNAL_PAYLOAD (MESSAGE)</label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="ENTER DATA ENCRYPT PROTOCOL..."
                      className="bg-black/40 border border-border-subtle/60 rounded px-4 py-2.5 outline-none focus:border-brand-accent/50 transition-colors placeholder-brand-dark/40 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    onMouseEnter={() => playUiSound("hover")}
                    className="group py-3 bg-brand-accent/5 border border-brand-accent/20 text-brand-accent rounded hover:bg-brand-accent hover:text-white transition-all duration-300 font-bold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(255,43,86,0.02)] hover:shadow-[0_0_20px_rgba(255,43,86,0.15)]"
                  >
                    <span>DISPATCH SIGNAL; // [SEND]</span>
                    <Send size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>

                </form>
              ) : (
                /* Interactive transmission terminal states */
                <div className="h-full flex flex-col justify-center items-center py-12 font-mono text-xs gap-6 select-none">
                  
                  <div className="w-16 h-16 rounded-full border border-brand-accent/30 bg-brand-accent/5 flex items-center justify-center relative">
                    <Cpu size={24} className="text-brand-accent animate-spin" />
                    <div className="absolute inset-0 rounded-full border border-brand-accent opacity-50 animate-ping" />
                  </div>

                  <div className="text-center flex flex-col gap-2 max-w-sm">
                    {status === "encrypting" && (
                      <>
                        <span className="text-brand-accent font-bold tracking-widest uppercase">ENCRYPTING SIGNAL PAYLOAD...</span>
                        <span className="text-brand-dark text-[9px]">COMPILING SHA-256 PACKETS // BYTES SECURE</span>
                      </>
                    )}
                    {status === "transmitting" && (
                      <>
                        <span className="text-brand-secondary font-bold tracking-widest uppercase animate-pulse">LOCATING SATELLITE RELAY...</span>
                        <span className="text-brand-dark text-[9px]">UPLINK ACTIVE // TRANSMITTING DATA STREAM</span>
                      </>
                    )}
                    {status === "success" && (
                      <>
                        <span className="text-emerald-400 font-bold tracking-widest uppercase">SIGNAL TRANSMITTED SUCCESSFULLY</span>
                        <span className="text-brand-dark text-[9px]">NATIVE MAIL ROUTED COMPILATION COMPLETE</span>
                      </>
                    )}
                  </div>

                  {/* Terminal LED Progress bar */}
                  <div className="w-64 border border-border-subtle/50 p-[2px] rounded bg-black/30 flex gap-[2px] h-3.5">
                    {Array.from({ length: 10 }).map((_, idx) => {
                      const isActive = idx < Math.round(progress / 10);
                      return (
                        <div
                          key={idx}
                          className={`h-full flex-1 rounded-xs transition-all duration-300 ${
                            isActive
                              ? "bg-brand-accent shadow-[0_0_8px_rgba(255,43,86,0.4)]"
                              : "bg-brand-dark/10"
                          }`}
                        />
                      );
                    })}
                  </div>

                  {status === "success" && (
                    <button
                      onClick={resetDispatcher}
                      onMouseEnter={() => playUiSound("hover")}
                      className="text-white hover:text-brand-accent transition-colors font-bold uppercase tracking-widest text-[10px]"
                    >
                      &gt; Reset Connection Relay();
                    </button>
                  )}

                </div>
              )}

            </div>

          </div>

          {/* 
            3. Bottom Footer HUD Bar
          */}
          <div className="mt-24 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-border-subtle pt-8 text-brand-dark font-mono text-[9px] tracking-wider select-none">
            
            {/* Left: Social Handles */}
            <div className="flex gap-6 uppercase">
              <a href="https://www.instagram.com/code_crafter2705/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent cursor-pointer transition-colors flex items-center gap-1.5">
                <Instagram size={12} />
                <span>Instagram</span>
              </a>
              <a href="https://github.com/CodeCrafterAdi2006" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent cursor-pointer transition-colors flex items-center gap-1.5">
                <Github size={12} />
                <span>Github</span>
              </a>
              <a href="https://www.linkedin.com/in/aditya-singh-0a5a9830b/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent cursor-pointer transition-colors flex items-center gap-1.5">
                <Linkedin size={12} />
                <span>Linkedin</span>
              </a>
            </div>

            {/* Center: System Classification signature */}
            <div className="text-[9px] text-brand-dark/50 uppercase tracking-widest">
              ADITYA OS // v3.2.6 // CONSOLE RELAY ACTIVE
            </div>

            {/* Right: Reset Top Navigation */}
            <div className="flex items-center gap-8 text-[9px]">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="hover:text-brand-accent cursor-pointer transition-colors flex items-center gap-1.5 font-bold text-white font-mono"
              >
                System.Reset(); ↑
              </button>
            </div>

          </div>
        </div>
      </div>

      <div className="absolute -bottom-10 -right-10 opacity-[0.01] pointer-events-none select-none">
        <h2 className="text-[30vw] font-black uppercase tracking-tighter leading-none">
          ADITYA
        </h2>
      </div>
    </footer>
  );
}
