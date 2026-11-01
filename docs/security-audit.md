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