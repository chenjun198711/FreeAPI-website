export function AdSlot({ className }: { className?: string }) {
  return (
    <div className={`ad-slot ${className || ""}`}>
      <div className="text-center">
        <p className="font-medium mb-1 text-gray-400 dark:text-zinc-500">Advertisement</p>
        <p className="text-xs text-gray-400 dark:text-zinc-600">
          Ad space available —{" "}
          <a
            href="mailto:sponsor@freeapihub.cc"
            className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2"
          >
            sponsor@freeapihub.cc
          </a>
        </p>
      </div>
    </div>
  );
}
