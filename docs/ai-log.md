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