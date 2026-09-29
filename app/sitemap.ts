import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://avolab.ca", changeFrequency: "monthly", priority: 1 },
    { url: "https://avolab.ca/privacy", changeFrequency: "yearly", priority: 0.3 },
    { url: "https://avolab.ca/terms", changeFrequency: "yearly", priority: 0.3 },
  ]
}
