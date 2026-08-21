import type { ComponentType } from "react";
import Link from "next/link";
import {
  Code2,
  Network,
  Cloud,
  Shield,
  Bot,
  LifeBuoy,
  ArrowRight,
} from "lucide-react";

const ICON_MAP: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  Code2,
  Network,
  Cloud,
  Shield,
  Bot,
  LifeBuoy,
};

interface CapabilityCardProps {
  step: number;
  iconName: string;
  tagline: string;
  title: string;
  description: string;
  href: string;
  isLast?: boolean;
}

export default function CapabilityCard({
  step,
  iconName,
  tagline,
  title,
  description,
  href,
  isLast = false,
}: CapabilityCardProps) {
  const Icon = ICON_MAP[iconName] ?? Code2;

  return (
    <div className="relative flex flex-col items-center text-center group">
      {/* Connector line (horizontal, desktop only) */}
      {!isLast && (
        <div
          className="hidden lg:block absolute top-9 left-[calc(50%+3rem)] right-[calc(-50%+3rem)] h-px bg-gradient-to-r from-white/20 to-white/5"
          aria-hidden="true"
        />
      )}

      {/* Icon circle */}
      <div className="relative w-18 h-18 rounded-2xl bg-navy-700 border border-white/10 flex items-center justify-center mb-5 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-300 w-[72px] h-[72px]">
        <Icon size={28} className="text-primary group-hover:text-accent transition-colors duration-300" />
        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-navy-600 border border-white/10 flex items-center justify-center text-xs font-bold text-white/60">
          {step}
        </span>
      </div>

      {/* Tagline */}
      <span className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
        {tagline}
      </span>

      {/* Title */}
      <h3 className="text-base font-bold text-white mb-2">{title}</h3>

      {/* Description */}
      <p className="text-sm text-white/55 leading-relaxed mb-4 max-w-[180px]">
        {description}
      </p>

      {/* Link */}
      <Link
        href={href}
        className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-accent transition-colors"
        aria-label={`Explore ${title}`}
      >
        Explore
        <ArrowRight size={12} />
      </Link>
    </div>
  );
}
