import React from 'react';

export default function EventSchema() {
  const eventData = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": ".hack26",
    "description": "IEEE SB MACE flagship hackathon.",
    "image": "https://hack26.ieeemace.org/og-image.png",
    "startDate": "2026-09-04T00:00:00+05:30",
    "endDate": "2026-09-05T23:59:59+05:30",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": "MACE Campus",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Mar Athanasius College of Engineering",
        "addressLocality": "Kothamangalam",
        "addressRegion": "Kerala",
        "postalCode": "686666",
        "addressCountry": "IN"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": "IEEE Student Branch MACE",
      "url": "https://www.ieeemace.org/"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://dothack26.devfolio.co/",
      "price": "0",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "validFrom": "2026-07-01T00:00:00+05:30"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(eventData) }}
    />
  );
}
