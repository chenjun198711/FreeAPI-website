export interface ApiEntry {
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

export interface Category {
  slug: string;
  name: string;
  icon: string;
  count: number;
}

export type FilterParams = {
  auth: string[];
  https: string[];
  cors: string[];
};

export const AUTH_OPTIONS = [
  { value: "No", label: "No Auth", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  { value: "apiKey", label: "API Key", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  { value: "OAuth", label: "OAuth", color: "bg-rose-500/20 text-rose-400 border-rose-500/30" },
] as const;

export const HTTPS_OPTIONS = [
  { value: "Yes", label: "HTTPS", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  { value: "No", label: "No HTTPS", color: "bg-rose-500/20 text-rose-400 border-rose-500/30" },
] as const;

export const CORS_OPTIONS = [
  { value: "Yes", label: "CORS Yes", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  { value: "No", label: "CORS No", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  { value: "Unknown", label: "CORS ?", color: "bg-slate-500/20 text-slate-400 border-slate-500/30" },
] as const;
