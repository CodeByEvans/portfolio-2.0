import { useState } from "react";
import CodeByEvansLogo from "./CodeByEvansLogo";

export const NAV_LINKS = [
  { id: "inicio", label: "Inicio" },
  { id: "proyectos", label: "Proyectos" },
  { id: "stack", label: "Stack" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "testimonios", label: "Testimonios" },
  { id: "contacto", label: "Contacto" },
] as const;

export type Section = (typeof NAV_LINKS)[number]["id"];

interface Props {
  active: Section;
  onNavigate: (section: Section) => void;
}

export default function Header({ active, onNavigate }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50"
      style={{ backgroundColor: "#080808" }}
    >
      <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
        <button onClick={() => onNavigate("inicio")} className="shrink-0">
          <CodeByEvansLogo size="sm" />
        </button>

        <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl px-2 py-1.5">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`px-4 py-2 text-sm transition-colors rounded-full ${active === link.id ? "text-cyan-300 bg-white/[0.04]" : "text-white/70 hover:text-cyan-300 hover:bg-white/[0.04]"}`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <a
          href="https://github.com/CodeByEvans"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center justify-center w-9 h-9 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl text-white/50 hover:text-cyan-400 hover:border-cyan-400/30 transition-colors"
          title="GitHub — CodeByEvans"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </a>

        <button
          type="button"
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Abrir menú"
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <nav className="mx-4 mb-4 flex flex-col gap-1 rounded-2xl bg-[#080808]/95 backdrop-blur-xl border border-white/[0.06] p-3">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onNavigate(link.id);
                setMobileOpen(false);
              }}
              className={`px-4 py-3 text-sm rounded-xl transition-colors text-left ${active === link.id ? "text-cyan-300 bg-white/[0.04]" : "text-white/70 hover:text-cyan-300 hover:bg-white/[0.04]"}`}
            >
              {link.label}
            </button>
          ))}
          <hr className="border-white/[0.06] my-1" />
          <a
            href="https://github.com/CodeByEvans"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-sm rounded-xl text-white/70 hover:text-cyan-300 hover:bg-white/[0.04] transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
