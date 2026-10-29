import { createPublicDatabaseClient } from "@/lib/supabase/public";

export const dynamic = "force-dynamic";

const LISTING_COLUMNS = `
	id,
	title,
	city,
	state,
	zip_code,
	price,
	bedrooms,
	bathrooms,
	square_feet,
	property_type,
	description,
	image_src,
	image_alt,
	details_href,
	created_at
`;

export async function GET() {
	try {
		const database = createPublicDatabaseClient();

		const { data, error } = await database
			.from("properties")
			.select(LISTING_COLUMNS)
			.eq("review_status", "approved")
			.order("created_at", { ascending: false });

		if (error) {
			console.error("Unable to retrieve approved listings:", error);
			return Response.json(
				{ error: "Unable to retrieve listings." },
				{ status: 500 },
			);
		}

		return Response.json({ listings: data });
	} catch (error) {
		console.error("Listings route configuration error:", error);
		return Response.json(
			{ error: "Unable to retrieve listings." },
			{ status: 500 },
		);
	}
}