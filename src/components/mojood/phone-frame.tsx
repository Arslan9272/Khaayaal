import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PhoneFrameProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function PhoneFrame({ children, className, size = "md" }: PhoneFrameProps) {
  const sizes = {
    sm: "w-[180px] aspect-[9/19]",
    md: "w-[210px] aspect-[9/19]",
    lg: "w-[230px] md:w-[260px] aspect-[9/19]",
  };
  return (
    <div
      className={cn(
        "relative rounded-[2.5rem] bg-[oklch(0.15_0.02_285)] p-2.5 ring-[6px] ring-[oklch(0.15_0.02_285/0.06)] shadow-2xl shadow-lavender/20",
        sizes[size],
        className,
      )}
    >
      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30 h-6 w-24 rounded-b-2xl bg-[oklch(0.15_0.02_285)]" />
      <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-cream">
        {children}
      </div>
    </div>
  );
}
