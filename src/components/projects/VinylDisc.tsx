const VinylDisc = ({
  logoSrc,
  size = "md",
  spinning,
  labelBg = "#0f0f0f",
}: {
  logoSrc: string;
  size?: "sm" | "md";
  spinning: boolean;
  labelBg?: string;
}) => {
  const isSm = size === "sm";
  const discSize = isSm ? "w-20 h-20" : "w-36 h-36";
  const grooves = isSm
    ? ["inset-[4px]", "inset-[10px]", "inset-[17px]"]
    : ["inset-[6px]", "inset-[15px]", "inset-[25px]"];
  const labelInset = isSm ? "inset-[22px] p-2" : "inset-[32px] p-3";
  const glowSize = isSm ? "-inset-[3px]" : "-inset-[4px]";

  return (
    <div className={`relative ${discSize} shrink-0`}>
      <div className={`absolute ${glowSize} rounded-full border border-cyan-400/20`} />
      <div
        className={`vinyl-disc absolute inset-0 rounded-full
          bg-gradient-to-br from-[#1a1a1a] to-[#111]
          border-2 border-white/[0.08]
          ${spinning ? "rotating" : ""}`}
      >
        {grooves.map((inset) => (
          <div key={inset} className={`absolute ${inset} rounded-full border border-white/[0.04]`} />
        ))}
        <div
          className={`absolute ${labelInset} rounded-full border border-white/[0.06] flex items-center justify-center overflow-hidden`}
          style={{ backgroundColor: labelBg }}
        >
          <img src={logoSrc} alt="" className="w-full h-full object-contain" draggable={false} />
        </div>
      </div>
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.02] via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

export default VinylDisc;
