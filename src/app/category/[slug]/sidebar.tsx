"use client";

import Link from "next/link";
import { getAllCategories } from "@/lib/data-client";

export function CategorySidebar({ currentSlug }: { currentSlug: string }) {
  const categories = getAllCategories();

  return (
    <div className="sticky top-20">
      <h3 className="font-semibold text-sm text-gray-500 dark:text-zinc-500 mb-3">All Categories</h3>
      <nav className="space-y-0.5 max-h-[calc(100vh-12rem)] overflow-y-auto">
        {categories.map((cat) => {
          const isActive = cat.slug === currentSlug;
          return (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-700 font-medium dark:bg-blue-500/10 dark:text-blue-400"
                  : "text-gray-600 hover:bg-gray-100 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
              }`}
            >
              <span className="text-base">{cat.icon}</span>
              <span className="flex-1 truncate">{cat.name}</span>
              <span className="text-xs text-gray-400 dark:text-zinc-600 tabular-nums">{cat.count}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
