# Requirements Traceability Matrix

## Purpose

This matrix connects each candidate user story to its discovery evidence,
working persona, acceptance criteria, MVP decision, and remaining confirmation
needs. Simulated evidence does not represent validated stakeholder consensus.

| Story | Evidence source | Persona or role | Acceptance criteria | MVP | Confirmation still required |
|---|---|---|---|---|---|
| US-01 | PR-01; Property Theme 1; SIM-PROP-01–03/Q01 | Property professional | Listing is created as `pending_review` and remains nonpublic | Yes | Required listing fields and owner permissions |
| US-02 | PR-02–PR-04; SIM-PROP-01–03/Q03-Q04 | Administrator | Administrator can approve or reject with a stored reason | Yes | Exact reviewer roles and approval turnaround |
| US-03 | PR-03–PR-04; SIM-PROP-01–03/Q04 | Property professional | Owner edits and resubmits the existing rejected record | Yes | Revision history and minor-edit rules |
| US-04 | PR-05–PR-06; Property Theme 2 | Public visitor | Only approved public fields are returned | Yes | Final list of publicly visible property fields |
| US-05 | SR-01; Sponsor Themes 1–2; SIM-SPON-01–03/Q01 | Local sponsor | Sponsor submits its own profile and cannot edit another sponsor's record | Yes | Required sponsor fields and self-service scope |
| US-06 | SR-02–SR-04; SIM-SPON-01–03/Q03-Q04 | Administrator | Sponsor content is approved or rejected with a correction reason | Yes | Which claims require verification |
| US-07 | PR-07–PR-08; SIM-PROP-01–03/Q06 | Public visitor | Valid submission creates one listing-linked inquiry | Yes | Whether submission requires authentication |
| US-08 | PR-08; Property Theme 3 | Property professional | Authorized assignee can read an inquiry; unrelated users are denied | Yes | Shared-office routing is deferred; MVP uses direct assignment |
| US-09 | Instructor Lab 5 RLS requirements | Security administrator | RLS denies access unless an explicit policy permits it | Yes | Final role-policy matrix and administrator implementation |
| US-10 | Instructor Lab 5 migration requirements | Developer | Clean database can be reproduced from versioned migrations | Yes | Migration naming and deployment procedure |
| US-11 | SR-07; Sponsor Theme 3; SIM-SPON-01–03/Q07 | Local sponsor | Not yet defined because story is outside the MVP | No | Metrics, retention, and privacy boundaries |
| US-12 | PR-10; SIM-PROP-02/Q01 | Property manager | Not yet defined because story is outside the MVP | No | File formats, schema, and synchronization scope |
| US-13 | PR-09; SR-08; Property Theme 4; Sponsor Theme 4 | Visitor using assistive technology | Keyboard operation, visible focus, labels, headings, alt text, and associated errors are verified | Yes | Formal WCAG target and assistive-technology test matrix |

## Traceability Rules

1. A story supported by simulated evidence remains a candidate requirement.
2. Instructor-mandated security and migration requirements are identified
   separately from simulated stakeholder findings.
3. Inferred implementation details must remain labeled as inferences.
4. A requirement cannot move to Ready if its acceptance criteria are missing.
5. A requirement with unresolved policy questions may enter Ready only when the
   uncertainty is recorded and does not affect safe implementation.
6. Public visibility must always depend on approved status.
7. Ownership and administrative approval are separate permissions.
8. Private inquiry and operational data must never be exposed through public
   access paths.

## Deferred Items

The following are outside the proposed Week 8 MVP:

- Aggregate sponsor analytics
- Bulk property import
- Automated external data feeds
- Advanced campaign scheduling
- Full listing revision history
- Automated accessibility enforcement
- Shared leasing-office inquiry routing