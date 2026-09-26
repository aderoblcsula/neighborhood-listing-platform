"use client";

import { FormEvent, useState } from "react";

export default function SearchFilters() {
  const [message, setMessage] = useState("");
  const [invalidFields, setInvalidFields] = useState({
    propertyType: false,
    priceRange: false,
});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const propertyType = form.get("propertyType");
    const priceRange = form.get("priceRange");

const propertyTypeInvalid = !propertyType;
const priceRangeInvalid = !priceRange;

setInvalidFields({
  propertyType: propertyTypeInvalid,
  priceRange: priceRangeInvalid,
});

if (propertyTypeInvalid || priceRangeInvalid) {
  if (propertyTypeInvalid && priceRangeInvalid) {
    setMessage("Choose a property type and price range before searching.");
  } else if (propertyTypeInvalid) {
    setMessage("Choose a property type before searching.");
  } else {
    setMessage("Choose a price range before searching.");
  }

  return;
}
    setMessage(
      "Filters applied. The sample listings remain visible for this component demonstration.",
    );
  }

  return (
<form
  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
  onSubmit={handleSubmit}
  noValidate
>
      <div className="grid gap-5 md:grid-cols-[1fr_1fr_auto] md:items-end">
        <div>
          <label
            htmlFor="property-type"
            className="block font-semibold text-slate-900"
          >
            Property type
          </label>
          <select
            id="property-type"
            name="propertyType"
            defaultValue=""
            className="mt-2 min-h-11 w-full rounded-lg border border-slate-400 bg-white px-3 py-2 text-slate-950 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            aria-invalid={invalidFields.propertyType || undefined}
aria-describedby={
  invalidFields.propertyType ? "filter-message" : undefined
}
          >
            <option value="" disabled>
              Select a property type
            </option>
            <option value="house">House</option>
            <option value="townhome">Townhome</option>
            <option value="condo">Condo</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="price-range"
            className="block font-semibold text-slate-900"
          >
            Maximum price
          </label>
          <select
            id="price-range"
            name="priceRange"
            defaultValue=""
            className="mt-2 min-h-11 w-full rounded-lg border border-slate-400 bg-white px-3 py-2 text-slate-950 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            aria-invalid={invalidFields.priceRange || undefined}
aria-describedby={
  invalidFields.priceRange ? "filter-message" : undefined
}
          >
            <option value="" disabled>
              Select a price range
            </option>
            <option value="600000">Up to $600,000</option>
            <option value="700000">Up to $700,000</option>
            <option value="800000">Up to $800,000</option>
          </select>
        </div>

        <button
          type="submit"
          className="min-h-11 rounded-lg bg-blue-700 px-6 py-2.5 font-semibold text-white transition hover:bg-blue-800 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-amber-500"
        >
          Search listings
        </button>
      </div>

      <p
        id="filter-message"
        className={`mt-4 text-sm font-medium ${
          message.startsWith("Choose") ? "text-red-700" : "text-slate-700"
        }`}
        role="status"
        aria-live="polite"
      >
        {message}
      </p>
    </form>
  );
}
