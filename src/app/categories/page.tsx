"use client";

import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { getAllCategories } from "@/lib/data-client";

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <div>
      {/* Header */}
      <section className="border-b border-gray-200 bg-gradient-to-b from-blue-50/40 to-white dark:border-zinc-800 dark:from-blue-950/15 dark:to-zinc-950">
        <div className="container mx-auto max-w-7xl px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">API Categories</h1>
          <p className="text-lg text-gray-500 dark:text-zinc-400 max-w-xl mx-auto">
            Browse {categories.length} categories of free public APIs. Find APIs by domain — from Animals to Weather.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:shadow-lg hover:border-blue-300 hover:-translate-y-0.5 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-500/30"
            >
              <span className="text-4xl transition-transform duration-200 group-hover:scale-110">
                {cat.icon}
              </span>
              <div className="text-center">
                <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                  {cat.name}
                </h3>
                <span className="inline-flex items-center gap-1 text-xs text-gray-400 dark:text-zinc-500">
                  {cat.count} APIs
                  <ArrowRight className="size-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Search */}
      <section className="border-t border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-950/50">
        <div className="container mx-auto max-w-7xl px-4 py-12 text-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Can&apos;t find what you need?
          </h2>
          <p className="text-gray-500 dark:text-zinc-400 mb-6">
            Search across all 1,400+ APIs by name, description, or use case.
          </p>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Search className="size-4" /> Search All APIs
          </Link>
        </div>
      </section>
    </div>
  );
}
