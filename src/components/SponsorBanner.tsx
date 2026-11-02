import type { Sponsor } from "@/types";
import Image from "next/image";

interface SponsorBannerProps {
  sponsor: Sponsor;
}

export default function SponsorBanner({ sponsor }: SponsorBannerProps) {
  return (
    <aside
      className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6"
      aria-labelledby={`${sponsor.id}-heading`}
    >
      <figure className="mb-6">
       <div className="relative aspect-[2/1] overflow-hidden rounded-lg">
        <Image
          src="/images/sponsor-garden.jpg"
          alt={`Demonstration banner for ${sponsor.name}: seedlings and green plants growing in a greenhouse bed.`}
          fill
          sizes="(min-width: 1336px) 1230px, (min-width: 640px) calc(100vw - 98px), calc(100vw - 82px)"
          className="object-cover object-center"
       />
     </div>
        <figcaption className="mt-2 text-xs leading-5 text-slate-700">
          Fictional business advertisement using stock photography.
          Photo by Maria Firman / Pexels.
        </figcaption>
      </figure>
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
        className="mt-5 inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg border-2 border-emerald-800 px-4 py-2 font-semibold text-emerald-900 transition hover:bg-emerald-100 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-blue-700"
      >
        Visit {sponsor.name}
      </a>
    </aside>
  );
}
