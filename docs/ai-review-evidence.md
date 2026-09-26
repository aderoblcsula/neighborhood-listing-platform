# AI Review Evidence

## Google AI Studio: prop interfaces only

Use this prompt before presenting the final shared types as AI Studio evidence:

> Return TypeScript prop interfaces only for a reusable property card and
> sponsor banner. A property needs a stable ID, title, address, numeric price,
> bedrooms, bathrooms, square footage, image source, purposeful image alt text,
> and details URL. A sponsor needs a stable ID, business name, description, and
> website URL. Mark a field optional only when the component can render
> correctly without it. Do not return React components or CSS.

Review the response against `src/types/index.ts`. The current implementation
makes every field required because each one is rendered or used for identity,
navigation, or accessible image text. Record AI Studio's actual response and
any rejected optional fields here before submission; it was not run from this
environment.

| Evidence | Result |
|---|---|
| AI Studio response | Pending paste |
| Useful output | Pending review |
| Rejected output | Pending review |
| Verification | Compare every field with component usage and TypeScript checks |
| Commit | Pending after verified changes, if any |

## Shared review prompt

The following prompt is ready to paste into both ChatGPT and Gemini along with
the contents of `PropertyCard.tsx`, `SponsorBanner.tsx`, and
`SearchFilters.tsx`:

> Review these React components for semantic HTML, WCAG-oriented keyboard
> access, responsive behavior, and TypeScript safety. Return: issue, why it
> matters, smallest change, and a manual test. Do not claim compliance from
> code alone.

## ChatGPT critique

Date: September 26, 2026

| Issue or observation | Why it matters | Smallest change | Manual verification | Decision |
|---|---|---|---|---|
| The components use `article`, headings, an `aside`, labels, lists, links, and buttons for their intended purposes. | Native elements provide browser and assistive-technology behavior without recreating it in ARIA. | Keep the semantic elements. | Inspect the accessibility tree and navigate by headings, landmarks, form controls, and links. | Used. |
| Focus outlines are declared, but source review cannot prove that they are visible in the rendered page. | Keyboard users need to know which control is active. | Retain the high-contrast `focus-visible` outlines and verify them in Chrome. | Tab and Shift+Tab through every interactive element at all three test widths. | Used; browser verification pending. |
| The form status region supplies feedback, but its announcement must be tested. | Dynamic messages can be missed if assistive technology is not notified. | Keep `role="status"` and `aria-live="polite"`; test before making additional ARIA changes. | Submit once with empty fields and once with both values while a screen reader is running. | Used; screen-reader verification pending. |
| Fixed card heights were not added. | Fixed text heights can clip content under zoom or translated content. | Keep flexible card layout and a consistent image aspect ratio. | Zoom to 200% and check for clipped or overlapping content. | Used. |
| Adding ARIA roles to every native element would be redundant. | Unnecessary ARIA can make the accessibility tree harder to understand. | Reject extra roles where semantic HTML already supplies the meaning. | Inspect roles in browser accessibility tools. | Rejected. |

## Gemini critique

Gemini has not been run from this environment. Paste the shared prompt into
Gemini, then record its exact suggestions without presenting unverified advice
as a completed fix.

| Gemini suggestion | Useful or rejected | Browser verification | Commit |
|---|---|---|---|
| Pending | Pending | Pending | Pending |

## Verification rule

Only accept an AI suggestion after reproducing the issue or confirming the
behavior in the browser. Record rejected output too—for example, redundant
ARIA, an unnecessary dependency, or a claim of full WCAG compliance based only
on source code.
