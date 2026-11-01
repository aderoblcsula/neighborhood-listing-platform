"use client";

import { useId, useState } from "react";

export interface PublicProperty {
	id: string;
	address: string;
	price: number;
	bedrooms: number;
	bathrooms: number;
	square_feet: number;
}

interface PropertyCardProps {
	property: PublicProperty;
}

const priceFormatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	maximumFractionDigits: 2,
});

export default function PropertyCard({ property }: PropertyCardProps) {
	const [detailsOpen, setDetailsOpen] = useState(false);
	const detailsId = useId();

	return (
		<article className="flex h-full flex-col rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
			<header>
				<h3 className="text-xl font-bold text-slate-950">
					{property.address}
				</h3>
				<p className="mt-3 text-2xl font-bold text-blue-800">
					{priceFormatter.format(property.price)}
				</p>
			</header>

			<ul
				className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-700"
				aria-label={`Specifications for ${property.address}`}
			>
				<li>{property.bedrooms} bedrooms</li>
				<li>{property.bathrooms} bathrooms</li>
				<li>{property.square_feet.toLocaleString()} sq. ft.</li>
			</ul>

			<button
				type="button"
				aria-label={`${
					detailsOpen ? "Hide" : "View"
				} details for ${property.address}`}
				aria-expanded={detailsOpen}
				aria-controls={detailsId}
				onClick={() => setDetailsOpen((current) => !current)}
				className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white hover:bg-blue-800 focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
			>
				{detailsOpen ? "Hide details" : "View details"}
			</button>

			<div
				id={detailsId}
				hidden={!detailsOpen}
				className="mt-4 border-t border-slate-200 pt-4 text-sm leading-6 text-slate-700"
			>
				<p>
					This approved property at {property.address} offers{" "}
					{property.bedrooms} bedrooms, {property.bathrooms} bathrooms,
					and {property.square_feet.toLocaleString()} square feet.
				</p>
				<p className="mt-2">
					Listed price: {priceFormatter.format(property.price)}.
				</p>
			</div>
		</article>
	);
}