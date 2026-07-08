import { useEffect, useState } from "react";
import { Pill, Package, Bike, HeartPulse, Stethoscope, Clock, Home, Smile } from "lucide-react";

/**
 * MedicineDelivery - a comic-book story of the WHOLE service, not just delivery.
 * A continuous emotional arc: son abroad worries → medicine ordered → packed →
 * rider delivers → nurse feeds Ammi → hospital escort → nurse waits in the long
 * queue so family doesn't have to → Ammi rests happy with nurse → son abroad
 * sees the photo proof and finally exhales.
 */

const BEATS = [
  { key: "order",    label: "You order",       icon: Pill,         hint: "Tap from London - 4am worries eased." },
  { key: "pack",     label: "Pharmacy packs",  icon: Package,      hint: "Verified pharmacy in Lahore seals it." },
  { key: "ride",     label: "Rider en route",  icon: Bike,         hint: "Live GPS across the city." },
  { key: "feed",     label: "Nurse feeds Ammi",icon: HeartPulse,   hint: "Medicine given, meal warmed, dua whispered." },
  { key: "hospital", label: "Hospital escort", icon: Stethoscope,  hint: "Doctor's appointment - nurse holds her hand." },
  { key: "queue",    label: "Waiting in line", icon: Clock,        hint: "Two hours in the utility queue - you don't." },
  { key: "resting",  label: "Ammi at ease",    icon: Home,         hint: "Home safe. Nurse at her bedside." },
  { key: "proof",    label: "You exhale",      icon: Smile,        hint: "Photo proof lands. Tears. Relief." },
] as const;

export function MedicineDelivery({ compact = false }: { compact?: boolean }) {
  const [beat, setBeat] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setBeat((b) => (b + 1) % BEATS.length), 3400);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section
      className={`relative overflow-hidden bg-gradient-to-b from-lavender-soft/50 via-cream to-cream ${
        compact ? "py-16" : "py-24 md:py-32"
      }`}
    >
      <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-peach/25 blur-3xl" />
      <div className="absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-lavender/25 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        {!compact && (
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-lavender-deep">
              A day in Ammi's care
            </span>
            <h2 className="mt-4 text-balance text-3xl font-extrabold leading-tight md:text-5xl">
              Not one delivery. A whole{" "}
              <span className="font-display font-semibold tracking-tight text-lavender-deep">
                day's worth of small, loving acts.
              </span>
            </h2>
            <p className="mt-5 text-base text-ink-muted leading-relaxed">
              Follow the story - from your 4am worry in London, through the pharmacy
              and the rider, into Ammi's room with her nurse, the hospital escort,
              the long utility queue you never had to stand in, and the photograph
              that finally lets you breathe.
            </p>
          </div>
        )}

        <div
          className={`mx-auto overflow-hidden rounded-[2rem] border border-hairline bg-white shadow-2xl shadow-lavender/10 ${
            compact ? "mt-0 max-w-3xl" : "mt-14"
          }`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Panel stage */}
          <div className="relative h-[340px] w-full md:h-[400px]">
            {/* Comic-panel border pattern */}
            <div className="absolute inset-0 mj-noise opacity-40" />

            {BEATS.map((b, idx) => {
              const active = idx === beat;
              return (
                <div
                  key={b.key}
                  className="absolute inset-0"
                  style={{
                    opacity: active ? 1 : 0,
                    transform: active ? "scale(1)" : "scale(0.97)",
                    transition: "opacity 500ms ease, transform 700ms cubic-bezier(0.22,1,0.36,1)",
                    pointerEvents: active ? "auto" : "none",
                  }}
                >
                  {active && <Panel which={b.key} />}
                </div>
              );
            })}

            {/* Panel counter */}
            <div className="absolute top-4 left-4 rounded-full bg-ink/85 px-3 py-1 font-mono text-[10px] font-bold text-cream shadow-lg">
              Chapter {String(beat + 1).padStart(2, "0")} / {String(BEATS.length).padStart(2, "0")}
            </div>
          </div>

          {/* Beat labels strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 border-t border-hairline">
            {BEATS.map((b, idx) => {
              const Icon = b.icon;
              const active = idx === beat;
              const done = idx < beat;
              const isLastInRow2 = (idx + 1) % 2 === 0;
              const isLastInRow4 = (idx + 1) % 4 === 0;
              return (
                <button
                  key={b.key}
                  onClick={() => setBeat(idx)}
                  className={`group relative flex flex-col items-start gap-1.5 p-2.5 text-left transition-colors md:p-3 ${
                    active ? "bg-lavender-soft/60" : "hover:bg-cream-warm"
                  } ${!isLastInRow2 ? "border-r border-hairline sm:border-r-0" : ""} ${
                    !isLastInRow4 ? "sm:border-r sm:border-hairline lg:border-r-0" : ""
                  } ${idx !== BEATS.length - 1 ? "lg:border-r lg:border-hairline" : ""} ${
                    idx < BEATS.length - 2 ? "border-b border-hairline sm:border-b-0" : ""
                  } ${idx < BEATS.length - 4 ? "sm:border-b sm:border-hairline lg:border-b-0" : ""}`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`grid size-6 place-items-center rounded-full transition-all ${
                        active
                          ? "bg-lavender-deep text-white scale-110"
                          : done
                            ? "bg-mint text-emerald-900"
                            : "bg-ink/5 text-ink-muted"
                      }`}
                    >
                      <Icon className="size-3" />
                    </span>
                    <span
                      className={`font-mono text-[9px] font-bold uppercase tracking-wider ${
                        active ? "text-lavender-deep" : "text-ink"
                      }`}
                    >
                      {String(idx + 1).padStart(2, "0")} · {b.label}
                    </span>
                  </div>
                  <p className="text-[10px] text-ink-muted leading-snug hidden lg:block">{b.hint}</p>
                  {active && (
                    <span
                      className="absolute bottom-0 left-0 h-0.5 bg-lavender-deep"
                      style={{ width: "100%", animation: "mj-beatbar 3.4s linear" }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes mj-beatbar { from { width: 0%; } to { width: 100%; } }
      `}</style>
    </section>
  );
}

/* ────────────── COMIC PANELS ────────────── */

function Panel({ which }: { which: (typeof BEATS)[number]["key"] }) {
  if (which === "order")    return <PanelOrder />;
  if (which === "pack")     return <PanelPack />;
  if (which === "ride")     return <PanelRide />;
  if (which === "feed")     return <PanelFeed />;
  if (which === "hospital") return <PanelHospital />;
  if (which === "queue")    return <PanelQueue />;
  if (which === "resting")  return <PanelResting />;
  return <PanelProof />;
}

/* Shared cartoon primitives */
const INK = "oklch(0.22 0.028 255)";
const LAV = "oklch(0.34 0.11 258)";
const PEACH = "oklch(0.68 0.145 38)";
const MINT_C = "oklch(0.5 0.14 165)";
const HAIR = "oklch(0.28 0.04 40)";
const PANTS = "oklch(0.32 0.04 260)";
const SHOE = "oklch(0.20 0.02 260)";

/**
 * CartoonPerson (exported as StickPerson for drop-in compatibility) -
 * a rounded, chibi-style character with filled body, shirt, pants, shoes.
 */
function StickPerson({
  x, y, scale = 1, skin = PEACH, shirt = LAV, pants = PANTS,
  armWave = false, elderly = false, hair = HAIR,
}: {
  x: number; y: number; scale?: number; skin?: string; shirt?: string; pants?: string;
  armWave?: boolean; elderly?: boolean; hair?: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {/* legs / pants */}
      <path d="M -7 -4 L -8 16 L -3 16 L -2 -2 Z" fill={pants} stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M 7 -4 L 8 16 L 3 16 L 2 -2 Z"    fill={pants} stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
      {/* shoes */}
      <ellipse cx="-5" cy="17" rx="5" ry="2.2" fill={SHOE} stroke={INK} strokeWidth="1.2" />
      <ellipse cx="5"  cy="17" rx="5" ry="2.2" fill={SHOE} stroke={INK} strokeWidth="1.2" />

      {/* torso / shirt - rounded */}
      <path d="M -10 -22 Q -11 -6 -8 -2 L 8 -2 Q 11 -6 10 -22 Q 6 -25 0 -25 Q -6 -25 -10 -22 Z"
            fill={shirt} stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M -4 -24 Q 0 -20 4 -24" fill="none" stroke={INK} strokeWidth="1.2" strokeLinecap="round" />

      {/* arms with sleeves */}
      <path d="M -10 -20 Q -16 -12 -13 -4" fill="none" stroke={shirt} strokeWidth="5" strokeLinecap="round" />
      <path d="M -10 -20 Q -16 -12 -13 -4" fill="none" stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="-13" cy="-3" r="2.2" fill={skin} stroke={INK} strokeWidth="1" />
      <g className={armWave ? "mj-wave-arm" : ""} style={{ transformOrigin: "10px -20px" }}>
        <path d="M 10 -20 Q 16 -12 13 -4" fill="none" stroke={shirt} strokeWidth="5" strokeLinecap="round" />
        <path d="M 10 -20 Q 16 -12 13 -4" fill="none" stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="13" cy="-3" r="2.2" fill={skin} stroke={INK} strokeWidth="1" />
      </g>

      {/* neck */}
      <rect x="-2.4" y="-27" width="4.8" height="4" fill={skin} stroke={INK} strokeWidth="1" />

      {/* head */}
      <ellipse cx="0" cy="-34" rx="9.5" ry="10.5" fill={skin} stroke={INK} strokeWidth="1.6" />
      {elderly ? (
        <path d="M -9 -40 Q 0 -46 9 -40 Q 10 -37 8 -36 Q 0 -39 -8 -36 Q -10 -37 -9 -40 Z"
              fill="oklch(0.92 0.01 60)" stroke={INK} strokeWidth="1.2" />
      ) : (
        <path d="M -9 -38 Q 0 -47 9 -38 Q 10 -34 7 -33 Q 0 -37 -7 -33 Q -10 -34 -9 -38 Z"
              fill={hair} stroke={INK} strokeWidth="1.2" />
      )}
      <ellipse cx="-3" cy="-33" rx="1.3" ry="1.5" fill={INK}
               className="[transform-box:fill-box] origin-center" style={{ animation: "mj-blink 4s infinite" }} />
      <ellipse cx="3"  cy="-33" rx="1.3" ry="1.5" fill={INK}
               className="[transform-box:fill-box] origin-center" style={{ animation: "mj-blink 4s infinite" }} />
      <circle cx="-5" cy="-30" r="1.6" fill={PEACH} opacity="0.5" />
      <circle cx="5"  cy="-30" r="1.6" fill={PEACH} opacity="0.5" />
      <path d="M -3 -29 Q 0 -26 3 -29" stroke={INK} strokeWidth="1.3" fill="none" strokeLinecap="round" />

      {elderly && (
        <path d="M 15 -4 L 17 16 M 17 -4 Q 21 -4 21 -6" stroke={INK} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      )}
    </g>
  );
}

/* ───── Panel 1: You order ───── */
function PanelOrder() {
  return (
    <div className="relative h-full w-full mj-panel">
      {/* room bg */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg, oklch(0.97 0.02 260) 0%, oklch(0.94 0.038 45 / 0.6) 100%)",
      }} />
      {/* window */}
      <div className="absolute top-6 left-6 w-40 h-24 rounded-lg bg-lavender-soft/70 border-2 border-ink/30">
        <div className="absolute inset-2 grid grid-cols-2 grid-rows-2 gap-1">
          <div className="bg-white/60" /><div className="bg-white/60" />
          <div className="bg-white/60" /><div className="bg-white/60" />
        </div>
        <span className="absolute -bottom-4 left-2 font-mono text-[8px] font-bold uppercase text-ink-muted">London · 09:41</span>
      </div>
      {/* plant */}
      <div className="absolute top-16 right-8">
        <div className="w-10 h-8 rounded-t-full bg-mint/70 mj-wiggle" />
        <div className="w-8 h-6 mx-auto rounded-b-md bg-peach/50" />
      </div>

      {/* Desk with laptop + person */}
      <svg viewBox="0 0 500 260" className="absolute bottom-0 left-0 h-[75%] w-full">
        {/* floor line */}
        <line x1="0" y1="220" x2="500" y2="220" stroke={INK} strokeWidth="1" opacity="0.15" />
        {/* desk */}
        <rect x="120" y="170" width="260" height="10" rx="2" fill="oklch(0.75 0.08 60)" stroke={INK} strokeWidth="1.4" />
        <line x1="140" y1="180" x2="140" y2="220" stroke={INK} strokeWidth="1.6" />
        <line x1="360" y1="180" x2="360" y2="220" stroke={INK} strokeWidth="1.6" />
        {/* laptop */}
        <g className="mj-cartoon-bob">
          <rect x="200" y="140" width="80" height="30" rx="3" fill="white" stroke={INK} strokeWidth="1.6" />
          <rect x="205" y="145" width="70" height="20" fill={LAV} />
          <text x="240" y="159" textAnchor="middle" fill="white" fontSize="9" fontFamily="monospace" fontWeight="700">Khaayaal</text>
          <rect x="196" y="168" width="88" height="4" rx="1" fill="oklch(0.85 0.02 260)" stroke={INK} strokeWidth="1.2" />
        </g>
        {/* coffee mug */}
        <g>
          <rect x="150" y="152" width="18" height="18" rx="2" fill={PEACH} stroke={INK} strokeWidth="1.4" />
          <path d="M 168 156 Q 176 158 176 164 Q 176 168 168 168" fill="none" stroke={INK} strokeWidth="1.4" />
          <path d="M 156 148 Q 156 144 159 144 M 162 148 Q 162 144 165 144" stroke={INK} strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6" />
        </g>
        {/* person on chair */}
        <StickPerson x={330} y={160} scale={1.4} skin={PEACH} shirt={LAV} />
        <rect x="308" y="180" width="40" height="6" fill={INK} opacity="0.7" />
        <line x1="316" y1="186" x2="316" y2="215" stroke={INK} strokeWidth="1.8" />
        <line x1="340" y1="186" x2="340" y2="215" stroke={INK} strokeWidth="1.8" />

        {/* Speech bubble */}
        <g className="mj-pop" style={{ animationDelay: "0.3s" }}>
          <path d="M 360 60 Q 360 40 380 40 L 470 40 Q 490 40 490 60 L 490 90 Q 490 110 470 110 L 400 110 L 380 122 L 388 110 L 380 110 Q 360 110 360 90 Z"
                fill="white" stroke={INK} strokeWidth="1.8" />
          <text x="425" y="72" textAnchor="middle" fill={INK} fontSize="11" fontWeight="800" fontFamily="system-ui">Ammi ki dawai</text>
          <text x="425" y="88" textAnchor="middle" fill={LAV} fontSize="10" fontWeight="700" fontFamily="system-ui">order karo!</text>
          <text x="425" y="103" textAnchor="middle" fill={PEACH} fontSize="14">💊</text>
        </g>
      </svg>

      <Caption text="Tap. From your couch in London." />
    </div>
  );
}

/* ───── Panel 2: Pharmacy packs ───── */
function PanelPack() {
  return (
    <div className="relative h-full w-full mj-panel">
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg, oklch(0.96 0.03 165 / 0.7) 0%, oklch(0.94 0.02 60) 100%)",
      }} />
      {/* Neon PHARMACY sign */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 rounded-lg bg-white px-4 py-1.5 shadow ring-2 ring-mint">
        <span className="font-display text-sm font-bold tracking-widest text-emerald-800">+ PHARMACY +</span>
      </div>

      <svg viewBox="0 0 500 320" className="absolute inset-0 h-full w-full">
        {/* shelves */}
        <g stroke={INK} strokeWidth="1.4" fill="oklch(0.98 0.01 60)">
          <rect x="20" y="80" width="130" height="70" />
          <rect x="20" y="150" width="130" height="70" />
        </g>
        {/* pill bottles on shelves */}
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(${30 + i * 30} 100)`}>
            <rect width="18" height="30" rx="2" fill={i % 2 ? PEACH : LAV} stroke={INK} strokeWidth="1.2" />
            <rect y="-4" width="18" height="6" rx="1" fill="white" stroke={INK} strokeWidth="1.2" />
          </g>
        ))}
        {[0, 1, 2, 3].map((i) => (
          <g key={`b${i}`} transform={`translate(${30 + i * 30} 170)`}>
            <rect width="18" height="30" rx="2" fill={i % 2 ? MINT_C : PEACH} stroke={INK} strokeWidth="1.2" />
            <rect y="-4" width="18" height="6" rx="1" fill="white" stroke={INK} strokeWidth="1.2" />
          </g>
        ))}
        {/* counter */}
        <rect x="200" y="220" width="270" height="12" fill="oklch(0.7 0.08 60)" stroke={INK} strokeWidth="1.4" />
        <rect x="200" y="232" width="270" height="40" fill="oklch(0.8 0.06 60)" stroke={INK} strokeWidth="1.4" />

        {/* pharmacist */}
        <g className="mj-cartoon-bob">
          <StickPerson x={250} y={200} scale={1.4} skin="oklch(0.75 0.09 40)" shirt={MINT_C} />
          {/* pharmacist coat: white overlay */}
          <path d="M 250 178 L 258 178 L 260 194 L 240 194 L 242 178 Z" fill="white" stroke={INK} strokeWidth="1.2" transform="translate(0 -1)"/>
        </g>

        {/* package being packed - bouncing in */}
        <g className="mj-pop" style={{ animationDelay: "0.2s", transformOrigin: "360px 200px" }}>
          <rect x="335" y="188" width="55" height="34" rx="3" fill={PEACH} stroke={INK} strokeWidth="1.8" />
          <line x1="335" y1="205" x2="390" y2="205" stroke={INK} strokeWidth="1.2" />
          <line x1="362" y1="188" x2="362" y2="222" stroke={INK} strokeWidth="1.2" />
          <text x="362" y="212" textAnchor="middle" fill={INK} fontSize="10" fontWeight="900" fontFamily="system-ui">RX</text>
        </g>

        {/* Sparkles */}
        {[[320, 160], [400, 170], [380, 145]].map(([x, y], i) => (
          <text key={i} x={x} y={y} fontSize="14" className="mj-pop" style={{ animationDelay: `${0.4 + i * 0.15}s` }}>✨</text>
        ))}
      </svg>

      <Caption text="Verified pharmacy packs & seals the box." />
    </div>
  );
}

/* ───── Panel 3: Rider zooms across ───── */
function PanelRide() {
  return (
    <div className="relative h-full w-full mj-panel overflow-hidden">
      {/* sky */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg, oklch(0.94 0.05 240) 0%, oklch(0.90 0.06 45 / 0.5) 55%, oklch(0.85 0.05 60) 100%)",
      }} />
      {/* clouds */}
      <div className="absolute top-6 left-[20%] h-8 w-24 rounded-full bg-white/85 blur-[1px] mj-tick" />
      <div className="absolute top-14 left-[60%] h-6 w-20 rounded-full bg-white/75 blur-[1px] mj-tick" style={{ animationDelay: "0.6s" }} />
      {/* sun */}
      <div className="absolute top-4 right-8 size-14 rounded-full bg-peach/80 blur-sm" />

      {/* skyline scroll */}
      <div className="absolute bottom-[40%] left-0 right-0 h-16 overflow-hidden">
        <div className="mj-tick flex gap-3 h-full items-end will-change-transform">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i}
              className="w-8 shrink-0"
              style={{
                height: `${30 + (i % 5) * 12}px`,
                background: "oklch(0.55 0.10 258 / 0.4)",
                borderRadius: "2px 2px 0 0",
              }}
            />
          ))}
        </div>
      </div>

      {/* road */}
      <div className="absolute bottom-0 left-0 right-0 h-[38%]" style={{
        background: "linear-gradient(180deg, oklch(0.86 0.06 165 / 0.5) 0%, oklch(0.86 0.06 165 / 0.5) 15%, oklch(0.32 0.02 260) 15%, oklch(0.28 0.02 260) 100%)",
      }} />
      {/* dashed lane */}
      <svg className="absolute left-0 right-0 w-full" style={{ bottom: "17%", height: "6px" }} viewBox="0 0 400 6" preserveAspectRatio="none">
        <line x1="0" y1="3" x2="400" y2="3" stroke="oklch(0.94 0.05 60)" strokeWidth="3" strokeDasharray="20 16"
              style={{ animation: "mj-dash 0.6s linear infinite" }} />
      </svg>

      {/* Rider on a bicycle - center stage, wheels spinning, legs pedaling */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[13%] mj-cartoon-bob-lg">
        <svg width="240" height="170" viewBox="0 0 240 170">
          {/* motion lines */}
          <g stroke={LAV} strokeWidth="2.5" strokeLinecap="round" opacity="0.7">
            <line x1="4"  y1="90"  x2="30" y2="90" />
            <line x1="0"  y1="110" x2="24" y2="110" />
            <line x1="8"  y1="70"  x2="28" y2="70" />
          </g>

          {/* package on rider's back */}
          <g>
            <rect x="70" y="40" width="30" height="24" rx="3" fill={PEACH} stroke={INK} strokeWidth="1.8" />
            <line x1="70" y1="52" x2="100" y2="52" stroke={INK} strokeWidth="1.2" />
            <line x1="85" y1="40" x2="85"  y2="64" stroke={INK} strokeWidth="1.2" />
            <text x="85" y="58" textAnchor="middle" fill={INK} fontSize="9" fontWeight="900" fontFamily="system-ui">RX</text>
          </g>

          {/* Bicycle frame (diamond) */}
          <line x1="122" y1="128" x2="70"  y2="138" stroke={LAV} strokeWidth="4" strokeLinecap="round" />
          <line x1="122" y1="128" x2="110" y2="90"  stroke={LAV} strokeWidth="4" strokeLinecap="round" />
          <line x1="110" y1="90"  x2="70"  y2="138" stroke={LAV} strokeWidth="4" strokeLinecap="round" />
          <line x1="110" y1="90"  x2="160" y2="90"  stroke={LAV} strokeWidth="4" strokeLinecap="round" />
          <line x1="122" y1="128" x2="160" y2="90"  stroke={LAV} strokeWidth="4" strokeLinecap="round" />
          <line x1="160" y1="90"  x2="175" y2="138" stroke={LAV} strokeWidth="4" strokeLinecap="round" />
          {/* stem + handlebar */}
          <line x1="160" y1="90"  x2="168" y2="74"  stroke={INK} strokeWidth="3" strokeLinecap="round" />
          <path d="M 156 74 Q 168 66 180 78" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* saddle */}
          <path d="M 100 88 L 120 88" stroke={INK} strokeWidth="4" strokeLinecap="round" />
          {/* headlight */}
          <circle cx="184" cy="80" r="4" fill="oklch(0.94 0.13 90)" stroke={INK} strokeWidth="1.2" />

          {/* Rear wheel */}
          <g>
            <circle cx="70" cy="138" r="22" fill="none" stroke={INK} strokeWidth="3" />
            <circle cx="70" cy="138" r="3"  fill={INK} />
            <line x1="48" y1="138" x2="92" y2="138" stroke={INK} strokeWidth="1.2" />
            <line x1="70" y1="116" x2="70" y2="160" stroke={INK} strokeWidth="1.2" />
            <line x1="55" y1="123" x2="85" y2="153" stroke={INK} strokeWidth="1.2" />
            <line x1="85" y1="123" x2="55" y2="153" stroke={INK} strokeWidth="1.2" />
            <animateTransform attributeName="transform" type="rotate" from="0 70 138" to="360 70 138" dur="0.55s" repeatCount="indefinite" />
          </g>
          {/* Front wheel */}
          <g>
            <circle cx="175" cy="138" r="22" fill="none" stroke={INK} strokeWidth="3" />
            <circle cx="175" cy="138" r="3"  fill={INK} />
            <line x1="153" y1="138" x2="197" y2="138" stroke={INK} strokeWidth="1.2" />
            <line x1="175" y1="116" x2="175" y2="160" stroke={INK} strokeWidth="1.2" />
            <line x1="160" y1="123" x2="190" y2="153" stroke={INK} strokeWidth="1.2" />
            <line x1="190" y1="123" x2="160" y2="153" stroke={INK} strokeWidth="1.2" />
            <animateTransform attributeName="transform" type="rotate" from="0 175 138" to="360 175 138" dur="0.55s" repeatCount="indefinite" />
          </g>

          {/* Crank + pedals rotating around (122,128). Shoes ride WITH the pedals
              so the foot orbits the crank naturally instead of the whole leg spinning. */}
          <circle cx="122" cy="128" r="4" fill={LAV} stroke={INK} strokeWidth="1.5" />
          <g>
            <line x1="122" y1="128" x2="122" y2="144" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
            <line x1="122" y1="128" x2="122" y2="112" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
            <rect x="117" y="142" width="10" height="4" rx="1" fill={INK} />
            <rect x="117" y="110" width="10" height="4" rx="1" fill={INK} />
            {/* shoes sit on the pedals and orbit with the crank */}
            <ellipse cx="122" cy="146" rx="6" ry="2.6" fill={SHOE} stroke={INK} strokeWidth="1.2" />
            <ellipse cx="122" cy="110" rx="6" ry="2.6" fill={SHOE} stroke={INK} strokeWidth="1.2" />
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 122 128"
              to="360 122 128"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </g>

          {/* Rider - filled body, leaning forward on the bike, face turned toward the front (right) */}
          <g>
            {/* Back leg - static bent path from hip to crank, small bob to fake pedaling */}
            <g>
              <path d="M 110 88 Q 104 112 122 132"
                    fill="none" stroke={PANTS} strokeWidth="7" strokeLinecap="round" />
              <path d="M 110 88 Q 104 112 122 132"
                    fill="none" stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
              <animateTransform attributeName="transform" type="translate"
                                values="0 0; 0 -2; 0 0; 0 2; 0 0"
                                dur="0.9s" repeatCount="indefinite" />
            </g>

            {/* Torso - jacket, leaning forward from hip (110,88) to shoulder (140,68) */}
            <path d="M 108 92 Q 104 78 132 62 Q 146 60 148 72 Q 146 82 132 86 Q 122 92 118 96 Z"
                  fill={LAV} stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M 118 74 Q 128 74 138 70" stroke={INK} strokeWidth="1" fill="none" opacity="0.5" />

            <path d="M 132 62 Q 122 68 118 82" stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.55" />

            {/* Head - positioned forward of the shoulder, facing right */}
            <g>
              {/* Neck attaching behind the head */}
              <path d="M 132 62 L 138 54" stroke={PEACH} strokeWidth="5" strokeLinecap="round" />
              <path d="M 132 62 L 138 54" stroke={INK} strokeWidth="1.2" strokeLinecap="round" />

              {/* Head base, facing right */}
              <ellipse cx="146" cy="48" rx="10" ry="11" fill={PEACH} stroke={INK} strokeWidth="1.6" />

              {/* Helmet - rounded toward the front/right */}
              <path d="M 136 46 Q 142 32 156 40 Q 158 44 156 48 Q 150 52 138 50 Q 134 50 136 46 Z"
                    fill={LAV} stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
              {/* Helmet vents */}
              <line x1="142" y1="40" x2="142" y2="46" stroke={INK} strokeWidth="1" opacity="0.6" />
              <line x1="146" y1="38" x2="146" y2="46" stroke={INK} strokeWidth="1" opacity="0.6" />
              <line x1="150" y1="40" x2="150" y2="46" stroke={INK} strokeWidth="1" opacity="0.6" />

              {/* Face features - looking right */}
              <ellipse cx="150" cy="46" rx="1.4" ry="1.6" fill={INK} />
              <circle cx="151" cy="45" r="0.5" fill="white" />
              <path d="M 144 52 Q 150 58 156 52" stroke={INK} strokeWidth="1.2" fill="none" strokeLinecap="round" />
              <circle cx="154" cy="54" r="1.3" fill={PEACH} opacity="0.55" />
            </g>

            {/* Reaching arm to handlebars */}
            <path d="M 140 68 Q 158 68 170 78" stroke={LAV} strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M 140 68 Q 158 68 170 78" stroke={INK} strokeWidth="1.4" fill="none" strokeLinecap="round" />
            <circle cx="172" cy="78" r="3.2" fill={INK} />

            {/* Front leg - opposite phase bob */}
            <g>
              <path d="M 110 88 Q 118 112 122 132"
                    fill="none" stroke={PANTS} strokeWidth="7" strokeLinecap="round" />
              <path d="M 110 88 Q 118 112 122 132"
                    fill="none" stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
              <animateTransform attributeName="transform" type="translate"
                                values="0 0; 0 2; 0 0; 0 -2; 0 0"
                                dur="0.9s" repeatCount="indefinite" />
            </g>
          </g>


          {/* WHOOSH text */}
          <text x="10" y="36" fill={PEACH} fontSize="18" fontWeight="900" fontFamily="system-ui" className="mj-pop">WHOOSH!</text>
        </svg>
      </div>

      <Caption text="Rider zooms through Lahore - GPS live on your phone." />
    </div>
  );
}

/* ───── Panel 4: Delivered ───── */
function PanelDeliver() {
  return (
    <div className="relative h-full w-full mj-panel">
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg, oklch(0.94 0.038 45 / 0.6) 0%, oklch(0.90 0.05 45 / 0.4) 100%)",
      }} />
      {/* House */}
      <svg viewBox="0 0 500 320" className="absolute inset-0 h-full w-full">
        {/* ground */}
        <line x1="0" y1="270" x2="500" y2="270" stroke={INK} strokeWidth="1.4" opacity="0.4" />
        {/* House body */}
        <rect x="200" y="130" width="200" height="140" fill="oklch(0.94 0.04 60)" stroke={INK} strokeWidth="1.8" />
        <path d="M 190 130 L 300 60 L 410 130 Z" fill={PEACH} stroke={INK} strokeWidth="1.8" />
        {/* door */}
        <rect x="260" y="180" width="60" height="90" fill={LAV} stroke={INK} strokeWidth="1.8" />
        <circle cx="310" cy="228" r="2.5" fill={INK} />
        {/* window */}
        <rect x="340" y="160" width="40" height="34" fill="oklch(0.85 0.06 240)" stroke={INK} strokeWidth="1.6" />
        <line x1="360" y1="160" x2="360" y2="194" stroke={INK} strokeWidth="1.2" />
        <line x1="340" y1="177" x2="380" y2="177" stroke={INK} strokeWidth="1.2" />
        {/* House number sign */}
        <rect x="212" y="140" width="34" height="14" rx="2" fill="white" stroke={INK} strokeWidth="1.2" />
        <text x="229" y="151" textAnchor="middle" fill={INK} fontSize="10" fontWeight="900" fontFamily="system-ui">DHA 5</text>

        {/* Rider on the left, handing over box */}
        <g transform="translate(120 0)">
          <StickPerson x={0} y={230} scale={1.35} skin="oklch(0.75 0.08 40)" shirt={LAV} armWave />
          {/* package in hand */}
          <g className="mj-cartoon-bob">
            <rect x="10" y="215" width="26" height="20" rx="2" fill={PEACH} stroke={INK} strokeWidth="1.6" />
            <line x1="10" y1="225" x2="36" y2="225" stroke={INK} strokeWidth="1" />
            <line x1="23" y1="215" x2="23" y2="235" stroke={INK} strokeWidth="1" />
          </g>
        </g>

        {/* Ammi at door */}
        <g transform="translate(340 0)">
          <StickPerson x={0} y={230} scale={1.3} skin="oklch(0.78 0.06 40)" shirt={MINT_C} elderly armWave />
        </g>

        {/* Speech bubbles */}
        <g className="mj-pop" style={{ animationDelay: "0.4s" }}>
          <path d="M 40 110 Q 40 90 60 90 L 160 90 Q 180 90 180 110 L 180 140 Q 180 160 160 160 L 90 160 L 70 172 L 78 160 L 60 160 Q 40 160 40 140 Z"
                fill="white" stroke={INK} strokeWidth="1.8" />
          <text x="110" y="122" textAnchor="middle" fill={INK} fontSize="12" fontWeight="800" fontFamily="system-ui">Aap ki dawai,</text>
          <text x="110" y="140" textAnchor="middle" fill={LAV} fontSize="12" fontWeight="800" fontFamily="system-ui">Aunty ji! 📦</text>
        </g>

        <g className="mj-pop" style={{ animationDelay: "0.9s" }}>
          <path d="M 340 60 Q 340 40 360 40 L 470 40 Q 490 40 490 60 L 490 90 Q 490 110 470 110 L 400 110 L 380 122 L 388 110 L 360 110 Q 340 110 340 90 Z"
                fill="white" stroke={INK} strokeWidth="1.8" />
          <text x="415" y="72" textAnchor="middle" fill={INK} fontSize="12" fontWeight="800" fontFamily="system-ui">Shukriya beta,</text>
          <text x="415" y="90" textAnchor="middle" fill={MINT_C} fontSize="12" fontWeight="800" fontFamily="system-ui">Allah khush rakhe ❤️</text>
        </g>
      </svg>

      <Caption text="Photo proof lands in the Care Circle. Done." />
    </div>
  );
}

function Caption({ text }: { text: string }) {
  return (
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white/95 backdrop-blur px-4 py-1.5 shadow-lg ring-1 ring-hairline mj-pop" style={{ animationDelay: "0.5s" }}>
      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink">{text}</span>
    </div>
  );
}

/* ───── Panel 4: Nurse gives medicine to Ammi in bed ───── */
function PanelFeed() {
  return (
    <div className="relative h-full w-full mj-panel">
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg, oklch(0.96 0.025 55) 0%, oklch(0.93 0.03 45) 100%)",
      }} />
      {/* wall lamp */}
      <div className="absolute top-6 right-10 w-6 h-10">
        <div className="mx-auto w-1 h-6 bg-ink/60" />
        <div className="w-6 h-4 rounded-b-full bg-peach/70 border-b-2 border-x-2 border-ink/60" />
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-4 rounded-full bg-peach/30 blur-md" />
      </div>
      {/* framed picture */}
      <div className="absolute top-8 left-10 w-16 h-12 bg-white border-2 border-ink/60 rotate-[-4deg]">
        <div className="m-1 h-full bg-lavender-soft/70" />
      </div>

      <svg viewBox="0 0 500 320" className="absolute inset-0 h-full w-full">
        {/* floor */}
        <line x1="0" y1="270" x2="500" y2="270" stroke={INK} strokeWidth="1.4" opacity="0.3" />

        {/* Bed */}
        <g>
          {/* headboard */}
          <rect x="60" y="140" width="14" height="130" fill="oklch(0.55 0.08 40)" stroke={INK} strokeWidth="1.6" />
          {/* mattress */}
          <rect x="74" y="200" width="300" height="46" rx="4" fill="white" stroke={INK} strokeWidth="1.8" />
          {/* frame */}
          <rect x="74" y="246" width="300" height="24" fill="oklch(0.6 0.08 40)" stroke={INK} strokeWidth="1.6" />
          {/* pillow */}
          <rect x="82" y="182" width="70" height="30" rx="6" fill="oklch(0.97 0.01 60)" stroke={INK} strokeWidth="1.6" />
          {/* blanket */}
          <path d="M 150 210 Q 260 194 374 210 L 374 246 L 150 246 Z"
                fill={MINT_C} opacity="0.35" stroke={INK} strokeWidth="1.6" />
          <path d="M 160 220 L 370 220" stroke={INK} strokeWidth="1" opacity="0.4" />
          <path d="M 160 232 L 370 232" stroke={INK} strokeWidth="1" opacity="0.4" />
        </g>

        {/* Ammi lying - head on pillow, smiling */}
        <g>
          {/* body under blanket (bump) */}
          <path d="M 170 216 Q 260 198 360 214 L 360 224 Q 260 210 170 226 Z"
                fill={MINT_C} opacity="0.5" stroke={INK} strokeWidth="1.2" />
          {/* head resting */}
          <ellipse cx="118" cy="195" rx="16" ry="15" fill="oklch(0.78 0.06 40)" stroke={INK} strokeWidth="1.6" />
          {/* dupatta / hair */}
          <path d="M 102 190 Q 100 178 118 175 Q 136 178 134 192 Q 128 184 118 184 Q 108 184 102 190 Z"
                fill="oklch(0.92 0.01 60)" stroke={INK} strokeWidth="1.2" />
          {/* eye closed with smile */}
          <path d="M 111 194 Q 114 196 117 194" stroke={INK} strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <path d="M 121 194 Q 124 196 127 194" stroke={INK} strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <path d="M 114 202 Q 119 206 124 202" stroke={INK} strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <circle cx="107" cy="200" r="1.4" fill={PEACH} opacity="0.6" />
          <circle cx="129" cy="200" r="1.4" fill={PEACH} opacity="0.6" />
        </g>

        {/* Nurse kneeling beside - spoon-feeding / holding cup with pills */}
        <g transform="translate(220 118)">
          {/* nurse legs kneeling */}
          <path d="M -6 132 Q -8 152 6 152 L 26 152 L 26 140 Q 8 138 6 132 Z"
                fill="oklch(0.55 0.08 165)" stroke={INK} strokeWidth="1.4" />
          {/* nurse torso (scrubs) */}
          <path d="M -10 88 Q -14 118 -4 134 L 20 134 Q 26 118 20 88 Q 10 82 5 82 Q -4 82 -10 88 Z"
                fill={MINT_C} stroke={INK} strokeWidth="1.6" />
          {/* nurse ID badge */}
          <rect x="0" y="102" width="10" height="6" fill="white" stroke={INK} strokeWidth="0.8" />
          {/* neck & head */}
          <rect x="3" y="80" width="6" height="6" fill="oklch(0.75 0.08 40)" stroke={INK} strokeWidth="1" />
          <ellipse cx="6" cy="70" rx="11" ry="12" fill="oklch(0.75 0.08 40)" stroke={INK} strokeWidth="1.6" />
          {/* hair bun */}
          <path d="M -4 66 Q 0 54 6 54 Q 14 54 16 66 Q 12 60 6 60 Q 0 60 -4 66 Z" fill={HAIR} stroke={INK} strokeWidth="1.2" />
          <circle cx="16" cy="60" r="4" fill={HAIR} stroke={INK} strokeWidth="1.2" />
          {/* face */}
          <ellipse cx="3" cy="70" rx="1.2" ry="1.4" fill={INK} />
          <ellipse cx="9" cy="70" rx="1.2" ry="1.4" fill={INK} />
          <path d="M 3 76 Q 6 78 9 76" stroke={INK} strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <circle cx="0" cy="74" r="1.3" fill={PEACH} opacity="0.55" />

          {/* arm reaching with a cup + spoon toward Ammi's mouth (to the left) */}
          <path d="M -10 110 Q -30 108 -48 92" stroke={MINT_C} strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M -10 110 Q -30 108 -48 92" stroke={INK} strokeWidth="1.4" fill="none" strokeLinecap="round" />
          {/* cup */}
          <rect x="-58" y="82" width="14" height="14" rx="2" fill="white" stroke={INK} strokeWidth="1.4" />
          <rect x="-58" y="82" width="14" height="4" fill={LAV} />
          {/* pill on top */}
          <ellipse cx="-51" cy="79" rx="4" ry="2" fill={PEACH} stroke={INK} strokeWidth="1" />

          {/* other arm holding a chart */}
          <path d="M 20 110 Q 34 112 40 122" stroke={MINT_C} strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M 20 110 Q 34 112 40 122" stroke={INK} strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <rect x="36" y="118" width="18" height="14" rx="1.5" fill="white" stroke={INK} strokeWidth="1.4" />
          <line x1="39" y1="122" x2="51" y2="122" stroke={INK} strokeWidth="0.8" />
          <line x1="39" y1="126" x2="51" y2="126" stroke={INK} strokeWidth="0.8" />
          <line x1="39" y1="130" x2="47" y2="130" stroke={INK} strokeWidth="0.8" />
        </g>

        {/* Small heart above Ammi (love) */}
        <g className="mj-cartoon-bob" style={{ transformOrigin: "118px 160px" }}>
          <path d="M 118 156 Q 110 148 106 154 Q 102 160 118 172 Q 134 160 130 154 Q 126 148 118 156 Z"
                fill={PEACH} stroke={INK} strokeWidth="1.4" />
        </g>

        {/* Speech bubble from Ammi */}
        <g className="mj-pop" style={{ animationDelay: "0.4s" }}>
          <path d="M 40 90 Q 40 74 56 74 L 150 74 Q 166 74 166 90 L 166 116 Q 166 132 150 132 L 80 132 L 66 142 L 72 132 L 56 132 Q 40 132 40 116 Z"
                fill="white" stroke={INK} strokeWidth="1.8" />
          <text x="103" y="102" textAnchor="middle" fill={INK} fontSize="11" fontWeight="800" fontFamily="system-ui">Shukriya beta,</text>
          <text x="103" y="118" textAnchor="middle" fill={MINT_C} fontSize="11" fontWeight="800" fontFamily="system-ui">bahut aaram hai ❤️</text>
        </g>
      </svg>

      <Caption text="Medicine given on time. Meal warmed. A little dua." />
    </div>
  );
}

/* ───── Panel 5: Hospital escort - nurse walks Ammi in ───── */
function PanelHospital() {
  return (
    <div className="relative h-full w-full mj-panel">
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg, oklch(0.94 0.03 220) 0%, oklch(0.96 0.02 60) 100%)",
      }} />
      {/* hospital building */}
      <svg viewBox="0 0 500 320" className="absolute inset-0 h-full w-full">
        <line x1="0" y1="270" x2="500" y2="270" stroke={INK} strokeWidth="1.4" opacity="0.35" />

        {/* Hospital block */}
        <g>
          <rect x="220" y="50" width="260" height="220" fill="oklch(0.97 0.01 240)" stroke={INK} strokeWidth="1.8" />
          {/* red cross sign */}
          <rect x="330" y="60" width="40" height="40" fill="white" stroke={INK} strokeWidth="1.6" />
          <rect x="345" y="66" width="10" height="28" fill="oklch(0.6 0.22 25)" />
          <rect x="336" y="75" width="28" height="10" fill="oklch(0.6 0.22 25)" />
          <text x="350" y="118" textAnchor="middle" fill={INK} fontSize="11" fontWeight="900" fontFamily="system-ui">HOSPITAL</text>
          {/* windows grid */}
          {[0, 1, 2, 3].map((r) =>
            [0, 1, 2, 3, 4].map((c) => (
              <rect key={`${r}${c}`} x={234 + c * 46} y={140 + r * 30} width="30" height="20"
                    fill="oklch(0.85 0.05 240)" stroke={INK} strokeWidth="1.2" />
            ))
          )}
          {/* entrance */}
          <rect x="326" y="220" width="48" height="50" fill={LAV} stroke={INK} strokeWidth="1.8" />
          <path d="M 350 220 L 350 270" stroke="white" strokeWidth="1.2" opacity="0.6" />
        </g>

        {/* Path */}
        <path d="M 40 268 Q 160 260 320 268" stroke={INK} strokeWidth="1.2" strokeDasharray="6 6" fill="none" opacity="0.5" />

        {/* Nurse holding Ammi's arm walking in */}
        <g className="mj-cartoon-bob-lg">
          {/* Ammi (elderly, cane) */}
          <g transform="translate(140 240)">
            {/* legs */}
            <path d="M -6 0 L -8 30 L -2 30 L 0 0 Z" fill={PANTS} stroke={INK} strokeWidth="1.4" />
            <path d="M 4 0 L 3 30 L 9 30 L 8 0 Z" fill={PANTS} stroke={INK} strokeWidth="1.4" />
            <ellipse cx="-4" cy="31" rx="5" ry="2.2" fill={SHOE} stroke={INK} strokeWidth="1.2" />
            <ellipse cx="6" cy="31" rx="5" ry="2.2" fill={SHOE} stroke={INK} strokeWidth="1.2" />
            {/* shalwar/kameez body */}
            <path d="M -12 -34 Q -14 -4 -8 2 L 10 2 Q 14 -4 12 -34 Q 6 -38 0 -38 Q -6 -38 -12 -34 Z"
                  fill="oklch(0.92 0.03 60)" stroke={INK} strokeWidth="1.6" />
            {/* dupatta over head */}
            <path d="M -14 -44 Q 0 -60 14 -44 Q 18 -30 14 -20 Q 10 -34 0 -34 Q -10 -34 -14 -20 Q -18 -30 -14 -44 Z"
                  fill="oklch(0.85 0.04 20)" stroke={INK} strokeWidth="1.4" />
            {/* face */}
            <ellipse cx="0" cy="-40" rx="8" ry="9" fill="oklch(0.78 0.06 40)" stroke={INK} strokeWidth="1.4" />
            <ellipse cx="-2.5" cy="-40" rx="1" ry="1.2" fill={INK} />
            <ellipse cx="2.5" cy="-40" rx="1" ry="1.2" fill={INK} />
            <path d="M -2 -35 Q 0 -33 2 -35" stroke={INK} strokeWidth="1.1" fill="none" strokeLinecap="round" />
            {/* held arm (right) - reaches to nurse */}
            <path d="M 10 -28 Q 20 -22 26 -14" stroke="oklch(0.92 0.03 60)" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M 10 -28 Q 20 -22 26 -14" stroke={INK} strokeWidth="1.2" fill="none" strokeLinecap="round" />
            {/* cane */}
            <line x1="-14" y1="-16" x2="-18" y2="30" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
            <path d="M -18 -18 Q -14 -22 -10 -18" stroke={INK} strokeWidth="2.4" fill="none" strokeLinecap="round" />
          </g>

          {/* Nurse */}
          <g transform="translate(180 240)">
            <path d="M -6 0 L -8 30 L -2 30 L 0 0 Z" fill="oklch(0.55 0.08 165)" stroke={INK} strokeWidth="1.4" />
            <path d="M 4 0 L 3 30 L 9 30 L 8 0 Z" fill="oklch(0.55 0.08 165)" stroke={INK} strokeWidth="1.4" />
            <ellipse cx="-4" cy="31" rx="5" ry="2.2" fill="white" stroke={INK} strokeWidth="1.2" />
            <ellipse cx="6" cy="31" rx="5" ry="2.2" fill="white" stroke={INK} strokeWidth="1.2" />
            <path d="M -12 -34 Q -14 -4 -8 2 L 10 2 Q 14 -4 12 -34 Q 6 -38 0 -38 Q -6 -38 -12 -34 Z"
                  fill={MINT_C} stroke={INK} strokeWidth="1.6" />
            <rect x="2" y="-20" width="8" height="5" fill="white" stroke={INK} strokeWidth="0.8" />
            {/* head */}
            <ellipse cx="0" cy="-42" rx="8.5" ry="9.5" fill="oklch(0.75 0.08 40)" stroke={INK} strokeWidth="1.4" />
            <path d="M -8 -46 Q 0 -55 8 -46 Q 10 -42 8 -40 Q 0 -44 -8 -40 Q -10 -42 -8 -46 Z" fill={HAIR} stroke={INK} strokeWidth="1.2" />
            <ellipse cx="-2.5" cy="-42" rx="1" ry="1.2" fill={INK} />
            <ellipse cx="2.5" cy="-42" rx="1" ry="1.2" fill={INK} />
            <path d="M -2 -37 Q 0 -35 2 -37" stroke={INK} strokeWidth="1.1" fill="none" strokeLinecap="round" />
            {/* supporting arm (left) reaching to Ammi */}
            <path d="M -10 -28 Q -20 -22 -26 -14" stroke={MINT_C} strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M -10 -28 Q -20 -22 -26 -14" stroke={INK} strokeWidth="1.2" fill="none" strokeLinecap="round" />
            {/* file folder in other hand */}
            <path d="M 10 -28 Q 18 -22 22 -12" stroke={MINT_C} strokeWidth="5" fill="none" strokeLinecap="round" />
            <rect x="16" y="-16" width="14" height="18" rx="1" fill="white" stroke={INK} strokeWidth="1.2" />
            <line x1="18" y1="-11" x2="28" y2="-11" stroke={INK} strokeWidth="0.7" />
            <line x1="18" y1="-6" x2="28" y2="-6" stroke={INK} strokeWidth="0.7" />
          </g>
        </g>

        {/* Care Circle push bubble */}
        <g className="mj-pop" style={{ animationDelay: "0.4s" }}>
          <path d="M 42 60 Q 42 44 58 44 L 190 44 Q 206 44 206 60 L 206 92 Q 206 108 190 108 L 100 108 L 82 120 L 90 108 L 58 108 Q 42 108 42 92 Z"
                fill="white" stroke={INK} strokeWidth="1.8" />
          <text x="124" y="72" textAnchor="middle" fill={INK} fontSize="11" fontWeight="800" fontFamily="system-ui">Ammi at Dr. Ali's</text>
          <text x="124" y="90" textAnchor="middle" fill={LAV} fontSize="11" fontWeight="800" fontFamily="system-ui">10:14 · with Zoya 🩺</text>
        </g>
      </svg>

      <Caption text="Hospital appointment - a nurse holds her hand the whole way." />
    </div>
  );
}

/* ───── Panel 6: Nurse standing in the long queue ───── */
function PanelQueue() {
  const positions = [10, 60, 110, 160, 210, 260];
  return (
    <div className="relative h-full w-full mj-panel">
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg, oklch(0.95 0.02 60) 0%, oklch(0.90 0.04 40) 100%)",
      }} />
      {/* Utility booth */}
      <svg viewBox="0 0 500 320" className="absolute inset-0 h-full w-full">
        <line x1="0" y1="260" x2="500" y2="260" stroke={INK} strokeWidth="1.4" opacity="0.35" />
        {/* fan spinning above */}
        <g transform="translate(430 40)">
          <line x1="0" y1="0" x2="0" y2="20" stroke={INK} strokeWidth="1.4" />
          <circle cx="0" cy="24" r="4" fill={INK} />
          <g style={{ transformOrigin: "0 24px", animation: "mj-spin 0.4s linear infinite" }}>
            <ellipse cx="0" cy="20" rx="18" ry="3" fill={LAV} opacity="0.5" />
            <ellipse cx="0" cy="28" rx="18" ry="3" fill={LAV} opacity="0.5" />
          </g>
        </g>

        {/* Booth */}
        <rect x="360" y="120" width="120" height="140" fill="oklch(0.85 0.06 60)" stroke={INK} strokeWidth="1.8" />
        <rect x="374" y="140" width="92" height="60" fill="oklch(0.92 0.04 240)" stroke={INK} strokeWidth="1.6" />
        <line x1="374" y1="170" x2="466" y2="170" stroke={INK} strokeWidth="1.2" />
        <line x1="420" y1="140" x2="420" y2="200" stroke={INK} strokeWidth="1.2" />
        <rect x="380" y="210" width="80" height="14" rx="1" fill="oklch(0.6 0.15 25)" stroke={INK} strokeWidth="1.4" />
        <text x="420" y="221" textAnchor="middle" fill="white" fontSize="9" fontWeight="900" fontFamily="system-ui">BILL COUNTER</text>
        {/* clerk head */}
        <g transform="translate(420 165)">
          <ellipse cx="0" cy="0" rx="8" ry="9" fill="oklch(0.75 0.08 40)" stroke={INK} strokeWidth="1.4" />
          <ellipse cx="-2.5" cy="0" rx="1" ry="1.2" fill={INK} />
          <ellipse cx="2.5" cy="0" rx="1" ry="1.2" fill={INK} />
          <path d="M -3 4 Q 0 3 3 4" stroke={INK} strokeWidth="1.1" fill="none" strokeLinecap="round" />
        </g>

        {/* Queue of dejected customers, then nurse at the back holding Ammi's bill */}
        {positions.map((x, i) => {
          const isNurse = i === positions.length - 1;
          return (
            <g key={i} transform={`translate(${40 + x} 200)`}>
              {/* legs */}
              <path d="M -6 0 L -8 26 L -2 26 L 0 0 Z" fill={PANTS} stroke={INK} strokeWidth="1.4" />
              <path d="M 4 0 L 3 26 L 9 26 L 8 0 Z" fill={PANTS} stroke={INK} strokeWidth="1.4" />
              <ellipse cx="-4" cy="27" rx="5" ry="2.2" fill={SHOE} stroke={INK} strokeWidth="1.2" />
              <ellipse cx="6" cy="27" rx="5" ry="2.2" fill={SHOE} stroke={INK} strokeWidth="1.2" />
              {/* torso */}
              <path d="M -10 -28 Q -12 -4 -6 2 L 8 2 Q 12 -4 10 -28 Q 4 -32 0 -32 Q -4 -32 -10 -28 Z"
                    fill={isNurse ? MINT_C : (i % 2 ? "oklch(0.55 0.08 240)" : "oklch(0.5 0.1 25)")}
                    stroke={INK} strokeWidth="1.4" />
              {/* head */}
              <ellipse cx="0" cy="-38" rx="8" ry="9" fill="oklch(0.75 0.08 40)" stroke={INK} strokeWidth="1.4" />
              {isNurse ? (
                <>
                  {/* nurse hair bun */}
                  <path d="M -6 -42 Q 0 -50 6 -42 Q 8 -38 6 -36 Q 0 -40 -6 -36 Q -8 -38 -6 -42 Z" fill={HAIR} stroke={INK} strokeWidth="1.1" />
                  <path d="M -2 -34 Q 0 -32 2 -34" stroke={INK} strokeWidth="1.1" fill="none" strokeLinecap="round" />
                  {/* holding a bill */}
                  <g className="mj-cartoon-bob">
                    <rect x="8" y="-14" width="14" height="18" fill="white" stroke={INK} strokeWidth="1.2" />
                    <line x1="10" y1="-10" x2="20" y2="-10" stroke={INK} strokeWidth="0.7" />
                    <line x1="10" y1="-6" x2="20" y2="-6" stroke={INK} strokeWidth="0.7" />
                    <line x1="10" y1="-2" x2="18" y2="-2" stroke={INK} strokeWidth="0.7" />
                  </g>
                </>
              ) : (
                <>
                  <path d="M -8 -42 Q 0 -50 8 -42 Q 10 -38 7 -36 Q 0 -40 -7 -36 Q -10 -38 -8 -42 Z" fill={HAIR} stroke={INK} strokeWidth="1.1" />
                  {/* frown */}
                  <path d="M -3 -33 Q 0 -35 3 -33" stroke={INK} strokeWidth="1.1" fill="none" strokeLinecap="round" />
                  {/* tiny sweat drop */}
                  <path d="M 8 -42 Q 10 -38 12 -42 Q 10 -46 8 -42 Z" fill={LAV} opacity="0.7" />
                </>
              )}
              <ellipse cx="-2.5" cy="-39" rx="1" ry="1.2" fill={INK} />
              <ellipse cx="2.5" cy="-39" rx="1" ry="1.2" fill={INK} />
            </g>
          );
        })}

        {/* Arrow + label pointing to nurse */}
        <g className="mj-pop" style={{ animationDelay: "0.3s" }}>
          <path d="M 260 130 Q 290 150 306 175" stroke={LAV} strokeWidth="2.4" fill="none" strokeLinecap="round" markerEnd="url(#arr)" />
          <defs>
            <marker id="arr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 Z" fill={LAV} />
            </marker>
          </defs>
          <rect x="140" y="100" width="140" height="34" rx="4" fill="white" stroke={INK} strokeWidth="1.6" />
          <text x="210" y="118" textAnchor="middle" fill={INK} fontSize="10" fontWeight="900" fontFamily="system-ui">Your nurse - hour 2.</text>
          <text x="210" y="130" textAnchor="middle" fill={LAV} fontSize="10" fontWeight="800" fontFamily="system-ui">You: still in a meeting.</text>
        </g>

        {/* Wall clock */}
        <g transform="translate(60 60)">
          <circle r="20" fill="white" stroke={INK} strokeWidth="1.8" />
          <line x1="0" y1="0" x2="0" y2="-14" stroke={INK} strokeWidth="2" strokeLinecap="round" />
          <line x1="0" y1="0" x2="10" y2="4" stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
          <circle r="1.5" fill={INK} />
        </g>
      </svg>

      <Caption text="Bills, queues, forms - your nurse handles them. You don't." />
    </div>
  );
}

/* ───── Panel 7: Ammi at ease at home - nurse at bedside ───── */
function PanelResting() {
  return (
    <div className="relative h-full w-full mj-panel">
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg, oklch(0.96 0.03 55) 0%, oklch(0.93 0.04 20) 100%)",
      }} />
      {/* sunset window */}
      <div className="absolute top-4 right-6 w-36 h-24 rounded-md bg-gradient-to-b from-peach/70 to-lavender/40 border-2 border-ink/50">
        <div className="absolute inset-0 grid grid-cols-2">
          <div className="border-r border-ink/40" />
          <div />
        </div>
        <div className="absolute bottom-2 left-2 size-6 rounded-full bg-peach/90" />
      </div>

      <svg viewBox="0 0 500 320" className="absolute inset-0 h-full w-full">
        <line x1="0" y1="270" x2="500" y2="270" stroke={INK} strokeWidth="1.4" opacity="0.3" />

        {/* Bed with Ammi peacefully sleeping */}
        <g>
          <rect x="50" y="140" width="14" height="130" fill="oklch(0.55 0.08 40)" stroke={INK} strokeWidth="1.6" />
          <rect x="64" y="200" width="280" height="46" rx="4" fill="white" stroke={INK} strokeWidth="1.8" />
          <rect x="64" y="246" width="280" height="24" fill="oklch(0.6 0.08 40)" stroke={INK} strokeWidth="1.6" />
          <rect x="72" y="182" width="70" height="30" rx="6" fill="oklch(0.97 0.01 60)" stroke={INK} strokeWidth="1.6" />
          <path d="M 140 210 Q 240 194 344 210 L 344 246 L 140 246 Z"
                fill="oklch(0.6 0.14 25)" opacity="0.45" stroke={INK} strokeWidth="1.6" />
          {/* head */}
          <ellipse cx="108" cy="195" rx="16" ry="15" fill="oklch(0.78 0.06 40)" stroke={INK} strokeWidth="1.6" />
          <path d="M 92 190 Q 90 178 108 175 Q 126 178 124 192 Q 118 184 108 184 Q 98 184 92 190 Z"
                fill="oklch(0.92 0.01 60)" stroke={INK} strokeWidth="1.2" />
          {/* closed eyes + serene smile */}
          <path d="M 101 194 Q 104 196 107 194" stroke={INK} strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <path d="M 111 194 Q 114 196 117 194" stroke={INK} strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <path d="M 104 202 Q 109 205 114 202" stroke={INK} strokeWidth="1.4" fill="none" strokeLinecap="round" />
          {/* Zzz */}
          <text x="130" y="176" fill={LAV} fontSize="12" fontWeight="900" fontFamily="system-ui" className="mj-cartoon-bob">z</text>
          <text x="140" y="166" fill={LAV} fontSize="14" fontWeight="900" fontFamily="system-ui" className="mj-cartoon-bob" style={{ animationDelay: "0.3s" }}>Z</text>
          <text x="152" y="152" fill={LAV} fontSize="16" fontWeight="900" fontFamily="system-ui" className="mj-cartoon-bob" style={{ animationDelay: "0.6s" }}>Z</text>
        </g>

        {/* Bedside table with tea + pill organiser */}
        <g>
          <rect x="360" y="220" width="60" height="50" fill="oklch(0.7 0.06 40)" stroke={INK} strokeWidth="1.6" />
          <rect x="368" y="200" width="24" height="20" rx="2" fill="white" stroke={INK} strokeWidth="1.4" />
          <path d="M 392 205 Q 400 208 400 214 Q 400 218 392 218" fill="none" stroke={INK} strokeWidth="1.4" />
          <path d="M 372 196 Q 372 192 375 192 M 380 196 Q 380 192 383 192" stroke={INK} strokeWidth="1" fill="none" opacity="0.6" />
          {/* pill organiser */}
          <g transform="translate(398 210)">
            {[0, 1, 2, 3].map((i) => (
              <rect key={i} x={i * 6} y="0" width="5" height="6" fill={i % 2 ? PEACH : LAV} stroke={INK} strokeWidth="0.6" />
            ))}
          </g>
        </g>

        {/* Nurse sitting on a stool beside bed, checking BP */}
        <g transform="translate(240 190)">
          {/* stool */}
          <rect x="-14" y="72" width="28" height="6" fill={INK} opacity="0.7" />
          <line x1="-10" y1="78" x2="-14" y2="94" stroke={INK} strokeWidth="1.6" />
          <line x1="10" y1="78" x2="14" y2="94" stroke={INK} strokeWidth="1.6" />
          {/* nurse body */}
          <path d="M -12 0 Q -16 40 -6 66 L 14 66 Q 20 40 12 0 Q 4 -6 0 -6 Q -6 -6 -12 0 Z"
                fill={MINT_C} stroke={INK} strokeWidth="1.6" />
          <rect x="0" y="26" width="10" height="6" fill="white" stroke={INK} strokeWidth="0.8" />
          {/* head */}
          <rect x="-3" y="-8" width="6" height="6" fill="oklch(0.75 0.08 40)" stroke={INK} strokeWidth="1" />
          <ellipse cx="0" cy="-18" rx="10" ry="11" fill="oklch(0.75 0.08 40)" stroke={INK} strokeWidth="1.5" />
          <path d="M -10 -22 Q 0 -30 10 -22 Q 12 -18 10 -16 Q 0 -20 -10 -16 Q -12 -18 -10 -22 Z" fill={HAIR} stroke={INK} strokeWidth="1.2" />
          <ellipse cx="-3" cy="-17" rx="1.2" ry="1.4" fill={INK} />
          <ellipse cx="3" cy="-17" rx="1.2" ry="1.4" fill={INK} />
          <path d="M -3 -12 Q 0 -10 3 -12" stroke={INK} strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <circle cx="-5" cy="-14" r="1.3" fill={PEACH} opacity="0.55" />
          <circle cx="5" cy="-14" r="1.3" fill={PEACH} opacity="0.55" />

          {/* stethoscope around neck */}
          <path d="M -6 -2 Q -12 8 -6 18" stroke={INK} strokeWidth="1.6" fill="none" />
          <path d="M 6 -2 Q 12 8 6 18" stroke={INK} strokeWidth="1.6" fill="none" />
          <circle cx="0" cy="24" r="4" fill={LAV} stroke={INK} strokeWidth="1.4" />

          {/* arm reaching over Ammi (to left) with tablet */}
          <path d="M -12 20 Q -40 20 -60 6" stroke={MINT_C} strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M -12 20 Q -40 20 -60 6" stroke={INK} strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <rect x="-72" y="-4" width="18" height="14" rx="2" fill="white" stroke={INK} strokeWidth="1.4" />
          <rect x="-70" y="-2" width="14" height="10" fill={LAV} />
        </g>

        {/* Vitals badge */}
        <g className="mj-pop" style={{ animationDelay: "0.4s" }}>
          <rect x="330" y="80" width="140" height="46" rx="8" fill="white" stroke={INK} strokeWidth="1.8" />
          <text x="342" y="98" fill={INK} fontSize="10" fontWeight="900" fontFamily="monospace">BP  118/76</text>
          <text x="342" y="112" fill={MINT_C} fontSize="10" fontWeight="900" fontFamily="monospace">HR  72 · normal</text>
          <text x="342" y="122" fill={INK} fontSize="8" opacity="0.6" fontFamily="monospace">18:04 · Zoya RN</text>
        </g>
      </svg>

      <Caption text="Home. Safe. A gentle presence in the room." />
    </div>
  );
}

/* ───── Panel 8: You exhale - son abroad sees the photo proof ───── */
function PanelProof() {
  return (
    <div className="relative h-full w-full mj-panel">
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg, oklch(0.22 0.03 258) 0%, oklch(0.32 0.08 258) 100%)",
      }} />
      {/* city lights (London night) */}
      {Array.from({ length: 22 }).map((_, i) => (
        <div key={i} className="absolute rounded-full bg-peach/70"
          style={{
            width: `${2 + (i % 3)}px`, height: `${2 + (i % 3)}px`,
            top: `${8 + (i * 11) % 60}%`, left: `${(i * 17) % 100}%`,
            opacity: 0.5 + (i % 4) * 0.12,
          }} />
      ))}
      {/* moon */}
      <div className="absolute top-8 right-10 size-14 rounded-full bg-cream shadow-[0_0_40px_rgba(255,240,220,0.4)]" />

      <svg viewBox="0 0 500 320" className="absolute inset-0 h-full w-full">
        {/* window frame silhouette */}
        <rect x="20" y="20" width="200" height="260" fill="none" stroke="oklch(0.9 0.02 60 / 0.15)" strokeWidth="2" />
        <line x1="120" y1="20" x2="120" y2="280" stroke="oklch(0.9 0.02 60 / 0.12)" strokeWidth="1.5" />

        {/* Son on couch, phone lit up */}
        <g transform="translate(300 130)">
          {/* couch */}
          <rect x="-80" y="120" width="200" height="30" rx="6" fill="oklch(0.35 0.06 258)" stroke={INK} strokeWidth="1.6" />
          <rect x="-80" y="70" width="30" height="80" rx="6" fill="oklch(0.4 0.07 258)" stroke={INK} strokeWidth="1.6" />
          {/* body */}
          <path d="M -46 30 Q -52 90 -30 124 L 30 124 Q 50 90 36 30 Q 20 20 -5 20 Q -30 20 -46 30 Z"
                fill="oklch(0.55 0.08 258)" stroke={INK} strokeWidth="1.6" />
          {/* head */}
          <ellipse cx="-4" cy="10" rx="16" ry="17" fill="oklch(0.75 0.08 40)" stroke={INK} strokeWidth="1.6" />
          <path d="M -18 4 Q -4 -12 12 4 Q 14 10 10 12 Q -4 6 -18 12 Q -20 10 -18 4 Z" fill={HAIR} stroke={INK} strokeWidth="1.2" />
          {/* eyes - closed smile of relief */}
          <path d="M -10 10 Q -7 13 -4 10" stroke={INK} strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M 0 10 Q 3 13 6 10" stroke={INK} strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* tear */}
          <path d="M -8 14 Q -9 20 -6 22 Q -3 20 -4 14 Z" fill={LAV} opacity="0.85" stroke={INK} strokeWidth="0.8" className="mj-cartoon-bob" />
          {/* smile */}
          <path d="M -6 20 Q -2 26 4 20" stroke={INK} strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* arms holding phone */}
          <path d="M -32 60 Q -40 82 -20 92" stroke="oklch(0.55 0.08 258)" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M 22 60 Q 34 82 14 92" stroke="oklch(0.55 0.08 258)" strokeWidth="6" fill="none" strokeLinecap="round" />
          {/* phone glowing */}
          <g className="mj-pop">
            <rect x="-24" y="52" width="46" height="70" rx="6" fill="oklch(0.15 0.02 258)" stroke={INK} strokeWidth="1.6" />
            <rect x="-20" y="58" width="38" height="58" rx="3" fill="white" />
            {/* photo preview */}
            <rect x="-18" y="60" width="34" height="24" fill={MINT_C} opacity="0.35" />
            <ellipse cx="-4" cy="72" rx="6" ry="5" fill="oklch(0.78 0.06 40)" stroke={INK} strokeWidth="0.8" />
            <path d="M -8 76 Q -4 78 0 76" stroke={INK} strokeWidth="0.8" fill="none" strokeLinecap="round" />
            {/* nurse next to Ammi in photo */}
            <ellipse cx="8" cy="72" rx="5" ry="5" fill="oklch(0.75 0.08 40)" stroke={INK} strokeWidth="0.8" />
            {/* caption lines */}
            <line x1="-18" y1="90" x2="16" y2="90" stroke={INK} strokeWidth="1" />
            <line x1="-18" y1="96" x2="10" y2="96" stroke={INK} strokeWidth="1" opacity="0.6" />
            <rect x="-18" y="102" width="16" height="8" rx="2" fill={MINT_C} />
            <text x="-10" y="108" textAnchor="middle" fill="white" fontSize="6" fontWeight="900" fontFamily="system-ui">✓ 18:04</text>
            <text x="6" y="108" fill={LAV} fontSize="6" fontWeight="800" fontFamily="system-ui">Photo proof</text>
          </g>
          {/* phone glow */}
          <ellipse cx="-1" cy="86" rx="60" ry="30" fill="oklch(0.94 0.05 60)" opacity="0.18" />
        </g>

        {/* Speech / thought bubble - relief */}
        <g className="mj-pop" style={{ animationDelay: "0.5s" }}>
          <path d="M 30 60 Q 30 44 46 44 L 170 44 Q 186 44 186 60 L 186 92 Q 186 108 170 108 L 100 108 L 84 118 L 90 108 L 46 108 Q 30 108 30 92 Z"
                fill="white" stroke={INK} strokeWidth="1.8" />
          <text x="108" y="72" textAnchor="middle" fill={INK} fontSize="11" fontWeight="800" fontFamily="system-ui">Alhamdulillah.</text>
          <text x="108" y="90" textAnchor="middle" fill={LAV} fontSize="11" fontWeight="800" fontFamily="system-ui">She's okay. ❤️</text>
        </g>

        {/* clock overlay */}
        <g transform="translate(60 260)" opacity="0.7">
          <text fill="oklch(0.9 0.02 60)" fontSize="10" fontWeight="700" fontFamily="monospace">London · 01:22</text>
        </g>
      </svg>

      <Caption text="4,000 miles away, you finally close your eyes." />
    </div>
  );
}
