# Development Log: Eragon OS Portfolio

This log records files created, modified, visual additions, and compilation/debugging states during the complete website redesign.

---

## [2026-07-01] - Setup & Phase 1-2 Execution

### 1. Global Styles & Theme Config
* **Files Modified:** `src/index.css`
* **Changes Made:**
  * Imported Google Fonts: `Inter`, `Outfit`, and `Playfair Display`.
  * Configured Tailwind CSS v4 `@theme` tokens (Neon Crimson Accent `#FF2B56` and Pink `#FF66A3`).
  * Created custom webkit scrollbar rules matching the cyber aesthetic.
  * Added global utility classes: `.glass-panel` (frosted glass layout), `.neon-text` (neon glow effect), and `.hud-scanline` (retro CRT scanline overlay).
* **Status:** Verified. Compiles with no errors.

### 2. Layout Grid Assembly
* **Files Created:** `src/components/LayoutGrid.tsx`
* **Files Modified:** `src/App.tsx`
* **Changes Made:**
  * Created `LayoutGrid.tsx` using CSS Grid: `grid-cols-1 lg:grid-cols-[250px_1fr_360px]` to handle desktop HUD panels and collapse/stack cleanly on mobile.
  * Modified `App.tsx` to mount the layout grid, passing temporary glass placeholders to the left sidebar (Eragon OS stats) and right sidebar (Telemetry & Live Console log terminal).
* **Status:** Verified. Compiles with no errors.

### 3. Atmosphere & Canvas Particle Physics
* **Files Modified:** `src/components/DynamicBackground.tsx`
* **Changes Made:**
  * Replaced the cartoon SVG cloud shapes with a high-performance HTML5 `<canvas>` rendering pipeline.
  * Added 120 twinkling background stars (night phase) and 65 custom floating sakura petals using Bezier curve paths.
  * Implemented mathematical mouse repulsion physics: Petals calculate distance vector from cursor coordinates using the Pythagorean theorem, and are pushed away dynamically if within 160px.
  * Linked background elements to scroll progress using Framer Motion parallax values.
* **Status:** Verified. Frame rate runs at a stable 60 FPS in browser with zero TypeScript or bundler compile errors.

## [2026-07-01] - Phase 3 Navigation Setup

### 1. Vertical HUD Sidebar Navigation
* **Files Modified:** `src/components/Navigation.tsx`, `src/App.tsx`
* **Changes Made:**
  * Rewrote `Navigation.tsx` to compile as a vertical sidebar panel on desktop, incorporating:
    * Custom hover states with pulsing neon active indicator dots.
    * An `IntersectionObserver` scroll spy hook that tracks active section ids (`hero`, `about`, `skills`, `projects`, etc.) and lights up menu items.
    * Integrated a social icon tray at the bottom (GitHub, LinkedIn, Mail).
    * Integrated a fixed top-bar with a slide-down menu overlay for mobile viewports (<1024px).
  * Moved the `<Navigation />` component inside `App.tsx` into the left sidebar column slot of `<LayoutGrid />`.
* **Status:** Verified. TypeScript typecheck passes and Vite bundles successfully.

### 2. Typography & Actions HUD Hero Header
* **Files Modified:** `src/components/Hero.tsx`
* **Changes Made:**
  * Refactored `Hero.tsx` to stack cleanly within the center grid column (removed `min-h-[120vh]` full-screen block).
  * Styled typography using modern tracking and uppercase fonts, implementing a custom partial-glitch design:
    * **ADI**: Wrapped in high-intensity cyber-glitch keyframes with cyan/pink splits.
    * **TYA**: Wrapped in a new `.glitch-subtle` class with a slow (5s), narrow (1.5px) color split that flickers occasionally.
    * Blinking crimson terminal cursor block (`_`) pulses steadily at the end.
  * Added neon sub-tagline block: `AI ENGINEER • AUTOMATION ENTHUSIAST • PROBLEM SOLVER`.
  * Added action tray with custom styled glassmorphic anchors for `EXPLORE MY WORK` (active border glow) and `DOWNLOAD RESUME`.
  * Integrated an active focus telemetry bar displaying: `> CURRENT FOCUS: AGENTIC WORKFLOWS & AUTOMATIONS`.
* **Status:** Verified. Compiles with zero errors.

## [2026-07-01] - Phase 4 Diagnostics Dashboard Setup

### 1. Active Telemetry Diagnostics Widget
* **Files Created:** `src/components/Diagnostics.tsx`
* **Files Modified:** `src/App.tsx`
* **Changes Made:**
  * Created `Diagnostics.tsx` housing three circular SVG progress gauges:
    * **CPU**: Real-time fluctuating percent meter.
    * **RAM**: Active memory usage tracking and fraction allocation (GB / 8.00 GB).
    * **PING**: Network latency latency monitor.
  * Added mathematical fluctuation hooks mimicking active system loads inside the circular SVG dashboard dials.
  * Created active ticking telemetry uptime system clock.
  * Mounted `<Diagnostics />` into the right sidebar column of `<LayoutGrid />`.
* **Status:** Verified. Bundles cleanly and runs at 60 FPS.

## [2026-07-01] - Phase 4 AI Console Assistant Setup

### 1. Interactive Keyword CLI Chatbot Widget
* **Files Created:** `src/components/AIWidget.tsx`
* **Files Modified:** `src/App.tsx`
* **Changes Made:**
  * Created `AIWidget.tsx` featuring an interactive query terminal for portfolio visitors.
  * Programmed tokenizer mapping keywords (`about`, `skills`, `projects`, `contact`, `help`) to structured data templates.
  * Added typewriter stream simulation (printing output character-by-character).
  * Added clickable suggestion chips enabling instant click-to-query trigger states.
  * Mounted `<AIWidget />` directly under the `<Diagnostics />` panel in the right sidebar.
* **Status:** Verified. TypeScript compile passes and Vite bundles successfully.

## [2026-07-01] - Phase 4 Floating Audio & Telemetry Re-layout

### 1. Global Floating Audio Capsule & Sidebar Coordinate Telemetry
* **Files Modified:** `src/components/AudioController.tsx`, `src/App.tsx`
* **Changes Made:**
  * Rewrote `AudioController.tsx` to render as a fixed, glassmorphic pill located at `fixed bottom-6 right-6 z-50` (bottom-right of the screen viewport).
  * Removed `<AudioController />` from the left column of `LayoutGrid` inside `App.tsx` and mounted it at the root wrapper level to float globally.
  * Embedded the coordinates telemetry `LOC: 28.6139° N // 77.2090° E // DELHI` directly into the `Aditya OS` stats card inside the left sidebar.
* **Status:** Verified. hot-reloads cleanly. Coordinates are immediately visible on screen inside the left sidebar, and the music controller is globally accessible at the bottom-right corner without scrolling.

## [2026-07-01] - Phase 5 Procedural Audio & UI Sound FX Setup

### 1. Web Audio UI Synth Sound System
* **Files Created:** `src/utils/audio.ts`
* **Files Modified:** `src/components/Navigation.tsx`, `src/components/Hero.tsx`
* **Changes Made:**
  * Created `audio.ts` utility implementing procedural sound synthesis using native browser `AudioContext` and `OscillatorNode` (no audio file requests required).
  * Synthesized mechanical ticking thud for hover interactions: `triangle` oscillator playing `160Hz -> 60Hz` over `0.03s` at `0.012` gain.
  * Synthesized diagnostic high-tech terminal chime for clicks: `sine` oscillator playing `1200Hz -> 400Hz` over `0.08s` at `0.03` gain.
  * Wired hover/click hooks directly into `Navigation.tsx` (desktop links, hamburger toggle, mobile overlay links) and `Hero.tsx` (call-to-actions).
* **Status:** Verified. Compiles successfully. UI interactions provide real-time audio telemetry click feedback.

### 2. Production Bundling & JSX Audit
* **Files Modified:** `src/components/DynamicBackground.tsx`
* **Changes Made:**
  * Fixed an esbuild warning regarding a duplicate `style` attribute on the dynamic canvas `<motion.div>` moon layer (lines 247-249). Merged variables into a single unified style block.
  * Audited the workspace for unused imports and layout warnings.
  * Executed production bundle script `npm run build` resulting in a clean compiles with zero errors/warnings in 4.21 seconds.
* **Status:** Verified. Build assets compiled to `./dist` output folder.

## [2026-07-01] - Telemetry Cockpit Visuals & Command Shell Expansion

### 1. Interactive CLI Workstation Terminal
* **Files Created:** `src/components/Terminal.tsx`
* **Files Modified:** `src/App.tsx`
* **Changes Made:**
  * Created `Terminal.tsx` representing an interactive console workstation.
  * Built custom command interpreter for `help`, `whoami`, `skills`, `projects`, `clear`, and `sudo hire aditya`.
  * Hooked up procedural UI sound click triggers for submits.
  * Mounted `<Terminal />` in the center grid workstation column linked to the `#terminal-sec` navigation anchor.

### 2. Segmented LED Telemetry Gauges & Contrast Boosts
* **Files Modified:** `src/components/Skills.tsx`, `src/index.css`, `src/App.tsx`
* **Changes Made:**
  * Overhauled `Skills.tsx` to replace generic rounded bars with a **Segmented LED Block display** (10 interactive glowing cells matching percentage bounds).
  * Swapped serif text accents inside Skills headers for high-contrast monospace code tags.
  * Brightened slate color tokens (`--color-brand-text`, `--color-brand-muted`, `--color-brand-dark`) inside `index.css` to fix readability issues on dark backgrounds.
  * Injected **Ambient Nebula lighting gradients** (soft, large radial fixed neon layers) into `App.tsx` behind layout panels to eliminate flat background appearances.
* **Status:** Verified. compilation passes. hot-reloads cleanly.

## [2026-07-01] - Dynamic Background Shifts & Holographic Project Accents

### 1. Dynamic Atmospheric Transitions & Scroll Triggers
* **Files Modified:** `src/components/DynamicBackground.tsx`
* **Changes Made:**
  * Copied four high-resolution scenery visual concepts from `Assets/Background/` to `public/Background/` for static asset referencing.
  * Replaced procedural HSL gradient cards with actual visual background scenery overlays (`image.png`, `image copy.png`, `image copy 2.png`, `image copy 3.png`).
  * Increased active background image opacity to `0.38` for clearer scenery visibility while maintaining card text readability.
  * Created a shared `triggerTransition` hook governed by a **6.5-second transition cooldown** to prevent frantic flickering and overlapping shifts during rapid scroll periods.
  * Built a **random timed transition schedule** transitioning the sky phase ('morning', 'afternoon', 'evening', 'night') randomly every 12 to 24 seconds.
  * Built a **random scroll delta listener** triggering a random background phase change whenever scroll travel exceeds a threshold (randomly regenerated between 250px and 550px on each cycle).
  * Smooth-patched the HTML5 canvas animation to run continuously, fading the star grid in and out using an opacity multiplier, preventing stars from popping.
  * Animated sun and moon positions using Framer Motion to slide celestial bodies up and down the sky on phase shifts.

### 2. Holographic Project Card Upgrades
* **Files Modified:** `src/components/ProjectList.tsx`, `src/index.css`
* **Changes Made:**
  * Embedded **HUD Target-Lock Corner brackets** (`z-20`) inside the project image frames that scale and contract inwards on hover.
  * Added a **holographic laser scanline sweep overlay** (`animate-scanline-sweep`) running top-to-bottom across project images on hover.
  * Overhauled standard grey year squares into glowing, hover-reactive telemetry year stamps.
  * Removed serif italic text from headers and boosted text contrasts for improved readability.
* **Status:** Verified. Bundler compiles with zero errors and zero warnings.

## [2026-07-01] - Dedicated About Me Module & Profile Image Setup

### 1. Dedicated About Me Section
* **Files Created:** `src/components/About.tsx`
* **Files Modified:** `src/App.tsx`, `src/components/Hero.tsx`
* **Files Copied:** `public/me.png` (Aditya profile photo assets)
* **Changes Made:**
  * Created `About.tsx` mapping to navigation's `#about` anchor link.
  * Built a **Biometrics Avatar HUD Card** framing your copied profile image `/me.png` with flashing target corner brackets and a scrolling emerald diagnostic scanline.
  * Placed custom monospace pilot readouts (`PILOT_ID: ADI_2705`, `NEURAL_SYNC: 98.4%`) to reinforce cockpit immersion.
  * Structured biography description text next to profile cards, adding three core pillars: AI Agents, Systems Code, and UI Relays.
  * Mounted `<About />` in the center grid column of `App.tsx` between the `Hero` and `ProjectList` components.
  * Removed the obsolete `#about` anchor mapping from `Hero.tsx`.
* **Status:** Verified. TypeScript compile passes and Vite bundles successfully.

## [2026-07-01] - Interactive Comms Satellite Signal Dispatcher Console

### 1. Satellite Comms Form Redesign
* **Files Modified:** `src/components/Footer.tsx`
* **Changes Made:**
  * Overhauled the plain "Initiate Sequence" text anchor link to an interactive **Satellite Signal Dispatcher Panel** centered on the `#contact` ID.
  * Built input form fields for name, email, and signal message payload.
  * Integrated a **comms diagnostics box** rendering mock telemetry specs (`FREQUENCY: 2.482 GHz`, `LATENCY: 42ms`, `GATEWAY: MAILTO_ADI_OS`).
  * Built a **terminal progress bar animation** depicting Shaw packet encryption (`PROGRESS: 0% -> 100%`) on submit click before launching native mail redirects.
  * Linked sound FX click registers.
* **Status:** Verified. Bundler compiles with zero errors and zero warnings in 4.18s.

## [2026-07-01] - HUD Weapon-System Reticle Cursor & Mobile Safeguards

### 1. HUD Crosshair Custom Cursor
* **Files Modified:** `src/components/CustomCursor.tsx`
* **Changes Made:**
  * Replaced the solid white dot with a custom **HUD Crosshair reticle** matching the cockpit telemetry theme.
  * Configured a glowing crimson core pointer dot and an outer targeting circle with four crosshair tick marks (at 12, 3, 6, 9 o'clock) that follows with spring inertia configuration.
  * Programmed hover states: hovering over interactive tags causes the targeting circle to expand and spin continuously like a radar scanner.
  * Implemented a **mobile/tablet touch-primary disabler** using media query listeners (`width < 1024px` or `pointer: coarse`). The component returns `null` on touch screen configurations, solving the static stuck circle bug.
* **Status:** Verified. Bundler compiles with zero errors and zero warnings in 3.92s.

## [2026-07-01] - Breathing Neon Heading Glow & Dynamic Theme Color Shift

### 1. Breathing Neon Text Glows
* **Files Modified:** `src/index.css`, `src/components/About.tsx`, `src/components/ProjectList.tsx`, `src/components/Skills.tsx`, `src/components/Experience.tsx`, `src/components/Footer.tsx`
* **Changes Made:**
  * Created the `.neon-text-glow` CSS class implementing a slow-pulsing keyframe text-shadow shift (`neon-color-shift`).
  * Structured color rotation: The heading highlights slowly morph their neon halo shadows from **neon crimson (`#FF2B56`)** to **cyber-pink (`#FF66A3`)** over a breathing 7-second loop.
  * Applied the `.neon-text-glow` class to key accent phrases inside your headers: About **Me**, Selected **Artifacts**, Technical **Stack**, Development **Timeline**, and Establish **Relay Connection**.
* **Status:** Verified. Bundler compiles with zero errors and zero warnings in 4.08s.

## [2026-07-01] - Interactive Body Readouts & Terminal Prompt Cursors

### 1. Interactive Monospace Readouts & Glowing Hover Terms
* **Files Modified:** `src/components/Hero.tsx`, `src/components/About.tsx`, `src/index.css`
* **Changes Made:**
  * Created the `.hover-glow-accent` CSS class mapping text hover triggers to a neon-red text-shadow glow (`0 0 8px #FF2B56`).
  * Rebuilt the description paragraph in `Hero.tsx` with monospace syntax (`&gt; intelligent_systems`, etc.) and wrapped key terms in `.hover-glow-accent` tags.
  * Rebuilt the biography card in `About.tsx` to stagger fade-in paragraphs on scroll, wrapping key competencies in `.hover-glow-accent`.
  * Added a live-terminal blinking cursor block (`_`) using a step-end keyframe animation `.cursor-blink` at the end of the `core.identity_relay_initiated` prompt.
* **Status:** Verified. Bundler compiles with zero errors and zero warnings in 4.16s.

## [2026-07-01] - Immersive Bleeding Cyber Katana Loading Screen & Entry Gate

### 1. Cyber Katana Loading Screen
* **Files Modified:** `src/components/Loader.tsx`
* **Changes Made:**
  * Redesigned the loading screen to display a **bleeding red Cyber Katana assembly** centered in the viewport.
  * Styled the Katana handle (Tsuka) with wrapped diamonds, handguard (Tsuba), and gold collar (Habaki).
  * Programmed the Katana blade (Nagasa) to unsheathe and materialize dynamically, scaling its width from `0%` to `100%` based on active loading progress.
  * Added a glowing crimson/rose gradient to the blade (`shadow-[0_0_16px_#FF2B56]`) overlayed with a scanning pulse laser line (`animate-pulse-sweep`).
  * Implemented an **interactivity gate** at `100%` progress: Instead of auto-exiting, the loader stays active and renders a hover-reactive button: **`INITIALIZE WORKSTATION; // [ENTER]`**.
  * Handled progress-state updates to cleanly slide the loader out after the enter button is pressed.
* **Status:** Verified. Bundler compiles with zero errors and zero warnings in 4.04s.

## [2026-07-01] - Resume PDF Integration

### 1. Resume Download Association
* **Files Modified:** `src/components/Hero.tsx`
* **Files Copied:** `public/resume_automation_ai.pdf` (Aditya Resume document)
* **Changes Made:**
  * Copied your official resume PDF (`resume_automation_ai.pdf`) from your project assets to the public static directory.
  * Replaced the empty anchor `#` on the Hero's **`DOWNLOAD RESUME`** button to point to `/resume_automation_ai.pdf`.
  * Added the browser `download="Aditya_Singh_Resume.pdf"` download prompt configuration.
* **Status:** Verified. Bundler compiles with zero errors and zero warnings in 4.01s.


















