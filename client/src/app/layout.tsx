import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import CookieConsent from "@/components/shared/CookieConsent";
import PageTracker from "@/components/shared/PageTracker";
import { Suspense } from "react";
import { fetchAPI } from "../lib/api";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  let googleVerification = 'F5nSikuoKput_ywJswJk3Mz6kOyEVGZxD6KrQCNmMP8';
  let yahooVerification = '';
  let bingVerification = '';

  try {
    const res = await fetchAPI('/site-settings');
    if (res && res.success && res.data) {
      if (res.data.googleSiteVerification) googleVerification = res.data.googleSiteVerification;
      yahooVerification = res.data.yahooSiteVerification || '';
      bingVerification = res.data.bingSiteVerification || '';
    }
  } catch (err) {
    console.error("Failed to fetch dynamic site-settings metadata:", err);
  }

  const baseMetadata: Metadata = {
    metadataBase: new URL('https://europackindia.com'),
    title: "Europack - India’s Largest Industrial Packaging Experts",
    description: "Europack is India's trusted leader in ISPM-15 certified wooden crates, wooden pallets, corrugated boxes, dunnage bags, and precision industrial packaging. 33+ years, 3000+ clients.",
    keywords: "wooden pallets, corrugated boxes, industrial packaging, custom crates, Europack, Europack India, EuropackIndia, Euroapack, Euroapack India, export packaging, ISPM-15, dunnage bags, stretch wrap, anti-rust coating",
    openGraph: {
      title: "Europack - India’s Largest Industrial Packaging Experts",
      description: "India's trusted leader in ISPM-15 certified industrial packaging. 3000+ clients, 33+ years.",
      siteName: "Europack",
      type: "website"
    },
    icons: {
      icon: '/images/logo/favicon.png',
    },
    verification: {
      google: googleVerification,
      yahoo: yahooVerification,
      ...(bingVerification ? { other: { 'msvalidate.01': [bingVerification] } } : {})
    }
  };

  return baseMetadata;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let googleAnalyticsId = '';
  try {
    const res = await fetchAPI('/site-settings');
    if (res && res.success && res.data) {
      googleAnalyticsId = res.data.googleAnalyticsId || '';
    }
  } catch (err) {
    console.error("Failed to fetch dynamic site-settings in layout:", err);
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="F5nSikuoKput_ywJswJk3Mz6kOyEVGZxD6KrQCNmMP8" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
        {googleAnalyticsId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${googleAnalyticsId}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://europackindia.com/#website",
                  "url": "https://europackindia.com/",
                  "name": "Europack",
                  "description": "India's trusted leader in ISPM-15 certified industrial packaging.",
                  "publisher": {
                    "@id": "https://europackindia.com/#organization"
                  },
                  "potentialAction": [{
                    "@type": "SearchAction",
                    "target": {
                      "@type": "EntryPoint",
                      "urlTemplate": "https://europackindia.com/search?q={search_term_string}"
                    },
                    "query-input": "required name=search_term_string"
                  }],
                  "inLanguage": "en-US"
                },
                {
                  "@type": "Organization",
                  "@id": "https://europackindia.com/#organization",
                  "name": "Europack",
                  "url": "https://europackindia.com/",
                  "logo": {
                    "@type": "ImageObject",
                    "inLanguage": "en-US",
                    "@id": "https://europackindia.com/#/schema/logo/image/",
                    "url": "https://europackindia.com/images/logo/logo.png",
                    "contentUrl": "https://europackindia.com/images/logo/logo.png",
                    "width": 500,
                    "height": 150,
                    "caption": "Europack Logo"
                  },
                  "image": {
                    "@id": "https://europackindia.com/#/schema/logo/image/"
                  },
                  "sameAs": [
                    "https://www.linkedin.com/company/europack/"
                  ],
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+91-9820090775",
                    "contactType": "sales",
                    "areaServed": "IN",
                    "availableLanguage": ["English", "Hindi"]
                  },
                  "email": "sales@europackindia.in",
                  // Head office, in the form the Google Business Profile listing
                  // states it. NAP matching is literal, so this string is kept
                  // identical to the one in CityJsonLd and the footer.
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "101, ML Spaces, Railway Station Rd, near Vile Parle, above Bharat Bank, Navpada, Kamala Nagar, Vile Parle West",
                    "addressLocality": "Mumbai",
                    "addressRegion": "Maharashtra",
                    "postalCode": "400056",
                    "addressCountry": "IN"
                  },
                  // The four manufacturing sites, transcribed from the company's
                  // own card. These say where Europack operates — they are what
                  // lets a search engine resolve the business to four real places
                  // instead of one. Deliberately Place nodes under the one
                  // Organization, never separate LocalBusiness entities: a factory
                  // is not a branch that takes walk-in customers, and minting a
                  // storefront per site is how local profiles get suspended.
                  "location": [
                    {
                      "@type": "Place",
                      "name": "Europack Factory 1 — Mumbai",
                      "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "3rd Lane, Gulabshah Estate",
                        "addressLocality": "Mumbai",
                        "addressRegion": "Maharashtra",
                        "postalCode": "400070",
                        "addressCountry": "IN"
                      }
                    },
                    {
                      "@type": "Place",
                      "name": "Europack Factory 2 — Bhiwandi",
                      "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "Gala No. A-11/1-4, Shakti Industrial Complex, Vadu Navghar, Kaman, Vasai Road",
                        "addressLocality": "Bhiwandi",
                        "addressRegion": "Maharashtra",
                        "postalCode": "421302",
                        "addressCountry": "IN"
                      }
                    },
                    {
                      "@type": "Place",
                      "name": "Europack Factory 3 — Jamshedpur",
                      "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "Krishnapur, near Soma Puff Metal, Adityapur Industrial Area, Phase 1, Plot No. 10, Adityapur",
                        "addressLocality": "Jamshedpur",
                        "addressRegion": "Jharkhand",
                        "postalCode": "381014",
                        "addressCountry": "IN"
                      }
                    },
                    {
                      "@type": "Place",
                      "name": "Europack Factory 4 — Vadodara",
                      "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "G.J. Patel Estate, Plot No. 42/B, Harni Dena Road, Dena Chokadi, NH 48",
                        "addressLocality": "Vadodara",
                        "addressRegion": "Gujarat",
                        "postalCode": "390022",
                        "addressCountry": "IN"
                      }
                    }
                  ]
                }
              ]
            })
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <Toaster position="top-right" />
        <Suspense fallback={null}>
          <PageTracker />
        </Suspense>
        <CookieConsent />
        {children}
      </body>
    </html>
  );
}
