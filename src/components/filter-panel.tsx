"use client";

import { X } from "lucide-react";

interface FilterPanelProps {
  filters: { auth: string[]; https: string[]; cors: string[] };
  onChange: (filters: { auth: string[]; https: string[]; cors: string[] }) => void;
}

const FILTER_GROUPS = [
  { label: "Auth", key: "auth" as const, options: [
    { value: "No", label: "No Auth" },
    { value: "apiKey", label: "API Key" },
    { value: "OAuth", label: "OAuth" },
  ]},
  { label: "HTTPS", key: "https" as const, options: [
    { value: "Yes", label: "HTTPS" },
    { value: "No", label: "No HTTPS" },
  ]},
  { label: "CORS", key: "cors" as const, options: [
    { value: "Yes", label: "CORS" },
    { value: "No", label: "No CORS" },
    { value: "Unknown", label: "Unknown" },
  ]},
];

export function FilterPanel({ filters, onChange }: FilterPanelProps) {
  const toggleFilter = (group: "auth" | "https" | "cors", value: string) => {
    const current = filters[group];
    const updated = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    onChange({ ...filters, [group]: updated });
  };

  const clearAll = () => onChange({ auth: [], https: [], cors: [] });
  const hasFilters = filters.auth.length > 0 || filters.https.length > 0 || filters.cors.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm text-gray-900 dark:text-white">Filters</h3>
        {hasFilters && (
          <button onClick={clearAll} className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
            <X className="size-3" /> Clear All
          </button>
        )}
      </div>
      {FILTER_GROUPS.map((group) => (
        <div key={group.key}>
          <h4 className="text-xs font-medium text-gray-500 dark:text-zinc-500 mb-2">{group.label}</h4>
          <div className="flex flex-wrap gap-1.5">
            {group.options.map((opt) => {
              const isActive = filters[group.key].includes(opt.value);
              return (
                <button
                  key={opt.value}
                  onClick={() => toggleFilter(group.key, opt.value)}
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-all duration-200 ${isActive ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400" : "border-gray-200 text-gray-600 hover:border-gray-300 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600"}`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
