type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1d6b4f]">{eyebrow}</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">{title}</h1>
      {description ? (
        <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
