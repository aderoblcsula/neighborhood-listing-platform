## Practical Exam Verification

Environment: local Supabase through Docker and Next.js at localhost:3000.

### Database Authorization

Command: `npx supabase test db`

Observed result: 36 tests passed.

Coverage includes anonymous visibility, owner isolation, draft/rejected
updates, blocked pending/approved updates, inquiry permissions,
privilege-escalation denial, sponsor-link visibility, and cascading deletion.

### Properties API

| Test | Expected | Observed | Verdict |
|---|---|---|---|
| Anonymous GET | Approved properties only | HTTP 200; two approved seeded properties | PASS |
| POST without authentication | Denied | HTTP 401 | PASS |
| Owner submits valid property | Created | HTTP 201 | PASS |
| Created record ownership/status | Signed-in owner; draft | Both verified | PASS |
| String price | Validation failure | HTTP 400 with details | PASS |
| Negative price | Validation failure | HTTP 400 with details | PASS |
| Missing address | Validation failure | HTTP 400 with details | PASS |
| Extra status field | Validation failure | HTTP 400 with details | PASS |
| Malformed JSON | Validation failure | HTTP 400 with details | PASS |
| Authenticated public-role POST | Denied | HTTP 403 | PASS |
| Public GET after draft creation | Draft hidden | Created ID absent | PASS |

### Remaining Verification

- Administrator management coverage beyond property approval.
- Accessible UI and keyboard behavior.
- Hosted deployment behavior.
- Reproducibility from the complete migration sequence and updated seed.

### Administrator Approval Route

Endpoint: POST /api/admin/properties/[id]/approve

Verified locally using authenticated owner and administrator accounts.

| Test | Observed result | Verdict |
|---|---|---|
| Anonymous approval request | HTTP 401 | PASS |
| Owner approval request | HTTP 403 | PASS |
| State after denied requests | Property remained draft | PASS |
| Administrator approval request | HTTP 200 | PASS |
| Read property after approval | Approved status persisted | PASS |
| Anonymous GET after approval | Approved property included | PASS |

This verifies authorization for the property-approval operation.
It does not establish full administrator CRUD coverage across all five tables.

### Property Card Accessibility and Responsive Layout

Verified locally in Microsoft Edge device emulation.

| Check | Result | Evidence |
|---|---|---|
| 390px viewport | One column | Screenshot |
| 800px viewport | Two columns | Screenshot |
| 1280px viewport | Three columns | Screenshot |
| Tab / Shift+Tab | Controls reachable in both directions | Manual keyboard test |
| Visible keyboard focus | Focus indicator visible | Manual keyboard test |
| Enter / Space | Property details expand and collapse | Manual keyboard test |

Property cards use article, header, heading, and list elements.
Details buttons expose aria-expanded and aria-controls.

These checks cover the exam component requirements, not a complete
WCAG conformance audit.

### Anonymous inquiry verification

- Valid inquiry to an approved property accepting inquiries returned HTTP 201.
- A message shorter than 10 characters returned HTTP 400.
- An inquiry targeting a draft property returned HTTP 404.
- An approved property with inquiries disabled returned HTTP 404.
- GET /api/inquiries returned HTTP 405.
- Browser verification confirmed success feedback and cleared fields after
  successful submission; unavailable-property feedback retained entered values.
- npm run lint completed with zero errors and two existing warnings for unused
  ESLint-disable directives in generated type files.
- npm run build passed.

### Owner PATCH compatibility verification

- Updated the PATCH validator to accept `address` after the exam migration
  renamed `street_address`.
- Added numeric upper bounds and trimmed-address length validation.
- Included `address` in the PATCH response.
- All 23 property-update validation tests passed.
- Authenticated owner PATCH returned HTTP 200; an independent database
  read confirmed the updated address and price.
- Ownership and draft status remained unchanged.
- Self-approval, the retired `street_address` field, and an out-of-range
  numeric value each returned HTTP 400.
- Anonymous PATCH returned HTTP 401.
- Lint completed with zero errors and two existing generated-file warnings.
- Production build passed.
- This API run did not test cross-owner updates.
- Authenticated public-role PATCH returned HTTP 403.
- Owner reads before and after the denied request confirmed that address,
  price, status, ownership, and updated_at remained unchanged.
- This check verifies public-role denial; it does not verify API denial
  for a different property-owner account.

### Administrator management verification

- Tested /api/admin/[resource] for profiles, properties, sponsors,
  property_sponsors, and inquiries.
- Anonymous requests returned HTTP 401 for GET, POST, PATCH, and DELETE.
- Authenticated owner requests returned HTTP 403 for all four methods,
  including POST/PATCH bodies claiming role = admin.
- Administrator GET requests returned HTTP 200 with no-store caching.
- Unknown resources returned HTTP 404; invalid query parameters returned
  HTTP 400.
- Administrator creation returned HTTP 201 for all five tables.
- Separate GET requests confirmed created values persisted.
- Administrator updates returned HTTP 200 for all five tables.
- Separate GET requests confirmed updated values persisted.
- Deleting a profile that owned a property returned HTTP 409, and the
  profile remained present.
- Administrator deletion returned HTTP 200 for all five tables.
- Follow-up reads confirmed the deleted records were absent.
- Disposable application records were removed in dependency order.
  The dedicated Auth test user was retained.
- Lint reported zero errors and two existing generated-file warnings.
- Production build passed.

These results verify the exercised API operations and constraints;
they are not an exhaustive security audit.