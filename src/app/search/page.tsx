"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getAllApis, filterApis, searchApis as searchData } from "@/lib/data-client";
import { ApiCard } from "@/components/api-card";
import { FilterPanel } from "@/components/filter-panel";
import type { ApiEntry } from "@/types";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialAuth = searchParams.get("auth")?.split(",").filter(Boolean) || [];
  const initialHttps = searchParams.get("https")?.split(",").filter(Boolean) || [];
  const initialCors = searchParams.get("cors")?.split(",").filter(Boolean) || [];

  const allApis = useMemo(() => getAllApis(), []);
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<{ auth: string[]; https: string[]; cors: string[] }>({
    auth: initialAuth,
    https: initialHttps,
    cors: initialCors,
  });

  const results = useMemo(() => {
    let filtered: ApiEntry[];
    if (query.trim()) { filtered = searchData(query.trim()); } else { filtered = allApis; }
    filtered = filterApis(filtered, filters);
    const sponsored = filtered.filter((a) => a.sponsored);
    const regular = filtered.filter((a) => !a.sponsored);
    return [...sponsored, ...regular];
  }, [query, filters, allApis]);

  const sponsoredResults = results.filter((r) => r.sponsored);
  const regularResults = results.filter((r) => !r.sponsored);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="flex gap-8">
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-20"><FilterPanel filters={filters} onChange={setFilters} /></div>
        </aside>
        <div className="flex-1 min-w-0">
          <div className="mb-6">
            <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white transition-colors mb-4">
              <ArrowLeft className="size-4" /> Back to Home
            </Link>
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name, description, category, URL..." className="flex h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500 transition-all" autoFocus />
            <p className="text-sm text-gray-500 dark:text-zinc-400 mt-2">
              {query.trim() ? `Found ${results.length} results` : `Total ${allApis.length} free APIs. Use search and filters to find what you need.`}
            </p>
          </div>

          <div className="lg:hidden mb-6"><FilterPanel filters={filters} onChange={setFilters} /></div>

          {sponsoredResults.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-medium text-gray-500 dark:text-zinc-500 mb-3 flex items-center gap-1.5">
                <span className="inline-block size-1.5 rounded-full bg-amber-500" /> Sponsored
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">{sponsoredResults.map((api) => <ApiCard key={api.id} api={api} />)}</div>
            </div>
          )}

          {regularResults.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">{regularResults.map((api) => <ApiCard key={api.id} api={api} />)}</div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg font-medium text-gray-400 dark:text-zinc-500">No matching APIs found</p>
              <p className="text-sm text-gray-400 dark:text-zinc-500 mt-1">{query.trim() ? "Try different keywords or adjust filters" : "Try adjusting your filter criteria"}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container mx-auto max-w-7xl px-4 py-16 text-center text-gray-400">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
