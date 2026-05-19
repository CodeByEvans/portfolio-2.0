interface PaperSection {
  title: string;
  lines: string[];
}

interface Props {
  sections: PaperSection[];
  isOpen: boolean;
  onClose: () => void;
}

const PaperModal = ({ sections, isOpen, onClose }: Props) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      style={{
        backgroundColor: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(12px)",
      }}
      onClick={onClose}
    >
      <div
        className="relative max-w-xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative bg-[#f7f1e5] rounded-sm shadow-2xl overflow-hidden"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(150,130,110,0.10) 30px, rgba(150,130,110,0.10) 31px), radial-gradient(ellipse at 30% 20%, rgba(255,250,240,0.5) 0%, transparent 60%)",
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-3 right-3 z-10 w-6 h-6 rounded-full bg-[#3a3028]/10 hover:bg-[#3a3028]/20 flex items-center justify-center transition-colors cursor-pointer"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#3a3028]/60">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div
            className="absolute top-0 left-0 right-0 h-[2px] bg-[#d4c8b4]/30"
            style={{
              clipPath: "polygon(0 0, 3% 80%, 8% 20%, 12% 70%, 18% 30%, 24% 60%, 30% 40%, 36% 80%, 42% 20%, 48% 60%, 54% 30%, 60% 70%, 66% 50%, 72% 80%, 78% 40%, 84% 60%, 90% 30%, 96% 70%, 100% 50%, 100% 0)",
            }}
          />

          <div className="absolute left-10 top-0 bottom-0 w-[1px] bg-red-300/20" />

          <div className="relative pl-12 pr-6 py-6 sm:pl-14 sm:pr-8 sm:py-8">
            <div className="font-serif text-[#3a3028] leading-relaxed space-y-4">
              {sections.map((section, si) => (
                <div key={si}>
                  <h2 className="text-sm sm:text-base font-bold tracking-wide text-[#2a2018] mb-1.5 border-b border-[#3a3028]/10 pb-1">
                    {section.title}
                  </h2>
                  {section.lines.map((line, i) => (
                    <p key={i} className={`text-sm sm:text-base ${line === "" ? "h-3 sm:h-4" : ""}`}>
                      {line || "\u00A0"}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-8 right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-amber-700/[0.08] pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default PaperModal;
