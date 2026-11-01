# Practical Exam Requirements

Feature: Sponsor-Backed Property Listing & Inquiry Subsystem
Branch: exam/practical-persistence-eval

## Implementation Status

These requirements define the target behavior for the practical exam.
Implementation and verification are tracked separately in
docs/security-audit.md.

## US-01 — Submit and Manage Property Drafts

As a registered property owner, I want to submit listing drafts so that
prospective buyers can review them once verified by administrative staff.

Scope: Medium
Application role: property_owner

### Acceptance Criteria

1. Given an authenticated property owner and a valid listing payload,
   when the owner submits the listing,
   then the server saves it with status = 'draft' and owner_id equal
   to the verified user's auth.uid(), returning HTTP 201.

2. Given a payload with missing required fields, invalid values,
   or unknown fields,
   when it is submitted,
   then the server returns HTTP 400 with structured validation errors
   and creates no record.

3. Given an anonymous caller or an authenticated user without the
   property_owner role,
   when the caller attempts to create a listing through the owner route,
   then the request is denied.

4. Given an owner editing their own draft or rejected listing,
   when valid permitted changes are submitted,
   then the changes succeed.

5. Given another owner's listing, or an owner's pending or approved
   listing,
   when the owner attempts an update,
   then no changes are made.

6. Given an owner attempting to change owner_id or approve their listing,
   when the request reaches either the API or database,
   then the unauthorized change is rejected.

7. Given an owner deleting a property,
   when the property belongs to that owner,
   then deletion is permitted; deletion of another owner's property
   is denied.

### Planned Implementation Links

- Migration:
  ../supabase/migrations/20261029140000_exam_schema_persistence.sql
- Creation route:
  ../src/app/api/properties/route.ts
- Existing update route to review and adapt:
  ../src/app/api/listings/[id]/route.ts
- Input contract:
  ../src/schemas/property.ts

## US-02 — Browse Sponsored Properties and Submit Inquiries

As a prospective neighborhood resident, I want to view approved
properties alongside their tier-level sponsors and submit an inquiry
without seeing prior inquiries from other users.

Scope: Large
Application roles: anonymous/public; property_owner for inquiry review

### Acceptance Criteria

1. Given an anonymous visitor,
   when public listings are requested,
   then only approved properties are returned.

2. Given a property associated with active and inactive sponsors,
   when sponsorship information is displayed,
   then only active sponsors and their tier levels are shown.

3. Given a draft, pending, or rejected property,
   when an anonymous visitor requests public listings or sponsorship
   links for that property,
   then the property and its links are not exposed.

4. Given an anonymous visitor with a valid inquiry,
   when the visitor submits a property reference, valid email,
   and a message of at least 10 characters,
   then the inquiry is stored without requiring sign-in.

5. Given an anonymous visitor or an ordinary inquirer,
   when they attempt to read stored inquiries,
   then no inquiry records are disclosed.

6. Given an authenticated property owner,
   when the owner reads inquiries,
   then only inquiries linked to properties they own are available.

7. Given a keyboard user viewing the listing grid,
   when navigating with Tab, Shift+Tab, Enter, and Space as appropriate,
   then controls have visible focus and their actions work.

8. Given mobile, tablet, and desktop viewports,
   when the listing grid is displayed,
   then it uses one, two, and three columns respectively.

### Planned Implementation Links

- Migration:
  ../supabase/migrations/20261029140000_exam_schema_persistence.sql
- Public properties route:
  ../src/app/api/properties/route.ts
- Inquiry submission route:
  ../src/app/api/inquiries/route.ts
- Sponsor lookup and owner inquiry reads:
  RLS-protected Supabase queries
- Property card:
  ../src/components/PropertyCard.tsx
- Grid:
  ../src/components/ListingsSection.tsx

## US-03 — Administer Platform Records

As a platform administrator, I want full override authority across
application records and tables to conduct compliance audits.

Scope: Large
Application role: admin

### Acceptance Criteria

1. Given a verified administrator,
   when an authorized management operation is submitted,
   then the server can read, create, update, or delete records across
   profiles, properties, sponsors, property_sponsors, and inquiries,
   subject to database integrity constraints.

2. Given a verified administrator reviewing a property,
   when the administrator approves it,
   then its status becomes approved and it becomes publicly readable.

3. Given an anonymous or nonadministrator caller,
   when the caller attempts an administrator operation,
   then access is denied before privileged database execution.

4. Given a caller claiming an admin role in a request body or
   user-editable metadata,
   when authorization is evaluated,
   then that claim does not grant administrator access.

5. Given a browser accessing the application,
   when client resources and responses are inspected,
   then no service-role key is exposed.

### Planned Implementation Links

- Migration:
  ../supabase/migrations/20261029140000_exam_schema_persistence.sql
- Protected administration route:
  ../src/app/api/admin/[resource]/route.ts
- Server client:
  ../src/lib/supabaseServer.ts
- Existing privileged client to review:
  ../src/lib/supabase/admin.ts

## Verification

Record actual positive and negative authorization results in
security-audit.md. An expected denial counts as a passing security test.

Update implementation links if the final file structure changes.