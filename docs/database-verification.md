# Database Configuration and Verification

## Scope

This document records the redacted configuration, migration, RLS, route,
UI, and secret-hygiene verification for the neighborhood listing platform.

All records used during development and testing are fictional. No production
credentials, real stakeholder data, or private user information are included.

## Redacted Environment Configuration

The application expects these variable names:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_URL=
SUPABASE_SECRET_KEY=
```

The repository stores only empty placeholders in `.env.example`.

Real local-development values belong in `.env.local`, which is excluded by
`.gitignore`. The secret key must never use a `NEXT_PUBLIC_` prefix.

### Client Boundaries

| Configuration | Purpose | Boundary |
|---|---|---|
| Publishable key | Anonymous reads and authenticated user operations governed by RLS | May be used by public/client-scoped code |
| Secret key | Trusted administrative database operations | Server-only |
| `public.ts` | Anonymous, RLS-protected reads | Server module using the publishable key |
| `authenticated.ts` | User-scoped operations carrying a verified user token | Server module governed by RLS |
| `admin.ts` | Trusted administrative operations | Server-only and never imported into client components |

The server database modules import `server-only` to prevent accidental client
bundling.

## Versioned Database Files

- Migration:
  `supabase/migrations/20261023050853_create_core_schema.sql`
- Fictional seed:
  `supabase/seed.sql`
- RLS tests:
  `supabase/tests/database/rls.test.sql`

The migration creates:

- `profiles`
- `properties`
- `sponsors`
- `property_sponsors`
- `inquiries`

RLS is enabled on every exposed table. Access defaults to deny unless an
explicit grant and policy permit the operation.

## Access-Control Test Matrix

| Actor | Operation | Expected result | Verified result |
|---|---|---|---|
| Anonymous | Read approved properties | Allowed | Passed |
| Anonymous | Read draft or pending properties | Denied or hidden | Passed |
| Anonymous | Read approved and active sponsors | Allowed | Passed |
| Anonymous | Read profiles | Denied or hidden | Passed |
| Anonymous | Read inquiries | Denied or hidden | Passed |
| Authenticated owner | Create an owned draft | Allowed | Passed |
| Authenticated owner | Edit an owned unapproved property | Allowed | Passed |
| Authenticated owner | Change `owner_id` | Denied | Passed |
| Authenticated owner | Self-approve owned content | Denied | Passed |
| Other authenticated user | Edit another owner's property | Denied | Passed |
| Property owner | Read inquiries for an owned property | Allowed | Passed |
| Unrelated user | Read another owner's inquiries | Denied or hidden | Passed |
| Trusted elevated role | Perform reviewed administrative transition | Allowed only through trusted server execution | Passed |

The pgTAP suite completed 35 tests:

```text
Files=1, Tests=35
Result: PASS
```

## Route Verification

### Approved Listings Read

Endpoint:

```text
GET /api/listings
```

Verified behavior:

- Uses the publishable-key database client.
- Relies on RLS and also filters for `review_status = 'approved'`.
- Selects an explicit allowlist of public columns.
- Does not return `owner_id`.
- Returned HTTP 200 with two approved fictional listings.
- Did not return the seeded unapproved listing.
- Returns a generic error response without exposing database details.

### Validated Owner Update

Endpoint:

```text
PATCH /api/listings/[id]
```

Verified behavior:

- Requires a bearer token.
- Validates user identity through Supabase Auth.
- Uses a user-scoped publishable-key client so RLS remains active.
- Validates request bodies with Ajv.
- Rejects unknown fields.
- Does not allow `owner_id` or `review_status` in the request schema.
- Uses parameterized Supabase query methods.

Observed denial results:

| Request | Result |
|---|---|
| Missing bearer token | HTTP 401 |
| Invalid property identifier | HTTP 400 |
| Attempted `review_status: "approved"` update | HTTP 400 |
| Fake bearer token | HTTP 401 |

## UI Verification

The home page requests approved listings through `GET /api/listings`.

Implemented states:

- Loading state while the request is pending
- Empty state when no approved records are returned
- Safe error state when the database is unavailable
- Success state rendering approved fictional property cards

Observed integration results:

- The safe error state appeared while local Supabase was unavailable.
- The success state rendered two approved fictional property cards after
  Supabase was restarted.

The error state was observed while local Supabase was stopped. After Supabase
was restarted, the same UI returned to the success state without disabling
RLS or changing application code.

## Rebuild Verification

The local database was rebuilt using:

```bash
npx supabase db reset
```

The command applied the numbered migration and fictional seed successfully.

The RLS suite was then executed using:

```bash
npx supabase test db
```

All 35 tests passed. After the rebuild, `GET /api/listings` returned HTTP 200,
and the UI displayed the two approved seeded listings.

## Application Verification

The following checks passed:

```bash
npm test
npm run build
git diff --check
```

Vitest result:

```text
Test Files  4 passed
Tests       13 passed
```

The production build included:

```text
/api/listings
/api/listings/[id]
```

## Secret-Hygiene Verification

The following checks were performed:

- Confirmed `.env.local` is ignored.
- Confirmed only `.env.example` is tracked.
- Searched tracked files for Supabase secret-key and JWT-shaped values.
- Searched Git object history for private environment files.
- Searched Git patch history for secret-shaped values.
- Confirmed all searches returned no secret matches.
- Confirmed `git status --short` returned no unexpected files.

No credentials or private data were included in Git history, screenshots used
for submission, migration records, seed records, tests, or AI prompts.

## AI Review

ChatGPT and Google Gemini independently reviewed the database and RLS plan.
Useful, rejected, and modified recommendations are recorded in
`docs/ai-log.md`.

No AI-generated SQL was accepted or executed without manual inspection and
local verification.