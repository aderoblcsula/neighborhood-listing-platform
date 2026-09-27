# Accessibility and Responsive Test Notes

Tester: Aaron De Robles  
Feature branch: `feature/accessible-listing-components`

This file separates verified source-code review from browser tests that still
need to be performed. Do not replace a pending result with “looks good.” Record
the actual behavior, score, or failure.

## Source-code review completed

| Check | Result | Evidence |
|---|---|---|
| Semantic page structure | Pass in code review | One `main`; page sections have `h2` headings; each property is an `article` with an `h3`; sponsor content is an `aside`. |
| Form labels | Pass in code review | Both `select` elements have visible `label` elements connected with matching `htmlFor` and `id` values. |
| Image alternatives | Pass in code review | Every property includes a specific `imageAlt` value describing the home shown. |
| Stable React keys | Pass in code review | `properties.map` uses `property.id`, not the array index. |
| Responsive grid | Pass in code review | `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`. |
| Visible keyboard focus | Pass in code review | Selects, button, property links, and sponsor link use `focus-visible` outlines with offsets. |
| Form feedback | Pass in code review | The form displays validation or confirmation text in an `aria-live` status region. |

## Keyboard test procedure

Run `npm run dev`, open `http://localhost:3000`, and do not use the mouse.

1. Press **Tab** from the browser address bar through every page control.
2. Confirm the focus order is property type, maximum price, search button,
   three property links, and sponsor link.
3. Confirm every focused control has a clearly visible outline.
4. Use the arrow keys to choose a value in each select.
5. Press **Enter** or **Space** on the search button and confirm a status
   message appears.
6. Press **Shift+Tab** repeatedly and confirm focus moves backward in the
   reverse order.
7. Activate each link with **Enter** and record its destination.

### Keyboard results

| Control or action | Expected behavior | Actual result | Pass/fail | Fix or commit |
|---|---|---|---|---|
| Property type select | Visible focus; selection works with keyboard | Pending browser test | Pending | — |
| Maximum price select | Visible focus; selection works with keyboard | Pending browser test | Pending | — |
| Submit with empty fields | Specific message appears and is announced | Pending browser test | Pending | — |
| Submit with both fields | Confirmation message appears and is announced | Pending browser test | Pending | — |
| Three property links | Each receives focus and opens its specific destination | Pending browser test | Pending | — |
| Sponsor link | Receives focus; accessible name includes business name | Pending browser test | Pending | — |
| Reverse navigation | Shift+Tab follows reverse visual order | Pending browser test | Pending | — |

## Responsive test procedure

Use browser developer tools to test these exact viewport widths. Confirm there
is no horizontal scrolling and that text and controls are not clipped.

| Viewport | Expected layout | Actual result | Pass/fail | Screenshot filename |
|---|---|---|---|---|
| 375 px | One property-card column | Pending browser test | Pending | `375-mobile.png` |
| 768 px | Two property-card columns | Pending browser test | Pending | `768-tablet.png` |
| 1280 px | Three property-card columns | Pending browser test | Pending | `1280-desktop.png` |

## Lighthouse accessibility audit

1. Open the page in Chrome.
2. Open DevTools and select **Lighthouse**.
3. Select **Accessibility** and run the analysis.
4. Capture the score and every listed issue.
5. Fix verified issues, rerun the audit, and capture the new score.

September 26, 2026
Lighthouse reported an accessibility score of 100 and displayed no failed
accessibility audits. This automated result does not replace manual keyboard
testing.

## Automated checks


Lint result: Pass.  
Build result: Pass.
