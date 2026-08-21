import fs from "fs";
import path from "path";

interface ApiEntry {
  id: string;
  name: string;
  description: string;
  auth: "No" | "apiKey" | "OAuth";
  https: "Yes" | "No";
  cors: "Yes" | "No" | "Unknown";
  url: string;
  category: string;
  categorySlug: string;
  sponsored: boolean;
}

interface Category {
  slug: string;
  name: string;
  icon: string;
  count: number;
}

const CATEGORY_ICONS: Record<string, string> = {
  animals: "🐾",
  anime: "🎌",
  "anti-malware": "🛡️",
  "art-design": "🎨",
  "art--design": "🎨",
  "authentication-authorization": "🔐",
  "authentication--authorization": "🔐",
  blockchain: "⛓️",
  books: "📚",
  business: "💼",
  calendar: "📅",
  "cloud-storage-file-sharing": "☁️",
  "cloud-storage--file-sharing": "☁️",
  "continuous-integration": "🔄",
  cryptocurrency: "🪙",
  "currency-exchange": "💱",
  "data-validation": "✅",
  development: "💻",
  dictionaries: "📖",
  "documents-productivity": "📄",
  "documents--productivity": "📄",
  email: "📧",
  entertainment: "🎬",
  environment: "🌿",
  events: "📆",
  finance: "💰",
  "food-drink": "🍔",
  "food--drink": "🍔",
  "games-comics": "🎮",
  "games--comics": "🎮",
  geocoding: "📍",
  government: "🏛️",
  health: "🏥",
  jobs: "💼",
  "machine-learning": "🤖",
  music: "🎵",
  news: "📰",
  "open-data": "📂",
  "open-source-projects": "🌟",
  patent: "📜",
  personality: "🧠",
  phone: "📱",
  photography: "📷",
  programming: "👨‍💻",
  "science-math": "🔬",
  "science--math": "🔬",
  security: "🔒",
  shopping: "🛒",
  social: "💬",
  "sports-fitness": "⚽",
  "sports--fitness": "⚽",
  "test-data": "🧪",
  "text-analysis": "📝",
  tracking: "📦",
  transportation: "🚌",
  "url-shorteners": "🔗",
  vehicle: "🚗",
  video: "🎥",
  weather: "🌤️",
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function extractApiLink(cell: string): { name: string; url: string } | null {
  const match = cell.match(/\[([^\]]+)\]\(([^)]+)\)/);
  if (!match) return null;
  return { name: match[1].trim(), url: match[2].trim() };
}

function cleanAuth(cell: string): "No" | "apiKey" | "OAuth" {
  const raw = cell.trim().replace(/`/g, "");
  if (raw === "No" || raw === "") return "No";
  if (raw.toLowerCase().includes("apikey")) return "apiKey";
  if (raw.toLowerCase().includes("oauth")) return "OAuth";
  return "No";
}

function cleanHttps(cell: string): "Yes" | "No" {
  return cell.trim() === "Yes" ? "Yes" : "No";
}

function cleanCors(cell: string): "Yes" | "No" | "Unknown" {
  const raw = cell.trim();
  if (raw === "Yes") return "Yes";
  if (raw === "No") return "No";
  return "Unknown";
}

function parseReadme(): { apis: ApiEntry[]; categories: Category[] } {
  const content = fs.readFileSync(path.join(__dirname, "README.md"), "utf-8");

  // Extract index section to get category names and their section anchors
  const indexMatch = content.match(/## Index([\s\S]*?)<br\s*\/?>/i);
  if (!indexMatch) throw new Error("Could not find Index section");

  const indexLinks = indexMatch[1].matchAll(/\[([^\]]+)\]\(#([^)]+)\)/g);
  const categoryList: { name: string; anchor: string }[] = [];
  for (const match of indexLinks) {
    categoryList.push({
      name: match[1].trim(),
      anchor: match[2].trim(),
    });
  }

  // Split content into sections by ### headings
  // Each category section starts with "### CategoryName"
  const sections = content.split(/\n(?=### )/);

  const apis: ApiEntry[] = [];
  const seen = new Set<string>();

  for (const cat of categoryList) {
    // Find the section that matches this category
    const section = sections.find((s) =>
      s.startsWith(`### ${cat.name}`)
    );

    if (!section) {
      console.warn(`Could not find section for: ${cat.name}`);
      continue;
    }

    // Find the table within the section
    const lines = section.split(/\r?\n/);
    let inTable = false;

    for (const line of lines) {
      // Detect table start
      if (line.includes("API | Description | Auth | HTTPS | CORS")) {
        inTable = true;
        continue;
      }
      // Skip separator line
      if (inTable && line.includes("|:---")) {
        continue;
      }
      // Stop at back-to-index link or empty line after table
      if (inTable && (line.includes("**[⬆") || line.includes("<br"))) {
        break;
      }
      // Parse table row
      if (inTable && line.startsWith("|") && line.includes("|", 1)) {
        const cells = line
          .split("|")
          .map((c) => c.trim())
          .filter((c) => c !== "");

        if (cells.length < 5) continue;

        const [nameCell, descCell, authCell, httpsCell, corsCell] = cells;
        const linkData = extractApiLink(nameCell);
        if (!linkData) continue;

        let baseSlug = slugify(linkData.name);
        let id = baseSlug + "-" + cat.anchor;
        let counter = 1;
        while (seen.has(id)) {
          counter++;
          id = baseSlug + "-" + counter + "-" + cat.anchor;
        }
        seen.add(id);

        apis.push({
          id,
          name: linkData.name,
          description: descCell.replace(/^"|"$/g, ""),
          auth: cleanAuth(authCell),
          https: cleanHttps(httpsCell),
          cors: cleanCors(corsCell),
          url: linkData.url,
          category: cat.name,
          categorySlug: cat.anchor,
          sponsored: false,
        });
      }
    }
  }

  const categories: Category[] = categoryList.map((cat) => {
    const count = apis.filter((a) => a.categorySlug === cat.anchor).length;
    return {
      slug: cat.anchor,
      name: cat.name,
      icon: CATEGORY_ICONS[cat.anchor] || "📡",
      count,
    };
  });

  return { apis, categories };
}

const { apis, categories } = parseReadme();

console.log(`Parsed ${apis.length} APIs across ${categories.length} categories`);

const dataDir = path.join(__dirname, "..", "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

fs.writeFileSync(path.join(dataDir, "apis.json"), JSON.stringify(apis, null, 2));
fs.writeFileSync(path.join(dataDir, "categories.json"), JSON.stringify(categories, null, 2));

console.log("Data files written!");
