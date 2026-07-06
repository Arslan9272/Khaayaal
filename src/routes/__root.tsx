import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="max-w-md text-center">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-lavender">
          404
        </p>
        <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight text-ink">Not present here</h1>
        <p className="mt-4 text-sm text-ink-muted">
          The page you're looking for has moved, or was never here.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream transition-transform hover:-translate-y-0.5"
          >
            Go home <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">Something didn't load</h1>
        <p className="mt-2 text-sm text-ink-muted">
          Try refreshing or head home. We'll look into it.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-lavender px-5 py-2.5 text-sm font-semibold text-white"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-full border border-hairline bg-white px-5 py-2.5 text-sm font-semibold text-ink"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Khaayaal — Be present for your parents, from any distance" },
      {
        name: "description",
        content:
          "Trusted home healthcare for elderly parents in Pakistan, built for diaspora families. Vetted nurses, live GPS tracking, photo-verified visits, and 24/7 SOS.",
      },
      { name: "author", content: "Khaayaal" },
      { property: "og:title", content: "Khaayaal — Presence knows no distance" },
      {
        property: "og:description",
        content:
          "Vetted nurses, live tracking, and photo-verified visits for your parents back home. Radical transparency for families abroad.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-cream font-sans text-ink">
        <SiteNav />
        <main>
          <div key={pathname} className="animate-fade-in">
            <Outlet />
          </div>
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}

/* ─────────────────────────  SHARED NAV  ──────────────────────── */
const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/features", label: "Features" },
  { to: "/pricing", label: "Pricing" },
  { to: "/trust", label: "Trust & Safety" },
  { to: "/contact", label: "Contact" },
] as const;

function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-cream/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="mj-lav-gradient grid size-8 place-items-center rounded-xl shadow-md shadow-lavender/30">
            <div className="size-2 rounded-full bg-white animate-pulse" />
          </div>
          <span className="text-lg font-bold tracking-tight md:text-xl">
            Khaayaal
            <span className="ml-1 font-display font-semibold tracking-tight text-ink-muted text-base">
              آپ کے ساتھ
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-ink-muted transition-colors hover:text-ink"
              activeProps={{ className: "text-ink font-semibold" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream transition-transform hover:-translate-y-0.5"
          >
            Book a call
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <button
          className="rounded-lg p-2 text-ink lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-hairline bg-cream lg:hidden">
          <div className="flex flex-col gap-1 px-5 py-4">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-muted hover:bg-white"
                activeProps={{ className: "bg-lavender-soft text-ink font-semibold" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-ink px-5 py-3 text-center text-sm font-semibold text-cream"
            >
              Book a call
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

/* ─────────────────────────  SHARED FOOTER  ──────────────────────── */
function SiteFooter() {
  const cols = [
    { h: "Product", l: [
      { t: "How it works", to: "/how-it-works" as const },
      { t: "Features", to: "/features" as const },
      { t: "Pricing", to: "/pricing" as const },
      { t: "Trust & Safety", to: "/trust" as const },
    ]},
    { h: "Company", l: [
      { t: "Contact", to: "/contact" as const },
      { t: "Careers", to: "/contact" as const },
      { t: "Press", to: "/contact" as const },
      { t: "Partners", to: "/trust" as const },
    ]},
  ];
  return (
    <footer className="border-t border-hairline bg-cream-warm">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr_1.2fr]">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="mj-lav-gradient grid size-8 place-items-center rounded-xl shadow-md shadow-lavender/30">
                <div className="size-2 rounded-full bg-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                Khaayaal
                <span className="ml-1 font-display font-semibold tracking-tight text-ink-muted text-base">
                  آپ کے ساتھ
                </span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-ink-muted">
              Present for your parents in Lahore, wherever you are in the world.
            </p>
            <p className="mt-4 font-display font-semibold tracking-tight text-lg text-lavender-deep">
              “When you cannot be there, we are present.”
            </p>
          </div>
          {cols.map((col) => (
            <div key={col.h}>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink-muted">
                {col.h}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.l.map((i) => (
                  <li key={i.t}>
                    <Link to={i.to} className="text-sm text-ink hover:text-lavender-deep">
                      {i.t}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink-muted">
              Get the app
            </p>
            <div className="mt-4 space-y-2">
              <div className="rounded-2xl bg-ink px-4 py-3 text-cream">
                <p className="font-mono text-[9px] uppercase opacity-60">Coming soon</p>
                <p className="text-sm font-bold">App Store</p>
              </div>
              <div className="rounded-2xl bg-ink px-4 py-3 text-cream">
                <p className="font-mono text-[9px] uppercase opacity-60">Coming soon</p>
                <p className="text-sm font-bold">Google Play</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-hairline pt-8 md:flex-row md:items-center">
          <p className="text-xs text-ink-muted">
            © 2026 Khaayaal Health Pvt. Ltd. Pilot market: Lahore.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
            Made with care · Lahore & abroad
          </p>
        </div>
      </div>
    </footer>
  );
}
