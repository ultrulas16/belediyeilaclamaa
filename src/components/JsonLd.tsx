import { siteConfig } from "@/lib/config";
import { services } from "@/lib/services";

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": siteConfig.name,
    "image": `${siteConfig.url}/images/hero-safety.png`,
    "@id": siteConfig.url,
    "url": siteConfig.url,
    "telephone": siteConfig.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.address,
      "addressLocality": "Bursa",
      "addressRegion": "TR",
      "postalCode": "16000",
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 40.1885,
      "longitude": 29.0610
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      siteConfig.social.instagram
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "İlaçlama Hizmetleri",
      "itemListElement": services.map((service, index) => ({
        "@type": "OfferCatalog",
        "name": service.title,
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": service.title,
              "description": service.shortDescription
            }
          }
        ]
      }))
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
