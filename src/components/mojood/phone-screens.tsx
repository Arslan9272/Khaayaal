import { PhoneFrame } from "./phone-frame";
import { MapPin, User, Heart, Pill, Camera, Bell } from "lucide-react";

/* Screen 1 - Booking */
export function ScreenBook() {
  return (
    <div className="flex h-full w-full flex-col bg-cream p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-lavender-deep">
          Step 01
        </span>
        <span className="font-mono text-[9px] text-ink-muted">10:24 AM</span>
      </div>
      <h4 className="font-display font-semibold tracking-tight text-xl leading-tight text-ink">Pick your nurse</h4>
      <p className="mt-1 text-[10px] text-ink-muted">Vetted for elderly care in Lahore</p>
      <div className="mt-4 space-y-2.5">
        {[
          { n: "Zoya A.", t: "RN · 8 yrs", s: true },
          { n: "Bilal K.", t: "Attendant · 4 yrs", s: false },
          { n: "Sana R.", t: "RN · 6 yrs", s: false },
        ].map((p) => (
          <div
            key={p.n}
            className={`flex items-center gap-2.5 rounded-2xl border p-2.5 transition-colors ${
              p.s ? "border-lavender bg-lavender-soft" : "border-hairline bg-white"
            }`}
          >
            <div className="grid size-8 place-items-center rounded-full bg-lavender-deep text-white">
              <User className="size-3.5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold text-ink">{p.n}</p>
              <p className="text-[9px] text-ink-muted">{p.t}</p>
            </div>
            {p.s && <div className="size-2 rounded-full bg-lavender-deep" />}
          </div>
        ))}
      </div>
      <div className="mt-auto rounded-2xl bg-ink py-3 text-center text-[11px] font-semibold text-cream">
        Confirm visit
      </div>
    </div>
  );
}

/* Screen 2 - Live tracking */
export function ScreenTrack() {
  return (
    <div className="flex h-full w-full flex-col bg-cream">
      <div className="relative h-[55%] w-full overflow-hidden bg-lavender-soft">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, oklch(0.55 0.18 295 / 0.08) 1px, transparent 1px)", backgroundSize: "14px 14px" }} />
        {/* Home marker */}
        <div className="absolute right-8 top-6 flex flex-col items-center">
          <div className="grid size-7 place-items-center rounded-lg bg-white shadow-md">
            <div className="size-2.5 rounded-sm bg-ink" />
          </div>
          <span className="mt-1 font-mono text-[8px] font-semibold text-ink">Home</span>
        </div>
        {/* Nurse pulse */}
        <div className="absolute bottom-10 left-8">
          <div className="relative">
            <div className="mj-pulse-ring absolute inset-0 size-8 text-lavender-deep" />
            <div className="relative grid size-8 place-items-center rounded-full bg-lavender-deep ring-4 ring-white shadow-lg">
              <MapPin className="size-4 text-white" strokeWidth={2.5} />
            </div>
          </div>
        </div>
        <svg viewBox="0 0 200 120" className="absolute inset-0 h-full w-full">
          <path d="M 40 90 Q 90 60 130 30" stroke="oklch(0.55 0.18 295)" strokeWidth="2" strokeDasharray="4 3" fill="none" />
        </svg>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-lavender-deep">
          Step 02
        </span>
        <h4 className="mt-1 font-display font-semibold tracking-tight text-xl text-ink">Live tracking</h4>
        <p className="mt-1 text-[10px] text-ink-muted">Zoya is 6 min away · DHA Phase 5</p>
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-mint/40 p-2">
          <div className="size-1.5 rounded-full bg-emerald-600" />
          <span className="text-[9px] font-medium text-ink">GPS check-in armed</span>
        </div>
      </div>
    </div>
  );
}

/* Screen 3 - Report */
export function ScreenReport() {
  return (
    <div className="flex h-full w-full flex-col bg-cream p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-lavender-deep">
          Step 03
        </span>
        <span className="rounded-full bg-mint/50 px-2 py-0.5 text-[8px] font-semibold uppercase text-emerald-800">
          Verified
        </span>
      </div>
      <h4 className="font-display font-semibold tracking-tight text-xl leading-tight text-ink">Visit report</h4>
      <p className="mt-1 text-[10px] text-ink-muted">4:15 PM · 45 min visit</p>
      <div className="mt-3 aspect-[4/3] w-full overflow-hidden rounded-2xl relative"
        style={{ background: "radial-gradient(circle at 30% 40%, oklch(0.88 0.08 45), transparent 55%), radial-gradient(circle at 70% 60%, oklch(0.72 0.14 295 / 0.7), transparent 50%)" }}
      >
        <div className="absolute bottom-2 left-2 rounded-md bg-black/50 px-1.5 py-0.5 backdrop-blur-sm">
          <span className="font-mono text-[8px] font-medium text-white">Medicine · 4:02 PM</span>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-xl border border-hairline bg-white p-2">
          <p className="font-mono text-[8px] uppercase text-ink-muted">BP</p>
          <p className="text-sm font-bold text-ink">118/76</p>
        </div>
        <div className="rounded-xl border border-hairline bg-white p-2">
          <p className="font-mono text-[8px] uppercase text-ink-muted">Pulse</p>
          <p className="text-sm font-bold text-ink">72<span className="text-[9px] font-normal text-ink-muted"> bpm</span></p>
        </div>
      </div>
      <div className="mt-3 rounded-2xl bg-lavender-deep p-2.5">
        <p className="font-mono text-[8px] uppercase tracking-widest text-lavender-soft/80">Note from Zoya</p>
        <p className="mt-0.5 text-[10px] leading-snug text-white">Uncle sahib in good spirits. Took walk in garden.</p>
      </div>
    </div>
  );
}

/* Screen 4 - Care Circle chat */
export function ScreenCircle() {
  return (
    <div className="flex h-full w-full flex-col bg-cream p-5">
      <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-lavender-deep">
        Care Circle
      </span>
      <h4 className="mt-1 font-display font-semibold tracking-tight text-xl leading-tight text-ink">Family updates</h4>
      <div className="mt-4 flex -space-x-2">
        {["oklch(0.72 0.14 295)", "oklch(0.88 0.08 45)", "oklch(0.86 0.09 165)", "oklch(0.55 0.18 295)"].map((c, i) => (
          <div key={i} className="size-8 rounded-full ring-2 ring-cream" style={{ background: c }} />
        ))}
        <div className="grid size-8 place-items-center rounded-full bg-white ring-2 ring-cream text-[9px] font-bold text-ink">+2</div>
      </div>
      <div className="mt-4 space-y-3">
        <div className="rounded-2xl rounded-tl-none bg-white p-3 max-w-[85%]">
          <p className="font-mono text-[8px] text-ink-muted mb-0.5">Hira · London</p>
          <p className="text-[10px] leading-snug text-ink">Ammi called, she loved the flowers Zoya brought 💐</p>
        </div>
        <div className="ml-auto rounded-2xl rounded-tr-none bg-lavender-deep p-3 max-w-[85%]">
          <p className="font-mono text-[8px] text-lavender-soft/80 mb-0.5">Omar · Dubai</p>
          <p className="text-[10px] leading-snug text-white">Just saw the BP report - she's steady this week 🙏</p>
        </div>
        <div className="rounded-2xl rounded-tl-none bg-white p-3 max-w-[85%]">
          <p className="font-mono text-[8px] text-ink-muted mb-0.5">Khaayaal Ops</p>
          <p className="text-[10px] leading-snug text-ink">Next visit confirmed for tomorrow at 4pm.</p>
        </div>
      </div>
    </div>
  );
}

/* Hero phone */
export function ScreenHero() {
  return (
    <PhoneFrame size="lg">
      <div className="flex h-full flex-col bg-cream">
        <div className="flex items-center justify-between px-6 pt-8 pb-2">
          <span className="font-mono text-[10px] font-semibold text-ink">9:41</span>
          <div className="flex items-center gap-1">
            <div className="h-2 w-4 rounded-sm bg-ink/70" />
            <div className="h-2 w-4 rounded-sm bg-ink/40" />
          </div>
        </div>
        <div className="px-5 pt-2 pb-3">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-muted">Ammi & Abbu</p>
          <div className="mt-1 flex items-center gap-2">
            <h3 className="font-display font-semibold tracking-tight text-2xl text-ink">Live in Lahore</h3>
            <div className="flex items-center gap-1 rounded-full bg-mint/50 px-2 py-0.5">
              <div className="size-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-[9px] font-semibold text-emerald-800">SAFE</span>
            </div>
          </div>
        </div>
        <div className="relative mx-4 flex-1 overflow-hidden rounded-2xl bg-lavender-soft">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, oklch(0.55 0.18 295 / 0.1) 1px, transparent 1px)", backgroundSize: "14px 14px" }} />
          <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
            <path d="M 30 170 Q 80 130 100 90 T 170 30" stroke="oklch(0.55 0.18 295)" strokeWidth="2.5" strokeDasharray="5 4" fill="none" />
          </svg>
          <div className="absolute right-6 top-6 grid size-8 place-items-center rounded-lg bg-white shadow-md">
            <div className="size-2.5 rounded-sm bg-ink" />
          </div>
          <div className="absolute bottom-8 left-8">
            <div className="relative">
              <div className="mj-pulse-ring absolute inset-0 size-10 text-lavender-deep" />
              <div className="relative grid size-10 place-items-center rounded-full bg-lavender-deep ring-4 ring-white shadow-lg">
                <MapPin className="size-5 text-white" strokeWidth={2.5} />
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 space-y-2">
          <div className="rounded-2xl bg-white border border-hairline p-3">
            <div className="flex items-center gap-2">
              <div className="grid size-8 place-items-center rounded-xl bg-peach-soft text-peach">
                <Heart className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-mono text-ink-muted">Today's vitals</p>
                <p className="text-xs font-bold text-ink">118/76 · 72 bpm</p>
              </div>
              <span className="rounded-full bg-mint/50 px-2 py-0.5 text-[8px] font-bold uppercase text-emerald-800">Ok</span>
            </div>
          </div>
          <div className="rounded-2xl mj-lav-gradient p-3">
            <div className="flex items-center gap-2 text-white">
              <div className="grid size-8 place-items-center rounded-xl bg-white/20">
                <Bell className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-mono opacity-70">Next visit</p>
                <p className="text-xs font-bold">Zoya · in 6 min</p>
              </div>
              <div className="rounded-full bg-white px-2.5 py-1 text-[9px] font-bold text-lavender-deep">TRACK</div>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

/* Screen 5 - Meds */
export function ScreenMeds() {
  return (
    <div className="flex h-full w-full flex-col bg-cream p-5">
      <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-lavender-deep">
        Today · Medication
      </span>
      <h4 className="mt-1 font-display font-semibold tracking-tight text-xl text-ink">Ammi's schedule</h4>
      <div className="mt-4 space-y-2.5">
        {[
          { t: "8:00 AM", n: "Amlodipine 5mg", d: true },
          { t: "1:00 PM", n: "Metformin 500mg", d: true },
          { t: "8:00 PM", n: "Atorvastatin 10mg", d: false },
        ].map((m) => (
          <div key={m.t} className={`flex items-center gap-3 rounded-2xl border p-3 ${m.d ? "border-mint bg-mint/20" : "border-hairline bg-white"}`}>
            <div className={`grid size-9 place-items-center rounded-xl ${m.d ? "bg-mint/60 text-emerald-800" : "bg-peach-soft text-peach"}`}>
              <Pill className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-mono text-ink-muted">{m.t}</p>
              <p className="text-[11px] font-bold text-ink">{m.n}</p>
            </div>
            {m.d ? (
              <div className="grid size-6 place-items-center rounded-full bg-emerald-600">
                <Camera className="size-3 text-white" />
              </div>
            ) : (
              <span className="text-[9px] font-mono text-ink-muted">Pending</span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-auto rounded-2xl bg-lavender-soft p-3">
        <p className="text-[10px] font-mono text-lavender-deep font-semibold">📸 3 photos uploaded today</p>
      </div>
    </div>
  );
}
