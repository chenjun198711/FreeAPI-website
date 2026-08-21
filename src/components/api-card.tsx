"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { BadgeGroup } from "@/components/auth-badge";
import { BookmarkButton } from "@/components/bookmark-button";
import type { ApiEntry } from "@/types";

export function ApiCard({ api }: { api: ApiEntry }) {
  return (
    <div
      className={`group relative flex flex-col rounded-xl border bg-white p-5 transition-all duration-200 hover:shadow-md dark:bg-zinc-900
        ${api.sponsored ? "border-amber-300 bg-amber-50/50 dark:border-amber-500/20 dark:bg-amber-500/[0.03]" : "border-gray-200 dark:border-zinc-800"}`}
    >
      {api.sponsored && (
        <div className="absolute -top-2.5 right-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-0.5 text-[10px] font-semibold text-white shadow-sm">
            SPONSORED
          </span>
        </div>
      )}

      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-semibold text-base truncate">
          <Link href={`/api/${api.id}`} className="text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 transition-colors">
            {api.name}
          </Link>
        </h3>
        <BookmarkButton apiId={api.id} />
      </div>

      <p className="text-sm text-gray-500 dark:text-zinc-400 mb-3 line-clamp-2 flex-1 leading-relaxed">
        {api.description}
      </p>

      <BadgeGroup auth={api.auth} https={api.https} cors={api.cors} />

      <div className="mt-3 pt-3 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between">
        <Link href={`/category/${api.categorySlug}`} className="text-xs text-gray-400 hover:text-blue-600 dark:text-zinc-500 dark:hover:text-blue-400 transition-colors">
          {api.category}
        </Link>
        <a href={api.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-blue-600 dark:text-zinc-500 dark:hover:text-blue-400 transition-colors">
          Visit <ExternalLink className="size-3" />
        </a>
      </div>
    </div>
  );
}
