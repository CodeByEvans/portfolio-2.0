import { useRef, useEffect } from "react";
import gsap from "gsap";

const EmailIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const ContactPage = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".contact-accent",
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.4, ease: "power3.out" },
      );

      tl.fromTo(
        ".contact-label",
        { y: -8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: "power3.out" },
        "-=0.2",
      );

      tl.fromTo(
        cardRef.current,
        { y: 30, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.1",
      );

      tl.fromTo(
        ".contact-footer",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: "back.out(1.7)" },
        "-=0.2",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#080808] pt-10 pb-12 sm:pt-20 sm:pb-24 px-4 sm:px-8 lg:px-16 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_600px_400px_at_50%_50%,rgba(0,200,220,0.04),transparent)]" />

      <div className="flex flex-col items-center mb-10">
        <span className="contact-accent block w-8 h-[2px] bg-cyan-400/60 mb-3" />
        <span className="contact-label text-xs tracking-[0.3em] uppercase text-white/40 font-mono">
          Contacto
        </span>
      </div>

      <div
        ref={cardRef}
        className="relative z-10 w-full max-w-lg bg-white/[0.02] border border-white/[0.08] rounded-2xl p-8 sm:p-10 backdrop-blur-xl"
      >
        <h2 className="text-2xl sm:text-3xl font-semibold text-white text-center leading-tight mb-4">
          ¿Listo para crear
          <br />
          algo increíble?
        </h2>

        <p className="text-white/50 text-sm sm:text-base text-center leading-relaxed mb-8 max-w-md mx-auto">
          Estoy abierto a oportunidades como desarrollador de software. Si
          tienes un equipo al que le vendría bien alguien con ganas de construir
          cosas bien hechas, escríbeme.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="mailto:codebyevans@gmail.com"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-cyan-400/30 text-cyan-300 text-sm font-medium tracking-wide hover:bg-cyan-400/10 hover:border-cyan-400/50 transition-colors cursor-pointer w-full sm:w-auto justify-center"
          >
            <EmailIcon />
            Enviar mensaje
          </a>

          <a
            href="https://www.linkedin.com/in/evanslituma"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/[0.08] bg-white/[0.03] text-white/70 text-sm font-medium tracking-wide hover:text-blue-400 hover:border-blue-400/30 hover:bg-blue-400/[0.06] transition-colors cursor-pointer w-full sm:w-auto justify-center"
          >
            <LinkedInIcon />
            Conectar con LinkedIn
          </a>
        </div>
      </div>

      <div className="contact-footer flex items-center gap-2 mt-10 z-10">
        <a
          href="https://github.com/CodeByEvans"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl text-white/50 hover:text-cyan-400 hover:border-cyan-400/30 transition-colors"
          title="GitHub — CodeByEvans"
        >
          <GitHubIcon />
        </a>
        <a
          href="https://www.linkedin.com/in/evanslituma"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl text-white/50 hover:text-blue-400 hover:border-blue-400/30 transition-colors"
          title="LinkedIn — Evans Lituma"
        >
          <LinkedInIcon />
        </a>
        <a
          href="mailto:codebyevans@gmail.com"
          className="flex items-center justify-center w-10 h-10 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl text-white/50 hover:text-cyan-400 hover:border-cyan-400/30 transition-colors"
          title="Email — codebyevans@gmail.com"
        >
          <EmailIcon />
        </a>
      </div>
    </section>
  );
};

export default ContactPage;
