import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getApiById, getApisByCategory, getAllApis } from "@/lib/data";
import { ApiDetailClient } from "./client";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return getAllApis().map((api) => ({ id: api.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const api = getApiById(id);
  if (!api) return { title: "API Not Found" };

  const authLabel = api.auth === "No" ? "no authentication required" : `${api.auth} authentication`;
  const description = `${api.name} — ${api.description}. Free ${api.category} API with ${authLabel}, HTTPS ${api.https === "Yes" ? "supported" : "not supported"}, CORS ${api.cors}. View integration guide, code examples, and use cases.`;

  return {
    title: `${api.name} — Free ${api.category} API | Integration Guide`,
    description,
    keywords: [api.name, `${api.name} API`, `free ${api.category.toLowerCase()} API`, `${api.name} tutorial`, `${api.name} integration`, api.category.toLowerCase()],
    openGraph: {
      title: `${api.name} — Free Public API`,
      description: api.description,
      type: "article",
    },
  };
}

export default async function ApiDetailPage({ params }: Props) {
  const { id } = await params;
  const api = getApiById(id);
  if (!api) notFound();

  const relatedApis = getApisByCategory(api.categorySlug)
    .filter((a) => a.id !== api.id)
    .slice(0, 3);

  return <ApiDetailClient api={api} relatedApis={relatedApis} />;
}
