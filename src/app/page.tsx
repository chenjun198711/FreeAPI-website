"use client";

import Link from "next/link";
import { ArrowRight, Zap, Search, Shield, Code, BookOpen, Heart, TrendingUp } from "lucide-react";
import { getAllCategories, getFeaturedApis } from "@/lib/data-client";
import { CategoryCard } from "@/components/category-card";
import { ApiCard } from "@/components/api-card";
import { SearchBar } from "@/components/search-bar";

const TAG_CHIPS = [
  { label: "REST API", query: "rest" },
  { label: "JSON", query: "json" },
  { label: "GraphQL", query: "graphql" },
  { label: "No Auth", query: "no auth" },
  { label: "Open Source", query: "open source" },
  { label: "AI & ML", query: "machine learning" },
  { label: "Free", query: "free" },
  { label: "Finance", query: "finance" },
];

const FEATURES = [
  {
    icon: Search,
    title: "Comprehensive Search",
    description: "Find APIs by name, description, category, or URL. Filter by authentication type, HTTPS support, and CORS compatibility to find the perfect API for your needs.",
  },
  {
    icon: Shield,
    title: "Quality Verified",
    description: "Every API listing includes verified metadata about authentication requirements, HTTPS support, and CORS compatibility. Know what you're getting before you integrate.",
  },
  {
    icon: Code,
    title: "Code Examples",
    description: "Each API detail page includes ready-to-use code examples in JavaScript and Python, plus integration guides to help you get started quickly.",
  },
  {
    icon: BookOpen,
    title: "Integration Guides",
    description: "Step-by-step integration guides for every API, covering authentication setup, security best practices, and implementation tips for production use.",
  },
  {
    icon: Heart,
    title: "100% Free",
    description: "All APIs in our directory are free to use. No hidden costs, no paywalls. Find the right API without worrying about subscription fees.",
  },
  {
    icon: TrendingUp,
    title: "Updated Regularly",
    description: "Our API directory is continuously updated with new APIs, updated listings, and fresh content. Stay current with the latest free APIs available.",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Search or Browse",
    description: "Use our search bar to find APIs by keyword, or browse by category to discover APIs in your domain of interest. Filter by auth type, HTTPS, and CORS to narrow down results.",
  },
  {
    number: "02",
    title: "Review API Details",
    description: "Each API listing includes a description, authentication requirements, HTTPS and CORS support, and a direct link to the official documentation. Check the integration guide for setup instructions.",
  },
  {
    number: "03",
    title: "View Code Examples",
    description: "Copy and paste our JavaScript and Python code examples to test the API quickly. Each example is tailored to the API's authentication method and includes proper error handling.",
  },
  {
    number: "04",
    title: "Integrate & Build",
    description: "Follow the integration guide to implement the API in your application. Use the FAQ section for common questions, and bookmark APIs for future reference as you build.",
  },
];

const HOME_FAQS = [
  {
    q: "What is a public API?",
    a: "A public API (Application Programming Interface) is a set of endpoints that allows developers to access data or services from a provider. Public APIs are open for anyone to use, often for free, and typically return data in JSON format."
  },
  {
    q: "How do I know if an API is safe to use?",
    a: "Check for HTTPS support (indicated by a green HTTPS badge), review the API's documentation and terms of service, and start with a test request before integrating. APIs with OAuth or API key authentication are generally more trustworthy than those with no auth."
  },
  {
    q: "Can I use free APIs in production?",
    a: "Yes, most free APIs can be used in production, but check each API's terms of service for usage limits, rate restrictions, and commercial use policies. Implement proper error handling and rate limiting in your application."
  },
  {
    q: "What's the difference between No Auth, API Key, and OAuth?",
    a: "No Auth means no authentication is required — just make requests directly. API Key requires you to register and include a key in your requests. OAuth is a more secure flow where users grant your app permission to access their data on another service."
  },
];

export default function HomePage() {
  const categories = getAllCategories();
  const featuredApis = getFeaturedApis();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-gray-200 dark:border-zinc-800 bg-gradient-to-b from-blue-50/60 via-white to-white dark:from-blue-950/20 dark:via-zinc-950 dark:to-zinc-900">
        <div className="container mx-auto max-w-7xl px-4 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm text-gray-500 mb-8 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
              <Zap className="size-3.5 text-amber-500 fill-amber-500" />
              Developer&apos;s Toolkit · Updated Daily
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
              Discover & Integrate
              <br />
              <span className="text-blue-600 dark:text-blue-400">Free Public APIs</span>
            </h1>

            <p className="text-lg text-gray-500 dark:text-zinc-400 mb-10 max-w-xl mx-auto leading-relaxed">
              Your ultimate destination for discovering free APIs. Browse 1,400+ public APIs across 50+ categories — all free, all ready to use.
            </p>

            <div className="mx-auto max-w-lg mb-6">
              <SearchBar className="w-full" />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              {TAG_CHIPS.map((chip) => (
                <Link
                  key={chip.query}
                  href={`/search?q=${encodeURIComponent(chip.query)}`}
                  className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-sm text-gray-600 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:text-blue-400 dark:hover:border-blue-500/30 transition-all"
                >
                  {chip.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
              <Link href="/search" className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm">
                Browse API Library <ArrowRight className="size-4" />
              </Link>
              <Link href="/categories" className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800 transition-colors">
                Explore Categories
              </Link>
            </div>

            <div className="flex items-center justify-center gap-8 sm:gap-12">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">1,400+</div>
                <div className="text-xs text-gray-500 dark:text-zinc-400 mt-1">APIs</div>
              </div>
              <div className="w-px h-8 bg-gray-200 dark:bg-zinc-700" />
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">50+</div>
                <div className="text-xs text-gray-500 dark:text-zinc-400 mt-1">Categories</div>
              </div>
              <div className="w-px h-8 bg-gray-200 dark:bg-zinc-700" />
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">100%</div>
                <div className="text-xs text-gray-500 dark:text-zinc-400 mt-1">Free</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="container mx-auto max-w-7xl px-4 py-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Browse by Category</h2>
            <p className="text-gray-500 dark:text-zinc-400 mt-1">Curated collections of high-quality free APIs</p>
          </div>
          <Link href="/search" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">
            View All <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
          {categories.slice(0, 24).map((cat) => (
            <CategoryCard key={cat.slug} category={cat} />
          ))}
        </div>
      </section>

      {/* Popular APIs */}
      <section className="border-t border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-950/50">
        <div className="container mx-auto max-w-7xl px-4 py-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Popular APIs</h2>
              <p className="text-gray-500 dark:text-zinc-400 mt-1">Handpicked APIs with no auth required, full HTTPS and CORS support</p>
            </div>
            <Link href="/popular" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">
              View Rankings <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredApis.slice(0, 6).map((api) => (
              <ApiCard key={api.id} api={api} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-gray-200 dark:border-zinc-800">
        <div className="container mx-auto max-w-7xl px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Why FreeAPI Hub?</h2>
            <p className="text-gray-500 dark:text-zinc-400">Everything you need to discover and integrate free public APIs</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="rounded-xl border border-gray-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 mb-4">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-950/50">
        <div className="container mx-auto max-w-7xl px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">How It Works</h2>
            <p className="text-gray-500 dark:text-zinc-400">Find and integrate APIs in four simple steps</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <div key={step.number} className="relative">
                <div className="text-4xl font-bold text-blue-100 dark:text-blue-500/20 mb-2">{step.number}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-gray-200 dark:border-zinc-800">
        <div className="container mx-auto max-w-3xl px-4 py-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Frequently Asked Questions</h2>
            <p className="text-gray-500 dark:text-zinc-400">Quick answers to common questions about free APIs</p>
          </div>
          <div className="space-y-3">
            {HOME_FAQS.map((faq, i) => (
              <details key={i} className="group rounded-lg border border-gray-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-900">
                <summary className="flex items-center justify-between cursor-pointer p-4 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                  {faq.q}
                  <ArrowRight className="size-4 text-gray-400 group-open:rotate-90 transition-transform shrink-0" />
                </summary>
                <div className="px-4 pb-4 text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/faq" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
              View All FAQs <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-gray-200 dark:border-zinc-800">
        <div className="container mx-auto max-w-7xl px-4 py-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to Build Something Amazing?</h2>
          <p className="text-gray-500 dark:text-zinc-400 mb-8 max-w-lg mx-auto">
            Thousands of free APIs at your fingertips. Start browsing, find inspiration, and build your next project today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/search" className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm">
              Browse APIs <ArrowRight className="size-4" />
            </Link>
            <a href="https://github.com/public-apis/public-apis" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800 transition-colors">
              View on GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
