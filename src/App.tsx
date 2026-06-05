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
      <div className="relative selection:bg-white selection:text-black min-h-screen">
        <Loader onComplete={() => setIsLoading(false)} />
        <DynamicBackground />
        <CustomCursor />
        <div className="noise" />
        <Navigation />
        <main>
          <Hero />
          <ProjectList />
          <Skills />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}

