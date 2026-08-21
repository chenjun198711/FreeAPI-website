import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50/50 dark:border-zinc-800 dark:bg-zinc-950/50 mt-auto">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="flex size-7 items-center justify-center rounded-lg bg-blue-600 text-white text-xs font-bold">F</span>
              <span className="font-semibold text-gray-900 dark:text-white">FreeAPI Hub</span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-zinc-400">
              The most comprehensive directory of free public APIs for developers.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-3">Platform</h3>
            <ul className="space-y-2">
              <li><Link href="/search" className="text-sm text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white transition-colors">APIs</Link></li>
              <li><Link href="/categories" className="text-sm text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white transition-colors">Categories</Link></li>
              <li><Link href="/popular" className="text-sm text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white transition-colors">Popular APIs</Link></li>
              <li><Link href="/bookmarks" className="text-sm text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white transition-colors">Bookmarks</Link></li>
              <li><a href="https://github.com/public-apis/public-apis" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white transition-colors">GitHub Source</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-3">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-sm text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/blog" className="text-sm text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/about" className="text-sm text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white transition-colors">Contact</Link></li>
              <li><a href="mailto:sponsor@freeapihub.cc" className="text-sm text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white transition-colors">Advertise</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-3">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-sm text-gray-400 dark:text-zinc-500">© {year} FreeAPI Hub. All rights reserved.</p>
          <p className="text-sm text-gray-400 dark:text-zinc-500">Built with Next.js · Data from public-apis community</p>
        </div>
      </div>
    </footer>
  );
}
