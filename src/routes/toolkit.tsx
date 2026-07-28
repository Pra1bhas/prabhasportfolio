import { createFileRoute } from "@tanstack/react-router";
import {
  Scissors,
  Wand2,
  Image as ImageIcon,
  Smartphone,
  PenTool,
  Sparkles,
  Bot,
  Zap,
  Flame,
  MessageSquare,
} from "lucide-react";
import toolkitBg from "@/assets/toolkit-bg.jpg";

export const Route = createFileRoute("/toolkit")({
  head: () => ({
    meta: [
      { title: "Toolkit — Prabhas Pasupuleti" },
      { name: "description", content: "The editing, compositing, and AI toolkit Prabhas Pasupuleti uses to craft cinematic videos, plus brands he has worked with." },
      { property: "og:title", content: "Toolkit — Prabhas Pasupuleti" },
      { property: "og:description", content: "Editing, compositing and AI tools behind the cinematic edit." },
    ],
  }),
  component: ToolkitPage,
});

const editingTools = [
  { name: "Premiere Pro", desc: "NLE / timeline", icon: Scissors },
  { name: "After Effects", desc: "Motion / VFX", icon: Wand2 },
  { name: "Photoshop", desc: "Stills / cleanup", icon: ImageIcon },
  { name: "CapCut", desc: "Vertical edits", icon: Smartphone },
  { name: "Canva", desc: "Thumbnails / graphics", icon: PenTool },
];

const aiTools = [
  { name: "Flow AI", desc: "Motion generation", icon: Zap },
  { name: "Seedance", desc: "AI video assist", icon: Sparkles },
  { name: "Adobe Firefly", desc: "Generative assets", icon: Flame },
  { name: "Gemini", desc: "Ideation copilot", icon: Bot },
  { name: "ChatGPT", desc: "Scripts / copy", icon: MessageSquare },
];

const brands = [
  "AURORA", "KORI", "NOVA", "VAAYU", "MERAKI", "ORBIT",
  "LUMEN", "PRISM", "ATLAS", "HALO", "EMBER", "SAGE",
];

function ToolkitPage() {
  return (
    <div className="relative bg-cinema pt-32 pb-0 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <img src={toolkitBg} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.2em] text-primary">Toolkit</div>
          <h1 className="mt-3 font-display text-4xl md:text-6xl font-semibold tracking-tight">
            The <span className="text-gradient-accent italic">craft</span> stack.
          </h1>
          <p className="mt-4 text-muted-foreground">
            Every project is built on a mix of classic editorial tools and modern AI copilots — chosen for speed, quality, and creative range.
          </p>
        </div>

        <div className="mt-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-border/60" />
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Editing & Compositing</div>
            <div className="h-px flex-1 bg-border/60" />
          </div>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
            {editingTools.map((t) => (
              <ToolCard key={t.name} {...t} accent="teal" />
            ))}
          </div>
        </div>

        <div className="mt-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-border/60" />
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">AI & Generative</div>
            <div className="h-px flex-1 bg-border/60" />
          </div>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
            {aiTools.map((t) => (
              <ToolCard key={t.name} {...t} accent="ember" />
            ))}
          </div>
        </div>
      </div>

      {/* Brands marquee */}
      <section className="relative mt-24 py-16 border-y border-border/40 bg-background/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 mb-8">
          <div className="text-xs uppercase tracking-[0.2em] text-primary">Trusted by</div>
          <h2 className="mt-2 font-display text-2xl md:text-4xl font-semibold">Brands I&apos;ve worked with</h2>
        </div>
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
          <div className="flex gap-5 animate-marquee w-max">
            {[...brands, ...brands].map((b, i) => (
              <div
                key={`${b}-${i}`}
                className="shrink-0 h-24 w-52 rounded-2xl border border-border/50 bg-surface/60 backdrop-blur flex items-center justify-center"
              >
                <div className="font-display text-xl font-semibold tracking-[0.25em] text-muted-foreground">
                  {b}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ToolCard({
  name,
  desc,
  icon: Icon,
  accent,
}: {
  name: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: "teal" | "ember";
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-surface/50 backdrop-blur p-5 hover:border-primary/40 transition">
      <div
        className={`absolute -top-10 -right-10 h-24 w-24 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition ${
          accent === "teal" ? "bg-primary/30" : "bg-ember/30"
        }`}
      />
      <div className="relative">
        <div
          className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border ${
            accent === "teal"
              ? "border-primary/30 bg-primary/10 text-primary"
              : "border-ember/30 bg-ember/10 text-ember"
          }`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="mt-4 font-display text-sm font-semibold">{name}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
    </div>
  );
}
