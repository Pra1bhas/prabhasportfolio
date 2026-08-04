import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const BUCKET = "insta-reels";
const PATH = "assets/spiderman-video.webm";

/**
 * Transparent (background-less) Spider-Man swing loop.
 * Rendered as a decorative back layer — all text sits above it.
 */
export function SpidermanSwing({ className = "" }: { className?: string }) {
  const [url, setUrl] = useState<string | null>(null);

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

  if (!url) return null;

  return (
    <div className={`pointer-events-none select-none ${className}`}>
      <video
        src={url}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className="h-auto w-full object-contain opacity-80"
        style={{ maxHeight: "55vh" }}
      />
    </div>
  );
}

export default SpidermanSwing;
