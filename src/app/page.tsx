import PropertyCard from "@/components/PropertyCard";
import SearchFilters from "@/components/SearchFilters";
import SponsorBanner from "@/components/SponsorBanner";
import { validatedData } from "@/lib/validated-data";

export default function Home() {
  const {
    properties,
    featuredSponsor,
    errors
  } = validatedData;

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-12 text-slate-900 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <header className="max-w-3xl">
          <p className="font-semibold uppercase tracking-wide text-blue-700">
            Your neighborhood, connected
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Neighborhood Listing Platform
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-700">
            Find a welcoming home and discover the local organizations that
            make each neighborhood feel connected.
          </p>
        </header>

        <section className="mt-12" aria-labelledby="search-heading">
          <h2 id="search-heading" className="text-2xl font-bold">
            Search available homes
          </h2>

          <div className="mt-5">
            <SearchFilters />
          </div>
        </section>

        <section className="mt-14" aria-labelledby="listings-heading">
          <h2 id="listings-heading" className="text-2xl font-bold">
            Featured properties
          </h2>

          {errors.length > 0 ? (
            <div
              className="mt-6 rounded-xl border border-red-300 bg-red-50 p-6 text-red-950"
              role="alert"
            >
              <h3 className="text-lg font-bold">
                Listings temporarily unavailable
              </h3>

              <p className="mt-2 leading-7">
                The property data did not pass validation. No unvalidated
                listings were displayed.
              </p>
            </div>
          ) : (
            <>
              <p className="mt-2 text-slate-700">
                {properties.length} validated synthetic homes are available
                in the neighborhood.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {properties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                  />
                ))}
              </div>
            </>
          )}
        </section>

        {featuredSponsor && (
          <div className="mt-14">
            <SponsorBanner sponsor={featuredSponsor} />
          </div>
        )}
      </div>
    </main>
  );
}