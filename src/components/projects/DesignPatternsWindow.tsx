import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";

const DESIGN_PATTERNS = [
  {
    id: "solid",
    title: "SOLID",
    brief: "Cinco principios de diseño orientado a objetos que reducen el acoplamiento y facilitan el mantenimiento a largo plazo.",
    archPrinciples: [
      { label: "S — Single Responsibility", desc: "Una clase debe tener una única razón para cambiar." },
      { label: "O — Open / Closed", desc: "Abierta a extensión, cerrada a modificación. Nuevas features sin romper lo existente." },
      { label: "L — Liskov Substitution", desc: "Las subclases deben poder sustituir a sus clases base sin alterar el comportamiento." },
      { label: "I — Interface Segregation", desc: "Muchas interfaces específicas son mejores que una interfaz de propósito general." },
      { label: "D — Dependency Inversion", desc: "Depende de abstracciones, no de implementaciones concretas." },
    ],
  },
  {
    id: "observer",
    title: "Observer / Event Bus",
    brief: "Patrón de comportamiento donde un sujeto notifica cambios a múltiples observadores sin acoplarse a ellos.",
    arch: "El Event Bus actúa como mediador: los componentes emiten eventos sin saber quién los recibe, y los suscriptores reaccionan sin conocer al emisor. Ideal para desacoplar UI, plugins, y comunicación entre módulos independientes. En este mismo escritorio, los iconos y ventanas se comunican mediante un patrón similar de eventos.",
  },
  {
    id: "layered",
    title: "Layered Architecture",
    brief: "Arquitectura que organiza el código en capas con responsabilidades bien definidas: presentación, lógica de negocio y acceso a datos.",
    archLayers: [
      { layer: "Presentación", desc: "UI, controladores, vistas." },
      { layer: "Aplicación", desc: "Casos de uso, orquestación." },
      { layer: "Dominio", desc: "Entidades, reglas de negocio." },
      { layer: "Infraestructura", desc: "Base de datos, APIs externas, servicios." },
    ],
  },
];

const DesignPatternsWindow = ({ onClose }: { onClose: () => void }) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const [archMode, setArchMode] = useState(false);

  const xTo = useRef<((v: number) => void) | null>(null);
  const yTo = useRef<((v: number) => void) | null>(null);
  const offsetX = useRef(0);
  const offsetY = useRef(0);
  const dragStart = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  useEffect(() => {
    if (!windowRef.current) return;
    gsap.fromTo(
      windowRef.current,
      { scale: 0.85, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(1.7)" },
    );
    xTo.current = gsap.quickTo(windowRef.current, "x", { duration: 0.05, ease: "power2.out" });
    yTo.current = gsap.quickTo(windowRef.current, "y", { duration: 0.05, ease: "power2.out" });
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    dragStart.current = { x: e.clientX - offsetX.current, y: e.clientY - offsetY.current };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    offsetX.current = e.clientX - dragStart.current.x;
    offsetY.current = e.clientY - dragStart.current.y;
    xTo.current?.(offsetX.current);
    yTo.current?.(offsetY.current);
  }, []);

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleClose = useCallback(() => {
    gsap.to(windowRef.current, {
      scale: 0.9, opacity: 0, duration: 0.2, ease: "power3.in", onComplete: onClose,
    });
  }, [onClose]);

  return (
    <div
      ref={windowRef}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-[90vw] max-w-xl max-h-[75vh] overflow-hidden
        bg-[#0c0c0c]/95 backdrop-blur-2xl rounded-xl
        border border-white/[0.08] shadow-2xl shadow-black/60
        flex flex-col z-20"
    >
      {/* Title bar */}
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        className="flex items-center gap-2 px-3 py-2.5 bg-white/[0.02] border-b border-white/[0.06] cursor-grab active:cursor-grabbing touch-none"
      >
        <button
          onClick={handleClose}
          className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer shrink-0"
        />
        <span className="w-3 h-3 rounded-full bg-yellow-500/60 shrink-0" />
        <span className="w-3 h-3 rounded-full bg-green-500/60 shrink-0" />
        <span className="flex-1 text-center text-[11px] text-white/30 font-mono tracking-wide">
          Patrones & Arquitectura
        </span>
      </div>

      {/* Content */}
      <div className="overflow-y-auto flex-1 p-5 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-white/70 uppercase tracking-wider">
            Principios destacados
          </h3>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <span className={`text-[10px] font-mono transition-colors ${archMode ? "text-cyan-400/80" : "text-white/25"}`}>
              Modo arquitectura
            </span>
            <div className="relative w-9 h-5">
              <div
                className={`absolute inset-0 rounded-full transition-colors ${archMode ? "bg-cyan-400/30" : "bg-white/[0.08]"}`}
              />
              <div
                className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white/80 shadow transition-transform ${archMode ? "translate-x-4" : "translate-x-0"}`}
              />
              <input
                type="checkbox"
                checked={archMode}
                onChange={() => setArchMode(!archMode)}
                className="sr-only"
              />
            </div>
          </label>
        </div>

        {DESIGN_PATTERNS.map((p) => (
          <div
            key={p.id}
            className="bg-white/[0.025] border border-white/[0.05] rounded-lg p-4 space-y-3"
          >
            <h4 className="text-sm font-semibold text-white/80">{p.title}</h4>
            {archMode ? (
              p.id === "solid" && "archPrinciples" in p ? (
                <ul className="space-y-1.5">
                  {p.archPrinciples!.map((pr) => (
                    <li key={pr.label} className="flex gap-2 text-xs">
                      <span className="text-cyan-400/70 font-mono shrink-0">{pr.label}</span>
                      <span className="text-white/45">{pr.desc}</span>
                    </li>
                  ))}
                </ul>
              ) : p.id === "layered" && "archLayers" in p ? (
                <div className="space-y-1.5">
                  {p.archLayers!.map((l, i) => (
                    <div key={l.layer} className="flex items-center gap-2 text-xs">
                      <span className="text-cyan-400/40 font-mono text-[10px] w-5 text-right shrink-0">{i + 1}</span>
                      <div className="flex-1 bg-white/[0.03] border border-white/[0.05] rounded px-2.5 py-1.5">
                        <span className="text-cyan-400/60 font-medium">{l.layer}</span>
                        <span className="text-white/30 ml-2">{l.desc}</span>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-center pt-1">
                    <svg width="16" height="24" viewBox="0 0 16 24" className="text-white/[0.08]">
                      <line x1="8" y1="0" x2="8" y2="20" stroke="currentColor" strokeWidth="1" />
                      <polyline points="2,14 8,20 14,14" fill="none" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-white/55 leading-relaxed">{(p as { arch?: string }).arch}</p>
              )
            ) : (
              <p className="text-xs text-white/55 leading-relaxed">{p.brief}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignPatternsWindow;
