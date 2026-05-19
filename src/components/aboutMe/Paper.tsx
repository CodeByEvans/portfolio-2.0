const Paper = ({ lines }: { lines: string[] }) => {
  const isTitle = (text: string) =>
    text.length > 0 && text === text.toUpperCase() && /[A-Z]/.test(text);

  return (
    <div className="relative z-10 flex-1 max-w-[280px] ">
      <div className="-inset-1 absolute rounded-sm bg-black/20 blur-md" />
      <div
        className="relative rounded-sm shadow-lg overflow-hidden "
        style={{
          backgroundColor: "#f7f1e5",
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 22px, rgba(180,160,140,0.08) 22px, rgba(180,160,140,0.08) 23px)",
          transform: "rotate(-1.5deg)",
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-[1.5px] bg-[#d4c8b4]/30"
          style={{
            clipPath:
              "polygon(0 0, 3% 80%, 8% 20%, 12% 70%, 18% 30%, 24% 60%, 30% 40%, 36% 80%, 42% 20%, 48% 60%, 54% 30%, 60% 70%, 66% 50%, 72% 80%, 78% 40%, 84% 60%, 90% 30%, 96% 70%, 100% 50%, 100% 0)",
          }}
        />
        <div className="absolute top-0 bottom-0 left-7 w-[0.5px] bg-red-300/20" />
        <div className="relative pl-8 pr-4 py-3">
          <div className="font-serif text-[#3a3028] leading-snug">
            {lines.map((line, i) => (
              <p
                key={i}
                className={`paper-line ${
                  line === ""
                    ? "h-1"
                    : `text-[9px] ${isTitle(line) ? "font-bold tracking-wide text-[#2a2018]" : ""}`
                }`}
              >
                {line || "\u00A0"}
              </p>
            ))}
          </div>
        </div>
        <div className="absolute bottom-4 right-4 w-6 h-6 rounded-full border border-amber-700/[0.06] pointer-events-none" />
      </div>
    </div>
  );
};

export default Paper;
