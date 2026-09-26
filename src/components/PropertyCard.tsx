import Image from "next/image";

import type { Property } from "@/types";

interface PropertyCardProps {
  property: Property;
}

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <article
      id={property.id}
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
        <Image
          src={property.imageSrc}
          alt={property.imageAlt}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold text-slate-950">{property.title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          {property.address}
        </p>
        <p className="mt-4 text-2xl font-bold text-blue-800">
          {priceFormatter.format(property.price)}
        </p>

        <ul
          className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-700"
          aria-label={`${property.title} facts`}
        >
          <li>{property.bedrooms} bedrooms</li>
          <li>{property.bathrooms} bathrooms</li>
          <li>{property.squareFeet.toLocaleString()} sq. ft.</li>
        </ul>

        <a
          href={property.detailsHref}
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-700 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-800 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-amber-500"
          aria-label={`View details for ${property.title}`}
        >
          View property details
        </a>
      </div>
    </article>
  );
}
