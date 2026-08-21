"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Bookmark } from "lucide-react";
import { useBookmarks } from "@/components/bookmark-provider";
import { getAllApis } from "@/lib/data-client";
import { ApiCard } from "@/components/api-card";

export default function BookmarksPage() {
  const { bookmarks } = useBookmarks();
  const allApis = useMemo(() => getAllApis(), []);
  const bookmarkedApis = useMemo(() => allApis.filter((api) => bookmarks.includes(api.id)), [allApis, bookmarks]);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white transition-colors mb-8">
        <ArrowLeft className="size-4" /> Back to Home
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
        <Bookmark className="size-7" /> Your Bookmarks {bookmarks.length > 0 && <span className="text-lg font-normal text-gray-400">({bookmarks.length})</span>}
      </h1>

      {bookmarkedApis.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{bookmarkedApis.map((api) => <ApiCard key={api.id} api={api} />)}</div>
      ) : (
        <div className="text-center py-16">
          <Bookmark className="size-12 text-gray-300 dark:text-zinc-700 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-400 dark:text-zinc-500">No bookmarks yet. Browse APIs and save your favorites!</p>
          <Link href="/search" className="inline-flex items-center gap-2 mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">Browse APIs</Link>
        </div>
      )}
    </div>
  );
}
