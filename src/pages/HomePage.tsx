import { useRef, useEffect, useCallback, useState } from "react";
import gsap from "gsap";
import CodeByEvansLogo from "../components/CodeByEvansLogo";
import WorkerBadge from "../components/home/WorkerBadge";
import type { Section } from "../components/Header";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
};

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

const HomePage = ({ animate = true, onNavigate }: Props) => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isExiting = useRef(false);
  const isMobile = useIsMobile();

  const handleExit = useCallback(() => {
    if (isExiting.current || !contentRef.current) return;
    isExiting.current = true;

    gsap.to(contentRef.current, {
      x: -80,
      opacity: 0,
      duration: 0.45,
      ease: "power3.in",
      delay: 0.2,
      onComplete: () => onNavigate?.("sobre-mi"),
    });
  }, [onNavigate]);

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

      <div
        ref={contentRef}
        className="relative z-10 max-w-6xl mx-auto w-full px-6 py-20"
      >
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-16 lg:gap-24">
          {/* Left text content */}
          <div className="flex-1 space-y-3 md:space-y-5">
            <div ref={labelRef} className="space-y-2 opacity-0">
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-8 h-[2px] bg-cyan-400/60" />
                <span className="text-xs font-mono tracking-widest text-cyan-400/60 uppercase">
                  Portfolio
                </span>
              </div>
            </div>

            <h1 ref={titleRef} className="opacity-0">
              <CodeByEvansLogo size={`${isMobile ? "lg" : "xl"}`} />
            </h1>

            <p
              ref={subtitleRef}
              className={`text-xl sm:text-2xl text-white/80 font-light opacity-0`}
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

          {/* Worker Badge */}
          <div className="shrink-0 flex flex-col items-center gap-2">
            <WorkerBadge animate={animate} isMobile={isMobile} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
