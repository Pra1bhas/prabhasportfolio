import { cn } from "@/lib/utils";

interface MeteorsProps {
  number?: number;
  className?: string;
}

export const Meteors = ({ number = 20, className }: MeteorsProps) => {
  const meteors = Array.from({ length: number });

  return (
    <>
      {meteors.map((_, idx) => {
        const left = (idx / number) * 120 - 10;
        const delay = (idx % 7) * 0.9;
        const duration = 6 + ((idx * 3) % 7);
        return (
          <span
            key={idx}
            className={cn(
              "pointer-events-none absolute top-1/2 left-1/2 h-0.5 w-0.5 rotate-[215deg] animate-meteor rounded-full bg-white/70 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]",
              "before:absolute before:top-1/2 before:h-px before:w-[50px] before:-translate-y-1/2 before:transform before:bg-gradient-to-r before:from-white/60 before:to-transparent before:content-['']",
              className,
            )}
            style={{
              top: "-40px",
              left: `${left}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          />
        );
      })}
    </>
  );
};

export default Meteors;
