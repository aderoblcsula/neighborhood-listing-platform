import { describe, expect, it } from "vitest";

import { validatePropertyCreate } from "../src/schemas/property";

const validProperty = {
	address: "123 Maple Street",
	price: 450000,
	bedrooms: 3,
	bathrooms: 2.5,
	square_feet: 1400,
};

describe("property creation contract", () => {
	it("accepts a valid property", () => {
		expect(validatePropertyCreate(validProperty)).toBe(true);
	});

	it("rejects a missing required field", () => {
		const { address, ...incomplete } = validProperty;
		expect(address).toBe("123 Maple Street");
		expect(validatePropertyCreate(incomplete)).toBe(false);
	});

	it("rejects a string price without coercing it", () => {
		expect(
			validatePropertyCreate({
				...validProperty,
				price: "450000",
			}),
		).toBe(false);
	});

	it.each([
		{ price: -1 },
		{ bedrooms: -1 },
		{ bedrooms: 1.5 },
		{ bathrooms: -1 },
		{ square_feet: 0 },
		{ square_feet: 100.5 },
		{ address: "123" },
		{ address: "     " },
		{ bathrooms: 100 },
		{ price: 10000000000 },
	])("rejects invalid values: %j", (changes) => {
		expect(
			validatePropertyCreate({
				...validProperty,
				...changes,
			}),
		).toBe(false);
	});

	it.each([
		{ owner_id: "someone-else" },
		{ status: "approved" },
		{ role: "admin" },
	])("rejects unauthorized extra fields: %j", (extra) => {
		expect(
			validatePropertyCreate({
				...validProperty,
				...extra,
			}),
		).toBe(false);
	});

	it("provides validation details for a structured error response", () => {
		expect(validatePropertyCreate({})).toBe(false);
		expect(validatePropertyCreate.errors?.length).toBeGreaterThan(0);
	});
});