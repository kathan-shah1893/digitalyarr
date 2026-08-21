export interface NavItem {
  label: string;
  href: string;
}

export interface NavService extends NavItem {
  tagline: string;
}

export const mainNav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/services" },
  { label: "Packages", href: "/packages" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const serviceNav: NavService[] = [
  {
    label: "Software Development",
    href: "/services/software-development",
    tagline: "Build",
  },
  {
    label: "API & Integration",
    href: "/services/api-integration",
    tagline: "Connect",
  },
  {
    label: "Cloud & Infrastructure",
    href: "/services/cloud-infrastructure",
    tagline: "Cloud",
  },
  {
    label: "Cybersecurity",
    href: "/services/cybersecurity",
    tagline: "Secure",
  },
  {
    label: "AI & Automation",
    href: "/services/ai-automation",
    tagline: "Automate",
  },
  {
    label: "Managed IT",
    href: "/services/managed-it",
    tagline: "Manage",
  },
];

export const footerServiceNav: NavItem[] = [
  { label: "Software Development", href: "/services/software-development" },
  { label: "API & Integration", href: "/services/api-integration" },
  { label: "Cloud & Infrastructure", href: "/services/cloud-infrastructure" },
  { label: "Cybersecurity", href: "/services/cybersecurity" },
  { label: "AI & Automation", href: "/services/ai-automation" },
  { label: "Managed IT", href: "/services/managed-it" },
  { label: "Identity & Access", href: "/services" },
];

export const footerMainNav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Packages", href: "/packages" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
