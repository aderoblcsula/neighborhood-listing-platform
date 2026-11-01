import Ajv2020 from "ajv/dist/2020";

export interface PropertyUpdate {
	title?: string;
	address?: string;
	city?: string;
	state?: string;
	zip_code?: string;
	price?: number;
	bedrooms?: number;
	bathrooms?: number;
	square_feet?: number;
	property_type?: string;
	description?: string;
	image_src?: string;
	image_alt?: string;
}

const propertyUpdateSchema = {
	type: "object",
	minProperties: 1,
	additionalProperties: false,
	properties: {
		title: {
			type: "string",
			minLength: 1,
			maxLength: 120,
		},
		address: {
			type: "string",
			minLength: 5,
			maxLength: 200,
			pattern: "\\S",
		},
		city: {
			type: "string",
			minLength: 1,
			maxLength: 100,
		},
		state: {
			type: "string",
			pattern: "^[A-Z]{2}$",
		},
		zip_code: {
			type: "string",
			pattern: "^\\d{5}(-\\d{4})?$",
		},
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
		property_type: {
			type: "string",
			minLength: 1,
			maxLength: 80,
		},
		description: {
			type: "string",
			minLength: 1,
			maxLength: 5000,
		},
		image_src: {
			type: "string",
			minLength: 1,
			maxLength: 2048,
		},
		image_alt: {
			type: "string",
			minLength: 1,
			maxLength: 200,
		},
	},
} as const;

const ajv = new Ajv2020({
	allErrors: true,
	strict: true,
});

const validate = ajv.compile<PropertyUpdate>(propertyUpdateSchema);

export function isValidPropertyUpdate(
	value: unknown,
): value is PropertyUpdate {
	if (!validate(value)) {
		return false;
	}

	return value.address === undefined || value.address.trim().length >= 5;
}