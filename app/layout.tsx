import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, organizationJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "DigitalYarr | IT & Software Development Company in Ahmedabad & Gandhinagar",
    template: "%s | DigitalYarr",
  },
  description:
    "DigitalYarr is an end-to-end technology partner in Ahmedabad & Gandhinagar — software development, cloud, cybersecurity, AI automation, and managed IT through one integrated team.",
  keywords: [
    "IT company in Ahmedabad",
    "software development company in Ahmedabad",
    "IT services Gandhinagar",
    "web development Ahmedabad",
    "cloud infrastructure Gujarat",
    "cybersecurity Ahmedabad",
    "AI automation",
    "managed IT services",
    "API integration",
    "technology partner",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "DigitalYarr | IT & Software Development Company in Ahmedabad & Gandhinagar",
    description:
      "One Partner. Complete Technology. Software development, cloud, security, automation and managed IT for businesses in Ahmedabad, Gandhinagar & across Gujarat.",
    type: "website",
    siteName: "DigitalYarr",
    locale: "en_IN",
    url: SITE_URL,
    images: [
      {
        url: "/images/brand/logo_h.png",
        alt: "DigitalYarr — Your End-to-End Technology Partner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "DigitalYarr | IT & Software Development Company in Ahmedabad & Gandhinagar",
    description: "One Partner. Complete Technology. Serving Ahmedabad & Gandhinagar.",
    images: ["/images/brand/logo_h.png"],
  },
  icons: {
    icon: "/images/brand/logo_h.png",
    shortcut: "/images/brand/logo_h.png",
    apple: "/images/brand/logo_h.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className="h-full">
      <body className="min-h-full flex flex-col font-sans antialiased bg-white text-navy">
        <JsonLd data={organizationJsonLd()} />
        <CustomCursor />
        <Preloader />
        <SmoothScroll>
          <ScrollProgress />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
