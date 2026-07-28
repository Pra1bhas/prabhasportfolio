import { createFileRoute } from "@tanstack/react-router";
import { Play, Film } from "lucide-react";

export const Route = createFileRoute("/works")({
  head: () => ({
    meta: [
      { title: "Works — Prabhas Pasupuleti" },
      { name: "description", content: "Selected video editing works by Prabhas Pasupuleti: brand films, social ads, product edits and motion graphics." },
      { property: "og:title", content: "Works — Prabhas Pasupuleti" },
      { property: "og:description", content: "Selected cinematic edits, commercials and motion projects." },
    ],
  }),
  component: WorksPage,
});

const projects = [
  { title: "Aurora Watches — Launch Film", tag: "Brand Commercial", accent: "teal", ratio: "16/9" },
  { title: "Kori Skincare — Vertical Reel", tag: "Social Ad", accent: "ember", ratio: "9/16" },
  { title: "Vaayu Founders' Story", tag: "Corporate", accent: "teal", ratio: "16/9" },
  { title: "Nova Coffee — Macro Craft", tag: "Product", accent: "ember", ratio: "1/1" },
  { title: "The Retention Cut", tag: "YouTube Edit", accent: "teal", ratio: "16/9" },
  { title: "Kinetic Identity", tag: "Motion Graphics", accent: "ember", ratio: "16/9" },
];

function WorksPage() {
  return (
    <div className="bg-cinema pt-32 pb-24 px-6 relative overflow-hidden">
      <div className="pointer-events-none absolute -top-20 right-10 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-ember/10 blur-[120px]" />

      <div className="relative max-w-6xl mx-auto">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.2em] text-primary">Selected Works</div>
          <h1 className="mt-3 font-display text-4xl md:text-6xl font-semibold tracking-tight">
            Recent <span className="text-gradient-accent italic">edits</span>.
          </h1>
          <p className="mt-4 text-muted-foreground">
            A curated look at commercial, social, and long-form projects. Full case studies on request.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <article
              key={p.title}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-surface/40 hover:border-primary/40 transition"
            >
              <div
                className="relative"
                style={{ aspectRatio: p.ratio }}
              >
                {/* Placeholder cinematic thumbnail */}
                <div
                  className={`absolute inset-0 ${
                    p.accent === "teal"
                      ? "bg-[conic-gradient(from_120deg_at_60%_40%,oklch(0.28_0.08_210),oklch(0.16_0.04_240),oklch(0.30_0.10_195))]"
                      : "bg-[conic-gradient(from_200deg_at_40%_60%,oklch(0.35_0.14_50),oklch(0.16_0.04_240),oklch(0.28_0.08_20))]"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-14 w-14 rounded-full bg-background/60 border border-primary/40 backdrop-blur flex items-center justify-center group-hover:scale-110 group-hover:border-primary transition">
                    <Play className="h-5 w-5 text-primary fill-primary translate-x-[1px]" />
                  </div>
                </div>
                <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-background/60 backdrop-blur px-2.5 py-1 text-[10px] uppercase tracking-widest text-muted-foreground border border-border/40">
                  <Film className="h-3 w-3 text-primary" />
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
              <div className="p-5">
                <div className="text-[10px] uppercase tracking-[0.2em] text-primary">{p.tag}</div>
                <h3 className="mt-1.5 font-display text-lg font-semibold">{p.title}</h3>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-border/50 bg-surface/40 backdrop-blur p-8 md:p-10 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-semibold">Have footage sitting on a hard drive?</h2>
          <p className="mt-2 text-muted-foreground">Let&apos;s turn it into something worth watching.</p>
          <a
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-ember px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            Start a project
          </a>
        </div>
      </div>
    </div>
  );
}
