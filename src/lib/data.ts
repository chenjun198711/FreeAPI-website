import { readFileSync } from "fs";
import { join } from "path";
import type { ApiEntry, Category } from "@/types";

let apisCache: ApiEntry[] | null = null;
let categoriesCache: Category[] | null = null;

export function getAllApis(): ApiEntry[] {
  if (!apisCache) {
    const data = readFileSync(join(process.cwd(), "data", "apis.json"), "utf-8");
    apisCache = JSON.parse(data);
  }
  return apisCache!;
}

export function getAllCategories(): Category[] {
  if (!categoriesCache) {
    const data = readFileSync(join(process.cwd(), "data", "categories.json"), "utf-8");
    categoriesCache = JSON.parse(data);
  }
  return categoriesCache!;
}

export function getApiById(id: string): ApiEntry | undefined {
  return getAllApis().find((api) => api.id === id);
}

export function getApisByCategory(slug: string): ApiEntry[] {
  return getAllApis().filter((api) => api.categorySlug === slug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return getAllCategories().find((cat) => cat.slug === slug);
}

export function searchApis(query: string): ApiEntry[] {
  const q = query.toLowerCase();
  return getAllApis().filter(
    (api) =>
      api.name.toLowerCase().includes(q) ||
      api.description.toLowerCase().includes(q) ||
      api.category.toLowerCase().includes(q) ||
      api.url.toLowerCase().includes(q)
  );
}

export function filterApis(
  apis: ApiEntry[],
  filters: { auth?: string[]; https?: string[]; cors?: string[] }
): ApiEntry[] {
  return apis.filter((api) => {
    if (filters.auth?.length && !filters.auth.includes(api.auth)) return false;
    if (filters.https?.length && !filters.https.includes(api.https)) return false;
    if (filters.cors?.length && !filters.cors.includes(api.cors)) return false;
    return true;
  });
}

export function getSponsoredApis(): ApiEntry[] {
  return getAllApis().filter((api) => api.sponsored);
}

export function getFeaturedApis(): ApiEntry[] {
  const all = getAllApis();
  return all
    .filter((api) => api.auth === "No" && api.https === "Yes" && api.cors === "Yes")
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, 12);
}
