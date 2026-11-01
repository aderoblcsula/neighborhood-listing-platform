import { createPublicDatabaseClient } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

const UUID_PATTERN =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	const { id } = await params;

	if (!UUID_PATTERN.test(id)) {
		return Response.json(
			{ error: "Invalid property identifier." },
			{ status: 400 },
		);
	}

	try {
		const database = createPublicDatabaseClient();

		const { data: property, error: propertyError } = await database
			.from("properties")
			.select("id")
			.eq("id", id)
			.eq("status", "approved")
			.maybeSingle();

		if (propertyError) {
			throw new Error("Property lookup failed.");
		}

		if (!property) {
			return Response.json(
				{ error: "Property not found." },
				{ status: 404 },
			);
		}

		const { data: links, error: linksError } = await database
			.from("property_sponsors")
			.select("sponsor_id")
			.eq("property_id", id);

		if (linksError) {
			throw new Error("Sponsor links lookup failed.");
		}

		const sponsorIds = (links ?? []).map((link) => link.sponsor_id);

		if (sponsorIds.length === 0) {
			return Response.json({ sponsors: [] });
		}

		const { data: sponsors, error: sponsorsError } = await database
			.from("sponsors")
			.select("id,name,tier")
			.in("id", sponsorIds)
			.eq("active_status", true)
			.order("name");

		if (sponsorsError) {
			throw new Error("Sponsor lookup failed.");
		}

		return Response.json({ sponsors: sponsors ?? [] });
	} catch {
		return Response.json(
			{ error: "Unable to retrieve sponsors." },
			{ status: 500 },
		);
	}
}