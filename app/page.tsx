import type { Metadata } from "next";
import Link from "next/link";
import {
  Users,
  Target,
  Award,
  Clock,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import CinematicHero from "@/components/hero/CinematicHero";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import AnimateIn from "@/components/AnimateIn";
import RocketVisual from "@/components/RocketVisual";
import Testimonials from "@/components/Testimonials";
import HomeProjectsSection from "@/components/HomeProjectsSection";
import { getPublishedProjects } from "@/lib/project-service";

export const metadata: Metadata = {
  title:
    "DigitalYarr | IT & Software Development Company in Ahmedabad & Gandhinagar",
  description:
    "DigitalYarr is a leading IT & software development company in Ahmedabad & Gandhinagar — software development, cloud, cybersecurity, AI automation, and managed IT through one integrated partner.",
  alternates: { canonical: "/" },
};

const homeServices = [
  {
    iconName: "Code2",
    tagline: "Build",
    title: "Web Development",
    description:
      "Custom web applications and digital products tailored to your business objectives.",
    features: [] as string[],
    href: "/services/software-development",
  },
  {
    iconName: "Smartphone",
    tagline: "Mobile",
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile apps that deliver exceptional user experiences.",
    features: [] as string[],
    href: "/services/software-development",
  },
  {
    iconName: "Cloud",
    tagline: "Cloud",
    title: "Cloud Solutions",
    description:
      "Scalable cloud infrastructure designed for performance, reliability, and growth.",
    features: [] as string[],
    href: "/services/cloud-infrastructure",
  },
  {
    iconName: "Zap",
    tagline: "DevOps",
    title: "DevOps & CI/CD",
    description:
      "Automated pipelines and deployment infrastructure that accelerate your delivery velocity.",
    features: [] as string[],
    href: "/services/cloud-infrastructure",
  },
  {
    iconName: "Bot",
    tagline: "Automate",
    title: "AI & Automation",
    description:
      "Intelligent automation solutions that streamline operations and reduce manual effort.",
    features: [] as string[],
    href: "/services/ai-automation",
  },
  {
    iconName: "Shield",
    tagline: "Secure",
    title: "Cybersecurity",
    description:
      "Comprehensive security to protect your digital assets, data, and infrastructure.",
    features: [] as string[],
    href: "/services/cybersecurity",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description: "We understand your business, goals, and challenges.",
  },
  {
    number: "02",
    title: "Planning",
    description: "We analyze, strategize, and create a clear roadmap.",
  },
  {
    number: "03",
    title: "Design & Development",
    description: "We design intuitive experiences and build scalable solutions.",
  },
  {
    number: "04",
    title: "Testing",
    description: "We ensure quality, performance, and security.",
  },
  {
    number: "05",
    title: "Deployment & Support",
    description: "We deploy seamlessly and support your growth.",
  },
];

const processFeatures = [
  "Strategy First Approach",
  "Agile Execution",
  "Transparent Communication",
  "Continuous Support",
];

const whyPoints = [
  {
    title: "Expert Team",
    description: "Skilled professionals passionate about technology.",
    Icon: Users,
  },
  {
    title: "Client-Centric",
    description: "Your goals are our focus. We listen, we care, we deliver.",
    Icon: Target,
  },
  {
    title: "Quality Assured",
    description: "We follow industry-best practices to ensure excellence.",
    Icon: Award,
  },
  {
    title: "On-Time Delivery",
    description: "We value your time and ensure timely delivery.",
    Icon: Clock,
  },
];

export default async function Home() {
  const allProjects = await getPublishedProjects();

  return (
    <>
      {/* ── Hero ── */}
      <CinematicHero />

      {/* ── What We Do (Services) ── */}
      <section
        className="bg-surface py-20 sm:py-28"
        aria-labelledby="services-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <SectionHeading
              id="services-heading"
              eyebrow="What We Do"
              title={`End-to-End IT Solutions\nTo Elevate Your Business`}
              subtitle="We offer a comprehensive range of IT services to help you innovate, transform, and scale with confidence."
              centered
            />
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {homeServices.map((service, i) => (
              <ServiceCard
                key={service.title}
                iconName={service.iconName}
                tagline={service.tagline}
                title={service.title}
                description={service.description}
                features={service.features}
                href={service.href}
                index={i}
                compact
              />
            ))}
          </div>

          <AnimateIn delay={0.2} className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
            >
              Explore All Services
              <ArrowRight size={14} />
            </Link>
          </AnimateIn>
        </div>
      </section>

      {/* ── How We Work (Process) ── */}
      <section
        className="bg-navy py-20 sm:py-28 relative overflow-hidden"
        aria-labelledby="process-heading"
      >
        <div className="absolute inset-0 tech-grid opacity-20" aria-hidden="true" />
        <div
          className="absolute top-0 left-0 w-[500px] h-[500px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top left, rgba(6,182,212,0.07) 0%, transparent 65%)",
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* ── Left: heading + all 5 steps + features ── */}
            <div>
              <AnimateIn>
                <SectionHeading
                  id="process-heading"
                  eyebrow="How We Work"
                  title={`A Proven Process For\nSuccessful Delivery`}
                  subtitle="We follow a transparent, agile, and collaborative approach to turn your ideas into impactful solutions."
                  light
                />
              </AnimateIn>

              <div className="space-y-6">
                {processSteps.map((step, i) => (
                  <AnimateIn key={step.number} delay={i * 0.08}>
                    <div className="group flex gap-4 items-start">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
                        <span className="text-xs font-black text-primary">{step.number}</span>
                      </div>
                      <div className="pt-1">
                        <h3 className="text-base font-bold text-white mb-1 leading-snug">
                          {step.title}
                        </h3>
                        <p className="text-sm text-white/50 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </AnimateIn>
                ))}
              </div>

              <AnimateIn delay={0.15} className="mt-10">
                <div className="border-t border-white/8 pt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {processFeatures.map((feature) => (
                    <div key={feature} className="flex items-center gap-2.5">
                      <CheckCircle size={14} className="text-accent flex-shrink-0" />
                      <span className="text-xs font-semibold text-white/60">{feature}</span>
                    </div>
                  ))}
                </div>
              </AnimateIn>
            </div>

            {/* ── Right: rocket spanning the full left-column height (desktop) ── */}
            <AnimateIn
              delay={0.2}
              className="hidden lg:flex items-center justify-center"
            >
              <RocketVisual />
            </AnimateIn>
          </div>

          {/* Mobile: rocket below content */}
          <AnimateIn delay={0.2} className="lg:hidden mt-10 flex items-center justify-center">
            <RocketVisual />
          </AnimateIn>
        </div>
      </section>

      {/* ── Our Work ── */}
      <section
        className="bg-surface py-20 sm:py-28"
        aria-labelledby="work-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <SectionHeading
              id="work-heading"
              eyebrow="Our Work"
              title="Solutions We're Proud Of"
              subtitle="Explore some of our recent projects that created real impact for our clients."
              centered
            />
          </AnimateIn>

          <HomeProjectsSection projects={allProjects} />
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section
        className="bg-navy py-20 sm:py-28 relative overflow-hidden"
        aria-labelledby="why-heading"
      >
        <div className="absolute inset-0 tech-grid opacity-20" aria-hidden="true" />
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top right, rgba(37,99,235,0.08) 0%, transparent 65%)",
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <SectionHeading
              id="why-heading"
              eyebrow="Why Choose Us"
              title={`More Than A Service Provider,\nWe're Your Technology Partner`}
              subtitle="We combine innovation, expertise, and commitment to deliver solutions that make a real difference."
              light
              centered
            />
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyPoints.map((point, i) => {
              const { Icon } = point;
              return (
                <AnimateIn key={point.title} delay={i * 0.09}>
                  <div className="group h-full p-6 rounded-2xl bg-navy-700/50 border border-white/6 hover:border-primary/35 hover:bg-navy-700/80 transition-all duration-300 relative overflow-hidden">
                    <div
                      className="absolute -top-8 -right-8 w-20 h-20 rounded-full bg-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      aria-hidden="true"
                    />
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-200">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">{point.title}</h3>
                    <p className="text-sm text-white/45 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </AnimateIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section
        className="bg-surface py-20 sm:py-28"
        aria-labelledby="testimonials-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <SectionHeading
              id="testimonials-heading"
              eyebrow="What Our Clients Say"
              title="Trusted By Businesses Worldwide"
              centered
            />
          </AnimateIn>

          <Testimonials />
        </div>
      </section>

      {/* ── CTA ── */}
      <CTASection />
    </>
  );
}
