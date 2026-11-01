"use client";

import { useEffect, useState } from "react";

import PropertyCard, {
	type PublicProperty,
} from "@/components/PropertyCard";

function isPublicProperty(value: unknown): value is PublicProperty {
	if (typeof value !== "object" || value === null) {
		return false;
	}

	const property = value as Record<string, unknown>;

	return (
		typeof property.id === "string" &&
		typeof property.address === "string" &&
		property.address.trim().length >= 5 &&
		typeof property.price === "number" &&
		Number.isFinite(property.price) &&
		property.price >= 0 &&
		typeof property.bedrooms === "number" &&
		Number.isInteger(property.bedrooms) &&
		property.bedrooms >= 0 &&
		typeof property.bathrooms === "number" &&
		Number.isFinite(property.bathrooms) &&
		property.bathrooms >= 0 &&
		typeof property.square_feet === "number" &&
		Number.isInteger(property.square_feet) &&
		property.square_feet > 0
	);
}

function readProperties(value: unknown): PublicProperty[] | null {
	if (typeof value !== "object" || value === null) {
		return null;
	}

	const properties = (value as Record<string, unknown>).properties;

	if (
		!Array.isArray(properties) ||
		!properties.every(isPublicProperty)
	) {
		return null;
	}

	return properties;
}

export default function ListingsSection() {
	const [properties, setProperties] = useState<PublicProperty[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const controller = new AbortController();

		async function loadProperties() {
			try {
				const response = await fetch("/api/properties", {
					cache: "no-store",
					signal: controller.signal,
				});

				if (!response.ok) {
					throw new Error("Property request failed.");
				}

				const body: unknown = await response.json();
				const records = readProperties(body);

				if (!records) {
					throw new Error("Invalid property response.");
				}

				if (!controller.signal.aborted) {
					setProperties(records);
					setError(null);
				}
			} catch {
				if (!controller.signal.aborted) {
					setError("Listings are temporarily unavailable.");
				}
			} finally {
				if (!controller.signal.aborted) {
					setIsLoading(false);
				}
			}
		}

		void loadProperties();

		return () => controller.abort();
	}, []);

	if (isLoading) {
		return (
			<p className="mt-6 text-slate-700" role="status">
				Loading approved properties…
			</p>
		);
	}

	if (error) {
		return (
			<p
				className="mt-6 rounded-xl border border-red-300 bg-red-50 p-6 text-red-950"
				role="alert"
			>
				{error}
			</p>
		);
	}

	if (properties.length === 0) {
		return (
			<p className="mt-6 text-slate-700" role="status">
				No approved properties are currently available.
			</p>
		);
	}

	return (
		<>
			<p className="mt-2 text-slate-700">
				{properties.length} approved{" "}
				{properties.length === 1 ? "property" : "properties"} available.
			</p>

			<div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{properties.map((property) => (
					<PropertyCard key={property.id} property={property} />
				))}
			</div>
		</>
	);
}