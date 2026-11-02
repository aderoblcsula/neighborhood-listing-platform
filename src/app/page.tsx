import ListingsSection from "@/components/ListingsSection";
import SearchFilters from "@/components/SearchFilters";
import SponsorBanner from "@/components/SponsorBanner";
import { validatedData } from "@/lib/validated-data";
import Image from "next/image";

export default function Home() {
    const { featuredSponsor } = validatedData;

    return (
        <main className="min-h-screen bg-slate-100 px-4 py-12 text-slate-900 sm:px-6 sm:py-16">
            <div className="mx-auto max-w-7xl">
                <nav aria-label="Page navigation" className="mb-6">
                      <a
                        href="#listings-heading"
                        className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 py-2 font-semibold text-blue-800 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                      >
                        <Image
                              src="/icons/house.svg"
                              alt=""
                              aria-hidden="true"
                              width={24}
                              height={24}
                              unoptimized
                              className="h-6 w-6 shrink-0"
                        />
                            Browse properties
                      </a>
                </nav>
                <header className="max-w-3xl">
                    <p className="font-semibold uppercase tracking-wide text-blue-700">
                        Your neighborhood, connected
                    </p>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                        Neighborhood Listing Platform
                    </h1>

                    <p className="mt-5 text-lg leading-8 text-slate-700">
                        Find a welcoming home and discover the local
                        organizations that make each neighborhood feel
                        connected.
                    </p>
                </header>

                <section
                    className="mt-12"
                    aria-labelledby="search-heading"
                >
                    <h2
                        id="search-heading"
                        className="text-2xl font-bold"
                    >
                        Search available homes
                    </h2>

                    <div className="mt-5">
                        <SearchFilters />
                    </div>
                </section>

                <section
                    className="mt-14"
                    aria-labelledby="listings-heading"
                >
                    <h2
                        id="listings-heading"
                        className="text-2xl font-bold"
                    >
                        Featured properties
                    </h2>

                    <ListingsSection />
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