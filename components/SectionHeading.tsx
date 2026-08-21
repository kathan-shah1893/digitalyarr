interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  maxWidth?: string;
  id?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = false,
  light = false,
  maxWidth = "max-w-2xl",
  id,
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      {eyebrow && (
        <p
          className={`text-xs font-semibold uppercase tracking-widest mb-3 ${
            light ? "text-accent" : "text-primary"
          }`}
        >
          {eyebrow}
        </p>
      )}
      {/* Use white-space: pre-line so \n in title strings renders as a visual line break
          without inserting any <br> elements in the DOM */}
      <h2
        id={id}
        style={{ whiteSpace: "pre-line" }}
        className={`text-3xl sm:text-4xl font-bold leading-tight ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            centered ? `${maxWidth} mx-auto` : maxWidth
          } ${light ? "text-white/65" : "text-muted"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
