# Verified Property Interview Themes

## Evidence Status

This analysis is based on three AI-generated simulated property-professional
stakeholders. No real property professionals were contacted. These findings are
working hypotheses requiring confirmation before becoming final requirements.

## Theme 1: Listing Review and Correction Workflow

The simulated stakeholders describe listing publication as a staged process.
Property personnel prepare or update listing information, an authorized role
reviews it, and rejected submissions return with correction information.

**Evidence:** SIM-PROP-01/Q01, Q03-Q04; SIM-PROP-02/Q01, Q03-Q04;
SIM-PROP-03/Q01, Q03-Q04.

**Inference:** The platform may need Draft, Submitted, Rejected, Published, and
Archived states. Exact roles and publishing permissions require confirmation.

## Theme 2: Public and Restricted Property Information

The responses distinguish public listing information from private operational
information. Public content may include price, property specifications, floor
plans, amenities, policies, and approved sponsor highlights. Showing
instructions, internal notes, lease records, maintenance logs, and tenant
communications should remain restricted.

**Evidence:** SIM-PROP-01/Q02 and Q05; SIM-PROP-02/Q02 and Q05;
SIM-PROP-03/Q02 and Q05.

**Inference:** The exact database and access-control design remains a technical
decision. Legal and instructor review may also be required.

## Theme 3: Inquiry Intake and Role-Based Routing

The simulated stakeholders prefer inquiries submitted through listing-page
forms. Independent-agent inquiries may route to the assigned agent, while
multi-family inquiries may route to a shared leasing-office queue.

**Evidence:** SIM-PROP-01/Q06-Q07, SIM-PROP-02/Q06-Q07,
SIM-PROP-03/Q06-Q07.

**Inference:** Whether visitors must authenticate, which fields are required,
and what spam-prevention measures are used require confirmation.

## Theme 4: Accessible and Responsive Property Management

The simulated stakeholders identify mobile and desktop access, keyboard
operation, readable presentation, and screen-reader support as important.

**Evidence:** SIM-PROP-01/Q08, SIM-PROP-02/Q08, SIM-PROP-03/Q08.

**Inference:** The precise accessibility target, device-testing matrix, and
low-bandwidth requirements require technical confirmation.

## Differences Among Simulated Stakeholders

- SIM-PROP-01 manages individual listings and prefers inquiries routed to the
  assigned agent.
- SIM-PROP-02 manages multi-unit properties and may require bulk availability
  updates and a shared inquiry queue.
- SIM-PROP-03 performs frequent availability updates and may require a simpler
  daily-update workflow.
- Approval responsibility varies between platform administrators and internal
  property managers.

## Candidate Requirements

| ID | Candidate requirement | Evidence | Status |
|---|---|---|---|
| PR-01 | Property professionals can create and update listing records. | Q01 across all three simulations | Evidence-supported hypothesis |
| PR-02 | Listings remain nonpublic until an authorized reviewer approves them. | Q03 across all three simulations | Requires role confirmation |
| PR-03 | Rejected submissions provide a specific correction reason. | Q04 across all three simulations | Evidence-supported hypothesis |
| PR-04 | A submitter can correct and resubmit an existing listing. | Q04 across all three simulations | Evidence-supported hypothesis |
| PR-05 | Approved property information is publicly readable. | Q02 and Q05 | Evidence-supported hypothesis |
| PR-06 | Private operational and tenant-related information is restricted. | Q05 across all three simulations | Evidence-supported hypothesis |
| PR-07 | Visitors can submit inquiries through a listing form. | Q06 across all three simulations | Authentication requirement unconfirmed |
| PR-08 | Inquiries route to an assigned agent or authorized office queue. | Q06 across all three simulations | Evidence-supported hypothesis |
| PR-09 | Listing interfaces support accessible mobile and desktop use. | Q08 across all three simulations | Evidence-supported hypothesis |
| PR-10 | Multi-unit properties may support batch availability updates. | SIM-PROP-02/Q01 | Requires MVP confirmation |

## Uncertainties Requiring Confirmation

- Can owners create listings but not approve them?
- Can owners edit rejected or published listings?
- Which role provides final publication approval?
- What exact property fields are publicly visible?
- Can visitors submit inquiries without signing in?
- Who can view, assign, respond to, and delete inquiries?
- Are batch imports included in the Week 8 MVP?
- Which accessibility standard and testing method will be used?