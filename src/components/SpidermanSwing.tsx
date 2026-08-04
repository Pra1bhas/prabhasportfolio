import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import posterImg from "@/assets/spiderman-poster.jpg";

const BUCKET = "insta-reels";
const PATH = "assets/spiderman-video.webm";

/**
 * Transparent (background-less) Spider-Man swing loop.
 * Rendered as a decorative back layer — all text sits above it.
 *
 * Optimizations:
 * - muted autoplay + playsInline for mobile Safari/Chrome
 * - preload="none" until URL resolves, then metadata
 * - poster fallback for slow loads / playback failures
 * - responsive clamped sizing with object-contain and max-height breakpoints
 */
export function SpidermanSwing({ className = "" }: { className?: string }) {
  const [url, setUrl] = useState<string | null>(null);
  const [canPlay, setCanPlay] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase.storage.from(BUCKET).createSignedUrl(PATH, 60 * 60 * 6);
      if (!cancelled && data?.signedUrl) setUrl(data.signedUrl);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !url) return;

    const startPlayback = async () => {
      try {
        video.muted = true;
        video.playsInline = true;
        await video.play();
        setCanPlay(true);
      } catch {
        // Autoplay blocked or video unsupported — poster remains visible
        setCanPlay(false);
      }
    };

    startPlayback();
  }, [url]);

  return (
    <div
      className={`pointer-events-none select-none overflow-hidden ${className}`}
      style={{
        // Safe scaling: width grows with viewport, capped at each breakpoint
        width: "clamp(140px, 32vw, 320px)",
      }}
    >
      <video
        ref={videoRef}
        src={url ?? undefined}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={posterImg}
        aria-hidden="true"
        disablePictureInPicture
        disableRemotePlayback
        className="h-auto w-full object-contain opacity-80"
        style={{
          // Max-height guardrails per common breakpoint range
          maxHeight: "clamp(140px, 32vh, 320px)",
        }}
        onPlay={() => setCanPlay(true)}
        onError={() => setCanPlay(false)}
      />
      {!canPlay && (
        <img
          src={posterImg}
          alt=""
          aria-hidden="true"
          className="h-auto w-full object-contain opacity-80"
          style={{ maxHeight: "clamp(140px, 32vh, 320px)" }}
        />
      )}
    </div>
  );
}

export default SpidermanSwing;
