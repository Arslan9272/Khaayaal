import { useEffect, useState } from "react";
import { PhoneFrame } from "./phone-frame";
import {
  ScreenHero,
  ScreenBook,
  ScreenTrack,
  ScreenReport,
  ScreenCircle,
  ScreenMeds,
} from "./phone-screens";

const SCREENS = [
  { key: "home", label: "Home", node: <InnerHero /> },
  { key: "book", label: "Book", node: <ScreenBook /> },
  { key: "track", label: "Track", node: <ScreenTrack /> },
  { key: "meds", label: "Meds", node: <ScreenMeds /> },
  { key: "report", label: "Report", node: <ScreenReport /> },
  { key: "circle", label: "Circle", node: <ScreenCircle /> },
];

/* We inline a stripped ScreenHero body so we can render it *inside* the cycler's PhoneFrame */
function InnerHero() {
  // Reuse the existing ScreenHero (it wraps its own PhoneFrame). We render its inner content
  // by using ScreenHero directly is not possible (double frame). Instead, replicate the essentials.
  return (
    <div className="flex h-full flex-col bg-cream">
      <div className="flex items-center justify-between px-6 pt-8 pb-2">
        <span className="font-mono text-[10px] font-semibold text-ink">9:41</span>
        <div className="flex items-center gap-1">
          <div className="h-2 w-4 rounded-sm bg-ink/70" />
          <div className="h-2 w-4 rounded-sm bg-ink/40" />
        </div>
      </div>
      <div className="px-5 pt-2 pb-3">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-muted">
          Ammi & Abbu
        </p>
        <div className="mt-1 flex items-center gap-2">
          <h3 className="font-display font-semibold tracking-tight text-2xl text-ink">
            Live in Lahore
          </h3>
          <div className="flex items-center gap-1 rounded-full bg-mint/50 px-2 py-0.5">
            <div className="size-1.5 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-[9px] font-semibold text-emerald-800">SAFE</span>
          </div>
        </div>
      </div>
      <div className="relative mx-4 flex-1 overflow-hidden rounded-2xl bg-lavender-soft">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, oklch(0.55 0.18 295 / 0.1) 1px, transparent 1px)",
            backgroundSize: "14px 14px",
          }}
        />
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
          <path
            d="M 30 170 Q 80 130 100 90 T 170 30"
            stroke="oklch(0.55 0.18 295)"
            strokeWidth="2.5"
            strokeDasharray="5 4"
            fill="none"
          />
        </svg>
        <div className="absolute right-6 top-6 grid size-8 place-items-center rounded-lg bg-white shadow-md">
          <div className="size-2.5 rounded-sm bg-ink" />
        </div>
      </div>
      <div className="p-4">
        <div className="rounded-2xl mj-lav-gradient p-3 text-white">
          <p className="text-[10px] font-mono opacity-70">Next visit</p>
          <p className="text-xs font-bold">Zoya · in 6 min</p>
        </div>
      </div>
    </div>
  );
}

export function HeroPhoneCycle() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % SCREENS.length), 3200);
    return () => clearInterval(t);
  }, [paused]);

  // Suppress unused warning — ScreenHero imported for parity but not used here.
  void ScreenHero;

  return (
    <div
      className="flex flex-col items-center gap-5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <PhoneFrame size="lg">
        <div className="relative h-full w-full">
          {SCREENS.map((s, idx) => (
            <div
              key={s.key}
              className="absolute inset-0 transition-all duration-700 ease-out"
              style={{
                opacity: idx === i ? 1 : 0,
                transform:
                  idx === i
                    ? "translateY(0) scale(1)"
                    : idx < i
                      ? "translateY(-8px) scale(0.98)"
                      : "translateY(8px) scale(0.98)",
                pointerEvents: idx === i ? "auto" : "none",
              }}
            >
              {s.node}
            </div>
          ))}
        </div>
      </PhoneFrame>

      {/* Dots + labels */}
      <div className="flex items-center gap-2">
        {SCREENS.map((s, idx) => (
          <button
            key={s.key}
            onClick={() => setI(idx)}
            className="group flex items-center gap-1.5 rounded-full px-2 py-1"
            aria-label={`Show ${s.label}`}
          >
            <span
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === i ? "w-8 bg-lavender-deep" : "w-1.5 bg-ink/20 group-hover:bg-ink/40"
              }`}
            />
            <span
              className={`font-mono text-[10px] uppercase tracking-wider transition-colors ${
                idx === i ? "text-lavender-deep font-bold" : "text-ink-muted"
              }`}
            >
              {s.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
