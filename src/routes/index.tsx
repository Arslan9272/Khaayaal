import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  MapPin,
  ShieldCheck,
  Camera,
  Siren,
  Users,
  Wallet,
  ArrowUpRight,
  Star,
  Heart,
  Sparkles,
  Clock,
  Globe,
  Pill,
  Check,
  X,
} from "lucide-react";
import { PhoneFrame } from "@/components/mojood/phone-frame";
import {
  ScreenBook,
  ScreenTrack,
  ScreenReport,
} from "@/components/mojood/phone-screens";
import { HeroPhoneCycle } from "@/components/mojood/hero-phone-cycle";
import { MedicineDelivery } from "@/components/mojood/medicine-delivery";
import { AnimatedScene } from "@/components/mojood/animated-scenes";
import { FeatureCard, StatCard } from "@/components/mojood/shared";
import { Slider } from "@/components/ui/slider";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Khaayaal - Be present for your parents, from any distance" },
      {
        name: "description",
        content:
          "Trusted home healthcare for elderly parents in Pakistan. Vetted nurses, live GPS tracking, photo-verified visits. Built for diaspora families.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <StatsStrip />
      <QuickFeatures />
      <Interactive3D />
      <MedicineDelivery />
      <CarePlanner />
      <Comparison />
      <HowItWorks />
      <TrustCards />
      <PricingPreview />
      <Testimonials />
      <BigCTA />
    </>
  );
}

function Interactive3D() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-lavender-deep">
              Live · Animated
            </span>
            <h2 className="mt-3 text-balance text-3xl font-extrabold leading-tight md:text-5xl">
              Care you can watch{" "}
              <span className="font-display font-semibold tracking-tight text-ink-muted">
                happen, as it happens.
              </span>
            </h2>
            <p className="mt-4 max-w-lg text-ink-muted md:text-lg">
              Every visit, every medicine, every check-in - shown to you the moment it happens,
              thousands of miles away. The relief of seeing it done, not just hoping it was.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Real-time GPS", "Vetted nurses", "Photo proof", "SOS ready"].map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ink ring-1 ring-hairline"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <AnimatedScene variant="heart" height={460} className="ring-1 ring-hairline shadow-2xl shadow-lavender/20" />
        </div>
      </div>
    </section>
  );
}


/* ─────────────────────────  CARE PLANNER (slider)  ──────────────────────── */
function CarePlanner() {
  const [visits, setVisits] = useState([3]);
  const [hours, setHours] = useState([4]);
  const [meds, setMeds] = useState([2]);

  const { tier, price, badge } = useMemo(() => {
    const score = visits[0] * 60 + hours[0] * 35 + meds[0] * 25;
    if (score < 220) return { tier: "Concierge", price: 300 as number | null, badge: "Light-touch" };
    if (score < 450) return { tier: "Assurance", price: 350 as number | null, badge: "Regular" };
    if (score < 700) return { tier: "Guardian", price: 475 as number | null, badge: "Daily" };
    return { tier: "Sanctuary", price: null as number | null, badge: "Live-in" };
  }, [visits, hours, meds]);

  const Row = ({
    label,
    value,
    suffix,
    max,
    step,
    val,
    setVal,
  }: {
    label: string;
    value: number;
    suffix: string;
    max: number;
    step: number;
    val: number[];
    setVal: (v: number[]) => void;
  }) => (
    <div>
      <div className="flex items-baseline justify-between">
        <label className="text-sm font-semibold text-ink">{label}</label>
        <span className="font-mono text-sm font-bold text-lavender-deep tabular-nums">
          {value}
          <span className="ml-1 text-[10px] uppercase tracking-widest text-ink-muted">
            {suffix}
          </span>
        </span>
      </div>
      <Slider
        value={val}
        onValueChange={setVal}
        min={0}
        max={max}
        step={step}
        className="mt-3"
      />
    </div>
  );

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-lavender-deep">
              Care planner
            </span>
            <h2 className="mt-4 text-balance text-3xl font-extrabold leading-tight md:text-5xl">
              Drag the sliders.{" "}
              <span className="font-display font-semibold tracking-tight text-lavender-deep">
                We'll match the tier.
              </span>
            </h2>
            <p className="mt-5 max-w-lg text-base text-ink-muted leading-relaxed">
              A real estimate in seconds - no forms, no calls. Adjust to your parents'
              needs and see the plan update live.
            </p>

            <div className="mt-10 space-y-8 rounded-3xl border border-hairline bg-white p-7 md:p-8 shadow-xl shadow-lavender/5">
              <Row
                label="Nurse visits per week"
                value={visits[0]}
                suffix="visits"
                max={7}
                step={1}
                val={visits}
                setVal={setVisits}
              />
              <Row
                label="Attendant hours per day"
                value={hours[0]}
                suffix="hrs"
                max={24}
                step={1}
                val={hours}
                setVal={setHours}
              />
              <Row
                label="Daily medications"
                value={meds[0]}
                suffix="meds"
                max={10}
                step={1}
                val={meds}
                setVal={setMeds}
              />
            </div>
          </div>

          <div className="relative">
            <div className="mj-lav-gradient relative overflow-hidden rounded-[2rem] p-8 text-white shadow-2xl shadow-lavender/25 md:p-10">
              <div className="absolute -top-24 -right-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-mint/25 blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-white/15 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest">
                    {badge}
                  </span>
                  <span className="rounded-full bg-mint/90 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-ink">
                    Recommended
                  </span>
                </div>
                <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] opacity-70">
                  Matched tier
                </p>
                <p className="mt-2 font-display text-5xl font-semibold tracking-tight md:text-6xl">
                  {tier}
                </p>
                <div className="mt-6 flex items-baseline gap-2">
                  {price === null ? (
                    <span className="text-4xl font-extrabold">Contact for quote</span>
                  ) : (
                    <>
                      <span className="text-5xl font-extrabold tabular-nums">${price}</span>
                      <span className="text-sm opacity-70">/ month · USD</span>
                    </>
                  )}
                </div>
                <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/15">
                  <div
                    className="h-full rounded-full bg-mint transition-all duration-500"
                    style={{
                      width: `${Math.min(100, ((visits[0] * 60 + hours[0] * 35 + meds[0] * 25) / 900) * 100)}%`,
                    }}
                  />
                </div>
                <ul className="mt-8 space-y-2.5 text-sm">
                  {[
                    "Live GPS on every visit",
                    "Photo-verified medicines",
                    "24/7 SOS + Rescue-1122",
                    "Care Circle for siblings",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <Check className="size-4 text-mint" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/pricing"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-lavender-deep transition-transform hover:-translate-y-0.5"
                >
                  See what's included <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  INTERACTIVE COMPARISON  ──────────────────────── */
function Comparison() {
  const [side, setSide] = useState<"traditional" | "apke">("apke");
  const rows = [
    { k: "Visit verification", trad: "A phone call, maybe.", ours: "Photo + GPS timestamp." },
    { k: "Nurse vetting", trad: "Word of mouth.", ours: "Background + PNC verified." },
    { k: "Emergency response", trad: "You wake up at 4am.", ours: "One-tap SOS + Rescue-1122." },
    { k: "Family visibility", trad: "One sibling relays.", ours: "Everyone sees the same feed." },
    { k: "Payment", trad: "Cash in a drawer.", ours: "USD, tracked, receipts." },
    { k: "Medicine oversight", trad: "Trust and hope.", ours: "Pill-by-pill photo log." },
  ];
  return (
    <section className="py-24 md:py-32 bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-mint">
              The honest comparison
            </span>
            <h2 className="mt-4 text-balance text-3xl font-extrabold leading-tight md:text-5xl">
              What most families do{" "}
              <span className="font-display font-semibold tracking-tight text-mint">
                vs. what we do.
              </span>
            </h2>
          </div>
          <div className="inline-flex rounded-full bg-white/10 p-1 backdrop-blur">
            <button
              onClick={() => setSide("traditional")}
              className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                side === "traditional" ? "bg-peach text-ink" : "text-cream/70"
              }`}
            >
              The old way
            </button>
            <button
              onClick={() => setSide("apke")}
              className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                side === "apke" ? "bg-mint text-ink" : "text-cream/70"
              }`}
            >
              With Khaayaal
            </button>
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur">
          {rows.map((r, i) => (
            <div
              key={r.k}
              className={`grid grid-cols-1 gap-4 p-5 md:grid-cols-[1fr_1.5fr] md:items-center md:gap-8 md:p-6 ${
                i !== rows.length - 1 ? "border-b border-white/8" : ""
              }`}
            >
              <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-cream/60">
                {r.k}
              </p>
              <div className="flex items-center gap-3">
                {side === "traditional" ? (
                  <>
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-peach/20 text-peach">
                      <X className="size-4" />
                    </span>
                    <p className="text-base font-medium text-cream/80 md:text-lg">{r.trad}</p>
                  </>
                ) : (
                  <>
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-mint/20 text-mint">
                      <Check className="size-4" />
                    </span>
                    <p className="text-base font-semibold text-cream md:text-lg">{r.ours}</p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-cream/60">
            Toggle above to feel the difference in your gut, not just on paper.
          </p>
          <Link
            to="/features"
            className="inline-flex items-center gap-2 rounded-full bg-mint px-5 py-2.5 text-sm font-bold text-ink hover:-translate-y-0.5 transition-transform"
          >
            Explore every feature <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}


/* ─────────────────────────  HERO  ──────────────────────── */
function Hero() {
  return (
    <section className="relative overflow-hidden mj-hero-gradient pt-16 pb-24 md:pt-24 md:pb-32">
      <div className="absolute -top-40 -right-20 h-[500px] w-[500px] rounded-full bg-lavender/25 blur-3xl" />
      <div className="absolute top-40 -left-32 h-96 w-96 rounded-full bg-peach/40 blur-3xl" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-5 text-center md:px-8">
        <div className="mj-fade-up mb-6 inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-3 py-1.5 ring-1 ring-hairline">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-lavender-deep opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-lavender-deep" />
          </span>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-lavender-deep">
            Live in Lahore · Pilot cohort open
          </span>
        </div>
        <h1 className="mj-fade-up mx-auto max-w-4xl text-balance text-4xl font-extrabold leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
          Be present for your parents,{" "}
          <span className="font-display font-semibold tracking-tight text-lavender-deep">
            from any distance.
          </span>
        </h1>
        <p className="mj-fade-up mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-ink-muted md:text-lg">
          The only home-care service for diaspora children with radical transparency - vetted
          nurses, live GPS check-ins, and photo-verified visits streamed to your phone in
          London, New York, or Dubai.
        </p>
        <div className="mj-fade-up mt-10 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
          <Link
            to="/how-it-works"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-bold text-cream shadow-xl shadow-ink/20 transition-all hover:-translate-y-0.5 sm:w-auto md:text-base"
          >
            See how it works
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            to="/pricing"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-hairline bg-white px-7 py-3.5 text-sm font-bold text-ink transition-all hover:bg-white/70 sm:w-auto md:text-base"
          >
            View plans
          </Link>
        </div>

        {/* Hero visual */}
        <div className="relative mt-16 w-full max-w-4xl md:mt-24">
          <div className="mj-float absolute -left-2 top-16 z-20 hidden w-52 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-black/5 md:block">
            <div className="mb-1 flex items-center justify-between">
              <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-ink-muted">
                Status
              </span>
              <span className="text-[9px] font-mono text-ink-muted">now</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500" />
              <p className="text-sm font-bold text-ink">Nurse arrived</p>
            </div>
            <p className="mt-1 text-[10px] text-ink-muted">DHA Phase 5 · GPS verified</p>
          </div>

          <div className="mj-float-slow absolute -right-2 top-40 z-20 hidden w-56 rounded-2xl mj-lav-gradient p-4 text-white shadow-2xl md:block">
            <div className="mb-2 flex items-start justify-between">
              <span className="font-mono text-[9px] font-semibold uppercase tracking-wider opacity-70">
                Vital signs
              </span>
              <span className="rounded-full bg-white/15 px-2 py-0.5 text-[9px]">Normal</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold">118/76</span>
              <span className="text-[10px] opacity-70">mmHg</span>
            </div>
            <div className="mt-2 grid grid-cols-6 gap-1">
              {[0.6, 0.9, 0.4, 0.75, 0.5, 0.85].map((h, i) => (
                <div
                  key={i}
                  className="h-6 rounded bg-white/60"
                  style={{ transform: `scaleY(${h})`, transformOrigin: "bottom" }}
                />
              ))}
            </div>
          </div>

          <div className="mj-float absolute -left-4 bottom-8 z-20 hidden w-44 rounded-2xl bg-peach-soft p-3.5 shadow-xl ring-1 ring-peach/30 lg:block">
            <div className="flex items-center gap-2">
              <Camera className="size-4 text-peach" />
              <span className="font-mono text-[9px] font-semibold uppercase text-peach">
                Photo proof
              </span>
            </div>
            <p className="mt-1 text-[11px] font-semibold text-ink leading-snug">
              Medicine confirmed · 4:02 PM
            </p>
          </div>

          <div className="mj-float-slow absolute -right-8 bottom-20 z-20 hidden w-40 rounded-2xl bg-mint/60 p-3.5 shadow-xl ring-1 ring-mint lg:block">
            <div className="flex items-center gap-2">
              <Heart className="size-4 text-emerald-700" />
              <span className="font-mono text-[9px] font-semibold uppercase text-emerald-800">
                72 bpm
              </span>
            </div>
            <p className="mt-1 text-[11px] font-semibold text-ink leading-snug">
              Steady all week
            </p>
          </div>

          <div className="mx-auto flex justify-center">
            <HeroPhoneCycle />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  MARQUEE  ──────────────────────── */
function Marquee() {
  const items = [
    "Vetted RNs & attendants",
    "Live GPS check-ins",
    "Photo-verified visits",
    "Errands wallet",
    "Rescue-1122 SOS",
    "Care Circle for siblings",
    "USD subscription",
    "Weekly doctor sync",
  ];
  return (
    <div className="border-y border-hairline bg-lavender-deep py-4 overflow-hidden">
      <div className="mj-marquee flex gap-10 whitespace-nowrap">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display font-semibold tracking-tight text-2xl text-white/90">{t}</span>
            <Sparkles className="size-4 text-white/50" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────  STATS  ──────────────────────── */
function StatsStrip() {
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard value="9M" label="Overseas Pakistanis worldwide" />
          <StatCard value="12" label="Hospital partners across Lahore" suffix="+" />
          <StatCard value="< 6" label="Minutes to nurse dispatch" />
          <StatCard value="24" label="Hour SOS coverage" suffix="/7" />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  QUICK FEATURES  ──────────────────────── */
function QuickFeatures() {
  return (
    <section className="py-24 md:py-28 bg-lavender-soft/40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-lavender-deep">
            Why Khaayaal
          </span>
          <h2 className="mt-4 text-balance text-3xl font-extrabold leading-tight md:text-5xl">
            The four things that let{" "}
            <span className="font-display font-semibold tracking-tight text-lavender-deep">
              you sleep through the night.
            </span>
          </h2>
        </div>
        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard variant="lavender" icon={<MapPin className="size-5" />} title="Live GPS" body="Every visit logged in real time. See the nurse move on the map." />
          <FeatureCard variant="peach" icon={<Camera className="size-5" />} title="Photo proof" body="Medicine, vitals, meals - captured and uploaded on every visit." />
          <FeatureCard variant="ink" icon={<Siren className="size-5" />} title="24/7 SOS" body="One tap dispatches Rescue-1122 and pings your whole Care Circle." />
          <FeatureCard variant="mint" icon={<Users className="size-5" />} title="Care Circle" body="Add siblings anywhere. Everyone sees the same updates." />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  HOW IT WORKS  ──────────────────────── */
function HowItWorks() {
  const steps = [
    { n: "01", t: "Book a visit", d: "Pick a vetted nurse from our roster. Schedule any time." },
    { n: "02", t: "Follow live", d: "Watch the nurse arrive on a live map with GPS check-ins." },
    { n: "03", t: "Get photo proof", d: "Vitals, medicine, and a personal note in seconds." },
  ];
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-cream md:py-32">
      <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-lavender/30 blur-3xl" />
      <div className="absolute bottom-10 left-0 h-96 w-96 rounded-full bg-peach/20 blur-3xl" />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-lavender">
            Three-step flow
          </span>
          <h2 className="mt-4 text-balance text-3xl font-extrabold leading-tight md:text-5xl">
            Three steps between{" "}
            <span className="font-display font-semibold tracking-tight text-lavender">your worry</span> and their care.
          </h2>
        </div>

        <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_1fr] lg:items-center">
          <ol className="space-y-10 lg:order-1">
            {steps.map((s) => (
              <li key={s.n} className="flex gap-5">
                <span className="font-display font-semibold tracking-tight text-4xl text-lavender leading-none">{s.n}</span>
                <div>
                  <h3 className="text-xl font-bold md:text-2xl">{s.t}</h3>
                  <p className="mt-2 text-cream/60 leading-relaxed">{s.d}</p>
                </div>
              </li>
            ))}
            <li>
              <Link
                to="/how-it-works"
                className="inline-flex items-center gap-1.5 rounded-full bg-lavender px-5 py-2.5 text-sm font-bold text-white"
              >
                Full walkthrough
                <ArrowUpRight className="size-4" />
              </Link>
            </li>
          </ol>

          <div className="relative order-first h-[540px] lg:order-2 lg:h-[600px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="mj-shuffle absolute">
                <PhoneFrame size="sm"><ScreenBook /></PhoneFrame>
              </div>
              <div className="mj-shuffle-1 absolute">
                <PhoneFrame size="sm"><ScreenTrack /></PhoneFrame>
              </div>
              <div className="mj-shuffle-2 absolute">
                <PhoneFrame size="sm"><ScreenReport /></PhoneFrame>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  TRUST CARDS  ──────────────────────── */
function TrustCards() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-lavender-deep">
            Built on trust
          </span>
          <h2 className="mt-4 text-balance text-3xl font-extrabold leading-tight md:text-5xl">
            Every promise is{" "}
            <span className="font-display font-semibold tracking-tight text-ink-muted">proven, not claimed.</span>
          </h2>
        </div>
        <div className="mt-16 grid gap-4 md:grid-cols-6">
          <FeatureCard
            className="md:col-span-4 md:row-span-2"
            big
            icon={<ShieldCheck className="size-5" />}
            title="Vetted, insured, continuous"
            body="Every attendant is background-checked, clinically credentialed, and insured. Your parents see the same trusted face on every visit."
          >
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { l: "Background checks", v: "Every hire" },
                { l: "Clinical creds", v: "PNC verified" },
                { l: "Insured", v: "$1M cover" },
                { l: "Continuity", v: "Same nurse" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl bg-lavender-soft px-4 py-3">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-lavender-deep">{s.l}</p>
                  <p className="mt-0.5 text-sm font-bold text-ink">{s.v}</p>
                </div>
              ))}
            </div>
          </FeatureCard>

          <FeatureCard
            className="md:col-span-2"
            variant="lavender"
            icon={<Camera className="size-5" />}
            title="Tamper-evident log"
            body="Every record is append-only and hash-chained. No edits, ever."
          />
          <FeatureCard
            className="md:col-span-2"
            variant="peach"
            icon={<Globe className="size-5" />}
            title="Time-zone aware"
            body="Reports land when you'll actually see them - not at 3am."
          />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  PRICING PREVIEW  ──────────────────────── */
function PricingPreview() {
  const tiers = [
    { n: "Concierge", p: "$149", tag: "Wedge", d: "Errands, bills, hospital escort. One dedicated agent." },
    { n: "Assurance", p: "$1,000", tag: "Essential", d: "Regular skilled visits with full transparency layer.", h: false },
    { n: "Guardian", p: "$1,500", tag: "Most popular", d: "Daily presence, physio, doctor sync, priority SOS.", h: true },
    { n: "Sanctuary", p: "$2,000", tag: "Live-in", d: "24/7 live-in care with weekly clinician oversight." },
  ];
  return (
    <section className="py-24 md:py-32 mj-hero-gradient">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col items-end justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-xl">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-lavender-deep">
              Choose your care
            </span>
            <h2 className="mt-3 text-balance text-3xl font-extrabold leading-tight md:text-5xl">
              Start small.{" "}
              <span className="font-display font-semibold tracking-tight text-ink-muted">
                Grow into full care.
              </span>
            </h2>
          </div>
          <Link
            to="/pricing"
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream"
          >
            Compare all plans <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((t) => (
            <div
              key={t.n}
              className={`mj-hover-lift relative flex flex-col rounded-3xl p-7 ${
                t.h
                  ? "mj-lav-gradient text-white shadow-2xl shadow-lavender/30 lg:-my-3 lg:py-10"
                  : "bg-white border border-hairline"
              }`}
            >
              {t.h && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-peach px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-ink">
                  {t.tag}
                </span>
              )}
              <p className={`font-mono text-[9px] font-bold uppercase tracking-[0.2em] ${t.h ? "text-white/70" : "text-ink-muted"}`}>
                {!t.h && t.tag}
              </p>
              <h3 className="mt-1 text-2xl font-bold">{t.n}</h3>
              <p className={`mt-4 text-4xl font-extrabold`}>{t.p}<span className={`text-sm font-normal ${t.h ? "text-white/60" : "text-ink-muted"}`}>/mo</span></p>
              <p className={`mt-3 text-sm leading-relaxed ${t.h ? "text-white/70" : "text-ink-muted"}`}>{t.d}</p>
              <Link
                to="/pricing"
                className={`mt-8 rounded-full py-3 text-center text-sm font-bold transition-all ${
                  t.h ? "bg-white text-lavender-deep" : "border border-ink text-ink hover:bg-ink hover:text-cream"
                }`}
              >
                See details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  TESTIMONIALS  ──────────────────────── */
function Testimonials() {
  const quotes = [
    { q: "I stopped waking up at 3am. The morning medicine photo IS the product for me.", n: "Hira A.", r: "London · Guardian" },
    { q: "My father won't tell me if he's unwell. Zoya does. That has changed our family.", n: "Omar S.", r: "Dubai · Assurance" },
    { q: "Cheaper than the guilt of not being there. I finally feel present, from Sydney.", n: "Nadia K.", r: "Sydney · Guardian" },
    { q: "The GPS check-in landing on my Apple Watch during a meeting - that's when I knew this was real.", n: "Faisal M.", r: "New York · Sanctuary" },
  ];
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-lavender-deep">
            Real families
          </span>
          <h2 className="mt-4 text-balance text-3xl font-extrabold leading-tight md:text-5xl">
            The distance{" "}
            <span className="font-display font-semibold tracking-tight text-ink-muted">
              stopped feeling so far.
            </span>
          </h2>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {quotes.map((q) => (
            <figure key={q.n} className="mj-hover-lift rounded-3xl border border-hairline bg-white p-7 md:p-9">
              <div className="mb-4 flex gap-0.5 text-peach">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <blockquote className="font-display font-semibold tracking-tight text-xl leading-relaxed text-ink md:text-2xl">
                “{q.q}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="size-10 rounded-full mj-lav-gradient" />
                <div>
                  <p className="text-sm font-bold text-ink">{q.n}</p>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                    {q.r}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  BIG CTA  ──────────────────────── */
function BigCTA() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] mj-lav-gradient p-10 md:p-16 text-white">
          <div className="absolute -top-20 -right-20 mj-blob mj-spin-slow size-72 bg-peach/50" />
          <div className="absolute -bottom-16 -left-10 mj-blob size-60 bg-white/10" />
          <div className="relative grid items-center gap-12 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-peach-soft">
                Pilot cohort now open
              </span>
              <h2 className="mt-4 text-balance text-4xl font-extrabold leading-tight md:text-6xl">
                Distance shouldn't{" "}
                <span className="font-display font-semibold tracking-tight text-peach-soft">mean doubt.</span>
              </h2>
              <p className="mt-6 max-w-xl text-lg text-white/70">
                Join the first families in Lahore's pilot cohort. Onboarding takes one call.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-lavender-deep transition-transform hover:-translate-y-0.5"
                >
                  Book pilot call <ArrowUpRight className="size-4" />
                </Link>
                <Link
                  to="/pricing"
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-6 py-3.5 text-sm font-bold text-white ring-1 ring-white/20"
                >
                  See plans
                </Link>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-xs">
              <div className="rounded-3xl bg-white p-5 rotate-3 shadow-2xl">
                <div className="grid aspect-square place-items-center rounded-2xl border-2 border-dashed border-lavender-deep/20">
                  <div className="grid size-32 grid-cols-8 gap-0.5">
                    {Array.from({ length: 64 }).map((_, i) => {
                      const on = ((i * 7 + Math.floor(i / 8)) % 3) !== 0;
                      return <div key={i} className={`aspect-square rounded-[1px] ${on ? "bg-ink" : ""}`} />;
                    })}
                  </div>
                </div>
                <p className="mt-4 text-center font-mono text-[10px] font-semibold uppercase tracking-widest text-ink">
                  Scan to join waitlist
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
