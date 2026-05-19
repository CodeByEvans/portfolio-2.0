import { useRef, useEffect, useCallback, useState } from "react";
import gsap from "gsap";

const CARD_W = 280;
const CARD_W_MOBILE = 220;
const CORD_START_Y = -40;

const BARCODE_BARS = Array.from({ length: 44 }, (_, i) => ({
  id: i,
  h: 8 + (Math.sin(i * 0.7) * 0.5 + 0.5) * 14,
  w: (i * 7 + 3) % 5 > 2 ? 2 : 1.2,
}));

interface Props {
  animate: boolean;
  isMobile?: boolean;
}

const WorkerBadge = ({ animate, isMobile = false }: Props) => {
  const badgeRef = useRef<HTMLDivElement>(null);
  const lanyardRef = useRef<SVGPathElement>(null);
  const hookContainerRef = useRef<HTMLDivElement>(null);
  const offset = useRef({ x: 0, y: 0 });
  const dragFrom = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);
  const moved = useRef(false);
  const xTo = useRef<((v: number) => void) | null>(null);
  const yTo = useRef<((v: number) => void) | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cardW = isMobile ? CARD_W_MOBILE : CARD_W;

  // ---- draw lanyard with svg path (desktop only) ----
  const drawLanyard = useCallback(() => {
    if (isMobile || !lanyardRef.current) return;
    const ox = offset.current.x;
    const oy = offset.current.y;

    const holeX = CARD_W / 2 + ox;
    const holeY = 80 + oy;

    const baseGap = 70;
    const stretch = Math.max(0, oy) * 0.18;
    const hookGap = Math.max(12, baseGap - stretch);

    if (hookContainerRef.current) {
      hookContainerRef.current.style.gap = `${hookGap * 0.43}px`;
    }

    const gxL = CARD_W / 2 - hookGap / 2;
    const gxR = CARD_W / 2 + hookGap / 2;
    const gy = CORD_START_Y;

    const slack = 20;
    const tension = (holeY + gy) / 2;

    lanyardRef.current.setAttribute(
      "d",
      `M${holeX},${holeY} 
   C${holeX - ox * 0.3 - slack},${tension} 
     ${gxL + ox * 0.1},${gy + 20} 
     ${gxL},${gy} 
   C${gxL},${gy - 10}
     ${gxR},${gy - 10} 
     ${gxR},${gy} 
   C${gxR + ox * 0.1},${gy + 20} 
     ${holeX + ox * -0.3 + slack},${tension} 
     ${holeX},${holeY}`,
    );
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;
    gsap.ticker.add(drawLanyard);
    return () => {
      gsap.ticker.remove(drawLanyard);
    };
  }, [drawLanyard, isMobile]);

  // ---- quickTo for smooth dragging ----
  useEffect(() => {
    if (!badgeRef.current) return;
    xTo.current = gsap.quickTo(badgeRef.current, "x", {
      duration: isMobile ? 0.01 : 0.01,
      ease: "power2.out",
    });
    yTo.current = gsap.quickTo(badgeRef.current, "y", {
      duration: isMobile ? 0.01 : 0.01,
      ease: "power2.out",
    });
    gsap.set(badgeRef.current, { x: 0, y: 0, opacity: 0 });
  }, [isMobile]);

  // ---- settling entrance ----
  useEffect(() => {
    if (!animate || !badgeRef.current) return;

    if (isMobile) {
      const tl = gsap.timeline();
      tl.fromTo(
        badgeRef.current,
        { y: 30, opacity: 0, rotation: -5 },
        { y: 0, opacity: 1, rotation: 0, duration: 0.7, ease: "back.out(1.7)" },
      );
      return;
    }

    if (!hookContainerRef.current) return;
    const tl = gsap.timeline();

    tl.fromTo(
      hookContainerRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(1.7)" },
    );

    tl.fromTo(
      badgeRef.current,
      { y: -80, x: -14, rotation: 10, opacity: 0 },
      { y: 0, x: 0, rotation: 0, opacity: 1, duration: 1.1, ease: "elastic.out(1, 0.55)" },
      "-=0.15",
    );
  }, [animate, isMobile]);

  // ---- tooltip delayed show (desktop only) ----
  useEffect(() => {
    if (isMobile) return;
    tooltipTimeout.current = setTimeout(() => {
      setShowTooltip(true);
    }, 2000);
    return () => {
      if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);
    };
  }, [isMobile]);

  // ---- pointer handlers ----
  const onDown = useCallback((e: React.PointerEvent) => {
    if (showTooltip) setShowTooltip(false);
    dragging.current = true;
    moved.current = false;
    dragFrom.current = {
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [showTooltip]);

  const onMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - dragFrom.current.x;
    const dy = e.clientY - dragFrom.current.y;
    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) moved.current = true;
    offset.current.x = dx;
    offset.current.y = dy;
    xTo.current?.(dx);
    yTo.current?.(dy);
  }, []);

  const onUp = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    if (!isMobile && moved.current && badgeRef.current) {
      offset.current.x = 0;
      offset.current.y = 0;
      gsap.to(badgeRef.current, {
        x: 0,
        y: 0,
        duration: 0.85,
        ease: "elastic.out(1, 0.4)",
        onUpdate: () => {
          offset.current.x = gsap.getProperty(badgeRef.current, "x") as number;
          offset.current.y = gsap.getProperty(badgeRef.current, "y") as number;
        },
      });
    }
  }, [isMobile]);

  /* ---------- Mobile: simplified ID card ---------- */
  if (isMobile) {
    return (
      <div
        className="shrink-0 relative"
        style={{ width: cardW }}
      >
        <div
          ref={badgeRef}
          className="relative cursor-grab active:cursor-grabbing select-none z-10"
          style={{ touchAction: "none" }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
        >
          <div className="rounded-2xl border border-white/[0.07] overflow-hidden"
            style={{
              background: "linear-gradient(145deg, #1e1e24 0%, #18181c 40%, #151519 100%)",
              boxShadow: "0 2px 16px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03) inset",
              transform: "perspective(600px) rotateX(1.5deg)",
            }}
          >
            <div className="px-3 py-1.5 bg-white/[0.02] border-b border-white/[0.04]">
              <span className="text-[9px] font-mono text-cyan-400/45 tracking-[0.15em] uppercase">
                Company ID
              </span>
            </div>

            <div className="p-3 pt-2.5">
              <div className="flex gap-3">
                <div className="shrink-0 w-[70px] h-[70px] rounded-2xl overflow-hidden bg-[#0a0a0a] border border-white/[0.05] shadow-inner">
                  <img
                    src="/avatar.jpg"
                    alt="Evans Lituma"
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </div>

                <div className="flex-1 min-w-0 pt-0.5">
                  <p className="text-[13px] font-semibold text-white/90">
                    Evans Lituma
                  </p>
                  <p className="text-[10px] text-cyan-400/55 font-mono mt-0.5">
                    Software Engineer
                  </p>
                  <p className="text-[9px] text-white/25 font-mono mt-2 tracking-wide">
                    ID: #EVL-2026-0304
                  </p>
                </div>
              </div>

              <div className="flex justify-center gap-[1px] mt-2.5">
                {BARCODE_BARS.map((b) => (
                  <div
                    key={b.id}
                    className="bg-white/[0.07]"
                    style={{ width: b.w, height: b.h * 0.8 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- Desktop: lanyard + hooks + card ---------- */
  return (
    <div
      className="shrink-0 flex flex-col items-center relative"
      style={{ width: CARD_W }}
    >
      {/* hooks */}
      <div ref={hookContainerRef} className="z-10 opacity-0 mb-1 flex gap-[30px]">
        <svg width="30" height="38" viewBox="0 0 30 38">
          <circle cx="15" cy="34" r="6" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
          <rect x="11" y="15" width="8" height="6" rx="1.5" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <line x1="15" y1="21" x2="15" y2="38" stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" />
        </svg>
        <svg width="30" height="38" viewBox="0 0 30 38">
          <circle cx="15" cy="34" r="6" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
          <rect x="11" y="15" width="8" height="6" rx="1.5" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <line x1="15" y1="21" x2="15" y2="38" stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" />
        </svg>
      </div>

      {/* lanyard + card */}
      <div className="relative mt-8" style={{ width: CARD_W, height: 420 }}>
        <svg className="absolute inset-0 pointer-events-none z-0" style={{ overflow: "visible" }}>
          <path ref={lanyardRef} d="" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1.8" strokeLinecap="round" />
        </svg>

    {/* Tooltip at top-right corner of card area */}
    {showTooltip && (
      <div className="absolute top-[-20px] right-[-12px] z-20 pointer-events-none"
        style={{ marginTop: 80 }}>
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-white/50 font-mono tracking-wider bg-black/70 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/[0.06] whitespace-nowrap">
            tira de la tarjeta
          </span>
          <svg width="8" height="5" viewBox="0 0 8 5" className="text-white/30 mt-[-1px] mr-4">
            <polygon points="4,5 0,0 8,0" fill="currentColor" />
          </svg>
        </div>
      </div>
    )}

    <div
          ref={badgeRef}
          className="absolute cursor-grab active:cursor-grabbing select-none z-10"
          style={{ left: 0, right: 0, top: 80, touchAction: "none" }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
        >
          <div className="flex justify-center mb-1.5">
            <div className="w-3 h-3 rounded-full border border-white/[0.14] bg-black/30 shadow-inner" />
          </div>

          <div
            className="rounded-2xl border border-white/[0.07] overflow-hidden"
            style={{
              background: "linear-gradient(145deg, #1e1e24 0%, #18181c 40%, #151519 100%)",
              boxShadow: "0 2px 16px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03) inset",
              transform: "perspective(600px) rotateX(1.5deg)",
            }}
          >
            <div className="px-4 py-2 bg-white/[0.02] border-b border-white/[0.04]">
              <span className="text-[10px] font-mono text-cyan-400/45 tracking-[0.15em] uppercase">
                Company ID
              </span>
            </div>

            <div className="p-4 pt-3">
              <div className="flex gap-4">
                <div className="shrink-0 w-[88px] h-[88px] rounded-2xl overflow-hidden bg-[#0a0a0a] border border-white/[0.05] shadow-inner">
                  <img
                    src="/avatar.jpg"
                    alt="Evans Lituma"
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </div>

                <div className="flex-1 min-w-0 pt-0.5">
                  <p className="text-[15px] font-semibold text-white/90">Evans Lituma</p>
                  <p className="text-[11px] text-cyan-400/55 font-mono mt-0.5">Software Engineer</p>
                  <p className="text-[10px] text-white/25 font-mono mt-2.5 tracking-wide">ID: #EVL-2026-0304</p>
                </div>
              </div>

              <div className="flex justify-center gap-[1.5px] mt-3">
                {BARCODE_BARS.map((b) => (
                  <div key={b.id} className="bg-white/[0.07]" style={{ width: b.w, height: b.h }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerBadge;
