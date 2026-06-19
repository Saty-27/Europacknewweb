import { Metadata } from 'next';
import NewHomepageClient from './HomepageClient';
import StructuredData from '../../components/public/StructuredData';

export const metadata: Metadata = {
  title: "Europack - India’s Largest Industrial Packaging Experts",
  description: "Europack is India's trusted leader in ISPM-15 certified wooden crates, wooden pallets, corrugated boxes, dunnage bags, and precision industrial packaging. 33+ years, 3000+ customers.",
  keywords: ["wooden pallets", "corrugated boxes", "industrial packaging", "custom crates", "Europack", "Europack India", "EuropackIndia", "Euroapack", "Euroapack India", "export packaging", "ISPM-15", "dunnage bags"],
  openGraph: {
    title: "Europack - India’s Largest Industrial Packaging Experts",
    description: "India's trusted leader in ISPM-15 certified industrial packaging. 3000+ customers, 33+ years.",
    siteName: "Europack",
    type: "website"
  }
};

const orgData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Europack",
  "url": "https://europackindia.com",
  "logo": "https://europackindia.com/images/logo/logo.png",
  "contactPoint": { "@type": "ContactPoint", "telephone": "+91-98190-30303", "contactType": "customer service" }
};

const websiteData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Europack",
  "url": "https://europackindia.com",
  "potentialAction": { "@type": "SearchAction", "target": "https://europackindia.com/products?q={search_term_string}", "query-input": "required name=search_term_string" }
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
