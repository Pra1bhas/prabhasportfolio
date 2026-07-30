import { cn } from "@/lib/utils";

interface MeteorsProps {
  number?: number;
  className?: string;
}

/** Deterministic pseudo-random so SSR and client markup match. */
function rand(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export const Meteors = ({ number = 25, className }: MeteorsProps) => {
  const meteors = Array.from({ length: number });

  return (
    <>
      {meteors.map((_, idx) => {
        const left = rand(idx + 1) * 130 - 15;
        const top = rand(idx + 41) * 60 - 20;
        const delay = rand(idx + 89) * 9;
        const duration = 5 + rand(idx + 137) * 7;
        const tail = 60 + Math.round(rand(idx + 211) * 140);
        const size = 1 + rand(idx + 307) * 1.4;
        const opacity = 0.45 + rand(idx + 401) * 0.45;

        return (
          <span
            key={idx}
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute animate-meteor rounded-full bg-white",
              "before:absolute before:top-1/2 before:left-full before:h-px before:-translate-y-1/2 before:content-['']",
              "before:w-[var(--meteor-tail)] before:bg-gradient-to-r before:from-white/70 before:to-transparent",
              className,
            )}
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              opacity,
              boxShadow:
                "0 0 6px 1px rgba(255,255,255,0.85), 0 0 18px 4px rgba(255,255,255,0.28)",
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              // tail length per meteor
              ["--meteor-tail" as string]: `${tail}px`,
            }}
          />
        );
      })}
    </>
  );
};

export default Meteors;
