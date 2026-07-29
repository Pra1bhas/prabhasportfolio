import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Send,
  Check,
  Play,
  Film,
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
import Lightfall from "@/components/Lightfall";
import LightRays from "@/components/LightRays";
import OrbitingToolkit from "@/components/ui/orbiting-circles";
import deskAsset from "@/assets/edit-desk.png.asset.json";
import toolkitBg from "@/assets/toolkit-bg.jpg";
import ctaBg from "@/assets/cta-bg.jpg";

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

const services = [
  { n: "01", title: "Brand Commercials", desc: "Cinematic 30s–90s films for product launches and brand campaigns." },
  { n: "02", title: "Social Media Ads", desc: "Scroll-stopping vertical edits for Meta, TikTok, and YouTube Shorts." },
  { n: "03", title: "Corporate Videos", desc: "Story-led films for founders, teams, and enterprise narratives." },
  { n: "04", title: "Product Videos", desc: "Macro-detail product films that make the object the hero." },
  { n: "05", title: "YouTube Editing", desc: "Long-form editing with rhythm, retention, and personality." },
  { n: "06", title: "Motion Graphics", desc: "Animated logos, kinetic typography, and 2D/3D motion design." },
];

const projects = [
  { title: "Aurora Watches — Launch Film", tag: "Brand Commercial", accent: "teal", ratio: "16/9" },
  { title: "Kori Skincare — Vertical Reel", tag: "Social Ad", accent: "ember", ratio: "9/16" },
  { title: "Vaayu Founders' Story", tag: "Corporate", accent: "teal", ratio: "16/9" },
  { title: "Nova Coffee — Macro Craft", tag: "Product", accent: "ember", ratio: "1/1" },
  { title: "The Retention Cut", tag: "YouTube Edit", accent: "teal", ratio: "16/9" },
  { title: "Kinetic Identity", tag: "Motion Graphics", accent: "ember", ratio: "16/9" },
];

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

const serifStyle: React.CSSProperties = {
  fontFamily: '"Cormorant Garamond", "Playfair Display", ui-serif, Georgia, serif',
  fontWeight: 500,
};

function HomePage() {
  return (
    <div className="bg-black text-white">
      {/* HOME */}
      <section id="home" className="relative min-h-screen w-full overflow-hidden bg-black">
        <div className="absolute inset-0">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={1.2}
            lightSpread={0.8}
            rayLength={2}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
            saturation={0}
          />
        </div>

        <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <h1
            className="font-display text-white"
            style={{
              ...serifStyle,
              letterSpacing: "0.04em",
              fontSize: "clamp(2.5rem, 8vw, 6.5rem)",
              lineHeight: 1,
            }}
          >
            PRABHAS PASUPULETI
          </h1>
          <div className="mt-6 flex items-center gap-4">
            <span className="h-px w-16 bg-white/40 sm:w-24" />
            <span
              className="text-white/80"
              style={{ letterSpacing: "0.5em", fontSize: "clamp(0.75rem, 1.4vw, 1rem)" }}
            >
              VIDEO EDITOR
            </span>
            <span className="h-px w-16 bg-white/40 sm:w-24" />
          </div>
        </div>
      </section>




      {/* ABOUT */}
      <section id="about" className="scroll-mt-20 relative px-6 pt-32 pb-24">

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div>
            <div className="text-[0.7rem] uppercase tracking-[0.4em] text-white/60">— About Me</div>
            <h2
              className="mt-6 font-display text-white"
              style={{ ...serifStyle, fontSize: "clamp(2.25rem, 5vw, 4rem)", lineHeight: 1.05 }}
            >
              A filmmaker&rsquo;s eye,
              <br />
              an editor&rsquo;s patience.
            </h2>
            <div className="mt-8 flex items-center gap-3">
              <span className="h-px w-20 bg-white/30" />
              <span className="h-1 w-1 rotate-45 bg-white/40" />
            </div>
            <div className="mt-8 max-w-md text-[0.95rem] leading-relaxed text-white/70">
              <p>
                I&rsquo;m Prabhas — a creative video editor obsessed with rhythm, pacing, and the quiet moment between two frames.
              </p>
              <p className="mt-4">
                <span className="font-semibold text-white">For 2 years</span> I&rsquo;ve helped brands and creators turn raw footage into stories audiences actually feel.
              </p>
            </div>
          </div>

          <div className="relative">
            <img src={deskAsset.url} alt="Line-art illustration of a video editing desk" className="w-full h-auto" />
          </div>
        </div>

        <div className="mx-auto mt-20 flex max-w-7xl flex-col items-center">
          <span className="h-16 w-px bg-white/20" />
          <span className="mt-1 h-1 w-1 rotate-45 bg-white/40" />
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-16 bg-white/30" />
            <span className="text-[0.7rem] uppercase tracking-[0.4em] text-white/60">What I Build</span>
            <span className="h-px w-16 bg-white/30" />
          </div>
          <h3
            className="mt-6 text-center font-display text-white"
            style={{ ...serifStyle, fontSize: "clamp(2rem, 4vw, 3.25rem)", lineHeight: 1.1 }}
          >
            Turning Ideas Into Impactful Visuals
          </h3>
          <div className="mt-16 grid grid-cols-1 gap-x-16 gap-y-10 md:grid-cols-2">
            {services.map((s) => (
              <div key={s.n} className="border-t border-white/10 pt-6">
                <div className="flex items-start gap-6">
                  <span className="mt-1 text-xs tracking-widest text-white/50">{s.n}</span>
                  <div>
                    <h4 className="font-display text-2xl text-white" style={serifStyle}>{s.title}</h4>
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/60">{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKS */}
      <section id="works" className="scroll-mt-20 relative overflow-hidden px-6 py-24">
        <div className="pointer-events-none absolute -top-20 right-10 h-96 w-96 rounded-full bg-white/5 blur-[120px]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <div className="text-[0.7rem] uppercase tracking-[0.4em] text-white/60">Selected Works</div>
            <h2
              className="mt-4 font-display text-white"
              style={{ ...serifStyle, fontSize: "clamp(2.25rem, 5vw, 4rem)", lineHeight: 1.05 }}
            >
              Recent <span className="italic text-white/80">edits</span>.
            </h2>
            <p className="mt-4 text-white/60">
              A curated look at commercial, social, and long-form projects. Full case studies on request.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <article
                key={p.title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition hover:border-white/30"
              >
                <div className="relative" style={{ aspectRatio: p.ratio }}>
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),rgba(0,0,0,0.9))]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-black/60 backdrop-blur transition group-hover:scale-110 group-hover:border-white">
                      <Play className="h-5 w-5 translate-x-[1px] fill-white text-white" />
                    </div>
                  </div>
                  <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-[10px] uppercase tracking-widest text-white/60 backdrop-blur">
                    <Film className="h-3 w-3 text-white/80" />
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/50">{p.tag}</div>
                  <h3 className="mt-1.5 font-display text-lg text-white" style={serifStyle}>{p.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLKIT */}
      <section id="toolkit" className="scroll-mt-20 relative overflow-hidden pb-0 pt-24">
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <img src={toolkitBg} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="max-w-2xl">
            <div className="text-[0.7rem] uppercase tracking-[0.4em] text-white/60">Toolkit</div>
            <h2
              className="mt-4 font-display text-white"
              style={{ ...serifStyle, fontSize: "clamp(2.25rem, 5vw, 4rem)", lineHeight: 1.05 }}
            >
              The <span className="italic text-white/80">craft</span> stack.
            </h2>
            <p className="mt-4 text-white/60">
              Every project is built on a mix of classic editorial tools and modern AI copilots — chosen for speed, quality, and creative range.
            </p>
          </div>

          <div className="mt-6">
            <OrbitingToolkit className="w-full" />
          </div>

        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="scroll-mt-20 relative isolate overflow-hidden py-24">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-50">
          <Lightfall
            colors={['#A6C8FF', '#9AA7FF', '#FFFFFF']}
            backgroundColor="#000000"
            speed={0.7}
            streakCount={2}
            streakWidth={1.1}
            streakLength={1}
            glow={0.8}
            density={0.4}
            twinkle={0.4}
            zoom={2}
            backgroundGlow={0.4}
            opacity={0.5}
            mouseInteraction={false}
          />
        </div>
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-[0.7rem] uppercase tracking-[0.4em] text-white/60">Contact</div>
            <h2
              className="mt-4 font-display text-white"
              style={{ ...serifStyle, fontSize: "clamp(2.25rem, 5vw, 4rem)", lineHeight: 1.05 }}
            >
              Let&rsquo;s build your <span className="italic text-white/80">next cut</span>.
            </h2>
            <p className="mt-4 text-white/60">
              Available for commercial, social, and long-form editing projects worldwide. Reply within 24 hours.
            </p>
          </div>
          <ContactBlock />
        </div>
      </section>

    </div>

  );
}

function ToolRow({
  name,
  desc,
  icon: Icon,
}: {
  name: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <li className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur transition hover:border-white/25">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/[0.05] text-white">
        <Icon className="h-4 w-4" />
      </span>
      <span className="flex-1">
        <span className="block text-sm font-semibold text-white">{name}</span>
        <span className="block text-xs text-white/50">{desc}</span>
      </span>
    </li>
  );
}


function ContactBlock() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", project: "", message: "" });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };
  const inputCls =
    "w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/10 transition";

  return (
    <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
      <div className="space-y-4">
        {[
          { icon: Mail, label: "Email", value: "prabhaspasupuleti@gmail.com", href: "mailto:prabhaspasupuleti@gmail.com" },
          { icon: Phone, label: "Phone", value: "+91 87121 65611", href: "tel:+918712165611" },
          { icon: MapPin, label: "Location", value: "Hyderabad, India" },
          { icon: Instagram, label: "Instagram", value: "@prabhas.pasupuleti", href: "https://instagram.com/prabhas.pasupuleti" },
          { icon: Twitter, label: "X (Twitter)", value: "@prabhasnaidu30", href: "https://x.com/prabhasnaidu30" },
        ].map((c) => {
          const Inner = (
            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur transition hover:border-white/30">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.05]">
                <c.icon className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/50">{c.label}</div>
                <div className="text-sm font-medium text-white">{c.value}</div>
              </div>
            </div>
          );
          return c.href ? (
            <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
              {Inner}
            </a>
          ) : (
            <div key={c.label}>{Inner}</div>
          );
        })}
      </div>

      <form
        onSubmit={submit}
        className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur md:p-8"
      >
        {sent ? (
          <div className="py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/10">
              <Check className="h-6 w-6 text-white" />
            </div>
            <h3 className="mt-6 font-display text-2xl text-white" style={serifStyle}>Message received.</h3>
            <p className="mt-2 text-white/60">I&rsquo;ll get back to you within 24 hours.</p>
          </div>
        ) : (
          <>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <div className="mb-1.5 text-xs uppercase tracking-[0.15em] text-white/50">Your name</div>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} placeholder="Jane Doe" />
              </label>
              <label className="block">
                <div className="mb-1.5 text-xs uppercase tracking-[0.15em] text-white/50">Email</div>
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} placeholder="jane@studio.com" />
              </label>
            </div>
            <label className="block">
              <div className="mb-1.5 text-xs uppercase tracking-[0.15em] text-white/50">Project type</div>
              <select value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })} className={inputCls} required>
                <option value="">Choose one…</option>
                <option>Brand Commercial</option>
                <option>Social Media Ad</option>
                <option>Corporate / Founders</option>
                <option>Product Video</option>
                <option>YouTube Editing</option>
                <option>Motion Graphics</option>
              </select>
            </label>
            <label className="block">
              <div className="mb-1.5 text-xs uppercase tracking-[0.15em] text-white/50">Tell me about your project</div>
              <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputCls} resize-none`} placeholder="Timelines, deliverables, references…" />
            </label>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white py-3.5 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Send message <Send className="h-4 w-4" />
            </button>
          </>
        )}
      </form>
    </div>
  );
}
