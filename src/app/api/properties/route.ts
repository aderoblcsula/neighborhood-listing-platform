import { createPublicDatabaseClient } from "@/lib/supabase/public";
import { createAuthenticatedDatabaseClient } from "@/lib/supabase/authenticated";
import { validatePropertyCreate } from "@/schemas/property";

export const dynamic = "force-dynamic";

const PUBLIC_COLUMNS =
	"id,address,price,bedrooms,bathrooms,square_feet";

export async function GET() {
	try {
		const database = createPublicDatabaseClient();

		const { data, error } = await database
			.from("properties")
			.select(PUBLIC_COLUMNS)
			.eq("status", "approved")
			.order("created_at", { ascending: false });

		if (error) {
			return Response.json(
				{ error: "Unable to retrieve properties." },
				{ status: 500 },
			);
		}

		return Response.json({ properties: data });
	} catch {
		return Response.json(
			{ error: "Unable to retrieve properties." },
			{ status: 500 },
		);
	}
}

export async function POST(request: Request) {
	const authorization = request.headers.get("authorization");
	const accessToken = authorization?.match(/^Bearer\s+(\S+)$/i)?.[1];

	if (!accessToken) {
		return Response.json(
			{ error: "Authentication required." },
			{ status: 401 },
		);
	}

	try {
		const database = createAuthenticatedDatabaseClient(accessToken);

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

		const { data: profile, error: profileError } = await database
			.from("profiles")
			.select("role")
			.eq("id", user.id)
			.maybeSingle();

		if (profileError) {
			return Response.json(
				{ error: "Unable to verify access." },
				{ status: 500 },
			);
		}

		if (profile?.role !== "property_owner") {
			return Response.json(
				{ error: "Property-owner access required." },
				{ status: 403 },
			);
		}

		let body: unknown;

		try {
			body = await request.json();
		} catch {
			return Response.json(
				{
					error: "Invalid request.",
					details: [
						{
							field: "",
							message: "Request body must be valid JSON.",
						},
					],
				},
				{ status: 400 },
			);
		}

		if (!validatePropertyCreate(body)) {
			const details = (validatePropertyCreate.errors ?? []).map(
				(error) => ({
					field: error.instancePath,
					message: error.message ?? "Invalid value.",
					keyword: error.keyword,
				}),
			);

			return Response.json(
				{ error: "Invalid property.", details },
				{ status: 400 },
			);
		}

		// Match the database's trimmed-address constraint.
		if (body.address.trim().length < 5) {
			return Response.json(
				{
					error: "Invalid property.",
					details: [
						{
							field: "/address",
							message: "Address must contain at least five characters after trimming.",
						},
					],
				},
				{ status: 400 },
			);
		}

		const { data, error } = await database
			.from("properties")
			.insert({
				address: body.address.trim(),
				price: body.price,
				bedrooms: body.bedrooms,
				bathrooms: body.bathrooms,
				square_feet: body.square_feet,
				owner_id: user.id,
			})
			.select(`${PUBLIC_COLUMNS},owner_id,status`)
			.single();

		// The database supplies status = 'draft'.
		// The owner's session remains attached, so RLS is enforced.
		if (error) {
			if (error.code === "42501") {
				return Response.json(
					{ error: "Property creation is not permitted." },
					{ status: 403 },
				);
			}

			return Response.json(
				{ error: "Unable to create property." },
				{ status: 500 },
			);
		}

		return Response.json({ property: data }, { status: 201 });
	} catch {
		return Response.json(
			{ error: "Unable to create property." },
			{ status: 500 },
		);
	}
}