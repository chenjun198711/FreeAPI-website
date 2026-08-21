import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { BookmarkProvider } from "@/components/bookmark-provider";
import { ConsentBanner } from "@/components/consent-banner";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import "./globals.css";

/**
 * Google Consent Mode v2 default-deny snippet.
 * Must run BEFORE the AdSense script so that ad_storage / ad_user_data /
 * ad_personalization are "denied" for every visitor until they make a
 * choice in the consent banner. Required for EEA / UK / CH traffic under
 * the Google EU User Consent Policy.
 */
const consentDefaultScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500
});
`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://freeapihub.cc"),
  title: {
    default: "FreeAPI Hub — Discover Free Public APIs",
    template: "%s | FreeAPI Hub",
  },
  description:
    "Discover 1,400+ free public APIs across 50+ categories. Browse, search, and filter to find the perfect API for your next project. Includes integration guides and code examples.",
  keywords: ["free API", "public API", "open API", "REST API", "developer tools", "API directory", "free public APIs", "API integration", "API tutorial"],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "FreeAPI Hub",
    title: "FreeAPI Hub — Discover Free Public APIs",
    description: "Discover 1,400+ free public APIs across 50+ categories. Browse, search, and filter to find the perfect API for your next project.",
  },
  alternates: {
    canonical: "https://freeapihub.cc",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "FreeAPI Hub",
  url: "https://freeapihub.cc",
  description: "Discover 1,400+ free public APIs across 50+ categories. Browse, search, and filter to find the perfect API for your next project.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://freeapihub.cc/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FreeAPI Hub",
  url: "https://freeapihub.cc",
  logo: "https://freeapihub.cc/favicon.ico",
  description: "The most comprehensive curated directory of free public APIs on the web.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        {/* Consent Mode v2 default-deny. Must be the first script in <head>. */}
        <script
          dangerouslySetInnerHTML={{ __html: consentDefaultScript }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>
          <BookmarkProvider>
            <Nav />
            <main className="flex-1">{children}</main>
            <Footer />
            <ConsentBanner />
          </BookmarkProvider>
        </ThemeProvider>
        <Script
          id="adsbygoogle-js"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5297416023272291"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
