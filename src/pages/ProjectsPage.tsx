import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { PROJECTS, type Project } from "../data/projects";
import type { Section } from "../components/Header";

/* ---------- SVG icons ---------- */
function PowerIcon() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2v10" />
      <path d="M18.4 5.6a9 9 0 1 1-12.8 0" />
    </svg>
  );
}

function TerminalIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

function ArrowRightIcon() {
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
}

/* ---------- Vinyl Disc (futuristic) ---------- */
function VinylDisc({ logoSrc, size = "md", spinning }: {
  logoSrc: string;
  size?: "sm" | "md";
  spinning: boolean;
}) {
  const isSm = size === "sm";
  const discSize = isSm ? "w-20 h-20" : "w-36 h-36";
  const grooves = isSm
    ? ["inset-[4px]", "inset-[10px]", "inset-[17px]"]
    : ["inset-[6px]", "inset-[15px]", "inset-[25px]"];
  const labelInset = isSm ? "inset-[22px] p-2" : "inset-[32px] p-3";
  const glowSize = isSm ? "-inset-[3px]" : "-inset-[4px]";

  return (
    <div className={`relative ${discSize} shrink-0`}>
      <div className={`absolute ${glowSize} rounded-full border border-cyan-400/20`} />
      <div
        className={`vinyl-disc absolute inset-0 rounded-full
          bg-gradient-to-br from-[#1a1a1a] to-[#111]
          border-2 border-white/[0.08]
          ${spinning ? "rotating" : ""}`}
      >
        {grooves.map((inset) => (
          <div key={inset} className={`absolute ${inset} rounded-full border border-white/[0.04]`} />
        ))}
        <div
          className={`absolute ${labelInset} rounded-full bg-[#0f0f0f] border border-white/[0.06] flex items-center justify-center overflow-hidden`}
        >
          <img src={logoSrc} alt="" className="w-full h-full object-contain" draggable={false} />
        </div>
      </div>
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.02] via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

/* ---------- Desktop Icon (draggable, double-click) ---------- */
function DesktopIcon({
  project,
  initialX,
  initialY,
  onOpen,
}: {
  project: Project;
  initialX: number;
  initialY: number;
  onOpen: (id: string) => void;
}) {
  const iconRef = useRef<HTMLDivElement>(null);
  const xTo = useRef<((v: number) => void) | null>(null);
  const yTo = useRef<((v: number) => void) | null>(null);
  const offsetX = useRef(initialX);
  const offsetY = useRef(initialY);
  const dragStart = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const hasMoved = useRef(false);
  const lastClickTime = useRef(0);

  useEffect(() => {
    if (!iconRef.current) return;
    gsap.set(iconRef.current, { x: initialX, y: initialY });
    xTo.current = gsap.quickTo(iconRef.current, "x", { duration: 0.1, ease: "power2.out" });
    yTo.current = gsap.quickTo(iconRef.current, "y", { duration: 0.1, ease: "power2.out" });
  }, [initialX, initialY]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    hasMoved.current = false;
    dragStart.current = { x: e.clientX - offsetX.current, y: e.clientY - offsetY.current };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasMoved.current = true;
    offsetX.current = dx;
    offsetY.current = dy;
    xTo.current?.(dx);
    yTo.current?.(dy);
  }, []);

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
    if (!hasMoved.current) {
      const now = Date.now();
      if (now - lastClickTime.current < 380) {
        onOpen(project.id);
        lastClickTime.current = 0;
        return;
      }
      lastClickTime.current = now;
    }
  }, [project.id, onOpen]);

  return (
    <div
      ref={iconRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      className="desktop-icon absolute select-none cursor-default touch-none
        flex flex-col items-center gap-1.5 w-20"
    >
      <div className="w-14 h-14 rounded-2xl bg-white/[0.06] border border-white/[0.08]
        flex items-center justify-center p-2 overflow-hidden
        group-hover:border-white/[0.15] transition-colors">
        <img src={project.logoSrc} alt={project.title} className="w-full h-full object-contain" draggable={false} />
      </div>
      <span className="text-[11px] text-white/60 leading-tight text-center font-medium">
        {project.title}
      </span>
    </div>
  );
}

/* ---------- Project Window (macOS style) ---------- */
function ProjectWindow({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const windowRef = useRef<HTMLDivElement>(null);
  const xTo = useRef<((v: number) => void) | null>(null);
  const yTo = useRef<((v: number) => void) | null>(null);
  const offsetX = useRef(0);
  const offsetY = useRef(0);
  const dragStart = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  useEffect(() => {
    if (!windowRef.current) return;
    gsap.fromTo(
      windowRef.current,
      { scale: 0.85, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(1.7)" },
    );
    xTo.current = gsap.quickTo(windowRef.current, "x", { duration: 0.05, ease: "power2.out" });
    yTo.current = gsap.quickTo(windowRef.current, "y", { duration: 0.05, ease: "power2.out" });
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    dragStart.current = { x: e.clientX - offsetX.current, y: e.clientY - offsetY.current };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    offsetX.current = e.clientX - dragStart.current.x;
    offsetY.current = e.clientY - dragStart.current.y;
    xTo.current?.(offsetX.current);
    yTo.current?.(offsetY.current);
  }, []);

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleClose = useCallback(() => {
    gsap.to(windowRef.current, {
      scale: 0.9, opacity: 0, duration: 0.2, ease: "power3.in", onComplete: onClose,
    });
  }, [onClose]);

  return (
    <div
      ref={windowRef}
      className="project-window absolute top-1/2 left-1/2
        w-[90vw] max-w-lg max-h-[75vh] overflow-hidden
        bg-[#0c0c0c]/95 backdrop-blur-2xl rounded-xl
        border border-white/[0.08] shadow-2xl shadow-black/60
        flex flex-col z-20"
    >
      {/* Title bar */}
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        className="flex items-center gap-2 px-3 py-2.5 bg-white/[0.02] border-b border-white/[0.06] cursor-grab active:cursor-grabbing touch-none"
      >
        <button
          onClick={handleClose}
          className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer shrink-0"
        />
        <span className="w-3 h-3 rounded-full bg-yellow-500/60 shrink-0" />
        <span className="w-3 h-3 rounded-full bg-green-500/60 shrink-0" />
        <span className="flex-1 text-center text-[11px] text-white/30 font-mono tracking-wide pointer-events-none">
          {project.title}
        </span>
      </div>

      {/* Content */}
      <div className="overflow-y-auto flex-1 p-5 space-y-4">
        <div className="flex justify-center">
          <VinylDisc logoSrc={project.logoSrc} size="md" spinning={true} />
        </div>
        <div>
          <h3 className="text-sm font-medium text-white/80 text-center">{project.subtitle}</h3>
          <p className="mt-2 text-xs text-white/50 leading-relaxed">{project.description}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-1">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-1.5 py-0.5 text-[10px] font-mono text-cyan-400/70 bg-cyan-400/5 border border-cyan-400/10 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
        {project.mediaType === "video" && (
          <video
            src={project.mediaSrc as string}
            autoPlay muted loop playsInline
            className="w-full rounded-lg border border-white/[0.06]"
          />
        )}
        {project.mediaType === "image" && (
          <div className="flex gap-2">
            {(project.mediaSrc as string[]).map((src) => (
              <img
                key={src}
                src={src}
                alt={project.title}
                className="flex-1 h-32 object-cover rounded-lg border border-white/[0.06]"
              />
            ))}
          </div>
        )}
        <p className="text-[11px] text-white/25 italic text-center leading-relaxed">
          {project.curiosity}
        </p>
      </div>
    </div>
  );
}

/* ---------- Desktop Dock ---------- */
function DesktopDock({ onNavigate, onOpenProject }: {
  onNavigate: (s: Section) => void;
  onOpenProject: (id: string) => void;
}) {
  return (
    <div className="desktop-dock absolute bottom-3 left-1/2 -translate-x-1/2 z-30">
      <div
        className="flex items-end gap-1.5 px-3 py-2 rounded-2xl
        bg-white/[0.04] backdrop-blur-xl border border-white/[0.08]"
      >
        {PROJECTS.map((p) => (
          <button
            key={p.id}
            onClick={() => onOpenProject(p.id)}
            className="group flex flex-col items-center gap-0.5 px-1"
          >
            <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08]
              flex items-center justify-center p-1.5 overflow-hidden
              transition-transform duration-150 hover:scale-110">
              <img src={p.logoSrc} alt={p.title} className="w-full h-full object-contain" draggable={false} />
            </div>
            <span className="text-[9px] text-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
              {p.title}
            </span>
          </button>
        ))}

        <div className="w-px h-6 bg-white/[0.08] mx-1 self-center" />

        <button
          onClick={() => onNavigate("stack")}
          title="Terminal — Stack"
          className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08]
            flex items-center justify-center text-white/40 hover:text-cyan-400
            hover:border-cyan-400/30 transition-all duration-150 hover:scale-110 cursor-pointer"
        >
          <TerminalIcon />
        </button>

        <div className="w-px h-6 bg-white/[0.08] mx-1 self-center" />

        <button
          onClick={() => onNavigate("sobre-mi")}
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
}

/* ---------- iPhone View (mobile) ---------- */
function IPhoneScreen({ onNavigate }: { onNavigate: (s: Section) => void }) {
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const screenRef = useRef<HTMLDivElement>(null);

  const project = selectedApp ? PROJECTS.find((p) => p.id === selectedApp) : null;

  useEffect(() => {
    if (screenRef.current) {
      gsap.fromTo(screenRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" });
    }
  }, []);

  return (
    <div ref={screenRef} className="max-w-[340px] mx-auto px-4 pt-8 pb-4">
      {/* iPhone frame */}
      <div className="relative bg-[#0a0a0a] rounded-[3rem] border-2 border-white/[0.1] shadow-2xl shadow-black/50 overflow-hidden aspect-[9/19]">
        {/* Dynamic Island */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-50" />

        {/* Status bar */}
        <div className="absolute top-4 left-0 right-0 flex justify-between px-8 text-[10px] text-white/50 font-medium z-40">
          <span>9:41</span>
          <span>🔋 85%</span>
        </div>

        {!selectedApp ? (
          /* Home Screen */
          <div className="h-full flex flex-col pt-16 px-6">
            {/* App Grid */}
            <div className="grid grid-cols-3 gap-y-6 gap-x-4 place-items-center mb-auto mt-4">
              {PROJECTS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedApp(p.id)}
                  className="flex flex-col items-center gap-1.5"
                >
                  <div className="w-[60px] h-[60px] rounded-2xl bg-white/[0.08] border border-white/[0.1]
                    flex items-center justify-center p-2 overflow-hidden
                    active:scale-90 transition-transform duration-100">
                    <img src={p.logoSrc} alt={p.title} className="w-full h-full object-contain" draggable={false} />
                  </div>
                  <span className="text-[10px] text-white/50 font-medium leading-tight text-center">
                    {p.title}
                  </span>
                </button>
              ))}
            </div>

            {/* Dock */}
            <div className="mb-2 mx-2 rounded-[2rem] bg-white/[0.04] border border-white/[0.06] px-5 py-3 flex items-center justify-center gap-8">
              <button
                onClick={() => onNavigate("stack")}
                className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08]
                  flex items-center justify-center text-white/30 active:text-cyan-400 transition-colors"
              >
                <TerminalIcon />
              </button>
              <div className="w-px h-6 bg-white/[0.08]" />
              <button
                onClick={() => onNavigate("sobre-mi")}
                className="px-3 py-2 rounded-xl bg-cyan-400/[0.1] border border-cyan-400/20
                  text-cyan-300 text-[10px] font-medium flex items-center gap-1"
              >
                Continuar
                <ArrowRightIcon />
              </button>
            </div>

            {/* Home indicator */}
            <div className="mx-auto mb-1.5 w-28 h-1 bg-white/[0.15] rounded-full" />
          </div>
        ) : (
          /* App Detail */
          <div className="h-full flex flex-col pt-14 pb-4 px-5">
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={() => setSelectedApp(null)}
                className="text-cyan-400 text-xs font-medium"
              >
                ← Volver
              </button>
              <span className="text-xs text-white/40 font-mono">{project?.title}</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4">
              <div className="flex justify-center">
                <VinylDisc logoSrc={project!.logoSrc} size="md" spinning={true} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-white/80 text-center">{project!.subtitle}</h3>
                <p className="mt-2 text-[11px] text-white/50 leading-relaxed text-center">{project!.description}</p>
              </div>
              <div className="flex flex-wrap justify-center gap-1">
                {project!.techStack.map((tech) => (
                  <span key={tech} className="px-1.5 py-0.5 text-[9px] font-mono text-cyan-400/70 bg-cyan-400/5 border border-cyan-400/10 rounded">
                    {tech}
                  </span>
                ))}
              </div>
              {project!.mediaType === "video" && (
                <video
                  src={project!.mediaSrc as string}
                  autoPlay muted loop playsInline
                  className="w-full rounded-lg border border-white/[0.06]"
                />
              )}
              {project!.mediaType === "image" && (
                <div className="flex gap-2">
                  {(project!.mediaSrc as string[]).map((src) => (
                    <img key={src} src={src} alt={project!.title}
                      className="flex-1 h-28 object-cover rounded-lg border border-white/[0.06]" />
                  ))}
                </div>
              )}
              <p className="text-[10px] text-white/25 italic text-center leading-relaxed">
                {project!.curiosity}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Main Page ---------- */
interface Props {
  onNavigate: (section: Section) => void;
}

export default function ProjectsPage({ onNavigate }: Props) {
  const [bootPhase, setBootPhase] = useState<"off" | "booting" | "ready">("off");
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const bootRef = useRef<HTMLDivElement>(null);
  const spinCtx = useRef<gsap.Context | null>(null);
  const bootTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (bootPhase === "off" && bootRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".power-ring-outer",
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(2)" },
        );
        gsap.fromTo(
          ".power-btn-inner",
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2.5)", delay: 0.15 },
        );
        gsap.fromTo(
          ".power-label",
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", delay: 0.4 },
        );
      }, bootRef);
      return () => ctx.revert();
    }
  }, [bootPhase]);

  useEffect(() => {
    if (bootPhase === "booting") {
      bootTimer.current = setTimeout(() => {
        setBootPhase("ready");
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
        { y: 20, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, ease: "back.out(1.7)" },
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
    gsap.to(bootRef.current, {
      opacity: 0, scale: 0.95, duration: 0.5, ease: "power3.in",
      onComplete: () => setBootPhase("booting"),
    });
  }, []);

  const handleOpenProject = useCallback((id: string) => {
    setOpenProjectId(id);
  }, []);

  const handleCloseWindow = useCallback(() => {
    setOpenProjectId(null);
  }, []);

  const handleOpenFromDock = useCallback((id: string) => {
    setOpenProjectId(id);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#080808] overflow-hidden"
    >
      {isMobile ? (
        <IPhoneScreen onNavigate={onNavigate} />
      ) : (
        <>
          {/* Boot screen */}
          {bootPhase !== "ready" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
              {bootPhase === "off" && (
                <div ref={bootRef} className="flex flex-col items-center gap-6">
                  <button
                    onClick={handleBoot}
                    className="relative cursor-pointer group"
                  >
                    <div className="power-ring-outer w-28 h-28 rounded-full border-2 border-cyan-400/30
                      flex items-center justify-center
                      group-hover:border-cyan-400/60 transition-colors
                      group-active:scale-95">
                      <div className="power-btn-inner w-20 h-20 rounded-full bg-cyan-400/[0.06]
                        border border-cyan-400/20 flex items-center justify-center
                        text-cyan-400/80 group-hover:text-cyan-400
                        transition-all duration-200">
                        <PowerIcon />
                      </div>
                    </div>
                    {/* Pulse ring */}
                    <div className="absolute inset-[-8px] rounded-full border border-cyan-400/10
                      animate-ping pointer-events-none" style={{ animationDuration: "3s" }} />
                  </button>
                  <span className="power-label text-xs tracking-[0.3em] uppercase text-white/30 font-mono">
                    Encender
                  </span>
                </div>
              )}

              {bootPhase === "booting" && (
                <div className="flex flex-col items-center gap-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.02]
                    border border-white/[0.08] flex items-center justify-center
                    animate-pulse">
                    <span className="text-2xl">⌘</span>
                  </div>
                  <div className="w-40 h-0.5 bg-white/[0.06] rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-400/60 rounded-full loading-bar" />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Desktop */}
          {bootPhase === "ready" && (
            <div className="absolute inset-0 flex flex-col">
              {/* Menu bar */}
              <div className="h-7 bg-white/[0.015] backdrop-blur-xl border-b border-white/[0.05]
                flex items-center px-4 text-[11px] text-white/30 font-medium select-none shrink-0">
                <span className="font-bold text-white/40">🍎</span>
                <span className="ml-3 font-semibold text-white/50 text-[12px]">CodeByEvans</span>
                <span className="ml-5 hover:text-white/50 cursor-default transition-colors">File</span>
                <span className="ml-3 hover:text-white/50 cursor-default transition-colors">Edit</span>
                <span className="ml-3 hover:text-white/50 cursor-default transition-colors">View</span>
              </div>

              {/* Wallpaper + Icons + Window */}
              <div className="flex-1 relative overflow-hidden">
                <div
                  className="desktop-bg absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0e1f3a] to-[#07101e]"
                />

                {PROJECTS.map((p, i) => (
                  <DesktopIcon
                    key={p.id}
                    project={p}
                    initialX={48}
                    initialY={48 + i * 120}
                    onOpen={handleOpenProject}
                  />
                ))}

                {openProjectId && (
                  <ProjectWindow
                    key={openProjectId}
                    project={PROJECTS.find((p) => p.id === openProjectId)!}
                    onClose={handleCloseWindow}
                  />
                )}
              </div>

              {/* Dock */}
              <DesktopDock onNavigate={onNavigate} onOpenProject={handleOpenFromDock} />
            </div>
          )}
        </>
      )}

      {/* Loading bar animation via CSS */}
      <style>{`
        @keyframes loadingGrow {
          from { width: 0%; }
          to { width: 100%; }
        }
        .loading-bar {
          animation: loadingGrow 1.8s ease-in-out forwards;
        }
        @keyframes ping-slow {
          75%, 100% { transform: scale(1.3); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
