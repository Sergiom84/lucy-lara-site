import { Helmet } from 'react-helmet';

interface BusinessStructuredDataProps {
  className?: string;
}

const BusinessStructuredData: React.FC<BusinessStructuredDataProps> = () => {
  const businessData = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": "Centro de Estética Lucy Lara",
    "image": [
      "https://centroesteticalucylara.com/logo-figura.webp",
      "https://centroesteticalucylara.com/nuevo-logo.webp"
    ],
    "description": "Centro de estética especializado en tratamientos faciales, micropigmentación y cuidado de la piel en Madrid. Tratamientos personalizados con tecnología avanzada.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "C. de la Alegría de la Huerta, 22",
      "addressLocality": "Madrid",
      "addressRegion": "Madrid",
      "postalCode": "28041",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 40.3851,
      "longitude": -3.7038
    },
    "telephone": ["+34915052067", "+34684203633"],
    "email": "centrodebelleza@centroesteticalucylara.es",
    "url": "https://centroesteticalucylara.com",
    "sameAs": [
      "https://www.facebook.com/CBLUCYLARA/",
      "https://www.instagram.com/esteticalucylara/"
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "10:00",
        "closes": "13:30"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "16:00",
        "closes": "19:30"
      }
    ],
    "priceRange": "€€",
    "paymentAccepted": ["Cash", "Credit Card"],
    "currenciesAccepted": "EUR",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Estética",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Higiene Facial Suprema",
            "description": "Tratamiento facial completo con limpieza profunda, exfoliación y hidratación"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Ice Skin Crioterapia Facial",
            "description": "Tratamiento facial con crioterapia para rejuvenecer y tonificar la piel"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Micropigmentación de Cejas",
            "description": "Técnica de micropigmentación para definir y realzar las cejas"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Micropigmentación de Labios",
            "description": "Micropigmentación labial para definir y dar color natural"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    }
  };

  const serviceData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Servicios de Centro de Estética Lucy Lara",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Service",
          "@id": "https://centroesteticalucylara.com/tratamientos-faciales#higiene-facial-suprema",
          "name": "Higiene Facial Suprema",
          "description": "Tratamiento facial completo que incluye limpieza profunda, exfoliación, extracción de impurezas y mascarilla hidratante personalizada según tipo de piel.",
          "provider": {
            "@type": "BeautySalon",
            "name": "Centro de Estética Lucy Lara"
          },
          "serviceType": "Beauty Treatment",
          "category": "Facial Treatment"
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Service",
          "@id": "https://centroesteticalucylara.com/tratamientos-faciales#ice-skin-crioterapia",
          "name": "Ice Skin Crioterapia Facial",
          "description": "Innovador tratamiento facial con tecnología de crioterapia que ayuda a rejuvenecer, tonificar y mejorar la textura de la piel.",
          "provider": {
            "@type": "BeautySalon",
            "name": "Centro de Estética Lucy Lara"
          },
          "serviceType": "Beauty Treatment",
          "category": "Advanced Facial Treatment"
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "Service",
          "@id": "https://centroesteticalucylara.com/micropigmentacion#cejas",
          "name": "Micropigmentación de Cejas",
          "description": "Técnica de micropigmentación semi-permanente para definir, rellenar y dar forma perfecta a las cejas de manera natural.",
          "provider": {
            "@type": "BeautySalon",
            "name": "Centro de Estética Lucy Lara"
          },
          "serviceType": "Beauty Treatment",
          "category": "Micropigmentation"
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "Service",
          "@id": "https://centroesteticalucylara.com/micropigmentacion#labios",
          "name": "Micropigmentación de Labios",
          "description": "Micropigmentación labial que define el contorno y aporta color natural duradero a los labios.",
          "provider": {
            "@type": "BeautySalon",
            "name": "Centro de Estética Lucy Lara"
          },
          "serviceType": "Beauty Treatment",
          "category": "Micropigmentation"
        }
      }
    ]
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": "https://centroesteticalucylara.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Tratamientos Faciales",
        "item": "https://centroesteticalucylara.com/tratamientos-faciales"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Micropigmentación",
        "item": "https://centroesteticalucylara.com/micropigmentacion"
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(businessData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(serviceData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbData)}
      </script>
    </Helmet>
  );
};

export default BusinessStructuredData;