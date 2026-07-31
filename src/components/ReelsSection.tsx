import { useEffect, useState, useCallback } from "react";
import { ArrowLeft, Play, Instagram } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const BUCKET = "insta-reels";
const VIDEO_EXT = /\.(mp4|mov|webm|m4v)$/i;

type Reel = { name: string; title: string; url: string };

function prettify(name: string) {
  return name
    .replace(VIDEO_EXT, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function ReelsSection({ serifStyle }: { serifStyle?: React.CSSProperties }) {
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [active, setActive] = useState<Reel | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase.storage
        .from(BUCKET)
        .list("", { limit: 100, sortBy: { column: "created_at", order: "desc" } });

      if (cancelled) return;
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      const files = (data ?? []).filter((f) => VIDEO_EXT.test(f.name));
      if (!files.length) {
        setReels([]);
        setLoading(false);
        return;
      }

      const { data: signed, error: signErr } = await supabase.storage
        .from(BUCKET)
        .createSignedUrls(files.map((f) => f.name), 60 * 60 * 6);

      if (cancelled) return;
      if (signErr) {
        setError(signErr.message);
        setLoading(false);
        return;
      }

      setReels(
        (signed ?? [])
          .filter((s) => s.signedUrl)
          .map((s) => {
            const name = (s.path ?? "").split("/").pop() ?? "reel";
            return { name, title: prettify(name), url: s.signedUrl as string };
          })
      );
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close]);

  return (
    <section id="reels" className="scroll-mt-20 relative overflow-hidden px-6 py-24">
      <div className="pointer-events-none absolute -top-24 left-10 h-80 w-80 rounded-full bg-white/5 blur-[120px]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.4em] text-white/60">
            <Instagram className="h-3.5 w-3.5" /> Reels
          </div>
          <h2
            className="mt-4 font-display text-white"
            style={{ ...serifStyle, fontSize: "clamp(2.25rem, 5vw, 4rem)", lineHeight: 1.05 }}
          >
            Vertical <span className="italic text-white/80">reels</span>.
          </h2>
          <p className="mt-4 text-white/60">
            Short-form edits built for the feed — shot, cut and finished in 9:16.
          </p>
        </div>

        {loading && (
          <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl border border-white/10 bg-white/[0.03]"
                style={{ aspectRatio: "9/16" }}
              />
            ))}
          </div>
        )}

        {!loading && error && (
          <p className="mt-10 text-sm text-white/50">Reels couldn&apos;t be loaded right now.</p>
        )}

        {!loading && !error && reels.length === 0 && (
          <p className="mt-10 text-sm text-white/50">
            No reels uploaded yet — new vertical edits will appear here automatically.
          </p>
        )}

        {reels.length > 0 && (
          <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {reels.map((reel) => (
              <button
                key={reel.name}
                type="button"
                onClick={() => setActive(reel)}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black text-left transition hover:border-white/30"
                style={{ aspectRatio: "9/16" }}
              >
                <video
                  src={reel.url}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
                  onMouseEnter={(e) => void e.currentTarget.play().catch(() => {})}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                  }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/30" />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/50 backdrop-blur transition group-hover:scale-110 group-hover:border-white">
                    <Play className="h-4 w-4 translate-x-[1px] fill-white text-white" />
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-x-3 bottom-3">
                  <div className="truncate font-display text-sm text-white" style={serifStyle}>
                    {reel.title}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/50">9:16 Reel</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {active && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-sm">
          <div className="flex items-center justify-between px-5 py-4">
            <button
              type="button"
              onClick={close}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white hover:text-black"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <div className="truncate pl-4 text-sm text-white/60">{active.title}</div>
          </div>
          <div className="flex flex-1 items-center justify-center px-4 pb-8">
            <div
              className="relative h-full max-h-[80vh] overflow-hidden rounded-2xl border border-white/10 bg-black"
              style={{ aspectRatio: "9/16" }}
            >
              <video
                src={active.url}
                controls
                autoPlay
                playsInline
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ReelsSection;
