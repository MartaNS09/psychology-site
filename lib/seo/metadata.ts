import type { Metadata } from "next";
import { siteConfig } from "./site-config";

export interface PageMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  imageAlt?: string;
}

const DEFAULT_OG_IMAGE = "/og-image.jpg";

function resolveCanonical(path = "/") {
  const base = siteConfig.url.replace(/\/$/, "");
  if (path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

function resolveOgTitle(title?: string) {
  return title ? `${title} | ${siteConfig.name}` : siteConfig.title;
}

export function createPageMetadata(options: PageMetadataOptions = {}): Metadata {
  const {
    title,
    description = siteConfig.description,
    path = "/",
    image = DEFAULT_OG_IMAGE,
    imageAlt,
  } = options;

  const canonical = resolveCanonical(path);
  const ogTitle = resolveOgTitle(title);
  const alt = imageAlt ?? title ?? siteConfig.name;
  const ogImage = { url: image, width: 1200, height: 630, alt };

  return {
    metadataBase: new URL(siteConfig.url),
    title: title ?? { default: siteConfig.title, template: `%s | ${siteConfig.name}` },
    description,
    keywords: [...siteConfig.keywords],
    authors: [{ name: siteConfig.psychologist.name }],
    creator: siteConfig.psychologist.name,
    publisher: siteConfig.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: canonical,
      siteName: siteConfig.name,
      title: ogTitle,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [image],
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
      canonical,
    },
    category: "health",
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: siteConfig.name,
    },
    icons: {
      icon: [{ url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
      apple: [{ url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
    },
  };
}

/** @deprecated Используйте createPageMetadata */
export const createSiteMetadata = createPageMetadata;

export async function generateRootMetadata(): Promise<Metadata> {
  return createPageMetadata({
    path: "/",
    image: DEFAULT_OG_IMAGE,
    imageAlt: `${siteConfig.psychologist.name} — психолог, терапия и обучение`,
  });
}
