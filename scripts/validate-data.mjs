import { readFileSync } from "node:fs";

import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const propertySchema = JSON.parse(
  readFileSync("schemas/property.schema.json", "utf8")
);

const dataFile =
  process.argv[2] ?? "data/generated/properties.raw.json";

const rawResponse = JSON.parse(
  readFileSync(dataFile, "utf8")
);

console.log(`Data file: ${dataFile}`);
console.log("");

if (!Array.isArray(rawResponse.records)) {
  console.error("Validation failed: the raw response must contain records.");
  process.exitCode = 1;
} else {
  const ajv = new Ajv2020({
    allErrors: true,
    strict: true
  });

  addFormats(ajv);

  const validateProperty = ajv.compile(propertySchema);
  let invalidRecordCount = 0;
  let totalErrorCount = 0;

  for (const [index, property] of rawResponse.records.entries()) {
    const valid = validateProperty(property);
    const label = property.property_id ?? `record-${index + 1}`;

    if (valid) {
      console.log(`PASS: ${label}`);
      continue;
    }

    invalidRecordCount++;
    totalErrorCount += validateProperty.errors?.length ?? 0;

    console.error(`FAIL: ${label}`);

    for (const error of validateProperty.errors ?? []) {
      let location = error.instancePath || "/";

      if ("missingProperty" in error.params) {
        location = `${location}/${error.params.missingProperty}`.replace(
          "//",
          "/"
        );
      }

      console.error(`  ${location}: ${error.message}`);
    }
  }

  console.log("");
  console.log(`Records checked: ${rawResponse.records.length}`);
  console.log(`Invalid records: ${invalidRecordCount}`);
  console.log(`Validation errors: ${totalErrorCount}`);

  if (invalidRecordCount > 0) {
    process.exitCode = 1;
  } else {
    console.log("All generated property records are valid.");
  }
}