# Data Contract Requirements

## Purpose

This document identifies the minimum data required by the neighborhood
listing platform. All listing and sponsor information used for this lab is
fictional and synthetic.

## Property Card

A property card requires:

- Property ID
- Property title
- Street address
- City
- State
- ZIP code
- Price
- Bedrooms
- Bathrooms
- Square feet
- Property type
- Image source
- Image alternative text
- Property details link
- Amenities
- Local sponsors

## Property Detail Page

A property detail page requires all property-card fields plus:

- Property description
- Listing status
- Complete amenities list
- Sponsor information
- Voice-response summary

## Sponsor Selection

Sponsor selection requires:

- Sponsor ID
- Sponsor name
- Sponsor category
- Sponsor description
- Sponsor website URL
- Active status
- Property relationship
- Display priority

## Voice Response

A voice response requires:

- Property ID
- Property title
- City and state
- Price
- Bedrooms
- Bathrooms
- Square feet
- Short description
- Important amenities
- Selected sponsor name

## Data Concepts and Relationships

### Property

A Property represents one fictional real-estate listing.

Primary key:

- `property_id`

A property stores listing-specific information such as its address, price,
bedrooms, bathrooms, square footage, property type, amenities, image, and
listing status.

### Sponsor

A Sponsor represents one fictional local business or organization.

Primary key:

- `sponsor_id`

A sponsor stores information such as its name, category, description, website
URL, and active status. Sponsor details are stored separately so the same
sponsor information does not have to be copied into every property record.

### PropertySponsor

A PropertySponsor connects a Property to a Sponsor.

Composite primary key:

- `property_id`
- `sponsor_id`

Additional relationship field:

- `display_priority`

`property_id` is a foreign key referring to Property. `sponsor_id` is a
foreign key referring to Sponsor.

## Relationship Type

Property and Sponsor have a many-to-many relationship:

- One property can have multiple sponsors.
- One sponsor can be associated with multiple properties.
- PropertySponsor records represent these associations.

## Normalization Decision

Property, Sponsor, and PropertySponsor are separate concepts because sponsor
information would otherwise be duplicated in multiple property records.
Separating them reduces inconsistent names, descriptions, categories, and
website URLs.