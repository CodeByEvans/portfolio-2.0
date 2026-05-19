import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { PROJECTS } from "../../data/projects";
import VinylDisc from "./VinylDisc";
import type { IPhoneScreenProps } from "./types";

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

const IPhoneScreen = ({ onContinue }: IPhoneScreenProps) => {
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [locked, setLocked] = useState(
    () => localStorage.getItem("iphone-unlocked") !== "true"
  );
  const screenRef = useRef<HTMLDivElement>(null);
  const lockRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState("");

  const project = selectedApp
    ? PROJECTS.find((p) => p.id === selectedApp)
    : null;

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })
      );
    };
    update();
    const iv = setInterval(update, 1000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    if (screenRef.current) {
      gsap.fromTo(
        screenRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" },
      );
    }
  }, []);

  useEffect(() => {
    if (locked && lockRef.current) {
      gsap.fromTo(lockRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power2.out" });
    }
  }, [locked]);

  const handleUnlock = () => {
    if (!lockRef.current) return;
    gsap.to(lockRef.current, {
      y: -60,
      opacity: 0,
      duration: 0.5,
      ease: "power3.in",
      onComplete: () => {
        setLocked(false);
        localStorage.setItem("iphone-unlocked", "true");
        localStorage.setItem("desktop-booted", "true");
        window.dispatchEvent(new Event("desktop-booted"));
      },
    });
  };

  return (
    <div
      ref={screenRef}
      className="min-h-screen w-full flex flex-col relative overflow-hidden"
    >
      {/* Lock Screen — only on first visit */}
      {locked && (
        <div
          ref={lockRef}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center cursor-pointer"
          style={{
            background: "linear-gradient(180deg, #0b0f1c 0%, #0f1320 40%, #111827 100%)",
          }}
          onClick={handleUnlock}
        >
          {/* Time */}
          <p className="text-[64px] font-light text-white/90 tracking-tight font-sans leading-none">
            {time}
          </p>
          {/* Date */}
          <p className="text-sm text-white/50 mt-1.5 font-sans">
            {new Date().toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })}
          </p>
          {/* Lock icon */}
          <div className="mt-12 mb-8">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
              className="text-white/30">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
          </div>
          {/* Swipe hint */}
          <p className="text-xs text-white/20 font-sans animate-pulse">
            desliza para desbloquear
          </p>
          {/* Home indicator */}
          <div className="absolute bottom-6 w-28 h-1 bg-white/[0.15] rounded-full" />
        </div>
      )}

      {!selectedApp ? (
        /* Home Screen */
        <div className="flex-1 flex flex-col relative">
          {/* Wallpaper — same as desktop */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0b0f1c] via-[#111827] to-[#0a0f1a]" />
            <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-500/[0.06] blur-[120px]" />
            <div className="absolute bottom-[-15%] left-[-5%] w-[50%] h-[50%] rounded-full bg-cyan-500/[0.05] blur-[100px]" />
            <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] rounded-full bg-violet-500/[0.04] blur-[80px]" />
          </div>

          {/* App Grid */}
          <div className="w-full flex-1 flex items-start justify-center relative z-10 pt-20">
            <div className="grid grid-cols-4 gap-x-6 place-items-center px-4">
              {PROJECTS.map((p) => {
                const isWhiteLogo =
                  p.id === "tualergiahoy" || p.id === "clover-studio";
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedApp(p.id)}
                    className="flex flex-col items-center gap-2"
                  >
                    <div
                      className={`w-[72px] h-[72px] rounded-2xl border border-white/[0.1]
                    flex items-center justify-center overflow-hidden
                    active:scale-90 transition-transform duration-100
                    ${isWhiteLogo ? "p-1.5 bg-white" : "p-2 bg-white/[0.08]"}`}
                    >
                      <img
                        src={p.logoSrc}
                        alt={p.title}
                        className="w-full h-full object-contain"
                        draggable={false}
                      />
                    </div>
                    <span className="text-[10px] text-white/50 font-medium leading-tight text-center">
                      {p.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dock */}
          <div className="relative z-10 mx-auto mb-6 w-full px-4">
            <div className="rounded-[1.5rem] bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] px-5 py-3 flex items-center justify-center">
              <button
                onClick={onContinue}
                className="px-4 py-2 rounded-xl bg-cyan-400/[0.1] border border-cyan-400/20
                  text-cyan-300 text-xs font-medium flex items-center gap-1.5
                  active:scale-95 transition-transform"
              >
                Continuar
                <ArrowRightIcon />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* App Detail */
        <div className="flex-1 flex flex-col pt-14 pb-4 px-5 overflow-hidden">
          <div className="flex items-center gap-3 mb-4 shrink-0">
            <button
              onClick={() => setSelectedApp(null)}
              className="text-cyan-400 text-sm font-medium"
            >
              ← Volver
            </button>
            <span className="text-sm text-white/40 font-mono">
              {project?.title}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4">
            <div className="flex flex-col items-center gap-3">
              <VinylDisc
                logoSrc={project!.logoSrc}
                size="md"
                spinning={true}
                labelBg={
                  project!.id === "tualergiahoy" ||
                  project!.id === "clover-studio"
                    ? "#ffffff"
                    : "#0f0f0f"
                }
              />
              <div className="text-center">
                <h3 className="text-base font-semibold text-white/85">
                  {project!.title}
                </h3>
                <span className="text-[12px] text-cyan-400/60 font-mono">
                  {project!.subtitle}
                </span>
              </div>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.05] rounded-lg p-4">
              <p className="text-[12px] text-white/55 leading-relaxed text-center">
                {project!.description}
              </p>
            </div>
            <div className="space-y-1.5">
              <span className="text-[10px] text-white/20 uppercase tracking-wider font-mono">
                Tecnologías
              </span>
              <div className="flex flex-wrap justify-center gap-1.5">
                {project!.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-[10px] font-mono text-cyan-400/70 bg-cyan-400/[0.05] border border-cyan-400/10 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            {(project!.github || project!.web) && (
              <div className="flex items-center justify-center gap-3">
                {project!.github && (
                  <a
                    href={project!.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08]
                      text-[10px] text-white/50 font-mono hover:text-cyan-400 hover:border-cyan-400/30 transition-colors"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="shrink-0"
                    >
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    GitHub
                  </a>
                )}
                {project!.web && (
                  <a
                    href={project!.web}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cyan-400/[0.06] border border-cyan-400/20
                      text-[10px] text-cyan-300/80 font-mono hover:bg-cyan-400/[0.12] transition-colors"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                    </svg>
                    {new URL(project!.web).hostname}
                  </a>
                )}
              </div>
            )}
            {project!.mediaType === "video" && (
              <div className="rounded-lg overflow-hidden border border-white/[0.06] shadow-md shadow-black/30">
                <video
                  src={project!.mediaSrc as string}
                  autoPlay muted loop playsInline controls
                  className="w-full"
                />
              </div>
            )}
            {project!.mediaType === "image" &&
              (project!.mediaSrc as string[]).length > 1 && (
                <div className="grid grid-cols-2 gap-2">
                  {(project!.mediaSrc as string[]).map((src) => (
                    <div
                      key={src}
                      className="rounded-lg overflow-hidden border border-white/[0.06]"
                    >
                      <img
                        src={src}
                        alt={project!.title}
                        className="w-full h-24 object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            {project!.mediaType === "image" &&
              (project!.mediaSrc as string[]).length === 1 && (
                <div className="rounded-lg overflow-hidden border border-white/[0.06] shadow-md shadow-black/30">
                  <img
                    src={(project!.mediaSrc as string[])[0]}
                    alt={project!.title}
                    className="w-full max-h-44 object-cover"
                  />
                </div>
              )}
            <div className="border-t border-white/[0.04] pt-3">
              <p className="text-[10px] text-white/20 italic text-center leading-relaxed">
                {project!.curiosity}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IPhoneScreen;
