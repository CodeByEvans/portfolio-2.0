import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import VinylDisc from "./VinylDisc";
import type { ProjectWindowProps } from "./types";

const ProjectWindow = ({ project, onClose }: ProjectWindowProps) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const xTo = useRef<((v: number) => void) | null>(null);
  const yTo = useRef<((v: number) => void) | null>(null);
  const offsetX = useRef(0);
  const offsetY = useRef(0);
  const dragStart = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const [fullscreenSrc, setFullscreenSrc] = useState<string | null>(null);

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
      className="project-window absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
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
      <div className="overflow-y-auto flex-1 p-5 space-y-5">
        <div className="flex flex-col items-center gap-3">
          <VinylDisc
            logoSrc={project.logoSrc}
            size="md"
            spinning={true}
            labelBg={project.id === "tualergiahoy" || project.id === "clover-studio" ? "#ffffff" : "#0f0f0f"}
          />
          <div className="text-center">
            <h3 className="text-sm font-semibold text-white/85">{project.title}</h3>
            <span className="text-[11px] text-cyan-400/60 font-mono">{project.subtitle}</span>
          </div>
        </div>

        <div className="bg-white/[0.025] border border-white/[0.05] rounded-lg p-4">
          <p className="text-xs text-white/60 leading-relaxed">{project.description}</p>
        </div>

        <div className="space-y-2">
          <span className="text-[10px] text-white/20 uppercase tracking-[0.15em] font-mono">Tecnologías</span>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[10px] font-mono text-cyan-400/70 bg-cyan-400/[0.05] border border-cyan-400/10 rounded-md
                  hover:bg-cyan-400/[0.1] hover:border-cyan-400/30 hover:text-cyan-300 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {(project.github || project.web) && (
          <div className="flex items-center justify-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08]
                  text-[10px] text-white/50 font-mono hover:text-cyan-400 hover:border-cyan-400/30 transition-colors cursor-pointer"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
            )}
            {project.web && (
              <a
                href={project.web}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-400/[0.06] border border-cyan-400/20
                  text-[10px] text-cyan-300/80 font-mono hover:bg-cyan-400/[0.12] hover:border-cyan-400/40 transition-colors cursor-pointer"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                </svg>
                {new URL(project.web).hostname}
              </a>
            )}
          </div>
        )}

        {project.mediaType === "video" && (
          <div className="relative group rounded-lg overflow-hidden border border-white/[0.06] shadow-lg shadow-black/30">
            <video
              src={project.mediaSrc as string}
              autoPlay muted loop playsInline
              className="w-full"
            />
            <button
              onClick={() => setFullscreenSrc(project.mediaSrc as string)}
              className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/50 border border-white/10
                text-white/50 hover:text-white hover:border-white/30 opacity-0 group-hover:opacity-100
                transition-all duration-200 cursor-pointer"
              title="Pantalla completa"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            </button>
          </div>
        )}
        {project.mediaType === "image" && (project.mediaSrc as string[]).length > 1 && (
          <div className="grid grid-cols-2 gap-2">
            {(project.mediaSrc as string[]).map((src) => (
              <div key={src} className="relative group rounded-lg overflow-hidden border border-white/[0.06] shadow-md shadow-black/20">
                <img
                  src={src}
                  alt={project.title}
                  className="w-full h-28 object-cover cursor-pointer"
                  onClick={() => setFullscreenSrc(src)}
                />
                <button
                  onClick={() => setFullscreenSrc(src)}
                  className="absolute top-1.5 right-1.5 p-1 rounded-md bg-black/50 border border-white/10
                    text-white/50 hover:text-white hover:border-white/30 opacity-0 group-hover:opacity-100
                    transition-all duration-200 cursor-pointer"
                  title="Pantalla completa"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 3 21 3 21 9" />
                    <polyline points="9 21 3 21 3 15" />
                    <line x1="21" y1="3" x2="14" y2="10" />
                    <line x1="3" y1="21" x2="10" y2="14" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
        {project.mediaType === "image" && (project.mediaSrc as string[]).length === 1 && (
          <div className="relative group rounded-lg overflow-hidden border border-white/[0.06] shadow-lg shadow-black/30">
            <img
              src={(project.mediaSrc as string[])[0]}
              alt={project.title}
              className="w-full max-h-56 object-cover cursor-pointer"
              onClick={() => setFullscreenSrc((project.mediaSrc as string[])[0])}
            />
            <button
              onClick={() => setFullscreenSrc((project.mediaSrc as string[])[0])}
              className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/50 border border-white/10
                text-white/50 hover:text-white hover:border-white/30 opacity-0 group-hover:opacity-100
                transition-all duration-200 cursor-pointer"
              title="Pantalla completa"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            </button>
          </div>
        )}

        <div className="border-t border-white/[0.04] pt-3">
          <p className="text-[10px] text-white/20 italic text-center leading-relaxed">
            {project.curiosity}
          </p>
        </div>
      </div>

      {fullscreenSrc && (
        <div
          className="absolute inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setFullscreenSrc(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 border border-white/10
              text-white/70 hover:text-white hover:bg-white/20 transition-all cursor-pointer z-10"
            onClick={(e) => { e.stopPropagation(); setFullscreenSrc(null); }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          {project.mediaType === "video" ? (
            <video
              src={fullscreenSrc}
              controls autoPlay
              className="max-w-full max-h-full rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <img
              src={fullscreenSrc}
              alt={project.title}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectWindow;
