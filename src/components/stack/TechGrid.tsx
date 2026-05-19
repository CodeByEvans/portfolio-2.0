import { useRef, useEffect } from "react";
import gsap from "gsap";
import type { Technology } from "../../data/stack";

interface Props {
  technologies: Technology[];
}

const TechGrid = ({ technologies }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tech-card",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.45, stagger: 0.07, ease: "back.out(2)" },
      );
    }, ref);
    return () => ctx.revert();
  }, [technologies]);

  return (
    <div ref={ref} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {technologies.map((tech) => (
        <div
          key={tech.name}
          className="tech-card flex items-center gap-3 p-4 rounded-xl border border-white/[0.06]
                     bg-white/[0.02] hover:bg-white/[0.05] transition-colors duration-200"
        >
          <tech.icon className="text-xl text-white/70" />
          <span className="text-sm text-white/80 font-medium">{tech.name}</span>
        </div>
      ))}
    </div>
  );
};

export default TechGrid;
