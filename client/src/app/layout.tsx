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
    title: {
      default: "Europack | India's Largest Industrial Packaging Experts",
      template: '%s | Europack'
    },
    description: "Europack (also known as Europack India) is India's most trusted industrial packaging company. ISPM-15 certified wooden pallets, wooden crates, corrugated boxes, dunnage bags, vacuum packaging, and export packaging. 33+ years, 3000+ clients.",
    keywords: "Europack, europack india, europack packaging, europack mumbai, wooden pallets manufacturer Mumbai, industrial packaging India, ISPM-15 certified packaging, export packaging company Mumbai, corrugated boxes manufacturer, packaging company India",
    authors: [{ name: 'Europack', url: 'https://europackindia.com' }],
    creator: 'Europack',
    publisher: 'Europack',
    alternates: {
      canonical: 'https://europackindia.com',
    },
    openGraph: {
      title: "Europack | India's Largest Industrial Packaging Experts",
      description: "Europack India — trusted leader in ISPM-15 certified industrial packaging. 3000+ clients, 33+ years.",
      siteName: "Europack",
      type: "website",
      url: 'https://europackindia.com',
      images: [{
        url: 'https://europackindia.com/images/logo/logo.png',
        width: 500,
        height: 150,
        alt: 'Europack - Industrial Packaging Experts India'
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: "Europack | India's Largest Industrial Packaging Experts",
      description: "Europack India — ISPM-15 certified industrial packaging. 3000+ clients, 33+ years.",
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
                  "alternateName": "Europack India",
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
                  "alternateName": ["Europack India", "Europack Industries", "europack", "europackindia"],
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
                  "description": "Europack is India's largest industrial packaging company, manufacturing wooden pallets, corrugated boxes, ISPM-15 export packaging, vacuum packaging, and seaworthy packing.",
                  "foundingDate": "1993",
                  "numberOfEmployees": {
                    "@type": "QuantitativeValue",
                    "value": 2500
                  },
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "101, ML SPACES, Railway Station Rd, near Vile Parle, Vile Parle West",
                    "addressLocality": "Mumbai",
                    "addressRegion": "Maharashtra",
                    "postalCode": "400056",
                    "addressCountry": "IN"
                  },
                  "email": "sales@europackindia.in",
                  "sameAs": [
                    "https://www.linkedin.com/company/europack/",
                    "https://www.indiamart.com/europack/",
                    "https://europackindia.com"
                  ],
                  "contactPoint": [
                    {
                      "@type": "ContactPoint",
                      "telephone": "+91-98337-76290",
                      "contactType": "sales",
                      "areaServed": "IN",
                      "availableLanguage": ["English", "Hindi"]
                    },
                    {
                      "@type": "ContactPoint",
                      "telephone": "+91-98201-93702",
                      "contactType": "customer service",
                      "areaServed": "IN"
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
