# AI Normalization Review

## Purpose

ChatGPT and Gemini were asked to critique the fictional property-listing data
contract, identify ambiguous rules, compare amenity representations, and
provide valid and invalid validation examples.

No real client, property, sponsor, or personal data was included.

## Prompt

The following prompt was submitted to ChatGPT and Gemini:

> Review the following fictional neighborhood-listing data contract for
> normalization problems and ambiguous business rules.
>
> The system separates Property, Sponsor, and PropertySponsor. Property and
> Sponsor have a many-to-many relationship. PropertySponsor stores
> property_id, sponsor_id, and display_priority. Amenities currently use a
> controlled array of enumerated strings. Unknown fields are rejected, IDs
> follow controlled patterns, ZIP codes contain five digits, numeric values
> cannot be negative, and sponsor references must resolve to existing Sponsor
> records.
>
> Before making recommendations, identify ambiguous business rules. Identify
> normalization problems, compare free-text amenities, controlled values, and
> an Amenity join table, recommend an approach for this classroom application,
> identify rules JSON Schema cannot enforce, and provide one valid and four
> intentionally invalid examples. The invalid examples must cover a missing
> property_id, negative price, bad ZIP code, and unknown field.
>
> Do not claim RESO certification and do not use real data.

## ChatGPT Review

### Useful observations

ChatGPT identified the following useful issues:

- Sponsor details should remain separate from Property records.
- PropertySponsor is necessary because properties and sponsors have a
  many-to-many relationship.
- Referential integrity between sponsor IDs and Sponsor records requires
  application logic or database constraints.
- Unique property IDs across multiple records cannot be guaranteed by the
  schema for one property.
- Duplicate sponsor IDs within one property's relationships require an
  additional business-rule test.
- The meaning and currency of `price` should be documented.
- A controlled amenity list prevents spelling and capitalization variations.
- A separate Amenity entity could be introduced later if amenities require
  descriptions, icons, translations, or administrative management.

### ChatGPT recommendation

Use a controlled array of enumerated amenity strings for the current
classroom application. It is simpler than a join table while still supporting
consistent filtering and validation.

## Gemini Review

### Useful observations

Gemini identified these ambiguous rules:

- Whether `image_src` represents the only image or a primary image.
- Whether inactive sponsors should be hidden or prohibited.
- Whether `display_priority` is global or specific to one property.
- Whether `price` means listing price, sold price, or monthly rent.
- Whether currency is fixed.
- Whether `local_sponsors` duplicates a separate relationship source.

Gemini also correctly recommended a controlled array of enumerated amenity
values for the current classroom application.

Gemini correctly noted that JSON Schema alone cannot guarantee:

- Referential integrity between sponsor relationships and Sponsor records.
- Uniqueness across multiple property records.
- Geographic agreement between city, state, and ZIP code.
- Application-specific cross-record business rules.

## Rejected or Modified AI Suggestions

### Gemini's claimed valid example

Gemini's claimed valid example was rejected because it did not satisfy the
actual project schema. Problems included:

- An uppercase `PROP-101` identifier instead of the required lowercase
  `property-...` pattern.
- Unsupported property type and listing status values.
- Unsupported and incorrectly capitalized amenity values.
- A missing `local_sponsors` field.
- Values that were not checked against the project's exact enum rules.

The project tests and AJV validator, rather than the AI explanation, remain
the source of verification.

### Fully normalized address tables

The suggestion to derive city and state from ZIP code was not adopted. ZIP
codes do not always map cleanly to one city name, and a separate address model
would add unnecessary complexity to this small project.

### Amenity join table

An Amenity and PropertyAmenity join-table design was not adopted for the
current version. It would support amenity metadata and database querying but
would add complexity that the present interface does not require.

### Free-text amenities

Free-text amenities were rejected because inconsistent spelling and
capitalization would reduce reliable filtering and validation.

### Duplicate sponsor representation

The project does not store complete sponsor facts inside Property records.
`local_sponsors` contains relationship data only: `sponsor_id` and
`display_priority`. Complete sponsor facts remain in normalized Sponsor
records.

## Final Decisions

- Amenities use a controlled array of enumerated strings.
- Sponsor facts remain separate from Property.
- `local_sponsors` represents PropertySponsor relationships.
- `display_priority` is scoped to one property-sponsor relationship.
- Only active sponsors are eligible for display.
- `price` represents a fictional USD listing price.
- `image_src` represents the primary card image for the current version.
- Cross-record sponsor references are verified by tests.
- AJV runtime validation is required before data reaches the interface.
- AI-generated examples are not trusted until they pass local validation.

## Verification

The project verified these decisions through:

- AJV validation of five generated property records.
- Validation of all Sponsor records.
- A test confirming that every sponsor reference resolves.
- Required invalid tests for missing ID, negative price, bad ZIP code, and an
  unknown property field.
- A safe UI path that displays no property cards when runtime validation
  reports errors.

## Outcome

The controlled amenity array was selected as the best balance for the current
scope. A join-table design remains a possible future migration if amenities
need their own metadata or database administration.