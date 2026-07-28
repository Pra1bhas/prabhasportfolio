import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import LightRays from "@/components/LightRays";
import { ParallaxTransition } from "@/components/ParallaxTransition";
import heroArt from "@/assets/hero-art.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prabhas Pasupuleti — Creative Video Editor" },
      {
        name: "description",
        content:
          "Cinematic brand films, social ads and motion graphics — crafted by Prabhas Pasupuleti in Hyderabad.",
      },
      { property: "og:title", content: "Prabhas Pasupuleti — Creative Video Editor" },
      {
        property: "og:description",
        content: "Cinematic brand films, social ads and motion graphics.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <section className="relative min-h-screen overflow-hidden bg-cinema">
        {/* Hero art backdrop */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${heroArt})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />

        {/* Light rays */}
        <div className="absolute inset-0">
          <LightRays
            raysOrigin="top-center"
            raysColor="#00ffff"
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
            className="custom-rays"
          />
        </div>

        {/* Ember accent glow */}
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-ember/20 blur-[120px] pointer-events-none" />

        {/* Hero content */}
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-primary backdrop-blur">
            <Sparkles className="h-3 w-3" />
            Creative Video Editor
          </div>

          <h1 className="mt-8 max-w-5xl font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            Frames that <span className="text-gradient-accent italic">move</span>
            <br /> stories that <span className="text-gradient-accent italic">stay</span>.
          </h1>

          <p className="mt-8 max-w-2xl text-base text-muted-foreground sm:text-lg">
            I&apos;m Prabhas — a Hyderabad-based video editor turning raw footage into cinematic
            brand films, scroll-stopping social ads, and motion pieces that resonate.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/works"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-ember px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_10px_40px_-10px_oklch(0.82_0.16_195/.5)] hover:opacity-95 transition"
            >
              <Play className="h-4 w-4 fill-current" />
              View my reel
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface/40 px-6 py-3 text-sm font-medium text-foreground backdrop-blur hover:border-primary/50 transition"
            >
              Start a project
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-20 grid w-full max-w-3xl grid-cols-3 gap-4 border-t border-border/40 pt-8">
            {[
              { k: "2y+", v: "Editing craft" },
              { k: "50+", v: "Projects delivered" },
              { k: "6", v: "Core services" },
            ].map((s) => (
              <div key={s.v} className="text-center">
                <div className="font-display text-3xl font-semibold text-gradient-accent">{s.k}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                  {s.v}
                </div>
              </div>
            ))}
          </div>

          {/* Scroll cue */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-muted-foreground animate-pulse">
            Scroll ↓
          </div>
        </div>
      </section>

      {/* Scroll-driven parallax transition into About */}
      <ParallaxTransition />
    </>
  );
}
