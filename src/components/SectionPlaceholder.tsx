interface Props {
  title: string;
}

export default function SectionPlaceholder({ title }: Props) {
  return (
    <section className="min-h-[85vh] flex items-center justify-center bg-[#080808] pt-20">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <span className="block w-8 h-[2px] bg-cyan-400/60" />
          <span className="text-xs font-mono tracking-widest text-cyan-400/60 uppercase">
            Sección
          </span>
          <span className="block w-8 h-[2px] bg-cyan-400/60" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-light text-white/60">
          {title}
        </h2>
        <p className="text-white/30 text-sm font-mono">
          Contenido próximamente
        </p>
      </div>
    </section>
  );
}
