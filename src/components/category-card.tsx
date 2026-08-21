import Link from "next/link";
import type { Category } from "@/types";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:border-blue-300 hover:shadow-md hover:bg-blue-50/50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-500/30 dark:hover:bg-blue-500/5"
    >
      <span className="text-2xl transition-transform duration-200 group-hover:scale-110">
        {category.icon}
      </span>
      <span className="font-medium text-xs text-center text-gray-700 dark:text-zinc-300">
        {category.name}
      </span>
      <span className="text-[11px] text-gray-400 dark:text-zinc-500">
        {category.count} APIs
      </span>
    </Link>
  );
}
