export interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  imageSrc: string;
  imageAlt: string;
  detailsHref: string;
}

export interface Sponsor {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
}
