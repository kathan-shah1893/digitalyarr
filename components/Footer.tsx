"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Linkedin, Twitter, Github, Phone, Mail, MapPin } from "lucide-react";
import Logo from "./Logo";

const serviceLinks = [
  { label: "Web Development",       href: "/services/software-development" },
  { label: "Mobile App Development", href: "/services/software-development" },
  { label: "Cloud Solutions",        href: "/services/cloud-infrastructure" },
  { label: "DevOps & CI/CD",         href: "/services/cloud-infrastructure" },
  { label: "AI & Automation",        href: "/services/ai-automation" },
  { label: "Cybersecurity",          href: "/services/cybersecurity" },
];

const companyLinks = [
  { label: "About Us",   href: "/about" },
  { label: "Our Work",   href: "/work" },
  { label: "Blog",       href: "#" },
  { label: "Careers",    href: "#" },
  { label: "Contact Us", href: "/contact" },
];

const resourceLinks = [
  { label: "Case Studies",      href: "/work" },
  { label: "FAQs",              href: "/contact" },
  { label: "Privacy Policy",    href: "/privacy" },
  { label: "Terms & Conditions",href: "/terms" },
];

const socialLinks = [
  { label: "LinkedIn", href: "#", Icon: Linkedin },
  { label: "Twitter",  href: "#", Icon: Twitter },
  { label: "GitHub",   href: "#", Icon: Github },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const reduce = useReducedMotion();

  return (
    <motion.footer
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
      className="relative bg-navy text-white overflow-hidden"
      role="contentinfo"
    >
      {/* Gradient top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(37,99,235,0.6) 30%, rgba(6,182,212,0.5) 60%, transparent)",
        }}
        aria-hidden="true"
      />

      {/* Subtle tech-grid background */}
      <div
        className="absolute inset-0 tech-grid opacity-20 pointer-events-none"
        aria-hidden="true"
      />

      {/* Blue glow top-right */}
      <div
        className="absolute top-0 right-0 w-96 h-64 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(37,99,235,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">

          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-block mb-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded opacity-90 hover:opacity-100 transition-opacity"
              aria-label="DigitalYarr — Home"
            >
              <Logo variant="horizontal" width={176} />
            </Link>

            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">
              Your end-to-end technology partner — build, connect, secure, automate, and
              manage your technology through one integrated team.
            </p>

            {/* Contact info */}
            <div className="space-y-2 mb-6">
              <a
                href="tel:+919898117731"
                className="flex items-center gap-2.5 text-white/45 hover:text-white/80 text-xs transition-colors group"
              >
                <Phone size={11} className="text-accent flex-shrink-0" aria-hidden="true" />
                +91 98981 17731
              </a>
              <a
                href="mailto:support@digitalyarr.com"
                className="flex items-center gap-2.5 text-white/45 hover:text-white/80 text-xs transition-colors group"
              >
                <Mail size={11} className="text-accent flex-shrink-0" aria-hidden="true" />
                support@digitalyarr.com
              </a>
              <p className="flex items-start gap-2.5 text-white/45 text-xs">
                <MapPin size={11} className="text-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>Ahmedabad, Gujarat, India — serving Ahmedabad &amp; Gandhinagar</span>
              </p>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-white/40 hover:text-white hover:bg-primary/20 hover:border-primary/40 transition-all duration-200"
                >
                  <Icon size={14} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Services links */}
          <div className="lg:col-span-3 lg:pl-4">
            <h2 className="text-[10px] font-bold uppercase tracking-[3px] text-white/30 mb-5">
              Services
            </h2>
            <ul className="space-y-3" role="list">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors hover:translate-x-0.5 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div className="lg:col-span-2 lg:pl-2">
            <h2 className="text-[10px] font-bold uppercase tracking-[3px] text-white/30 mb-5">
              Company
            </h2>
            <ul className="space-y-3" role="list">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors hover:translate-x-0.5 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources links */}
          <div className="lg:col-span-3 lg:pl-4">
            <h2 className="text-[10px] font-bold uppercase tracking-[3px] text-white/30 mb-5">
              Resources
            </h2>
            <ul className="space-y-3" role="list">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors hover:translate-x-0.5 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-white/25 text-xs">
            © {year} DigitalYarr. All rights reserved.
          </p>
          <p className="text-white/18 text-xs tracking-wide">
            One Partner. Complete Technology.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
