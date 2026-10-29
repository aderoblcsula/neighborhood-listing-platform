import Ajv2020 from "ajv/dist/2020";

export interface PropertyCreate {
	address: string;
	price: number;
	bedrooms: number;
	bathrooms: number;
	square_feet: number;
}

export const propertyCreateSchema = {
	type: "object",
	additionalProperties: false,
	required: [
		"address",
		"price",
		"bedrooms",
		"bathrooms",
		"square_feet",
	],
	properties: {
		address: {
			type: "string",
			minLength: 5,
			pattern: "\\S",
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
	},
} as const;

const ajv = new Ajv2020({
	allErrors: true,
	strict: true,
	coerceTypes: false,
	removeAdditional: false,
});

export const validatePropertyCreate =
	ajv.compile<PropertyCreate>(propertyCreateSchema);