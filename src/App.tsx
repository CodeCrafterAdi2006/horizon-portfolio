/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import ProjectList from "./components/ProjectList";
import Skills from "./components/Skills";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import SmoothScroll from "./components/SmoothScroll";
import DynamicBackground from "./components/DynamicBackground";
import Loader from "./components/Loader";
import LayoutGrid from "./components/LayoutGrid";
import Diagnostics from "./components/Diagnostics";
import AIWidget from "./components/AIWidget";
import AudioController from "./components/AudioController";
import Terminal from "./components/Terminal";
import Experience from "./components/Experience";
import About from "./components/About";
import { useState, useEffect } from "react";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Prevent scrolling while loader is active
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <SmoothScroll>
      <div className="relative selection:bg-brand-accent selection:text-white min-h-screen">
        <Loader onComplete={() => setIsLoading(false)} />
        <DynamicBackground />
        <CustomCursor />
        <div className="noise" />
        <div className="hud-scanline" />
        
        {/* Ambient Telemetry Glows (Cinematic Lighting) */}
        <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-accent/[0.03] blur-[130px] pointer-events-none z-0" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-brand-secondary/[0.02] blur-[150px] pointer-events-none z-0" />
        <div className="fixed top-[35%] left-[50%] -translate-x-1/2 w-[45vw] h-[45vw] rounded-full bg-brand-accent/[0.02] blur-[135px] pointer-events-none z-0" />
        
        {/* Main Operating System Workstation HUD Layout */}
        <LayoutGrid
          left={
            <div className="flex flex-col gap-6 w-full">
              <Navigation />
              
              <div className="glass-panel p-6 flex flex-col gap-4 text-center">
                <div className="w-16 h-16 rounded-full bg-brand-accent/10 border border-brand-accent/20 mx-auto flex items-center justify-center font-display font-bold text-brand-accent shadow-[0_0_15px_rgba(255,43,86,0.1)]">
                  OS
                </div>
                <h2 className="font-display font-medium text-white text-sm tracking-wider uppercase">Aditya OS</h2>
                <p className="text-[9px] text-brand-accent/80 font-mono tracking-widest uppercase animate-pulse">System Active</p>
                <div className="h-[1px] bg-border-subtle my-2" />
                <div className="text-left text-[10px] text-brand-muted font-mono flex flex-col gap-2">
                  <div>&gt; STATUS: SECURE</div>
                  <div>&gt; CORES: ACTIVE</div>
                  <div>&gt; RELAY: ONLINE</div>
                  <div className="border-t border-border-subtle/30 pt-1.5 mt-0.5 text-[8px] text-brand-dark tracking-wider">
                    LOC: 28.6139° N // 77.2090° E // DELHI
                  </div>
                </div>
              </div>
            </div>
          }
          center={
            <div className="flex flex-col gap-8">
              <Hero />
              <About />
              <ProjectList />
              <Skills />
              <Experience />
              <Terminal />
            </div>
          }
          right={
            <div className="flex flex-col gap-6">
              <Diagnostics />
              <AIWidget />
            </div>
          }
        />
        
        <Footer />
        <AudioController />
      </div>
    </SmoothScroll>
  );
}


