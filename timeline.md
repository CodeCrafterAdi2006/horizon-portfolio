# Project Timeline: Eragon OS (Cyber-Zen Portfolio)

This document tracks the phases of development, milestones, verification checklists, and daily progress logs for the complete redesign of the portfolio website.

---

## Current Status
* **Current Phase:** Phase 1 (Planning & Setup)
* **Completion Progress:** 5%
* **Last Updated:** 2026-07-01

---

## 1. Phase Breakdown & Verification Gates

### Phase 1: Architectural Foundation & Base Layout Grid
* **Goal:** Set up the responsive CSS Grid representing the HUD console layout. 
* **Key Tasks:**
  * Clean out the old, cartoonish assets and components.
  * Establish the global CSS variables in `index.css` (color tokens using HSL, borders, glow values).
  * Design a responsive CSS Grid with three main columns:
    * Left: Navigation Sidebar
    * Center: Main Canvas (Hero, Projects, Profile details)
    * Right: System Diagnostics & Activity HUD
    * Bottom: Audio/Visual Control & System Status Footer
* **Verification Gate:**
  - [ ] App compiles without errors (`npm run dev`).
  - [ ] The core grid fits the browser window at 100vh with no unwanted scrollbars.
  - [ ] Layout is responsive (columns stack or fold cleanly on mobile breakpoints).

---

### Phase 2: The Living Atmosphere (Canvas & Parallax)
* **Goal:** Build the immersive visual backdrop.
* **Key Tasks:**
  * Create a slow-moving, gradient-based nebula background.
  * Implement an HTML5 `<canvas>` particle engine for:
    * Twinkling background stars (night mode).
    * Bioluminescent cherry blossom petals that drift across the screen.
  * Implement a mouse-affinity hook so petals gently swirl or repel when the cursor gets close.
  * Add scroll-linked Framer Motion parallax transitions (background moves slower than foreground).
* **Verification Gate:**
  - [ ] Performance check: Frame rate remains stable at 60 FPS on mobile and desktop.
  - [ ] Canvas resizes dynamically when the window width changes.
  - [ ] Mouse tracking is active with no visual stuttering.

---

### Phase 3: Glassmorphic HUD Panels & Constellation Navigation
* **Goal:** Build the modular terminal windows and navigation interactions.
* **Key Tasks:**
  * Design the frosted-glass panel utility classes (`backdrop-blur-md bg-black/40 border border-white/10`).
  * Implement custom glowing hover border triggers (using radial gradient overlays tracking mouse offset).
  * Build the left-hand navigation menu with custom micro-animations (active state glows, icons animate on hover).
  * Implement the glowing circular Profile/About me capsule.
* **Verification Gate:**
  - [ ] Active tabs correctly switch focus.
  - [ ] Text remains highly legible over the dynamic background colors.
  - [ ] Smooth scrolling (Lenis) functions correctly across all panels.

---

### Phase 4: Active Core Modules (Terminal & Statistics)
* **Goal:** Build the interactive, functional simulation elements of the dashboard.
* **Key Tasks:**
  * Create the bottom **Terminal Simulator**:
    * Prints real-time system logs during scrolling or interactions.
    * Accepts console inputs (`help`, `projects`, `skills`, `sudo hire eragon`).
  * Design the circular **System Diagnostics** dials (CPU, Memory, Latency) using SVG progress rings.
  * Render the **GitHub Universe** (glowing, interactive 3D-like commit sphere).
  * Build the interactive project list grid with 3D hover tilt effects.
* **Verification Gate:**
  - [ ] Terminal inputs correctly parse commands and return appropriate text outputs.
  - [ ] Tech stack icons have high contrast and display detailed tooltips.
  - [ ] Project cards show smooth CSS 3D tilt translations on mouse hover.

---

### Phase 5: Audio Integration & AI Assistant Engine
* **Goal:** Add sound feedback and the keyword-matching assistant.
* **Key Tasks:**
  * Build the **Audio Ambience Engine**:
    * Low synth pad background loop (starts strictly muted).
    * Hover beeps and confirmation click sound effects.
    * Glowing spectrum analyzer visualizer in the footer that animates when audio plays.
  * Build the **AI Assistant Widget**:
    * Suggestion chips that pre-populate queries.
    * Local keyword-matching system to search portfolio sections and answer queries instantly.
* **Verification Gate:**
  - [ ] Audio toggle works cleanly; state persists across navigation.
  - [ ] Chatbot responds to queries and handles unknown queries gracefully.
  - [ ] Audio visualizer matches the sound play state.

---

### Phase 6: Final Polish & Optimization
* **Goal:** Glitch effects, responsiveness tuning, and production builds.
* **Key Tasks:**
  * Implement subtle, rare visual micro-events (shooting stars, system scanline glitch).
  * Optimize bundle size and asset loading.
  * Audit performance score (Target: >90 Web Vitals performance score).
* **Verification Gate:**
  - [ ] Clean build generated using `npm run build`.
  - [ ] Verifies correctly on local preview.

---

## 2. Daily Log & Developer Notes

### [2026-07-01] - Setup & Alignment
* **Activities:**
  * Aligned on the "Cyber-Zen" (Biophilic Cyberpunk Red) concept based on `image copy 2.png`.
  * Verified current Vite + React + TS stack setup.
  * Decided on client-side keyword search chatbot instead of direct API to prevent client-side key leaks.
  * Created this `timeline.md` file.
* **Notes:**
  * Phase 1 is ready to begin. The next step is writing the formal PRD to detail the layout and variables.
