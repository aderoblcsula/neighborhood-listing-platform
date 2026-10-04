import { readFileSync } from "node:fs";

import Ajv2020, { type ErrorObject } from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { describe, expect, it } from "vitest";

const propertySchema = JSON.parse(
  readFileSync("schemas/property.schema.json", "utf8")
);

const generatedData = JSON.parse(
  readFileSync(
    "data/generated/properties.regenerated.json",
    "utf8"
  )
) as {
  records: Array<Record<string, unknown>>;
};

const ajv = new Ajv2020({
  allErrors: true,
  strict: true
});

addFormats(ajv);

const validateProperty = ajv.compile(propertySchema);
const validFixture = generatedData.records[0];

function hasError(
  errors: ErrorObject[] | null | undefined,
  keyword: string,
  instancePath?: string
) {
  return errors?.some(
    (error) =>
      error.keyword === keyword &&
      (instancePath === undefined ||
        error.instancePath === instancePath)
  );
}

describe("property data contract", () => {
  it("accepts one valid property", () => {
    const property = structuredClone(validFixture);

    expect(validateProperty(property)).toBe(true);
    expect(validateProperty.errors).toBeNull();
  });

  it("rejects a property missing property_id", () => {
    const property = structuredClone(validFixture);
    delete property.property_id;

    expect(validateProperty(property)).toBe(false);
    expect(
      validateProperty.errors?.some(
        (error) =>
          error.keyword === "required" &&
          error.params.missingProperty === "property_id"
      )
    ).toBe(true);
  });

  it("rejects a negative price", () => {
    const property = structuredClone(validFixture);
    property.price = -1;

    expect(validateProperty(property)).toBe(false);
    expect(
      hasError(validateProperty.errors, "minimum", "/price")
    ).toBe(true);
  });

  it("rejects a bad ZIP code", () => {
    const property = structuredClone(validFixture);
    property.zip_code = "90A01";

    expect(validateProperty(property)).toBe(false);
    expect(
      hasError(validateProperty.errors, "pattern", "/zip_code")
    ).toBe(true);
  });

  it("rejects an unknown property field", () => {
    const property = structuredClone(validFixture);
    property.unexpected_field = "not allowed";

    expect(validateProperty(property)).toBe(false);
    expect(
      validateProperty.errors?.some(
        (error) =>
          error.keyword === "additionalProperties" &&
          error.params.additionalProperty === "unexpected_field"
      )
    ).toBe(true);
  });
});