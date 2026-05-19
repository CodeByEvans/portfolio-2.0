import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { PROJECTS } from "../data/projects";
import type { Section } from "../components/Header";
import WeatherWidget from "../components/projects/WeatherWidget";
import DesktopIcon from "../components/projects/DesktopIcon";
import DesktopDock from "../components/projects/DesktopDock";
import ProjectWindow from "../components/projects/ProjectWindow";
import DesignPatternsWindow from "../components/projects/DesignPatternsWindow";
import IPhoneScreen from "../components/projects/IPhoneScreen";
import BootScreen from "../components/projects/BootScreen";

interface Props {
  onNavigate: (section: Section) => void;
}

const ProjectsPage = ({ onNavigate }: Props) => {
  const [bootPhase, setBootPhase] = useState<"off" | "booting" | "ready">(() => {
    return localStorage.getItem("desktop-booted") === "true" ? "ready" : "off";
  });
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);
  const [patternsOpen, setPatternsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [ideTransition, setIdeTransition] = useState(false);
  const [termCmd1, setTermCmd1] = useState("");
  const [termCmd2, setTermCmd2] = useState("");
  const [termPhase, setTermPhase] = useState(0);
  const ideOverlayRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const spinCtx = useRef<gsap.Context | null>(null);
  const bootTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (bootPhase === "booting") {
      bootTimer.current = setTimeout(() => {
        setBootPhase("ready");
        localStorage.setItem("desktop-booted", "true");
        window.dispatchEvent(new Event("desktop-booted"));
      }, 2000);
    }
    return () => {
      if (bootTimer.current) clearTimeout(bootTimer.current);
    };
  }, [bootPhase]);

  useEffect(() => {
    if (bootPhase !== "ready") return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".desktop-bg", { opacity: 0 }, { opacity: 1, duration: 0.6 });
      gsap.fromTo(
        ".desktop-icon",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
      );
      gsap.fromTo(
        ".desktop-dock",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)", delay: 0.4 },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [bootPhase]);

  useEffect(() => {
    spinCtx.current?.revert();
    if (bootPhase === "ready") {
      spinCtx.current = gsap.context(() => {
        gsap.to(".rotating", {
          rotation: 360,
          duration: 8,
          repeat: -1,
          ease: "none",
        });
      }, sectionRef);
    }
    return () => spinCtx.current?.revert();
  }, [bootPhase, openProjectId]);

  const handleBoot = useCallback(() => {
    setBootPhase("booting");
  }, []);

  const handleOpenProject = useCallback(
    (id: string) => setOpenProjectId(id),
    [],
  );
  const handleCloseWindow = useCallback(() => setOpenProjectId(null), []);
  const handleOpenFromDock = useCallback(
    (id: string) => setOpenProjectId(id),
    [],
  );

  const handleContinueToStack = useCallback(() => {
    if (isMobile) {
      onNavigate("stack");
      return;
    }
    setIdeTransition(true);
  }, [isMobile, onNavigate]);

  useEffect(() => {
    if (!ideTransition || !ideOverlayRef.current) return;
    const overlay = ideOverlayRef.current;

    const tl = gsap.timeline();
    tl.fromTo(
      overlay,
      { opacity: 0 },
      { opacity: 1, duration: 0.2, ease: "power2.out" },
    );
    tl.fromTo(
      ".terminal-window",
      { scale: 0.4, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
      "-=0.05",
    );

    tl.call(
      () => {
        const cmd = "cd projects/stack";
        let i = 0;
        const iv = setInterval(() => {
          i++;
          setTermCmd1(cmd.slice(0, i));
          if (i >= cmd.length) {
            clearInterval(iv);
            setTimeout(() => {
              const cmd2 = "code .";
              let j = 0;
              const iv2 = setInterval(() => {
                j++;
                setTermCmd2(cmd2.slice(0, j));
                if (j >= cmd2.length) {
                  clearInterval(iv2);
                  setTermPhase(2);
                  setTimeout(() => {
                    gsap.to(overlay, {
                      opacity: 0,
                      duration: 0.3,
                      ease: "power3.in",
                      onComplete: () => onNavigate("stack"),
                    });
                  }, 700);
                }
              }, 70);
            }, 500);
          }
        }, 60);
      },
      undefined,
      "+=0.3",
    );

    return () => {
      gsap.killTweensOf(overlay);
    };
  }, [ideTransition, onNavigate]);

  const openProject = openProjectId
    ? (PROJECTS.find((p) => p.id === openProjectId) ?? null)
    : null;

  return (
    <section
      ref={sectionRef}
      className="flex flex-col items-center justify-center min-h-screen bg-[#080808] overflow-hidden"
    >
      {isMobile ? (
        <IPhoneScreen onContinue={handleContinueToStack} />
      ) : (
        <>
          {bootPhase !== "ready" && (
            <BootScreen phase={bootPhase} onBoot={handleBoot} />
          )}

          {bootPhase === "ready" && (
            <div className="absolute inset-0 flex flex-col">
              <div
                className="h-7 bg-white/[0.015] backdrop-blur-xl border-b border-white/[0.05]
                flex items-center px-4 text-[11px] text-white/30 font-medium select-none shrink-0"
              >
                <span className="font-bold text-white/40">🍎</span>
                <span className="ml-3 font-semibold text-white/50 text-[12px]">
                  CodeByEvans
                </span>
                <span className="ml-5 hover:text-white/50 cursor-default transition-colors">
                  File
                </span>
                <span className="ml-3 hover:text-white/50 cursor-default transition-colors">
                  Edit
                </span>
                <span className="ml-3 hover:text-white/50 cursor-default transition-colors">
                  View
                </span>
              </div>

              <div className="flex-1 relative overflow-hidden">
                <div className="desktop-bg absolute inset-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0b0f1c] via-[#111827] to-[#0a0f1a]" />
                  <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-500/[0.04] blur-[120px]" />
                  <div className="absolute bottom-[-15%] left-[-5%] w-[50%] h-[50%] rounded-full bg-cyan-500/[0.03] blur-[100px]" />
                  <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] rounded-full bg-violet-500/[0.03] blur-[80px]" />
                </div>

                <WeatherWidget />

                {PROJECTS.map((p, i) => (
                  <DesktopIcon
                    key={p.id}
                    project={p}
                    initialX={48}
                    initialY={72 + i * 120}
                    onOpen={handleOpenProject}
                  />
                ))}

                <div
                  className="desktop-icon absolute select-none cursor-default touch-none flex flex-col items-center gap-1.5 w-20"
                  style={{ transform: "translate(48px, 432px)" }}
                  onDoubleClick={() => setPatternsOpen(true)}
                >
                  <div
                    className="w-14 h-14 rounded-2xl bg-white/[0.06] border border-white/[0.08]
                    flex items-center justify-center overflow-hidden hover:border-white/[0.15] transition-colors"
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-cyan-400/70"
                    >
                      <rect x="3" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" />
                      <rect x="14" y="14" width="7" height="7" rx="1" />
                    </svg>
                  </div>
                  <span className="text-[11px] text-white/60 leading-tight text-center font-medium">
                    Patrones
                  </span>
                </div>

                {openProject && (
                  <ProjectWindow
                    key={openProjectId}
                    project={openProject}
                    onClose={handleCloseWindow}
                  />
                )}

                {patternsOpen && (
                  <DesignPatternsWindow
                    onClose={() => setPatternsOpen(false)}
                  />
                )}
              </div>

              <DesktopDock
                onContinue={handleContinueToStack}
                onOpenProject={handleOpenFromDock}
                onOpenPatterns={() => setPatternsOpen(true)}
              />
            </div>
          )}
        </>
      )}

      {/* Terminal animation overlay */}
      {ideTransition && (
        <div
          ref={ideOverlayRef}
          className="absolute inset-0 z-50 bg-[#080808]/95 flex items-center justify-center p-4 sm:p-8"
        >
          <div className="terminal-window w-full max-w-2xl rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-white/[0.06]">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-[#2c2c2c] border-b border-white/[0.05]">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57] shrink-0" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e] shrink-0" />
              <span className="w-3 h-3 rounded-full bg-[#28c840] shrink-0" />
              <span className="flex-1 text-center text-[11px] text-white/30 font-medium">
                Terminal — zsh
              </span>
            </div>

            <div className="bg-[#0d1117] p-4 sm:p-5 font-mono text-sm leading-6 min-h-[240px] sm:min-h-[280px]">
              <div className="flex items-start flex-wrap">
                <span className="text-[#58a6ff] shrink-0">codebyevans</span>
                <span className="text-white/50 shrink-0">@</span>
                <span className="text-[#3fb950] shrink-0">web-app</span>
                <span className="text-white shrink-0 mx-1">~</span>
                <span className="text-white/30 shrink-0 mr-1">%</span>
                <span className="text-[#c9d1d9] whitespace-pre">
                  {termCmd1}
                </span>
                {termCmd1.length < "cd projects/stack".length && (
                  <span className="w-2 h-5 bg-white/60 ml-0.5 inline-block animate-pulse" />
                )}
              </div>

              {termCmd2 && (
                <div className="flex items-start flex-wrap mt-0.5">
                  <span className="text-[#58a6ff] shrink-0">codebyevans</span>
                  <span className="text-white/50 shrink-0">@</span>
                  <span className="text-[#3fb950] shrink-0">web-app</span>
                  <span className="text-white shrink-0 mx-1">stack</span>
                  <span className="text-white/30 shrink-0 mr-1">%</span>
                  <span className="text-[#c9d1d9] whitespace-pre">
                    {termCmd2}
                  </span>
                  {termCmd2.length < "code .".length && (
                    <span className="w-2 h-5 bg-white/60 ml-0.5 inline-block animate-pulse" />
                  )}
                </div>
              )}

              {termPhase === 2 && (
                <div className="mt-2 text-[#3fb950]/60 text-[11px] sm:text-xs">
                  Opening VS Code...
                </div>
              )}

              {!termCmd2 && (
                <div className="text-transparent select-none">_</div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes loadingGrow { from { width: 0%; } to { width: 100%; } }
        .loading-bar { animation: loadingGrow 1.8s ease-in-out forwards; }
        @keyframes ping-slow { 75%, 100% { transform: scale(1.3); opacity: 0; } }
      `}</style>
    </section>
  );
};

export default ProjectsPage;
