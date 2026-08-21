export const metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for FreeAPI Hub. Learn how we collect, use, and protect your data, including details about Google AdSense cookies, Google Consent Mode v2, EEA user consent, and your CCPA / GDPR rights.",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 dark:text-zinc-500 mb-8">Last Updated: July 2026</p>
      <div className="prose dark:prose-invert max-w-none space-y-8">
        <p className="text-gray-600 dark:text-zinc-300 leading-relaxed">At FreeAPI Hub, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your information when you visit our website (https://freeapihub.cc).</p>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">1. Information We Collect</h2>
          <p className="text-gray-600 dark:text-zinc-400 leading-relaxed">We use standard web analytics to understand how visitors use our site. This includes anonymous data such as pages visited, time on site, and browser type. We do not collect personal information unless you voluntarily contact us via email (for example at support@freeapihub.cc or legal@freeapihub.cc).</p>
          <p className="text-gray-600 dark:text-zinc-400 leading-relaxed mt-3">Your bookmarks and theme preference are stored locally in your browser (localStorage). This data never leaves your device unless you explicitly email us.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2. Cookies &amp; Google Consent Mode v2</h2>
          <p className="text-gray-600 dark:text-zinc-400 leading-relaxed">We use three categories of cookies:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-zinc-400 mt-3">
            <li><strong className="text-gray-900 dark:text-white">Essential cookies</strong> (always on): power site functionality such as theme preference and saved bookmarks. These do not require consent and are stored locally in your browser.</li>
            <li><strong className="text-gray-900 dark:text-white">Advertising cookies</strong> (opt-in): used by Google AdSense to serve and measure ads, and to build audiences for personalized advertising. These include cookies such as <code className="rounded bg-gray-100 px-1 py-0.5 text-xs dark:bg-zinc-800">__gads</code>, <code className="rounded bg-gray-100 px-1 py-0.5 text-xs dark:bg-zinc-800">__gpi</code>, <code className="rounded bg-gray-100 px-1 py-0.5 text-xs dark:bg-zinc-800">IDE</code> and the <code className="rounded bg-gray-100 px-1 py-0.5 text-xs dark:bg-zinc-800">NID</code> cookie on Google&apos;s domains.</li>
            <li><strong className="text-gray-900 dark:text-white">Analytics cookies</strong> (opt-in): if we enable Google Analytics in the future, these will measure traffic and user behavior.</li>
          </ul>
          <p className="text-gray-600 dark:text-zinc-400 leading-relaxed mt-3">
            We implement <a href="https://developers.google.com/tag-platform/security/concepts/consent-mode" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Google Consent Mode v2</a>. When you first visit the site, all advertising and analytics signals are set to <code className="rounded bg-gray-100 px-1 py-0.5 text-xs dark:bg-zinc-800">denied</code> by default. A consent banner is shown to every visitor so you can choose to grant or reject advertising and analytics cookies. Your choice is stored in your browser for future visits. You can revoke consent at any time by clearing the <code className="rounded bg-gray-100 px-1 py-0.5 text-xs dark:bg-zinc-800">freeapihub-consent-v1</code> entry from your browser&apos;s local storage and reloading the page.
          </p>
          <p className="text-gray-600 dark:text-zinc-400 leading-relaxed mt-3">For visitors in the European Economic Area (EEA), the United Kingdom, and Switzerland, personalized advertising will only be served after you explicitly click &quot;Accept all&quot; in the consent banner. If you reject or do not make a choice, Google may still serve non-personalized ads or no ads at all, in line with the <a href="https://support.google.com/adsense/answer/13554116" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Google EU User Consent Policy</a>.</p>
          <p className="text-gray-600 dark:text-zinc-400 leading-relaxed mt-3">You can manage your Google ad settings at any time via <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Google Ads Settings</a> and review Google&apos;s <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">How Google uses cookies</a> page.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3. Third-Party Services</h2>
          <p className="text-gray-600 dark:text-zinc-400 leading-relaxed">We may use the following third-party services:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-zinc-400 mt-3">
            <li><strong className="text-gray-900 dark:text-white">Google AdSense</strong> &mdash; displays ads and may use cookies and device identifiers to serve and measure ads. <a href="https://support.google.com/adsense/answer/1348695" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Learn how Google uses data from sites that use its services</a>.</li>
            <li><strong className="text-gray-900 dark:text-white">Cloudflare</strong> &mdash; provides our CDN and DDoS protection. Cloudflare may log anonymous request metadata for security and performance.</li>
            <li><strong className="text-gray-900 dark:text-white">Our hosting provider</strong> &mdash; serves the static output of this Next.js site.</li>
          </ul>
          <p className="text-gray-600 dark:text-zinc-400 leading-relaxed mt-3">These third-party providers may collect anonymous usage data. We do not sell your personal data.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4. Data Retention</h2>
          <p className="text-gray-600 dark:text-zinc-400 leading-relaxed">Essential cookies stored in your browser (theme, bookmarks, consent choice) persist until you manually clear your browser storage. Advertising cookies set by Google AdSense follow Google&apos;s retention policy, typically up to 13 months. We do not maintain server-side user profiles or databases of personal information.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">5. Your Rights &amp; California Privacy (CCPA)</h2>
          <p className="text-gray-600 dark:text-zinc-400 leading-relaxed">If you are a resident of California (CCPA), the EEA, the UK, or Switzerland (GDPR / UK GDPR), you have the right to access, correct, or delete your personal data, and to object to or restrict certain processing.</p>
          <p className="text-gray-600 dark:text-zinc-400 leading-relaxed mt-3"><strong className="text-gray-900 dark:text-white">Notice at collection (CCPA):</strong> We collect the categories of personal information described above (anonymous usage data, and advertising cookie identifiers if you opt in). We do not sell personal information, and we do not share personal information for cross-context behavioral advertising. Under CCPA, &quot;sale&quot; is defined broadly, and we affirmatively state: <em className="text-gray-900 dark:text-white">we do not sell your personal data</em>. You do not need to submit a &quot;Do Not Sell My Personal Information&quot; request because we do not engage in such sales.</p>
          <p className="text-gray-600 dark:text-zinc-400 leading-relaxed mt-3">To exercise any of the above rights, email us at legal@freeapihub.cc. We will respond within 30 days.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">6. Children&apos;s Privacy</h2>
          <p className="text-gray-600 dark:text-zinc-400 leading-relaxed">Our site is not directed to children under 16, and we do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us at legal@freeapihub.cc and we will delete it.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">7. Changes to This Policy</h2>
          <p className="text-gray-600 dark:text-zinc-400 leading-relaxed">We may update this Privacy Policy from time to time. The &quot;Last Updated&quot; date at the top of the page reflects the most recent revision. Material changes will be highlighted on the homepage or in the consent banner.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">8. Contact Us</h2>
          <p className="text-gray-600 dark:text-zinc-400 leading-relaxed">If you have any questions about this Privacy Policy, please contact us:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-zinc-400 mt-2">
            <li>General / support: support@freeapihub.cc</li>
            <li>Privacy / legal: legal@freeapihub.cc</li>
            <li>Sponsorship / advertising: sponsor@freeapihub.cc</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
