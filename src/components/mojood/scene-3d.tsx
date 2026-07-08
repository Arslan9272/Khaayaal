import { Suspense, lazy, useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import posterHeart from "@/assets/posters/poster-heart.jpg";
import posterPills from "@/assets/posters/poster-pills.jpg";
import posterRoute from "@/assets/posters/poster-route.jpg";
import posterCoins from "@/assets/posters/poster-coins.jpg";
import posterShield from "@/assets/posters/poster-shield.jpg";
import posterGlobe from "@/assets/posters/poster-globe.jpg";

const Inner = lazy(() => import("./scene-3d-inner"));
// Warm up the chunk on idle so first paint of any Scene3D is instant.
if (typeof window !== "undefined") {
  const warm = () => { void import("./scene-3d-inner"); };
  if ("requestIdleCallback" in window) (window as any).requestIdleCallback(warm, { timeout: 1500 });
  else setTimeout(warm, 300);
}

const POSTERS: Record<Scene3DVariant, string> = {
  heart: posterHeart,
  pills: posterPills,
  route: posterRoute,
  coins: posterCoins,
  shield: posterShield,
  globe: posterGlobe,
};

export type Scene3DVariant =
  | "heart"
  | "pills"
  | "route"
  | "coins"
  | "shield"
  | "globe";

interface Props {
  variant?: Scene3DVariant;
  className?: string;
  style?: CSSProperties;
  interactive?: boolean;
  height?: number | string;
}

export function Scene3D({
  variant = "heart",
  className,
  style,
  interactive = true,
  height = 380,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || inView) return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "800px 0px", threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mounted, inView]);

  return (
    <div
      ref={ref}
      className={cn(
        "relative block w-full overflow-hidden rounded-3xl bg-cream isolate",
        className,
      )}
      style={{ height, minHeight: height, ...style }}
    >
      {/* Backdrop always present so the section is visible even before/if 3D fails */}
      <div aria-hidden className="absolute inset-0 z-0 mj-lav-gradient opacity-90">
        <div className="absolute inset-0 mj-noise opacity-30" />
      </div>

      {/* Poster fallback - lightweight static image shown while canvas loads */}
      <div
        aria-hidden={ready}
        className={cn(
          "absolute inset-0 z-[5] transition-opacity duration-700 ease-out",
          ready ? "pointer-events-none opacity-0" : "opacity-100",
        )}
      >
        <img
          src={POSTERS[variant]}
          alt=""
          className="h-full w-full object-cover"
          width={1024}
          height={1024}
          decoding="async"
        />
        <div className="absolute inset-0 bg-cream/10" />
      </div>

      {/* 3D canvas layer */}
      {mounted && inView && (
        <div className="absolute inset-0 z-10">
          <Suspense fallback={null}>
            <Inner variant={variant} interactive={interactive} onReady={() => setReady(true)} />
          </Suspense>
        </div>
      )}

      {/* Badge */}
      <div className="pointer-events-none absolute bottom-3 right-3 z-20 rounded-full bg-white/70 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-lavender-deep backdrop-blur">
        {interactive ? "Drag · Interact" : "3D"}
      </div>
    </div>
  );
}
