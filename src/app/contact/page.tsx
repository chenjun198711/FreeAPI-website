import { Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h1>
      <p className="text-lg text-gray-500 dark:text-zinc-400 mb-12">Have questions, suggestions, or want to advertise with us? We&apos;d love to hear from you.</p>
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <Mail className="size-8 text-amber-500 mb-4" />
          <h2 className="font-semibold text-gray-900 dark:text-white mb-2">Sponsorship</h2>
          <p className="text-sm text-gray-500 dark:text-zinc-400 mb-4 leading-relaxed">Get your API featured prominently on FreeAPI Hub. Reach thousands of developers actively looking for APIs.</p>
          <a href="mailto:sponsor@freeapihub.cc" className="text-sm text-blue-600 dark:text-blue-400 hover:underline break-all">sponsor@freeapihub.cc</a>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <Mail className="size-8 text-blue-500 mb-4" />
          <h2 className="font-semibold text-gray-900 dark:text-white mb-2">General Inquiries</h2>
          <p className="text-sm text-gray-500 dark:text-zinc-400 mb-4 leading-relaxed">Questions about the site, data corrections, or general feedback.</p>
          <a href="mailto:jasson2026@gmail.com" className="text-sm text-blue-600 dark:text-blue-400 hover:underline break-all">jasson2026@gmail.com</a>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <Mail className="size-8 text-gray-400 mb-4" />
          <h2 className="font-semibold text-gray-900 dark:text-white mb-2">Legal</h2>
          <p className="text-sm text-gray-500 dark:text-zinc-400 mb-4 leading-relaxed">Privacy concerns, terms questions, or legal inquiries.</p>
          <a href="mailto:legal@freeapihub.cc" className="text-sm text-blue-600 dark:text-blue-400 hover:underline break-all">legal@freeapihub.cc</a>
        </div>
      </div>
    </div>
  );
}
