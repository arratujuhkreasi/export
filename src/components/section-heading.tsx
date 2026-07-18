type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em]">
        <span className="inline-block h-px w-8 bg-gradient-to-r from-[#1d6b4f] to-[#2a9d6f]" aria-hidden="true" />
        <span className="gradient-text">{eyebrow}</span>
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">{title}</h1>
      {description ? (
        <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
