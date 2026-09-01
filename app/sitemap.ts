import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/site-config";
import { clientsServices } from "@/lib/content/clients";
import { educationPrograms } from "@/lib/content/education";
import { storiesData } from "@/lib/content/stories";
import { topicsData } from "@/lib/content/topics";

const staticRoutes = [
  "",
  "/about",
  "/clients",
  "/education",
  "/services",
  "/stories",
  "/topics",
  "/faq",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const { url } = siteConfig;
  const lastModified = new Date();

  const dynamicRoutes = [
    ...clientsServices.map((s) => `/clients/${s.slug}`),
    ...educationPrograms.map((p) => `/education/${p.slug}`),
    ...storiesData.map((s) => `/stories/${s.slug}`),
    ...topicsData.map((t) => `/topics/${t.slug}`),
  ];

  return [...staticRoutes, ...dynamicRoutes].map((path, index) => ({
    url: `${url}${path}`,
    lastModified,
    changeFrequency: path.includes("/topics") || path.includes("/stories") ? "weekly" as const : "monthly" as const,
    priority: path === "" ? 1 : path.split("/").length <= 2 ? 0.9 : 0.7,
  }));
}
