import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-24 text-center">
      <p className="text-8xl font-bold text-zinc-800 mb-4">404</p>
      <h1 className="text-2xl font-bold text-white mb-2">Page Not Found</h1>
      <p className="text-zinc-400 mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="flex items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-blue-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-400 transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/search"
          className="rounded-lg border border-white/[0.08] px-6 py-2.5 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/[0.04] transition-colors"
        >
          Browse APIs
        </Link>
      </div>
    </div>
  );
}
