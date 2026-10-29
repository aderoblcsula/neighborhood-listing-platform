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