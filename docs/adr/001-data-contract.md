# ADR 001: Property Data Contract and Runtime Validation

- Status: Accepted
- Date: 2026-10-04

## Context

The neighborhood-listing platform displays AI-generated property and sponsor
data. Data received from an AI model, JSON file, API, or database cannot be
trusted solely because it resembles the expected TypeScript structure.

The application requires:

- Explicit Property, Sponsor, and PropertySponsor concepts.
- Strict validation before records reach the interface.
- Five synthetic property records.
- Consistent property and sponsor identifiers.
- Rejection of missing, malformed, negative, and unknown values.
- TypeScript support without duplicating the contract manually.
- Safe behavior when validation fails.
- Documentation of AI Studio's structured-output limitations.

TypeScript types provide compile-time checking, but they are removed from the
generated JavaScript through type erasure. Therefore, TypeScript alone cannot
validate JSON while the application is running.

## Decision

### JSON Schema is the source of truth

The project uses strict JSON Schema files for Property and Sponsor.

The schemas define:

- Required fields.
- Data types.
- Minimum values.
- String patterns.
- Enumerations.
- URI formats.
- Array requirements.
- `additionalProperties: false`.

### Runtime validation uses AJV

AJV validates property and sponsor data at runtime before the data is mapped
to component props.

`ajv-formats` validates URI-formatted fields.

If any property, sponsor, or sponsor reference is invalid:

- No unvalidated property cards are displayed.
- The page displays a safe, user-facing unavailable message.
- Technical validation details remain in server logs and test evidence.

### TypeScript types are generated from JSON Schema

`json-schema-to-typescript` generates Property and Sponsor TypeScript types
from the schemas.

This approach reduces drift between compile-time types and runtime rules. The
generated files are not manually edited.

### Property, Sponsor, and PropertySponsor remain separate

Property stores listing facts.

Sponsor stores reusable local-organization facts.

PropertySponsor represents the many-to-many relationship using:

- `property_id`
- `sponsor_id`
- `display_priority`

In JSON property records, `local_sponsors` contains only the relationship
fields. It does not repeat sponsor names, descriptions, categories, or URLs.

`display_priority` applies to the sponsor's position for one property, not as
a global sponsor ranking.

Only active sponsors are eligible for display.

### Amenities use controlled values

Amenities use an array of enumerated strings.

This prevents inconsistent values such as:

- `Pool`
- `pool`
- `swimming pool`
- `SwimmingPool`

A controlled array is appropriate for the project's small size and static
amenity list.

### Price and image meanings

`price` represents a fictional listing price in United States dollars.

`image_src` and `image_alt` represent the primary image used by the property
card. Multiple-image galleries are outside the current scope.

### AI Studio uses a reduced schema

Google AI Studio accepted only a subset of the strict project schema.

The AI-facing schema omits constraints that its editor rejected or did not
support. The complete AJV schema remains authoritative.

The first generated records failed the strict property-ID pattern. The raw
response was preserved, the validator errors were recorded, and the prompt
was improved. The regenerated records then passed local validation.

## Alternatives Considered

### Manually maintained TypeScript interfaces

Rejected because independently maintained interfaces can drift away from
runtime validation rules. TypeScript interfaces also cannot validate external
JSON after type erasure.

### Zod as the single source of truth

Zod could provide runtime validation and inferred TypeScript types. It was
not selected because this assignment explicitly emphasizes JSON Schema and
structured-output experimentation.

### Free-text amenities

Rejected because free text produces inconsistent spelling, capitalization,
and terminology, making validation and filtering unreliable.

### Amenity and PropertyAmenity tables

Deferred because join tables add complexity that the current application does
not require. This option becomes appropriate if amenities need icons,
descriptions, translations, analytics, or administrative management.

### Complete sponsors nested in each property

Rejected because repeating sponsor facts would create update anomalies and
inconsistent copies of names, descriptions, and URLs.

### Rendering partially valid data

Rejected for this version. The application uses an all-or-nothing safe failure
policy so users never see a dataset that only partially passed validation.

## Consequences

### Positive

- Invalid external data is rejected before rendering.
- Runtime and compile-time expectations originate from the same schemas.
- Unknown fields are rejected.
- AI output remains auditable.
- Sponsor information is not duplicated in property records.
- Required invalid cases are covered by automated tests.
- The UI fails safely.

### Negative

- AJV and type-generation tools add dependencies.
- Generated types create additional repository files.
- The AI Studio schema must be maintained as a reduced representation.
- Controlled amenity values require schema changes when new amenities are
  introduced.
- All-or-nothing failure can hide otherwise valid records if one record fails.

## Future Considerations

The project may later:

- Introduce Amenity and PropertyAmenity tables.
- Add a PropertyImage entity for image galleries.
- Store prices in integer cents with an explicit currency field.
- Enforce database foreign keys and composite uniqueness.
- Map selected fields to relevant RESO concepts without claiming
  certification.