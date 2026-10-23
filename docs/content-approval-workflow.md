# Content Approval Workflow

## Status

This is a proposed workflow based on simulated discovery evidence and instructor
requirements. It requires confirmation before becoming a final production
policy.

## Roles

| Role | Permitted responsibilities |
|---|---|
| Public visitor | Read approved public content and submit an inquiry if anonymous submission is approved |
| Property professional | Create, edit, submit, and resubmit owned property listings |
| Local sponsor | Create, edit, submit, and resubmit its own sponsor profile and promotional claims |
| Reviewer or administrator | Review, approve, reject, archive, or remove submitted content |
| System administrator | Manage roles and perform secure server-side administrative operations |

## Property Listing Workflow

| Current status | Actor | Action | Resulting status | Publicly visible |
|---|---|---|---|---|
| New | Property professional | Save incomplete listing | `draft` | No |
| `draft` | Property professional | Submit completed listing | `pending_review` | No |
| `pending_review` | Administrator | Approve listing | `approved` | Yes |
| `pending_review` | Administrator | Reject with correction reason | `rejected` | No |
| `rejected` | Owning property professional | Edit listing | `rejected` | No |
| `rejected` | Owning property professional | Resubmit corrected listing | `pending_review` | No |
| `approved` | Property professional | Submit material changes | `pending_review` | No, unless versioning is later approved |
| `approved` | Administrator | Archive or remove listing | `archived` | No |

## Sponsor Content Workflow

| Current status | Actor | Action | Resulting status | Publicly visible |
|---|---|---|---|---|
| New | Local sponsor | Save incomplete profile | `draft` | No |
| `draft` | Local sponsor | Submit profile or claim | `pending_review` | No |
| `pending_review` | Administrator | Approve sponsor content | `approved` | Yes, when placement is active |
| `pending_review` | Administrator | Reject with correction reason | `rejected` | No |
| `rejected` | Owning sponsor | Edit rejected content | `rejected` | No |
| `rejected` | Owning sponsor | Resubmit corrected content | `pending_review` | No |
| `approved` | Sponsor | Submit a material claim change | `pending_review` | No, unless versioning is later approved |
| `approved` | Administrator or expiration process | End placement | `archived` or `expired` | No |

## Approval Rules

1. Property professionals may create and edit their own records but may not
   approve or publish them.
2. Sponsors may manage their own records but may not approve their own profiles,
   claims, or placements.
3. Every rejection must include a correction reason.
4. Rejected records remain editable by their owners.
5. Only approved listings and active, approved sponsor content may be returned
   through public views.
6. Approval actions require an authorized administrative role.
7. Administrative authorization must be enforced securely on the server, not
   solely through hidden user-interface controls.
8. Private operational information and visitor inquiries are never included in
   public content responses.
9. Ownership does not grant authority to change an approval status directly.
10. Removal and emergency takedown actions should be recorded for later review.

## Inquiry Access Workflow

| Actor | Proposed access |
|---|---|
| Public visitor | Submit an inquiry; cannot browse stored inquiries |
| Assigned property professional | Read and respond to inquiries assigned to an owned listing |
| Authorized leasing-office member | Read and respond to inquiries assigned to the shared office |
| Unrelated authenticated user | No access |
| Administrator | Access only when required for authorized support or moderation |

## Decisions Addressed

1. **Can sponsors manage their own records?** Proposed yes, but only their own
   records and without self-approval.
2. **Must sponsor placements receive approval?** Proposed yes before public
   display.
3. **Can visitors submit inquiries without signing in?** Proposed for the MVP,
   but instructor confirmation is still required.
4. **Who can read inquiries?** Assigned property personnel, authorized office
   members, and appropriately authorized administrators.
5. **Can owners create listings but not approve them?** Yes.
6. **Can owners edit rejected listings?** Yes, followed by resubmission.
7. **What property information is public?** Only approved marketing fields such
   as price, availability, specifications, amenities, policies, and approved
   sponsor highlights.
8. **What requires administrator approval?** Listing publication, sponsor
   publication, sponsor promotional claims, approval-state changes, removal,
   and administrative role changes.

## Uncertainties Requiring Confirmation

- Whether approved content remains publicly visible while a revised version is
  reviewed.
- Whether minor corrections can bypass renewed approval.
- Whether anonymous inquiry submission is permitted.
- Whether reviewer and administrator are separate roles.
- Required audit-log and record-retention periods.
- Whether expired sponsor content is archived automatically.

## Proposed Week 8 Decisions

- Visitors may submit inquiries without signing in, subject to required-field
  validation and data minimization. This remains a proposed decision requiring
  instructor confirmation.
- When approved content receives a material edit, the edited record returns to
  `pending_review` and is hidden until reapproved.
- The Week 8 MVP routes each inquiry to one assigned property professional.
  Shared-office queues are deferred.
- Public responses use an explicit allowlist of approved marketing fields rather
  than returning complete database records.