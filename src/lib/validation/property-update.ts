import Ajv2020 from "ajv/dist/2020";

export interface PropertyUpdate {
	title?: string;
	street_address?: string;
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
		street_address: {
			type: "string",
			minLength: 1,
			maxLength: 200,
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
		},
		bedrooms: {
			type: "integer",
			minimum: 0,
		},
		bathrooms: {
			type: "number",
			minimum: 0,
		},
		square_feet: {
			type: "integer",
			minimum: 1,
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

const validate = ajv.compile(propertyUpdateSchema);

export function isValidPropertyUpdate(
	value: unknown,
): value is PropertyUpdate {
	return validate(value);
}