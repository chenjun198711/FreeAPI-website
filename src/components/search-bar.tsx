"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function SearchBar({ className }: { className?: string }) {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem("q") as HTMLInputElement;
    if (input.value.trim()) {
      router.push(`/search?q=${encodeURIComponent(input.value.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          name="q"
          type="search"
          placeholder="Search APIs, categories..."
          className="flex h-9 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-4 text-sm ring-offset-background placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500 transition-all"
        />
      </div>
    </form>
  );
}
