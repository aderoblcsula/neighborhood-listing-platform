import { describe, expect, it, vi } from "vitest";

import generatedPropertyData from "../data/generated/properties.regenerated.json";
import sponsorData from "../data/sponsors.json";
import { validateAndMapData } from "../src/lib/validated-data";

describe("runtime data safety", () => {
  it("returns no UI records when one property is invalid", () => {
    const invalidPropertyData = structuredClone(
      generatedPropertyData
    );

    invalidPropertyData.records[0].price = -1;

    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);

    const result = validateAndMapData(
      invalidPropertyData,
      sponsorData
    );

    expect(result.properties).toEqual([]);
    expect(result.featuredSponsor).toBeNull();
    expect(result.errors.length).toBeGreaterThan(0);
    expect(
      result.errors.some((error) => error.includes("/price"))
    ).toBe(true);

    consoleError.mockRestore();
  });
});