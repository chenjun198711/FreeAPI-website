import type { Metadata } from "next";
import Link from "next/link";
import { Database, Search, Shield, Code, Users, RefreshCw, MapPin, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "About FreeAPI Hub",
  description: "Learn about FreeAPI Hub - the most comprehensive curated directory of free public APIs. Discover our mission, how we curate APIs, and how we help developers build better applications.",
  keywords: ["about freeapi hub", "API directory", "free APIs", "API discovery", "developer tools"],
};

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">About FreeAPI Hub</h1>
      <p className="text-lg text-gray-600 dark:text-zinc-300 leading-relaxed mb-12">
        FreeAPI Hub is the most comprehensive curated directory of free public APIs on the web. We help developers discover, compare, and integrate public APIs into their projects - making API discovery fast, intuitive, and free for everyone.
      </p>

      {/* Operator & Transparency */}
      <section className="mb-12 rounded-xl border border-gray-200 bg-gray-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Who Operates FreeAPI Hub</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <Users className="size-5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white">Operator</h3>
              <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed mt-1">
                FreeAPI Hub is an independent developer project maintained by the FreeAPI Hub team. We are not affiliated with the public-apis GitHub repository.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="size-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white">Operating Region</h3>
              <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed mt-1">
                Operated remotely. For legal, partnership, or identity-verification purposes, the full legal name and registered address of the operator are available on request to legal@freeapihub.cc.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="size-5 text-purple-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white">Contact</h3>
              <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed mt-1">
                General: support@freeapihub.cc<br />
                Legal: legal@freeapihub.cc<br />
                Sponsorship: sponsor@freeapihub.cc
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Shield className="size-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white">Verification</h3>
              <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed mt-1">
                We respond to identity-verification requests from authorized parties (e.g. Google AdSense, legal counsel, law enforcement) within 7 business days. We never request sensitive personal data from our users.
              </p>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500 dark:text-zinc-500 mt-4">Last Updated: July 2026</p>
      </section>

      {/* Mission */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
        <div className="prose dark:prose-invert max-w-none space-y-4">
          <p className="text-gray-600 dark:text-zinc-400 leading-relaxed">
            We believe great APIs should be easy to find. The API ecosystem is vast and growing every day, but discovering the right API for your project can be overwhelming. Developers often spend hours searching through scattered documentation, outdated repositories, and incomplete directories.
          </p>
          <p className="text-gray-600 dark:text-zinc-400 leading-relaxed">
            Our mission is to build the most complete, well-organized directory of public APIs — making API discovery fast, intuitive, and free for everyone. We curate, organize, and enrich API data with practical integration guidance so you can go from discovery to deployment faster.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">What We Do</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <Database className="size-8 text-blue-500 mb-4" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Curate API Data</h3>
            <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">
              We organize over 1,400 free public APIs across 50+ categories. Each API is tagged with authentication requirements, HTTPS support, and CORS compatibility.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <Search className="size-8 text-emerald-500 mb-4" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Enable Discovery</h3>
            <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">
              Our powerful search and filtering tools help you find the perfect API by name, description, category, or technical requirements like auth type and CORS support.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <Code className="size-8 text-purple-500 mb-4" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Provide Integration Guides</h3>
            <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">
              Each API detail page includes code examples in JavaScript and Python, step-by-step integration guides, and FAQs to help you get started quickly.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <Shield className="size-8 text-amber-500 mb-4" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Ensure Quality</h3>
            <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">
              We verify and display key quality metrics for every API — authentication type, HTTPS support, and CORS compatibility — so you know what to expect before integrating.
            </p>
          </div>
        </div>
      </section>

      {/* Data Source */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Data Source</h2>
        <div className="prose dark:prose-invert max-w-none space-y-4">
          <p className="text-gray-600 dark:text-zinc-400 leading-relaxed">
            Our API database is sourced from the <Link href="https://github.com/public-apis/public-apis" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">public-apis community repository</Link> on GitHub — the largest crowd-sourced collection of free APIs, maintained by thousands of contributors worldwide.
          </p>
          <p className="text-gray-600 dark:text-zinc-400 leading-relaxed">
            We enhance this data with detailed metadata, integration guides, code examples, and quality metrics to provide a richer, more useful experience for developers. Our goal is to add value beyond what a simple list can offer — helping you not just find APIs, but successfully integrate them.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="mb-12">
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-6 text-center dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">1,400+</div>
            <div className="text-sm text-gray-500 dark:text-zinc-400">Free APIs</div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-6 text-center dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">50+</div>
            <div className="text-sm text-gray-500 dark:text-zinc-400">Categories</div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-6 text-center dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">100%</div>
            <div className="text-sm text-gray-500 dark:text-zinc-400">Free</div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Our Values</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <Users className="size-6 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Developer-First</h3>
              <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">Every feature we build is designed to make developers more productive. We prioritize clarity, accuracy, and usefulness in everything we do.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <RefreshCw className="size-6 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Always Current</h3>
              <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">We continuously update our directory to reflect the latest APIs, changes, and additions. Stale data helps no one.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Shield className="size-6 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Transparency</h3>
              <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">We clearly display the technical characteristics of every API — auth requirements, HTTPS, CORS — so you can make informed decisions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="rounded-xl border border-gray-200 bg-gray-50/50 p-8 text-center dark:border-zinc-800 dark:bg-zinc-900/50">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Get in Touch</h2>
        <p className="text-gray-500 dark:text-zinc-400 mb-6">
          Have questions, suggestions, or want to partner with us? We&apos;d love to hear from you.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
            Contact Us
          </Link>
          <Link href="/faq" className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors">
            Read FAQ
          </Link>
        </div>
      </section>
    </div>
  );
}
