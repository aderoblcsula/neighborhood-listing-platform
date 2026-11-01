import { authorizeAdmin } from "@/lib/supabaseServer";

const UUID_PATTERN =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	const authorization = await authorizeAdmin(request);

	if (!authorization.ok) {
		return authorization.response;
	}

	const { id } = await params;

	if (!UUID_PATTERN.test(id)) {
		return Response.json(
			{ error: "Invalid property identifier." },
			{ status: 400 },
		);
	}

	try {
		const { data, error } = await authorization.database
			.from("properties")
			.update({
				status: "approved",
				rejection_reason: null,
			})
			.eq("id", id)
			.select("id,status")
			.maybeSingle();

		if (error) {
			return Response.json(
				{ error: "Unable to approve property." },
				{ status: 500 },
			);
		}

		if (!data) {
			return Response.json(
				{ error: "Property not found." },
				{ status: 404 },
			);
		}

		return Response.json({ property: data });
	} catch {
		return Response.json(
			{ error: "Unable to approve property." },
			{ status: 500 },
		);
	}
}