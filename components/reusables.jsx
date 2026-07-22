export const GrayTitle = ({ children }) => (
  <span className="bg-gradient-to-br from-stone-100 via-stone-300 to-stone-500 bg-clip-text text-transparent">
    {children}
  </span>
);
export const GoldTitle = ({ children }) => (
  <span className="bg-gradient-to-br from-emerald-100 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
    {children}
  </span>
);
export const SectionLabel = ({ children }) => (
  <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-amber-400 mb-4">
    <span className="h-px w-5 bg-gradient-to-r from-amber-400/0 to-amber-400" />
    {children}
    <span className="h-px w-5 bg-gradient-to-l from-amber-400/0 to-amber-400" />
  </p>
);
export const SectionHeading = ({ gray, gold }) => (
  <h2 className="font-display font-semibold text-[clamp(2rem,4vw,3rem)] leading-[1.08] tracking-[-0.03em]">
    <GrayTitle>{gray}</GrayTitle>
    <br />
    <GoldTitle>{gold}</GoldTitle>
  </h2>
);

export default function PageHeader({ label, gray, gold, description, right }) {
  return (
    <div className="relative overflow-hidden border-b border-white/8">
      <div className="aurora opacity-60" aria-hidden />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-4 px-6 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-8 sm:py-14">
        <div>
          {label && <SectionLabel>{label}</SectionLabel>}
          <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            {gray && <GrayTitle>{gray} </GrayTitle>}
            {gold && <GoldTitle>{gold}</GoldTitle>}
          </h1>
          {description && (
            <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-stone-400">
              {description}
            </p>
          )}
        </div>
        {right && <div className="shrink-0">{right}</div>}
      </div>
    </div>
  );
}
