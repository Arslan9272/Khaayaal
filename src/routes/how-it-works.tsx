import { createFileRoute, Link } from "@tanstack/react-router";
import {
  MapPin,
  Camera,
  ClipboardCheck,
  Bell,
  Phone,
  FileText,
  ArrowUpRight,
  Check,
} from "lucide-react";
import { PhoneFrame } from "@/components/mojood/phone-frame";
import {
  ScreenBook,
  ScreenTrack,
  ScreenReport,
  ScreenMeds,
  ScreenCircle,
} from "@/components/mojood/phone-screens";
import { PageHero, FeatureCard, Scene3DBand } from "@/components/mojood/shared";
import { MedicineDelivery } from "@/components/mojood/medicine-delivery";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How Khaayaal works - from booking to photo-proof" },
      {
        name: "description",
        content:
          "Six-step flow: book a nurse, live GPS tracking, geofenced check-in, care visit, photo proof, and daily pulse to your family.",
      },
      { property: "og:title", content: "How Khaayaal works" },
      { property: "og:description", content: "Every step, from booking to photo-verified visit report." },
    ],
  }),
  component: HowItWorks,
});

function HowItWorks() {
  return (
    <>
      <PageHero
        eyebrow="From booking to proof"
        title="Six steps between"
        italicTail="your worry and their care."
        subtitle="Every visit follows the same rhythm - designed so nothing important is left to memory, and every family member gets the same view."
      />
      <StepsGrid />
      <Scene3DBand
        variant="route"
        title="Every visit, on rails."
        body="Nurse dispatched, ETA ticking, arrival stamped - watch each visit travel from booked to done, every single time."
      />
      <MedicineDelivery compact />
      <TimelineDetail />
      <PhoneShowcase />
      <FaqQuick />
      <BottomCTA />
    </>
  );
}

function StepsGrid() {
  const steps = [
    { i: <ClipboardCheck className="size-5" />, n: "01", t: "Book", d: "Pick a vetted nurse for the day and time you need. Add tasks or an ad-hoc request." },
    { i: <Bell className="size-5" />, n: "02", t: "Confirm", d: "Ops confirms the nurse in minutes. The family gets a scheduled reminder." },
    { i: <MapPin className="size-5" />, n: "03", t: "Track", d: "Nurse appears on your live map en route. GPS check-in fires the moment they arrive." },
    { i: <ClipboardCheck className="size-5" />, n: "04", t: "Visit", d: "Every task in the care plan is executed against completion protocols with evidence." },
    { i: <Camera className="size-5" />, n: "05", t: "Photo proof", d: "Medicine intake, vitals, meals - each captured and uploaded on the spot." },
    { i: <FileText className="size-5" />, n: "06", t: "Report", d: "Full session summary compiled and pushed to your Care Circle. Wallet reconciled." },
  ];
  return (
    <section className="py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className={`mj-hover-lift mj-card-shine relative overflow-hidden rounded-3xl p-8 ${
                i % 3 === 1 ? "mj-lav-gradient text-white" : "bg-white border border-hairline"
              }`}
            >
              <span
                className={`font-display font-semibold tracking-tight text-6xl leading-none ${
                  i % 3 === 1 ? "text-white/25" : "text-lavender/30"
                }`}
              >
                {s.n}
              </span>
              <div
                className={`mt-6 grid size-11 place-items-center rounded-2xl ${
                  i % 3 === 1 ? "bg-white/20 text-white" : "bg-lavender-soft text-lavender-deep"
                }`}
              >
                {s.i}
              </div>
              <h3 className="mt-4 text-xl font-bold">{s.t}</h3>
              <p className={`mt-2 text-sm leading-relaxed ${i % 3 === 1 ? "text-white/70" : "text-ink-muted"}`}>
                {s.d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineDetail() {
  const items = [
    { t: "09:32", h: "Booking created", d: "You add a Tuesday visit for Ammi and note she's low on her BP medication." },
    { t: "09:34", h: "Nurse confirmed", d: "Zoya - 8 years RN - accepts. The visit lands on your Care Circle timeline." },
    { t: "15:41", h: "En route", d: "Zoya's dot begins moving from her last visit. ETA updates live on your map." },
    { t: "16:00", h: "Geofenced check-in", d: "GPS fence at the house triggers automatically. You get a push notification." },
    { t: "16:07", h: "Medicine photo #1", d: "Amlodipine 5mg, taken with water. Photo, timestamp, and vitals attached." },
    { t: "16:45", h: "Visit summary", d: "BP 118/76, pulse 72, hydration good. Personal note from Zoya. Wallet: PKR 480 for medicine." },
  ];
  return (
    <section className="py-24 md:py-32 bg-lavender-soft/40">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-lavender-deep">
              Tuesday, 04 August · Ammi's visit
            </span>
            <h2 className="mt-4 text-balance text-3xl font-extrabold leading-tight md:text-5xl">
              A full visit,{" "}
              <span className="font-display font-semibold tracking-tight text-ink-muted">
                narrated to your phone.
              </span>
            </h2>
            <p className="mt-6 text-ink-muted">
              This is what a real visit looks like from your side of the world - every event
              logged, every action photographed.
            </p>
            <Link
              to="/features"
              className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream"
            >
              Explore all features <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <ol className="relative border-l-2 border-dashed border-lavender/40 pl-6">
            {items.map((it) => (
              <li key={it.t} className="relative mb-10 last:mb-0">
                <span className="absolute -left-[35px] top-1 grid size-6 place-items-center rounded-full bg-lavender-deep text-white text-[9px] font-bold ring-4 ring-lavender-soft">
                  •
                </span>
                <div className="rounded-2xl bg-white border border-hairline p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-lavender-deep">
                      {it.t}
                    </span>
                    <span className="rounded-full bg-mint/40 px-2 py-0.5 text-[9px] font-bold uppercase text-emerald-800">
                      Logged
                    </span>
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-ink">{it.h}</h3>
                  <p className="mt-1 text-sm text-ink-muted leading-relaxed">{it.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function PhoneShowcase() {
  const items = [
    { s: <ScreenBook />, t: "Choose a nurse", d: "Every attendant is vetted, credentialed, and scored on continuity with your family." },
    { s: <ScreenTrack />, t: "Watch them arrive", d: "Live map + ETA + geofenced check-in. No manual updates required." },
    { s: <ScreenMeds />, t: "Every medicine, timed", d: "Schedule, photo of intake, and missed-dose escalation to your Care Circle." },
    { s: <ScreenReport />, t: "The full report", d: "Vitals, photos, and a personal note pushed to everyone in seconds." },
    { s: <ScreenCircle />, t: "Family stays in sync", d: "Siblings in Dubai, London, and Toronto - one shared thread." },
  ];
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-lavender-deep">
            App tour
          </span>
          <h2 className="mt-4 text-balance text-3xl font-extrabold leading-tight md:text-5xl">
            Every screen{" "}
            <span className="font-display font-semibold tracking-tight text-ink-muted">
              designed to reduce anxiety.
            </span>
          </h2>
        </div>
        <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div key={it.t} className="text-center">
              <div className="mx-auto flex justify-center">
                <PhoneFrame size="sm">{it.s}</PhoneFrame>
              </div>
              <h3 className="mt-6 text-xl font-bold">{it.t}</h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed max-w-xs mx-auto">
                {it.d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqQuick() {
  const faq = [
    { q: "Do I pay in USD?", a: "Yes. Subscriptions charge in USD, GBP, or EUR - care is delivered in rupees in Lahore." },
    { q: "Same nurse every visit?", a: "Continuity is a core promise. Your parents see the same face every visit, with a scored bench for backup." },
    { q: "What about emergencies?", a: "A single SOS tap dispatches Rescue-1122 and notifies your full Care Circle in seconds." },
    { q: "Can multiple siblings join?", a: "Yes. Add unlimited family members to your Care Circle at no extra cost." },
  ];
  return (
    <section className="py-24 md:py-28 bg-lavender-soft/40">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <div className="text-center">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-lavender-deep">
            Quick answers
          </span>
          <h2 className="mt-4 text-balance text-3xl font-extrabold leading-tight md:text-4xl">
            The questions we hear most.
          </h2>
        </div>
        <div className="mt-12 space-y-3">
          {faq.map((f) => (
            <details
              key={f.q}
              className="mj-hover-lift group rounded-2xl border border-hairline bg-white p-5 open:bg-white"
            >
              <summary className="flex cursor-pointer items-center justify-between text-base font-bold text-ink">
                {f.q}
                <span className="ml-4 grid size-7 place-items-center rounded-full bg-lavender-soft text-lavender-deep transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function BottomCTA() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <div className="rounded-[2rem] bg-ink p-10 text-cream md:p-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 className="font-display font-semibold tracking-tight text-3xl md:text-4xl">Ready to see it live?</h3>
            <p className="mt-2 text-cream/60">A 20-minute call - no obligation.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="rounded-full bg-lavender px-6 py-3 text-sm font-bold text-white">Book a call</Link>
            <Link to="/pricing" className="rounded-full bg-white/10 px-6 py-3 text-sm font-bold text-white ring-1 ring-white/20">See plans</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
