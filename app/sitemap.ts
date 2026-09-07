import type { MetadataRoute } from "next";
import { NAV_ITEMS, SITE_CONFIG } from "./lib/constants";

/**
 * ページを追加したら、ここにも必ず追記すること。
 * ナビに載るページは NAV_ITEMS から自動生成される。
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_CONFIG.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...NAV_ITEMS.map((item) => ({
      url: `${SITE_CONFIG.url}${item.href}`,
      lastModified,
      changeFrequency: "monthly" as const,
      // 料金ページは検索流入の受け皿として優先度を高くする
      priority: item.href === "/price" ? 0.9 : 0.8,
    })),
    {
      url: `${SITE_CONFIG.url}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
