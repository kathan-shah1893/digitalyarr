"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import Logo from "./Logo";

const serviceDropdown = [
  { label: "Software Development", href: "/services/software-development", tagline: "Build" },
  { label: "API & Integration",    href: "/services/api-integration",       tagline: "Connect" },
  { label: "Cloud & Infrastructure",href: "/services/cloud-infrastructure", tagline: "Cloud" },
  { label: "Cybersecurity",         href: "/services/cybersecurity",         tagline: "Secure" },
  { label: "AI & Automation",       href: "/services/ai-automation",         tagline: "Automate" },
  { label: "Managed IT",            href: "/services/managed-it",            tagline: "Manage" },
];

const navLinks = [
  { label: "Our Work",  href: "/work" },
  { label: "Packages",  href: "/packages" },
  { label: "About",     href: "/about" },
  { label: "Contact",   href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [mounted, setMounted]       = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
        transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-navy/95 backdrop-blur-xl border-b border-white/8 shadow-2xl shadow-black/30"
            : "bg-transparent"
        }`}
      >
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <Link
              href="/"
              className="flex-shrink-0 flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-navy rounded"
              aria-label="DigitalYarr — Home"
            >
              <span className="hidden sm:block">
                <Logo variant="horizontal" width={172} />
              </span>
              <span className="sm:hidden">
                <Logo variant="icon" width={34} />
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-7">

              {/* Services dropdown */}
              <div className="relative group">
                <button
                  className={`relative flex items-center gap-1 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded px-1 pb-0.5 ${
                    isActive("/services") ? "text-white" : "text-white/70 hover:text-white"
                  }`}
                  aria-haspopup="true"
                >
                  Services
                  <ChevronDown size={14} className="mt-0.5 transition-transform group-hover:rotate-180 duration-200" />
                  {isActive("/services") && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-primary to-accent"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>

                {/* Dropdown panel */}
                <div className="absolute top-full -left-4 pt-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 translate-y-1 group-hover:translate-y-0">
                  <div className="bg-navy-800/98 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 p-2.5 w-68">
                    {serviceDropdown.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors group/item ${
                          isActive(item.href)
                            ? "bg-primary/15 text-white"
                            : "text-white/65 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <span className="text-[10px] font-bold text-accent w-14 flex-shrink-0 tracking-wide">
                          {item.tagline}
                        </span>
                        <span className="text-sm">{item.label}</span>
                      </Link>
                    ))}
                    <div className="border-t border-white/8 mt-1.5 pt-1.5">
                      <Link
                        href="/services"
                        className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-primary hover:text-accent rounded-xl hover:bg-white/5 transition-colors"
                      >
                        All Services
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded px-1 pb-0.5 ${
                    isActive(link.href) ? "text-white" : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-primary to-accent"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* CTA + mobile toggle */}
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
              >
                <Link
                  href="/contact"
                  className="hidden lg:inline-flex items-center gap-1.5 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-lg shadow-primary/20"
                >
                  Start a Project
                  <ArrowRight size={14} />
                </Link>
              </motion.div>

              <button
                className="lg:hidden p-2 text-white rounded-xl hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X size={22} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="open"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu size={22} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-navy/98 backdrop-blur-xl pt-16 lg:hidden overflow-y-auto"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col flex-1 px-4 pb-8 pt-6 gap-1">
              {/* Services group */}
              <p className="px-3 pt-1 pb-2 text-[10px] font-bold uppercase tracking-[3px] text-white/35">
                Services
              </p>
              {serviceDropdown.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${
                    isActive(item.href)
                      ? "bg-primary/15 text-white"
                      : "text-white/65 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="text-[10px] font-bold text-accent w-14 tracking-wide">
                    {item.tagline}
                  </span>
                  <span className="text-base">{item.label}</span>
                </Link>
              ))}

              <div className="border-t border-white/8 mt-4 pt-4 flex flex-col gap-1">
                {[
                  { label: "All Services", href: "/services" },
                  { label: "Our Work",     href: "/work" },
                  { label: "Packages",     href: "/packages" },
                  { label: "About",        href: "/about" },
                  { label: "Contact",      href: "/contact" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-3.5 text-base font-medium rounded-xl transition-colors ${
                      isActive(item.href)
                        ? "text-white bg-white/8"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-auto pt-6 border-t border-white/8">
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors shadow-lg shadow-primary/20"
                >
                  Start a Project
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
