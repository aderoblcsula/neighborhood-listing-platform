-- Fictional development data only. No login-capable passwords are created.

insert into auth.users (id, email, raw_user_meta_data)
values
  (
    '11111111-1111-1111-1111-111111111111',
    'owner-one@example.test',
    '{"purpose":"fictional local seed"}'::jsonb
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'owner-two@example.test',
    '{"purpose":"fictional local seed"}'::jsonb
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'sponsor-owner@example.test',
    '{"purpose":"fictional local seed"}'::jsonb
  ),
  (
    '44444444-4444-4444-4444-444444444444',
    'admin-user@example.test',
    '{"purpose":"fictional local seed"}'::jsonb
  );

insert into public.profiles (id, display_name, role)
values
  ('11111111-1111-1111-1111-111111111111', 'Fictional Property Owner One', 'property_professional'),
  ('22222222-2222-2222-2222-222222222222', 'Fictional Property Owner Two', 'property_professional'),
  ('33333333-3333-3333-3333-333333333333', 'Fictional Sponsor Owner', 'sponsor'),
  ('44444444-4444-4444-4444-444444444444', 'Fictional Administrator', 'administrator');

insert into public.properties (
  id, owner_id, title, street_address, city, state, zip_code, price,
  bedrooms, bathrooms, square_feet, property_type, description,
  review_status, availability_status, image_src, image_alt, details_href,
  amenities, accepts_inquiries
)
values
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-000000000001',
    '11111111-1111-1111-1111-111111111111',
    'Cedar Grove Townhome', '101 Fictional Cedar Avenue', 'Los Angeles',
    'CA', '90001', 625000.00, 3, 2.5, 1650, 'townhome',
    'A fictional townhome with accessible neighborhood amenities.',
    'approved', 'available', '/property-cedar.svg',
    'Illustration of the fictional Cedar Grove townhome',
    'https://example.test/properties/cedar-grove-townhome',
    array['accessible-entry', 'air-conditioning', 'patio']::text[], true
  ),
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-000000000002',
    '11111111-1111-1111-1111-111111111111',
    'Maple Court Cottage', '202 Fictional Maple Street', 'Los Angeles',
    'CA', '90002', 485000.00, 2, 1.0, 980, 'cottage',
    'A fictional cottage awaiting review before public publication.',
    'draft', 'available', '/property-maple.svg',
    'Illustration of the fictional Maple Court cottage',
    'https://example.test/properties/maple-court-cottage',
    array['community-garden', 'hardwood-floors']::text[], true
  ),
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-000000000003',
    '22222222-2222-2222-2222-222222222222',
    'Juniper Place Apartment', '303 Fictional Juniper Road', 'Pasadena',
    'CA', '91101', 3200.00, 2, 2.0, 1100, 'apartment',
    'A fictional apartment owned by the second test professional.',
    'pending_review', 'available', '/property-juniper.svg',
    'Illustration of the fictional Juniper Place apartment',
    'https://example.test/properties/juniper-place-apartment',
    array['air-conditioning', 'laundry']::text[], true
  ),
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-000000000004',
    '11111111-1111-1111-1111-111111111111',
    'Oak Terrace Condominium', '404 Fictional Oak Boulevard', 'Glendale',
    'CA', '91201', 710000.00, 3, 2.0, 1450, 'condominium',
    'A fictional approved property that is closed to new inquiries.',
    'approved', 'sold', '/property-oak.svg',
    'Illustration of the fictional Oak Terrace condominium',
    'https://example.test/properties/oak-terrace-condominium',
    array['balcony', 'garage', 'pool']::text[], false
  );

insert into public.sponsors (
  id, owner_id, name, category, description, website_url,
  review_status, active
)
values
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-000000000001',
    '33333333-3333-3333-3333-333333333333',
    'Fictional Neighborhood Cafe', 'food-and-dining',
    'A fictional neighborhood cafe used only for local development tests.',
    'https://cafe.example.test', 'approved', true
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-000000000002',
    '33333333-3333-3333-3333-333333333333',
    'Fictional Home Services', 'home-services',
    'A fictional home-services sponsor awaiting content review.',
    'https://home-services.example.test', 'draft', false
  );

insert into public.property_sponsors (
  property_id, sponsor_id, display_priority, review_status, active
)
values
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-000000000001',
    'bbbbbbbb-bbbb-bbbb-bbbb-000000000001',
    1, 'approved', true
  );

insert into public.inquiries (
  id, property_id, sender_name, sender_email, message
)
values
  (
    'cccccccc-cccc-cccc-cccc-000000000001',
    'aaaaaaaa-aaaa-aaaa-aaaa-000000000001',
    'Fictional Visitor', 'visitor@example.test',
    'This is a fictional inquiry used to verify private inquiry access.'
  );
