import { createFileRoute, Link } from "@tanstack/react-router";
import {
  MapPin,
  ShieldCheck,
  Camera,
  Siren,
  Users,
  Wallet,
  Pill,
  Heart,
  ClipboardList,
  Bell,
  Lock,
  Globe,
  FileText,
  ArrowUpRight,
} from "lucide-react";
import { PageHero, FeatureCard, Scene3DBand } from "@/components/mojood/shared";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — Khaayaal transparency engine" },
      {
        name: "description",
        content:
          "Live GPS, photo proof, Care Circle, errands wallet, SOS, medicine tracking, and more. Every feature designed for diaspora peace of mind.",
      },
      { property: "og:title", content: "Features — Khaayaal" },
      { property: "og:description", content: "Every feature that turns anxiety into presence." },
    ],
  }),
  component: FeaturesPage,
});

function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="The transparency engine"
        title="Everything you need."
        italicTail="Nothing they don't."
        subtitle="An ecosystem designed for the specific anxieties of long-distance eldercare — from the first booking to the daily pulse that lands on your phone."
      />
      <Scene3DBand
        variant="pills"
        eyebrow="Interactive · 3D"
        title="A living medicine cabinet."
        body="Every prescription, refill and reminder — orbiting your parent's daily rhythm. Drag to rotate the shelf."
      />
      <BentoOne />
      <CategoryStrip />
      <BentoTwo />
      <ComparisonTable />
      <MiniCta />
    </>
  );
}

function BentoOne() {
  return (
    <section className="py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-4 md:grid-cols-6">
          <FeatureCard
            className="md:col-span-4 md:row-span-2"
            big
            icon={<MapPin className="size-5" />}
            title="Geofenced GPS check-ins"
            body="Every visit is verified against your parents' address. You'll know exactly when our staff enters, works, and leaves — no manual logs, only truth."
          >
            <div className="relative mt-8 h-56 overflow-hidden rounded-2xl bg-lavender-soft">
              <div
                className="absolute inset-0 opacity-50"
                style={{ backgroundImage: "radial-gradient(circle, oklch(0.55 0.18 295 / 0.15) 1px, transparent 1px)", backgroundSize: "18px 18px" }}
              />
              <svg viewBox="0 0 500 220" className="absolute inset-0 h-full w-full">
                <path
                  d="M 50 180 Q 180 130 250 100 T 460 40"
                  stroke="oklch(0.55 0.18 295)"
                  strokeWidth="3"
                  strokeDasharray="7 5"
                  fill="none"
                />
              </svg>
              <div className="absolute right-10 top-6 grid size-10 place-items-center rounded-lg bg-white shadow-md">
                <div className="size-3 rounded-sm bg-ink" />
              </div>
              <div className="absolute bottom-8 left-10">
                <div className="relative">
                  <div className="mj-pulse-ring absolute inset-0 size-12 text-lavender-deep" />
                  <div className="relative grid size-12 place-items-center rounded-full bg-lavender-deep shadow-lg ring-4 ring-white">
                    <MapPin className="size-6 text-white" strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            </div>
          </FeatureCard>

          <FeatureCard variant="lavender" className="md:col-span-2" icon={<Siren className="size-5" />} title="Rescue-1122 SOS" body="One tap dispatches Lahore's emergency services and pings your Care Circle instantly." />
          <FeatureCard variant="peach" className="md:col-span-2" icon={<Camera className="size-5" />} title="Photo-proof of care" body="Medicine, meals, and vitals captured and uploaded on every visit." />

          <FeatureCard variant="ink" className="md:col-span-3" icon={<Users className="size-5" />} title="Care Circle for siblings" body="Add your brother in Dubai and sister in Toronto to one shared dashboard.">
            <div className="mt-6 flex -space-x-2">
              {["oklch(0.72 0.14 295)", "oklch(0.88 0.08 45)", "oklch(0.86 0.09 165)", "oklch(0.55 0.18 295)", "oklch(0.72 0.05 30)"].map((c, i) => (
                <div key={i} className="size-10 rounded-full ring-3 ring-ink" style={{ background: c }} />
              ))}
              <div className="grid size-10 place-items-center rounded-full bg-white/10 ring-3 ring-ink text-[10px] font-bold text-cream">+3</div>
            </div>
          </FeatureCard>

          <FeatureCard variant="mint" className="md:col-span-3" icon={<Wallet className="size-5" />} title="Errands wallet" body="Pre-fund groceries, medicines, utility bills. Every rupee logged with receipt." />
        </div>
      </div>
    </section>
  );
}

function CategoryStrip() {
  const cats = [
    { i: <Heart className="size-4" />, t: "Clinical" },
    { i: <MapPin className="size-4" />, t: "Location" },
    { i: <Camera className="size-4" />, t: "Evidence" },
    { i: <Users className="size-4" />, t: "Family" },
    { i: <Wallet className="size-4" />, t: "Money" },
    { i: <Lock className="size-4" />, t: "Safety" },
  ];
  return (
    <section className="border-y border-hairline bg-lavender-deep py-4 overflow-hidden">
      <div className="mj-marquee flex gap-8 whitespace-nowrap">
        {[...cats, ...cats, ...cats].map((c, i) => (
          <span key={i} className="flex items-center gap-3 text-white/90">
            {c.i}
            <span className="font-display font-semibold tracking-tight text-2xl">{c.t}</span>
            <span className="text-white/30">·</span>
          </span>
        ))}
      </div>
    </section>
  );
}

function BentoTwo() {
  return (
    <section className="py-24 md:py-32 bg-lavender-soft/40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-lavender-deep">
            Every corner of care
          </span>
          <h2 className="mt-4 text-balance text-3xl font-extrabold leading-tight md:text-5xl">
            More than the clinical.{" "}
            <span className="font-display font-semibold tracking-tight text-ink-muted">
              The whole life.
            </span>
          </h2>
        </div>
        <div className="mt-16 grid gap-4 md:grid-cols-3">
          <FeatureCard icon={<Pill className="size-5" />} title="Medicine tracking" body="Schedules, photo confirmation, missed-dose escalation, refill nudges." />
          <FeatureCard icon={<Heart className="size-5" />} title="Vitals & wellness" body="BP, sugar, pulse, weight, sleep — trended weekly with alerts on anomalies." />
          <FeatureCard icon={<ClipboardList className="size-5" />} title="Care plans" body="Doctor-led plans encoded into daily task lists — nothing forgotten." />
          <FeatureCard icon={<Bell className="size-5" />} title="Smart reminders" body="Family and nurse notifications tuned to your time zone, not theirs." />
          <FeatureCard icon={<FileText className="size-5" />} title="Tamper-evident log" body="Append-only, hash-chained audit trail. Records can never be silently edited." />
          <FeatureCard icon={<ShieldCheck className="size-5" />} title="Vetted, insured" body="Background checks, clinical creds, $1M liability cover on every visit." />
          <FeatureCard icon={<Globe className="size-5" />} title="Cross-border payments" body="Pay in USD, GBP, EUR. Delivered in rupees with FX handled transparently." />
          <FeatureCard icon={<Lock className="size-5" />} title="Privacy first" body="Every photo and note is family-only. Nurses never see other families' data." />
          <FeatureCard icon={<Camera className="size-5" />} title="Video visits (soon)" body="Live video check-ins for the moments a photo can't capture." />
        </div>
      </div>
    </section>
  );
}

function ComparisonTable() {
  const rows = [
    { f: "Live GPS tracking", m: true, a: false, i: false },
    { f: "Photo-verified visits", m: true, a: false, i: false },
    { f: "Care Circle (multi-sibling)", m: true, a: false, i: false },
    { f: "Errands + medical bundled", m: true, a: false, i: false },
    { f: "USD subscription", m: true, a: false, i: false },
    { f: "24/7 SOS with Rescue-1122", m: true, a: true, i: false },
    { f: "Trained clinical nurse", m: true, a: true, i: false },
    { f: "Tamper-evident audit log", m: true, a: false, i: false },
  ];
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-lavender-deep">
            Compared
          </span>
          <h2 className="mt-4 text-balance text-3xl font-extrabold leading-tight md:text-5xl">
            The gap is{" "}
            <span className="font-display font-semibold tracking-tight text-ink-muted">wider than it looks.</span>
          </h2>
        </div>
        <div className="mt-14 overflow-hidden rounded-3xl border border-hairline bg-white">
          <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] items-center gap-4 border-b border-hairline p-5 bg-lavender-soft/60">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-muted">Feature</span>
            <span className="text-center font-bold text-lavender-deep">Khaayaal</span>
            <span className="text-center font-medium text-ink-muted">Local agency</span>
            <span className="text-center font-medium text-ink-muted">Informal help</span>
          </div>
          {rows.map((r) => (
            <div
              key={r.f}
              className="grid grid-cols-[1.5fr_1fr_1fr_1fr] items-center gap-4 border-b border-hairline last:border-b-0 p-5 hover:bg-lavender-soft/20 transition-colors"
            >
              <span className="text-sm font-semibold text-ink">{r.f}</span>
              <span className="text-center">
                {r.m ? (
                  <span className="inline-grid size-7 place-items-center rounded-full bg-lavender-deep text-white">✓</span>
                ) : (
                  <span className="text-ink-muted">—</span>
                )}
              </span>
              <span className="text-center">
                {r.a ? (
                  <span className="inline-grid size-7 place-items-center rounded-full bg-mint/50 text-emerald-800">✓</span>
                ) : (
                  <span className="text-ink-muted">—</span>
                )}
              </span>
              <span className="text-center">
                {r.i ? (
                  <span className="inline-grid size-7 place-items-center rounded-full bg-mint/50 text-emerald-800">✓</span>
                ) : (
                  <span className="text-ink-muted">—</span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MiniCta() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <div className="rounded-[2rem] mj-lav-gradient p-10 md:p-14 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 className="font-display font-semibold tracking-tight text-3xl md:text-4xl">Every feature. One monthly plan.</h3>
            <p className="mt-2 text-white/70">Start with concierge. Grow into full care.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/pricing" className="rounded-full bg-white px-6 py-3 text-sm font-bold text-lavender-deep">See pricing</Link>
            <Link to="/contact" className="rounded-full bg-white/10 px-6 py-3 text-sm font-bold text-white ring-1 ring-white/20 inline-flex items-center gap-1.5">Book a call <ArrowUpRight className="size-4" /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
