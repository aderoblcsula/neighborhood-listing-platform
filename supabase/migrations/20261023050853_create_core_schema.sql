-- Core schema and row-level security for the neighborhood listing platform.
-- Human-reviewed revision of the AI Studio draft.

begin;

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = pg_catalog, pg_temp
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create table public.profiles (
  id uuid primary key,
  display_name text not null,
  role text not null default 'property_professional',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_auth_user_fk
    foreign key (id) references auth.users (id) on delete restrict,
  constraint profiles_display_name_length_check
    check (char_length(trim(display_name)) between 2 and 100),
  constraint profiles_role_check
    check (role in ('property_professional', 'sponsor', 'administrator'))
);

create table public.properties (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  title text not null,
  street_address text not null,
  city text not null,
  state char(2) not null,
  zip_code text not null,
  price numeric(12, 2) not null,
  bedrooms integer not null,
  bathrooms numeric(4, 1) not null,
  square_feet integer not null,
  property_type text not null,
  description text not null,
  review_status text not null default 'draft',
  availability_status text not null default 'available',
  image_src text not null,
  image_alt text not null,
  details_href text not null,
  amenities text[] not null,
  accepts_inquiries boolean not null default true,
  rejection_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint properties_owner_fk
    foreign key (owner_id) references public.profiles (id) on delete restrict,
  constraint properties_title_length_check
    check (char_length(trim(title)) between 1 and 100),
  constraint properties_street_address_length_check
    check (char_length(trim(street_address)) between 1 and 120),
  constraint properties_city_length_check
    check (char_length(trim(city)) between 1 and 80),
  constraint properties_state_format_check
    check (state ~ '^[A-Z]{2}$'),
  constraint properties_zip_code_format_check
    check (zip_code ~ '^[0-9]{5}$'),
  constraint properties_price_check check (price >= 0),
  constraint properties_bedrooms_check check (bedrooms >= 0),
  constraint properties_bathrooms_check
    check (bathrooms >= 0 and mod(bathrooms, 0.5) = 0),
  constraint properties_square_feet_check check (square_feet > 0),
  constraint properties_type_check
    check (property_type in (
      'single-family', 'townhome', 'condominium', 'apartment', 'cottage'
    )),
  constraint properties_description_length_check
    check (char_length(trim(description)) between 20 and 500),
  constraint properties_review_status_check
    check (review_status in (
      'draft', 'pending_review', 'rejected', 'approved', 'archived'
    )),
  constraint properties_availability_status_check
    check (availability_status in ('available', 'pending', 'sold')),
  constraint properties_image_src_length_check
    check (char_length(trim(image_src)) between 1 and 2048),
  constraint properties_image_alt_length_check
    check (char_length(trim(image_alt)) between 1 and 200),
  constraint properties_details_href_length_check
    check (char_length(trim(details_href)) between 1 and 2048),
  constraint properties_amenities_check
    check (
      cardinality(amenities) >= 1
      and amenities <@ array[
        'accessible-entry', 'air-conditioning', 'balcony',
        'community-garden', 'garage', 'hardwood-floors', 'laundry',
        'patio', 'pool', 'solar-panels'
      ]::text[]
    ),
  constraint properties_rejection_reason_check
    check (
      (review_status = 'rejected'
        and rejection_reason is not null
        and char_length(trim(rejection_reason)) between 1 and 500)
      or (review_status <> 'rejected' and rejection_reason is null)
    )
);

create table public.sponsors (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  name text not null,
  category text not null,
  description text not null,
  website_url text not null,
  review_status text not null default 'draft',
  active boolean not null default false,
  rejection_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint sponsors_owner_fk
    foreign key (owner_id) references public.profiles (id) on delete restrict,
  constraint sponsors_name_length_check
    check (char_length(trim(name)) between 1 and 100),
  constraint sponsors_category_check
    check (category in (
      'education', 'financial-services', 'food-and-dining',
      'health-and-wellness', 'home-services', 'nonprofit', 'retail'
    )),
  constraint sponsors_description_length_check
    check (char_length(trim(description)) between 20 and 300),
  constraint sponsors_website_url_length_check
    check (char_length(trim(website_url)) between 1 and 2048),
  constraint sponsors_review_status_check
    check (review_status in (
      'draft', 'pending_review', 'rejected', 'approved', 'archived'
    )),
  constraint sponsors_rejection_reason_check
    check (
      (review_status = 'rejected'
        and rejection_reason is not null
        and char_length(trim(rejection_reason)) between 1 and 500)
      or (review_status <> 'rejected' and rejection_reason is null)
    )
);

create table public.property_sponsors (
  property_id uuid not null,
  sponsor_id uuid not null,
  display_priority integer not null,
  review_status text not null default 'draft',
  active boolean not null default false,
  rejection_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint property_sponsors_pk primary key (property_id, sponsor_id),
  constraint property_sponsors_property_fk
    foreign key (property_id) references public.properties (id) on delete cascade,
  constraint property_sponsors_sponsor_fk
    foreign key (sponsor_id) references public.sponsors (id) on delete cascade,
  constraint property_sponsors_priority_check check (display_priority > 0),
  constraint property_sponsors_priority_unique
    unique (property_id, display_priority),
  constraint property_sponsors_review_status_check
    check (review_status in (
      'draft', 'pending_review', 'rejected', 'approved', 'archived'
    )),
  constraint property_sponsors_rejection_reason_check
    check (
      (review_status = 'rejected'
        and rejection_reason is not null
        and char_length(trim(rejection_reason)) between 1 and 500)
      or (review_status <> 'rejected' and rejection_reason is null)
    )
);

create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null,
  sender_name text not null,
  sender_email text not null,
  message text not null,
  created_at timestamptz not null default now(),
  constraint inquiries_property_fk
    foreign key (property_id) references public.properties (id) on delete restrict,
  constraint inquiries_sender_name_length_check
    check (char_length(trim(sender_name)) between 2 and 100),
  constraint inquiries_sender_email_length_check
    check (char_length(sender_email) between 3 and 254),
  constraint inquiries_sender_email_format_check
    check (sender_email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'),
  constraint inquiries_message_length_check
    check (char_length(trim(message)) between 5 and 3000)
);

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger properties_set_updated_at
before update on public.properties
for each row execute function public.set_updated_at();

create trigger sponsors_set_updated_at
before update on public.sponsors
for each row execute function public.set_updated_at();

create trigger property_sponsors_set_updated_at
before update on public.property_sponsors
for each row execute function public.set_updated_at();

create or replace function public.enforce_owned_content_boundaries()
returns trigger
language plpgsql
security invoker
set search_path = pg_catalog, pg_temp
as $$
declare
  is_authenticated_client boolean :=
    current_user = 'authenticated'
    or coalesce(auth.role(), '') = 'authenticated';
begin
  if not is_authenticated_client then
    return new;
  end if;

  if tg_op = 'INSERT' then
    if new.review_status not in ('draft', 'pending_review') then
      raise exception 'Owners may create only draft or pending-review content.'
        using errcode = '42501';
    end if;
  else
    if new.id is distinct from old.id
       or new.owner_id is distinct from old.owner_id
       or new.created_at is distinct from old.created_at then
      raise exception 'Owners may not change identity, ownership, or creation time.'
        using errcode = '42501';
    end if;

    if old.review_status in ('draft', 'pending_review')
       and new.review_status not in ('draft', 'pending_review') then
      raise exception 'Invalid owner review-status transition.'
        using errcode = '42501';
    end if;

    if old.review_status = 'rejected'
       and new.review_status not in ('rejected', 'pending_review') then
      raise exception 'Rejected content may remain rejected or be resubmitted.'
        using errcode = '42501';
    end if;

    if old.review_status = 'rejected' and new.review_status = 'rejected' then
      new.rejection_reason := old.rejection_reason;
    end if;
  end if;

  if new.review_status in ('draft', 'pending_review') then
    new.rejection_reason := null;
  end if;

  return new;
end;
$$;

create trigger properties_enforce_boundaries
before insert or update on public.properties
for each row execute function public.enforce_owned_content_boundaries();

create trigger sponsors_enforce_boundaries
before insert or update on public.sponsors
for each row execute function public.enforce_owned_content_boundaries();

create or replace function public.enforce_placement_boundaries()
returns trigger
language plpgsql
security invoker
set search_path = pg_catalog, pg_temp
as $$
declare
  is_authenticated_client boolean :=
    current_user = 'authenticated'
    or coalesce(auth.role(), '') = 'authenticated';
begin
  if not is_authenticated_client then
    return new;
  end if;

  if tg_op = 'INSERT' then
    if new.review_status not in ('draft', 'pending_review') then
      raise exception 'Sponsors may create only draft or pending-review placements.'
        using errcode = '42501';
    end if;
  else
    if new.property_id is distinct from old.property_id
       or new.sponsor_id is distinct from old.sponsor_id
       or new.created_at is distinct from old.created_at then
      raise exception 'Placement identity and creation time are immutable.'
        using errcode = '42501';
    end if;

    if old.review_status in ('draft', 'pending_review')
       and new.review_status not in ('draft', 'pending_review') then
      raise exception 'Invalid placement review-status transition.'
        using errcode = '42501';
    end if;

    if old.review_status = 'rejected'
       and new.review_status not in ('rejected', 'pending_review') then
      raise exception 'Rejected placement may remain rejected or be resubmitted.'
        using errcode = '42501';
    end if;

    if old.review_status = 'rejected' and new.review_status = 'rejected' then
      new.rejection_reason := old.rejection_reason;
    end if;
  end if;

  if new.review_status in ('draft', 'pending_review') then
    new.rejection_reason := null;
  end if;

  return new;
end;
$$;

create trigger property_sponsors_enforce_boundaries
before insert or update on public.property_sponsors
for each row execute function public.enforce_placement_boundaries();

create index properties_owner_id_idx on public.properties (owner_id);
create index properties_public_idx
  on public.properties (created_at desc) where review_status = 'approved';
create index sponsors_owner_id_idx on public.sponsors (owner_id);
create index sponsors_public_idx
  on public.sponsors (name) where review_status = 'approved' and active;
create index property_sponsors_sponsor_id_idx
  on public.property_sponsors (sponsor_id);
create index inquiries_property_id_idx on public.inquiries (property_id);

revoke all on public.profiles from anon, authenticated;
revoke all on public.properties from anon, authenticated;
revoke all on public.sponsors from anon, authenticated;
revoke all on public.property_sponsors from anon, authenticated;
revoke all on public.inquiries from anon, authenticated;

grant usage on schema public to anon, authenticated, service_role;

grant select (id, display_name, role, created_at, updated_at),
      update (display_name)
  on public.profiles to authenticated;

grant select (
    id, title, street_address, city, state, zip_code, price, bedrooms,
    bathrooms, square_feet, property_type, description, review_status,
    availability_status, image_src, image_alt, details_href, amenities,
    accepts_inquiries, created_at, updated_at
  ) on public.properties to anon;
grant select on public.properties to authenticated;
grant insert (
    owner_id, title, street_address, city, state, zip_code, price,
    bedrooms, bathrooms, square_feet, property_type, description,
    review_status, availability_status, image_src, image_alt, details_href,
    amenities, accepts_inquiries
  ) on public.properties to authenticated;
grant update (
    title, street_address, city, state, zip_code, price, bedrooms,
    bathrooms, square_feet, property_type, description, review_status,
    availability_status, image_src, image_alt, details_href, amenities,
    accepts_inquiries
  ) on public.properties to authenticated;

grant select (
    id, name, category, description, website_url, review_status, active,
    created_at, updated_at
  ) on public.sponsors to anon;
grant select on public.sponsors to authenticated;
grant insert (
    owner_id, name, category, description, website_url, review_status, active
  ) on public.sponsors to authenticated;
grant update (
    name, category, description, website_url, review_status, active
  ) on public.sponsors to authenticated;

grant select on public.property_sponsors to anon, authenticated;
grant insert (
    property_id, sponsor_id, display_priority, review_status, active
  ) on public.property_sponsors to authenticated;
grant update (display_priority, review_status, active)
  on public.property_sponsors to authenticated;

grant insert (property_id, sender_name, sender_email, message)
  on public.inquiries to anon, authenticated;
grant select on public.inquiries to authenticated;

grant all on public.profiles, public.properties, public.sponsors,
  public.property_sponsors, public.inquiries to service_role;

alter table public.profiles enable row level security;
alter table public.properties enable row level security;
alter table public.sponsors enable row level security;
alter table public.property_sponsors enable row level security;
alter table public.inquiries enable row level security;

create policy profiles_select_own
on public.profiles for select to authenticated
using (id = auth.uid());

create policy profiles_update_own
on public.profiles for update to authenticated
using (id = auth.uid())
with check (id = auth.uid());

create policy properties_select_approved
on public.properties for select to anon, authenticated
using (review_status = 'approved');

create policy properties_select_own
on public.properties for select to authenticated
using (owner_id = auth.uid());

create policy properties_insert_own
on public.properties for insert to authenticated
with check (
  owner_id = auth.uid()
  and review_status in ('draft', 'pending_review')
  and exists (
    select 1 from public.profiles pr
    where pr.id = auth.uid() and pr.role = 'property_professional'
  )
);

create policy properties_update_own_unapproved
on public.properties for update to authenticated
using (
  owner_id = auth.uid()
  and review_status in ('draft', 'pending_review', 'rejected')
)
with check (
  owner_id = auth.uid()
  and review_status in ('draft', 'pending_review', 'rejected')
  and exists (
    select 1 from public.profiles pr
    where pr.id = auth.uid() and pr.role = 'property_professional'
  )
);

create policy sponsors_select_approved_active
on public.sponsors for select to anon, authenticated
using (review_status = 'approved' and active);

create policy sponsors_select_own
on public.sponsors for select to authenticated
using (owner_id = auth.uid());

create policy sponsors_insert_own
on public.sponsors for insert to authenticated
with check (
  owner_id = auth.uid()
  and review_status in ('draft', 'pending_review')
  and exists (
    select 1 from public.profiles pr
    where pr.id = auth.uid() and pr.role = 'sponsor'
  )
);

create policy sponsors_update_own_unapproved
on public.sponsors for update to authenticated
using (
  owner_id = auth.uid()
  and review_status in ('draft', 'pending_review', 'rejected')
)
with check (
  owner_id = auth.uid()
  and review_status in ('draft', 'pending_review', 'rejected')
  and exists (
    select 1 from public.profiles pr
    where pr.id = auth.uid() and pr.role = 'sponsor'
  )
);

create policy property_sponsors_select_approved_active
on public.property_sponsors for select to anon, authenticated
using (
  review_status = 'approved'
  and active
  and exists (
    select 1 from public.properties p
    where p.id = property_id and p.review_status = 'approved'
  )
  and exists (
    select 1 from public.sponsors s
    where s.id = sponsor_id
      and s.review_status = 'approved'
      and s.active
  )
);

create policy property_sponsors_select_stakeholder
on public.property_sponsors for select to authenticated
using (
  exists (
    select 1 from public.properties p
    where p.id = property_id and p.owner_id = auth.uid()
  )
  or exists (
    select 1 from public.sponsors s
    where s.id = sponsor_id and s.owner_id = auth.uid()
  )
);

create policy property_sponsors_insert_sponsor_request
on public.property_sponsors for insert to authenticated
with check (
  review_status in ('draft', 'pending_review')
  and exists (
    select 1 from public.sponsors s
    where s.id = sponsor_id and s.owner_id = auth.uid()
  )
  and exists (
    select 1 from public.properties p
    where p.id = property_id and p.review_status = 'approved'
  )
);

create policy property_sponsors_update_own_unapproved
on public.property_sponsors for update to authenticated
using (
  review_status in ('draft', 'pending_review', 'rejected')
  and exists (
    select 1 from public.sponsors s
    where s.id = sponsor_id and s.owner_id = auth.uid()
  )
)
with check (
  review_status in ('draft', 'pending_review', 'rejected')
  and exists (
    select 1 from public.sponsors s
    where s.id = sponsor_id and s.owner_id = auth.uid()
  )
);

create policy inquiries_insert_for_open_approved_property
on public.inquiries for insert to anon, authenticated
with check (
  exists (
    select 1 from public.properties p
    where p.id = property_id
      and p.review_status = 'approved'
      and p.accepts_inquiries
  )
);

create policy inquiries_select_property_owner
on public.inquiries for select to authenticated
using (
  exists (
    select 1 from public.properties p
    where p.id = property_id and p.owner_id = auth.uid()
  )
);

commit;
