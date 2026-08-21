import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { getArticleBySlug, getAllArticleSlugs, BLOG_ARTICLES, type ArticleBlock } from "@/lib/blog-articles";

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    keywords: article.tags,
    alternates: {
      canonical: `https://freeapihub.cc/blog/${article.slug}`,
    },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      publishedTime: article.date,
      authors: [article.author],
      tags: article.tags,
    },
  };
}

function ArticleContent({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <h2 key={i} className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
                {block.content}
              </h2>
            );
          case "paragraph":
            return (
              <p key={i} className="text-gray-700 dark:text-zinc-300 leading-relaxed text-[15px]">
                {block.content}
              </p>
            );
          case "code":
            return (
              <div key={i} className="relative rounded-lg bg-gray-900 dark:bg-zinc-950 border border-gray-800 dark:border-zinc-800 overflow-hidden">
                {block.language && (
                  <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-800 dark:border-zinc-800 bg-gray-900/50 dark:bg-zinc-900/50">
                    <span className="text-xs font-mono text-gray-400">{block.language}</span>
                  </div>
                )}
                <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
                  <code className="text-gray-100 dark:text-zinc-200 font-mono">{block.content}</code>
                </pre>
              </div>
            );
          case "list":
            return (
              <ul key={i} className="space-y-2">
                {block.items?.map((item, j) => (
                  <li key={j} className="flex gap-3 text-gray-700 dark:text-zinc-300 leading-relaxed text-[15px]">
                    <span className="text-blue-600 dark:text-blue-400 shrink-0 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <blockquote key={i} className="border-l-4 border-blue-500 pl-4 py-2 italic text-gray-700 dark:text-zinc-300">
                {block.content}
              </blockquote>
            );
          case "callout":
            return (
              <div key={i} className="rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-500/20 dark:bg-blue-500/5 p-4">
                {block.title && (
                  <p className="font-semibold text-blue-900 dark:text-blue-300 text-sm mb-1">{block.title}</p>
                )}
                <p className="text-blue-800 dark:text-blue-200/80 text-sm leading-relaxed">{block.content}</p>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const relatedArticles = BLOG_ARTICLES.filter(
    (a) => a.slug !== slug && a.category === article.category
  ).slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Organization",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "FreeAPI Hub",
      url: "https://freeapihub.cc",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://freeapihub.cc/blog/${article.slug}`,
    },
    keywords: article.tags.join(", "),
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Header */}
      <section className="border-b border-gray-200 bg-gradient-to-b from-blue-50/40 to-white dark:border-zinc-800 dark:from-blue-950/15 dark:to-zinc-950">
        <div className="container mx-auto max-w-3xl px-4 py-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors mb-6"
          >
            <ArrowLeft className="size-4" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
              {article.category}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            {article.title}
          </h1>
          <p className="text-lg text-gray-500 dark:text-zinc-400 mb-6 leading-relaxed">
            {article.description}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-400 dark:text-zinc-500">
            <span className="flex items-center gap-1">
              <Calendar className="size-3.5" />
              {article.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" />
              {article.readTime}
            </span>
            <span className="flex items-center gap-1">
              <Tag className="size-3.5" />
              {article.author}
            </span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="container mx-auto max-w-3xl px-4 py-12">
        <ArticleContent blocks={article.content} />

        {/* Tags */}
        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-zinc-800">
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-xs text-gray-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="border-t border-gray-200 dark:border-zinc-800">
          <div className="container mx-auto max-w-3xl px-4 py-12">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Related Articles
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="group block rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md hover:border-blue-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-500/30 transition-all"
                >
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-zinc-800 dark:text-zinc-400 mb-2">
                    {rel.category}
                  </span>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                    {rel.title}
                  </h3>
                  <p className="text-xs text-gray-400 dark:text-zinc-500 mt-1">
                    {rel.readTime} · {rel.date}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
