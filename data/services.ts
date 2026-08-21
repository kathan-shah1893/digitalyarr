export interface ServiceFeature {
  name: string;
}

export interface ServiceData {
  id: string;
  slug: string;
  tagline: string;
  iconName: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  features: string[];
  accentColor: string;
}

export const services: ServiceData[] = [
  {
    id: "software-development",
    slug: "software-development",
    tagline: "Build",
    iconName: "Code2",
    title: "Software & Application Development",
    shortTitle: "Software Development",
    description:
      "Custom software and application development tailored precisely to your business requirements.",
    longDescription:
      "From concept to deployment, DigitalYarr designs and builds custom software that solves real business problems. We work across web, mobile, and backend platforms to deliver scalable, maintainable applications your team can rely on.",
    features: [
      "Custom software development",
      "Web application development",
      "Mobile app development",
      "API development & integration",
      "Legacy application modernization",
      "Database design and development",
    ],
    accentColor: "#2563EB",
  },
  {
    id: "api-integration",
    slug: "api-integration",
    tagline: "Connect",
    iconName: "Network",
    title: "API & System Integration",
    shortTitle: "API & Integration",
    description:
      "Connect your business systems, applications, and data through powerful APIs and seamless integrations.",
    longDescription:
      "Modern businesses run on connected systems. DigitalYarr builds and integrates APIs that allow your platforms, third-party tools, and data sources to work together as a single, unified operation.",
    features: [
      "API development",
      "Third-party integrations",
      "Database integration",
      "Connected business systems",
      "System-to-system integration",
      "Workflow data exchange",
    ],
    accentColor: "#06B6D4",
  },
  {
    id: "cloud-infrastructure",
    slug: "cloud-infrastructure",
    tagline: "Cloud",
    iconName: "Cloud",
    title: "Cloud & Infrastructure",
    shortTitle: "Cloud & Infrastructure",
    description:
      "Reliable cloud architecture, migration, and infrastructure management for organizations of all sizes.",
    longDescription:
      "DigitalYarr helps organizations move to, optimize, and manage cloud infrastructure. Whether you are migrating an existing workload or building cloud-native from day one, we design and operate resilient infrastructure that scales with your business.",
    features: [
      "Cloud migration",
      "Cloud setup and architecture",
      "Server & infrastructure management",
      "Backup and disaster recovery",
      "Monitoring and maintenance",
      "DevOps and deployment support",
    ],
    accentColor: "#2563EB",
  },
  {
    id: "cybersecurity",
    slug: "cybersecurity",
    tagline: "Secure",
    iconName: "Shield",
    title: "Cybersecurity",
    shortTitle: "Cybersecurity",
    description:
      "Identify, reduce, and manage security risks across your network, applications, and endpoints.",
    longDescription:
      "Security is not optional. DigitalYarr delivers structured security assessments, penetration testing, and remediation support to help organizations understand their exposure and take targeted action to reduce risk.",
    features: [
      "Vulnerability Assessment & Penetration Testing (VAPT)",
      "Security assessment",
      "Network and application security",
      "Security hardening",
      "Endpoint security",
      "Security monitoring and remediation",
    ],
    accentColor: "#06B6D4",
  },
  {
    id: "ai-automation",
    slug: "ai-automation",
    tagline: "Automate",
    iconName: "Bot",
    title: "AI, ML & Automation",
    shortTitle: "AI & Automation",
    description:
      "Apply artificial intelligence and automation to reduce manual effort and make smarter business decisions.",
    longDescription:
      "DigitalYarr helps organizations identify where AI and automation can deliver the most value — then builds and deploys those solutions. From intelligent process automation to ML-powered applications, we make AI practical and results-driven.",
    features: [
      "AI/ML solutions",
      "Business process automation",
      "AI-powered applications",
      "Workflow automation",
      "Chatbots and intelligent assistants",
      "Data-driven solutions",
    ],
    accentColor: "#2563EB",
  },
  {
    id: "managed-it",
    slug: "managed-it",
    tagline: "Manage",
    iconName: "LifeBuoy",
    title: "IT Support & Managed Services",
    shortTitle: "Managed IT",
    description:
      "Ongoing technology support and managed services so your business keeps running reliably.",
    longDescription:
      "DigitalYarr provides structured IT support and managed services so businesses can focus on their core work. From helpdesk support to Active Directory management and Microsoft 365 administration, we keep your technology environment stable and your team productive.",
    features: [
      "Helpdesk / IT support",
      "Server support",
      "Active Directory management",
      "User account management",
      "Access and permissions management",
      "Microsoft 365 / business application support",
      "Monitoring and maintenance",
    ],
    accentColor: "#06B6D4",
  },
];

export const identityAccessService = {
  id: "identity-access",
  slug: "identity-access",
  tagline: "Secure",
  iconName: "Lock",
  title: "Identity & Access Management",
  shortTitle: "Identity & Access",
  description:
    "Structured management of user identities, access rights, and the lifecycle of accounts across your organization.",
  longDescription:
    "Identity is the foundation of enterprise security. DigitalYarr delivers structured Identity & Access Management that ensures the right people have the right access to the right resources — and that access is governed, audited, and controlled.",
  features: [
    "Active Directory management",
    "User provisioning and deprovisioning",
    "Role-based access control (RBAC)",
    "Password and account management",
    "Access reviews",
    "Identity lifecycle management",
  ],
  accentColor: "#2563EB",
};
