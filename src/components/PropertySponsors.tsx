"use client";

import { useEffect, useState } from "react";

interface Sponsor {
	id: string;
	name: string;
	tier: "gold" | "silver" | "bronze";
}

function isSponsor(value: unknown): value is Sponsor {
	if (typeof value !== "object" || value === null) {
		return false;
	}

	const sponsor = value as Record<string, unknown>;

	return (
		typeof sponsor.id === "string" &&
		typeof sponsor.name === "string" &&
		(sponsor.tier === "gold" ||
			sponsor.tier === "silver" ||
			sponsor.tier === "bronze")
	);
}

export default function PropertySponsors({
	propertyId,
}: {
	propertyId: string;
}) {
	const [sponsors, setSponsors] = useState<Sponsor[]>([]);
	const [state, setState] = useState<"loading" | "ready" | "error">(
		"loading",
	);

useEffect(() => {
	const controller = new AbortController();

		async function loadSponsors() {
			try {
				const response = await fetch(
					`/api/properties/${encodeURIComponent(propertyId)}/sponsors`,
					{ signal: controller.signal, cache: "no-store" },
				);

				if (!response.ok) {
					throw new Error("Sponsor request failed.");
				}

				const body: unknown = await response.json();

				if (typeof body !== "object" || body === null) {
					throw new Error("Invalid sponsor response.");
				}

				const records = (body as Record<string, unknown>).sponsors;

				if (!Array.isArray(records) || !records.every(isSponsor)) {
					throw new Error("Invalid sponsor records.");
				}

				if (!controller.signal.aborted) {
					setSponsors(records);
					setState("ready");
				}
			} catch {
				if (!controller.signal.aborted) {
					setState("error");
				}
			}
		}

		void loadSponsors();

		return () => controller.abort();
	}, [propertyId]);

	return (
		<section
			aria-label="Property sponsors"
			className="mt-4 border-t border-slate-200 pt-4 text-sm text-slate-700"
		>
			<h4 className="font-semibold text-slate-950">Local sponsors</h4>

			{state === "loading" && (
				<p className="mt-2" role="status">
					Loading sponsors…
				</p>
			)}

			{state === "error" && (
				<p className="mt-2" role="status">
					Sponsor information is temporarily unavailable.
				</p>
			)}

			{state === "ready" && sponsors.length === 0 && (
				<p className="mt-2">No active sponsors for this property.</p>
			)}

			{state === "ready" && sponsors.length > 0 && (
				<ul className="mt-2 space-y-2">
					{sponsors.map((sponsor) => (
						<li key={sponsor.id}>
							<span className="font-medium">{sponsor.name}</span>
							{" — "}
							<span className="capitalize">{sponsor.tier}</span>
							{" tier"}
						</li>
					))}
				</ul>
			)}
		</section>
	);
}