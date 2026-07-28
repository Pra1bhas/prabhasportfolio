import { createFileRoute } from "@tanstack/react-router";
import LightRays from "@/components/LightRays";
import deskImage from "@/assets/desk-illustration.jpg";

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
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Light rays */}
      <div className="absolute inset-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1.4}
          lightSpread={0.6}
          rayLength={1.6}
          followMouse
          mouseInfluence={0.08}
          noiseAmount={0.08}
          distortion={0.03}
          saturation={0}
          className="absolute inset-0"
        />
      </div>

      {/* Desk illustration at bottom */}
      <img
        src={deskImage}
        alt=""
        width={1536}
        height={1024}
        className="pointer-events-none absolute bottom-0 left-1/2 z-10 w-[min(1400px,100%)] -translate-x-1/2 select-none opacity-90"
      />

      {/* Title */}
      <div className="relative z-20 flex min-h-screen flex-col items-center justify-start px-6 pt-[18vh] text-center">
        {/* Clapperboard glyph */}
        <div className="mb-6 flex items-center gap-3 text-white/80">
          <span className="h-px w-10 bg-white/30" />
          <svg width="42" height="42" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M6 18h36v22H6z" />
            <path d="M6 18l4-8 8 4-4 8zM18 14l4-8 8 4-4 8zM30 14l4-8 8 4-4 8z" />
            <path d="M22 24l8 5-8 5z" fill="currentColor" />
          </svg>
          <span className="h-px w-10 bg-white/30" />
        </div>

        <h1
          className="font-display text-white"
          style={{
            fontFamily: '"Cormorant Garamond", "Playfair Display", ui-serif, Georgia, serif',
            fontWeight: 500,
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
            style={{
              letterSpacing: "0.5em",
              fontSize: "clamp(0.75rem, 1.4vw, 1rem)",
            }}
          >
            VIDEO EDITOR
          </span>
          <span className="h-px w-16 bg-white/40 sm:w-24" />
        </div>
      </div>
    </section>
  );
}
