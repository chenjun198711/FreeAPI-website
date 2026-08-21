"use client";

import Link from "next/link";
import { ArrowRight, Clock, Eye, Tag, TrendingUp, Calendar } from "lucide-react";
import { BLOG_POSTS, BLOG_CATEGORIES, TRENDING_POSTS, POPULAR_TAGS } from "@/lib/blog-data";

export default function BlogPage() {
  const featuredPosts = BLOG_POSTS.filter((p) => p.featured);
  const latestPosts = BLOG_POSTS.filter((p) => !p.featured);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b border-gray-200 bg-gradient-to-b from-blue-50/40 to-white dark:border-zinc-800 dark:from-blue-950/15 dark:to-zinc-950">
        <div className="container mx-auto max-w-7xl px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Blog</h1>
          <p className="text-lg text-gray-500 dark:text-zinc-400 max-w-xl mx-auto">
            Tutorials, guides, and insights on free APIs, AI tools, and developer resources.
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="flex gap-10">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Featured Posts */}
            <div className="grid gap-6 sm:grid-cols-2 mb-12">
              {featuredPosts.map((post) => {
                const href = post.internal ? `/blog/${post.slug}` : post.externalUrl;
                const isExternal = !post.internal;
                return (
                  <Link
                    key={post.slug}
                    href={href as string}
                    {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group block rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-lg hover:border-blue-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-500/30 transition-all"
                  >
                  <div className="p-6">
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 mb-3">
                      {post.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
                      {post.summary}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-zinc-500">
                      <span className="flex items-center gap-1"><Calendar className="size-3" />{post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="size-3" />{post.readTime}</span>
                      <span className="flex items-center gap-1"><Eye className="size-3" />{post.views.toLocaleString()}</span>
                    </div>
                  </div>
                </Link>
                );
              })}
            </div>

            {/* Latest Posts */}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              Latest Articles
            </h2>
            <div className="space-y-5">
              {latestPosts.map((post) => {
                const href = post.internal ? `/blog/${post.slug}` : post.externalUrl;
                const isExternal = !post.internal;
                return (
                <Link
                  key={post.slug}
                  href={href as string}
                  {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex flex-col sm:flex-row gap-5 rounded-xl border border-gray-200 bg-white p-5 hover:shadow-md hover:border-blue-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-500/30 transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-zinc-800 dark:text-zinc-400">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-zinc-400 line-clamp-2 mb-3 leading-relaxed">
                      {post.summary}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-zinc-500">
                      <span className="flex items-center gap-1"><Calendar className="size-3" />{post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="size-3" />{post.readTime}</span>
                      <span className="flex items-center gap-1"><Eye className="size-3" />{post.views.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center shrink-0">
                    <ArrowRight className="size-4 text-gray-300 dark:text-zinc-600 group-hover:text-blue-500 transition-colors" />
                  </div>
                </Link>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-20 space-y-8">
              {/* Categories */}
              <div>
                <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-3 flex items-center gap-1.5">
                  <Tag className="size-3.5" /> Categories
                </h3>
                <div className="space-y-1">
                  {BLOG_CATEGORIES.map((cat) => (
                    <a
                      key={cat.name}
                      href={`/blog?category=${encodeURIComponent(cat.name)}`}
                      className="flex items-center justify-between text-sm text-gray-500 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors py-1"
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs text-gray-300 dark:text-zinc-600">{cat.count}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Trending */}
              <div>
                <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-3 flex items-center gap-1.5">
                  <TrendingUp className="size-3.5" /> Trending
                </h3>
                <div className="space-y-3">
                  {TRENDING_POSTS.map((post, i) => {
                    const href = post.internal ? `/blog/${post.slug}` : post.externalUrl;
                    const isExternal = !post.internal;
                    return (
                    <a
                      key={post.slug}
                      href={href as string}
                      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="flex gap-3 group"
                    >
                      <span className="text-2xl font-bold text-gray-200 dark:text-zinc-700 leading-none shrink-0">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-zinc-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug line-clamp-2">
                          {post.title}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-zinc-500 mt-1">{post.date}</p>
                      </div>
                    </a>
                    );
                  })}
                </div>
              </div>

              {/* Popular Tags */}
              <div>
                <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-3 flex items-center gap-1.5">
                  <Tag className="size-3.5" /> Popular Tags
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_TAGS.map((tag) => (
                    <a
                      key={tag}
                      href={`/blog?tag=${encodeURIComponent(tag)}`}
                      className="inline-flex items-center rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-xs text-gray-500 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:text-blue-400 dark:hover:border-blue-500/30 transition-all"
                    >
                      {tag}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
