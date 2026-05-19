import { useState, useEffect } from "react";
import { PROJECTS } from "../../data/projects";

const MobilePhone = () => {
  const [booted, setBooted] = useState(
    () => localStorage.getItem("desktop-booted") === "true",
  );
  const [time, setTime] = useState("9:41");
  const [battery, setBattery] = useState();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      setTime(`${hours}:${minutes.toString().padStart(2, "0")}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    (navigator as any).getBattery?.().then((b: any) => {
      const updateBattery = () => setBattery(b.level);
      updateBattery();
      b.addEventListener("levelchange", updateBattery);
      return () => b.removeEventListener("levelchange", updateBattery);
    });
  }, []);

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
    <div className="relative z-20 shrink-0">
      <div
        className="relative bg-[#0a0a0a] rounded-[1.5rem] border-2 border-white/[0.1] shadow-2xl shadow-black/50 overflow-hidden"
        style={{ width: 100, height: 210 }}
      >
        {/* Dynamic Island */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[34px] h-[10px] bg-black rounded-full z-40" />

        {/* Status bar */}
        <div
          className={`${booted ? "opacity-100" : "opacity-0"} absolute top-2.5 left-0 right-0 flex justify-between px-2 text-[5px] text-white/50 font-medium z-40`}
        >
          <span>{time}</span>
          <span>
            {battery ? `${Math.round(battery * 100)}%` : "Loading..."}
          </span>
        </div>

        {booted ? (
          /* Home Screen */
          <div className="h-full flex flex-col pt-10 px-2.5 relative">
            {/* Wallpaper — same as desktop */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0b0f1c] via-[#111827] to-[#0a0f1a]" />
              <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-500/[0.06] blur-[30px]" />
              <div className="absolute bottom-[-15%] left-[-5%] w-[50%] h-[50%] rounded-full bg-cyan-500/[0.05] blur-[25px]" />
              <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] rounded-full bg-violet-500/[0.04] blur-[20px]" />
            </div>

            {/* App Grid */}
            <div className="grid grid-cols-4 gap-y-2 gap-x-6 place-items-center mb-auto px-2.5 relative z-10">
              {PROJECTS.map((p) => {
                const isWhite =
                  p.id === "tualergiahoy" || p.id === "clover-studio";
                return (
                  <div
                    key={p.id}
                    className="flex flex-col items-center gap-0.5"
                  >
                    <div
                      className={`w-[20px] h-[20px] rounded-lg flex items-center justify-center overflow-hidden ${
                        isWhite ? "p-0.5 bg-white" : "p-1 bg-white/[0.08]"
                      }`}
                    >
                      <img
                        src={p.logoSrc}
                        alt=""
                        className="w-full h-full object-contain"
                        draggable={false}
                      />
                    </div>
                    <span className="text-[3px] text-white/50 leading-tight text-center w-8 truncate">
                      {p.title}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Dock */}
            <div className="mb-1 mx-0.5 rounded-2xl bg-white/[0.04] border border-white/[0.06] px-2 py-1 flex items-center justify-center relative z-10">
              <span className="text-[4px] text-cyan-300/60 flex items-center gap-0.5">
                Continuar
                <svg
                  width="3"
                  height="3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>

            {/* Home indicator */}
            <div className="mx-auto mb-0.5 w-10 h-0.5 bg-white/[0.15] rounded-full relative z-10" />
          </div>
        ) : (
          <div className="absolute inset-2 rounded-[1.5rem] bg-[#05080c]" />
        )}
      </div>

      {/* Side button */}
      <div className="absolute right-[-2px] top-16 w-[2px] h-8 bg-[#2a2a2a] rounded-r" />
    </div>
  );
};

export default MobilePhone;
