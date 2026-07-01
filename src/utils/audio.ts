/**
 * Procedural UI Synth Sounds Generator
 * Uses the Web Audio API to synthesize terminal click and hover sounds in real time.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
}

export function playUiSound(type: "click" | "hover") {
  try {
    const ctx = getAudioContext();
    
    // If the browser hasn't allowed audio yet (needs user interaction)
    if (ctx.state === "suspended") {
      if (type === "click") {
        ctx.resume();
      } else {
        // Skip hover sound if context is suspended to avoid spamming console warning triggers
        return;
      }
    }

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === "click") {
      // Sci-fi high-pitched quick terminal click chime
      osc.type = "sine";
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.08);

      gainNode.gain.setValueAtTime(0.03, now); // Very low, comfortable volume
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === "hover") {
      // Soft, low-frequency mechanical key tick
      osc.type = "triangle";
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.03);

      gainNode.gain.setValueAtTime(0.012, now); // Extremely subtle background thud
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

      osc.start(now);
      osc.stop(now + 0.03);
    }
  } catch (e) {
    // Web audio API failed or not supported in this browser environment
    console.warn("Telemetry Sound Relay inactive: Web Audio API suspended.", e);
  }
}
