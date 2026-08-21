import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategoryBySlug, getApisByCategory, getAllCategories } from "@/lib/data";
import { getCategoryContent } from "@/lib/category-content";
import { CategoryPageClient } from "./client";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllCategories().map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Category Not Found" };
  const content = getCategoryContent(category);

  return {
    title: `${category.name} — ${category.count} Free Public APIs`,
    description: content.description,
    keywords: [`${category.name.toLowerCase()} APIs`, `free ${category.name.toLowerCase()} API`, `${category.name.toLowerCase()} API directory`, "public APIs", "developer tools"],
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const apis = getApisByCategory(slug);

  return (
    <CategoryPageClient
      category={category}
      apis={apis}
      slug={slug}
    />
  );
}
