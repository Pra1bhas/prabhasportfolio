import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Sparkles, Film, Megaphone, Building2, Package, Youtube, Zap } from "lucide-react";
import aboutPortrait from "@/assets/about-portrait.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Prabhas Pasupuleti" },
      {
        name: "description",
        content:
          "Prabhas Pasupuleti is a creative video editor based in Hyderabad with 2 years transforming raw footage into cinematic stories for brands worldwide.",
      },
      { property: "og:title", content: "About — Prabhas Pasupuleti" },
      {
        property: "og:description",
        content: "A Hyderabad-based creative video editor crafting cinematic stories.",
      },
    ],
  }),
  component: AboutPage,
});

const services = [
  { icon: Film, title: "Brand Commercials", desc: "Cinematic 30s–90s films for product launches and high-end campaigns." },
  { icon: Megaphone, title: "Social Media Ads", desc: "Scroll-stopping vertical edits for Meta, TikTok and YouTube Shorts." },
  { icon: Building2, title: "Corporate Videos", desc: "Narrative-driven content for founders, teams, and enterprises." },
  { icon: Package, title: "Product Videos", desc: "Macro-detail films highlighting product craftsmanship." },
  { icon: Youtube, title: "YouTube Editing", desc: "Long-form edits optimized for retention and pacing." },
  { icon: Zap, title: "Motion Graphics", desc: "Animated logos, kinetic typography and 2D/3D motion assets." },
];

function AboutPage() {
  return (
    <div className="bg-cinema">
      <section className="relative pt-32 pb-20 px-6">
        <div className="pointer-events-none absolute top-20 left-1/4 h-96 w-96 rounded-full bg-primary/15 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 right-10 h-80 w-80 rounded-full bg-ember/15 blur-[120px]" />

        <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-[1fr_1.2fr] items-center">
          <div className="relative order-2 md:order-1">
            <div className="relative overflow-hidden rounded-3xl border border-border/50 shadow-cinema aspect-[4/5]">
              <img
                src={aboutPortrait}
                alt="Illustrated silhouette of Prabhas Pasupuleti at his edit suite"
                className="h-full w-full object-cover"
                width={1200}
                height={1400}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 rounded-2xl border border-primary/30 bg-background/80 backdrop-blur px-5 py-3 text-sm">
              <div className="font-display text-2xl text-gradient-accent font-semibold">2 yrs</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">of storytelling</div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary">
              <Sparkles className="h-3 w-3" /> About
            </div>
            <h1 className="mt-4 font-display text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
              Hi, I&apos;m <span className="text-gradient-accent italic">Prabhas</span> — a creative video editor.
            </h1>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
              For the past 2 years I&apos;ve been transforming raw footage into compelling stories for
              brands and creators around the world — from cinematic commercials to scroll-stopping
              social edits.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              I believe the edit is where the story is really written. Rhythm, restraint, and the
              right beat — that&apos;s what turns clips into cinema.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" /> Based in Hyderabad, India — working worldwide
            </div>
            <div className="mt-8 flex gap-3">
              <Link
                to="/works"
                className="rounded-full bg-gradient-to-r from-primary to-ember px-6 py-3 text-sm font-semibold text-primary-foreground"
              >
                See my works
              </Link>
              <Link
                to="/contact"
                className="rounded-full border border-border/60 px-6 py-3 text-sm font-medium hover:border-primary/50 transition"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <div className="text-xs uppercase tracking-[0.2em] text-primary">What I do</div>
            <h2 className="mt-2 font-display text-3xl md:text-5xl font-semibold">Services I offer</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.title}
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-surface/50 backdrop-blur p-6 hover:border-primary/40 transition"
              >
                <div className="absolute -top-16 -right-16 h-32 w-32 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition" />
                <div className="relative">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-ember/20 border border-primary/20 mb-4">
                    <s.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
