import Ajv2020 from "ajv/dist/2020";
import { authorizeAdmin } from "@/lib/supabaseServer";

const uuid = {
	type: "string",
	pattern:
		"^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$",
};

const nullableText = (minLength: number, maxLength: number) => ({
	type: ["string", "null"],
	minLength,
	maxLength,
});

const legacyStatus = {
	type: "string",
	enum: ["draft", "pending_review", "rejected", "approved", "archived"],
};

const resources = {
	profiles: {
		keys: ["id"],
		required: ["id"],
		fields: {
			id: uuid,
			display_name: nullableText(2, 100),
			role: {
				type: "string",
				enum: ["admin", "property_owner", "sponsor", "public"],
			},
		},
	},
	properties: {
		keys: ["id"],
		required: [
			"owner_id",
			"address",
			"price",
			"bedrooms",
			"bathrooms",
			"square_feet",
		],
		fields: {
			id: uuid,
			owner_id: uuid,
			address: { type: "string", minLength: 5 },
			price: {
				type: "number",
				minimum: 0,
				maximum: 9999999999.99,
			},
			bedrooms: {
				type: "integer",
				minimum: 0,
				maximum: 2147483647,
			},
			bathrooms: {
				type: "number",
				minimum: 0,
				maximum: 99.9,
			},
			square_feet: {
				type: "integer",
				minimum: 1,
				maximum: 2147483647,
			},
			status: {
				type: "string",
				enum: ["draft", "pending", "approved", "rejected"],
			},
			rejection_reason: nullableText(1, 500),
			accepts_inquiries: { type: "boolean" },
			availability_status: {
				type: "string",
				enum: ["available", "pending", "sold"],
			},
			title: nullableText(1, 100),
			city: nullableText(1, 80),
			state: {
				type: ["string", "null"],
				pattern: "^[A-Z]{2}$",
			},
			zip_code: {
				type: ["string", "null"],
				pattern: "^[0-9]{5}$",
			},
			property_type: {
				type: ["string", "null"],
				enum: [
					null,
					"single-family",
					"townhome",
					"condominium",
					"apartment",
					"cottage",
				],
			},
			description: nullableText(20, 500),
			image_src: nullableText(1, 2048),
			image_alt: nullableText(1, 200),
			details_href: nullableText(1, 2048),
			amenities: {
				type: ["array", "null"],
				minItems: 1,
				items: {
					type: "string",
					enum: [
						"accessible-entry",
						"air-conditioning",
						"balcony",
						"community-garden",
						"garage",
						"hardwood-floors",
						"laundry",
						"patio",
						"pool",
						"solar-panels",
					],
				},
			},
		},
	},
	sponsors: {
		keys: ["id"],
		required: ["name", "tier"],
		fields: {
			id: uuid,
			owner_id: { ...uuid, type: ["string", "null"] },
			name: { type: "string", minLength: 2, maxLength: 100 },
			tier: { type: "string", enum: ["gold", "silver", "bronze"] },
			active_status: { type: "boolean" },
			category: {
				type: ["string", "null"],
				enum: [
					null,
					"education",
					"financial-services",
					"food-and-dining",
					"health-and-wellness",
					"home-services",
					"nonprofit",
					"retail",
				],
			},
			description: nullableText(20, 300),
			website_url: nullableText(1, 2048),
			review_status: legacyStatus,
			rejection_reason: nullableText(1, 500),
		},
	},
	property_sponsors: {
		keys: ["property_id", "sponsor_id"],
		required: ["property_id", "sponsor_id"],
		fields: {
			property_id: uuid,
			sponsor_id: uuid,
			display_priority: {
				type: ["integer", "null"],
				minimum: 1,
				maximum: 2147483647,
			},
			review_status: legacyStatus,
			active: { type: "boolean" },
			rejection_reason: nullableText(1, 500),
		},
	},
	inquiries: {
		keys: ["id"],
		required: ["property_id", "inquirer_email", "message"],
		fields: {
			id: uuid,
			property_id: uuid,
			inquirer_email: {
				type: "string",
				minLength: 3,
				maxLength: 254,
				pattern: "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$",
			},
			message: { type: "string", minLength: 10, maxLength: 3000 },
			sender_name: nullableText(2, 100),
		},
	},
};

type Resource = keyof typeof resources;
type Context = { params: Promise<{ resource: string }> };
type RecordData = Record<string, unknown>;

const ajv = new Ajv2020({
	allErrors: true,
	strict: true,
	coerceTypes: false,
	removeAdditional: false,
});

function buildValidators(resource: Resource) {
	const config = resources[resource];
	const updateFields = Object.fromEntries(
		Object.entries(config.fields).filter(
			([field]) => !config.keys.some((key) => key === field),
		),
	);

	return {
		create: ajv.compile<RecordData>({
			type: "object",
			additionalProperties: false,
			required: config.required,
			properties: config.fields,
		}),
		update: ajv.compile<RecordData>({
			type: "object",
			minProperties: 1,
			additionalProperties: false,
			properties: updateFields,
		}),
		key: ajv.compile<Record<string, string>>({
			type: "object",
			additionalProperties: false,
			required: config.keys,
			properties: Object.fromEntries(
				config.keys.map((key) => [key, uuid]),
			),
		}),
	};
}

const validators = {
	profiles: buildValidators("profiles"),
	properties: buildValidators("properties"),
	sponsors: buildValidators("sponsors"),
	property_sponsors: buildValidators("property_sponsors"),
	inquiries: buildValidators("inquiries"),
};

function failure(message: string, status: number) {
	return Response.json(
		{ error: message },
		{
			status,
			headers: { "Cache-Control": "no-store" },
		},
	);
}

function success(data: unknown, status = 200) {
	return Response.json(data, {
		status,
		headers: { "Cache-Control": "no-store" },
	});
}

function databaseFailure(code: string) {
	if (code === "23503" || code === "23505") {
		return failure("Operation conflicts with existing or referenced records.", 409);
	}

	if (code.startsWith("22") || code === "23502" || code === "23514") {
		return failure("Record violates a database constraint.", 400);
	}

	return failure("Unable to complete administrator operation.", 500);
}

async function handle(request: Request, context: Context) {
	const authorization = await authorizeAdmin(request);

	if (!authorization.ok) {
		authorization.response.headers.set("Cache-Control", "no-store");
		return authorization.response;
	}

	const { resource: requestedResource } = await context.params;

	if (!Object.prototype.hasOwnProperty.call(resources, requestedResource)) {
		return failure("Unknown administrator resource.", 404);
	}

	const resource = requestedResource as Resource;
	const config = resources[resource];
	const checks = validators[resource];
	const method = request.method;
	const params = new URL(request.url).searchParams;

	const allowedParameters: string[] =
		method === "GET"
			? [...config.keys, "limit", "offset"]
			: method === "POST"
				? []
				: [...config.keys];

	for (const name of params.keys()) {
		if (
			!allowedParameters.includes(name) ||
			params.getAll(name).length !== 1
		) {
			return failure("Invalid or repeated query parameter.", 400);
		}
	}

	const key = Object.fromEntries(
		config.keys
			.filter((name) => params.has(name))
			.map((name) => [name, params.get(name)]),
	);

	const hasKey = Object.keys(key).length > 0;
	const needsKey = method === "PATCH" || method === "DELETE";

	if ((hasKey || needsKey) && !checks.key(key)) {
		return failure("Provide the complete valid record identifier.", 400);
	}

	const limitText = params.get("limit") ?? "50";
	const offsetText = params.get("offset") ?? "0";
	const limit = Number(limitText);
	const offset = Number(offsetText);

	if (
		method === "GET" &&
		(!/^\d+$/.test(limitText) ||
			!/^\d+$/.test(offsetText) ||
			!Number.isSafeInteger(limit) ||
			!Number.isSafeInteger(offset) ||
			limit < 1 ||
			limit > 100 ||
			offset < 0 ||
			offset > 1000000)
	) {
		return failure("Use limit 1–100 and offset 0–1000000.", 400);
	}

	const columns = [
		...Object.keys(config.fields),
		"created_at",
		...(resource === "inquiries" ? [] : ["updated_at"]),
	].join(",");

	try {
		const table = authorization.database.from(resource);

		if (method === "GET") {
			let query = table.select(columns);

			for (const [field, value] of Object.entries(key)) {
				query = query.eq(field, value);
			}

			for (const field of config.keys) {
				query = query.order(field, { ascending: true });
			}

			const { data, error } = await query.range(offset, offset + limit - 1);

			if (error) return databaseFailure(error.code);
			return success({ records: data });
		}

		if (method === "DELETE") {
			let query = table.delete();

			for (const [field, value] of Object.entries(key)) {
				query = query.eq(field, value);
			}

			const { data, error } = await query
				.select(config.keys.join(","))
				.maybeSingle();

			if (error) return databaseFailure(error.code);
			if (!data) return failure("Record not found.", 404);

			return success({ deleted: data });
		}

		let body: unknown;

		try {
			body = await request.json();
		} catch {
			return failure("Request body must be valid JSON.", 400);
		}

		const validate = method === "POST" ? checks.create : checks.update;

		if (!validate(body)) {
			return failure("Invalid administrator record payload.", 400);
		}

		// Normalize top-level text before rechecking its length and format.
		const record: RecordData = Object.fromEntries(
			Object.entries(body).map(([field, value]) => [
				field,
				typeof value === "string" ? value.trim() : value,
			]),
		);

		if (!validate(record)) {
			return failure("Invalid administrator record payload.", 400);
		}

		if (method === "POST") {
			const { data, error } = await table
				.insert(record)
				.select(columns)
				.single();

			if (error) return databaseFailure(error.code);
			return success({ record: data }, 201);
		}

		let query = table.update(record);

		for (const [field, value] of Object.entries(key)) {
			query = query.eq(field, value);
		}

		const { data, error } = await query.select(columns).maybeSingle();

		if (error) return databaseFailure(error.code);
		if (!data) return failure("Record not found.", 404);

		return success({ record: data });
	} catch {
		return failure("Unable to complete administrator operation.", 500);
	}
}

export async function GET(request: Request, context: Context) {
	return handle(request, context);
}

export async function POST(request: Request, context: Context) {
	return handle(request, context);
}

export async function PATCH(request: Request, context: Context) {
	return handle(request, context);
}

export async function DELETE(request: Request, context: Context) {
	return handle(request, context);
}