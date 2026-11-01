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