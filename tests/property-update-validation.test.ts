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
				review_status: "approved",
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
});