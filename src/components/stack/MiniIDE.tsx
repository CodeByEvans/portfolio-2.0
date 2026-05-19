import { useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { TypeAnimation } from "react-type-animation";

const WindowDots = ({ onMinimize }: { onMinimize?: () => void }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
      <span
        onClick={onMinimize}
        className={`w-3 h-3 rounded-full bg-[#febc2e] ${onMinimize ? "cursor-pointer hover:brightness-125 transition-all" : ""}`}
      />
      <span className="w-3 h-3 rounded-full bg-[#28c840]" />
    </div>
  );
};

interface Props {
  filename: string;
  code: string;
  onTypingComplete: () => void;
  children?: ReactNode;
  skipTyping?: boolean;
  compact?: boolean;
  onMinimize?: () => void;
}

const MiniIDE = ({
  filename,
  code,
  onTypingComplete,
  children,
  skipTyping = false,
  compact = false,
  onMinimize,
}: Props) => {
  const ideRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(false);

  const lineCount = code.split("\n").length;

  useEffect(() => {
    if (skipTyping) {
      onTypingComplete();
    }
  }, [skipTyping, onTypingComplete]);

  useEffect(() => {
    if (!ideRef.current) return;
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    const tl = gsap.timeline();
    tl.to(ideRef.current, {
      scale: 0.98,
      duration: 0.12,
      ease: "power2.in",
    }).to(ideRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "back.out(1.7)",
    });
  }, [code]);

  return (
    <div
      ref={ideRef}
      className="rounded-xl overflow-hidden border border-white/[0.08] bg-[#1e1e1e] shadow-2xl shadow-black/50"
    >
      <div className="flex items-center px-4 py-3 bg-[#2d2d2d] border-b border-white/[0.06]">
        <WindowDots onMinimize={onMinimize} />
        <div className="flex-1 flex justify-center">
          <span className="text-xs text-white/45 font-mono">{filename}</span>
        </div>
        <div className="w-[52px]" />
      </div>

      <div className={`flex ${compact ? "" : "min-h-[220px]"}`}>
        {!compact && (
          <>
        <div className="hidden sm:flex flex-col w-40 border-r border-white/[0.06] bg-[#252526] p-3 select-none">
          <span className="text-[10px] uppercase tracking-widest text-white/25 font-semibold mb-3">
            Explorer
          </span>
          <div className="flex items-center gap-1.5 text-xs text-white/65">
            <span className="text-[10px]">📁</span>
            <span>src</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-cyan-400/70 ml-3 mt-1.5">
            <span className="text-[10px]">📄</span>
            <span>{filename}</span>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4 font-mono text-sm leading-6">
          <div className="flex">
            <div className="select-none text-right pr-4 text-[#858585] text-xs leading-6 min-w-[2rem]">
              {Array.from({ length: lineCount }, (_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            <div className="flex-1 text-[#d4d4d4]">
              {skipTyping ? (
                <span className="whitespace-pre-wrap">{code}</span>
              ) : (
                <TypeAnimation
                  key={code}
                  sequence={[code, onTypingComplete]}
                  speed={{ type: "keyStrokeDelayInMs", value: 18 }}
                  cursor={true}
                  repeat={0}
                  wrapper="span"
                  className="whitespace-pre-wrap"
                />
              )}
            </div>
          </div>
        </div>
          </>
        )}
      </div>

      {!compact && children}
    </div>
  );
};

export default MiniIDE;
