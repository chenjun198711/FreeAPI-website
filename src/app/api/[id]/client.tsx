"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Copy, Check, Shield, Globe, Key, ChevronRight, BookOpen, Lightbulb, Code, HelpCircle, Sparkles, Gauge, AlertTriangle, GitCompare, Terminal } from "lucide-react";
import { BadgeGroup } from "@/components/auth-badge";
import { BookmarkButton } from "@/components/bookmark-button";
import { getApiUseCases, getIntegrationSteps, getApiFaqs, getApiCodeExample, getPythonCodeExample } from "@/lib/api-content";
import { getApiEnrichment } from "@/lib/api-enrichment";
import type { ApiEntry } from "@/types";

function CopyButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <button onClick={handleCopy} className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800 transition-all shrink-0">
      {copied ? <><Check className="size-3.5 text-emerald-500" /> Copied!</> : <><Copy className="size-3.5" /> Copy</>}
    </button>
  );
}

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div className="relative rounded-lg bg-gray-900 dark:bg-zinc-950 border border-gray-800 dark:border-zinc-800 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800 dark:border-zinc-800">
        <span className="text-xs text-gray-400 font-mono">{language}</span>
        <button onClick={handleCopy} className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors">
          {copied ? <><Check className="size-3" /> Copied!</> : <><Copy className="size-3" /> Copy</>}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm"><code className="text-gray-300 font-mono whitespace-pre">{code}</code></pre>
    </div>
  );
}

export function ApiDetailClient({ api, relatedApis }: { api: ApiEntry; relatedApis: ApiEntry[] }) {
  const useCases = getApiUseCases(api);
  const integrationSteps = getIntegrationSteps(api);
  const faqs = getApiFaqs(api);
  const jsCode = getApiCodeExample(api);
  const pythonCode = getPythonCodeExample(api);
  const enrichment = getApiEnrichment(api.id);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-zinc-500 mb-8">
        <Link href="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">Home</Link>
        <ChevronRight className="size-3" />
        <Link href={`/category/${api.categorySlug}`} className="hover:text-gray-900 dark:hover:text-white transition-colors">{api.category}</Link>
        <ChevronRight className="size-3" />
        <span className="text-gray-700 dark:text-zinc-300 font-medium truncate">{api.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{api.name}</h1>
              <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">{api.category}</p>
            </div>
            <BookmarkButton apiId={api.id} />
          </div>

          <p className="text-lg text-gray-600 dark:text-zinc-300 mb-6">{api.description}</p>
          {enrichment?.tagline && (
            <p className="text-sm text-gray-500 dark:text-zinc-400 mb-4 italic border-l-2 border-blue-300 dark:border-blue-500/40 pl-3">
              {enrichment.tagline}
            </p>
          )}
          <div className="mb-6"><BadgeGroup auth={api.auth} https={api.https} cors={api.cors} /></div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <InfoCard icon={<Key className="size-4" />} label="Auth" value={api.auth === "No" ? "No Auth" : api.auth} color={api.auth === "No" ? "green" : "amber"} />
            <InfoCard icon={<Shield className="size-4" />} label="HTTPS" value={api.https} color={api.https === "Yes" ? "green" : "red"} />
            <InfoCard icon={<Globe className="size-4" />} label="CORS" value={api.cors} color={api.cors === "Yes" ? "green" : api.cors === "No" ? "amber" : "slate"} />
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 mb-6 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-xs text-gray-500 dark:text-zinc-500 mb-1">API URL</p>
            <div className="flex items-center justify-between gap-3">
              <a href={api.url} target="_blank" rel="noopener noreferrer" className="text-sm font-mono text-blue-600 dark:text-blue-400 hover:underline break-all">{api.url}</a>
              <CopyButton url={api.url} />
            </div>
          </div>

          {/* Use Cases Section */}
          <section className="mb-8">
            <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white mb-4">
              <Lightbulb className="size-5 text-amber-500" />
              Common Use Cases
            </h2>
            <ul className="space-y-2">
              {useCases.map((useCase, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-zinc-400">
                  <span className="text-blue-500 mt-1 shrink-0">•</span>
                  <span>{useCase}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Integration Guide */}
          <section className="mb-8">
            <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white mb-4">
              <BookOpen className="size-5 text-blue-500" />
              Integration Guide
            </h2>
            <div className="space-y-4">
              {integrationSteps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 font-semibold text-sm shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Code Examples */}
          <section className="mb-8">
            <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white mb-4">
              <Code className="size-5 text-emerald-500" />
              Code Examples
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-zinc-400 mb-2">JavaScript / Fetch API:</p>
                <CodeBlock code={jsCode} language="javascript" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-zinc-400 mb-2">Python / Requests:</p>
                <CodeBlock code={pythonCode} language="python" />
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-8">
            <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white mb-4">
              <HelpCircle className="size-5 text-purple-500" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details key={i} className="group rounded-lg border border-gray-200 dark:border-zinc-800 overflow-hidden">
                  <summary className="flex items-center justify-between cursor-pointer p-4 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                    {faq.question}
                    <ChevronRight className="size-4 text-gray-400 group-open:rotate-90 transition-transform shrink-0" />
                  </summary>
                  <div className="px-4 pb-4 text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Editor-curated deep dive - only on enriched (popular) APIs */}
          {enrichment && (
            <section className="mb-8 rounded-xl border border-blue-200 bg-blue-50/40 p-5 dark:border-blue-500/20 dark:bg-blue-500/5">
              <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white mb-4">
                <Sparkles className="size-5 text-blue-500" />
                Editor&apos;s Notes &amp; Deep Dive
              </h2>

              {enrichment.highlights && enrichment.highlights.length > 0 && (
                <div className="mb-5">
                  <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-2">Key Features</h3>
                  <ul className="space-y-1.5">
                    {enrichment.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-zinc-400">
                        <span className="text-blue-500 mt-0.5 shrink-0">→</span>
                        <span className="leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {enrichment.rateLimits && (
                <div className="mb-5 rounded-lg border border-amber-200 bg-amber-50/60 p-3 dark:border-amber-500/20 dark:bg-amber-500/5">
                  <h3 className="flex items-center gap-2 font-semibold text-sm text-gray-900 dark:text-white mb-1">
                    <Gauge className="size-4 text-amber-500" />
                    Rate Limits &amp; Quotas
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">{enrichment.rateLimits}</p>
                </div>
              )}

              {enrichment.knownIssues && enrichment.knownIssues.length > 0 && (
                <div className="mb-5">
                  <h3 className="flex items-center gap-2 font-semibold text-sm text-gray-900 dark:text-white mb-2">
                    <AlertTriangle className="size-4 text-rose-500" />
                    Known Issues &amp; Pitfalls
                  </h3>
                  <ul className="space-y-1.5">
                    {enrichment.knownIssues.map((issue, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-zinc-400">
                        <span className="text-rose-500 mt-0.5 shrink-0">!</span>
                        <span className="leading-relaxed">{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {enrichment.comparison && (
                <div className="mb-5">
                  <h3 className="flex items-center gap-2 font-semibold text-sm text-gray-900 dark:text-white mb-1">
                    <GitCompare className="size-4 text-emerald-500" />
                    How It Compares
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">{enrichment.comparison}</p>
                </div>
              )}

              {enrichment.sampleResponse && (
                <div className="mb-5">
                  <h3 className="flex items-center gap-2 font-semibold text-sm text-gray-900 dark:text-white mb-2">
                    <Terminal className="size-4 text-purple-500" />
                    Sample Response
                  </h3>
                  <CodeBlock code={enrichment.sampleResponse} language="json" />
                </div>
              )}

              {enrichment.tips && enrichment.tips.length > 0 && (
                <div>
                  <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-2">Pro Tips</h3>
                  <ul className="space-y-1.5">
                    {enrichment.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-zinc-400">
                        <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                        <span className="leading-relaxed">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          {/* Related APIs */}
          {relatedApis.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Related APIs in {api.category}</h3>
              <div className="grid gap-2 sm:grid-cols-3">
                {relatedApis.map((ra) => (
                  <Link key={ra.id} href={`/api/${ra.id}`} className="rounded-lg border border-gray-200 p-3 hover:border-blue-300 hover:bg-blue-50/50 dark:border-zinc-800 dark:hover:border-blue-500/30 dark:hover:bg-blue-500/5 transition-all">
                    <p className="font-medium text-sm text-gray-900 dark:text-white truncate">{ra.name}</p>
                    <p className="text-xs text-gray-500 dark:text-zinc-400 line-clamp-1 mt-1">{ra.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-4">
          <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <a href={api.url} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
                Visit API <ExternalLink className="size-4" />
              </a>
              <Link href={`/search?q=${encodeURIComponent(api.name)}`} className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors">
                Search Similar
              </Link>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-2">Category</h3>
            <Link href={`/category/${api.categorySlug}`} className="text-sm text-gray-500 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">
              View all in {api.category} →
            </Link>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-3">At a Glance</h3>
            <dl className="space-y-2 text-xs">
              <div className="flex justify-between">
                <dt className="text-gray-500 dark:text-zinc-400">Category</dt>
                <dd className="text-gray-900 dark:text-white font-medium">{api.category}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500 dark:text-zinc-400">Auth Type</dt>
                <dd className="text-gray-900 dark:text-white font-medium">{api.auth === "No" ? "None" : api.auth}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500 dark:text-zinc-400">HTTPS</dt>
                <dd className="text-gray-900 dark:text-white font-medium">{api.https}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500 dark:text-zinc-400">CORS</dt>
                <dd className="text-gray-900 dark:text-white font-medium">{api.cors}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500 dark:text-zinc-400">Cost</dt>
                <dd className="text-emerald-600 dark:text-emerald-400 font-medium">Free</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: "green" | "amber" | "red" | "slate" }) {
  const colors = {
    green: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
    amber: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
    red: "bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20",
    slate: "bg-gray-50 text-gray-600 border-gray-200 dark:bg-zinc-500/10 dark:text-zinc-400 dark:border-zinc-500/20",
  };
  return (
    <div className={`flex items-center gap-2.5 rounded-lg border p-3 ${colors[color]}`}>
      {icon}
      <div><p className="text-[10px] opacity-70">{label}</p><p className="font-semibold text-xs">{value}</p></div>
    </div>
  );
}
