import { Metadata } from 'next';
import NewHomepageClient from './HomepageClient';
import StructuredData from '../../components/public/StructuredData';

export const metadata: Metadata = {
  title: "Europack | India's Largest Industrial Packaging Experts.",
  description: "Europack is India's trusted leader in ISPM-15 certified wooden crates, wooden pallets, corrugated boxes, dunnage bags, and precision industrial packaging. 33+ years, 3000+ customers.",
  keywords: ["Europack", "europack india", "europack packaging", "wooden pallets", "corrugated boxes", "industrial packaging", "custom crates", "export packaging", "ISPM-15", "dunnage bags", "packaging company India", "packaging manufacturer Mumbai"],
  alternates: {
    canonical: 'https://europackindia.com',
  },
  openGraph: {
    title: "Europack | India's Largest Industrial Packaging Experts.",
    description: "India's trusted leader in ISPM-15 certified industrial packaging. 3000+ customers, 33+ years.",
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
    title: "Europack | India's Largest Industrial Packaging Experts.",
    description: "India's trusted leader in ISPM-15 certified industrial packaging. 3000+ clients, 33+ years.",
  }
};

const orgData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://europackindia.com/#organization",
  "name": "Europack",
  "alternateName": ["Europack India", "Europack Industries", "europack"],
  "url": "https://europackindia.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://europackindia.com/images/logo/logo.png",
    "width": 500,
    "height": 150
  },
  "description": "Europack is India's largest industrial packaging company providing wooden pallets, corrugated boxes, ISPM-15 certified packaging, and export packaging solutions.",
  "foundingDate": "1993",
  "numberOfEmployees": { "@type": "QuantitativeValue", "value": 2500 },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "101, ML SPACES, Railway Station Rd, near Vile Parle, Vile Parle West",
    "addressLocality": "Mumbai",
    "addressRegion": "Maharashtra",
    "postalCode": "400056",
    "addressCountry": "IN"
  },
  "contactPoint": [
    { "@type": "ContactPoint", "telephone": "+91-98337-76290", "contactType": "sales", "areaServed": "IN", "availableLanguage": ["English", "Hindi"] },
    { "@type": "ContactPoint", "telephone": "+91-98201-93702", "contactType": "customer service", "areaServed": "IN" }
  ],
  "email": "sales@europackindia.in",
  "sameAs": [
    "https://www.linkedin.com/company/europack/",
    "https://www.indiamart.com/europack/",
    "https://europackindia.com"
  ]
};

const websiteData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://europackindia.com/#website",
  "name": "Europack",
  "alternateName": "Europack India",
  "url": "https://europackindia.com",
  "potentialAction": { "@type": "SearchAction", "target": { "@type": "EntryPoint", "urlTemplate": "https://europackindia.com/products?q={search_term_string}" }, "query-input": "required name=search_term_string" }
};

export default function Home() {
  return (
    <>
      <StructuredData data={orgData} />
      <StructuredData data={websiteData} />
      <NewHomepageClient />
    </>
  );
}
