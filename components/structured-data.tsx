import { profile } from "@/lib/content";
import {
  profileImage,
  sameAsLinks,
  siteDescription,
  siteName,
  siteUrl,
} from "@/lib/seo";

export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: profile.name,
        alternateName: profile.shortName,
        url: siteUrl,
        image: `${siteUrl}${profileImage}`,
        jobTitle: profile.role,
        email: profile.email,
        address: {
          "@type": "PostalAddress",
          addressCountry: "PH",
        },
        sameAs: sameAsLinks,
        knowsAbout: [
          "Next.js",
          "React",
          "TypeScript",
          "Python",
          "Zoho",
          "APIs",
          "Automation tools",
          "Dashboard development",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        description: siteDescription,
        publisher: {
          "@id": `${siteUrl}/#person`,
        },
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: siteUrl,
        name: `${siteName} / Developer Portfolio`,
        description: siteDescription,
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        about: {
          "@id": `${siteUrl}/#person`,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${siteUrl}${profileImage}`,
          width: 1024,
          height: 1024,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
