import type { MetadataRoute } from "next";

const BASE_URL = "https://bluedotinvestors.com";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/_admin",
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
