import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import CodeByEvansLogo from "../components/CodeByEvansLogo";
import type { Section } from "../components/Header";

const FLOATING_DOTS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: 15 + Math.random() * 70,
  y: 15 + Math.random() * 70,
  size: 2 + Math.random() * 4,
  delay: Math.random() * 2,
  duration: 3 + Math.random() * 4,
}));

interface Props {
  animate?: boolean;
  onNavigate?: (section: Section) => void;
}

export default function HomePage({ animate = true, onNavigate }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isExiting = useRef(false);

  const offsetX = useRef(0);
  const offsetY = useRef(0);
  const dragStart = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const hasMoved = useRef(false);

  const handleExit = useCallback(() => {
    if (isExiting.current || !contentRef.current) return;
    isExiting.current = true;
    gsap.to(contentRef.current, {
      x: -80,
      opacity: 0,
      duration: 0.45,
      ease: "power3.in",
      onComplete: () => onNavigate?.("proyectos"),
    });
  }, [onNavigate]);
  const tooltipDismissed = useRef(false);

  const xTo = useRef<((val: number) => void) | null>(null);
  const yTo = useRef<((val: number) => void) | null>(null);

  const clampOffset = useCallback(() => {
    if (!sectionRef.current || !avatarRef.current) return;
    const section = sectionRef.current.getBoundingClientRect();
    const avatar = avatarRef.current.getBoundingClientRect();
    const maxX = (section.width - avatar.width) / 2;
    const maxY = (section.height - avatar.height) / 2;
    offsetX.current = gsap.utils.clamp(-maxX, maxX, offsetX.current);
    offsetY.current = gsap.utils.clamp(-maxY, maxY, offsetY.current);
  }, []);

  const hideTooltip = useCallback(() => {
    if (tooltipDismissed.current || !tooltipRef.current) return;
    tooltipDismissed.current = true;
    gsap.to(tooltipRef.current, {
      y: -4,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    hideTooltip();
    isDragging.current = true;
    hasMoved.current = false;
    dragStart.current = {
      x: e.clientX - offsetX.current,
      y: e.clientY - offsetY.current,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [hideTooltip]);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        hasMoved.current = true;
      }
      offsetX.current = dx;
      offsetY.current = dy;
      clampOffset();
      xTo.current?.(offsetX.current);
      yTo.current?.(offsetY.current);
    },
    [clampOffset],
  );

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  useEffect(() => {
    if (avatarRef.current) {
      xTo.current = gsap.quickTo(avatarRef.current, "x", {
        duration: 0.1,
        ease: "power2.out",
      });
      yTo.current = gsap.quickTo(avatarRef.current, "y", {
        duration: 0.1,
        ease: "power2.out",
      });
    }
  }, []);

  useEffect(() => {
    if (!animate) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "back.out(2)" } });

      tl.fromTo(
        labelRef.current,
        { scale: 0, opacity: 0, transformOrigin: "center center" },
        { scale: 1, opacity: 1, duration: 0.5 },
      );

      tl.fromTo(
        titleRef.current,
        { scale: 0, opacity: 0, transformOrigin: "center center" },
        { scale: 1, opacity: 1, duration: 0.6 },
        "-=0.35",
      );

      tl.fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" },
        "-=0.4",
      );

      tl.fromTo(
        descRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
        "-=0.3",
      );

      tl.fromTo(
        ctaRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" },
        "-=0.25",
      );

      tl.fromTo(
        avatarRef.current,
        { scale: 0, opacity: 0, transformOrigin: "center center" },
        { scale: 1, opacity: 1, duration: 0.65, ease: "back.out(2.5)" },
        "-=0.35",
      );

      tl.fromTo(
        tooltipRef.current,
        { y: -8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
        "+=0.6",
      );

      const floatingEls = document.querySelectorAll<HTMLElement>(".float-dot");
      floatingEls.forEach((el) => {
        gsap.to(el, {
          x: () => gsap.utils.random(-30, 30),
          y: () => gsap.utils.random(-30, 30),
          opacity: () => gsap.utils.random(0.15, 0.45),
          duration: () => gsap.utils.random(3, 6),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: () => gsap.utils.random(0, 3),
        });
      });

      gsap.to(".ring-outer", {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [animate]);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative min-h-[85vh] flex items-center bg-[#080808] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_600px_400px_at_20%_50%,rgba(0,200,220,0.06),transparent)]" />

      {FLOATING_DOTS.map((dot) => (
        <span
          key={dot.id}
          className="float-dot absolute rounded-full bg-cyan-400"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: dot.size,
            height: dot.size,
            opacity: 0.15,
          }}
        />
      ))}

      <div ref={contentRef} className="relative z-10 max-w-6xl mx-auto w-full px-6 py-20">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 lg:gap-24">
          <div className="flex-1 space-y-6">
            <div ref={labelRef} className="space-y-2 opacity-0">
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-8 h-[2px] bg-cyan-400/60" />
                <span className="text-xs font-mono tracking-widest text-cyan-400/60 uppercase">
                  Portfolio
                </span>
              </div>
            </div>

            <h1 ref={titleRef} className="opacity-0">
              <CodeByEvansLogo size="xl" />
            </h1>

            <p
              ref={subtitleRef}
              className="text-xl sm:text-2xl text-white/80 font-light opacity-0"
            >
              Ingeniero de Software
            </p>

            <p
              ref={descRef}
              className="text-base sm:text-lg text-white/50 leading-relaxed max-w-lg opacity-0"
            >
              Desarrollador Full-stack apasionado por la tecnología y el
              desarrollo de software. Potencio mi trabajo con IA, creando
              herramientas inteligentes que hacen la vida más fácil.
            </p>

            <button
              ref={ctaRef}
              onClick={handleExit}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-cyan-400/30 text-cyan-300 text-sm font-medium tracking-wide opacity-0 hover:bg-cyan-400/10 hover:border-cyan-400/50 transition-colors cursor-pointer select-none"
            >
              Comenzar
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                   d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div
            ref={avatarRef}
            className="shrink-0 opacity-0 touch-none select-none cursor-grab active:cursor-grabbing"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
          >
            <div className="relative pointer-events-none">
              <div
                ref={tooltipRef}
                className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 z-20 pointer-events-auto"
              >
                <span className="bg-[#1a1a1a]/95 backdrop-blur-sm border border-white/[0.08] text-white/60 text-xs px-3 py-1.5 rounded-lg">
                  Si no te gusta donde está... ¡Muévelo donde lo veas mejor!
                </span>
              </div>

              <div className="w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden ring-1 ring-white/[0.06]">
                <img
                  src="/avatar.jpg"
                  alt="CodeByEvans"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="ring-outer absolute -inset-3 rounded-full border border-cyan-400/10" />
              <div className="absolute -inset-6 rounded-full border border-cyan-400/[0.04]" />

              <div className="absolute -bottom-3 -right-3 w-8 h-8 bg-cyan-400 rounded-full blur-xl opacity-30" />
              <div className="absolute -top-3 -left-3 w-6 h-6 bg-cyan-400 rounded-full blur-lg opacity-20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
