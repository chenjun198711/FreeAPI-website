type BadgeVariant = "green" | "amber" | "red" | "slate";

const variantStyles: Record<BadgeVariant, string> = {
  green: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
  amber: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
  red: "bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20",
  slate: "bg-gray-50 text-gray-600 border-gray-200 dark:bg-zinc-500/10 dark:text-zinc-400 dark:border-zinc-500/20",
};

function BadgeWrapper({ variant, children }: { variant: BadgeVariant; children: React.ReactNode }) {
  return (
    <span className={`inline-flex h-5 w-fit shrink-0 items-center rounded-full border px-2 py-0.5 text-[11px] font-medium whitespace-nowrap ${variantStyles[variant]}`}>
      {children}
    </span>
  );
}

export function BadgeGroup({ auth, https, cors }: { auth: string; https: string; cors: string }) {
  const authLabel = auth === "No" ? "No Auth" : auth === "apiKey" ? "API Key" : "OAuth";
  const authVariant: BadgeVariant = auth === "No" ? "green" : auth === "apiKey" ? "amber" : "red";

  const httpsLabel = https === "Yes" ? "HTTPS" : "HTTP";
  const httpsVariant: BadgeVariant = https === "Yes" ? "green" : "red";

  const corsLabel = cors === "Yes" ? "CORS" : cors === "No" ? "No CORS" : "CORS ?";
  const corsVariant: BadgeVariant = cors === "Yes" ? "green" : cors === "No" ? "amber" : "slate";

  return (
    <div className="flex flex-wrap gap-1.5">
      <BadgeWrapper variant={authVariant}>{authLabel}</BadgeWrapper>
      <BadgeWrapper variant={httpsVariant}>{httpsLabel}</BadgeWrapper>
      <BadgeWrapper variant={corsVariant}>{corsLabel}</BadgeWrapper>
    </div>
  );
}
