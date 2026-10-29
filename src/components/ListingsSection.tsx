"use client";

import { useEffect, useState } from "react";

import PropertyCard from "@/components/PropertyCard";
import type { Property } from "@/types";

interface ListingRecord {
	id: string;
	title: string;
	city: string;
	state: string;
	zip_code: string;
	price: number;
	bedrooms: number;
	bathrooms: number;
	square_feet: number;
	image_src: string;
	image_alt: string;
	details_href: string;
}

function isListingRecord(value: unknown): value is ListingRecord {
	if (typeof value !== "object" || value === null) {
		return false;
	}

	const record = value as Record<string, unknown>;

	return (
		typeof record.id === "string" &&
		typeof record.title === "string" &&
		typeof record.city === "string" &&
		typeof record.state === "string" &&
		typeof record.zip_code === "string" &&
		typeof record.price === "number" &&
		typeof record.bedrooms === "number" &&
		typeof record.bathrooms === "number" &&
		typeof record.square_feet === "number" &&
		typeof record.image_src === "string" &&
		typeof record.image_alt === "string" &&
		typeof record.details_href === "string"
	);
}

function readListings(value: unknown): ListingRecord[] | null {
	if (typeof value !== "object" || value === null) {
		return null;
	}

	const listings = (value as Record<string, unknown>).listings;

	if (!Array.isArray(listings) || !listings.every(isListingRecord)) {
		return null;
	}

	return listings;
}

function mapListing(record: ListingRecord): Property {
	return {
		id: record.id,
		title: record.title,
		address: `${record.city}, ${record.state} ${record.zip_code}`,
		price: record.price,
		bedrooms: record.bedrooms,
		bathrooms: record.bathrooms,
		squareFeet: record.square_feet,
		imageSrc: record.image_src,
		imageAlt: record.image_alt,
		detailsHref: record.details_href,
	};
}

export default function ListingsSection() {
	const [properties, setProperties] = useState<Property[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const controller = new AbortController();

		async function loadListings() {
			try {
				const response = await fetch("/api/listings", {
					cache: "no-store",
					signal: controller.signal,
				});

				if (!response.ok) {
					throw new Error("Listings request failed.");
				}

				const body: unknown = await response.json();
				const listings = readListings(body);

				if (!listings) {
					throw new Error("Listings response was invalid.");
				}

				setProperties(listings.map(mapListing));
				setError(null);
			} catch (requestError) {
				if (
					requestError instanceof DOMException &&
					requestError.name === "AbortError"
				) {
					return;
				}

				setError("Listings are temporarily unavailable.");
			} finally {
				if (!controller.signal.aborted) {
					setIsLoading(false);
				}
			}
		}

		loadListings();

		return () => controller.abort();
	}, []);

	if (isLoading) {
		return (
			<p
				className="mt-6 rounded-xl border border-slate-300 bg-white p-6 text-slate-700"
				role="status"
				aria-live="polite"
			>
				Loading approved properties…
			</p>
		);
	}

	if (error) {
		return (
			<div
				className="mt-6 rounded-xl border border-red-300 bg-red-50 p-6 text-red-950"
				role="alert"
			>
				<h3 className="text-lg font-bold">
					Listings temporarily unavailable
				</h3>
				<p className="mt-2">{error}</p>
			</div>
		);
	}

	if (properties.length === 0) {
		return (
			<p
				className="mt-6 rounded-xl border border-slate-300 bg-white p-6 text-slate-700"
				role="status"
			>
				No approved properties are currently available.
			</p>
		);
	}

	return (
		<>
			<p className="mt-2 text-slate-700">
				{properties.length} approved synthetic{" "}
				{properties.length === 1 ? "home is" : "homes are"} available
				in the neighborhood.
			</p>

			<div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{properties.map((property) => (
					<PropertyCard key={property.id} property={property} />
				))}
			</div>
		</>
	);
}