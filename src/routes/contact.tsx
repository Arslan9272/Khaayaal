import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock, MessageCircle, ArrowUpRight, Check } from "lucide-react";
import { PageHero, Scene3DBand } from "@/components/mojood/shared";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Khaayaal - Book a pilot call" },
      {
        name: "description",
        content:
          "Talk to the Khaayaal founding team. Book a 20-minute call to see how we care for your parents in Lahore while you're abroad.",
      },
      { property: "og:title", content: "Contact Khaayaal" },
      { property: "og:description", content: "Book a 20-minute pilot onboarding call." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Book a call"
        title="Let's talk about"
        italicTail="your parents."
        subtitle="A 20-minute call, no obligation. We'll walk you through the app, answer questions, and share the pilot cohort details."
      />
      <ContactGrid />
      <OfficesRow />
      <Scene3DBand
        variant="globe"
        title="From any city, to Lahore."
        body="Wherever you are - Toronto, Dubai, London, Sydney - one steady thread connects you to the team on the ground back home."
        reverse
      />
      <WhatsappBand />
    </>
  );
}

function ContactGrid() {
  const [sent, setSent] = useState(false);
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          {/* Form */}
          <div className="rounded-3xl bg-white border border-hairline p-8 md:p-10">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-lavender-deep">
              Send us a message
            </span>
            <h2 className="mt-3 text-3xl font-extrabold">We reply within 4 hours.</h2>
            {sent ? (
              <div className="mt-8 rounded-2xl bg-mint/40 border border-mint p-8 text-center">
                <div className="mx-auto grid size-12 place-items-center rounded-full bg-emerald-600 text-white">
                  <Check className="size-6" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-ink">Message sent.</h3>
                <p className="mt-2 text-sm text-ink-muted">
                  We'll be in touch within 4 hours. Check your inbox for the calendar link.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 rounded-full bg-ink px-5 py-2 text-sm font-semibold text-cream"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="mt-6 space-y-4"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Your name" placeholder="Hira Ahmed" required />
                  <Field label="Where are you?" placeholder="London, UK" required />
                </div>
                <Field label="Email" type="email" placeholder="you@example.com" required />
                <Field label="Phone (with country code)" placeholder="+44 7911 123456" />
                <Select
                  label="Which tier interests you?"
                  options={["Not sure yet", "Concierge - $300/mo", "Assurance - $350/mo", "Guardian - $475/mo", "Sanctuary - Contact for quote"]}
                />
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-ink">
                    Tell us about your parents
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Both parents in DHA, mid-70s, Ammi manages diabetes..."
                    className="w-full rounded-2xl border border-hairline bg-cream/40 px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:border-lavender focus:outline-none focus:ring-2 focus:ring-lavender/30 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-cream shadow-lg transition-transform hover:-translate-y-0.5"
                >
                  Send message <ArrowUpRight className="size-4" />
                </button>
              </form>
            )}
          </div>

          {/* Sidebar cards */}
          <div className="space-y-4">
            <div className="mj-hover-lift rounded-3xl mj-lav-gradient p-7 text-white">
              <div className="grid size-11 place-items-center rounded-2xl bg-white/20">
                <Mail className="size-5" />
              </div>
              <h3 className="mt-5 text-xl font-bold">Email</h3>
              <p className="mt-1 text-white/70 text-sm">Founding team responds directly.</p>
              <a href="mailto:hello@khaayaal.com" className="mt-4 inline-block font-display font-semibold tracking-tight text-2xl">
                hello@khaayaal.com
              </a>
            </div>

            <div className="mj-hover-lift rounded-3xl bg-white border border-hairline p-7">
              <div className="grid size-11 place-items-center rounded-2xl bg-lavender-soft text-lavender-deep">
                <Phone className="size-5" />
              </div>
              <h3 className="mt-5 text-xl font-bold">Phone / WhatsApp</h3>
              <p className="mt-1 text-ink-muted text-sm">UK, US, and PK numbers.</p>
              <p className="mt-4 font-display font-semibold tracking-tight text-2xl text-ink">+92 310 6997752</p>
            </div>

            <div className="mj-hover-lift rounded-3xl bg-peach-soft p-7 border border-peach/30">
              <div className="grid size-11 place-items-center rounded-2xl bg-peach text-white">
                <Clock className="size-5" />
              </div>
              <h3 className="mt-5 text-xl font-bold">Response time</h3>
              <p className="mt-1 text-ink/70 text-sm">Every enquiry gets a real human reply.</p>
              <p className="mt-4 font-display font-semibold tracking-tight text-2xl">Within 4 hours</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-ink">
        {label}
        {required && <span className="ml-0.5 text-lavender-deep">*</span>}
      </label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-full border border-hairline bg-cream/40 px-5 py-3 text-sm text-ink placeholder:text-ink-muted focus:border-lavender focus:outline-none focus:ring-2 focus:ring-lavender/30 transition-all"
      />
    </div>
  );
}

function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-ink">{label}</label>
      <select className="w-full rounded-full border border-hairline bg-cream/40 px-5 py-3 text-sm text-ink focus:border-lavender focus:outline-none focus:ring-2 focus:ring-lavender/30 transition-all">
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

function OfficesRow() {
  const offices = [
    { c: "Lahore", tag: "Care HQ", a: "DHA Phase 5, Lahore, Pakistan", t: "Ops & clinical operations" },
    { c: "London", tag: "Diaspora hub", a: "Marylebone, W1U, United Kingdom", t: "Growth & UK families" },
    { c: "Dubai", tag: "Gulf hub", a: "DIFC, Dubai, UAE", t: "Middle East family relations" },
  ];
  return (
    <section className="py-24 md:py-28 bg-lavender-soft/40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-lavender-deep">
            Where we are
          </span>
          <h2 className="mt-4 text-balance text-3xl font-extrabold leading-tight md:text-5xl">
            Rooted in Lahore.{" "}
            <span className="font-display font-semibold tracking-tight text-ink-muted">Present worldwide.</span>
          </h2>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {offices.map((o) => (
            <div key={o.c} className="mj-hover-lift rounded-3xl bg-white border border-hairline p-8">
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-lavender-deep">
                {o.tag}
              </span>
              <h3 className="mt-2 font-display font-semibold tracking-tight text-4xl text-ink">{o.c}</h3>
              <div className="mt-6 flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-lavender-deep" />
                <p className="text-sm text-ink-muted leading-relaxed">{o.a}</p>
              </div>
              <p className="mt-4 text-xs font-semibold text-ink">{o.t}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatsappBand() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <div className="rounded-[2rem] bg-ink p-10 md:p-14 text-cream flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-start gap-5">
            <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-mint/40 text-emerald-400">
              <MessageCircle className="size-6" />
            </div>
            <div>
              <h3 className="font-display font-semibold tracking-tight text-3xl md:text-4xl">Prefer WhatsApp?</h3>
              <p className="mt-2 text-cream/60">Send us a message - we're on WhatsApp Business.</p>
            </div>
          </div>
          <a
            href="https://wa.me/923106997752"
            className="rounded-full bg-mint px-6 py-3 text-sm font-bold text-ink inline-flex items-center gap-2 shrink-0"
          >
            Open WhatsApp <ArrowUpRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
