import { createFileRoute } from "@tanstack/react-router";
import LightRays from "@/components/LightRays";

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

      {/* Title */}
      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 text-center">
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
