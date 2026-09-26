import type { Sponsor } from "@/types";

interface SponsorBannerProps {
  sponsor: Sponsor;
}

export default function SponsorBanner({ sponsor }: SponsorBannerProps) {
  return (
    <aside
      className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:flex sm:items-center sm:justify-between sm:gap-8"
      aria-labelledby={`${sponsor.id}-heading`}
    >
      <div>
        <p className="text-sm font-bold uppercase tracking-wider text-emerald-800">
          Sponsored
        </p>
        <h2
          id={`${sponsor.id}-heading`}
          className="mt-2 text-2xl font-bold text-slate-950"
        >
          {sponsor.name}
        </h2>
        <p className="mt-2 max-w-2xl leading-7 text-slate-700">
          {sponsor.description}
        </p>
      </div>

      <a
        href={sponsor.websiteUrl}
        className="mt-5 inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg border-2 border-emerald-800 px-4 py-2 font-semibold text-emerald-900 transition hover:bg-emerald-100 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-blue-700 sm:mt-0"
      >
        Visit {sponsor.name}
      </a>
    </aside>
  );
}
