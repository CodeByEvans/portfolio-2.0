import { PROJECTS } from "../../data/projects";
import type { DesktopDockProps } from "./types";

const ArrowRightIcon = () => {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
};

const DesktopDock = ({ onContinue, onOpenProject, onOpenPatterns }: DesktopDockProps) => {
  return (
    <div className="desktop-dock absolute bottom-3 left-1/2 -translate-x-1/2 z-30">
      <div
        className="flex items-center gap-1.5 px-3 py-2 rounded-2xl
        bg-white/[0.04] backdrop-blur-xl border border-white/[0.08]"
      >
        {PROJECTS.map((p) => {
          const isWhiteLogo = p.id === "tualergiahoy" || p.id === "clover-studio";
          return (
          <button
            key={p.id}
            onClick={() => onOpenProject(p.id)}
            className="group relative flex flex-col items-center px-1"
          >
            <div className={`w-10 h-10 rounded-xl border border-white/[0.08]
              flex items-center justify-center overflow-hidden
              transition-transform duration-150 hover:scale-110
              ${isWhiteLogo ? "p-0.5 bg-white" : "p-1.5 bg-white/[0.06]"}`}>
              <img src={p.logoSrc} alt={p.title} className="w-full h-full object-contain" draggable={false} />
            </div>
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[9px] text-white/20 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {p.title}
            </span>
          </button>
          );
        })}

        <div className="w-px h-6 bg-white/[0.08] mx-1 self-center" />

        <button
          onClick={onOpenPatterns}
          className="group relative flex flex-col items-center px-1"
        >
          <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08]
            flex items-center justify-center
            transition-transform duration-150 hover:scale-110">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              className="text-cyan-400/50">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </div>
          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[9px] text-white/20 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Patrones
          </span>
        </button>

        <div className="w-px h-6 bg-white/[0.08] mx-1 self-center" />

        <button
          onClick={onContinue}
          className="px-3 h-10 rounded-xl bg-cyan-400/[0.08] border border-cyan-400/20
            text-cyan-300 text-xs font-medium flex items-center gap-1.5
            hover:bg-cyan-400/15 hover:border-cyan-400/40 transition-all duration-150 cursor-pointer"
        >
          Continuar
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
};

export default DesktopDock;
