"use client";

import Link from "next/link";
import { Search, Bookmark, Home, Code, LayoutGrid, TrendingUp, FileText, HelpCircle } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { SearchBar } from "@/components/search-bar";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/search", label: "APIs", icon: Code },
  { href: "/categories", label: "Categories", icon: LayoutGrid },
  { href: "/popular", label: "Popular", icon: TrendingUp },
  { href: "/blog", label: "Blog", icon: FileText },
  { href: "/faq", label: "FAQ", icon: HelpCircle },
  { href: "/bookmarks", label: "Bookmarks", icon: Bookmark },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="container mx-auto flex h-14 max-w-7xl items-center gap-6 px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg shrink-0">
          <span className="flex size-8 items-center justify-center rounded-lg bg-blue-600 text-white text-sm font-bold">
            F
          </span>
          <span className="text-gray-900 dark:text-white">FreeAPI Hub</span>
        </Link>

        <nav className="hidden md:flex items-center gap-0.5 text-sm">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800 transition-colors font-medium"
            >
              <item.icon className="size-3.5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden flex-1 sm:block max-w-sm ml-auto">
          <SearchBar />
        </div>

        <div className="flex items-center gap-1">
          <Link href="/search" className="sm:hidden p-2 text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
            <Search className="size-4" />
          </Link>
          <Link href="/bookmarks" className="sm:hidden p-2 text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
            <Bookmark className="size-4" />
          </Link>
          <a
            href="https://github.com/public-apis/public-apis"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
