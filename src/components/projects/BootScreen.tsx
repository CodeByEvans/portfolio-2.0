import { useRef, useEffect } from "react";
import gsap from "gsap";

interface Props {
  phase: "off" | "booting";
  onBoot: () => void;
}

const PowerIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v10" />
    <path d="M18.4 5.6a9 9 0 1 1-12.8 0" />
  </svg>
);

const BootScreen = ({ phase, onBoot }: Props) => {
  const bootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phase === "off" && bootRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(".power-ring-outer", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(2)" });
        gsap.fromTo(".power-btn-inner", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2.5)", delay: 0.15 });
        gsap.fromTo(".power-label", { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", delay: 0.4 });
      }, bootRef);
      return () => ctx.revert();
    }
  }, [phase]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
      {phase === "off" && (
        <div ref={bootRef} className="flex flex-col items-center gap-6">
          <button onClick={onBoot} className="relative cursor-pointer group">
            <div className="power-ring-outer w-28 h-28 rounded-full border-2 border-cyan-400/30 flex items-center justify-center
              group-hover:border-cyan-400/60 transition-colors group-active:scale-95">
              <div className="power-btn-inner w-20 h-20 rounded-full bg-cyan-400/[0.06] border border-cyan-400/20
                flex items-center justify-center text-cyan-400/80 group-hover:text-cyan-400 transition-all duration-200">
                <PowerIcon />
              </div>
            </div>
            <div className="absolute inset-[-8px] rounded-full border border-cyan-400/10 animate-ping pointer-events-none"
              style={{ animationDuration: "3s" }} />
          </button>
          <span className="power-label text-xs tracking-[0.3em] uppercase text-white/30 font-mono">Encender</span>
        </div>
      )}

      {phase === "booting" && (
        <div className="flex flex-col items-center gap-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/[0.08]
            flex items-center justify-center animate-pulse">
            <span className="text-2xl">⌘</span>
          </div>
          <div className="w-40 h-0.5 bg-white/[0.06] rounded-full overflow-hidden">
            <div className="h-full bg-cyan-400/60 rounded-full loading-bar" />
          </div>
        </div>
      )}
    </div>
  );
};

export default BootScreen;
