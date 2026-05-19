import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import type { Section } from "../components/Header";
import Paper from "../components/aboutMe/Paper";
import Monitor from "../components/aboutMe/Monitor";
import MobilePhone from "../components/aboutMe/MobilePhone";
import DeskScene from "../components/aboutMe/DeskScene";
import PaperModal from "../components/aboutMe/PaperModal";
import { useExitZoom } from "../hooks/useExitZoom";

interface Props {
  onNavigate: (section: Section) => void;
}

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

const paperSections = [
  {
    title: "AI & FULL-STACK DEVELOPER",
    lines: [
      "Construyo aplicaciones web modernas, muevo cosas en",
      "la nube, desarrollo software de escritorio y meto IA",
      "tanto en el proceso como en el producto.",
    ],
  },
  {
    title: "STACK TECNOLÓGICO",
    lines: [
      "Backend: Spring, Django, Node.js. ",
      "Frontend: React, Vue, Angular.",
      "Cloud: AWS, Oracle, Azure.",
      "Integraciones con modelos externos como Gemini, Claude, OpenAI, los que hagan falta.",
    ],
  },
  {
    title: "MI ENFOQUE",
    lines: [
      "La arquitectura de software es donde realmente se decide",
      "si algo escala o se hunde. Es el esqueleto de todo lo demás.",
      "",
      "Un buen desarrollador escribe buen código.",
      "Un buen arquitecto construye buen futuro.",
      "",
      "Si juntas ambos… tienes Code By Evans.",
    ],
  },
];

// Flatten for the small Paper component
const paperLines = paperSections.flatMap((s) => [s.title, ...s.lines]);

const AboutMePage = ({ onNavigate }: Props) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const deskRef = useRef<HTMLDivElement>(null);
  const deskWrapperRef = useRef<HTMLDivElement>(null);
  const [showPaperModal, setShowPaperModal] = useState(false);
  const isMobile = useIsMobile();

  const desktopExit = useExitZoom({ variant: "desktop", onNavigate });
  const mobileExit = useExitZoom({ variant: "mobile", onNavigate });

  useEffect(() => {
    if (isMobile) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        sceneRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" },
      );
      tl.fromTo(
        ".monitor-screen",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" },
        "-=0.2",
      );
      tl.fromTo(
        paperRef.current,
        { y: 80, opacity: 0, rotation: -4 },
        { y: 0, opacity: 1, rotation: 0, duration: 0.8, ease: "back.out(1.8)" },
        "-=0.1",
      );
      tl.fromTo(
        ".paper-line",
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, ease: "power2.out" },
        "-=0.3",
      );
    }, desktopExit.sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        ".mobile-phone",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.1",
      );
      tl.fromTo(
        paperRef.current,
        { y: 30, opacity: 0, rotation: -3 },
        {
          y: 0,
          opacity: 1,
          rotation: "-1.5deg",
          duration: 0.7,
          ease: "back.out(1.7)",
        },
        "-=0.3",
      );
      tl.fromTo(
        ".paper-line",
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.04, ease: "power2.out" },
        "-=0.2",
      );
    }, mobileExit.sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  useEffect(() => {
    // Register fade refs after render when refs are populated
    if (!isMobile) {
      desktopExit.registerFadeRefs(paperRef.current, deskWrapperRef.current);
    } else {
      mobileExit.registerFadeRefs(paperRef.current);
    }
  });

  if (!isMobile) {
    return (
      <section
        ref={desktopExit.sectionRef}
        className="relative min-h-dvh bg-[#13161c] flex flex-col overflow-hidden py-8 sm:py-12"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1f28] via-[#161a22] to-[#11141a]" />
        <div className="absolute top-0 inset-x-0 h-[40%] bg-gradient-to-b from-[#1e2633]/40 to-transparent" />

        <div className="flex-1 flex items-center justify-center min-h-0 px-4">
          <div
            ref={sceneRef}
            className="relative w-full max-w-5xl mx-auto flex flex-col items-center py-4 sm:py-6"
          >
            {/* Ambient backlight glow behind monitor */}
            <div
              className="absolute top-0 sm:top-0 left-1/2 -translate-x-1/2 w-80 sm:w-[32rem] h-64 sm:h-72 rounded-full blur-2xl sm:blur-3xl opacity-20 sm:opacity-25"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 45%, rgba(120,200,240,0.45) 0%, rgba(60,140,200,0.2) 35%, rgba(20,60,100,0.06) 65%, transparent 85%)",
              }}
            />
            {/* Screen light cast onto desk surface */}
            <div
              className="absolute top-[45%] left-1/2 -translate-x-1/2 w-[70%] sm:w-[60%] h-40 sm:h-52 rounded-full blur-2xl sm:blur-3xl opacity-[0.10] sm:opacity-[0.14] pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%, rgba(140,200,240,0.5) 0%, rgba(80,140,200,0.2) 40%, transparent 75%)",
              }}
            />

            <div
              ref={desktopExit.elementRef}
              className="relative z-20 -mb-5 sm:-mb-14 cursor-pointer"
              onClick={desktopExit.handleExit}
            >
              <Monitor />
            </div>

            <DeskScene
              deskRef={deskRef}
              deskWrapperRef={deskWrapperRef}
              paperRef={paperRef}
              lines={paperLines}
              onPaperClick={() => setShowPaperModal(true)}
            />
          </div>
        </div>

        <PaperModal
          sections={paperSections}
          isOpen={showPaperModal}
          onClose={() => setShowPaperModal(false)}
        />
      </section>
    );
  }

  return (
    <section
      ref={mobileExit.sectionRef}
      className="relative h-dvh bg-[#13161c] flex flex-col overflow-hidden"
    >
      <div
        className="mobile-desk-bg absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #1e2633 0%, #161a22 30%, #13161c 60%, #0f1116 100%)",
        }}
      />
      <div
        className="mobile-desk-bg absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(2deg, transparent, transparent 6px, #000 6px, #000 6.5px)",
        }}
      />

      <div className="flex-1 flex flex-col items-center justify-center px-6 min-h-0">
        <div className="w-full max-w-lg">
          <div className="flex items-center gap-4 justify-center">
            <div
              ref={mobileExit.elementRef}
              className="mobile-phone cursor-pointer group"
              onClick={mobileExit.handleExit}
            >
              <div className="transition-all duration-300 ease-out group-active:-translate-y-1 group-active:shadow-[0_0_16px_rgba(234,179,8,0.3)] rounded-2xl">
                <MobilePhone />
              </div>
            </div>

            <div
              ref={paperRef}
              className="cursor-pointer group"
              onClick={() => setShowPaperModal(true)}
            >
              <div className="transition-all duration-300 ease-out group-active:-translate-y-1 group-active:shadow-[0_0_14px_rgba(234,179,8,0.35)] rounded-sm">
                <Paper lines={paperLines} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <PaperModal
        sections={paperSections}
        isOpen={showPaperModal}
        onClose={() => setShowPaperModal(false)}
      />
    </section>
  );
};

export default AboutMePage;
