import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions",
  description: "Find answers to common questions about free public APIs, API authentication, CORS, HTTPS, and how to use FreeAPI Hub to discover and integrate APIs into your projects.",
  keywords: ["API FAQ", "free API questions", "API authentication", "CORS explained", "HTTPS API", "API integration help"],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { q: "What is FreeAPI Hub?", a: "FreeAPI Hub is a curated directory of over 1,400 free public APIs across 50+ categories. We help developers discover, compare, and integrate public APIs into their projects." },
    { q: "Are all APIs on FreeAPI Hub really free?", a: "Yes, all APIs listed on FreeAPI Hub are free to use. Some may have usage limits or rate restrictions. Review each API's documentation for specific policies." },
    { q: "What does 'No Auth' mean?", a: "'No Auth' means the API does not require any authentication. You can start making API requests immediately without registering for an API key." },
    { q: "What is CORS and why does it matter?", a: "CORS (Cross-Origin Resource Sharing) is a browser security feature. If an API supports CORS, you can make requests directly from the browser. If not, you'll need a backend proxy." },
    { q: "How do I make my first API request?", a: "Review the API documentation, then use fetch in JavaScript or requests in Python. Check the code examples on each API detail page for specific integration guidance." },
    { q: "Can I use free APIs in commercial projects?", a: "Most free APIs can be used in commercial projects, but always review the API's terms of service and licensing agreement for restrictions." },
  ].map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const FAQS = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "What is FreeAPI Hub?",
        a: "FreeAPI Hub is a curated directory of over 1,400 free public APIs across 50+ categories. We help developers discover, compare, and integrate public APIs into their projects. Each API listing includes detailed information about authentication requirements, HTTPS support, CORS compatibility, and integration guidance."
      },
      {
        q: "Are all APIs on FreeAPI Hub really free?",
        a: "Yes, all APIs listed on FreeAPI Hub are free to use. However, some free APIs may have usage limits, rate restrictions, or require registration for an API key. We recommend reviewing each API's documentation for specific usage policies and limitations before integration."
      },
      {
        q: "How do I find the right API for my project?",
        a: "You can browse APIs by category using our Categories page, or use the Search feature to find APIs by name, description, or use case. You can also filter results by authentication type, HTTPS support, and CORS compatibility to find APIs that match your technical requirements."
      },
      {
        q: "Do I need to create an account to use FreeAPI Hub?",
        a: "No, you don't need an account to browse and search APIs. You can create bookmarks in your browser to save APIs for later, which are stored locally. No registration or personal information is required."
      },
    ]
  },
  {
    category: "API Authentication",
    questions: [
      {
        q: "What does 'No Auth' mean?",
        a: "'No Auth' means the API does not require any authentication. You can start making API requests immediately without registering for an API key or setting up OAuth credentials. These APIs are perfect for quick prototyping, demos, and learning."
      },
      {
        q: "What is an API key?",
        a: "An API key is a unique identifier that authenticates your requests to an API. When an API requires an API key, you typically need to register on the provider's website to obtain one. The key is then included in your request headers or query parameters. Always keep your API key secure and never expose it in client-side code."
      },
      {
        q: "How does OAuth authentication work?",
        a: "OAuth is an authorization framework that allows third-party applications to access user data without sharing passwords. With OAuth, users grant your application permission to access their data on another service. You'll need to register your application with the API provider, implement the OAuth authorization flow, and use access tokens to authenticate requests."
      },
      {
        q: "How should I store my API keys securely?",
        a: "Never commit API keys to version control or expose them in client-side code. Store keys in environment variables (e.g., .env files that are gitignored), use a backend proxy for browser-based apps, and consider using a secrets management service for production applications. Most frameworks provide built-in environment variable support."
      },
    ]
  },
  {
    category: "Technical Questions",
    questions: [
      {
        q: "What is CORS and why does it matter?",
        a: "CORS (Cross-Origin Resource Sharing) is a browser security feature that controls which web origins can access resources. If an API supports CORS, you can make requests directly from the browser. If not, you'll need a backend proxy to forward requests. CORS is essential for frontend-only applications built with React, Vue, or other client-side frameworks."
      },
      {
        q: "Why is HTTPS important for APIs?",
        a: "HTTPS encrypts data transmitted between your application and the API server, protecting it from interception and tampering. Always use HTTPS endpoints in production environments. Most modern APIs support HTTPS, and browsers increasingly require it for all web requests."
      },
      {
        q: "What are API rate limits?",
        a: "Rate limits restrict how many API requests you can make within a specific time period (e.g., 100 requests per minute). Free APIs often have lower rate limits than paid tiers. Exceeding rate limits typically results in HTTP 429 (Too Many Requests) responses. Implement caching and exponential backoff to handle rate limiting gracefully."
      },
      {
        q: "How do I handle API errors in my application?",
        a: "Always implement proper error handling for API requests. Check HTTP status codes (200 for success, 4xx for client errors, 5xx for server errors), handle network failures with try-catch blocks, implement retry logic with exponential backoff for transient errors, and provide meaningful error messages to users. Log errors for debugging but never expose sensitive information."
      },
      {
        q: "Can I use free APIs in commercial projects?",
        a: "Most free APIs can be used in commercial projects, but you should always review the API's terms of service and licensing agreement. Some APIs may have restrictions on commercial use, require attribution, or have usage limits that affect commercial viability. When in doubt, contact the API provider directly."
      },
    ]
  },
  {
    category: "Integration & Development",
    questions: [
      {
        q: "How do I make my first API request?",
        a: "Start by reviewing the API documentation to understand available endpoints and request formats. For a simple GET request with no authentication, you can use fetch in JavaScript: `fetch('API_URL').then(r => r.json()).then(data => console.log(data))`. For authenticated APIs, you'll need to include your API key in the request headers. Check the code examples on each API detail page for specific integration guidance."
      },
      {
        q: "What's the difference between REST and GraphQL APIs?",
        a: "REST APIs use standard HTTP methods (GET, POST, PUT, DELETE) to interact with resources at specific URLs. GraphQL APIs use a single endpoint where you send queries to specify exactly what data you need. REST is simpler and more widely supported, while GraphQL offers more flexibility and can reduce over-fetching of data."
      },
      {
        q: "Should I use a backend proxy for API requests?",
        a: "Use a backend proxy when: 1) The API doesn't support CORS and you're building a browser app, 2) You need to keep your API key secret (never expose keys in frontend code), 3) You want to add caching or rate limiting, or 4) You need to transform API responses before sending them to clients. A proxy adds an extra layer of security and control."
      },
      {
        q: "How can I test APIs before integrating them?",
        a: "You can test APIs using tools like curl in the terminal, Postman for visual API testing, or the browser's fetch API in the console. Many API providers also offer interactive documentation (like Swagger/OpenAPI) where you can try endpoints directly. Start with a simple request to verify connectivity before building your full integration."
      },
    ]
  },
  {
    category: "About FreeAPI Hub",
    questions: [
      {
        q: "Where does FreeAPI Hub get its API data?",
        a: "Our API database is sourced from the public-apis community repository on GitHub — the largest crowd-sourced collection of free APIs, maintained by thousands of contributors worldwide. We enhance this data with detailed metadata, integration guides, and code examples to help developers get started quickly."
      },
      {
        q: "How often is the API directory updated?",
        a: "We regularly update our API directory to add new APIs, update existing listings, and remove APIs that are no longer available. The public-apis repository is actively maintained by the community, and we sync our data to reflect the latest additions and changes."
      },
      {
        q: "Can I suggest a new API to be added?",
        a: "Yes! If you know of a free public API that should be included in our directory, please contact us. You can also contribute directly to the public-apis repository on GitHub, which is our primary data source."
      },
      {
        q: "How can I advertise on FreeAPI Hub?",
        a: "We offer sponsorship opportunities for API providers who want to feature their APIs prominently in our directory. For sponsorship inquiries, please contact us at sponsor@freeapihub.cc."
      },
    ]
  },
];

export default function FAQPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-gray-500 dark:text-zinc-400 max-w-2xl mx-auto">
          Find answers to common questions about free public APIs, authentication, integration, and using FreeAPI Hub.
        </p>
      </div>

      <div className="space-y-10">
        {FAQS.map((section) => (
          <section key={section.category}>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-zinc-800">
              {section.category}
            </h2>
            <div className="space-y-3">
              {section.questions.map((faq, i) => (
                <details key={i} className="group rounded-lg border border-gray-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-900">
                  <summary className="flex items-center justify-between cursor-pointer p-4 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                    {faq.q}
                    <ChevronDown className="size-4 text-gray-400 group-open:rotate-180 transition-transform shrink-0" />
                  </summary>
                  <div className="px-4 pb-4 text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Contact CTA */}
      <div className="mt-12 rounded-xl border border-gray-200 bg-gray-50/50 p-8 text-center dark:border-zinc-800 dark:bg-zinc-900/50">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Still have questions?</h2>
        <p className="text-gray-500 dark:text-zinc-400 mb-4">
          Can&apos;t find the answer you&apos;re looking for? We&apos;re here to help.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
