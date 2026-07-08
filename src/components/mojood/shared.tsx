import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AnimatedScene, type SceneVariant } from "./animated-scenes";

export function Scene3DBand({
  variant,
  eyebrow = "Live · Animated",
  title,
  body,
  reverse = false,
}: {
  variant: SceneVariant;
  eyebrow?: string;
  title: string;
  body: string;
  reverse?: boolean;
}) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div
          className={cn(
            "grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center",
            reverse && "lg:[&>*:first-child]:order-2",
          )}
        >
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-lavender-deep">
              {eyebrow}
            </span>
            <h2 className="mt-3 text-balance text-3xl font-extrabold leading-tight md:text-5xl">
              {title}
            </h2>
            <p className="mt-4 max-w-lg text-ink-muted md:text-lg">{body}</p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ink ring-1 ring-hairline">
              <span className="size-1.5 rounded-full bg-lavender-deep animate-pulse" />
              Always in motion
            </p>
          </div>
          <AnimatedScene
            variant={variant}
            height={420}
            className="ring-1 ring-hairline shadow-2xl shadow-lavender/20"
          />
        </div>
      </div>
    </section>
  );
}

export function PageHero({
  eyebrow,
  title,
  italicTail,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  italicTail?: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden mj-hero-gradient pt-16 pb-20 md:pt-24 md:pb-28">
      <div className="absolute -top-32 -right-20 h-96 w-96 rounded-full bg-lavender/25 blur-3xl" />
      <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-peach/30 blur-3xl" />
      <div className="relative mx-auto max-w-4xl px-5 text-center md:px-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-lavender-deep ring-1 ring-hairline">
          <span className="size-1.5 rounded-full bg-lavender-deep" />
          {eyebrow}
        </span>
        <h1 className="mt-6 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
          {title}
          {italicTail && (
            <>
              {" "}
              <span className="font-display font-semibold tracking-tight text-lavender-deep">
                {italicTail}
              </span>
            </>
          )}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-ink-muted md:text-lg">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  italicTail,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  italicTail?: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={cn("mx-auto max-w-3xl", align === "center" ? "text-center" : "text-left mx-0")}>
      {eyebrow && (
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-lavender-deep">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 text-balance text-3xl font-extrabold leading-tight md:text-5xl">
        {title}
        {italicTail && (
          <>
            {" "}
            <span className="font-display font-semibold tracking-tight text-ink-muted">{italicTail}</span>
          </>
        )}
      </h2>
      {subtitle && <p className="mt-4 text-ink-muted md:text-lg">{subtitle}</p>}
    </div>
  );
}

/* Reusable feature card variants */
type Variant = "default" | "lavender" | "peach" | "ink" | "mint";

const variantMap: Record<Variant, string> = {
  default: "bg-white border border-hairline text-ink",
  lavender: "mj-lav-gradient text-white",
  peach: "bg-peach-soft text-ink border border-peach/30",
  ink: "bg-ink text-cream",
  mint: "bg-mint/40 text-ink border border-mint",
};

const iconVariantMap: Record<Variant, string> = {
  default: "bg-lavender-soft text-lavender-deep",
  lavender: "bg-white/20 text-white",
  peach: "bg-peach text-white",
  ink: "bg-white/10 text-cream",
  mint: "bg-emerald-600 text-white",
};

export function FeatureCard({
  icon,
  title,
  body,
  variant = "default",
  className,
  children,
  big = false,
}: {
  icon: ReactNode;
  title: string;
  body: string;
  variant?: Variant;
  className?: string;
  children?: ReactNode;
  big?: boolean;
}) {
  return (
    <div
      className={cn(
        "mj-hover-lift mj-card-shine rounded-3xl p-7 md:p-8",
        variantMap[variant],
        className,
      )}
    >
      <div className={cn("grid size-11 place-items-center rounded-2xl", iconVariantMap[variant])}>
        {icon}
      </div>
      <h3 className={cn("mt-5 font-bold leading-snug", big ? "text-2xl md:text-3xl" : "text-lg")}>
        {title}
      </h3>
      <p
        className={cn(
          "mt-2 leading-relaxed",
          variant === "default" && "text-ink-muted",
          variant === "lavender" && "text-white/70",
          variant === "peach" && "text-ink/70",
          variant === "ink" && "text-cream/60",
          variant === "mint" && "text-ink/70",
          big ? "text-base max-w-md" : "text-sm",
        )}
      >
        {body}
      </p>
      {children}
    </div>
  );
}

/* Stat card */
export function StatCard({
  value,
  label,
  suffix,
}: {
  value: string;
  label: string;
  suffix?: string;
}) {
  return (
    <div className="mj-hover-lift rounded-3xl bg-white p-6 border border-hairline">
      <p className="font-display font-semibold tracking-tight text-4xl md:text-5xl text-lavender-deep leading-none">
        {value}
        {suffix && <span className="text-2xl text-ink-muted">{suffix}</span>}
      </p>
      <p className="mt-3 text-sm font-medium text-ink-muted">{label}</p>
    </div>
  );
}

/* CTA band shared across pages */
export function CTABand({
  eyebrow = "Ready when you are",
  title,
  italicTail,
  primary,
  secondary,
}: {
  eyebrow?: string;
  title: string;
  italicTail?: string;
  primary: { to: string; label: string };
  secondary?: { to: string; label: string };
}) {
  return null; /* placeholder - implemented inline where needed to keep Link typed */
}
