import { useRef, useEffect } from "react";
import gsap from "gsap";

interface Props {
  command: string;
  output: string;
  onRevealComplete: () => void;
}

const ConsoleTerminal = ({
  command,
  output,
  onRevealComplete,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 0.5,
          ease: "power3.out",
          onComplete: () => {
            setTimeout(() => onRevealComplete(), 350);
          },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, [onRevealComplete]);

  return (
    <div ref={ref} className="border-t border-white/[0.06] bg-[#0d1117]">
      <div className="flex items-center px-4 py-1.5 bg-[#161b22] border-b border-white/[0.04] select-none">
        <span className="text-[10px] uppercase tracking-widest text-white/25 font-semibold">
          Terminal
        </span>
      </div>
      <div className="p-4 font-mono text-sm">
        <div className="flex items-center gap-2 text-white/80">
          <span className="text-green-400 select-none">❯</span>
          <span>{command}</span>
        </div>
        <div className="mt-2 text-white/45 text-xs leading-5 whitespace-pre">
          {output}
        </div>
      </div>
    </div>
  );
};

export default ConsoleTerminal;
