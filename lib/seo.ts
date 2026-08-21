/**
 * Centralised SEO configuration and JSON-LD (schema.org) builders.
 *
 * DigitalYarr is a service-area business: no public street address, but it
 * serves clients in Ahmedabad and Gandhinagar (Gujarat, India). Local relevance
 * is signalled through `address` (city-level) + `areaServed`, plus the local
 * keywords woven into page titles/descriptions and visible page content.
 */

export const SITE_URL = "https://digitalyarr.com";
export const SITE_NAME = "DigitalYarr";

/** Cities/areas the business actively serves — the core local-SEO targets. */
export const AREAS_SERVED = ["Ahmedabad", "Gandhinagar"] as const;

/** Name / Address / Phone — must stay consistent everywhere Google reads it. */
export const BUSINESS = {
  name: SITE_NAME,
  legalName: "DigitalYarr",
  phone: "+919898117731",
  phoneDisplay: "+91 98981 17731",
  email: "support@digitalyarr.com",
  logo: `${SITE_URL}/images/brand/logo_h.png`,
  addressLocality: "Ahmedabad",
  addressRegion: "Gujarat",
  addressCountry: "IN",
  description:
    "DigitalYarr is an end-to-end technology partner in Ahmedabad and Gandhinagar delivering software development, cloud, cybersecurity, AI automation, API integration, and managed IT services.",
} as const;

/** Social profile URLs — populated as accounts go live (used for schema `sameAs`). */
export const SOCIAL_PROFILES: string[] = [];

const areaServedNodes = AREAS_SERVED.map((name) => ({ "@type": "City", name }));

/** Absolute URL helper for canonical / schema URLs. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}

/**
 * Site-wide graph: the local business entity + the website entity.
 * Rendered once in the root layout so every page carries the local signals.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#business`,
        name: BUSINESS.name,
        legalName: BUSINESS.legalName,
        url: SITE_URL,
        image: BUSINESS.logo,
        logo: BUSINESS.logo,
        description: BUSINESS.description,
        telephone: BUSINESS.phone,
        email: BUSINESS.email,
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: BUSINESS.addressLocality,
          addressRegion: BUSINESS.addressRegion,
          addressCountry: BUSINESS.addressCountry,
        },
        areaServed: areaServedNodes,
        knowsAbout: [
          "Software Development",
          "Web Development",
          "Mobile App Development",
          "API & System Integration",
          "Cloud & Infrastructure",
          "Cybersecurity",
          "AI & Automation",
          "Managed IT Services",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: BUSINESS.phone,
          email: BUSINESS.email,
          contactType: "sales",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi", "Gujarati"],
        },
        ...(SOCIAL_PROFILES.length ? { sameAs: SOCIAL_PROFILES } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { "@id": `${SITE_URL}/#business` },
        inLanguage: "en-IN",
      },
    ],
  };
}

/** Per-service schema linking the offering back to the local business. */
export function serviceJsonLd(params: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: params.name,
    serviceType: params.name,
    url: absoluteUrl(params.path),
    description: params.description,
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: areaServedNodes,
  };
}

/** Breadcrumb trail — helps Google render breadcrumbs in results. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
