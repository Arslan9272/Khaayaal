import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, ArrowUpRight, Star } from "lucide-react";
import { PageHero, Scene3DBand } from "@/components/mojood/shared";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Khaayaal tiers for every level of care" },
      {
        name: "description",
        content:
          "From $149 concierge to $2,000 24/7 sanctuary. Start small, grow into full clinical care as your parents' needs evolve.",
      },
      { property: "og:title", content: "Pricing — Khaayaal" },
      { property: "og:description", content: "Four tiers. USD billing. Transparent pricing." },
    ],
  }),
  component: Pricing,
});

const TIERS = [
  {
    n: "Concierge",
    tag: "Wedge",
    price: { monthly: 149, annual: 129 },
    d: "Errands, bills, hospital escort. One dedicated agent — WhatsApp-first.",
    features: [
      "1 dedicated agent",
      "Bills & documents management",
      "Hospital escort",
      "Weekly check-in call",
      "Care Circle for family",
      "WhatsApp-first ops",
    ],
    cta: "Start here",
    highlight: false,
  },
  {
    n: "Assurance",
    tag: "Essential",
    price: { monthly: 1000, annual: 850 },
    d: "Regular skilled visits, medicine oversight, and the full transparency layer.",
    features: [
      "2 weekly nurse visits",
      "Vital-sign tracking",
      "Medicine photo proof",
      "Live GPS check-ins",
      "Errands wallet",
      "24/7 SOS",
    ],
    cta: "Choose plan",
    highlight: false,
  },
  {
    n: "Guardian",
    tag: "Most popular",
    price: { monthly: 1500, annual: 1275 },
    d: "Daily presence, physio, doctor sync, priority emergency response.",
    features: [
      "Daily nurse attendant",
      "Physio (2×/week)",
      "Monthly doctor consult",
      "Priority SOS response",
      "Errands wallet",
      "Care Circle unlimited",
      "Weekly wellness digest",
    ],
    cta: "Choose plan",
    highlight: true,
  },
  {
    n: "Sanctuary",
    tag: "Live-in",
    price: { monthly: 2000, annual: 1700 },
    d: "24/7 live-in care with weekly clinician oversight and quarterly labs.",
    features: [
      "24/7 live-in attendant",
      "Weekly MD oversight",
      "Quarterly wellness labs",
      "Unlimited errands",
      "Priority ambulance",
      "White-glove onboarding",
    ],
    cta: "Talk to us",
    highlight: false,
  },
] as const;

function Pricing() {
  const [annual, setAnnual] = useState(false);
  const [spot, setSpot] = useState(2); // starts on "Guardian"
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setSpot((s) => (s + 1) % TIERS.length), 2600);
    return () => clearInterval(t);
  }, [paused]);
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Start small."
        italicTail="Grow into full care."
        subtitle="Paid in USD from abroad, delivered in rupees in Lahore. Cancel anytime — no long contracts."
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur p-1 ring-1 ring-hairline">
          <button
            onClick={() => setAnnual(false)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${!annual ? "bg-ink text-cream" : "text-ink-muted"}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${annual ? "bg-ink text-cream" : "text-ink-muted"}`}
          >
            Annual · save 15%
          </button>
        </div>
      </PageHero>

      <section className="py-20 md:py-24" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-8 flex flex-wrap items-center justify-center gap-2 text-center">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-lavender-deep">
              Auto-touring
            </span>
            <span className="font-mono text-[10px] text-ink-muted">— spotlight moves through each tier · hover to pause</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {TIERS.map((t, i) => {
              const spotOn = i === spot;
              return (
                <div
                  key={t.n}
                  onMouseEnter={() => setSpot(i)}
                  className={`mj-hover-lift relative flex flex-col rounded-3xl p-7 transition-all duration-500 ${
                    t.highlight
                      ? "mj-lav-gradient text-white shadow-2xl shadow-lavender/30 lg:-my-4 lg:py-11 ring-2 ring-peach"
                      : "bg-white border border-hairline"
                  } ${spotOn ? "-translate-y-2 scale-[1.02] ring-4 ring-lavender-deep/50 shadow-2xl" : ""}`}
                  style={{ zIndex: spotOn ? 20 : 1 }}
                >
                  {spotOn && (
                    <span className="absolute -top-3 left-4 flex items-center gap-1 rounded-full bg-ink px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-cream shadow-lg mj-pop">
                      <span className="size-1.5 rounded-full bg-mint animate-pulse" /> Matched
                    </span>
                  )}
                  {t.highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-peach px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-ink">
                      {t.tag}
                    </span>
                  )}
                  <p
                    className={`font-mono text-[9px] font-bold uppercase tracking-[0.2em] mb-3 ${
                      t.highlight ? "text-white/70" : "text-ink-muted"
                    }`}
                  >
                    {!t.highlight && t.tag}
                  </p>
                  <h3 className="text-2xl font-bold">{t.n}</h3>
                  <div className="mt-5 mb-1 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold">
                      ${annual ? t.price.annual : t.price.monthly}
                    </span>
                    <span className={`text-sm ${t.highlight ? "text-white/60" : "text-ink-muted"}`}>
                      /mo
                    </span>
                  </div>
                  {annual && (
                    <p className={`text-[10px] font-mono ${t.highlight ? "text-peach-soft" : "text-lavender-deep"}`}>
                      Billed annually
                    </p>
                  )}
                  <p
                    className={`mt-4 mb-6 text-sm leading-relaxed ${
                      t.highlight ? "text-white/70" : "text-ink-muted"
                    }`}
                  >
                    {t.d}
                  </p>
                  <ul className="mb-8 space-y-3 text-sm">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check
                          className={`mt-0.5 size-4 shrink-0 ${
                            t.highlight ? "text-peach-soft" : "text-lavender-deep"
                          }`}
                        />
                        <span className={t.highlight ? "text-white/90" : "text-ink"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className={`mt-auto rounded-full py-3 text-center text-sm font-bold transition-all ${
                      t.highlight
                        ? "bg-white text-lavender-deep hover:-translate-y-0.5"
                        : "border border-ink text-ink hover:bg-ink hover:text-cream"
                    }`}
                  >
                    {t.cta}
                  </Link>
                </div>
              );
            })}
          </div>
          {/* progress dots */}
          <div className="mt-10 flex items-center justify-center gap-2">
            {TIERS.map((_, i) => (
              <button
                key={i}
                onClick={() => setSpot(i)}
                aria-label={`Spotlight tier ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${i === spot ? "w-8 bg-lavender-deep" : "w-1.5 bg-ink/20 hover:bg-ink/40"}`}
              />
            ))}
          </div>
        </div>
      </section>

      <Scene3DBand
        variant="coins"
        eyebrow="Interactive · 3D"
        title="Tiers, stacked in the round."
        body="Spin the stack — Concierge to Sanctuary. Bigger discs mean more visits, closer eyes, deeper cover."
        reverse
      />
      <AddOns />
      <PriceFaq />
      <Testimonial />
    </>
  );
}

function AddOns() {
  const addons = [
    { t: "Physiotherapy visit", p: "$40" },
    { t: "Doctor home consult", p: "$60" },
    { t: "Wellness lab panel", p: "$85" },
    { t: "Overnight attendant", p: "$70" },
    { t: "Ambulance dispatch", p: "$120" },
    { t: "Emergency escalation", p: "$25" },
  ];
  return (
    <section className="py-24 md:py-28 bg-lavender-soft/40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-lavender-deep">
            Add-ons
          </span>
          <h2 className="mt-4 text-balance text-3xl font-extrabold leading-tight md:text-5xl">
            Bolt-on care{" "}
            <span className="font-display font-semibold tracking-tight text-ink-muted">on demand.</span>
          </h2>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {addons.map((a) => (
            <div
              key={a.t}
              className="mj-hover-lift flex items-center justify-between rounded-2xl border border-hairline bg-white p-6"
            >
              <div>
                <p className="font-bold text-ink">{a.t}</p>
                <p className="mt-1 text-xs text-ink-muted font-mono uppercase tracking-widest">
                  Per visit
                </p>
              </div>
              <p className="font-display font-semibold tracking-tight text-2xl text-lavender-deep">{a.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PriceFaq() {
  const faq = [
    { q: "How is payment handled?", a: "You pay in USD, GBP, or EUR by card or wire. We handle FX and pay Lahore staff in rupees." },
    { q: "Can I switch tiers?", a: "Yes — upgrade or downgrade any time from the app. Prorated on the same billing cycle." },
    { q: "Is there a setup fee?", a: "No. The first onboarding call is free and there are no long-term contracts." },
    { q: "What if my parents don't need it every day?", a: "Start with Concierge or Assurance. Add ad-hoc visits from the wallet as needed." },
    { q: "Do you cover other cities?", a: "Pilot is Lahore-only. Karachi and Islamabad are on the 2026 roadmap." },
    { q: "Refund policy?", a: "Cancel any time with a prorated refund for the unused portion of the month." },
  ];
  return (
    <section className="py-24 md:py-28">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <div className="text-center">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-lavender-deep">
            Pricing questions
          </span>
          <h2 className="mt-4 text-balance text-3xl font-extrabold leading-tight md:text-4xl">
            The details you'll actually want.
          </h2>
        </div>
        <div className="mt-12 space-y-3">
          {faq.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-hairline bg-white p-5">
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

function Testimonial() {
  return (
    <section className="py-24 md:py-28">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <div className="rounded-[2rem] bg-white border border-hairline p-10 md:p-14 text-center">
          <div className="flex justify-center gap-0.5 text-peach mb-6">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-5 fill-current" />)}
          </div>
          <blockquote className="font-display font-semibold tracking-tight text-2xl md:text-3xl text-ink leading-relaxed">
            “Cheaper than the guilt of not being there. And I finally feel present, even from Sydney.”
          </blockquote>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="size-10 rounded-full mj-lav-gradient" />
            <div className="text-left">
              <p className="text-sm font-bold text-ink">Nadia K.</p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">Sydney · Guardian tier</p>
            </div>
          </div>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-cream"
          >
            Talk to us <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
