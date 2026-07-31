import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Play,
  Film,
  ArrowLeft,
  Clock,

} from "lucide-react";
import { Meteors } from "@/components/ui/meteors";
import LightRays from "@/components/LightRays";
import OrbitingToolkit from "@/components/ui/orbiting-circles";
import { ReelsSection } from "@/components/ReelsSection";




import deskAsset from "@/assets/edit-desk.png.asset.json";
import toolkitBg from "@/assets/toolkit-bg.jpg";
import abhinavAsset from "@/assets/abhinav-parkour-sq.png.asset.json";
import bambinoAsset from "@/assets/bambino-sq.png.asset.json";
import ddesignAsset from "@/assets/ddesign-studio-sq.png.asset.json";
import agritechAsset from "@/assets/indian-agritech-sq.png.asset.json";
import sapAsset from "@/assets/sap-jewels-sq.png.asset.json";

const brands = [
  { name: "Abhinav Parkour", logo: abhinavAsset.url },
  { name: "Bambino", logo: bambinoAsset.url },
  { name: "D Design Studio", logo: ddesignAsset.url },
  { name: "Indian Agri Tech", logo: agritechAsset.url },
  { name: "SAP Jewels LLP", logo: sapAsset.url },
];

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
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Prabhas Pasupuleti — Creative Video Editor",
          description:
            "Cinematic brand films, social ads and motion graphics crafted by Prabhas Pasupuleti.",
          areaServed: "Worldwide",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Hyderabad",
            addressCountry: "IN",
          },
          founder: {
            "@type": "Person",
            name: "Prabhas Pasupuleti",
            jobTitle: "Creative Video Editor",
            email: "prabhaspasupuleti@gmail.com",
            telephone: "+91 8712165611",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Hyderabad",
              addressCountry: "IN",
            },
            sameAs: [
              "https://www.instagram.com/prabhas.pasupuleti",
              "https://x.com/prabhasnaidu30",
            ],
          },
        }),
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

const projects: {
  title: string;
  tag: string;
  accent: string;
  ratio: string;
  vimeoId?: string;
}[] = [
  { title: "Aurora Watches — Launch Film", tag: "Brand Commercial", accent: "teal", ratio: "16/9" },
  { title: "Kori Skincare — Vertical Reel", tag: "Social Ad", accent: "ember", ratio: "9/16" },
  { title: "Vaayu Founders' Story", tag: "Corporate", accent: "teal", ratio: "16/9" },
  { title: "Nova Coffee — Macro Craft", tag: "Product", accent: "ember", ratio: "1/1" },
  { title: "The Retention Cut", tag: "YouTube Edit", accent: "teal", ratio: "16/9" },
  { title: "Kinetic Identity", tag: "Motion Graphics", accent: "ember", ratio: "16/9" },
];

const videoGroups: {
  heading: string;
  videos: { title: string; vimeoId: string; duration: string; blurb: string; thumb: string }[];
}[] = [
  {
    heading: "Motion Graphics",
    videos: [
      {
        title: "Cre8v studios",
        vimeoId: "1167764587",
        duration: "1:48",
        blurb: "Brand motion package",
        thumb:
          "https://i.vimeocdn.com/video/2125873148-2f9acf843906d61d1da26d2a9c5d6d5975cd563ac6aa3b6e0562ed1d459616e6-d_1280",
      },
    ],
  },
  {
    heading: "Fanboy Edits",
    videos: [
      {
        title: "Fanboy Sambavam",
        vimeoId: "1162433568",
        duration: "1:49",
        blurb: "High-energy tribute cut",
        thumb:
          "https://i.vimeocdn.com/video/2118203448-aea104c53743daa472aed3dbf5f9f44ab838f7ed1ad67438862687c569717e57-d_1280",
      },
      {
        title: "Multifandom Edit",
        vimeoId: "1162432990",
        duration: "1:02",
        blurb: "Beat-synced montage",
        thumb:
          "https://i.vimeocdn.com/video/2118202689-7131ed2c5cba32b33cab722a5e8f98be6019e5c2effe14150e7d6e3eddbd35cc-d_1280",
      },
      {
        title: "Breaking Bad",
        vimeoId: "1162433628",
        duration: "0:59",
        blurb: "Cinematic character edit",
        thumb:
          "https://i.vimeocdn.com/video/2118203529-3da03dd8df0069b2cc0affe12ae7850e052b22ae221f0ecc2077267707360861-d_1280",
      },
    ],
  },

];




const serifStyle: React.CSSProperties = {
  fontFamily: '"Cormorant Garamond", "Playfair Display", ui-serif, Georgia, serif',
  fontWeight: 500,
};

function HomePage() {
  const [activeVideo, setActiveVideo] = useState<{ title: string; vimeoId: string } | null>(null);

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
            <span className="sr-only"> — Creative Video Editor in Hyderabad, India</span>
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
                onClick={() => p.vimeoId && setActiveVideo({ title: p.title, vimeoId: p.vimeoId })}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition hover:border-white/30 ${p.vimeoId ? "cursor-pointer" : ""}`}
              >
                <div className="relative" style={{ aspectRatio: p.ratio }}>
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),rgba(0,0,0,0.9))]" />
                  {p.vimeoId && (
                    <img
                      src={`https://vumbnail.com/${p.vimeoId}.jpg`}
                      alt={`${p.title} preview`}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover opacity-70 transition group-hover:opacity-90"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-black/60 backdrop-blur transition group-hover:scale-110 group-hover:border-white">
                      <Play className="h-5 w-5 translate-x-[1px] fill-white text-white" />
                    </div>
                  </div>
                  <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-[10px] uppercase tracking-widest text-white/60 backdrop-blur">
                    <Film className="h-3 w-3 text-white/80" />
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  {p.vimeoId && (
                    <div className="absolute right-3 top-3 rounded-full border border-white/40 bg-white/10 px-2.5 py-1 text-[10px] uppercase tracking-widest text-white backdrop-blur">
                      Watch film
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/50">{p.tag}</div>
                  <h3 className="mt-1.5 font-display text-lg text-white" style={serifStyle}>{p.title}</h3>
                </div>

              </article>
            ))}
          </div>

          {videoGroups.map((group) => (
            <div key={group.heading} className="mt-20">
              <div className="flex items-center gap-4">
                <h3
                  className="font-display text-white"
                  style={{ ...serifStyle, fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
                >
                  {group.heading}
                </h3>
                <span className="h-px flex-1 bg-white/15" />
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {group.videos.map((v) => (
                  <article
                    key={v.vimeoId}
                    onClick={() => setActiveVideo(v)}
                    className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition hover:border-white/30"
                  >
                    <div className="relative" style={{ aspectRatio: "16/9" }}>
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),rgba(0,0,0,0.9))]" />
                      <img
                        src={v.thumb}
                        referrerPolicy="no-referrer"

                        alt={`${v.title} preview`}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-500 group-hover:scale-[1.04] group-hover:opacity-95"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                      />
                      {/* custom thumbnail overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-black/60 backdrop-blur transition group-hover:scale-110 group-hover:border-white">
                          <Play className="h-5 w-5 translate-x-[1px] fill-white text-white" />
                        </div>
                      </div>
                      <div className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-[10px] uppercase tracking-widest text-white/70 backdrop-blur">
                        {group.heading}
                      </div>
                      <div className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/70 px-2.5 py-1 text-[10px] font-medium tabular-nums text-white backdrop-blur">
                        <Clock className="h-3 w-3 text-white/70" />
                        {v.duration}
                      </div>
                      <div className="absolute bottom-3 left-3 max-w-[65%] text-[11px] text-white/70">
                        {v.blurb}
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                        {group.heading} · {v.duration}
                      </div>
                      <h4 className="mt-1.5 font-display text-lg text-white" style={serifStyle}>{v.title}</h4>
                    </div>
                  </article>
                ))}
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* REELS */}
      <ReelsSection serifStyle={serifStyle} />



      {/* TOOLKIT */}
      <section id="toolkit" className="scroll-mt-20 relative overflow-hidden pb-24 pt-24">
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

          <BrandMarquee />
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="scroll-mt-20 relative isolate overflow-hidden bg-space-deep py-24">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <Meteors number={25} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.75))]" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6">

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

      {activeVideo && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur">
          <div className="flex items-center gap-3 px-5 py-4">
            <button
              type="button"
              onClick={() => setActiveVideo(null)}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-4 py-2 text-xs uppercase tracking-[0.2em] text-white transition hover:border-white/50 hover:bg-white/[0.12]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <span className="truncate text-sm text-white/60">{activeVideo.title}</span>
          </div>
          <div className="flex flex-1 items-center justify-center px-4 pb-8">
            <div className="w-full max-w-5xl" style={{ aspectRatio: "16/9" }}>
              <iframe
                src={`https://player.vimeo.com/video/${activeVideo.vimeoId}?autoplay=1&muted=0&playsinline=1&title=0&byline=0&portrait=0`}
                title={activeVideo.title}
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                allowFullScreen
                className="h-full w-full rounded-xl border border-white/10"
              />
            </div>
          </div>
        </div>
      )}
    </div>


  );
}

function ContactBlock() {
  return (
    <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[
        { icon: Mail, label: "Email", value: "prabhaspasupuleti@gmail.com", href: "mailto:prabhaspasupuleti@gmail.com" },
        { icon: Phone, label: "Phone", value: "+91 87121 65611", href: "tel:+918712165611" },
        { icon: MapPin, label: "Location", value: "Hyderabad, India" },
        { icon: Instagram, label: "Instagram", value: "@prabhas.pasupuleti", href: "https://instagram.com/prabhas.pasupuleti" },
        { icon: Twitter, label: "X (Twitter)", value: "@prabhasnaidu30", href: "https://x.com/prabhasnaidu30" },
      ].map((c) => {
        const Inner = (
          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur transition hover:border-white/30">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/[0.05]">
              <c.icon className="h-4 w-4 text-white" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/50">{c.label}</div>
              <div className="truncate text-sm font-medium text-white">{c.value}</div>
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
  );
}

function BrandMarquee() {
  const repeated = [...brands, ...brands];
  return (
    <div className="mt-16 sm:mt-20">
      <div className="grid grid-cols-[minmax(0,1fr)] items-center justify-center gap-3 text-center sm:flex sm:gap-4">
        <span className="hidden h-px w-12 shrink-0 bg-white/30 sm:block" />
        <span className="vox-text text-lg font-semibold uppercase tracking-[0.25em] sm:text-2xl sm:tracking-[0.35em]">
          Brands I&rsquo;ve Worked With
        </span>
        <span className="hidden h-px w-12 shrink-0 bg-white/30 sm:block" />
      </div>
      <div className="relative mt-6 w-full overflow-hidden sm:mt-8">
        <div className="flex w-max animate-marquee gap-4 py-2 sm:gap-6">
          {repeated.map((b, i) => (
            <div
              key={`${b.name}-${i}`}
              className="group flex shrink-0 flex-col items-center gap-3"
            >
              <div className="relative w-36 h-36 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition duration-500 ease-out group-hover:scale-105 group-hover:border-white/40 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.12)] sm:w-44 sm:h-44 lg:w-56 lg:h-56">
                <img
                  src={b.logo}
                  alt={b.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 bg-black/35 transition duration-500 group-hover:bg-black/10" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 transition duration-500 group-hover:text-white">
                {b.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

