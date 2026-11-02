begin;

create table public.asset_reviews (
  asset_key text primary key,
  asset_path text not null unique,
  usage_context text not null,
  creator text not null,
  source_url text not null,
  license_name text not null,
  license_url text not null,
  status text not null default 'PENDING'
    check (status in ('PENDING', 'APPROVED', 'REJECTED')),
  reviewed_by text,
  reviewed_at timestamptz,
  review_notes text,

  constraint asset_review_evidence_required check (
    (
      status = 'PENDING'
      and reviewed_by is null
      and reviewed_at is null
    )
    or
    (
      status in ('APPROVED', 'REJECTED')
      and nullif(btrim(reviewed_by), '') is not null
      and reviewed_at is not null
      and nullif(btrim(review_notes), '') is not null
    )
  )
);

-- Review through privileged database administration only.
alter table public.asset_reviews enable row level security;

revoke all privileges on table public.asset_reviews
  from public, anon, authenticated;

insert into public.asset_reviews (
  asset_key,
  asset_path,
  usage_context,
  creator,
  source_url,
  license_name,
  license_url
)
values
(
  'property-demo',
  '/images/property-demo.jpg',
  'Stock demonstration photo for 101 Fictional Cedar Avenue',
  'Curtis Adams',
  'https://www.pexels.com/photo/front-exterior-of-a-family-home-8031873/',
  'Pexels License',
  'https://www.pexels.com/license/'
),
(
  'sponsor-garden',
  '/images/sponsor-garden.jpg',
  'Stock demonstration banner for fictional Green Leaf Home and Garden',
  'Maria Firman',
  'https://www.pexels.com/photo/sprouts-and-plants-in-greenhouse-12152936/',
  'Pexels License',
  'https://www.pexels.com/license/'
),
(
  'navigation-house',
  '/icons/house.svg',
  'Decorative icon beside the Browse properties navigation link',
  'Lucide contributors',
  'https://lucide.dev/icons/house',
  'ISC License',
  'https://lucide.dev/license'
);

commit;