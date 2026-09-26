import type { Property, Sponsor } from "@/types";

export const properties: Property[] = [
  {
    id: "property-oak-avenue",
    title: "Sunny Craftsman Home",
    address: "124 Oak Avenue, Los Angeles, CA",
    price: 725000,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1480,
    imageSrc: "/property-oak.svg",
    imageAlt: "Blue Craftsman home with a front porch and leafy trees",
    detailsHref:
      "https://www.google.com/maps/search/?api=1&query=124+Oak+Avenue+Los+Angeles+CA",
  },
  {
    id: "property-maple-street",
    title: "Modern Neighborhood Townhome",
    address: "88 Maple Street, Los Angeles, CA",
    price: 649000,
    bedrooms: 2,
    bathrooms: 2.5,
    squareFeet: 1260,
    imageSrc: "/property-maple.svg",
    imageAlt: "Modern tan townhome with large windows and a small garden",
    detailsHref:
      "https://www.google.com/maps/search/?api=1&query=88+Maple+Street+Los+Angeles+CA",
  },
  {
    id: "property-cedar-lane",
    title: "Garden Cottage",
    address: "42 Cedar Lane, Los Angeles, CA",
    price: 575000,
    bedrooms: 2,
    bathrooms: 1,
    squareFeet: 980,
    imageSrc: "/property-cedar.svg",
    imageAlt: "White cottage surrounded by a green garden and flowers",
    detailsHref:
      "https://www.google.com/maps/search/?api=1&query=42+Cedar+Lane+Los+Angeles+CA",
  },
];

export const featuredSponsor: Sponsor = {
  id: "sponsor-green-leaf",
  name: "Green Leaf Garden Center",
  description:
    "Helping neighbors create welcoming, water-wise outdoor spaces since 1998.",
  websiteUrl: "https://example.com/green-leaf-garden-center",
};
