"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, Check, X } from "lucide-react";

const STORAGE_KEY = "freeapihub-consent-v1";

type ConsentState = "granted" | "denied";

interface ConsentChoice {
  ad_storage: ConsentState;
  ad_user_data: ConsentState;
  ad_personalization: ConsentState;
  analytics_storage: ConsentState;
}

const GRANTED: ConsentChoice = {
  ad_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
  analytics_storage: "granted",
};

const DENIED: ConsentChoice = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function pushConsent(choice: ConsentChoice) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function (...args: unknown[]) {
      window.dataLayer.push(args);
    };
  window.gtag("consent", "update", choice);
}

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        setVisible(true);
        return;
      }
      // Re-sync stored choice to gtag on subsequent visits
      const parsed = JSON.parse(stored) as ConsentChoice;
      pushConsent(parsed);
    } catch {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    pushConsent(GRANTED);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(GRANTED));
    } catch {
      /* ignore quota errors */
    }
    setVisible(false);
  };

  const handleReject = () => {
    pushConsent(DENIED);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DENIED));
    } catch {
      /* ignore quota errors */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl ring-1 ring-black/5 dark:border-zinc-700 dark:bg-zinc-900 dark:ring-white/5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
            <Cookie className="size-5" />
          </div>
          <div className="flex-1">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
              We value your privacy
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-zinc-400">
              We use essential cookies to power site features (theme, bookmarks) and,
              with your consent, Google AdSense cookies to personalize ads for visitors
              in the EEA, UK, and Switzerland. You can change your choice anytime from
              the privacy policy. See our{" "}
              <Link
                href="/privacy"
                className="font-medium text-blue-600 underline-offset-2 hover:underline dark:text-blue-400"
              >
                Privacy Policy
              </Link>
              .
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                onClick={handleReject}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                <X className="size-4" />
                Reject all
              </button>
              <button
                onClick={handleAccept}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                <Check className="size-4" />
                Accept all
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
