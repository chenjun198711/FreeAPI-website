import type { ApiEntry, Category } from "@/types";
import apisData from "../../data/apis.json";
import categoriesData from "../../data/categories.json";

const apis = apisData as ApiEntry[];
const categories = categoriesData as Category[];

export function getAllApis(): ApiEntry[] {
  return apis;
}

export function getAllCategories(): Category[] {
  return categories;
}

export function getApiById(id: string): ApiEntry | undefined {
  return apis.find((api) => api.id === id);
}

export function getApisByCategory(slug: string): ApiEntry[] {
  return apis.filter((api) => api.categorySlug === slug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((cat) => cat.slug === slug);
}

export function searchApis(query: string): ApiEntry[] {
  const q = query.toLowerCase();
  return apis.filter(
    (api) =>
      api.name.toLowerCase().includes(q) ||
      api.description.toLowerCase().includes(q) ||
      api.category.toLowerCase().includes(q) ||
      api.url.toLowerCase().includes(q)
  );
}

export function getSponsoredApis(): ApiEntry[] {
  return apis.filter((api) => api.sponsored);
}

export function getFeaturedApis(): ApiEntry[] {
  return apis
    .filter((api) => api.auth === "No" && api.https === "Yes" && api.cors === "Yes")
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, 12);
}

export function filterApis(
  apisList: ApiEntry[],
  filters: { auth?: string[]; https?: string[]; cors?: string[] }
): ApiEntry[] {
  return apisList.filter((api) => {
    if (filters.auth?.length && !filters.auth.includes(api.auth)) return false;
    if (filters.https?.length && !filters.https.includes(api.https)) return false;
    if (filters.cors?.length && !filters.cors.includes(api.cors)) return false;
    return true;
  });
}
