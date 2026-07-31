import { Instagram } from "lucide-react";
import { BucketReelsGrid } from "@/components/BucketReels";

export function ReelsSection({ serifStyle }: { serifStyle?: React.CSSProperties }) {
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

        <div className="mt-12">
          <BucketReelsGrid serifStyle={serifStyle} />
        </div>
      </div>
    </section>
  );
}

export default ReelsSection;
