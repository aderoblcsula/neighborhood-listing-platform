import Ajv2020 from "ajv/dist/2020";

import { createPublicDatabaseClient } from "@/lib/supabaseServer";

interface InquiryInput {
	property_id: string;
	inquirer_email: string;
	message: string;
}

const ajv = new Ajv2020({
	allErrors: true,
	strict: true,
	coerceTypes: false,
	removeAdditional: false,
});

const validateInquiry = ajv.compile<InquiryInput>({
	type: "object",
	additionalProperties: false,
	required: ["property_id", "inquirer_email", "message"],
	properties: {
		property_id: {
			type: "string",
			pattern:
				"^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$",
		},
		inquirer_email: {
			type: "string",
			minLength: 3,
			maxLength: 254,
			pattern: "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$",
		},
		message: {
			type: "string",
			minLength: 10,
			maxLength: 3000,
		},
	},
});

export async function POST(request: Request) {
	let body: unknown;

	try {
		body = await request.json();
	} catch {
		return Response.json(
			{ error: "Request body must be valid JSON." },
			{ status: 400 },
		);
	}

	if (!validateInquiry(body)) {
		return Response.json(
			{
				error: "Invalid inquiry.",
				details: (validateInquiry.errors ?? []).map((error) => ({
					field: error.instancePath,
					message: error.message ?? "Invalid value.",
				})),
			},
			{ status: 400 },
		);
	}

	const message = body.message.trim();

	if (message.length < 10) {
		return Response.json(
			{ error: "Message must contain at least ten characters after trimming." },
			{ status: 400 },
		);
	}

	try {
		// Anonymous client: database grants and RLS remain active.
		const database = createPublicDatabaseClient();

		const { data: property, error: propertyError } = await database
			.from("properties")
			.select("id")
			.eq("id", body.property_id)
			.eq("status", "approved")
			.eq("accepts_inquiries", true)
			.maybeSingle();

		if (propertyError) {
			return Response.json(
				{ error: "Unable to submit inquiry." },
				{ status: 500 },
			);
		}

		if (!property) {
			return Response.json(
				{ error: "Property is unavailable for inquiries." },
				{ status: 404 },
			);
		}

		const { error } = await database.from("inquiries").insert({
			property_id: body.property_id,
			inquirer_email: body.inquirer_email,
			message,
		});

		// Do not append .select(): anonymous callers cannot read inquiries.
		if (error) {
			return Response.json(
				{ error: "Unable to submit inquiry." },
				{ status: error.code === "42501" ? 403 : 500 },
			);
		}

		return Response.json(
			{ message: "Your inquiry was submitted." },
			{ status: 201 },
		);
	} catch {
		return Response.json(
			{ error: "Unable to submit inquiry." },
			{ status: 500 },
		);
	}
}