import { useRef, useCallback, useState } from "react";
import gsap from "gsap";
import type { Section } from "../components/Header";

interface UseExitZoomOptions {
  variant: "desktop" | "mobile";
  onNavigate: (section: Section) => void;
}

export const useExitZoom = ({ variant, onNavigate }: UseExitZoomOptions) => {
  const sectionRef = useRef<HTMLElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const fadeRefs = useRef<HTMLElement[]>([]);
  const [exiting, setExiting] = useState(false);

  const registerFadeRefs = useCallback((...els: (HTMLElement | null)[]) => {
    fadeRefs.current = els.filter(Boolean) as HTMLElement[];
  }, []);

  const handleExit = useCallback(() => {
    if (exiting) return;
    setExiting(true);

    const el = elementRef.current;
    const section = sectionRef.current;
    if (!el || !section) return;

    const rect = el.getBoundingClientRect();
    const viewW = window.innerWidth;
    const viewH = window.innerHeight;

    const scaleX = viewW / rect.width;
    const scaleY = viewH / rect.height;
    const zoomScale =
      Math.max(scaleX, scaleY) * (variant === "desktop" ? 0.65 : 0.95);

    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const offsetX = viewW / 2 - cx;
    const offsetY = viewH / 2 - cy - (variant === "desktop" ? 50 : 0);

    const tl = gsap.timeline({
      onComplete: () => onNavigate("proyectos"),
    });

    const fadeTargets = fadeRefs.current.filter(Boolean);
    if (fadeTargets.length > 0) {
      tl.to(fadeTargets, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      });
    }

    tl.to(
      el,
      {
        scale: zoomScale,
        x: offsetX,
        y: offsetY,
        duration: 0.8,
        ease: "power3.inOut",
      },
      "-=0.1",
    );

    tl.to(section, { backgroundColor: "#000", duration: 0.25 });
    tl.to(section, { opacity: 0, duration: 0.15 });
  }, [exiting, onNavigate, variant]);

  return { sectionRef, elementRef, exiting, handleExit, registerFadeRefs };
};
