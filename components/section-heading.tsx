type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  index: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  index,
}: SectionHeadingProps) {
  return (
    <div className="mb-9 grid gap-5 sm:grid-cols-[110px_1fr]">
      <div className="text-[10px] uppercase tracking-[0.24em] text-muted">
        <span>{index}</span>
        <span className="ml-3 inline-block h-px w-9 bg-white align-middle" />
      </div>
      <div className="max-w-3xl">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-muted">
          {eyebrow}
        </p>
        <h2 className="font-display text-4xl uppercase leading-[0.9] text-white sm:text-5xl">
          {title}
        </h2>
      </div>
      {description ? (
        <p className="max-w-2xl text-sm leading-6 text-muted sm:col-start-2">
          {description}
        </p>
      ) : null}
    </div>
  );
}
