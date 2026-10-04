import Ajv2020, { type ErrorObject } from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

import generatedPropertyData from "../../data/generated/properties.regenerated.json";
import sponsorData from "../../data/sponsors.json";
import propertySchema from "../../schemas/property.schema.json";
import sponsorSchema from "../../schemas/sponsor.schema.json";

import type { Property, Sponsor } from "@/types";
import type { Property as PropertyContract } from "@/types/generated/property";
import type { Sponsor as SponsorContract } from "@/types/generated/sponsor";

export type ValidationResult = {
  properties: Property[];
  featuredSponsor: Sponsor | null;
  errors: string[];
};

function formatErrors(
  label: string,
  errors: ErrorObject[] | null | undefined
) {
  return (errors ?? []).map((error) => {
    const location = error.instancePath || "/";
    return `${label} ${location}: ${error.message}`;
  });
}

export function validateAndMapData(
  propertySource: unknown,
  sponsorSource: unknown
): ValidationResult {
  const ajv = new Ajv2020({
    allErrors: true,
    strict: true
  });

  addFormats(ajv);

  const validateProperty =
    ajv.compile<PropertyContract>(propertySchema);

  const validateSponsor =
    ajv.compile<SponsorContract>(sponsorSchema);

  const errors: string[] = [];
  const validProperties: PropertyContract[] = [];
  const validSponsors: SponsorContract[] = [];

  const propertyCandidates: unknown[] =
    typeof propertySource === "object" &&
      propertySource !== null &&
      "records" in propertySource &&
      Array.isArray(propertySource.records)
      ? propertySource.records
      : [];

  if (propertyCandidates.length === 0) {
    errors.push("No valid property-record collection was provided.");
  }

  for (const [index, candidate] of propertyCandidates.entries()) {
    if (validateProperty(candidate)) {
      validProperties.push(candidate);
    } else {
      errors.push(
        ...formatErrors(
          `Property record ${index + 1}`,
          validateProperty.errors
        )
      );
    }
  }

  const sponsorCandidates: unknown[] = Array.isArray(sponsorSource)
    ? sponsorSource
    : [];

  if (sponsorCandidates.length === 0) {
    errors.push("No valid sponsor-record collection was provided.");
  }

  for (const [index, candidate] of sponsorCandidates.entries()) {
    if (validateSponsor(candidate)) {
      validSponsors.push(candidate);
    } else {
      errors.push(
        ...formatErrors(
          `Sponsor record ${index + 1}`,
          validateSponsor.errors
        )
      );
    }
  }

  const sponsorIds = new Set(
    validSponsors.map((sponsor) => sponsor.sponsor_id)
  );

  for (const property of validProperties) {
    for (const relationship of property.local_sponsors) {
      if (!sponsorIds.has(relationship.sponsor_id)) {
        errors.push(
          `${property.property_id} references unknown sponsor ` +
          relationship.sponsor_id
        );
      }
    }
  }

  if (errors.length > 0) {
    console.error("Data contract validation failed:", errors);

    return {
      properties: [],
      featuredSponsor: null,
      errors
    };
  }

  const properties: Property[] = validProperties.map((property) => ({
    id: property.property_id,
    title: property.title,
    address:
      `${property.street_address}, ${property.city}, ` +
      `${property.state} ${property.zip_code}`,
    price: property.price,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    squareFeet: property.square_feet,
    imageSrc: property.image_src,
    imageAlt: property.image_alt,
    detailsHref: property.details_href
  }));

  const prioritizedRelationships =
    validProperties[0]?.local_sponsors
      .slice()
      .sort(
        (first, second) =>
          first.display_priority - second.display_priority
      ) ?? [];

  const selectedSponsor = prioritizedRelationships
    .map((relationship) =>
      validSponsors.find(
        (sponsor) =>
          sponsor.sponsor_id === relationship.sponsor_id &&
          sponsor.active
      )
    )
    .find((sponsor) => sponsor !== undefined);

  const featuredSponsor: Sponsor | null = selectedSponsor
    ? {
      id: selectedSponsor.sponsor_id,
      name: selectedSponsor.name,
      description: selectedSponsor.description,
      websiteUrl: selectedSponsor.website_url
    }
    : null;

  return {
    properties,
    featuredSponsor,
    errors: []
  };
}

export const validatedData = validateAndMapData(
  generatedPropertyData,
  sponsorData
);