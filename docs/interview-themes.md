# Verified Interview Themes

## Verification Status

# Verified Interview Themes

## Simulation Notice

These themes were derived from three AI-generated property-professional
scenarios. They are working hypotheses for an academic exercise, not
findings from real stakeholder interviews.

Repeated answers cannot be treated as independent stakeholder
confirmation because one AI system generated all three scenarios.

## Verification Method

AI Studio's summary was compared with the original response identified
by each Stakeholder ID and Question ID. Unsupported technical,
architectural, legal, and stakeholder claims were removed or labeled as
inferences.

There are currently zero requirements confirmed by real stakeholders.

## Theme 1: Content Lifecycle and Review

### Supporting responses

- SIM-PROP-01/Q01, Q03, Q04
- SIM-PROP-02/Q01, Q03, Q04
- SIM-PROP-03/Q01, Q03, Q04

### Verified pattern

The simulated scenarios describe content being drafted, reviewed,
corrected, and published through more than one operational step.
Rejected content should include useful feedback and should be available
for correction and resubmission.

The scenarios differ on who performs approval. The independent-agent
scenario refers to platform-administrator oversight, while the
residential scenarios assign review responsibilities to property
managers.

### Candidate requirements

- Authorized users can draft content without immediately publishing it.
- Reviewers can approve, reject, or request changes.
- A rejected submission includes a reason or field-level explanation.
- Authorized owners can correct and resubmit rejected content.
- Unapproved content is not displayed publicly.

### Inference

A persistent status is likely necessary to distinguish unapproved
content from published content. Exact status names and transitions
require confirmation.

## Theme 2: Public and Restricted Information

### Supporting responses

- SIM-PROP-01/Q02, Q05
- SIM-PROP-02/Q02, Q05
- SIM-PROP-03/Q02, Q05

### Verified pattern

The simulated scenarios distinguish public marketing information from
restricted operational information.

Possible public information includes pricing, property specifications,
availability, floor plans, amenities, and approved sponsor information.

Possible restricted information includes internal notes, showing
instructions, lease records, maintenance logs, visitor communications,
and administrative logs.

### Candidate requirements

- Public users can view approved public listing information.
- Internal operational information is not exposed publicly.
- Access to restricted information depends on an authorized role.
- Sponsor information is displayed publicly only after approval.

### Inference

The application will need an authorization mechanism that prevents
public access to restricted information. The notes do not determine
whether this should use separate tables, database views, field
selection, row-level policies, or another implementation.

## Theme 3: Inquiry Intake and Routing

### Supporting responses

- SIM-PROP-01/Q06, Q07
- SIM-PROP-02/Q06, Q07
- SIM-PROP-03/Q06, Q07

### Verified pattern

All three simulations describe visitor inquiries being submitted
through a web form. They differ on the appropriate destination.

The independent-agent scenario routes an inquiry to the assigned agent.
The property-manager and leasing-coordinator scenarios route inquiries
to a shared leasing-office queue.

### Candidate requirements

- A visitor can submit an inquiry through a listing page.
- Inquiry access is restricted to authorized recipients.
- An inquiry is associated with the relevant property listing.
- Routing may support an assigned individual or a shared office queue.
- The system collects only the information required to answer the
  inquiry.

### Inference

Supporting both individual and shared routing may require a configurable
routing rule. The final routing model requires stakeholder confirmation.

## Role Differences

### Independent real-estate agent

- Manages individual listing updates across multiple systems.
- May require direct inquiry routing.
- Describes platform administrators as final content reviewers.
- Prioritizes sale price and property specifications.

### Residential property manager

- Manages multiple units and structured internal review.
- May require batch imports.
- Routes inquiries to a shared leasing team.
- Prioritizes rental pricing, floor plans, fees, and amenities.

### Leasing-office coordinator

- Performs frequent availability updates.
- Relies on a property manager for publication approval.
- Routes inquiries through a shared office queue.
- Prioritizes unit availability, lease specials, and pet policies.

## Additional Candidate Requirements

### Responsive and accessible interface

Supporting responses:

- SIM-PROP-01/Q08
- SIM-PROP-02/Q08
- SIM-PROP-03/Q08

The interface should support desktop and mobile use, readable text
scaling, screen-reader use, visible focus, and keyboard operation.
Specific accessibility conformance targets and test environments require
technical and instructor confirmation.

### Operational measurements

Supporting responses:

- SIM-PROP-01/Q07
- SIM-PROP-02/Q07
- SIM-PROP-03/Q07

Possible measures include update time, publishing delay, errors,
inquiry volume, system reliability, and vacancy turnaround. The final
measures and authorized viewers require confirmation.

### Batch updates

Supporting response:

- SIM-PROP-02/Q01

Bulk import and schema validation may benefit multi-unit property
management. This is supported by only one simulated scenario and should
not automatically enter the minimum viable product.

## Rejected AI Suggestions

### Automated rate limiting

Rejected because the notes mention legitimate inquiries but do not
request rate limiting or define an abuse problem.

### Offline or low-bandwidth operation

Rejected because the notes mention mobile devices but do not describe
offline use or unreliable network conditions.

### Mandatory separation of public and private database tables

Rejected because the notes support access separation but do not
determine the database architecture.

### Administrators serving only as auditors

Rejected because the notes assign administrators several possible
responsibilities and do not restrict them to auditing.

### Confirmed sponsor self-management

Rejected because no local sponsor was interviewed. Sponsor-management
permissions remain an assumption.

### Specific legal conclusions

Rejected because the simulated notes do not establish legal retention,
advertising, or fair-housing requirements. Appropriate policies require
qualified institutional or legal guidance.

## Uncertainties Requiring Confirmation

1. Can owners publish any changes without secondary approval?
2. Who provides final approval for property listings?
3. Can owners edit and resubmit rejected listings?
4. Which exact listing fields are public?
5. Are property addresses always public?
6. Can visitors submit inquiries without signing in?
7. Who can view, assign, and respond to inquiries?
8. How long should inquiry information be retained?
9. Should inquiries route to individuals, teams, or both?
10. Which metrics should the platform collect?
11. Who can view platform metrics?
12. Which accessibility standard and browsers should be tested?
13. Does the MVP require bulk property imports?
14. Can sponsors create and edit their own submissions?
15. Who approves sponsor placements and promotional claims?

## Requirements Traceability

| Candidate requirement | Supporting responses | Evidence status | Confirmation required |
|---|---|---|---|
| Draft content before publication | PROP-01/Q03, PROP-02/Q03, PROP-03/Q03 | Simulated pattern | Exact roles and states |
| Reject with an explanation | PROP-01/Q04, PROP-02/Q04, PROP-03/Q04 | Simulated pattern | Notification method |
| Correct and resubmit rejected content | PROP-01/Q04, PROP-02/Q04, PROP-03/Q04 | Simulated pattern | Owner permissions |
| Show approved public listing data | PROP-01/Q05, PROP-02/Q05, PROP-03/Q05 | Simulated pattern | Exact public fields |
| Restrict internal information | PROP-01/Q05, PROP-02/Q05, PROP-03/Q05 | Simulated pattern | Roles and retention |
| Submit an inquiry through a listing | PROP-01/Q06, PROP-02/Q06, PROP-03/Q06 | Simulated pattern | Authentication requirement |
| Restrict inquiry access | PROP-01/Q06, PROP-02/Q06, PROP-03/Q06 | Simulated pattern | Authorized recipients |
| Support responsive and accessible use | PROP-01/Q08, PROP-02/Q08, PROP-03/Q08 | Simulated pattern | Standard and test matrix |
| Import multiple unit records | PROP-02/Q01 | Single simulated scenario | MVP priority and formats |
| Manage sponsor records | None from actual sponsors | Assumption | Sponsor confirmation |
