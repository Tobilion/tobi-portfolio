import { writeFileSync, readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const domain = process.env.VERCEL_URL || process.env.SITE_URL || "tobiloba-jagun-portfolio.vercel.app";
const baseUrl = `https://${domain}`;

// ── sitemap.xml ───────────────────────────────────────────────────────────
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

writeFileSync(resolve(__dirname, "..", "dist", "sitemap.xml"), sitemap, "utf-8");

// ── robots.txt ────────────────────────────────────────────────────────────
const robots = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;

writeFileSync(resolve(__dirname, "..", "dist", "robots.txt"), robots, "utf-8");

console.log(`✓ Generated sitemap + robots.txt for ${baseUrl}`);
