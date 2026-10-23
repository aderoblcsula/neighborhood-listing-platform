# Product Backlog

## Evidence Status

This backlog translates simulated discovery findings into candidate product
requirements. Items supported only by simulated interviews remain working
hypotheses requiring confirmation. Technical security stories reflect the
Lab 4/Lab 5 requirements supplied by the instructor.

## Backlog

| ID | User story | Priority | Estimate | Owner | Week 8 MVP | Traceability |
|---|---|---:|---:|---|---|---|
| US-01 | As a property professional, I want to create and submit a property listing so that accurate property information can be reviewed for publication. | High | M | CSULA Team Echo | Yes | PR-01, Property Theme 1 |
| US-02 | As an administrator, I want to approve or reject submitted listings with a reason so that only reviewed listings become publicly visible. | High | M | CSULA Team Echo | Yes | PR-02–PR-04, Property Theme 1 |
| US-03 | As a property professional, I want to edit and resubmit my rejected listing so that I can correct problems without recreating the record. | High | M | CSULA Team Echo | Yes | PR-03–PR-04, SIM-PROP-01–03/Q04 |
| US-04 | As a public visitor, I want to browse approved property information so that I can evaluate available neighborhood properties without viewing restricted data. | High | S | CSULA Team Echo | Yes | PR-05–PR-06, Property Theme 2 |
| US-05 | As a local sponsor, I want to create and update my business profile so that my public information remains accurate. | High | M | CSULA Team Echo | Yes | SR-01, Sponsor Themes 1–2 |
| US-06 | As an administrator, I want to review sponsor content and promotional claims before publication so that unapproved claims are not displayed publicly. | High | M | CSULA Team Echo | Yes | SR-02–SR-04, Sponsor Theme 1 |
| US-07 | As a public visitor, I want to submit an inquiry from a property listing so that I can contact the responsible property professional. | High | M | CSULA Team Echo | Yes | PR-07–PR-08, Property Theme 3 |
| US-08 | As an authorized property professional, I want to view inquiries assigned to me so that I can respond without exposing them to unrelated users. | High | M | CSULA Team Echo | Yes | PR-08, Property Theme 3 |
| US-09 | As a security administrator, I want row-level security enabled on every application table so that unauthorized reads and writes are denied by default. | High | L | CSULA Team Echo | Yes | Instructor Lab 5 requirement |
| US-10 | As a developer, I want database changes stored in versioned migration files so that schema changes are reproducible and reviewable. | Medium | M | CSULA Team Echo | Yes | Instructor Lab 5 requirement |
| US-11 | As a local sponsor, I want aggregate placement metrics so that I can evaluate engagement without unnecessary personal tracking. | Medium | M | CSULA Team Echo | No | SR-07, Sponsor Theme 3 |
| US-12 | As a property manager, I want to import multiple unit-availability records so that I can update a portfolio efficiently. | Low | L | CSULA Team Echo | No | PR-10, SIM-PROP-02/Q01 |
| US-13 | As a visitor using assistive technology, I want public listings, sponsor content, and inquiry forms to support keyboard and screen-reader use so that I can access the platform without relying on a mouse or visual-only content. | High | S | CSULA Team Echo | Yes | PR-09, SR-08, Property Theme 4, Sponsor Theme 4 |

## Requirements Requiring Confirmation

- Whether visitors may submit inquiries without signing in.
- Whether property owners can approve their own listings.
- Whether owners can directly edit published listings.
- Whether every sponsor placement and promotional claim requires approval.
- Whether inquiry access belongs to an individual agent, a shared office queue,
  or both.
- Which exact property and sponsor fields are publicly visible.
- Whether sponsor analytics and property batch imports belong in a later release.

## Week 8 Minimum Viable Product

The proposed Week 8 MVP includes:

- Property listing creation and submission
- Administrator approval or rejection
- Correction and resubmission of rejected listings
- Public browsing of approved listings
- Sponsor-profile submission and approval
- Public inquiry submission
- Restricted inquiry access
- Default-deny row-level security
- Versioned database migrations
- Keyboard-accessible and screen-reader-compatible public interfaces

Aggregate sponsor analytics and bulk property imports are deferred until the
core approval, visibility, inquiry, and security workflows are verified.

## High-Priority Acceptance Criteria

### US-01: Submit Property Listing

**Scenario: Owner submits a new listing for review**

- **Given** an authenticated property professional is authorized to create
  listings
- **When** the professional completes the required listing fields and submits
  the listing
- **Then** the system creates the listing with a `pending_review` status
- **And** the listing is not visible in public listing results

### US-02: Review Property Listing

**Scenario: Administrator approves a pending listing**

- **Given** an administrator is authenticated and a listing has
  `pending_review` status
- **When** the administrator approves the listing
- **Then** the listing status changes to `approved`
- **And** the listing becomes eligible for public display

**Scenario: Administrator rejects a pending listing**

- **Given** an administrator is authenticated and a listing has
  `pending_review` status
- **When** the administrator enters a correction reason and rejects the listing
- **Then** the listing status changes to `rejected`
- **And** the correction reason is stored with the listing
- **And** the listing remains hidden from public visitors

### US-03: Correct Rejected Listing

**Scenario: Owner corrects and resubmits a rejected listing**

- **Given** an authenticated property professional owns a listing with
  `rejected` status
- **When** the owner updates the listing and resubmits it
- **Then** the existing listing record is updated
- **And** its status changes to `pending_review`
- **And** it remains hidden until approved

### US-04: Browse Approved Listings

**Scenario: Visitor views public property information**

- **Given** an approved listing exists
- **When** a visitor opens the public listings page
- **Then** the approved listing is displayed
- **And** only approved public fields are included
- **And** private notes, showing instructions, tenant records, and internal
  management information are excluded

**Scenario: Visitor cannot view an unapproved listing**

- **Given** a listing has `draft`, `pending_review`, or `rejected` status
- **When** a public visitor requests the listing
- **Then** the listing is not returned in the public response

### US-05: Manage Sponsor Profile

**Scenario: Sponsor submits a profile for review**

- **Given** an authenticated sponsor is authorized to manage its own sponsor
  record
- **When** the sponsor enters the required public business information and
  submits the profile
- **Then** the profile is stored with `pending_review` status
- **And** the sponsor cannot modify another sponsor's record
- **And** the submitted profile is not publicly visible until approved

### US-06: Review Sponsor Content

**Scenario: Administrator approves sponsor content**

- **Given** an administrator is authenticated and sponsor content has
  `pending_review` status
- **When** the administrator approves the content
- **Then** its status changes to `approved`
- **And** an active placement may display it publicly

**Scenario: Administrator rejects a sponsor claim**

- **Given** an administrator is reviewing submitted sponsor content
- **When** the administrator provides a correction reason and rejects it
- **Then** its status changes to `rejected`
- **And** the sponsor can view the correction reason
- **And** the rejected content remains hidden from public visitors

### US-07: Submit Visitor Inquiry

**Scenario: Visitor submits a valid inquiry**

- **Given** an approved public listing accepts inquiries
- **When** a visitor submits the required contact information and inquiry
  message
- **Then** one inquiry record is created and associated with that listing
- **And** the visitor receives a confirmation that the inquiry was submitted
- **And** the public response does not expose internal routing information

**Scenario: Invalid inquiry is rejected**

- **Given** a visitor is using the inquiry form
- **When** the visitor submits missing or invalid required fields
- **Then** no inquiry record is created
- **And** the form displays specific validation errors

> **Confirmation required:** This scenario currently assumes visitors can submit
> inquiries without signing in. Instructor or stakeholder confirmation is
> required before treating anonymous submission as a final requirement.

### US-08: Restrict Inquiry Access

**Scenario: Assigned property professional reads an inquiry**

- **Given** an authenticated property professional is assigned to a listing
- **When** the professional requests inquiries for that listing
- **Then** only inquiries associated with that professional's assigned listings
  are returned

**Scenario: Unrelated user is denied inquiry access**

- **Given** an authenticated user is not assigned to the listing
- **When** that user requests the listing's inquiries
- **Then** the request is denied
- **And** no inquiry contact information or message content is returned

### US-09: Enforce Row-Level Security

**Scenario: Owner cannot access another owner's unapproved listing**

- **Given** two authenticated property professionals own different listings
- **When** one professional attempts to read, edit, or delete the other
  professional's unapproved listing
- **Then** the database denies the operation
- **And** no private listing data is returned

**Scenario: Content owner cannot self-approve**

- **Given** an authenticated property professional or sponsor owns an
  unapproved record
- **When** the owner attempts to change its status directly to `approved`
- **Then** the database denies the status change
- **And** the record remains unapproved

**Scenario: Unauthenticated user cannot create managed content**

- **Given** a user is not authenticated
- **When** the user attempts to create or modify a property listing or sponsor
  profile
- **Then** the operation is denied
- **And** no managed-content record is created


### US-10: Use Versioned Database Migrations

**Scenario: Schema is reproducible from migration files**

- **Given** a clean development database
- **When** the versioned migrations are applied in filename order
- **Then** all required tables, keys, constraints, RLS settings, and policies are
  created without manual database edits

**Scenario: Migration files contain no secrets**

- **Given** the migration directory is ready for commit
- **When** the files are reviewed
- **Then** no database passwords, service-role keys, access tokens, or production
  credentials are present

### US-13: Accessible Public Interface

**Scenario: Public content is operable by keyboard**

- **Given** a visitor uses only a keyboard
- **When** the visitor navigates listings, sponsor content, and the inquiry form
- **Then** every interactive control can receive visible keyboard focus
- **And** the visitor can activate each control without using a mouse

**Scenario: Public content has accessible names and structure**

- **Given** a visitor uses a screen reader
- **When** the visitor opens a public listing or sponsor profile
- **Then** headings and form labels identify their associated content
- **And** informative images have descriptive alternative text
- **And** validation errors are programmatically associated with the relevant
  form fields

> A specific WCAG conformance level requires instructor confirmation and
> additional formal accessibility testing.