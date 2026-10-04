import { readFileSync } from "node:fs";

import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { describe, expect, it } from "vitest";

type SponsorRecord = {
  sponsor_id: string;
};

type SponsorRelationship = {
  sponsor_id: string;
  display_priority: number;
};

type PropertyRecord = {
  property_id: string;
  local_sponsors: SponsorRelationship[];
};

const sponsorSchema = JSON.parse(
  readFileSync("schemas/sponsor.schema.json", "utf8")
);

const sponsors = JSON.parse(
  readFileSync("data/sponsors.json", "utf8")
) as SponsorRecord[];

const propertyData = JSON.parse(
  readFileSync(
    "data/generated/properties.regenerated.json",
    "utf8"
  )
) as {
  records: PropertyRecord[];
};

const ajv = new Ajv2020({
  allErrors: true,
  strict: true
});

addFormats(ajv);

const validateSponsor = ajv.compile(sponsorSchema);

describe("sponsor data contract", () => {
  it("accepts every sponsor record", () => {
    for (const sponsor of sponsors) {
      const valid = validateSponsor(sponsor);

      expect(
        valid,
        JSON.stringify(validateSponsor.errors)
      ).toBe(true);
    }
  });

  it("resolves every property sponsor reference", () => {
    const sponsorIds = new Set(
      sponsors.map((sponsor) => sponsor.sponsor_id)
    );

    for (const property of propertyData.records) {
      for (const relationship of property.local_sponsors) {
        expect(
          sponsorIds.has(relationship.sponsor_id),
          `${property.property_id} references unknown sponsor ` +
            relationship.sponsor_id
        ).toBe(true);
      }
    }
  });
});