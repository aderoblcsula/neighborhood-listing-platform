export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <header className="max-w-3xl">
          <p className="font-semibold uppercase tracking-wide text-blue-700">
            Your neighborhood, connected
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Neighborhood Listing Platform
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-700">
            Discover local listings, connect with neighborhood sponsors, and
            receive helpful voice assistance from one accessible community
            platform.
          </p>
        </header>

        <section className="mt-12" aria-labelledby="features-heading">
          <h2 id="features-heading" className="text-2xl font-bold">
            Platform features
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Listings</h3>
              <p className="mt-3 leading-7 text-slate-600">
                Browse useful listings shared by people and organizations in
                your neighborhood.
              </p>
            </article>

            <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">
                Neighborhood Sponsors
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                Learn about local businesses and organizations supporting the
                community.
              </p>
            </article>

            <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Voice Help</h3>
              <p className="mt-3 leading-7 text-slate-600">
                Get voice-guided assistance when searching and navigating the
                platform.
              </p>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}