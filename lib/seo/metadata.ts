import type { Metadata } from "next";
import { siteConfig } from "./site-config";

export function createSiteMetadata(overrides?: Partial<Metadata>): Metadata {
  const { title, description, keywords, url, locale, name } = siteConfig;

  return {
    metadataBase: new URL(url),
    title: {
      default: title,
      template: `%s | ${name}`,
    },
    description,
    keywords: [...keywords],
    authors: [{ name: siteConfig.psychologist.name }],
    creator: siteConfig.psychologist.name,
    publisher: name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale,
      url,
      siteName: name,
      title,
      description,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${siteConfig.psychologist.name} — психолог, терапия и супервизия`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: url,
    },
    category: "health",
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: name,
    },
    icons: {
      icon: [{ url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
      apple: [{ url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
    },
    ...overrides,
  };
}

export async function generateRootMetadata(): Promise<Metadata> {
  return createSiteMetadata();
}
