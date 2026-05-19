import { useRef, useEffect } from "react";
import gsap from "gsap";
import type { Language } from "../../data/stack";

interface Props {
  languages: Language[];
  onSelect: (lang: Language) => void;
  exiting: boolean;
  onExited: () => void;
}

const LanguageSelector = ({
  languages,
  onSelect,
  exiting,
  onExited,
}: Props) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".lang-title",
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35 },
      );
      tl.fromTo(
        ".lang-subtitle",
        { y: 8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3 },
        "-=0.15",
      );
      tl.fromTo(
        ".lang-btn",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: "back.out(1.7)" },
        "-=0.1",
      );
    }, gridRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!exiting || !gridRef.current) return;
    gsap.to(gridRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.35,
      ease: "power3.in",
      onComplete: onExited,
    });
  }, [exiting, onExited]);

  return (
    <div ref={gridRef} className="max-w-3xl mx-auto">
      <h2 className="lang-title text-2xl sm:text-3xl font-light text-white text-center mb-2">
        Elige tu lenguaje
      </h2>
      <p className="lang-subtitle text-white/40 text-center mb-10 text-sm">
        Selecciona el lenguaje con el que quieres ver el stack
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {languages.map((lang) => (
          <button
            key={lang.id}
            onClick={() => onSelect(lang)}
            className="lang-btn opacity-0 group relative p-6 rounded-xl border border-white/[0.08] bg-white/[0.03]
                       hover:bg-white/[0.06] hover:border-cyan-400/30 transition-all duration-300
                       text-white text-center cursor-pointer"
            disabled={exiting}
          >
            <span className="text-lg font-medium tracking-wide block">
              {lang.label}
            </span>
            <span className="block text-xs text-white/30 mt-1.5 font-mono">
              {lang.extension}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
