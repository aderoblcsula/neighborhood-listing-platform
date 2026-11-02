# Digital Asset Pipeline & Performance Audit

**Author:** Aaron De Robles
**Branch:** `feat/digital-asset-audit`
**Environment:** Local application at `http://localhost:3000`
**Measurement date:** November 1, 2026 (Pacific Time)

## Verification Method

I inspected three distinct assets rendered in the application using Chrome
DevTools. Network measurements were captured with the Img filter selected,
browser cache disabled, and no network throttling.

Rendered dimensions were measured using `getBoundingClientRect()` at verified
viewport widths of 390 and 1280 CSS pixels. Device pixel ratio was approximately
2. Download time means the Timing panel's Content Download phase, not total
request duration.

The photograph responses reported `X-Nextjs-Cache: HIT`: browser caching was
disabled, but the server reused previously optimized images. These local
measurements do not represent hosted or cold-cache performance.

## Asset A — Primary Property Listing Photo

### Metadata and provenance

- Application path: `/images/property-demo.jpg`
- Repository path: `public/images/property-demo.jpg`
- Original dimensions: 2048 × 1365 pixels
- Original file size: 3.43 MB
- Creator: Curtis Adams
- Source: https://www.pexels.com/photo/front-exterior-of-a-family-home-8031873/
- Permission source: Pexels License
- License: https://www.pexels.com/license/

The photograph is used for the fictional Cedar listing. A visible caption
identifies it as stock demonstration imagery, not a photograph of the actual
fictional property. Permission comes from the license, not from a realtor.

### Administrative clearance

- Table: `public.asset_reviews`
- Record: `asset_key = 'property-demo'`
- Clearance field: `status = 'APPROVED'`
- Reviewer: Aaron De Robles
- Recorded review time: `2026-11-02 02:29:24.422992+00`
- Evidence: `docs/evidence/asset-approvals.csv`

### Accessibility and purpose

Purpose: **Informational**

Dynamic JSX alt attribute:

```tsx
alt={`Stock demonstration photo for ${property.address}: white brick house with a black front door and landscaped entrance.`}
```

For the Cedar listing, this resolves to:

> Stock demonstration photo for 101 Fictional Cedar Avenue: white brick house with a black front door and landscaped entrance.

### Responsive implementation

```tsx
<Image
  src="/images/property-demo.jpg"
  alt={`Stock demonstration photo for ${property.address}: white brick house with a black front door and landscaped entrance.`}
  width={2048}
  height={1365}
  sizes="(min-width: 1336px) 361px, (min-width: 1024px) calc((100vw - 96px) / 3 - 50px), (min-width: 768px) calc((100vw - 72px) / 2 - 50px), (min-width: 640px) calc(100vw - 98px), calc(100vw - 82px)"
  className="h-auto w-full rounded-lg"
/>
```

- Rendered width at 390px viewport: **308.8 CSS px**
- Rendered width at 1280px viewport: **345.06 CSS px**
- Mobile image request: **640px-wide variant**, `q=75`

### Network telemetry and risk

- Transferred size: **52.7 kB**
- Content-Type: **`image/webp`**
- Content Download: **10.31 ms**

Risk: delivering the original approximately 3.60 MB JPEG to a small property card
would waste bandwidth.

Mitigation: Next.js Image optimization and responsive `sizes` select a smaller
variant. The measured mobile response was WebP. Explicit intrinsic dimensions,
with `w-full h-auto`, also reserve the image's aspect ratio to reduce layout-shift
risk.

## Asset B — Local Business Partner Ad Banner

### Metadata and provenance

- Application path: `/images/sponsor-garden.jpg`
- Repository path: `public/images/sponsor-garden.jpg`
- Original dimensions: 1315 × 2048 pixels
- Original file size: 1.13 MB
- Creator: Maria Firman
- Source: https://www.pexels.com/photo/sprouts-and-plants-in-greenhouse-12152936/
- Permission source: Pexels License
- License: https://www.pexels.com/license/

The photograph appears within the Green Leaf Home and Garden advertisement.
The business is fictional, and the visible caption identifies the use of stock
photography. Permission comes from the license; no real business-owner
endorsement is claimed.

### Administrative clearance

- Table: `public.asset_reviews`
- Record: `asset_key = 'sponsor-garden'`
- Clearance field: `status = 'APPROVED'`
- Reviewer: Aaron De Robles
- Recorded review time: `2026-11-02 02:29:24.422992+00`
- Evidence: `docs/evidence/asset-approvals.csv`

### Accessibility and purpose

Purpose: **Informational**

The photograph supports the advertisement. The separate “Visit” link provides
the actionable destination.

Dynamic JSX alt attribute:

```tsx
alt={`Demonstration banner for ${sponsor.name}: seedlings and green plants growing in a greenhouse bed.`}
```

For the featured sponsor, this resolves to:

> Demonstration banner for Green Leaf Home and Garden: seedlings and green plants growing in a greenhouse bed.

### Responsive implementation

The outer advertisement uses:

```tsx
<aside
  className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6"
  aria-labelledby={`${sponsor.id}-heading`}
>
```

The image container and component use:

```tsx
<div className="relative aspect-[2/1] overflow-hidden rounded-lg">
  <Image
    src="/images/sponsor-garden.jpg"
    alt={`Demonstration banner for ${sponsor.name}: seedlings and green plants growing in a greenhouse bed.`}
    fill
    sizes="(min-width: 1336px) 1230px, (min-width: 640px) calc(100vw - 98px), calc(100vw - 82px)"
    className="object-cover object-center"
  />
</div>
```

- Rendered width at 390px viewport: **308.8 CSS px**
- Rendered width at 1280px viewport: **1182.4 CSS px**
- Mobile image request: **640px-wide variant**, `q=75`

### Network telemetry and risk

- Transferred size: **63.2 kB**
- Content-Type: **`image/webp`**
- Content Download: **22.41 ms**

Risk: a fill image without a reserved container height could cause layout
instability or an incorrectly sized banner.

Mitigation: `relative aspect-[2/1]` reserves the banner's layout space.
`object-cover object-center` preserves the photograph's proportions while
cropping it into the banner. Responsive `sizes` and Next.js optimization reduce
the delivered payload.

## Asset C — UI / Navigational House Icon

### Metadata and provenance

- Application path: `/icons/house.svg`
- Repository path: `public/icons/house.svg`
- SVG viewBox: `0 0 24 24`
- Creator: Lucide contributors
- Source: https://lucide.dev/icons/house
- Permission source: ISC License
- License: https://lucide.dev/license
- Retained license notice: `public/licenses/lucide-LICENSE.txt`

### Administrative clearance

- Table: `public.asset_reviews`
- Record: `asset_key = 'navigation-house'`
- Clearance field: `status = 'APPROVED'`
- Reviewer: Aaron De Robles
- Recorded review time: `2026-11-02 02:29:24.422992+00`
- Evidence: `docs/evidence/asset-approvals.csv`

### Accessibility and purpose

Purpose of the image: **Decorative within an actionable navigation link**

The adjacent text “Browse properties” names the link. The icon uses `alt=""`
and `aria-hidden="true"` to avoid announcing redundant information.

### Responsive implementation

```tsx
<Image
  src="/icons/house.svg"
  alt=""
  aria-hidden="true"
  width={24}
  height={24}
  unoptimized
  className="h-6 w-6 shrink-0"
/>
```

The image appears inside the navigation link targeting `#listings-heading`.

- Rendered width at 390px viewport: **24 CSS px**
- Rendered width at 1280px viewport: **24 CSS px**

### Network telemetry and risk

- Transferred size: **0.7 kB**
- Content-Type: **`image/svg+xml`**
- Content Download: **0.98 ms**

Risk: an oversized raster icon would add unnecessary payload and could appear
blurry on high-density displays.

Mitigation: a small SVG is served directly with `unoptimized`. Explicit
24 × 24 dimensions reserve space, and `shrink-0` preserves its intended size
inside the navigation link.

## Approval Scope and Limitations

The asset register records manual project-administrator review in the local
database. It is not a runtime publication gate: the current JSX does not query
the register before rendering images.

The migration creates PENDING records. The CSV preserves the subsequent local
approval decision. A fresh or hosted database requires its own review records;
local approval is not automatically transferred.

License permission and administrative approval are separate evidence:
the source licenses authorize use, while the asset register records project
clearance.

## Validation Evidence

- Production build and TypeScript checks passed.
- Lint reported zero errors and two existing generated-file warnings.
- The existing 36 database tests passed.
- Those tests do not specifically test the new asset register.
- `git diff --check` passed after indentation cleanup.
- Chrome screenshots document responsive dimensions, response headers,
  transferred sizes, and Content Download timings.
- `docs/evidence/asset-approvals.csv` documents all three local approvals.

## Individual Contribution and AI Assistance

Aaron De Robles integrated the demonstration assets, performed browser
measurements, corrected the sponsor layout, ran project checks, and recorded
the local administrative review.

ChatGPT assisted with asset-source research, component suggestions, migration
drafting, troubleshooting, and audit organization. Measurements were taken
from the project's actual browser and database evidence.

## Screenshot Evidence

See the [indexed audit screenshots](evidence/digital-assets/README.md).