# AI Collaboration Log: Data Contract Lab

## Data-Safety Statement

All prompts and generated records used fictional and synthetic information.
No client data, private property data, API keys, credentials, or personal
information was included.

## ChatGPT Collaboration

### Purpose

ChatGPT was used to:

- Interpret the lab requirements.
- Identify the minimum Property, Sponsor, and PropertySponsor facts.
- Propose strict schema constraints.
- Explain TypeScript type erasure and runtime validation.
- Review normalization alternatives.
- Develop validator and test strategies.
- Review failures without silently changing generated data.

### Useful Output

Useful recommendations included:

- Separating Property, Sponsor, and PropertySponsor.
- Using AJV for runtime validation.
- Generating TypeScript types from JSON Schema.
- Rejecting unknown fields.
- Testing missing IDs, negative prices, bad ZIP codes, and unknown fields.
- Using controlled amenity values.
- Returning no UI records when validation fails.

### Rejected or Modified Output

AI suggestions were not accepted automatically. They were checked against:

- The assignment requirements.
- The project schemas.
- Test results.
- Lint and production-build results.
- Existing component interfaces.

Complex normalization options such as an Amenity join table were deferred
because they were unnecessary for the current scope.

## Gemini Structured-Output Experiment

### Initial Prompt

Gemini was asked to generate exactly five fictional property records using an
AI Studio structured-output schema.

The prompt specified:

- Fictional information only.
- Five property records.
- Controlled property and amenity values.
- Fictional sponsor IDs.
- Five-digit ZIP codes.
- Existing local image paths.
- JSON-only output.

### AI Studio Schema Limitations

The strict schema could not be used unchanged in AI Studio's editor.

Observed issues included:

- The editor rejected the `title` schema keyword.
- The editor required a reduced OpenAPI-style schema.
- Constraints unsupported by the editor remained in the strict local schema.
- The AI Studio response used a wrapper object with a `records` array.

The reduced AI-facing schema controlled the generated structure. The strict
AJV schema remained authoritative.

### First Generation Result

The first response produced five records, but every `property_id` began with
`prop-` instead of the required `property-` prefix.

The raw response was preserved in:

`data/generated/properties.raw.json`

The original validator output was preserved in:

`docs/validation-first-run.txt`

No values were silently corrected.

### Prompt Improvement

The follow-up prompt explicitly required:

- The exact `property-` prefix.
- Lowercase letters, digits, and hyphens.
- Unique property IDs.
- A details link ending in the property ID.

The regenerated response was preserved in:

`data/generated/properties.regenerated.json`

All five regenerated records passed AJV validation. The successful validator
output was preserved in:

`docs/validation-regenerated-run.txt`

## Gemini Normalization Critique

Gemini identified useful ambiguities involving:

- Price meaning and currency.
- Image cardinality.
- Inactive sponsor behavior.
- Display-priority scope.
- Sponsor-relationship representation.
- Amenity representation.

Gemini recommended controlled amenity values for this classroom application.

### Rejected Gemini Example

Gemini labeled one sample record as valid, but it violated the actual schema.
Problems included:

- Incorrect property-ID capitalization and prefix.
- Unsupported enum values.
- Incorrect amenity values.
- Missing required sponsor relationships.

The example was rejected. AJV and the automated tests remained the source of
truth.

## Verification

The final implementation was verified with:

- Five valid generated property records.
- Three valid sponsor records.
- Sponsor-reference integrity testing.
- One valid-property test.
- Missing-ID rejection.
- Negative-price rejection.
- Bad-ZIP rejection.
- Unknown-field rejection.
- Runtime safe-failure testing.
- ESLint.
- Next.js production build.
- Browser rendering of five validated cards.

## Related Commits

- `870fb3a` — Define property and sponsor data contracts.
- `bf6c3b8` — Add synthetic data validation and contract tests.
- `0efe761` — Render only validated property data.