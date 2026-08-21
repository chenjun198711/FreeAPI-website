"use client";

import { ApiCard } from "@/components/api-card";
import { CategorySidebar } from "./sidebar";
import { getCategoryContent } from "@/lib/category-content";
import type { ApiEntry, Category } from "@/types";
import { Lightbulb, CheckCircle2 } from "lucide-react";

export function CategoryPageClient({ category, apis, slug }: { category: Category; apis: ApiEntry[]; slug: string }) {
  const sponsoredApis = apis.filter((api) => api.sponsored);
  const regularApis = apis.filter((api) => !api.sponsored);
  const content = getCategoryContent(category);

  // Calculate stats
  const noAuthCount = apis.filter((a) => a.auth === "No").length;
  const httpsCount = apis.filter((a) => a.https === "Yes").length;
  const corsCount = apis.filter((a) => a.cors === "Yes").length;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="flex gap-8">
        <aside className="hidden lg:block w-56 shrink-0">
          <CategorySidebar currentSlug={slug} />
        </aside>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <span>{category.icon}</span> {category.name}
            </h1>
            <p className="text-gray-500 dark:text-zinc-400 mt-2">{content.description}</p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            <div className="rounded-lg border border-gray-200 bg-white p-3 text-center dark:border-zinc-800 dark:bg-zinc-900">
              <div className="text-xl font-bold text-gray-900 dark:text-white">{apis.length}</div>
              <div className="text-xs text-gray-500 dark:text-zinc-400">Total APIs</div>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-3 text-center dark:border-zinc-800 dark:bg-zinc-900">
              <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{noAuthCount}</div>
              <div className="text-xs text-gray-500 dark:text-zinc-400">No Auth</div>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-3 text-center dark:border-zinc-800 dark:bg-zinc-900">
              <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{httpsCount}</div>
              <div className="text-xs text-gray-500 dark:text-zinc-400">HTTPS</div>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-3 text-center dark:border-zinc-800 dark:bg-zinc-900">
              <div className="text-xl font-bold text-purple-600 dark:text-purple-400">{corsCount}</div>
              <div className="text-xs text-gray-500 dark:text-zinc-400">CORS</div>
            </div>
          </div>

          {/* About This Category */}
          <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-6 mb-8 dark:border-zinc-800 dark:bg-zinc-900/50">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">About {category.name} APIs</h2>
            <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed mb-4">{content.longDescription}</p>

            <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white mb-2">
              <Lightbulb className="size-4 text-amber-500" />
              Common Use Cases
            </h3>
            <ul className="space-y-1.5 mb-4">
              {content.useCases.map((useCase, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-zinc-400">
                  <CheckCircle2 className="size-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>{useCase}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Popular Keywords</h3>
            <div className="flex flex-wrap gap-1.5">
              {content.popularFor.map((tag) => (
                <span key={tag} className="inline-flex items-center rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-xs text-gray-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {sponsoredApis.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-medium text-gray-500 dark:text-zinc-500 mb-3 flex items-center gap-1.5">
                <span className="inline-block size-1.5 rounded-full bg-amber-500" /> Sponsored
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {sponsoredApis.map((api) => <ApiCard key={api.id} api={api} />)}
              </div>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            {regularApis.map((api) => <ApiCard key={api.id} api={api} />)}
          </div>

          {regularApis.length === 0 && sponsoredApis.length === 0 && (
            <div className="text-center py-16 text-gray-400 dark:text-zinc-500">
              <p className="text-lg font-medium">No APIs in this category yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
