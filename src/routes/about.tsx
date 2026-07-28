import { createFileRoute } from "@tanstack/react-router";
import deskAsset from "@/assets/edit-desk.png.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Prabhas Pasupuleti" },
      {
        name: "description",
        content:
          "A filmmaker's eye, an editor's patience. Prabhas Pasupuleti is a creative video editor based in Hyderabad turning raw footage into stories audiences feel.",
      },
      { property: "og:title", content: "About — Prabhas Pasupuleti" },
      {
        property: "og:description",
        content: "Creative video editor based in Hyderabad — story before style.",
      },
      { property: "og:type", content: "profile" },
    ],
  }),
  component: AboutPage,
});

const services = [
  {
    n: "01",
    title: "Brand Commercials",
    desc: "Cinematic 30s–90s films for product launches and brand campaigns.",
  },
  {
    n: "02",
    title: "Social Media Ads",
    desc: "Scroll-stopping vertical edits for Meta, TikTok, and YouTube Shorts.",
  },
  {
    n: "03",
    title: "Corporate Videos",
    desc: "Story-led films for founders, teams, and enterprise narratives.",
  },
  {
    n: "04",
    title: "Product Videos",
    desc: "Macro-detail product films that make the object the hero.",
  },
  {
    n: "05",
    title: "YouTube Editing",
    desc: "Long-form editing with rhythm, retention, and personality.",
  },
  {
    n: "06",
    title: "Motion Graphics",
    desc: "Animated logos, kinetic typography, and 2D/3D motion design.",
  },
];

function AboutPage() {
  return (
    <div className="bg-black text-white">
      {/* Hero */}
      <section className="relative px-6 pt-32 pb-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div>
            <div className="text-[0.7rem] uppercase tracking-[0.4em] text-white/60">
              — About Me
            </div>
            <h1
              className="mt-6 font-display text-white"
              style={{
                fontFamily:
                  '"Cormorant Garamond", "Playfair Display", ui-serif, Georgia, serif',
                fontWeight: 500,
                fontSize: "clamp(2.25rem, 5vw, 4rem)",
                lineHeight: 1.05,
              }}
            >
              A filmmaker&rsquo;s eye,
              <br />
              an editor&rsquo;s patience.
            </h1>

            <div className="mt-8 flex items-center gap-3">
              <span className="h-px w-20 bg-white/30" />
              <span className="h-1 w-1 rotate-45 bg-white/40" />
            </div>

            <div className="mt-8 max-w-md text-[0.95rem] leading-relaxed text-white/70">
              <p>
                I&rsquo;m Prabhas — a creative video editor obsessed with rhythm,
                pacing, and the quiet moment between two frames.
              </p>
              <p className="mt-4">
                <span className="font-semibold text-white">For 2 years</span>{" "}
                I&rsquo;ve helped brands and creators turn raw footage into stories
                audiences actually feel.
              </p>
            </div>
          </div>

          <div className="relative">
            <img
              src={deskAsset.url}
              alt="Line-art illustration of a video editing desk setup"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* divider */}
        <div className="mx-auto mt-20 flex max-w-7xl flex-col items-center">
          <span className="h-16 w-px bg-white/20" />
          <span className="mt-1 h-1 w-1 rotate-45 bg-white/40" />
        </div>
      </section>

      {/* What I build */}
      <section className="px-6 pb-32">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-16 bg-white/30" />
            <span className="text-[0.7rem] uppercase tracking-[0.4em] text-white/60">
              What I Build
            </span>
            <span className="h-px w-16 bg-white/30" />
          </div>

          <h2
            className="mt-6 text-center font-display text-white"
            style={{
              fontFamily:
                '"Cormorant Garamond", "Playfair Display", ui-serif, Georgia, serif',
              fontWeight: 500,
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              lineHeight: 1.1,
            }}
          >
            Turning Ideas Into Impactful Visuals
          </h2>

          <div className="mt-16 grid grid-cols-1 gap-x-16 gap-y-10 md:grid-cols-2">
            {services.map((s) => (
              <div key={s.n} className="border-t border-white/10 pt-6">
                <div className="flex items-start gap-6">
                  <span className="mt-1 text-xs tracking-widest text-white/50">
                    {s.n}
                  </span>
                  <div>
                    <h3
                      className="font-display text-2xl text-white"
                      style={{
                        fontFamily:
                          '"Cormorant Garamond", "Playfair Display", ui-serif, Georgia, serif',
                        fontWeight: 500,
                      }}
                    >
                      {s.title}
                    </h3>
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/60">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quote */}
          <div className="mt-28 flex flex-col items-center text-center">
            <span className="font-display text-6xl text-white/40">&ldquo;</span>
            <p
              className="mt-2 text-white/80"
              style={{
                fontFamily: '"Caveat", "Dancing Script", cursive',
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              }}
            >
              Good edit. Better story.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <span className="h-px w-10 bg-white/30" />
              <span className="h-1 w-1 rotate-45 bg-white/40" />
              <span className="h-px w-10 bg-white/30" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
