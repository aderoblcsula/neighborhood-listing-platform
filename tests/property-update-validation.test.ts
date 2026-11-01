import { describe, expect, it } from "vitest";

import { isValidPropertyUpdate } from "../src/lib/validation/property-update";

describe("property update validation", () => {
	it("accepts an allowed partial update", () => {
		expect(
			isValidPropertyUpdate({
				title: "Updated fictional listing",
				price: 450000,
			}),
		).toBe(true);
	});

	it("rejects an empty update", () => {
		expect(isValidPropertyUpdate({})).toBe(false);
	});

	it("rejects an attempt to change ownership", () => {
		expect(
			isValidPropertyUpdate({
				owner_id: "22222222-2222-2222-2222-222222222222",
			}),
		).toBe(false);
	});

	it("rejects an attempt to approve a listing", () => {
		expect(
			isValidPropertyUpdate({
				status: "approved",
			}),
		).toBe(false);
	});

	it("rejects invalid field types", () => {
		expect(
			isValidPropertyUpdate({
				price: "450000",
			}),
		).toBe(false);
	});
	it("accepts the current address field", () => {
	expect(
		isValidPropertyUpdate({ address: "123 Fictional Maple Street" }),
	).toBe(true);
	});
	it("rejects the retired street_address field", () => {
	expect(
		isValidPropertyUpdate({ street_address: "123 Fictional Maple Street" }),
	).toBe(false);
	});
	it("rejects the retired review_status field", () => {
	expect(
		isValidPropertyUpdate({ review_status: "approved" }),
	).toBe(false);
	});
	it.each(["", "    ", "1234", "   A   "])(
	"rejects an invalid address: %j",
	(address) => {
		expect(isValidPropertyUpdate({ address })).toBe(false);
	},
	);
	it("accepts numeric boundary values", () => {
	expect(
		isValidPropertyUpdate({
			price: 9999999999.99,
			bedrooms: 2147483647,
			bathrooms: 99.9,
			square_feet: 2147483647,
		}),
	).toBe(true);

	expect(
		isValidPropertyUpdate({
			price: 0,
			bedrooms: 0,
			bathrooms: 0,
			square_feet: 1,
		}),
	).toBe(true);
	});

	it.each([
		{ price: -1 },
		{ price: 10000000000 },
		{ bedrooms: -1 },
		{ bedrooms: 1.5 },
		{ bedrooms: 2147483648 },
		{ bathrooms: -1 },
		{ bathrooms: 100 },
		{ square_feet: 0 },
		{ square_feet: 1.5 },
		{ square_feet: 2147483648 },
	])("rejects an out-of-range or noninteger update: %j", (payload) => {
		expect(isValidPropertyUpdate(payload)).toBe(false);
	});
});