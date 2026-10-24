import { createAuthenticatedDatabaseClient } from "@/lib/supabase/authenticated";
import {
	isValidPropertyUpdate,
	type PropertyUpdate,
} from "@/lib/validation/property-update";

const UUID_PATTERN =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function readBearerToken(request: Request): string | null {
	const authorization = request.headers.get("authorization");

	if (!authorization?.startsWith("Bearer ")) {
		return null;
	}

	const token = authorization.slice(7).trim();
	return token.length > 0 ? token : null;
}

export async function PATCH(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	const accessToken = readBearerToken(request);

	if (!accessToken) {
		return Response.json(
			{ error: "Authentication required." },
			{ status: 401 },
		);
	}

	const { id } = await params;

	if (!UUID_PATTERN.test(id)) {
		return Response.json(
			{ error: "Invalid property identifier." },
			{ status: 400 },
		);
	}

	let body: unknown;

	try {
		body = await request.json();
	} catch {
		return Response.json(
			{ error: "Request body must be valid JSON." },
			{ status: 400 },
		);
	}

	if (!isValidPropertyUpdate(body)) {
		return Response.json(
			{ error: "Invalid property update." },
			{ status: 400 },
		);
	}

	try {
		const database =
			createAuthenticatedDatabaseClient(accessToken);

		const {
			data: { user },
			error: authenticationError,
		} = await database.auth.getUser(accessToken);

		if (authenticationError || !user) {
			return Response.json(
				{ error: "Authentication required." },
				{ status: 401 },
			);
		}

		const update: PropertyUpdate = body;

		const { data, error } = await database
			.from("properties")
			.update(update)
			.eq("id", id)
			.select(`
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
				updated_at
			`)
			.maybeSingle();

		if (error) {
			console.error("Unable to update property:", error);
			return Response.json(
				{ error: "Unable to update property." },
				{ status: 500 },
			);
		}

		if (!data) {
			return Response.json(
				{ error: "Property cannot be updated." },
				{ status: 403 },
			);
		}

		return Response.json({ listing: data });
	} catch (error) {
		console.error("Property update route error:", error);
		return Response.json(
			{ error: "Unable to update property." },
			{ status: 500 },
		);
	}
}