export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Terms of Service</h1>
      <p className="text-sm text-gray-500 dark:text-zinc-500 mb-8">Last Updated: May 2026</p>
      <div className="prose dark:prose-invert max-w-none space-y-8">
        <p className="text-gray-600 dark:text-zinc-300 leading-relaxed">By accessing and using FreeAPI Hub, you agree to comply with these Terms of Service. Please read them carefully.</p>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Use of Service</h2>
          <p className="text-gray-600 dark:text-zinc-400 leading-relaxed">FreeAPI Hub provides a directory of public APIs for informational purposes. While we strive for accuracy, we do not guarantee the availability, reliability, or security of any listed API. Use third-party APIs at your own risk.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Intellectual Property</h2>
          <p className="text-gray-600 dark:text-zinc-400 leading-relaxed">The FreeAPI Hub website design, logo, and original content are our property. API data is sourced from the public-apis community repository and is available under its respective license.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Disclaimer</h2>
          <p className="text-gray-600 dark:text-zinc-400 leading-relaxed">FreeAPI Hub is provided &quot;as is&quot; without warranties of any kind. We are not responsible for any damages arising from the use of our directory or any listed APIs.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Changes to Terms</h2>
          <p className="text-gray-600 dark:text-zinc-400 leading-relaxed">We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to this page. Continued use of the site constitutes acceptance of the updated terms.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Contact</h2>
          <p className="text-gray-600 dark:text-zinc-400 leading-relaxed">For questions about these Terms, please contact us at legal@freeapihub.cc.</p>
        </section>
      </div>
    </div>
  );
}
