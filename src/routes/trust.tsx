import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Lock, FileText, Award, Camera, Siren, Heart, Users, ArrowUpRight } from "lucide-react";
import { PageHero, FeatureCard, StatCard, Scene3DBand } from "@/components/mojood/shared";

export const Route = createFileRoute("/trust")({
  head: () => ({
    meta: [
      { title: "Trust & Safety — Khaayaal safeguards" },
      {
        name: "description",
        content:
          "Every attendant vetted. Every visit logged. Every record tamper-evident. How Khaayaal earns trust by proving it, not claiming it.",
      },
      { property: "og:title", content: "Trust & Safety — Khaayaal" },
      { property: "og:description", content: "Vetting, insurance, safeguarding, and audit trails you can inspect." },
    ],
  }),
  component: TrustPage,
});

function TrustPage() {
  return (
    <>
      <PageHero
        eyebrow="Trust & safety"
        title="Every promise is"
        italicTail="proven, not claimed."
        subtitle="Radical transparency starts on our side too — how we vet, insure, escalate, and safeguard your parents' care."
      />
      <StatsRow />
      <Pillars />
      <Scene3DBand
        variant="shield"
        title="The shield, in three dimensions."
        body="Background checks, insurance, license verification and SOS — one shield you can turn over in your hands."
      />
      <VettingProcess />
      <PartnerLogos />
      <SafetyPromise />
      <TrustCTA />
    </>
  );
}

function StatsRow() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard value="100" label="Percent background-checked" suffix="%" />
          <StatCard value="$1M" label="Liability coverage per visit" />
          <StatCard value="12" label="Hospital partners in Lahore" suffix="+" />
          <StatCard value="< 5" label="Minute SOS response window" />
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  return (
    <section className="py-20 md:py-24 bg-lavender-soft/40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-lavender-deep">
            Four pillars
          </span>
          <h2 className="mt-4 text-balance text-3xl font-extrabold leading-tight md:text-5xl">
            The safeguards behind{" "}
            <span className="font-display font-semibold tracking-tight text-ink-muted">every visit.</span>
          </h2>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard icon={<ShieldCheck className="size-5" />} title="Vetted staff" body="Background checks, clinical creds, reference calls, and quality scoring." />
          <FeatureCard variant="lavender" icon={<Lock className="size-5" />} title="Insured & bonded" body="$1M liability cover on every visit. Rapid incident response protocols." />
          <FeatureCard variant="peach" icon={<FileText className="size-5" />} title="Tamper-evident log" body="Hash-chained records. Nothing can be silently edited after the fact." />
          <FeatureCard variant="ink" icon={<Award className="size-5" />} title="Safeguarding SOPs" body="Elderly-abuse detection, incident triage, and family notification within minutes." />
        </div>
      </div>
    </section>
  );
}

function VettingProcess() {
  const steps = [
    { n: "01", t: "Application & references", d: "Every candidate submits a full CV plus two clinical references we call and verify." },
    { n: "02", t: "Background check", d: "NADRA verification, police clearance, and prior-employer checks — all before day one." },
    { n: "03", t: "Clinical credentialing", d: "PNC (Pakistan Nursing Council) registration verified. Skills matrix scored by our RN lead." },
    { n: "04", t: "Cultural onboarding", d: "Elderly-care ethics, dignity training, and Khaayaal-specific SOPs before any live visit." },
    { n: "05", t: "Live scoring", d: "Every visit rated by family and reviewed. Continuous quality feedback loop." },
    { n: "06", t: "Continuous audit", d: "Monthly file review, spot check-ins, and re-training on any incident." },
  ];
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-lavender-deep">
            Our vetting flow
          </span>
          <h2 className="mt-4 text-balance text-3xl font-extrabold leading-tight md:text-5xl">
            Six checkpoints{" "}
            <span className="font-display font-semibold tracking-tight text-ink-muted">before day one.</span>
          </h2>
        </div>
        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className={`mj-hover-lift mj-card-shine relative overflow-hidden rounded-3xl p-8 ${
                i % 3 === 1 ? "mj-lav-gradient text-white" : "bg-white border border-hairline"
              }`}
            >
              <span className={`font-display font-semibold tracking-tight text-6xl leading-none ${i % 3 === 1 ? "text-white/25" : "text-lavender/30"}`}>{s.n}</span>
              <h3 className="mt-4 text-xl font-bold">{s.t}</h3>
              <p className={`mt-2 text-sm leading-relaxed ${i % 3 === 1 ? "text-white/70" : "text-ink-muted"}`}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnerLogos() {
  const partners = ["INDUS Hospital", "SKMCH", "Aga Khan Health", "Doctors Hospital", "Rescue-1122", "LNH", "PSCA Safety", "Chughtai Lab"];
  return (
    <section className="py-16 md:py-20 bg-cream-warm border-y border-hairline">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="text-center font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-ink-muted">
          Partnered with Pakistan's finest institutions
        </p>
        <div className="mt-8 grid grid-cols-2 items-center gap-6 md:grid-cols-4">
          {partners.map((p) => (
            <div key={p} className="rounded-2xl bg-white p-5 border border-hairline text-center">
              <p className="font-display font-semibold tracking-tight text-lg text-ink">{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SafetyPromise() {
  const promises = [
    { i: <Camera className="size-5" />, t: "You always see what we see", d: "Every photo, vital, and note pushed to your Care Circle in real time." },
    { i: <Siren className="size-5" />, t: "Emergencies escalate in seconds", d: "SOS taps notify Rescue-1122, on-call clinician, and every family member." },
    { i: <Heart className="size-5" />, t: "Dignity is non-negotiable", d: "Elderly-care ethics training on day one. Any breach is a same-day investigation." },
    { i: <Users className="size-5" />, t: "You are always the boss", d: "Reject a nurse, pause a plan, change tier — no friction, no negotiation." },
  ];
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-lavender-deep">
            Our promises
          </span>
          <h2 className="mt-4 text-balance text-3xl font-extrabold leading-tight md:text-5xl">
            Four things we will{" "}
            <span className="font-display font-semibold tracking-tight text-ink-muted">never compromise on.</span>
          </h2>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {promises.map((p) => (
            <div key={p.t} className="mj-hover-lift rounded-3xl bg-white border border-hairline p-8 flex gap-5">
              <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-lavender-soft text-lavender-deep">
                {p.i}
              </div>
              <div>
                <h3 className="text-xl font-bold">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{p.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustCTA() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <div className="rounded-[2rem] mj-lav-gradient p-10 md:p-14 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 className="font-display font-semibold tracking-tight text-3xl md:text-4xl">Want a nurse dossier?</h3>
            <p className="mt-2 text-white/70">We'll share vetting details and credentials for the nurse assigned to you.</p>
          </div>
          <Link
            to="/contact"
            className="rounded-full bg-white px-6 py-3 text-sm font-bold text-lavender-deep inline-flex items-center gap-2"
          >
            Request a dossier <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
