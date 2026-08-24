import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDown } from "lucide-react";
import parallaxBg from "@/assets/parallax-bg.jpg";

export function ParallaxTransition() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "20%"]);
  const midY = useTransform(scrollYProgress, [0, 1], ["30%", "-15%"]);
  const fgY = useTransform(scrollYProgress, [0, 1], ["80%", "-40%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["120%", "-80%"]);
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.4, 0.7, 0.9], [0, 1, 1, 0]);
  const textScale = useTransform(scrollYProgress, [0.15, 0.5, 0.9], [0.9, 1, 1.05]);

  return (
    <section
      ref={ref}
      className="relative h-[220vh] bg-background overflow-hidden"
      aria-label="Transition to about"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Layer 1 — nebula/moon (slowest) */}
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 bg-cover bg-center"
        >
          <div
            className="absolute inset-0 bg-cover bg-center scale-110"
            style={{ backgroundImage: `url(${parallaxBg})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />
        </motion.div>

        {/* Layer 2 — city skyline SVG (medium) */}
        <motion.div
          style={{ y: midY }}
          className="absolute inset-x-0 bottom-0 h-[60%]"
        >
          <svg
            viewBox="0 0 1920 600"
            preserveAspectRatio="xMidYMax slice"
            className="absolute bottom-0 w-full h-full"
          >
            <defs>
              <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.20 0.05 220)" stopOpacity="0" />
                <stop offset="60%" stopColor="oklch(0.12 0.03 240)" />
                <stop offset="100%" stopColor="oklch(0.08 0.02 245)" />
              </linearGradient>
              <radialGradient id="haze" cx="50%" cy="80%" r="60%">
                <stop offset="0%" stopColor="oklch(0.82 0.16 195)" stopOpacity="0.25" />
                <stop offset="100%" stopColor="oklch(0.82 0.16 195)" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect x="0" y="0" width="1920" height="600" fill="url(#haze)" />
            <path
              fill="url(#skyGrad)"
              d="M0,600 L0,420 L60,420 L60,360 L110,360 L110,400 L170,400 L170,320 L220,320 L220,290 L260,290 L260,340 L310,340 L310,260 L360,260 L360,300 L410,300 L410,240 L460,240 L460,210 L500,210 L500,270 L560,270 L560,330 L610,330 L610,280 L660,280 L660,220 L720,220 L720,180 L770,180 L770,240 L820,240 L820,310 L870,310 L870,260 L920,260 L920,200 L970,200 L970,250 L1020,250 L1020,180 L1070,180 L1070,140 L1120,140 L1120,200 L1170,200 L1170,270 L1220,270 L1220,310 L1270,310 L1270,240 L1320,240 L1320,290 L1370,290 L1370,220 L1420,220 L1420,260 L1470,260 L1470,320 L1520,320 L1520,280 L1570,280 L1570,240 L1620,240 L1620,300 L1670,300 L1670,360 L1720,360 L1720,320 L1770,320 L1770,380 L1820,380 L1820,340 L1880,340 L1880,400 L1920,400 L1920,600 Z"
            />
            {/* Window lights */}
            {Array.from({ length: 60 }).map((_, i) => {
              const x = (i * 137) % 1900 + 20;
              const y = 380 + ((i * 53) % 180);
              const warm = i % 3 === 0;
              return (
                <rect
                  key={i}
                  x={x}
                  y={y}
                  width="3"
                  height="3"
                  fill={warm ? "oklch(0.75 0.18 55)" : "oklch(0.82 0.16 195)"}
                  opacity="0.75"
                />
              );
            })}
          </svg>
        </motion.div>

        {/* Foreground — big text + icon (fastest) */}
        <motion.div
          style={{ y: fgY, opacity: textOpacity, scale: textScale }}
          className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        >
          <motion.div style={{ y: textY }} className="max-w-4xl">
            <div className="mx-auto mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/40 bg-background/60 backdrop-blur glow-teal">
              <ArrowDown className="h-6 w-6 text-primary" />
            </div>
            <h2 className="font-display text-5xl font-semibold leading-[1] tracking-tight sm:text-7xl md:text-8xl">
              Behind every <br />
              <span className="text-gradient-accent italic">cut</span> — a story.
            </h2>
            <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
              Every frame is chosen. Every beat, deliberate. Meet the editor behind the work.
            </p>
            <a
              href="#about"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary backdrop-blur hover:bg-primary/20 transition"
            >
              Read the story
            </a>
          </motion.div>
        </motion.div>

        {/* Vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,oklch(0.08_0.02_245)_100%)]" />
      </div>
    </section>
  );
}
