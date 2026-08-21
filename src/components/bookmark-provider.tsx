"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

interface BookmarkContextType {
  bookmarks: string[];
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  removeBookmark: (id: string) => void;
}

const BookmarkContext = createContext<BookmarkContextType>({
  bookmarks: [],
  toggleBookmark: () => {},
  isBookmarked: () => false,
  removeBookmark: () => {},
});

export function useBookmarks() {
  return useContext(BookmarkContext);
}

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("bookmarks");
      if (stored) setBookmarks(JSON.parse(stored));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
  }, [bookmarks, loaded]);

  const toggleBookmark = useCallback((id: string) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  }, []);

  const isBookmarked = useCallback(
    (id: string) => bookmarks.includes(id),
    [bookmarks]
  );

  const removeBookmark = useCallback((id: string) => {
    setBookmarks((prev) => prev.filter((b) => b !== id));
  }, []);

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked, removeBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
}
