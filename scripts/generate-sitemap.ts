import fs from "fs";
import path from "path";

const BASE_URL = "https://freeapihub.cc";

interface ApiEntry {
  id: string;
  categorySlug: string;
}

interface Category {
  slug: string;
}

const apis: ApiEntry[] = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "data", "apis.json"), "utf-8")
);

const categories: Category[] = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "data", "categories.json"), "utf-8")
);

// Blog article slugs (kept in sync with src/lib/blog-articles.ts)
const BLOG_ARTICLE_SLUGS = [
  "how-to-choose-the-right-api",
  "rest-api-authentication-explained",
  "api-rate-limiting-best-practices",
  "build-weather-app-free-api-tutorial",
  "free-vs-paid-apis-guide",
];

const staticPages = [
  { url: "/", changefreq: "daily", priority: "1.0" },
  { url: "/search", changefreq: "daily", priority: "0.9" },
  { url: "/categories", changefreq: "weekly", priority: "0.9" },
  { url: "/popular", changefreq: "weekly", priority: "0.9" },
  { url: "/blog", changefreq: "weekly", priority: "0.8" },
  { url: "/faq", changefreq: "monthly", priority: "0.7" },
  { url: "/about", changefreq: "monthly", priority: "0.5" },
  { url: "/contact", changefreq: "monthly", priority: "0.5" },
  { url: "/privacy", changefreq: "monthly", priority: "0.3" },
  { url: "/terms", changefreq: "monthly", priority: "0.3" },
  { url: "/bookmarks", changefreq: "monthly", priority: "0.3" },
];

function generateSitemap() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Static pages
  for (const page of staticPages) {
    xml += "  <url>\n";
    xml += `    <loc>${BASE_URL}${page.url}</loc>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += "  </url>\n";
  }

  // Category pages
  for (const cat of categories) {
    xml += "  <url>\n";
    xml += `    <loc>${BASE_URL}/category/${cat.slug}</loc>\n`;
    xml += "    <changefreq>weekly</changefreq>\n";
    xml += "    <priority>0.8</priority>\n";
    xml += "  </url>\n";
  }

  // API detail pages
  for (const api of apis) {
    xml += "  <url>\n";
    xml += `    <loc>${BASE_URL}/api/${api.id}</loc>\n`;
    xml += "    <changefreq>monthly</changefreq>\n";
    xml += "    <priority>0.7</priority>\n";
    xml += "  </url>\n";
  }

  // Blog article pages
  for (const slug of BLOG_ARTICLE_SLUGS) {
    xml += "  <url>\n";
    xml += `    <loc>${BASE_URL}/blog/${slug}</loc>\n`;
    xml += "    <changefreq>monthly</changefreq>\n";
    xml += "    <priority>0.8</priority>\n";
    xml += "  </url>\n";
  }

  xml += "</urlset>";

  const outDir = path.join(__dirname, "..", "out");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "sitemap.xml"), xml);
  console.log(`Sitemap generated: ${apis.length + categories.length + staticPages.length + BLOG_ARTICLE_SLUGS.length} URLs`);
}

generateSitemap();
