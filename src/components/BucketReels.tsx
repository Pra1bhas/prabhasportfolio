import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, Play } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const BUCKET = "insta-reels";
const VIDEO_EXT = /\.(mp4|mov|webm|m4v)$/i;
const EXCLUDED_REEL = /den[_ -]?m[_ -]?properties/i;

export type Reel = { name: string; title: string; url: string; poster?: string };

function prettify(name: string) {
  return name
    .replace(VIDEO_EXT, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Grabs a frame from the video and returns it as a data URL (thumbnail). */
function capturePoster(url: string): Promise<string | null> {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.crossOrigin = "anonymous";
    video.muted = true;
    video.preload = "auto";
    video.playsInline = true;
    let done = false;
    const finish = (value: string | null) => {
      if (done) return;
      done = true;
      video.removeAttribute("src");
      video.load();
      resolve(value);
    };
    const timer = window.setTimeout(() => finish(null), 12000);
    video.onloadeddata = () => {
      try {
        video.currentTime = Math.min(0.6, (video.duration || 1) * 0.1);
      } catch {
        finish(null);
      }
    };
    video.onseeked = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth || 540;
        canvas.height = video.videoHeight || 960;
        const ctx = canvas.getContext("2d");
        if (!ctx) return finish(null);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        window.clearTimeout(timer);
        finish(canvas.toDataURL("image/jpeg", 0.72));
      } catch {
        finish(null);
      }
    };
    video.onerror = () => finish(null);
    video.src = url;
  });
}

export function useBucketReels() {
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        .createSignedUrls(
          files.map((f) => f.name),
          60 * 60 * 6,
        );

      if (cancelled) return;
      if (signErr) {
        setError(signErr.message);
        setLoading(false);
        return;
      }

      const list: Reel[] = (signed ?? [])
        .filter((s) => s.signedUrl)
        .map((s) => {
          const name = (s.path ?? "").split("/").pop() ?? "reel";
          return { name, title: prettify(name), url: s.signedUrl as string };
        });

      setReels(list);
      setLoading(false);

      // Build thumbnails with limited concurrency so the grid fills quickly.
      const queue = [...list];
      const worker = async () => {
        while (queue.length && !cancelled) {
          const reel = queue.shift()!;
          const poster = await capturePoster(reel.url);
          if (cancelled) return;
          if (poster) {
            setReels((prev) => prev.map((r) => (r.name === reel.name ? { ...r, poster } : r)));
          }
        }
      };
      await Promise.all([worker(), worker(), worker()]);

    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { reels, loading, error };
}

export function ReelPlayer({ reel, onClose }: { reel: Reel; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-sm">
      <div className="flex items-center justify-between px-5 py-4">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white hover:text-black"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <div className="truncate pl-4 text-sm text-white/60">{reel.title}</div>
      </div>
      <div className="flex flex-1 items-center justify-center px-4 pb-8">
        <div
          className="relative h-full max-h-[80vh] overflow-hidden rounded-2xl border border-white/10 bg-black"
          style={{ aspectRatio: "9/16" }}
        >
          <video
            src={reel.url}
            poster={reel.poster}
            controls
            autoPlay
            playsInline
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export function ReelCard({
  reel,
  index,
  label,
  onOpen,
  serifStyle,
}: {
  reel: Reel;
  index: number;
  label?: string;
  onOpen: () => void;
  serifStyle?: React.CSSProperties;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black text-left transition hover:border-white/30"
      style={{ aspectRatio: "9/16" }}
    >
      {reel.poster && (
        <img
          src={reel.poster}
          alt={`${reel.title} thumbnail`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
        />
      )}
      <video
        ref={videoRef}
        src={`${reel.url}#t=0.6`}
        poster={reel.poster}
        muted
        loop
        playsInline
        preload="metadata"
        className={`absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:opacity-100 ${reel.poster ? "opacity-0" : "opacity-85"}`}
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
      <div className="pointer-events-none absolute left-3 top-3 rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-[10px] uppercase tracking-widest text-white/70 backdrop-blur">
        {label ?? String(index + 1).padStart(2, "0")}
      </div>
      <div className="pointer-events-none absolute inset-x-3 bottom-3">
        <div className="truncate font-display text-sm text-white" style={serifStyle}>
          {reel.title}
        </div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-white/50">9:16 Reel</div>
      </div>
    </button>
  );
}

export function BucketReelsGrid({ serifStyle }: { serifStyle?: React.CSSProperties }) {
  const { reels, loading, error } = useBucketReels();
  const [active, setActive] = useState<Reel | null>(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <>
      {loading && (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
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
        <p className="text-sm text-white/50">Reels couldn&apos;t be loaded right now.</p>
      )}

      {!loading && !error && reels.length === 0 && (
        <p className="text-sm text-white/50">
          No reels uploaded yet — new vertical edits will appear here automatically.
        </p>
      )}

      {reels.length > 0 && (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {reels.map((reel, i) => (
            <ReelCard
              key={reel.name}
              reel={reel}
              index={i}
              onOpen={() => setActive(reel)}
              serifStyle={serifStyle}
            />
          ))}
        </div>
      )}

      {active && <ReelPlayer reel={active} onClose={close} />}
    </>
  );
}
