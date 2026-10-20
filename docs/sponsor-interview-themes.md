
# Verified Sponsor Interview Themes

## Evidence Status

This analysis is based on three AI-generated simulated sponsor stakeholders and
24 simulated responses. No real businesses were contacted. The findings are
working hypotheses and require confirmation before becoming final product
requirements.

## Theme 1: Sponsor Content Review and Correction

All three simulated sponsors support a workflow in which sponsors create and
maintain their content while platform personnel review content before
publication. Rejected submissions should include a reason and allow correction
and resubmission without requiring the sponsor to re-enter the entire
submission.

**Evidence:** SIM-SPON-01/Q03-Q04, SIM-SPON-02/Q03-Q04,
SIM-SPON-03/Q03-Q04.

**Inference:** Exact workflow statuses, field-locking behavior, reviewer roles,
and approval turnaround times require confirmation.

## Theme 2: Public and Restricted Sponsor Information

The simulated responses distinguish public business information from restricted
operational information. Public information may include business names,
locations, public contact information, operating hours, service categories, and
promotional descriptions. Employee, supplier, financial, scheduling, and
internal operational records should not be publicly visible.

**Evidence:** SIM-SPON-01/Q05, SIM-SPON-02/Q05, SIM-SPON-03/Q05.

**Inference:** The database structure and API controls used to enforce this
separation remain implementation decisions.

## Theme 3: Aggregate and Privacy-Conscious Analytics

The simulated sponsors prefer aggregate measurements such as impressions,
profile views, link clicks, inquiries, or coupon activity. They do not identify
a need for individual visitor profiles or unnecessary personal tracking.

**Evidence:** SIM-SPON-01/Q07, SIM-SPON-02/Q07, SIM-SPON-03/Q07.

**Inference:** The exact analytics technology, retention period, and definition
of personal or unnecessary tracking require confirmation.

## Theme 4: Accessible and Responsive Sponsor Content

All three simulated sponsors identify mobile and desktop support, descriptive
alternative text, readable presentation, and screen-reader accessibility as
important. Secure external links and accessible forms are also mentioned.

**Evidence:** SIM-SPON-01/Q08, SIM-SPON-02/Q08, SIM-SPON-03/Q08.

**Inference:** Automated accessibility checks may help, but their placement and
enforcement behavior require technical validation and stakeholder confirmation.

## Differences Among Simulated Sponsors

- SIM-SPON-01 prefers sponsor placement near geographically relevant property
  listings.
- SIM-SPON-02 and SIM-SPON-03 prefer neighborhood directories, guides, or
  community pages instead of individual listings.
- Placement duration differs among seasonal, annual, and flexible campaign
  schedules.
- Required profile fields vary by sponsor type, including dietary information,
  licensing credentials, service areas, holiday schedules, and featured
  merchandise.

## Uncertainties Requiring Confirmation

- Whether sponsor placements require administrator approval in every case.
- Which claims, credentials, and promotional statements require verification.
- Whether sponsors can edit published content directly or must resubmit it.
- Which placement locations are acceptable to property professionals.
- Whether the platform supports manual entry, file import, or external feeds.
- Who may view sponsor inquiries and aggregate analytics.
- The required review time, appeal process, and emergency-removal procedure.
- Image limits, supported formats, accessibility-testing procedures, and data
  retention rules.

## Candidate Requirements

| ID | Candidate requirement | Evidence | Status |
|---|---|---|---|
| SR-01 | Sponsors can create and update public business-profile information. | Q01 across all three simulations | Evidence-supported hypothesis |
| SR-02 | Sponsor content enters review before public publication. | Q03 across all three simulations | Evidence-supported hypothesis |
| SR-03 | A rejected submission displays a specific correction reason. | Q04 across all three simulations | Evidence-supported hypothesis |
| SR-04 | Sponsors can correct and resubmit content without re-entering the entire submission. | Q04 across all three simulations | Evidence-supported hypothesis |
| SR-05 | Restricted operational information is excluded from public views. | Q05 across all three simulations | Evidence-supported hypothesis |
| SR-06 | Sponsor placement supports an expiration or renewal date. | Q06 across all three simulations | Evidence-supported hypothesis |
| SR-07 | Sponsor reports use aggregate engagement measures without unnecessary personal tracking. | Q07 across all three simulations | Evidence-supported hypothesis |
| SR-08 | Sponsor content supports alternative text, screen readers, and responsive layouts. | Q08 across all three simulations | Evidence-supported hypothesis |
| SR-09 | Placement locations can vary between property-adjacent and neighborhood-directory contexts. | Q06 across all three simulations | Requires stakeholder confirmation |
| SR-10 | Sponsor profiles may use category-specific fields. | Q02 across all three simulations | Requires scope confirmation |