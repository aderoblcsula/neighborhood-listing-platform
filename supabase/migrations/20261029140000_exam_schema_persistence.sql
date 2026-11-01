-- Practical exam upgrade.
-- Requires the existing create_core_schema migration.
-- Preserves existing records and makes legacy presentation fields optional.

begin;

-- Remove existing policies so old permissive policies cannot remain active.
do $$
declare
  policy_record record;
begin
  for policy_record in
    select tablename, policyname
    from pg_policies
    where schemaname = 'public'
      and tablename in (
        'profiles',
        'properties',
        'sponsors',
        'property_sponsors',
        'inquiries'
      )
  loop
    execute format(
      'drop policy %I on public.%I',
      policy_record.policyname,
      policy_record.tablename
    );
  end loop;
end;
$$;

-- Profiles: align application roles and auth-user deletion behavior.
alter table public.profiles
  drop constraint profiles_role_check,
  drop constraint profiles_auth_user_fk;

update public.profiles
set role = case role
  when 'property_professional' then 'property_owner'
  when 'administrator' then 'admin'
  else role
end;

alter table public.profiles
  alter column role set default 'public',
  alter column display_name drop not null,
  add constraint profiles_role_check
    check (role in ('admin', 'property_owner', 'sponsor', 'public')),
  add constraint profiles_auth_user_fk
    foreign key (id) references auth.users(id) on delete cascade;

-- Properties: replace legacy column names and status vocabulary.
-- Remove the old property trigger before renaming its referenced field.
-- The original shared function remains available to sponsors.
drop trigger properties_enforce_boundaries on public.properties;

alter table public.properties
  drop constraint properties_review_status_check;

alter table public.properties
  rename column street_address to address;

alter table public.properties
  rename column review_status to status;

update public.properties
set status = 'pending'
where status = 'pending_review';

alter table public.properties
  alter column status set default 'draft',
  alter column bathrooms type numeric(3, 1),
  drop constraint properties_bathrooms_check,
  drop constraint properties_street_address_length_check,
  add constraint properties_bathrooms_check
    check (bathrooms >= 0),
  add constraint properties_address_check
    check (char_length(trim(address)) >= 5),
  add constraint properties_status_check
    check (status in ('draft', 'pending', 'approved', 'rejected'));

-- Keep existing presentation data, but allow the exam's five-field payload.
-- Existing CHECK constraints continue validating non-null optional values.
alter table public.properties
  alter column title drop not null,
  alter column city drop not null,
  alter column state drop not null,
  alter column zip_code drop not null,
  alter column property_type drop not null,
  alter column description drop not null,
  alter column image_src drop not null,
  alter column image_alt drop not null,
  alter column details_href drop not null,
  alter column amenities drop not null;

-- Sponsors: required exam fields.
alter table public.sponsors
  rename column active to active_status;

alter table public.sponsors
  add column tier text not null default 'bronze',
  alter column active_status set default true,
  alter column owner_id drop not null,
  alter column category drop not null,
  alter column description drop not null,
  alter column website_url drop not null,
  drop constraint sponsors_name_length_check,
  add constraint sponsors_name_length_check
    check (char_length(trim(name)) between 2 and 100),
  add constraint sponsors_tier_check
    check (tier in ('gold', 'silver', 'bronze'));

-- Bronze is the initial tier for existing fictional sponsor records.
-- Future inserts must explicitly choose their tier.
alter table public.sponsors
  alter column tier drop default;

-- The exam junction requires only its two foreign keys.
-- Existing populated priorities are preserved.
alter table public.property_sponsors
  alter column display_priority drop not null;

-- Inquiries: align names, length checks, and deletion behavior.
alter table public.inquiries
  rename column sender_email to inquirer_email;

alter table public.inquiries
  alter column sender_name drop not null,
  drop constraint inquiries_message_length_check,
  drop constraint inquiries_property_fk,
  add constraint inquiries_message_length_check
    check (char_length(trim(message)) between 10 and 3000),
  add constraint inquiries_property_fk
    foreign key (property_id)
    references public.properties(id)
    on delete cascade;

-- Existing created_at columns already use timestamptz and now().
-- now() supplies an absolute timestamp; display timezone is session-specific.

-- Protect owner-controlled property writes.
create function public.enforce_exam_property_boundaries()
returns trigger
language plpgsql
security invoker
set search_path = pg_catalog, pg_temp
as $$
begin
  if current_user = 'authenticated'
     or coalesce(auth.role(), '') = 'authenticated' then

    if tg_op = 'INSERT' then
      if new.status <> 'draft' then
        raise exception 'New owner listings must be drafts.'
          using errcode = '42501';
      end if;
    else
      if old.status not in ('draft', 'rejected') then
        raise exception 'This listing cannot be edited by its owner.'
          using errcode = '42501';
      end if;

      if new.id is distinct from old.id
         or new.owner_id is distinct from old.owner_id
         or new.created_at is distinct from old.created_at then
        raise exception 'Identity, ownership, and creation time are immutable.'
          using errcode = '42501';
      end if;

      -- The owner API edits content only.
      -- Status transitions are reserved for authorized administration.
      if new.status is distinct from old.status then
        raise exception 'Owners cannot change listing status.'
          using errcode = '42501';
      end if;

      new.rejection_reason := old.rejection_reason;
    end if;
  end if;

  return new;
end;
$$;

create trigger properties_enforce_exam_boundaries
before insert or update on public.properties
for each row execute function public.enforce_exam_property_boundaries();

-- Remove both table-level and legacy column-level grants.
-- Revoking table privileges alone would leave column grants behind.
revoke all on
  public.profiles,
  public.properties,
  public.sponsors,
  public.property_sponsors,
  public.inquiries
from anon, authenticated;

do $$
declare
  table_record record;
begin
  for table_record in
    select
      table_name,
      string_agg(quote_ident(column_name), ', ' order by ordinal_position)
        as column_list
    from information_schema.columns
    where table_schema = 'public'
      and table_name in (
        'profiles',
        'properties',
        'sponsors',
        'property_sponsors',
        'inquiries'
      )
    group by table_name
  loop
    execute format(
      'revoke select (%1$s), insert (%1$s), update (%1$s),
       references (%1$s) on public.%2$I from anon, authenticated',
      table_record.column_list,
      table_record.table_name
    );
  end loop;
end;
$$;

grant usage on schema public to anon, authenticated, service_role;

grant select (id, display_name, role, created_at, updated_at)
  on public.profiles to authenticated;

grant select (
  id, address, price, bedrooms, bathrooms, square_feet,
  title, city, state, zip_code, property_type, description,
  image_src, image_alt, details_href, amenities,
  status, availability_status, accepts_inquiries,
  created_at, updated_at
) on public.properties to anon;

grant select on public.properties to authenticated;

grant insert (
  owner_id, address, price, bedrooms, bathrooms, square_feet
) on public.properties to authenticated;

grant update (
  address, price, bedrooms, bathrooms, square_feet,
  title, city, state, zip_code, property_type, description,
  image_src, image_alt
) on public.properties to authenticated;

grant delete on public.properties to authenticated;

grant select (id, name, tier, active_status, created_at)
  on public.sponsors to anon, authenticated;

grant select (property_id, sponsor_id)
  on public.property_sponsors to anon, authenticated;

grant insert (property_id, inquirer_email, message)
  on public.inquiries to anon, authenticated;

grant select on public.inquiries to authenticated;

grant all on
  public.profiles,
  public.properties,
  public.sponsors,
  public.property_sponsors,
  public.inquiries
to service_role;

alter table public.profiles enable row level security;
alter table public.properties enable row level security;
alter table public.sponsors enable row level security;
alter table public.property_sponsors enable row level security;
alter table public.inquiries enable row level security;

-- Users may read their own role but cannot assign or change it.
create policy profiles_read_own
on public.profiles for select to authenticated
using (id = (select auth.uid()));

-- Public property access.
create policy properties_read_approved
on public.properties for select to anon, authenticated
using (status = 'approved');

-- Owners may also see their own nonpublic records.
create policy properties_read_own
on public.properties for select to authenticated
using (
  owner_id = (select auth.uid())
  and exists (
    select 1 from public.profiles pr
    where pr.id = (select auth.uid())
      and pr.role = 'property_owner'
  )
);

create policy properties_create_own_draft
on public.properties for insert to authenticated
with check (
  owner_id = (select auth.uid())
  and status = 'draft'
  and exists (
    select 1 from public.profiles pr
    where pr.id = (select auth.uid())
      and pr.role = 'property_owner'
  )
);

create policy properties_update_own_draft_or_rejected
on public.properties for update to authenticated
using (
  owner_id = (select auth.uid())
  and status in ('draft', 'rejected')
  and exists (
    select 1 from public.profiles pr
    where pr.id = (select auth.uid())
      and pr.role = 'property_owner'
  )
)
with check (
  owner_id = (select auth.uid())
  and status in ('draft', 'rejected')
  and exists (
    select 1 from public.profiles pr
    where pr.id = (select auth.uid())
      and pr.role = 'property_owner'
  )
);

create policy properties_delete_own
on public.properties for delete to authenticated
using (
  owner_id = (select auth.uid())
  and exists (
    select 1 from public.profiles pr
    where pr.id = (select auth.uid())
      and pr.role = 'property_owner'
  )
);

create policy sponsors_read_active
on public.sponsors for select to anon, authenticated
using (active_status = true);

create policy property_sponsors_read_public
on public.property_sponsors for select to anon, authenticated
using (
  exists (
    select 1 from public.properties p
    where p.id = property_id
      and p.status = 'approved'
  )
  and exists (
    select 1 from public.sponsors s
    where s.id = sponsor_id
      and s.active_status = true
  )
);

create policy inquiries_submit_public
on public.inquiries for insert to anon, authenticated
with check (
  exists (
    select 1 from public.properties p
    where p.id = property_id
      and p.status = 'approved'
      and p.accepts_inquiries = true
  )
);

create policy inquiries_read_property_owner
on public.inquiries for select to authenticated
using (
  exists (
    select 1 from public.properties p
    where p.id = property_id
      and p.owner_id = (select auth.uid())
  )
  and exists (
    select 1 from public.profiles pr
    where pr.id = (select auth.uid())
      and pr.role = 'property_owner'
  )
);

-- Administrator operations use service_role only after server authorization.
-- No client-facing policy grants administration based on request metadata.

commit;