import { useState, useEffect } from "react";
import { PROJECTS } from "../../data/projects";

const Monitor = () => {
  const [booted, setBooted] = useState(
    () => localStorage.getItem("desktop-booted") === "true"
  );

  useEffect(() => {
    const check = () =>
      setBooted(localStorage.getItem("desktop-booted") === "true");
    window.addEventListener("storage", check);
    window.addEventListener("desktop-booted", check);
    return () => {
      window.removeEventListener("storage", check);
      window.removeEventListener("desktop-booted", check);
    };
  }, []);

  return (
    <div className="relative z-20 group">
      <div
        className="absolute -inset-6 sm:-inset-10 rounded-2xl blur-xl sm:blur-3xl"
        style={{
          background: booted
            ? "radial-gradient(ellipse at 50% 40%, rgba(100,200,255,0.5) 0%, rgba(60,140,200,0.25) 35%, rgba(20,60,100,0.08) 65%, transparent 85%)"
            : "transparent",
          opacity: booted ? undefined : 0,
        }}
      />
      <div className="transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:drop-shadow-[0_0_18px_rgba(234,179,8,0.4)]">
        <div
          className="relative mx-auto bg-[#1a1a1a] rounded-xl border-[6px] border-[#2a2a2a] shadow-2xl shadow-black/50 overflow-hidden"
          style={{ width: "min(360px, 85vw", aspectRatio: "16/9" }}
        >
          {booted ? (
            <div className="monitor-screen absolute inset-2 rounded-md bg-gradient-to-br from-[#0a1628] via-[#0e1f3a] to-[#07101e] overflow-hidden">
            {/* Desktop Icons — top left, vertical */}
            <div className="absolute top-1.5 left-1.5 flex flex-col gap-0.5">
              {PROJECTS.map((p) => {
                const isWhite =
                  p.id === "tualergiahoy" || p.id === "clover-studio";
                return (
                  <div
                    key={p.id}
                    className="flex flex-col items-center w-7"
                  >
                    <div
                      className={`w-3.5 h-3.5 rounded-md flex items-center justify-center overflow-hidden ${
                        isWhite ? "bg-white" : "bg-white/[0.06]"
                      }`}
                    >
                      <img
                        src={p.logoSrc}
                        alt=""
                        className="w-2.5 h-2.5 object-contain"
                        draggable={false}
                      />
                    </div>
                    <span className="text-[4px] text-white/35 mt-px leading-none truncate w-full text-center">
                      {p.title}
                    </span>
                  </div>
                );
              })}

              {/* Patrones icon */}
              <div className="flex flex-col items-center w-7">
                <div className="w-3.5 h-3.5 rounded-md bg-white/[0.06] flex items-center justify-center">
                  <svg
                    width="7"
                    height="7"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-cyan-400/40"
                  >
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                </div>
                <span className="text-[4px] text-white/35 mt-px leading-none truncate w-full text-center">
                  Patrones
                </span>
              </div>
            </div>

            {/* Weather Widget — top right */}
            <div className="absolute top-1.5 right-1.5 bg-black/30 backdrop-blur-[2px] rounded-md px-1 py-[0.5px] flex items-center gap-0.5 border border-white/[0.04]">
              <span className="text-[6px]">☀️</span>
              <span className="text-[5px] text-white/40 font-mono leading-none">
                22°
              </span>
            </div>

            {/* Dock — bottom center */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-0.5 px-1.5 py-[2px] rounded-md bg-white/[0.04] backdrop-blur-[2px] border border-white/[0.05]">
                {PROJECTS.map((p) => {
                  const isWhite =
                    p.id === "tualergiahoy" || p.id === "clover-studio";
                  return (
                    <div
                      key={p.id}
                      className={`w-3 h-3 rounded-sm flex items-center justify-center overflow-hidden ${
                        isWhite
                          ? "bg-white p-[0.5px]"
                          : "bg-white/[0.05] p-[1px]"
                      }`}
                    >
                      <img
                        src={p.logoSrc}
                        alt=""
                        className="w-full h-full object-contain"
                        draggable={false}
                      />
                    </div>
                  );
                })}

                <div className="w-px h-2 bg-white/[0.06]" />

                <div className="w-3 h-3 rounded-sm bg-white/[0.05] flex items-center justify-center">
                  <svg
                    width="6"
                    height="6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-cyan-400/30"
                  >
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                </div>

                <div className="w-px h-2 bg-white/[0.06]" />

                <div className="px-1 h-3 rounded-sm bg-cyan-400/[0.08] border border-cyan-400/15 flex items-center">
                  <svg
                    width="5"
                    height="5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-cyan-300/50"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          ) : (
            <div className="monitor-screen absolute inset-2 rounded-md bg-[#05080c]" />
          )}

          <div className="absolute inset-2 rounded-md bg-gradient-to-br from-white/[0.03] via-transparent to-transparent pointer-events-none" />
        </div>

        <div className="mx-auto w-24 h-3 bg-[#3a3a3a] rounded-b-sm mt-0" />
        <div className="mx-auto w-8 h-14 bg-[#2d2d2d]" />
        <div className="mx-auto w-32 h-2 bg-[#3a3a3a] rounded-t-sm" />
      </div>

      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#111] rounded-full border border-[#333]" />
    </div>
  );
};

export default Monitor;
