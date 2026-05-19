import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import type { Project } from "../../data/projects";

const DesktopIcon = ({
  project,
  initialX,
  initialY,
  onOpen,
}: {
  project: Project;
  initialX: number;
  initialY: number;
  onOpen: (id: string) => void;
}) => {
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

  const isWhiteLogo = project.id === "tualergiahoy" || project.id === "clover-studio";

  return (
    <div
      ref={iconRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      className="desktop-icon absolute select-none cursor-default touch-none
        flex flex-col items-center gap-1.5 w-20"
    >
      <div className={`w-14 h-14 rounded-2xl border border-white/[0.08]
        flex items-center justify-center overflow-hidden
        group-hover:border-white/[0.15] transition-colors
        ${isWhiteLogo ? "p-0.5 bg-white" : "p-2 bg-white/[0.06]"}`}>
        <img src={project.logoSrc} alt={project.title} className="w-full h-full object-contain" draggable={false} />
      </div>
      <span className="text-[11px] text-white/60 leading-tight text-center font-medium">
        {project.title}
      </span>
    </div>
  );
};

export default DesktopIcon;
