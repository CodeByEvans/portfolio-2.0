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
        </nav>
      </div>
    </header>
  );
}
