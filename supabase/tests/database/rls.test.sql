begin;

create extension if not exists pgtap with schema extensions;
select no_plan();

-- Additional fictional user for the ordinary-inquirer tests.
insert into auth.users (id, email)
values (
  '55555555-5555-5555-5555-555555555555',
  'exam-inquirer@example.test'
);

insert into public.profiles (id, role)
values (
  '55555555-5555-5555-5555-555555555555',
  'public'
);

-- Verify RLS configuration.
select is(
  (
    select count(*)::bigint
    from pg_class c
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public'
      and c.relname in (
        'profiles', 'properties', 'sponsors',
        'property_sponsors', 'inquiries'
      )
      and c.relrowsecurity
  ),
  5::bigint,
  'RLS is enabled on all five tables'
);

-- Anonymous access.
select set_config('request.jwt.claim.sub', '', true);
select set_config('request.jwt.claim.role', 'anon', true);
set local role anon;

select is(
  (select count(*)::bigint from public.properties
   where id = 'aaaaaaaa-aaaa-aaaa-aaaa-000000000001'),
  1::bigint,
  'Anonymous visitor can read an approved property'
);

select is(
  (select count(*)::bigint from public.properties
   where id = 'aaaaaaaa-aaaa-aaaa-aaaa-000000000002'),
  0::bigint,
  'Anonymous visitor cannot read a draft'
);

select is(
  (select count(*)::bigint from public.sponsors
   where id = 'bbbbbbbb-bbbb-bbbb-bbbb-000000000002'),
  0::bigint,
  'Anonymous visitor cannot read an inactive sponsor'
);

select results_eq(
  $$select tier from public.sponsors
    where id = 'bbbbbbbb-bbbb-bbbb-bbbb-000000000001'$$,
  $$values ('bronze'::text)$$,
  'Active sponsor tier is publicly readable'
);

select lives_ok(
  $$insert into public.inquiries
      (property_id, inquirer_email, message)
    values (
      'aaaaaaaa-aaaa-aaaa-aaaa-000000000001',
      'anonymous-exam@example.test',
      'Please provide details about this property.'
    )$$,
  'Anonymous visitor can submit an inquiry'
);

select throws_ok(
  $$select id from public.inquiries$$,
  '42501', null,
  'Anonymous visitor cannot read inquiries'
);

select throws_ok(
  $$insert into public.inquiries
      (property_id, inquirer_email, message)
    values (
      'aaaaaaaa-aaaa-aaaa-aaaa-000000000001',
      'anonymous-exam@example.test',
      'Short'
    )$$,
  '23514', null,
  'Database rejects an inquiry shorter than ten characters'
);

select throws_ok(
  $$insert into public.inquiries
      (property_id, inquirer_email, message)
    values (
      'aaaaaaaa-aaaa-aaaa-aaaa-000000000002',
      'anonymous-exam@example.test',
      'This inquiry targets a private draft.'
    )$$,
  '42501', null,
  'Anonymous visitor cannot inquire about a draft'
);

-- Owner A.
reset role;
select set_config(
  'request.jwt.claim.sub',
  '11111111-1111-1111-1111-111111111111', true
);
select set_config('request.jwt.claim.role', 'authenticated', true);
set local role authenticated;

select lives_ok(
  $$insert into public.properties
      (owner_id, address, price, bedrooms, bathrooms, square_feet)
    values (
      '11111111-1111-1111-1111-111111111111',
      '500 Exam Test Street', 450000, 3, 2, 1400
    )$$,
  'Owner can create a property using only the exam fields'
);

select results_eq(
  $$select status from public.properties
    where address = '500 Exam Test Street'$$,
  $$values ('draft'::text)$$,
  'New property defaults to draft'
);

select results_eq(
  $$update public.properties
    set price = 486000
    where id = 'aaaaaaaa-aaaa-aaaa-aaaa-000000000002'
    returning price$$,
  $$values (486000::numeric)$$,
  'Owner draft update changes the intended record'
);

select is_empty(
  $$update public.properties
    set price = 1
    where id = 'aaaaaaaa-aaaa-aaaa-aaaa-000000000003'
    returning id$$,
  'Owner cannot update another owner property'
);

select is_empty(
  $$update public.properties
    set price = 1
    where id = 'aaaaaaaa-aaaa-aaaa-aaaa-000000000001'
    returning id$$,
  'Owner cannot update an approved property'
);

select throws_ok(
  $$update public.properties
    set status = 'approved'
    where id = 'aaaaaaaa-aaaa-aaaa-aaaa-000000000002'$$,
  '42501', null,
  'Owner cannot self-approve'
);

select throws_ok(
  $$update public.properties
    set owner_id = '22222222-2222-2222-2222-222222222222'
    where id = 'aaaaaaaa-aaaa-aaaa-aaaa-000000000002'$$,
  '42501', null,
  'Owner cannot transfer ownership'
);

select throws_ok(
  $$update public.profiles
    set role = 'admin'
    where id = '11111111-1111-1111-1111-111111111111'$$,
  '42501', null,
  'Owner cannot escalate their profile role'
);

select is(
  (select count(*)::bigint from public.inquiries
   where id = 'cccccccc-cccc-cccc-cccc-000000000001'),
  1::bigint,
  'Owner can read inquiries for their property'
);

select results_eq(
  $$delete from public.properties
    where address = '500 Exam Test Street'
    returning address$$,
  $$values ('500 Exam Test Street'::text)$$,
  'Owner can delete their own test draft'
);

select is_empty(
  $$delete from public.properties
    where id = 'aaaaaaaa-aaaa-aaaa-aaaa-000000000003'
    returning id$$,
  'Owner cannot delete another owner property'
);

-- Owner B owns the pending property.
reset role;
select set_config(
  'request.jwt.claim.sub',
  '22222222-2222-2222-2222-222222222222', true
);
set local role authenticated;

select is_empty(
  $$update public.properties
    set price = 1
    where id = 'aaaaaaaa-aaaa-aaaa-aaaa-000000000003'
    returning id$$,
  'Owner cannot update their own pending property'
);

select is(
  (select count(*)::bigint from public.inquiries
   where id = 'cccccccc-cccc-cccc-cccc-000000000001'),
  0::bigint,
  'Other owner cannot read Owner A inquiries'
);

-- Ordinary authenticated inquirer.
reset role;
select set_config(
  'request.jwt.claim.sub',
  '55555555-5555-5555-5555-555555555555', true
);
set local role authenticated;

select lives_ok(
  $$insert into public.inquiries
      (property_id, inquirer_email, message)
    values (
      'aaaaaaaa-aaaa-aaaa-aaaa-000000000001',
      'exam-inquirer@example.test',
      'Please contact me about this approved listing.'
    )$$,
  'Authenticated public user can submit an inquiry'
);

select is_empty(
  $$select id from public.inquiries$$,
  'Ordinary inquirer cannot read stored inquiries'
);

select throws_ok(
  $$insert into public.properties
      (owner_id, address, price, bedrooms, bathrooms, square_feet)
    values (
      '55555555-5555-5555-5555-555555555555',
      '600 Unauthorized Street', 100000, 1, 1, 600
    )$$,
  '42501', null,
  'Public-role user cannot create a property'
);

-- Privileged database execution.
-- This verifies database privileges, not server-side admin authorization.
reset role;
select set_config('request.jwt.claim.sub', '', true);
select set_config('request.jwt.claim.role', 'service_role', true);
set local role service_role;

select results_eq(
  $$update public.properties
    set status = 'approved'
    where id = 'aaaaaaaa-aaaa-aaaa-aaaa-000000000002'
    returning status$$,
  $$values ('approved'::text)$$,
  'Service role can approve a draft'
);

select is(
  (select count(*)::bigint from public.inquiries
   where id = 'cccccccc-cccc-cccc-cccc-000000000001'),
  1::bigint,
  'Service role can read private inquiries'
);

select results_eq(
  $$update public.sponsors
    set tier = 'gold'
    where id = 'bbbbbbbb-bbbb-bbbb-bbbb-000000000001'
    returning tier$$,
  $$values ('gold'::text)$$,
  'Service role can manage sponsor tiers'
);

select * from finish();
rollback;