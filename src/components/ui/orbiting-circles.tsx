"use client";

import ParticleSphere from "@/components/ui/particle-sphere";
import premiere from "@/assets/logos/premiere.svg";
import afterEffects from "@/assets/logos/after-effects.svg";
import photoshop from "@/assets/logos/photoshop.svg";
import canva from "@/assets/logos/canva.svg";
import gemini from "@/assets/logos/gemini.svg";
import openai from "@/assets/logos/openai.svg";
import firefly from "@/assets/logos/firefly.svg";
import capcutAsset from "@/assets/capcut.png.asset.json";
import flowAsset from "@/assets/flow-ai.png.asset.json";
import seedanceAsset from "@/assets/seedance.png.asset.json";

type OrbitIcon = {
  alt: string;
  angle: number;
  src?: string;
  cover?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
};

type Orbit = { size: number; mobile: number; duration: number; icons: OrbitIcon[] };

const orbits: Orbit[] = [
  {
    size: 300,
    mobile: 200,
    duration: 22,
    icons: [
      { src: premiere, alt: "Adobe Premiere Pro", angle: -60 },
      { src: afterEffects, alt: "Adobe After Effects", angle: 60 },
      { src: photoshop, alt: "Adobe Photoshop", angle: 180 },
    ],
  },
  {
    size: 430,
    mobile: 290,
    duration: 28,
    icons: [
      { src: canva, alt: "Canva", angle: 0 },
      { src: capcutAsset.url, alt: "CapCut", angle: 120 },
      { src: firefly, alt: "Adobe Firefly", angle: -120 },
    ],
  },
  {
    size: 560,
    mobile: 380,
    duration: 36,
    icons: [
      { src: gemini, alt: "Google Gemini", angle: -45 },
      { src: openai, alt: "ChatGPT", angle: 45 },
      { src: flowAsset.url, alt: "Flow AI", angle: 135, cover: true },
      { src: seedanceAsset.url, alt: "Seedance", angle: -135 },
    ],
  },
];

export default function OrbitingToolkit({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ minHeight: 680 }}
    >
      <style>{`
        @keyframes tk-orbit-cw { from { transform: rotate(var(--start)) } to { transform: rotate(calc(var(--start) + 360deg)) } }
        @keyframes tk-orbit-ccw { from { transform: rotate(var(--start)) } to { transform: rotate(calc(var(--start) - 360deg)) } }
        @keyframes tk-counter-cw { from { transform: rotate(0deg) } to { transform: rotate(-360deg) } }
        @keyframes tk-counter-ccw { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
      `}</style>

      {/* Center particle globe */}
      <div className="pointer-events-none absolute h-[180px] w-[180px] md:h-[240px] md:w-[240px]">
        <div className="absolute inset-0 rounded-full bg-white/5 blur-3xl" />
        <ParticleSphere className="relative h-full w-full" />
      </div>

      {orbits.map((orbit, index) => {
        const isCW = index % 2 === 0;
        return (
          <div
            key={orbit.size}
            className="pointer-events-none absolute rounded-full border border-white/10"
            style={{
              width: `min(${orbit.size}px, ${orbit.mobile / 3.8}rem)`,
              height: `min(${orbit.size}px, ${orbit.mobile / 3.8}rem)`,
            }}
          >
            {orbit.icons.map((ic) => {
              const Icon = ic.icon;
              return (
                <div
                  key={ic.alt}
                  className="absolute inset-0"
                  style={{
                    ["--start" as string]: `${ic.angle}deg`,
                    animation: `${isCW ? "tk-orbit-cw" : "tk-orbit-ccw"} ${orbit.duration}s linear infinite`,
                  }}
                >
                  <div
                    className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      animation: `${isCW ? "tk-counter-cw" : "tk-counter-ccw"} ${orbit.duration}s linear infinite`,
                    }}
                  >
                    <div
                      title={ic.alt}
                      className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-black/70 backdrop-blur transition md:h-14 md:w-14"
                    >
                      {ic.src ? (
                        <img
                          src={ic.src}
                          alt={ic.alt}
                          className={
                            ic.cover
                              ? "h-full w-full rounded-2xl object-cover"
                              : "h-7 w-7 md:h-8 md:w-8 object-contain"
                          }
                          loading="lazy"
                        />
                      ) : Icon ? (
                        <Icon className="h-5 w-5 text-white/80 md:h-6 md:w-6" />
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
