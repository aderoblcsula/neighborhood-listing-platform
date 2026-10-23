begin;

create extension if not exists pgtap with schema extensions;

select plan(35);

-- Schema and RLS configuration
select has_table('public', 'profiles', 'profiles table exists');
select has_table('public', 'properties', 'properties table exists');
select has_table('public', 'sponsors', 'sponsors table exists');
select has_table('public', 'property_sponsors', 'property_sponsors table exists');
select has_table('public', 'inquiries', 'inquiries table exists');

select is(
  (
    select count(*)::bigint
    from pg_class c
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public'
      and c.relname in (
        'profiles', 'properties', 'sponsors', 'property_sponsors', 'inquiries'
      )
      and c.relrowsecurity
  ),
  5::bigint,
  'RLS is enabled on all five application tables'
);

-- Anonymous visitor
select set_config('request.jwt.claim.sub', '', true);
select set_config('request.jwt.claim.role', 'anon', true);
set local role anon;

select is(
  (select count(*)::bigint from public.properties
   where id = 'aaaaaaaa-aaaa-aaaa-aaaa-000000000001'),
  1::bigint,
  'anon can read an approved property'
);

select is(
  (select count(*)::bigint from public.properties
   where id = 'aaaaaaaa-aaaa-aaaa-aaaa-000000000002'),
  0::bigint,
  'anon cannot read a draft property'
);

select is(
  (select count(*)::bigint from public.sponsors
   where id = 'bbbbbbbb-bbbb-bbbb-bbbb-000000000001'),
  1::bigint,
  'anon can read an approved active sponsor'
);

select is(
  (select count(*)::bigint from public.sponsors
   where id = 'bbbbbbbb-bbbb-bbbb-bbbb-000000000002'),
  0::bigint,
  'anon cannot read a draft inactive sponsor'
);

select is(
  (select count(*)::bigint from public.property_sponsors
   where property_id = 'aaaaaaaa-aaaa-aaaa-aaaa-000000000001'
     and sponsor_id = 'bbbbbbbb-bbbb-bbbb-bbbb-000000000001'),
  1::bigint,
  'anon can read an approved active placement'
);

select throws_ok(
  $$select count(*) from public.inquiries$$,
  '42501', null,
  'anon cannot read stored inquiries'
);

select lives_ok(
  $$
    insert into public.inquiries (property_id, sender_name, sender_email, message)
    values (
      'aaaaaaaa-aaaa-aaaa-aaaa-000000000001',
      'Anonymous Test Visitor', 'anon-test@example.test',
      'This fictional inquiry should be accepted.'
    )
  $$,
  'anon can submit an inquiry for an approved open property'
);

select throws_ok(
  $$
    insert into public.inquiries (property_id, sender_name, sender_email, message)
    values (
      'aaaaaaaa-aaaa-aaaa-aaaa-000000000002',
      'Anonymous Test Visitor', 'anon-test@example.test',
      'This inquiry targets a draft property.'
    )
  $$,
  '42501', null,
  'anon cannot submit an inquiry for a draft property'
);

select throws_ok(
  $$
    insert into public.inquiries (property_id, sender_name, sender_email, message)
    values (
      'aaaaaaaa-aaaa-aaaa-aaaa-000000000004',
      'Anonymous Test Visitor', 'anon-test@example.test',
      'This property is closed to inquiries.'
    )
  $$,
  '42501', null,
  'anon cannot submit when accepts_inquiries is false'
);

select throws_ok(
  $$
    insert into public.properties (
      owner_id, title, street_address, city, state, zip_code, price,
      bedrooms, bathrooms, square_feet, property_type, description,
      review_status, availability_status, image_src, image_alt, details_href,
      amenities, accepts_inquiries
    ) values (
      '11111111-1111-1111-1111-111111111111',
      'Unauthorized Property', '1 Fictional Street', 'Los Angeles', 'CA',
      '90001', 1, 1, 1.0, 500, 'apartment',
      'This anonymous managed-content write must be denied.',
      'draft', 'available', '/unauthorized.svg',
      'Unauthorized fictional property',
      'https://example.test/properties/unauthorized',
      array['laundry']::text[], true
    )
  $$,
  '42501', null,
  'anon cannot create managed property content'
);

-- Property owner one
reset role;
select set_config(
  'request.jwt.claim.sub',
  '11111111-1111-1111-1111-111111111111', true
);
select set_config('request.jwt.claim.role', 'authenticated', true);
set local role authenticated;

select is(
  (select count(*)::bigint from public.properties
   where id = 'aaaaaaaa-aaaa-aaaa-aaaa-000000000002'),
  1::bigint,
  'owner can read their own draft property'
);

select is(
  (select count(*)::bigint from public.properties
   where id = 'aaaaaaaa-aaaa-aaaa-aaaa-000000000003'),
  0::bigint,
  'owner cannot read another owner unapproved property'
);

select lives_ok(
  $$
    update public.properties
    set title = 'Owner Updated Fictional Cottage'
    where id = 'aaaaaaaa-aaaa-aaaa-aaaa-000000000002'
  $$,
  'owner can update their own draft property'
);

select throws_ok(
  $$
    update public.properties
    set review_status = 'approved'
    where id = 'aaaaaaaa-aaaa-aaaa-aaaa-000000000002'
  $$,
  '42501', null,
  'owner cannot approve their own property'
);

select throws_ok(
  $$
    update public.properties
    set owner_id = '22222222-2222-2222-2222-222222222222'
    where id = 'aaaaaaaa-aaaa-aaaa-aaaa-000000000002'
  $$,
  '42501', null,
  'owner cannot transfer property ownership'
);

select is(
  (select count(*)::bigint from public.inquiries
   where id = 'cccccccc-cccc-cccc-cccc-000000000001'),
  1::bigint,
  'property owner can read inquiries for their property'
);

select throws_ok(
  $$
    update public.profiles
    set role = 'administrator'
    where id = '11111111-1111-1111-1111-111111111111'
  $$,
  '42501', null,
  'authenticated owner cannot escalate their profile role'
);

-- Unrelated property owner two
reset role;
select set_config(
  'request.jwt.claim.sub',
  '22222222-2222-2222-2222-222222222222', true
);
select set_config('request.jwt.claim.role', 'authenticated', true);
set local role authenticated;

select is(
  (select count(*)::bigint from public.inquiries
   where id = 'cccccccc-cccc-cccc-cccc-000000000001'),
  0::bigint,
  'unrelated owner cannot read another property inquiry'
);

select is(
  (select count(*)::bigint from public.properties
   where id = 'aaaaaaaa-aaaa-aaaa-aaaa-000000000002'),
  0::bigint,
  'unrelated owner cannot read another owner draft'
);

select is_empty(
  $$
    update public.properties
    set title = 'Unauthorized Hijacked Title'
    where id = 'aaaaaaaa-aaaa-aaaa-aaaa-000000000002'
    returning id
  $$,
  'unrelated owner update affects zero rows'
);

-- Sponsor owner
reset role;
select set_config(
  'request.jwt.claim.sub',
  '33333333-3333-3333-3333-333333333333', true
);
select set_config('request.jwt.claim.role', 'authenticated', true);
set local role authenticated;

select is(
  (select count(*)::bigint from public.sponsors
   where id = 'bbbbbbbb-bbbb-bbbb-bbbb-000000000002'),
  1::bigint,
  'sponsor owner can read their own draft sponsor record'
);

select lives_ok(
  $$
    update public.sponsors
    set name = 'Updated Fictional Home Services'
    where id = 'bbbbbbbb-bbbb-bbbb-bbbb-000000000002'
  $$,
  'sponsor owner can update their own draft record'
);

select throws_ok(
  $$
    update public.sponsors
    set review_status = 'approved'
    where id = 'bbbbbbbb-bbbb-bbbb-bbbb-000000000002'
  $$,
  '42501', null,
  'sponsor owner cannot self-approve'
);

select lives_ok(
  $$
    insert into public.property_sponsors (
      property_id, sponsor_id, display_priority, review_status, active
    ) values (
      'aaaaaaaa-aaaa-aaaa-aaaa-000000000001',
      'bbbbbbbb-bbbb-bbbb-bbbb-000000000002',
      2, 'pending_review', true
    )
  $$,
  'sponsor can request an unapproved placement on an approved property'
);

select is(
  (select count(*)::bigint from public.property_sponsors
   where property_id = 'aaaaaaaa-aaaa-aaaa-aaaa-000000000001'
     and sponsor_id = 'bbbbbbbb-bbbb-bbbb-bbbb-000000000002'),
  1::bigint,
  'sponsor can read their own unapproved placement request'
);

-- Anon still cannot see the newly created unapproved placement
reset role;
select set_config('request.jwt.claim.sub', '', true);
select set_config('request.jwt.claim.role', 'anon', true);
set local role anon;

select is(
  (select count(*)::bigint from public.property_sponsors
   where property_id = 'aaaaaaaa-aaaa-aaaa-aaaa-000000000001'
     and sponsor_id = 'bbbbbbbb-bbbb-bbbb-bbbb-000000000002'),
  0::bigint,
  'anon cannot see an unapproved placement request'
);

-- Service role bypass is reserved for trusted server code
reset role;
select set_config('request.jwt.claim.sub', '', true);
select set_config('request.jwt.claim.role', 'service_role', true);
set local role service_role;

select is(
  (select count(*)::bigint from public.properties),
  4::bigint,
  'service role can read all seeded properties'
);

select is(
  (select count(*)::bigint from public.inquiries),
  2::bigint,
  'service role can read the seeded and test inquiries'
);

select lives_ok(
  $$
    update public.properties
    set title = 'Trusted Server Administrative Update'
    where id = 'aaaaaaaa-aaaa-aaaa-aaaa-000000000001'
  $$,
  'service role can perform a trusted administrative update'
);

select * from finish();

rollback;
