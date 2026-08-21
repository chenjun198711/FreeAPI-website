"use client";

import { Bookmark } from "lucide-react";
import { useBookmarks } from "@/components/bookmark-provider";

export function BookmarkButton({ apiId }: { apiId: string }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const active = isBookmarked(apiId);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleBookmark(apiId);
      }}
      className={`inline-flex items-center justify-center size-7 rounded-md transition-all duration-200
        ${active
          ? "text-amber-500 bg-amber-500/10"
          : "text-muted-foreground/40 hover:text-amber-500 hover:bg-amber-500/10"
        }`}
      aria-label={active ? "Remove bookmark" : "Add bookmark"}
    >
      <Bookmark className={`size-3.5 transition-all ${active ? "fill-amber-500" : ""}`} />
    </button>
  );
}
