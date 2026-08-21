"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowRight, TrendingUp, Star, Shield, Globe, Key } from "lucide-react";
import { getAllApis } from "@/lib/data-client";
import { ApiCard } from "@/components/api-card";
import type { ApiEntry } from "@/types";

function getScore(api: ApiEntry): number {
  let score = 0;
  if (api.auth === "No") score += 3;
  if (api.https === "Yes") score += 2;
  if (api.cors === "Yes") score += 2;
  return score;
}

function getTier(score: number): { label: string; color: string } {
  if (score >= 7) return { label: "Premium", color: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20" };
  if (score >= 5) return { label: "Great", color: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20" };
  return { label: "Good", color: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20" };
}

export default function PopularPage() {
  const rankedApis = useMemo(() => {
    return getAllApis()
      .map((api) => ({ ...api, score: getScore(api) }))
      .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
  }, []);

  const topApis = rankedApis.slice(0, 50);
  const premiumApis = rankedApis.filter((a) => a.score >= 7);
  const greatApis = rankedApis.filter((a) => a.score >= 5 && a.score < 7);
  const goodApis = rankedApis.filter((a) => a.score < 5);

  return (
    <div>
      {/* Header */}
      <section className="border-b border-gray-200 bg-gradient-to-b from-blue-50/40 to-white dark:border-zinc-800 dark:from-blue-950/15 dark:to-zinc-950">
        <div className="container mx-auto max-w-7xl px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm text-gray-500 mb-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
            <TrendingUp className="size-3.5 text-blue-500" />
            Ranked by Quality Score
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Popular APIs</h1>
          <p className="text-lg text-gray-500 dark:text-zinc-400 max-w-xl mx-auto">
            APIs ranked by developer experience — no authentication, full HTTPS and CORS support get the highest scores.
          </p>

          {/* Score Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 text-sm">
              <Key className="size-4 text-emerald-500" />
              <span className="text-gray-500 dark:text-zinc-400">No Auth =</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">+3 pts</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="size-4 text-blue-500" />
              <span className="text-gray-500 dark:text-zinc-400">HTTPS =</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">+2 pts</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Globe className="size-4 text-purple-500" />
              <span className="text-gray-500 dark:text-zinc-400">CORS =</span>
              <span className="font-semibold text-purple-600 dark:text-purple-400">+2 pts</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 text-center dark:border-amber-500/20 dark:bg-amber-500/5">
            <Star className="size-5 text-amber-500 mx-auto mb-1 fill-amber-500" />
            <div className="text-2xl font-bold text-amber-700 dark:text-amber-400">{premiumApis.length}</div>
            <div className="text-xs text-amber-600/70 dark:text-amber-400/70">Premium APIs (7 pts)</div>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 text-center dark:border-emerald-500/20 dark:bg-emerald-500/5">
            <Star className="size-5 text-emerald-500 mx-auto mb-1" />
            <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">{greatApis.length}</div>
            <div className="text-xs text-emerald-600/70 dark:text-emerald-400/70">Great APIs (5-6 pts)</div>
          </div>
          <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-4 text-center dark:border-blue-500/20 dark:bg-blue-500/5">
            <Star className="size-5 text-blue-500 mx-auto mb-1" />
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">{goodApis.length}</div>
            <div className="text-xs text-blue-600/70 dark:text-blue-400/70">Good APIs (&lt;5 pts)</div>
          </div>
        </div>
      </section>

      {/* Top Ranked APIs */}
      <section className="container mx-auto max-w-7xl px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="size-5 text-blue-500" /> Top-Ranked APIs
            </h2>
            <p className="text-gray-500 dark:text-zinc-400 mt-1">The 50 highest-scoring free APIs for developer experience</p>
          </div>
          <Link href="/search" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">
            Search All <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topApis.map((api) => (
            <div key={api.id} className="relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${getTier(api.score).color}`}>
                  {getTier(api.score).label} · {api.score}pts
                </span>
              </div>
              <ApiCard api={api} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
