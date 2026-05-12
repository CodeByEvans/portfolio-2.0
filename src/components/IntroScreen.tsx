import { useRef, useEffect } from "react";
import gsap from "gsap";
import CodeByEvansLogo from "./CodeByEvansLogo";

interface Props {
  onExitStart: () => void;
  onDone: () => void;
}

export default function IntroScreen({ onExitStart, onDone }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLSpanElement>(null);
  const callbacksRef = useRef({ onExitStart, onDone });
  callbacksRef.current = { onExitStart, onDone };

  useEffect(() => {
    const container = containerRef.current!;
    const logo = logoRef.current!;

    const tl = gsap.timeline();

    tl.fromTo(
      logo,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "back.out(2.5)" }
    );

    tl.to(logo, { duration: 0.4 });

    tl.call(() => callbacksRef.current.onExitStart());

    tl.to(
      container,
      {
        scale: 1.8,
        opacity: 0,
        duration: 0.55,
        ease: "power3.in",
        onComplete: () => callbacksRef.current.onDone(),
      },
      "-=0.1"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#080808] flex items-center justify-center"
    >
      <CodeByEvansLogo
        ref={logoRef}
        size="lg"
        className="opacity-0 text-5xl sm:text-6xl"
      />
    </div>
  );
}
