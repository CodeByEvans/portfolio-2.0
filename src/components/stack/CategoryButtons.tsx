import { useRef, useEffect } from "react";
import gsap from "gsap";
import type { Category } from "../../data/stack";

interface Props {
  categories: Category[];
  selectedId: string | null;
  onSelect: (cat: Category) => void;
}

const CategoryButtons = ({
  categories,
  selectedId,
  onSelect,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".category-btn",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, stagger: 0.1, ease: "back.out(1.7)" },
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={`category-btn relative p-4 rounded-xl border transition-all duration-300 text-left cursor-pointer
            ${
              selectedId === cat.id
                ? "border-cyan-400/50 bg-cyan-400/[0.06]"
                : "border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.15]"
            }`}
          onClick={() => onSelect(cat)}
        >
          <cat.icon className="text-2xl text-white/80" />
          <span className="block text-sm font-medium text-white mt-1.5">
            {cat.label}
          </span>
          <span className="block text-[11px] text-white/35 mt-0.5">
            {cat.description}
          </span>
        </button>
      ))}
    </div>
  );
};

export default CategoryButtons;
