# AI Usage Log



| Tool | Prompt | Output used | Output rejected | Verification | Commit |

|---|---|---|---|---|---|

| ChatGPT | In plain language, explain the proposed technology stack for a neighborhood listing platform. The stack uses Next.js with the App Router, TypeScript, Tailwind CSS, accessible HTML, Node.js, npm, Git, GitHub, and Vercel. Explain what each technology does and how they work together. Do not provide code. | Used the concise explanations of each technology and how the tools support development, version control, and deployment. | No code was requested or provided. No unsupported setup commands were used. | Compared the explanation with the technologies required by the project instructions. | feat: create accessible neighborhood app shell |

| Gemini | In plain language, explain the proposed technology stack for a neighborhood listing platform. The stack uses Next.js with the App Router, TypeScript, Tailwind CSS, accessible HTML, Node.js, npm, Git, GitHub, and Vercel. Explain what each technology does and how they work together. Do not provide code. | Used the project-specific examples and the explanation of the development-to-deployment workflow. | Rejected the database-query example because a database is not part of the current app-shell task. Also rejected the assumption that deployment is already automatic because Vercel has not been connected yet. | Compared the response with the project requirements and the ChatGPT response. | feat: create accessible neighborhood app shell |

| Google AI Studio | Act as an application-shell architect for a neighborhood listing platform using Next.js, TypeScript, Tailwind CSS, ESLint, accessible HTML, a src directory, and npm. Provide commands and a file plan without a giant code dump. | Used the suggested Next.js options and general file plan as planning references. | Rejected the command that created a nested neighborhood-platform directory and rejected unnecessary placeholder folders and utilities. | Corrected the command to install directly in the existing repository and verified that the development server returned HTTP 200. | feat: create accessible neighborhood app shell |

| ChatGPT | Help implement a simple accessible app shell with a heading, project purpose, and feature cards for Listings, Neighborhood Sponsors, and Voice Help. | Used semantic HTML, Tailwind styling, the three required feature cards, and updated page metadata. | No additional packages, secrets, or unnecessary features were used. | Inspected the rendered page, terminal output, and browser Console; no application errors were found. | feat: create accessible neighborhood app shell |

| ChatGPT | Review these React components for semantic HTML, WCAG-oriented keyboard access, responsive behavior, and TypeScript safety. Return: issue, why it matters, smallest change, and a manual test. Do not claim compliance from code alone. | Retained semantic elements, specific accessible names, flexible card layout, visible focus styles, and a live form-status message. | Rejected adding redundant ARIA roles and rejected any claim of WCAG compliance without browser, keyboard, screen-reader, and audit evidence. | Completed source review. Browser and Lighthouse tests remain explicitly marked pending in `docs/accessibility-test-notes.md`. | docs: add accessibility and AI review evidence |

| Gemini | Same component-review prompt as ChatGPT. | Pending Gemini review. | Pending Gemini review. | Must verify each proposed change in the browser before acceptance. | Pending |

## Two Differences Between the Responses



1. ChatGPT provided... a shorter and more general explanation, while Gemini included project-specific examples such as listing prices, bedroom counts, application routes, Server Components, and SEO.



1. ChatGPT presented... the stack mainly through paragraphs, while Gemini included a pipeline diagram and a numbered workflow showing how the technologies work together from development through deployment.


| Gemini recommendation | Decision | Reason |
|---|---|---|
| Remove `aria-describedby="filter-message"` from the entire form | **Accepted** | Associating a changing message with the entire form could cause repetitive announcements whenever controls receive focus. |
| Change the live region from `polite` to `assertive` | **Rejected** | The error is important but not an emergency. An assertive announcement may interrupt other screen-reader speech. The existing polite status region provides feedback without unnecessary interruption. |
| Connect invalid selects directly to the error message | **Accepted** | It gives each invalid control a programmatic relationship with the explanation of its invalid state. |

# AI Collaboration Log

## Interaction 1: Discovery Question Generation

- **Date:** October 15, 2026
- **Tool:** ChatGPT
- **Purpose:** Generate candidate stakeholder discovery questions.
- **Stakeholders:** Property professionals and local sponsors.

### Exact Prompt

Generate 12 neutral discovery questions for two stakeholder groups:
property professionals and local sponsors using a neighborhood property
listing platform. Cover current workflow, audience, required content,
content approval, ownership and access, inquiries, success measures,
and accessibility. Avoid leading questions, requests for sensitive
personal information, and assumptions that a proposed feature is useful.
The questions should help identify candidate product requirements and
access rules for a later database implementation.

### Useful Output

ChatGPT produced 12 questions covering:

- Current content workflows
- Required listing and sponsor information
- Intended audiences
- Content ownership and permissions
- Review and approval stages
- Rejected content
- Public and restricted information
- Visitor inquiries
- Success measures
- Accessibility
- Privacy and data concerns

### Output Not Yet Accepted

The questions have not yet been treated as final interview questions.
Gemini must first review them for leading wording, assumptions, and
privacy risks.

### Verification Planned

The team will compare Gemini's critique with the original questions.
The final interview guide will contain eight neutral questions covering
the required discovery topics.

### Final Decision

Pending Gemini review.

### Related Commit

To be added after the files are committed.

## Interaction 2: Ethical Review of Discovery Questions

- **Date:** October 15, 2026
- **Tool:** Google Gemini
- **Purpose:** Review candidate interview questions for leading wording,
  embedded assumptions, privacy risks, redundancy, and missing coverage.

### Exact Prompt

Act as an ethical research-methods reviewer. Review the 12 candidate
questions for leading or biased wording, embedded assumptions,
privacy-invasive requests, compound questions, participant pressure,
and missing coverage. For each question, provide a Keep, Revise, or
Remove verdict, explain the concern, and provide a neutral replacement
when needed. Do not answer the interview questions or invent stakeholder
preferences. Finish by recommending the strongest eight questions.

The complete prompt included all 12 candidate questions from the
interview guide.

### Useful Output

Gemini identified that the original permissions question combined too
many actions. It also identified overlap between the two inquiry
questions. Gemini confirmed that the remaining questions were neutral
and did not request sensitive personal information.

### Rejected or Modified Output

Gemini's final list was not accepted unchanged. Its recommended
Questions 1, 6, and 8 combined multiple topics even though its critique
identified compound questions as a concern. The questions were revised
to keep related subjects together and make participant responses easier
to interpret.

The phrase "role-based access controls" was not used in the final guide
because it is technical language that some stakeholders may not
understand. The final question instead asks who should be allowed to
perform each action.

### Verification Performed

Each recommendation was compared with:

- The original candidate questions
- The Lab 4 requirement for eight neutral questions
- The required topics of workflow, audience, approval, success
  measures, and accessibility
- The unresolved access questions that will inform Lab 5
- The requirement to avoid unnecessary sensitive information

### Final Decision

Eight revised questions were accepted. Unsupported stakeholder claims
were not added. The questions remain discovery questions and do not
establish confirmed requirements until interview evidence is reviewed.

### Related Commit

To be added after the files are committed.
## Interaction 3: Invitation and Consent Review

- **Date:** October 18, 2026
- **Tool:** Google Gemini
- **Purpose:** Review and simplify the stakeholder invitation and
  consent language.

### Prompt Pattern

Gemini was asked to audit the invitation for academic context,
voluntary participation, withdrawal rights, de-identification, data
use, tone, reading length, and freedom from sales language.

### Useful Output

Gemini produced a concise notice that clearly identified:

- CIS 3610 and California State University, Los Angeles
- The 15–20 minute time commitment
- Voluntary participation
- The right to skip questions or withdraw
- De-identification and academic data use
- A warning against sharing sensitive information

### Rejected or Modified Output

The course title "Web Design and Development" was not retained because
the official title was not verified.

Repository placeholders for student and instructor email addresses were
removed to avoid publishing unnecessary contact information.

The implied-consent statement based on continuing the conversation was
replaced with explicit consent questions.

Additional language was added to disclose AI-assisted analysis, prohibit
sales or marketing use, require separate recording permission, and
identify the current interviews as simulated.

### Verification Performed

The revised notice was compared with the Lab 4 requirements for
institutional context, time commitment, voluntary participation,
de-identification, academic use, transparent AI assistance, and
permission-based outreach.

### Final Decision

Gemini's concise structure was retained, but its draft was revised to
include the missing simulation and AI-use disclosures. No outreach
occurred.

## Interaction 4: Simulated Property-Professional Interviews

- **Date:** October 18, 2026
- **Tool:** Google Gemini
- **Purpose:** Generate three synthetic property-professional interview
  scenarios using the same eight discovery questions.

### Prompt Pattern

Gemini was instructed to create simulated interviews for an independent
real-estate agent, residential property manager, and small leasing-office
coordinator. It was required to label all responses as simulated, avoid
personal or sensitive information, permit conflicting answers, and
produce eight responses per role.

### Useful Output

Gemini produced 24 structured responses covering:

- Existing listing workflows
- Intended audiences
- Content responsibilities
- Rejection and correction processes
- Public and restricted information
- Inquiry access
- Success measures
- Accessibility and device support

The responses also included candidate needs and uncertainties requiring
later confirmation.

### Rejected or Corrected Output

Gemini mislabeled the response located between SIM-PROP-02 Q02 and Q04
as SIM-PROP-03 Q03. This produced seven labeled responses for
SIM-PROP-02 and nine for SIM-PROP-03.

The record was corrected to:

- Stakeholder ID: SIM-PROP-02
- Operational Role: Residential property manager
- Question ID: Q03

Statements describing dashboards, analytics, bulk imports, automated
logs, and specific permission structures were retained only as
AI-generated candidate ideas. They were not treated as confirmed
stakeholder requirements.

### Verification Performed

The student counted responses by stakeholder and question ID. After the
label correction, each of the three simulated stakeholders contained
exactly one response for Q01 through Q08.

The notes were also reviewed for names, contact information, customer
records, credentials, financial records, and other sensitive data. None
were included.

### Final Decision

The corrected responses may be used for theme extraction and database
practice. They remain synthetic and cannot establish genuine
stakeholder consensus.

## Interaction 5: Theme Extraction and Requirement Candidates

- **Date:** October 20, 2026
- **Tool:** Google AI Studio
- **Purpose:** Convert verified simulated interview notes into themes,
  uncertainties, and candidate requirements.

### Useful Output

AI Studio identified three supported patterns:

- Content lifecycle and review
- Public and restricted information
- Inquiry intake and role-based routing

It also connected most themes to specific Stakeholder IDs and Question
IDs and clearly stated that no requirement was confirmed by real
stakeholders.

### Rejected or Modified Output

The following suggestions were rejected as unsupported:

- Automated inquiry rate limiting
- Offline or low-bandwidth operation
- Mandatory separation of public and private database entities
- Administrators acting only as auditors
- Confirmed sponsor self-management
- Specific legal and fair-housing conclusions

Exact workflow states, notification architecture, sponsor approvals,
database structure, and inquiry routing were retained only as candidate
requirements or inferences requiring confirmation.

### Verification Performed

Each theme, requirement, and inference was compared with the cited
simulated responses. Claims that lacked direct support were removed or
moved to the uncertainty list.

### Final Decision

Three themes and several candidate requirements were retained as working
hypotheses. None were classified as confirmed stakeholder requirements.

## Interaction 6: Simulated Local-Sponsor Interviews

- **Date:** October 20, 2026
- **Tool:** Google Gemini
- **Purpose:** Generate three synthetic local-sponsor interviews using
  eight consistent discovery questions.

### Useful Output

Gemini produced 24 structured responses for:

- A neighborhood café or restaurant manager
- A local home-services provider
- An independent neighborhood retailer

The responses covered promotional workflows, intended audiences,
approval responsibilities, correction processes, public and restricted
information, placement duration, privacy-conscious measurements, and
accessibility.

### Rejected or Modified Output

Gemini did not write the requested Simulation Limitations disclosure.
It repeated the prompt instruction instead. The original mistake was
preserved in the evidence file and replaced with a complete disclosure
in the verified notes.

Annual subscriptions, fixed seasonal cycles, geographic placement,
automated expiration, licensing verification, analytics dashboards,
external-link behavior, and specific accessibility-conformance targets
were retained only as unverified candidate ideas.

### Verification Performed

The records were counted and grouped by Stakeholder ID and Question ID.
Each of the three sponsor roles contains Q01 through Q08 exactly once,
for 24 total records.

The responses were reviewed for personal information, customer records,
credentials, confidential business information, and unsupported legal
claims. No real stakeholder information was included.

### Final Decision

The sponsor responses may be used for theme extraction, persona
development, and candidate requirements. They remain simulated and do
not establish stakeholder consensus.

Useful output: Four supported themes, stakeholder differences, uncertainties, and traceability identifiers.
Rejected or revised output: Field locking, cookie tracking, automatic submission blocking, batch-import claims, and other unconfirmed implementation details.
Verification: Compared every theme and requirement against all 24 simulated sponsor responses.
Decision: Retained supported findings as hypotheses and moved implementation choices to inferences or uncertainties.

### Property Theme and Persona Review

- **Useful output:** Retained themes concerning listing review, public/private
  data separation, inquiry routing, and accessibility.
- **Rejected or revised output:** Removed unsupported assumptions concerning
  automatic rate limiting, mandatory low-bandwidth caching, physical database
  separation, and specific notification technologies.
- **Verification:** The themes and persona were compared with the 24 simulated property responses
stored in Lab4_Simulated_Stakeholders.accdb. The database contains Q01 through
Q08 for SIM-PROP-01, SIM-PROP-02, and SIM-PROP-03. Claims not directly
supported by those responses remain labeled as inferences or uncertainties.
- **Decision:** All findings remain simulated, evidence-based working
  hypotheses rather than confirmed stakeholder requirements.

  ## Interaction 7: Gemini Backlog Critique

### Prompt Purpose

Review the backlog, approval workflow, traceability matrix, and verified
simulated themes for unsupported assumptions, missing tests, privacy risks,
accessibility omissions, and MVP scope problems.

### Useful Output

- Identified missing accessibility coverage.
- Identified missing self-approval and cross-owner denial tests.
- Identified ambiguity surrounding anonymous inquiries.
- Identified excessive complexity in shared-office inquiry routing.
- Recommended clarifying content visibility during renewed review.

### Rejected or Revised Output

- Did not remove the technical user stories because the instructor explicitly
  requires RLS and migration stories.
- Did not require a revision-history system because it remains an unconfirmed
  deferred feature.
- Did not prescribe a specific access-control-list schema.
- Did not require specific HTTP status codes because denial without data
  exposure is the testable requirement.

### Verification

Every Gemini finding was compared with:

- `docs/product-backlog.md`
- `docs/content-approval-workflow.md`
- `docs/requirements-traceability.md`
- `docs/property-interview-themes.md`
- `docs/sponsor-interview-themes.md`
- The instructor's Lab 4 and Lab 5 requirements

### Final Decision

Only corrections supported by course requirements, security principles, or
clearly labeled MVP decisions were retained. Simulated findings remain working
hypotheses rather than confirmed stakeholder requirements.

## Interaction 8: PostgreSQL, RLS, and CRUD Implementation Review

- **Date:** October 28, 2026
- **Tool:** ChatGPT
- **Purpose:** Review and implement the Lab 5 database schema, RLS controls,
  server-only database access, validated routes, denial tests, and UI
  integration.

### Exact Prompt Pattern

Review this PostgreSQL schema and RLS plan as a defensive database
engineer. Identify privilege escalation, ownership, validation, and
cascade risks. Give executable tests, but use placeholders for all
credentials.

The review was performed iteratively while implementing the migration,
RLS tests, server clients, GET and PATCH routes, and database-backed UI.

### Useful Output

The following recommendations were accepted:

- Store schema changes in a numbered migration.
- Enable RLS on every exposed table and default to deny.
- Permit anonymous reads only for approved properties and active sponsors.
- Restrict authenticated updates to records owned by the current user.
- Prevent clients from changing `owner_id` or `review_status`.
- Keep the Supabase secret key in a `server-only` module.
- Use a separate publishable-key client for public RLS-protected reads.
- Select an explicit list of public columns in the listings route.
- Validate PATCH bodies with Ajv and reject additional properties.
- Return generic client errors while logging database details only on the
  server.
- Test anonymous, owner, other-user, and elevated-role behavior with pgTAP.
- Add loading, empty, and error states to the listings UI.

### Rejected or Corrected Output

The following suggestions or initial implementations were not retained:

- A strict UUID-version regular expression was rejected because the
  fictional PostgreSQL UUID fixtures used structurally valid UUID values
  that did not encode a conventional version digit.
- The initial API column names `image_source` and `image_alt_text` were
  rejected after the migration confirmed the actual names were
  `image_src` and `image_alt`.
- The privileged secret-key client was not used for public listing reads
  because it would bypass RLS.
- Database errors were not returned directly to clients.
- `npm audit fix --force` was rejected because it could introduce
  uncontrolled breaking dependency changes.
- RLS was not disabled when public reads initially failed.
- Real credentials, production data, and real stakeholder information were
  not added to tests, documentation, screenshots, or Git.

### Verification Performed

Verification included:

- Rebuilding the local database from the numbered migration and fictional
  seed.
- Running 35 pgTAP tests with all tests passing.
- Running 13 Vitest tests across four test files.
- Completing a successful Next.js production build.
- Confirming `GET /api/listings` returned HTTP 200 with only two approved
  fictional listings.
- Confirming unauthenticated PATCH returned HTTP 401.
- Confirming an attempted `review_status` update returned HTTP 400.
- Confirming a fake bearer token returned HTTP 401.
- Confirming the UI displayed database-backed approved listings.
- Confirming the UI displayed a safe error state when the database was
  unavailable.
- Confirming `.env.local` was ignored.
- Scanning tracked files and Git history for Supabase secret-key and
  JWT-shaped values with no matches.
- Confirming `git status --short` returned no uncommitted changes.

### Related Commits

- `b59eb40` — schema, RLS policies, and fictional seed
- `e365f4f` — RLS authorization coverage
- `5cf9cb3` — server database dependencies
- `f0a7a05` — server-only database client
- `8025ffe` — RLS-backed listings GET route
- `821b593` — validated owner listing updates
- `13112fb` — database-backed listings UI

### Final Decision

The accepted implementation uses migration-controlled PostgreSQL,
default-deny RLS, separate privileged and restricted clients, explicit
column selection, runtime input validation, safe errors, fictional data,
and executable denial tests. The optional `audit_events` extension was
deferred because it was not required for the core lab.

## Interaction 9: Defensive Schema and RLS Critique

- **Date:** October 28, 2026
- **Tool:** Google Gemini
- **Purpose:** Independently review the PostgreSQL schema, grants, RLS
  policies, triggers, cascade behavior, and tests for security weaknesses.

### Exact Prompt

Review this PostgreSQL schema and row-level-security plan as a defensive
database engineer.

Identify:
1. privilege-escalation risks,
2. ownership-bypass risks,
3. missing input or database validation,
4. unsafe foreign-key cascade behavior,
5. ways a user might approve their own record,
6. risks involving anonymous, authenticated, administrator, or service-role
   access.

Evaluate whether:
- public users can read only approved properties and active sponsors,
- authenticated owners can modify only their own unapproved properties,
- ownership and review-status fields are protected,
- inquiry information cannot be read by unrelated users,
- administrator actions remain server-side,
- all exposed tables default to deny.

Provide executable pgTAP or SQL test cases for any important gaps you
identify. Use placeholders for all credentials and do not request or
reproduce secrets, private data, production URLs, or real user
information.

Separate your response into:
- confirmed strengths,
- risks,
- recommended changes,
- executable tests,
- assumptions requiring manual verification.

The numbered migration and pgTAP RLS test file were supplied with the
prompt. No environment files or credentials were supplied.

### Useful Output

Gemini correctly identified and confirmed:

- Every exposed table uses explicit grants and RLS with a default-deny
  posture.
- Column-level grants prevent ordinary authenticated users from directly
  updating ownership and review-state columns.
- Database constraints validate important lengths, ranges, formats, and
  allowed values.
- Triggers prevent owners from changing immutable ownership fields or
  approving their own content.
- Anonymous users cannot select inquiry records.
- Inquiry reads are restricted to the relevant property owner.
- URL fields deserve additional scheme validation because arbitrary stored
  link values could become unsafe when rendered by an application.
- Inquiry creation should consider property availability as well as approval
  and `accepts_inquiries`.
- Supabase authentication claims and server-only administrator execution
  require integration-level verification beyond static SQL review.

### Rejected or Modified Output

Gemini's URL recommendation was not accepted unchanged. Requiring every
`image_src` value to begin with `https://` would reject the project's valid
same-origin image paths, including `/property-cedar.svg` and
`/property-oak.svg`. Any future database constraint must permit approved
same-origin paths while rejecting unsafe schemes such as `javascript:` and
unrestricted `data:` values.

The recommendation to add client-facing administrator RLS policies was
rejected. The assignment explicitly requires administrator actions to use
trusted server-side authorization. The `administrator` profile value is
application metadata and does not independently grant PostgreSQL privileges.
Adding broad administrator RLS policies would unnecessarily increase the
client-facing attack surface.

The recommendation to remove `administrator` from the profile role constraint
was also rejected. Retaining the value does not create privilege escalation
because neither the value nor the profile table grants service-role
capabilities.

No additional profile-role check was added because the existing role
constraint, column-level update grant, and own-profile RLS policy already
prevent ordinary users from changing their role. A trigger may be considered
later as redundant defense in depth, but it is not required for the current
MVP.

Database-level rate limiting was not accepted as an RLS requirement. Rate
limiting generally requires application, gateway, or infrastructure context
such as request timing and network identity. It remains a deployment
hardening item rather than part of this local persistence lab.

Gemini's proposed `super_admin` insertion test was rejected as an
administrator-isolation test. It verifies only that an unsupported role value
violates the role check constraint; it does not verify authorization for a
valid `administrator` profile.

The proposed URL test must not be considered valid until safe URL constraints
are implemented. It must also ensure its owner fixture satisfies foreign-key
requirements so that a foreign-key failure cannot be mistaken for a URL
validation success.

### Verification Performed

Gemini's findings were compared with:

- The numbered PostgreSQL migration
- Column-level grants
- RLS policies and trigger functions
- The fictional seed records
- The 35-test pgTAP authorization suite
- The publishable-key public listings client
- The server-only privileged client
- The authenticated PATCH route
- Ajv update validation
- Browser and `curl` integration evidence
- The instructor requirement that administrators use server-side
  authorization

The final database was rebuilt from the migration and seed. All 35 pgTAP
tests passed. The approved-listings endpoint returned HTTP 200 with only two
approved fictional records, and the UI rendered the same two records.

### Final Decision

Gemini's confirmation of the default-deny design, constrained ownership,
self-approval prevention, and inquiry privacy was retained.

Safe URL handling and availability-aware inquiry creation were retained as
defense-in-depth findings requiring targeted implementation or explicit
deferment. Broad client-side administrator policies, removal of the
administrator metadata value, database-level rate limiting, and the mislabeled
administrator test were rejected.

No Gemini-generated SQL was executed without manual review.

## Practical Persistence Exam — October 29, 2026

Branch: `exam/practical-persistence-eval`

| Step / Tool | Prompt Summary | Model Output Used | Model Output Rejected & Rationale | Verification Method | Associated Git Commit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Part 1 / ChatGPT | Begin the updated practical exam on my personal device. | Commands to update main, create the required branch, and verify ignored files. | None for this step. | Confirmed correct remote, clean exam branch, ignore rules, and only .env.example tracked. | 9dc556e |
| Part 2 / ChatGPT | Continue exam preparation after confirming the collaborator invitation and branch setup. | Used the proposed requirements document containing three user stories, Given/When/Then acceptance criteria, scope estimates, and planned implementation paths. | No suggestions rejected at this stage. Inquiry and administrator route paths remain proposed implementation choices, not completed features. | Reviewed the document against the updated exam instructions; confirmed docs/requirements.md was committed and pushed. Implementation behavior has not yet been tested against these criteria. | 6d80c41 |
| Part 3 preparation / ChatGPT | Supplied the existing migration, RLS tests, seed data, and database verification document for review before preparing the exam migration. | Followed the recommendation to inspect existing tables, policies, constraints, and triggers before changing the database. | No output rejected at this stage. No new migration has been prepared or executed during this step. | Provided source files for inspection. Review of their compatibility with the updated exam requirements is pending. | Pending — review only |
| Part 4–5 / ChatGPT | Extend the RLS tests, implement GET/POST property routes, and verify authenticated API behavior. | Used the expanded RLS suite, strict property-creation route, token-safe API test commands, and security-audit documentation. | No recommendations rejected in this step. Corrected the initially stated test count from 29 to the observed 28; eight additional assertions brought the suite to 36. | Local database suite passed 36 tests. Lint reported 0 errors and 2 warnings; production build passed. API tests confirmed GET 200, unauthenticated POST 401, owner creation 201 with correct ownership and draft status, invalid payloads 400, nonowner POST 403, and draft exclusion from public GET. | 04a9022 |
| Part 5 / ChatGPT | Implement and verify protected administrator approval. | Used the server-only client entry point, protected-role authorization helper, approval route, and token-safe verification script. | No recommendations rejected in this step. Limited the verification claim to property approval rather than full administrator CRUD. | Build passed. Anonymous request returned 401; owner request returned 403 without changing the draft; administrator request returned 200, persisted approval, and made the property publicly visible. | 59d5648 |
| Parts 5–6 / ChatGPT | Implement database-backed sponsor tiers and correct the reported React effect lint error. | Used the public sponsor endpoint, PropertySponsors component, and property-card integration. Removed the redundant synchronous loading-state update and keyed PropertySponsors by property ID. | Rejected the initial setState("loading") call directly inside useEffect because it triggered react-hooks/set-state-in-effect. The component already initializes in loading state; the key resets component state when the property changes. | Reran lint: 0 errors and 2 existing warnings. Production build passed. Approved-property sponsor request returned HTTP 200 with the bronze-tier sponsor; draft-property request returned HTTP 404. Browser inspection confirmed sponsor display. | f61b3fd |
| Part 6 / ChatGPT | Adapt property cards to the exam API and verify responsive and keyboard behavior. | Used the public-field card interface, semantic markup, expandable details buttons, focus styling, and responsive grid. | No recommendations rejected in this step. | Lint completed with 0 errors and 2 warnings; build passed. Screenshots confirmed 1/2/3 columns at 390/800/1280px. Manual keyboard checks passed for Tab, Shift+Tab, Enter, Space, and visible focus. | ecd9907 |
| Anonymous inquiry API and form / ChatGPT | Implement and verify anonymous property inquiries; supplied terminal and browser screenshots of submission results. | Used validated POST /api/inquiries and an InquiryForm integrated into property details, with submission feedback and duplicate-submission prevention. | No additional rejected output recorded for this step. | API checks returned 201 for valid input, 400 for a short message, 404 for draft or inquiry-disabled properties, and 405 for GET. Browser showed success with cleared fields and unavailable-property feedback with retained input. Lint: zero errors, two existing generated-file warnings. Build passed. | f5bc4a5 |
| Owner PATCH compatibility / ChatGPT | Reviewed the update validator and supplied screenshots of validation, build, and authenticated PATCH results. | Renamed the update field to address, added numeric limits and trimmed-address validation, included address in the response, and expanded validation tests. | Corrected the suggested filename from validate-data.ts to validated-data.ts. Preserved the earlier local JSON contract because it uses separate schemas. | All 23 validation tests passed. Owner PATCH returned 200 and persisted changes without changing ownership or draft status. Protected or invalid fields returned 400; anonymous PATCH returned 401. Follow-up API test confirmed authenticated public-role PATCH returned 403; owner reads before and after confirmed the property remained unchanged. Lint: zero errors, two existing warnings. Build passed. | 1f11a9c |
| Administrator management / ChatGPT | Supplied requirements, authorization code, both migrations, and screenshots of administrator API verification. | Used the allowlisted administrator route, strict input validation, complete record-key checks, safe error responses, and token-safe verification scripts. | No additional rejected output recorded. Preserved database integrity constraints and kept Auth account creation separate from application-profile creation. | Anonymous requests returned 401 and owner requests returned 403 across all four methods and five resources. Administrator CRUD succeeded across all five tables; separate reads verified persisted changes and deletion. Profile deletion with an owned property returned 409. Disposable application records were removed. Lint: zero errors, two existing warnings. Build passed. | 54038e3 |
| Hosted deployment / ChatGPT | Supplied screenshots while configuring hosted Supabase, Vercel Preview variables, deployment access, and inquiry verification. | Used CLI migration deployment, fictional demonstration SQL, hosted environment configuration, and browser/database verification steps. | Corrected the initial use of local Studio for hosted account setup and the selection of a main-branch production deployment. Selected the exam preview instead. | Hosted migration history matched. Public API and UI displayed approved properties and the active sponsor. InPrivate access succeeded. Cedar inquiry persisted; Oak submission was denied with no matching stored inquiry. | Application: 54038e3; deployment configuration performed in dashboards. |

> this src/schemas/property.ts is different then the other schema folder?

Follow-up input: terminal screenshot showing all 17 property-creation
validation tests passing.

### Part 1 — Exact Prompt

> I am on my own device and ready to begin

Follow-up input: terminal screenshot showing branch creation, installed
tool versions, ignore-rule checks, and tracked environment filenames.

### Part 2 — Prompt and Input Record

Exact text prompt:

> Invite is pending.

Attached input: terminal screenshot confirming the exam branch was
pushed and the initial AI-log commit was 9dc556e.

ChatGPT supplied the proposed contents of docs/requirements.md.
The resulting requirements document was committed as 6d80c41.

Follow-up input: screenshot showing the requirements commit and push;
no accompanying text prompt.

### Part 3 Preparation — Input Record

Files supplied:

- 20261023050853_create_core_schema(1).sql
- rls.test(1).sql
- seed(1).sql
- database-verification.md

Exact text prompt:

> What should be added to my ai-log?

These uploaded filenames identify the review copies, not new migration
filenames. Source review and exam migration implementation are pending.

### Repository Access

The collaborator invitation to pdt605 has been sent and is acceptanced.

The exam migration applied successfully locally.
The listings GET filter changed to status.
The updated RLS suite passed 28 tests.
Rejected-listing, junction visibility, cascade, and administrator-route tests remain outstanding.

### Parts 4–5 — Prompt and Verification Record

Exact text prompt:

> Where do I put this specifically?

The message also quoted the previously supplied profile-creation and
verification SQL and requested clarification about where to execute it.

Additional inputs were screenshots showing migration execution, RLS test
results, build output, API responses, test-user profile roles, and Git
commit/push results.

### AI Output Used

- Expanded database authorization tests, including rejected-listing edits,
  sponsor-link visibility, and cascading deletion.
- GET and POST handlers in src/app/api/properties/route.ts.
- Authenticated API verification commands that kept passwords and tokens
  out of the displayed results.
- Verification documentation in docs/security-audit.md.

### Corrections and Limitations

- Corrected an incomplete UUID in the additional test block before execution.
- Used actual terminal results rather than AI-predicted test counts.
- The tests verified database service-role capabilities, but did not yet
  verify server-side administrator authorization.
- Hosted deployment and accessibility verification remained outstanding.

### Independent Verification Performed

I executed the database tests, lint, build, and HTTP checks locally and
inspected their outputs. The API checks verified that a new property was
saved as a draft belonging to the authenticated owner and remained hidden
from public GET results.

The verification scripts were AI-assisted; the reported outcomes came from
execution against my local application and database.

Associated implementation and evidence commit: 04a9022.

### Sponsor Display — AI Correction and Verification

Input provided to ChatGPT: a terminal screenshot showing the
react-hooks/set-state-in-effect error in PropertySponsors.tsx.

The initial AI-generated component called setState("loading")
synchronously inside useEffect. I applied the suggested correction:
remove that redundant call and render the component with
key={property.id}. State updates following the asynchronous request
were retained.

I verified the correction by running npm run lint and npm run build.
Lint reported zero errors and two existing generated-file warnings;
the production build passed.

HTTP checks confirmed that the approved Cedar Avenue property returned
its bronze-tier sponsor with HTTP 200, while the draft property returned
HTTP 404. Browser inspection confirmed that the sponsor name and tier
appeared on the correct property card.

Associated Git commit: ecd9907.

# Digital Asset Pipeline & Performance Audit

**Author:** Aaron De Robles
**Branch:** `feat/digital-asset-audit`
**Environment:** Local application at `http://localhost:3000`
**Measurement date:** November 1, 2026 (Pacific Time)

## Verification Method

I inspected three distinct assets rendered in the application using Chrome
DevTools. Network measurements were captured with the Img filter selected,
browser cache disabled, and no network throttling.

Rendered dimensions were measured using `getBoundingClientRect()` at verified
viewport widths of 390 and 1280 CSS pixels. Device pixel ratio was approximately
2. Download time means the Timing panel's Content Download phase, not total
request duration.

The photograph responses reported `X-Nextjs-Cache: HIT`: browser caching was
disabled, but the server reused previously optimized images. These local
measurements do not represent hosted or cold-cache performance.

## Asset A — Primary Property Listing Photo

### Metadata and provenance

- Application path: `/images/property-demo.jpg`
- Repository path: `public/images/property-demo.jpg`
- Original dimensions: 2048 × 1365 pixels
- Original file size: 1,012,853 bytes
- Creator: Curtis Adams
- Source: https://www.pexels.com/photo/front-exterior-of-a-family-home-8031873/
- Permission source: Pexels License
- License: https://www.pexels.com/license/

The photograph is used for the fictional Cedar listing. A visible caption
identifies it as stock demonstration imagery, not a photograph of the actual
fictional property. Permission comes from the license, not from a realtor.

### Administrative clearance

- Table: `public.asset_reviews`
- Record: `asset_key = 'property-demo'`
- Clearance field: `status = 'APPROVED'`
- Reviewer: Aaron De Robles
- Recorded review time: `2026-11-02 02:29:24.422992+00`
- Evidence: `docs/evidence/asset-approvals.csv`

### Accessibility and purpose

Purpose: **Informational**

Dynamic JSX alt attribute:

```tsx
alt={`Stock demonstration photo for ${property.address}: white brick house with a black front door and landscaped entrance.`}
```

For the Cedar listing, this resolves to:

> Stock demonstration photo for 101 Fictional Cedar Avenue: white brick house with a black front door and landscaped entrance.

### Responsive implementation

```tsx
<Image
  src="/images/property-demo.jpg"
  alt={`Stock demonstration photo for ${property.address}: white brick house with a black front door and landscaped entrance.`}
  width={2048}
  height={1365}
  sizes="(min-width: 1336px) 361px, (min-width: 1024px) calc((100vw - 96px) / 3 - 50px), (min-width: 768px) calc((100vw - 72px) / 2 - 50px), (min-width: 640px) calc(100vw - 98px), calc(100vw - 82px)"
  className="h-auto w-full rounded-lg"
/>
```

- Rendered width at 390px viewport: **308.8 CSS px**
- Rendered width at 1280px viewport: **345.06 CSS px**
- Mobile image request: **640px-wide variant**, `q=75`

### Network telemetry and risk

- Transferred size: **52.7 kB**
- Content-Type: **`image/webp`**
- Content Download: **10.31 ms**

Risk: delivering the original approximately 1 MB JPEG to a small property card
would waste bandwidth.

Mitigation: Next.js Image optimization and responsive `sizes` select a smaller
variant. The measured mobile response was WebP. Explicit intrinsic dimensions,
with `w-full h-auto`, also reserve the image's aspect ratio to reduce layout-shift
risk.

## Asset B — Local Business Partner Ad Banner

### Metadata and provenance

- Application path: `/images/sponsor-garden.jpg`
- Repository path: `public/images/sponsor-garden.jpg`
- Original dimensions: 1315 × 2048 pixels
- Original file size: 516,510 bytes
- Creator: Maria Firman
- Source: https://www.pexels.com/photo/sprouts-and-plants-in-greenhouse-12152936/
- Permission source: Pexels License
- License: https://www.pexels.com/license/

The photograph appears within the Green Leaf Home and Garden advertisement.
The business is fictional, and the visible caption identifies the use of stock
photography. Permission comes from the license; no real business-owner
endorsement is claimed.

### Administrative clearance

- Table: `public.asset_reviews`
- Record: `asset_key = 'sponsor-garden'`
- Clearance field: `status = 'APPROVED'`
- Reviewer: Aaron De Robles
- Recorded review time: `2026-11-02 02:29:24.422992+00`
- Evidence: `docs/evidence/asset-approvals.csv`

### Accessibility and purpose

Purpose: **Informational**

The photograph supports the advertisement. The separate “Visit” link provides
the actionable destination.

Dynamic JSX alt attribute:

```tsx
alt={`Demonstration banner for ${sponsor.name}: seedlings and green plants growing in a greenhouse bed.`}
```

For the featured sponsor, this resolves to:

> Demonstration banner for Green Leaf Home and Garden: seedlings and green plants growing in a greenhouse bed.

### Responsive implementation

The outer advertisement uses:

```tsx
<aside
  className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6"
  aria-labelledby={`${sponsor.id}-heading`}
>
```

The image container and component use:

```tsx
<div className="relative aspect-[2/1] overflow-hidden rounded-lg">
  <Image
    src="/images/sponsor-garden.jpg"
    alt={`Demonstration banner for ${sponsor.name}: seedlings and green plants growing in a greenhouse bed.`}
    fill
    sizes="(min-width: 1336px) 1230px, (min-width: 640px) calc(100vw - 98px), calc(100vw - 82px)"
    className="object-cover object-center"
  />
</div>
```

- Rendered width at 390px viewport: **308.8 CSS px**
- Rendered width at 1280px viewport: **1182.4 CSS px**
- Mobile image request: **640px-wide variant**, `q=75`

### Network telemetry and risk

- Transferred size: **63.2 kB**
- Content-Type: **`image/webp`**
- Content Download: **22.41 ms**

Risk: a fill image without a reserved container height could cause layout
instability or an incorrectly sized banner.

Mitigation: `relative aspect-[2/1]` reserves the banner's layout space.
`object-cover object-center` preserves the photograph's proportions while
cropping it into the banner. Responsive `sizes` and Next.js optimization reduce
the delivered payload.

## Asset C — UI / Navigational House Icon

### Metadata and provenance

- Application path: `/icons/house.svg`
- Repository path: `public/icons/house.svg`
- SVG viewBox: `0 0 24 24`
- Creator: Lucide contributors
- Source: https://lucide.dev/icons/house
- Permission source: ISC License
- License: https://lucide.dev/license
- Retained license notice: `public/licenses/lucide-LICENSE.txt`

### Administrative clearance

- Table: `public.asset_reviews`
- Record: `asset_key = 'navigation-house'`
- Clearance field: `status = 'APPROVED'`
- Reviewer: Aaron De Robles
- Recorded review time: `2026-11-02 02:29:24.422992+00`
- Evidence: `docs/evidence/asset-approvals.csv`

### Accessibility and purpose

Purpose of the image: **Decorative within an actionable navigation link**

The adjacent text “Browse properties” names the link. The icon uses `alt=""`
and `aria-hidden="true"` to avoid announcing redundant information.

### Responsive implementation

```tsx
<Image
  src="/icons/house.svg"
  alt=""
  aria-hidden="true"
  width={24}
  height={24}
  unoptimized
  className="h-6 w-6 shrink-0"
/>
```

The image appears inside the navigation link targeting `#listings-heading`.

- Rendered width at 390px viewport: **24 CSS px**
- Rendered width at 1280px viewport: **24 CSS px**

### Network telemetry and risk

- Transferred size: **0.7 kB**
- Content-Type: **`image/svg+xml`**
- Content Download: **0.98 ms**

Risk: an oversized raster icon would add unnecessary payload and could appear
blurry on high-density displays.

Mitigation: a small SVG is served directly with `unoptimized`. Explicit
24 × 24 dimensions reserve space, and `shrink-0` preserves its intended size
inside the navigation link.

## Approval Scope and Limitations

The asset register records manual project-administrator review in the local
database. It is not a runtime publication gate: the current JSX does not query
the register before rendering images.

The migration creates PENDING records. The CSV preserves the subsequent local
approval decision. A fresh or hosted database requires its own review records;
local approval is not automatically transferred.

License permission and administrative approval are separate evidence:
the source licenses authorize use, while the asset register records project
clearance.

## Validation Evidence

- Production build and TypeScript checks passed.
- Lint reported zero errors and two existing generated-file warnings.
- The existing 36 database tests passed.
- Those tests do not specifically test the new asset register.
- `git diff --check` passed after indentation cleanup.
- Chrome screenshots document responsive dimensions, response headers,
  transferred sizes, and Content Download timings.
- `docs/evidence/asset-approvals.csv` documents all three local approvals.

## Individual Contribution and AI Assistance

Aaron De Robles integrated the demonstration assets, performed browser
measurements, corrected the sponsor layout, ran project checks, and recorded
the local administrative review.

ChatGPT assisted with asset-source research, component suggestions, migration
drafting, troubleshooting, and audit organization. Measurements were taken
from the project's actual browser and database evidence.

2026-11-01 — Digital Asset Pipeline & Performance Audit
Contributor: Aaron De Robles
AI tool: ChatGPT
Branch: `feat/digital-asset-audit`
Purpose: Integrate three licensed demonstration assets and document provenance, accessibility, responsive behavior, network performance, and local administrative review.
Prompts and inputs
I asked ChatGPT to help complete the Digital Asset Pipeline & Performance Audit and instructed it to “Use licensed demonstration assets.” I supplied the project components, downloaded photographs and SVG, browser screenshots, terminal results, and Supabase query results. Follow-up requests covered exact component edits, measurement troubleshooting, administrative approval evidence, and Markdown/evidence organization. This is a summary of the interaction rather than a verbatim prompt transcript.
Suggestions used
Selected the Curtis Adams property photograph and Maria Firman greenhouse photograph from Pexels, with source and license URLs, plus the Lucide House SVG under the ISC License.
Added visible stock-demonstration captions and photographer credits. Retained the Lucide license notice in `public/licenses/lucide-LICENSE.txt`.
Used Next.js `Image` for the photographs with responsive `sizes`. Reserved the property image's aspect ratio using intrinsic dimensions and the banner's space using `relative aspect-[2/1]` with `fill`.
Added descriptive dynamic alt text to the photographs. Used `alt=""` and `aria-hidden="true"` for the House icon beside the labeled “Browse properties” link.
Corrected the sponsor's missing outer styling and accessible label, removed the desktop margin override, and cleaned up mixed indentation.
Used a read-only Console snippet to measure actual image widths and confirm `window.innerWidth` at 390px and 1280px.
Added a local `asset_reviews` register through a migration. Records start `PENDING`; manual review subsequently recorded my approval, reviewer name, timestamp, and notes. Exported the decisions to `docs/evidence/asset-approvals.csv`.
Used AI assistance to organize the audit narrative and select supporting screenshots.
Suggestions corrected or not adopted
Existing unrendered placeholder SVGs were not treated as qualifying property photographs or as evidence of three rendered asset categories.
Discarded the attempted desktop capture whose Console reported a 490px viewport despite the toolbar showing 1280. Repeated the measurement after confirming a 1280px viewport.
Replaced the unpadded sponsor-banner measurements with measurements after the styling correction.
Did not report source JPEG sizes, response body lengths, or total request duration as transferred size or Content Download time.
Did not claim that property approval automatically approved an image, that license permission represented a real business endorsement, or that a database review register enforced runtime image publication.
Human verification and results
I downloaded and integrated the assets, inspected the rendered page, ran the checks, captured Chrome evidence, and performed the local administrative review. AI-generated suggestions were checked against the actual project outputs.
Asset	Width at 390px / 1280px (CSS px)	Transferred size	Content-Type	Content Download
Property photo	308.8 / 345.06	52.7 kB	`image/webp`	10.31 ms
Sponsor banner	308.8 / 1182.4	63.2 kB	`image/webp`	22.41 ms
House icon	24 / 24	0.7 kB	`image/svg+xml`	0.98 ms
Production build and TypeScript checks passed during implementation.
Lint reported zero errors and two existing generated-file warnings.
The existing database suite passed all 36 tests. It does not specifically test the new asset register.
`git diff --check` produced no output after indentation cleanup.
All three local asset-review records show `APPROVED`, reviewed by Aaron De Robles, at `2026-11-02 02:29:24.422992+00` (November 1 in Pacific Time).
Evidence and limitations
Audit: `docs/digital-asset-audit.md`
Screenshot index: `docs/evidence/digital-assets/README.md`
Approval export: `docs/evidence/asset-approvals.csv`
Measurements were captured on localhost in Chrome, with browser cache disabled, no throttling, and device pixel ratio approximately 2. Photograph responses showed a server-side optimized-image cache hit. These are not hosted or cold-cache benchmarks.
The approval register documents manual review; the current JSX does not consult it before rendering assets. Fresh database installations begin with pending records and require their own review.
No claim of completed deployment or merging is made in this entry.