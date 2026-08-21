import Image from "next/image";

type LogoVariant = "horizontal" | "stacked" | "icon" | "app";

interface LogoProps {
  variant?: LogoVariant;
  /** Controls the rendered CSS width. Height is always auto to preserve aspect ratio. */
  width?: number;
  className?: string;
}

const LOGO_CONFIG: Record<
  LogoVariant,
  { src: string; alt: string; intrinsicW: number; intrinsicH: number; defaultDisplayW: number }
> = {
  horizontal: {
    src: "/images/brand/logo_a.png",
    alt: "DigitalYarr - Your End-to-End Technology Partner",
    intrinsicW: 311,
    intrinsicH: 110,
    defaultDisplayW: 180,
  },
  stacked: {
    src: "/images/brand/logo_c.png",
    alt: "DigitalYarr - Your End-to-End Technology Partner",
    intrinsicW: 237,
    intrinsicH: 150,
    defaultDisplayW: 140,
  },
  icon: {
    src: "/images/brand/logo_d.png",
    alt: "DigitalYarr",
    intrinsicW: 76,
    intrinsicH: 70,
    defaultDisplayW: 38,
  },
  app: {
    src: "/images/brand/logo_h.png",
    alt: "DigitalYarr",
    intrinsicW: 92,
    intrinsicH: 87,
    defaultDisplayW: 40,
  },
};

export default function Logo({
  variant = "horizontal",
  width,
  className = "",
}: LogoProps) {
  const config = LOGO_CONFIG[variant];
  const displayW = width ?? config.defaultDisplayW;

  return (
    <Image
      src={config.src}
      alt={config.alt}
      width={config.intrinsicW}
      height={config.intrinsicH}
      style={{ width: displayW, height: "auto" }}
      className={`object-contain ${className}`}
      priority={variant === "horizontal" || variant === "icon"}
    />
  );
}
