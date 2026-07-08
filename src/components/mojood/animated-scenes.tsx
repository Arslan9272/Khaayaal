import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Hand-drawn, always-in-motion scenes that replace the old 3D canvases.
 * Same cartoon language as <MedicineDelivery/>: INK outlines, lavender/peach/mint
 * fills, gentle looping CSS/SMIL animation. Pure SVG + a little HTML overlay for
 * crisp Urdu text. No WebGL, no drag - it just plays.
 */

const INK = "oklch(0.22 0.028 255)";
const LAV = "oklch(0.34 0.11 258)";
const LAV2 = "oklch(0.48 0.115 258)";
const PEACH = "oklch(0.68 0.145 38)";
const MINT = "oklch(0.5 0.14 165)";
const PAPER = "oklch(0.99 0.005 80)";

export type SceneVariant = "heart" | "route" | "coins" | "pills" | "shield" | "globe";

const TINTS: Record<SceneVariant, string> = {
  heart: "linear-gradient(180deg, oklch(0.955 0.022 245) 0%, oklch(0.94 0.038 45 / 0.55) 100%)",
  route: "linear-gradient(180deg, oklch(0.96 0.03 165 / 0.6) 0%, oklch(0.955 0.022 245) 100%)",
  coins: "linear-gradient(180deg, oklch(0.955 0.022 245) 0%, oklch(0.94 0.038 45 / 0.5) 100%)",
  pills: "linear-gradient(180deg, oklch(0.96 0.03 165 / 0.55) 0%, oklch(0.97 0.02 60) 100%)",
  shield: "linear-gradient(180deg, oklch(0.955 0.022 245) 0%, oklch(0.96 0.03 165 / 0.5) 100%)",
  globe: "linear-gradient(180deg, oklch(0.30 0.10 258) 0%, oklch(0.20 0.06 258) 100%)",
};

interface Props {
  variant?: SceneVariant;
  className?: string;
  style?: CSSProperties;
  height?: number | string;
  badge?: string;
}

export function AnimatedScene({
  variant = "heart",
  className,
  style,
  height = 420,
  badge = "Live",
}: Props) {
  return (
    <div
      className={cn(
        "relative block w-full overflow-hidden rounded-3xl bg-cream isolate",
        className,
      )}
      style={{ height, minHeight: height, ...style }}
    >
      <div aria-hidden className="absolute inset-0 z-0" style={{ background: TINTS[variant] }} />
      <div aria-hidden className="absolute inset-0 z-0 mj-noise opacity-20" />

      <div className="absolute inset-0 z-10">
        {variant === "heart" && <PhoneScene />}
        {variant === "route" && <RouteScene />}
        {variant === "coins" && <TiersScene />}
        {variant === "pills" && <PillsScene />}
        {variant === "shield" && <SafetyScene />}
        {variant === "globe" && <GlobeScene />}
      </div>

      <div className="pointer-events-none absolute bottom-3 right-3 z-20 flex items-center gap-1.5 rounded-full bg-white/75 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-lavender-deep backdrop-blur">
        <span className="size-1.5 rounded-full bg-lavender-deep animate-pulse" />
        {badge}
      </div>

      <SceneKeyframes />
    </div>
  );
}

function SceneKeyframes() {
  return (
    <style>{`
      @keyframes as-draw   { to { stroke-dashoffset: 0; } }
      @keyframes as-flow   { to { stroke-dashoffset: -240; } }
      @keyframes as-glow   { 0%,100% { opacity: .3; transform: scale(1); } 50% { opacity: .65; transform: scale(1.07); } }
      @keyframes as-sub    { 0% { opacity: 0; transform: translateY(8px); } 14%,82% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; transform: translateY(-4px); } }
      @keyframes as-rise   { 0% { opacity: 0; transform: translateY(6px) scale(.5); } 18% { opacity: 1; } 100% { opacity: 0; transform: translateY(-64px) scale(1); } }
      @keyframes as-breathe{ 0%,100% { transform: scaleY(1); } 50% { transform: scaleY(1.05); } }
      @keyframes as-vitals { to { transform: translateX(-72px); } }
      @keyframes as-tier   { 0%,18% { transform: translateY(0); } 25%,43% { transform: translateY(-42px); } 50%,68% { transform: translateY(-84px); } 75%,93% { transform: translateY(-126px); } 100% { transform: translateY(0); } }
      @keyframes as-eta    { 0%,49% { opacity: 1; } 50%,100% { opacity: .25; } }
    `}</style>
  );
}

/* ─────────────────────────  shared bits  ───────────────────────── */

// Elderly patient resting head/upper body (used lying down)
function subtitleStyle(delay = 0): CSSProperties {
  return { animation: `as-sub 5s ${delay}s ease-in-out infinite` };
}

/* ═══════════════  HEART → person standing, holding phone  ═══════════════ */
function PhoneScene() {
  const skin = "oklch(0.8 0.07 40)";
  const hair = "oklch(0.26 0.03 40)";
  const pants = "oklch(0.30 0.04 260)";
  const shoe = "oklch(0.2 0.02 260)";
  return (
    <div className="relative h-full w-full mj-panel">
      <svg viewBox="0 0 460 380" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        {/* soft glow */}
        <ellipse cx="200" cy="180" rx="150" ry="150" fill={LAV2} opacity="0.13" style={{ transformOrigin: "200px 180px", animation: "as-glow 3.6s ease-in-out infinite" }} />
        {/* ground shadow */}
        <ellipse cx="200" cy="354" rx="82" ry="11" fill={INK} opacity="0.1" />
        {/* floating reaction hearts */}
        {[[300, 150, 0], [108, 170, 1.2], [322, 226, 2.2]].map(([x, y, d], i) => (
          <text key={i} x={x} y={y} fontSize="18" style={{ animation: `as-rise 3.6s ${d}s ease-in infinite` }}>💚</text>
        ))}

        {/* ── standing person (gentle bob) ── */}
        <g style={{ transformOrigin: "200px 300px", animation: "mj-bob 3.4s ease-in-out infinite" }}>
          {/* legs */}
          <path d="M 185 210 L 181 342 L 196 342 L 198 210 Z" fill={pants} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
          <path d="M 215 210 L 219 342 L 204 342 L 202 210 Z" fill={pants} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
          {/* shoes */}
          <path d="M 177 342 Q 174 352 190 352 L 198 352 L 198 342 Z" fill={shoe} stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M 223 342 Q 226 352 210 352 L 202 352 L 202 342 Z" fill={shoe} stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />

          {/* torso / shirt */}
          <path d="M 166 134 Q 162 120 178 115 Q 200 108 222 115 Q 238 120 234 134 L 238 214 Q 200 226 162 214 Z"
            fill={LAV} stroke={INK} strokeWidth="2" strokeLinejoin="round" />

          {/* head (tilted, looking down at the phone) */}
          <g transform="rotate(8 200 94)">
            <rect x="196" y="112" width="8" height="14" fill={skin} stroke={INK} strokeWidth="1.4" />
            <ellipse cx="200" cy="90" rx="24" ry="26" fill={skin} stroke={INK} strokeWidth="2" />
            <path d="M 176 88 Q 174 60 200 58 Q 226 60 224 88 Q 220 76 208 74 Q 200 70 192 74 Q 180 76 176 88 Z" fill={hair} stroke={INK} strokeWidth="1.4" />
            <ellipse cx="192" cy="99" rx="1.9" ry="2.2" fill={INK} style={{ animation: "mj-blink 4s infinite" }} />
            <ellipse cx="208" cy="99" rx="1.9" ry="2.2" fill={INK} style={{ animation: "mj-blink 4s infinite" }} />
            <circle cx="187" cy="103" r="2.3" fill={PEACH} opacity="0.5" />
            <circle cx="213" cy="103" r="2.3" fill={PEACH} opacity="0.5" />
            <path d="M 194 107 Q 200 111 206 107" stroke={INK} strokeWidth="1.6" fill="none" strokeLinecap="round" />
          </g>

          {/* arms reaching in to cradle the phone */}
          <path d="M 172 142 Q 150 172 172 200" fill="none" stroke={LAV} strokeWidth="11" strokeLinecap="round" />
          <path d="M 172 142 Q 150 172 172 200" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
          <path d="M 228 142 Q 250 172 228 200" fill="none" stroke={LAV} strokeWidth="11" strokeLinecap="round" />
          <path d="M 228 142 Q 250 172 228 200" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />

          {/* ── the phone (screen toward viewer) ── */}
          <g transform="rotate(-3 200 172)">
            <rect x="162" y="114" width="76" height="118" rx="14" fill={INK} />
            <rect x="167" y="119" width="66" height="108" rx="10" fill={PAPER} stroke={INK} strokeWidth="1.2" />
            {/* LIVE header */}
            <rect x="172" y="124" width="56" height="14" rx="5" fill={LAV} />
            <circle cx="180" cy="131" r="2.6" fill="oklch(0.7 0.2 25)" className="animate-pulse" />
            <text x="187" y="134" fill="white" fontSize="7" fontWeight="800" fontFamily="monospace">LIVE · Lahore</text>
            {/* video: patient in bed */}
            <rect x="172" y="142" width="56" height="64" rx="4" fill="oklch(0.955 0.022 245)" stroke={INK} strokeWidth="1" />
            <rect x="177" y="184" width="46" height="16" rx="3" fill="white" stroke={INK} strokeWidth="1" />
            <circle cx="186" cy="181" r="5" fill="oklch(0.78 0.08 40)" stroke={INK} strokeWidth="1" />
            <g style={{ transformOrigin: "205px 194px", animation: "as-breathe 3s ease-in-out infinite" }}>
              <path d="M 191 194 Q 205 187 219 194 L 219 200 L 191 200 Z" fill={LAV2} opacity="0.35" stroke={INK} strokeWidth="0.9" />
            </g>
            {/* nurse thumbs up */}
            <g style={{ transformOrigin: "210px 170px", animation: "mj-bob 2s ease-in-out infinite" }}>
              <circle cx="210" cy="164" r="5" fill="oklch(0.8 0.07 40)" stroke={INK} strokeWidth="1" />
              <rect x="205" y="170" width="10" height="14" rx="3" fill={MINT} stroke={INK} strokeWidth="1" />
              <path d="M 215 176 Q 221 174 221 169" fill="none" stroke={MINT} strokeWidth="2.6" strokeLinecap="round" />
            </g>
            {/* green check */}
            <g style={{ animation: "mj-pop 0.7s 0.5s both" }}>
              <circle cx="221" cy="153" r="7" fill={MINT} stroke={INK} strokeWidth="1.2" />
              <path d="M 218 153 l 2.2 2.6 l 3.8 -5" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            {/* home indicator */}
            <rect x="192" y="222" width="16" height="3" rx="1.5" fill={INK} opacity="0.4" />
          </g>

          {/* hands gripping the phone sides */}
          <ellipse cx="167" cy="200" rx="9" ry="7" fill={skin} stroke={INK} strokeWidth="1.8" />
          <ellipse cx="233" cy="200" rx="9" ry="7" fill={skin} stroke={INK} strokeWidth="1.8" />
        </g>
      </svg>

      {/* speech bubble - the person "saying" it (HTML for correct Urdu shaping) */}
      <div className="pointer-events-none absolute right-4 top-6 max-w-[54%]" style={subtitleStyle(0.5)}>
        <div className="relative rounded-2xl bg-ink px-4 py-2.5 text-center shadow-xl ring-1 ring-white/10">
          <p dir="rtl" lang="ur" className="text-lg font-bold leading-tight text-cream" style={{ fontFamily: "'Noto Nastaliq Urdu','Jameel Noori Nastaleeq',system-ui,sans-serif" }}>
            اِتنی جلدی کام ہو گیا
          </p>
          <p className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-cream/60">Done - and so quickly</p>
          <span className="absolute -bottom-1.5 left-8 size-3 rotate-45 bg-ink" />
        </div>
      </div>

      <div className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-ink shadow ring-1 ring-hairline">
        You · watching from abroad
      </div>
    </div>
  );
}

/* ═══════════════  ROUTE → nurse dispatched, ETA, arrival  ═══════════════ */
function RouteScene() {
  return (
    <div className="relative h-full w-full mj-panel">
      <svg viewBox="0 0 460 380" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        {/* map grid */}
        <g stroke={INK} strokeWidth="1" opacity="0.08">
          {[70, 140, 210, 280, 350].map((y) => <line key={y} x1="20" y1={y} x2="440" y2={y} />)}
          {[70, 150, 230, 310, 390].map((x) => <line key={x} x1={x} y1="30" x2={x} y2="360" />)}
        </g>
        {/* soft blocks */}
        {[[60, 90, MINT], [330, 80, PEACH], [300, 250, LAV2], [70, 260, PEACH]].map(([x, y, c], i) => (
          <rect key={i} x={x as number} y={y as number} width="46" height="34" rx="5" fill={c as string} opacity="0.16" />
        ))}

        {/* the route path */}
        <path id="as-route" d="M 70 300 C 150 300 150 170 230 170 C 300 170 300 90 390 90"
          fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" strokeDasharray="2 12" opacity="0.35" />
        <path d="M 70 300 C 150 300 150 170 230 170 C 300 170 300 90 390 90"
          fill="none" stroke={LAV} strokeWidth="4" strokeLinecap="round"
          strokeDasharray="380" strokeDashoffset="380"
          style={{ animation: "as-draw 4s ease-in-out infinite alternate" }} />

        {/* start pin (home) */}
        <g transform="translate(70 300)">
          <path d="M 0 6 C -14 -8 -12 -22 0 -22 C 12 -22 14 -8 0 6 Z" fill={MINT} stroke={INK} strokeWidth="1.6" />
          <circle cx="0" cy="-13" r="5" fill="white" stroke={INK} strokeWidth="1.3" />
          <path d="M -3 -12 L 0 -16 L 3 -12" fill="none" stroke={INK} strokeWidth="1.2" />
        </g>
        {/* destination pin (parents' home) with pulse */}
        <g transform="translate(390 90)">
          <circle cx="0" cy="0" r="10" fill={PEACH} opacity="0.4" style={{ transformOrigin: "0 0", animation: "mj-pulse-ring 2.4s ease-out infinite" }} />
          <path d="M 0 6 C -14 -8 -12 -22 0 -22 C 12 -22 14 -8 0 6 Z" fill={PEACH} stroke={INK} strokeWidth="1.6" />
          <text x="0" y="-11" textAnchor="middle" fontSize="9">🏠</text>
        </g>

        {/* moving nurse-on-scooter marker */}
        <g>
          <animateMotion dur="4s" repeatCount="indefinite" rotate="auto" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
            <mpath href="#as-route" />
          </animateMotion>
          <g transform="translate(-13 -12)">
            <circle cx="13" cy="20" r="6" fill="none" stroke={INK} strokeWidth="2" />
            <circle cx="30" cy="20" r="6" fill="none" stroke={INK} strokeWidth="2" />
            <path d="M 13 20 L 22 12 L 30 20" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
            <rect x="18" y="6" width="12" height="9" rx="2" fill={LAV} stroke={INK} strokeWidth="1.4" />
            <circle cx="22" cy="2" r="4.5" fill="oklch(0.8 0.07 40)" stroke={INK} strokeWidth="1.3" />
            <path d="M 17 1 Q 22 -4 27 1" fill={MINT} stroke={INK} strokeWidth="1.2" />
          </g>
        </g>
      </svg>

      {/* ETA + status chips */}
      <div className="absolute left-4 top-4 flex flex-col gap-1.5">
        <span className="rounded-full bg-ink px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-cream shadow">
          Nurse dispatched
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-lavender-deep shadow ring-1 ring-hairline">
          <span className="size-1.5 rounded-full bg-lavender-deep" style={{ animation: "as-eta 1s steps(1) infinite" }} />
          ETA 12 min
        </span>
      </div>
      <div className="absolute right-4 top-4 rounded-full bg-mint/80 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-emerald-950 shadow" style={{ animation: "mj-pop 0.6s 1.2s both" }}>
        Arrival stamped ✓
      </div>
    </div>
  );
}

/* ═══════════════  COINS → stacked care tiers  ═══════════════ */
function TiersScene() {
  const discs = [
    { y: 300, rx: 96, label: "Concierge", fill: "white" },
    { y: 258, rx: 82, label: "Assurance", fill: "oklch(0.94 0.038 45)" },
    { y: 216, rx: 66, label: "Guardian", fill: "oklch(0.955 0.022 245)" },
    { y: 174, rx: 50, label: "Sanctuary", fill: "white" },
  ];
  return (
    <div className="relative h-full w-full mj-panel">
      <svg viewBox="0 0 460 380" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        {discs.map((d, i) => (
          <g key={d.label} style={{ transformOrigin: `230px ${d.y}px`, animation: `mj-bob ${2.4 + i * 0.3}s ease-in-out infinite` }}>
            <ellipse cx="230" cy={d.y + 10} rx={d.rx} ry={d.rx * 0.28} fill={INK} opacity="0.08" />
            <ellipse cx="230" cy={d.y} rx={d.rx} ry={d.rx * 0.3} fill={d.fill} stroke={INK} strokeWidth="1.8" />
            <ellipse cx="230" cy={d.y - 6} rx={d.rx} ry={d.rx * 0.3} fill={d.fill} stroke={INK} strokeWidth="1.8" />
            <rect x={230 - d.rx} y={d.y - 6} width={d.rx * 2} height="6" fill={d.fill} />
            <line x1={230 - d.rx} y1={d.y} x2={230 - d.rx} y2={d.y - 6} stroke={INK} strokeWidth="1.8" />
            <line x1={230 + d.rx} y1={d.y} x2={230 + d.rx} y2={d.y - 6} stroke={INK} strokeWidth="1.8" />
            <text x="230" y={d.y - 3} textAnchor="middle" fontSize="11" fontWeight="800" fontFamily="system-ui" fill={LAV}>
              {d.label}
            </text>
          </g>
        ))}

        {/* heart crown on top */}
        <g style={{ transformOrigin: "230px 150px", animation: "mj-float 5s ease-in-out infinite" }}>
          <path d="M 230 150 C 220 136 202 140 202 154 C 202 168 230 182 230 182 C 230 182 258 168 258 154 C 258 140 240 136 230 150 Z"
            fill={PEACH} stroke={INK} strokeWidth="1.8" />
        </g>

        {/* moving spotlight ring climbing the stack */}
        <g style={{ transformOrigin: "230px 300px", animation: "as-tier 8s ease-in-out infinite" }}>
          <ellipse cx="230" cy="300" rx="104" ry="30" fill="none" stroke={PEACH} strokeWidth="3.5"
            strokeDasharray="10 8" style={{ animation: "as-flow 6s linear infinite" }} />
        </g>
      </svg>

      <div className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-ink shadow ring-1 ring-hairline">
        Start small · grow into full care
      </div>
    </div>
  );
}

/* ═══════════════  PILLS → living medicine cabinet  ═══════════════ */
function PillsScene() {
  return (
    <div className="relative h-full w-full mj-panel">
      <svg viewBox="0 0 460 380" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        {/* cabinet */}
        <rect x="90" y="50" width="280" height="230" rx="14" fill={PAPER} stroke={INK} strokeWidth="2" />
        <line x1="90" y1="128" x2="370" y2="128" stroke={INK} strokeWidth="1.6" opacity="0.5" />
        <line x1="90" y1="206" x2="370" y2="206" stroke={INK} strokeWidth="1.6" opacity="0.5" />
        <circle cx="230" cy="50" r="4" fill={PEACH} />

        {/* bottles row 1 */}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={`a${i}`} transform={`translate(${118 + i * 48} 76)`} style={{ transformOrigin: "center", animation: `mj-bob ${2 + i * 0.4}s ease-in-out infinite` }}>
            <rect width="26" height="40" rx="4" fill={i % 2 ? LAV2 : PEACH} stroke={INK} strokeWidth="1.5" />
            <rect x="-2" y="-6" width="30" height="9" rx="2" fill="white" stroke={INK} strokeWidth="1.4" />
            <rect x="4" y="14" width="18" height="12" rx="2" fill="white" opacity="0.85" />
          </g>
        ))}
        {/* pill blister + capsules row 2 */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={`c${i}`} transform={`translate(${112 + i * 42} 156)`} style={{ transformOrigin: "center", animation: `mj-wiggle ${1.6 + i * 0.2}s ease-in-out infinite` }}>
            <rect width="22" height="12" rx="6" fill={i % 2 ? MINT : PEACH} stroke={INK} strokeWidth="1.4" />
            <line x1="11" y1="0" x2="11" y2="12" stroke={INK} strokeWidth="1.2" />
          </g>
        ))}
        {/* reminder clock row 3 */}
        <g transform="translate(120 224)">
          <circle cx="16" cy="20" r="18" fill="white" stroke={INK} strokeWidth="1.8" />
          <line x1="16" y1="20" x2="16" y2="9" stroke={INK} strokeWidth="2" strokeLinecap="round" style={{ transformOrigin: "16px 20px", animation: "mj-spin-slow 6s linear infinite" }} />
          <line x1="16" y1="20" x2="24" y2="20" stroke={LAV} strokeWidth="2" strokeLinecap="round" style={{ transformOrigin: "16px 20px", animation: "mj-spin-slow 3s linear infinite" }} />
          <circle cx="16" cy="20" r="2" fill={INK} />
        </g>
        <text x="176" y="250" fontSize="11" fontWeight="800" fontFamily="system-ui" fill={LAV}>8:00 AM dose</text>

        {/* hand + a pill dropping into palm with check */}
        <g style={{ transformOrigin: "300px 240px", animation: "mj-cartoon-bob 2.2s ease-in-out infinite" }}>
          <path d="M 268 244 Q 300 234 332 244 Q 340 262 314 268 Q 282 268 264 258 Q 260 246 268 244 Z" fill="oklch(0.8 0.07 40)" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
          <circle cx="300" cy="238" r="7" fill={PEACH} stroke={INK} strokeWidth="1.4" style={{ animation: "as-rise 3s ease-in infinite" }} />
        </g>
        <g style={{ animation: "mj-pop 0.6s 0.8s both" }}>
          <circle cx="338" cy="238" r="11" fill={MINT} stroke={INK} strokeWidth="1.4" />
          <path d="M 333 238 l 3.5 4 l 6 -8" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>

      <div className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-ink shadow ring-1 ring-hairline">
        Every dose, tracked & proven
      </div>
    </div>
  );
}

/* ═══════════════  SHIELD → mother resting, safeguarded  ═══════════════ */
function SafetyScene() {
  return (
    <div className="relative h-full w-full mj-panel">
      <svg viewBox="0 0 460 380" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        {/* protective shield arc glowing over the bed */}
        <g style={{ transformOrigin: "230px 150px", animation: "as-glow 3.6s ease-in-out infinite" }}>
          <path d="M 230 40 C 300 62 330 66 330 66 C 330 150 300 190 230 214 C 160 190 130 150 130 66 C 130 66 160 62 230 40 Z"
            fill={LAV2} opacity="0.14" />
        </g>
        <path d="M 230 48 C 294 68 322 72 322 72 C 322 150 294 186 230 208 C 166 186 138 150 138 72 C 138 72 166 68 230 48 Z"
          fill="none" stroke={LAV} strokeWidth="2.4" strokeDasharray="560" strokeDashoffset="560"
          style={{ animation: "as-draw 4.5s ease-in-out infinite alternate" }} />
        {/* check inside shield */}
        <path d="M 214 122 l 10 12 l 20 -26" fill="none" stroke={MINT} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"
          style={{ animation: "mj-pop 0.7s 0.5s both" }} />

        {/* bed */}
        <rect x="96" y="250" width="268" height="60" rx="10" fill="white" stroke={INK} strokeWidth="2" />
        <rect x="96" y="230" width="70" height="46" rx="10" fill="oklch(0.94 0.038 45)" stroke={INK} strokeWidth="2" />
        <rect x="90" y="304" width="284" height="12" rx="4" fill="oklch(0.8 0.06 60)" stroke={INK} strokeWidth="1.6" />

        {/* mother lying, head on pillow */}
        <circle cx="140" cy="252" r="17" fill="oklch(0.82 0.06 40)" stroke={INK} strokeWidth="1.8" />
        <path d="M 124 244 Q 140 232 156 244 Q 158 250 154 251 Q 140 244 126 251 Q 122 250 124 244 Z" fill="oklch(0.92 0.01 60)" stroke={INK} strokeWidth="1.3" />
        <path d="M 133 254 Q 140 259 147 254" stroke={INK} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <ellipse cx="135" cy="250" rx="1.4" ry="1.6" fill={INK} style={{ animation: "mj-blink 4s infinite" }} />
        <ellipse cx="145" cy="250" rx="1.4" ry="1.6" fill={INK} style={{ animation: "mj-blink 4s infinite" }} />
        {/* blanket, gently breathing */}
        <g style={{ transformOrigin: "260px 280px", animation: "as-breathe 3.4s ease-in-out infinite" }}>
          <path d="M 166 282 Q 260 262 356 282 L 356 306 L 166 306 Z" fill={LAV2} opacity="0.4" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M 210 282 Q 210 296 214 306 M 262 280 Q 262 296 266 306 M 314 282 Q 314 296 318 306" fill="none" stroke={INK} strokeWidth="1" opacity="0.4" />
        </g>

        {/* vitals monitor ticking */}
        <g transform="translate(300 150)">
          <rect x="0" y="0" width="118" height="52" rx="8" fill={INK} />
          <clipPath id="as-vclip"><rect x="6" y="6" width="106" height="40" rx="4" /></clipPath>
          <g clipPath="url(#as-vclip)">
            <rect x="6" y="6" width="106" height="40" fill="oklch(0.22 0.05 165)" />
            <path d="M 0 26 H 30 l 6 -16 l 8 30 l 7 -22 l 6 8 H 120 l 6 -16 l 8 30 l 7 -22 l 6 8 H 250"
              fill="none" stroke={MINT} strokeWidth="2.2" strokeLinecap="round"
              style={{ animation: "as-vitals 2.4s linear infinite" }} />
          </g>
          <text x="59" y="62" textAnchor="middle" fontSize="8" fontWeight="700" fontFamily="monospace" fill={LAV}>72 BPM · STABLE</text>
        </g>
      </svg>

      {/* safety badges */}
      <div className="absolute left-4 top-4 flex flex-col gap-1.5">
        {["Background-checked", "Insured & licensed", "24/7 SOS"].map((t, i) => (
          <span key={t} className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-lavender-deep shadow ring-1 ring-hairline" style={{ animation: `mj-pop 0.5s ${0.3 + i * 0.2}s both` }}>
            <span className="text-mint">✓</span>{t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════  GLOBE → families connected to Lahore  ═══════════════ */
function GlobeScene() {
  // city dots around the globe; all connect inward to Lahore (center)
  const cities = [
    { x: 96, y: 96, name: "London" },
    { x: 372, y: 110, name: "Toronto" },
    { x: 104, y: 288, name: "Dubai" },
    { x: 360, y: 292, name: "Sydney" },
  ];
  const cx = 230, cy = 196;
  return (
    <div className="relative h-full w-full mj-panel">
      <svg viewBox="0 0 460 380" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        {/* globe */}
        <circle cx={cx} cy={cy} r="96" fill="oklch(0.30 0.10 258)" stroke="oklch(0.6 0.12 245)" strokeWidth="1.5" />
        <ellipse cx={cx} cy={cy} rx="96" ry="34" fill="none" stroke="oklch(0.6 0.12 245 / 0.5)" strokeWidth="1" />
        <ellipse cx={cx} cy={cy} rx="60" ry="96" fill="none" stroke="oklch(0.6 0.12 245 / 0.5)" strokeWidth="1" />
        <ellipse cx={cx} cy={cy} rx="96" ry="70" fill="none" stroke="oklch(0.6 0.12 245 / 0.3)" strokeWidth="1" />
        <line x1={cx - 96} y1={cy} x2={cx + 96} y2={cy} stroke="oklch(0.6 0.12 245 / 0.5)" strokeWidth="1" />
        {/* stylised land blobs */}
        <path d="M 190 150 q 20 -10 34 4 q 10 12 -6 18 q -24 6 -30 -8 z" fill="oklch(0.55 0.13 165)" opacity="0.55" />
        <path d="M 236 210 q 26 -6 30 12 q -2 18 -22 14 q -18 -6 -8 -26 z" fill="oklch(0.55 0.13 165)" opacity="0.5" />

        {/* connection arcs + travelling hearts */}
        {cities.map((c, i) => {
          const mx = (c.x + cx) / 2;
          const my = Math.min(c.y, cy) - 46;
          const id = `as-arc-${i}`;
          const d = `M ${c.x} ${c.y} Q ${mx} ${my} ${cx} ${cy}`;
          return (
            <g key={c.name}>
              <path id={id} d={d} fill="none" stroke="oklch(0.85 0.09 245)" strokeWidth="2"
                strokeDasharray="6 8" opacity="0.7" style={{ animation: `as-flow ${3 + i * 0.4}s linear infinite` }} />
              <g>
                <animateMotion dur={`${2.6 + i * 0.5}s`} repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                  <mpath href={`#${id}`} />
                </animateMotion>
                <circle r="4.5" fill={PEACH} stroke="white" strokeWidth="1" />
              </g>
              {/* city dot */}
              <circle cx={c.x} cy={c.y} r="10" fill="oklch(0.85 0.09 245 / 0.3)" style={{ transformOrigin: `${c.x}px ${c.y}px`, animation: `mj-pulse-ring ${2.4}s ease-out infinite` }} />
              <circle cx={c.x} cy={c.y} r="5.5" fill={PEACH} stroke="white" strokeWidth="1.5" />
              <text x={c.x} y={c.y - 12} textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="monospace" fill="white">{c.name}</text>
            </g>
          );
        })}

        {/* Lahore hub */}
        <circle cx={cx} cy={cy} r="9" fill={MINT} stroke="white" strokeWidth="2" />
        <text x={cx} y={cy + 26} textAnchor="middle" fontSize="11" fontWeight="800" fontFamily="monospace" fill="white">LAHORE</text>
      </svg>

      {/* Urdu tagline */}
      <div className="pointer-events-none absolute inset-x-0 bottom-11 flex flex-col items-center px-4">
        <div className="rounded-xl bg-white/12 px-4 py-2 text-center backdrop-blur-sm ring-1 ring-white/15">
          <p dir="rtl" lang="ur" className="text-lg font-bold leading-tight text-white" style={{ fontFamily: "'Noto Nastaliq Urdu','Jameel Noori Nastaleeq',system-ui,sans-serif" }}>
            ہر جگہ سے جُڑے ہوئے
          </p>
          <p className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-white/60">Connected, everywhere</p>
        </div>
      </div>
    </div>
  );
}
