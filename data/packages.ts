export interface PackageItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  targetAudience: string;
  includes: string[];
  highlighted?: boolean;
}

export const packages: PackageItem[] = [
  {
    id: "startup-launch",
    title: "Startup / Business Launch",
    tagline: "Technology foundation for new businesses",
    description:
      "For startups and small businesses that need their technology foundation built correctly from the start.",
    targetAudience: "Startups, new businesses, early-stage companies",
    includes: [
      "Custom web application or platform development",
      "API development and third-party integrations",
      "Database design and setup",
      "Cloud environment setup and configuration",
      "Basic security hardening",
      "Deployment and launch support",
      "Post-launch IT support",
    ],
  },
  {
    id: "digital-business",
    title: "Digital Business",
    tagline: "Digitize and automate operations",
    description:
      "For businesses looking to digitize their operations, automate manual processes, and build connected systems.",
    targetAudience: "Growing businesses, operations teams, digital transformation initiatives",
    includes: [
      "Business process review and automation planning",
      "Workflow automation development",
      "System integrations and connected platforms",
      "AI-assisted process improvements",
      "Reporting and data dashboards",
      "Cloud optimization",
      "Ongoing managed IT support",
    ],
    highlighted: true,
  },
  {
    id: "cloud-infrastructure",
    title: "Cloud & Infrastructure",
    tagline: "Reliable cloud and infrastructure management",
    description:
      "For organizations needing reliable cloud infrastructure, migration support, and ongoing infrastructure management.",
    targetAudience: "Organizations migrating to cloud, IT teams, infrastructure-dependent businesses",
    includes: [
      "Cloud readiness assessment",
      "Cloud migration planning and execution",
      "Cloud architecture design",
      "Server and infrastructure management",
      "Backup and disaster recovery setup",
      "Monitoring and alerting",
      "DevOps and deployment pipeline support",
    ],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    tagline: "Identify and reduce security risks",
    description:
      "For organizations that want to identify security vulnerabilities and reduce their exposure to cyber threats.",
    targetAudience: "Organizations with compliance requirements, businesses handling sensitive data",
    includes: [
      "Vulnerability Assessment & Penetration Testing (VAPT)",
      "Security posture review",
      "Network and application security assessment",
      "Security hardening recommendations",
      "Endpoint security review",
      "Security monitoring setup",
      "Remediation guidance and support",
    ],
  },
  {
    id: "ai-automation",
    title: "AI & Automation",
    tagline: "Reduce manual work and apply AI effectively",
    description:
      "For organizations looking to reduce repetitive manual work and apply AI to improve efficiency and decision-making.",
    targetAudience: "Operations-heavy businesses, data teams, organizations with manual workflows",
    includes: [
      "Process audit and automation opportunity mapping",
      "Workflow and business process automation",
      "AI solution development (chatbots, assistants, classifiers)",
      "ML model development and integration",
      "Data pipeline and reporting automation",
      "Integration with existing business systems",
    ],
  },
  {
    id: "managed-it",
    title: "Managed IT",
    tagline: "Ongoing technology support without the overhead",
    description:
      "For businesses wanting ongoing technology support without maintaining a large internal IT team.",
    targetAudience: "SMBs, businesses without internal IT, organizations scaling their team",
    includes: [
      "Helpdesk and user IT support",
      "Server and infrastructure monitoring",
      "Active Directory and user account management",
      "Access and permissions management",
      "Microsoft 365 and business application support",
      "Security patching and updates",
      "Monthly reporting and reviews",
    ],
  },
];

export const engagementModels = [
  {
    id: "project",
    title: "Project-Based",
    description:
      "Fixed scope, defined deliverables and timeline. Suited to specific development or implementation projects.",
  },
  {
    id: "monthly",
    title: "Monthly Managed Services",
    description:
      "Ongoing monitoring and management with defined support scope and SLA commitments.",
  },
  {
    id: "retainer",
    title: "Retainer",
    description:
      "Pre-purchased engineering or support hours available on demand each month.",
  },
  {
    id: "enterprise",
    title: "Enterprise",
    description:
      "Customized scope, dedicated resources, defined SLA, and strategic technology support for larger organizations.",
  },
];
