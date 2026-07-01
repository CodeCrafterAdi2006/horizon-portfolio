# Product Requirements Document (PRD): Eragon OS (Cyber-Zen Portfolio)

This document defines the requirements, tech stack, design specifications, and architecture for the complete overhaul of Aditya's portfolio website.

---

## 1. Objective
Build an immersive, highly interactive "Sci-Fi Cyberpunk meets Serene Nature" portfolio website modeled after a futuristic operating system (Eragon OS). The site should showcase Aditya's skills in AI, automation, and software engineering in a highly memorable, cinematic format.

---

## 2. Tech Stack & Dependencies
* **Core Framework:** React 19.2.6
* **Build Tool:** Vite 6.4.2
* **Language:** TypeScript 5.8.2
* **Styling:** Tailwind CSS v4.3.0 & Custom CSS
* **Animations:** Framer Motion (Motion) 12.38.0
* **Scrolling:** Lenis 1.3.23 (Smooth scrolling wrapper)
* **Icons:** Lucide React 0.546.0

---

## 3. Commands
* **Development Server:** `npm run dev` (Starts development server on port 3000)
* **Production Build:** `npm run build` (Compiles TS and bundles via Vite)
* **Preview Production:** `npm run preview` (Locally serves the built `dist` folder)
* **Type Check:** `npm run lint` (Checks TypeScript compilation without emitting files)

---

## 4. Design System Specifications (HSL Color Palette)

To achieve the "Cyber-Zen Red" theme of **Image 3**, we will define these exact tokens in `index.css`:

```css
@theme {
  /* Color Tokens */
  --color-bg-base: #030303;                  /* Ultra-dark black */
  --color-accent-primary: #FF2B56;           /* Cyber Neon Red (HSL: 348, 100%, 58%) */
  --color-accent-secondary: #FF66A3;         /* Cyber Pink (HSL: 337, 100%, 70%) */
  --color-text-main: #E2E8F0;                 /* Slate-200 */
  --color-text-dimmed: #94A3B8;               /* Slate-400 */
  --color-text-muted: #475569;                /* Slate-600 */
  
  /* Fonts */
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Outfit", sans-serif;
  --font-serif: "Playfair Display", serif;
}
```

### UI Glassmorphic Specs:
* **Background Blur:** `backdrop-filter: blur(16px); background: rgba(3, 3, 3, 0.65);`
* **Thin Panel Border:** `1px solid rgba(255, 43, 86, 0.15)` (A very subtle red neon outline)
* **Glow Effects:** `box-shadow: 0 0 15px rgba(255, 43, 86, 0.1);`

---

## 5. Project Directory Structure
All development will live inside the `/src` folder:
```
src/
├── assets/             # Images, static sound files (click.mp3, synth.mp3)
├── components/
│   ├── LayoutGrid.tsx  # Holds the core 3-column responsive HUD layout
│   ├── Navigation.tsx  # Left-hand vertical cyber sidebar navigation
│   ├── CanvasBG.tsx     # Canvas particle system (falling petals, interactive stars)
│   ├── Terminal.tsx     # Console log system printing boot processes & CLI inputs
│   ├── Diagnostics.tsx  # Right-hand dials for CPU, RAM, and Latency rings
│   ├── AIWidget.tsx    # Right-hand keyword chatbot interface
│   ├── MusicPlayer.tsx  # Bottom audio controller and spectrum waveform
│   └── ProfileCard.tsx  # Circular avatar glass capsule inside About Me
├── index.css           # Global Tailwind imports & theme tokens
├── main.tsx            # Application mounting file
└── App.tsx             # Page assembler incorporating loading hooks
```

---

## 6. Code Style & Conventions
* **Components:** Functional React components using `export default function Component() {}`.
* **State Hook Usage:** Keep state local whenever possible. Use simple props for layout switches.
* **Framer Motion Rules:** Use `initial`, `animate`, and `exit` values cleanly. Keep transitions short (`duration: 0.3` to `0.5`) to preserve high-performance feel.
* **Responsive Styling:** Tailwind mobile-first responsive utilities (`md:`, `lg:`).

---

## 7. Boundaries & Rules
* **Always:** Verify performance on scroll. Keep the Framer Motion layers optimized to run at stable 60 FPS.
* **Ask First:** Adding external UI libraries (like shadcn/ui or Three.js) since we want to keep the bundle size small and load time fast.
* **Never:** Put plain text credentials or hardcoded sensitive environment variables in client-side code.

---

## 8. Success Criteria (Definition of Done)
1. **Performance:** App runs at stable 55-60 FPS during scrolling on desktop.
2. **Responsive:** HUD elements cleanly rearrange or switch to collapsible tabs on viewport widths `< 768px`.
3. **Interactive Terminal:**
   * Entering `help` prints lists of working commands.
   * Entering `sudo hire eragon` reveals a stylized confirmation prompt.
4. **Dynamic Canvas:** Cherry blossom petals react to mouse cursor offsets when moving over the screen.
5. **Interactive Music:** User can toggle background sound loop (starts muted), triggering the audio spectrum indicator.
6. **AI chatbot:** Inputting custom questions searches local data matching keyword arrays and returns formatted outputs.
