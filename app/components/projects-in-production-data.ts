import type { Project } from "./projects-data";

// Projects currently being built — not yet live. Shared between the "in production" list
// component and its detail route, same shape as the deployed projects data.
export const projectsInProduction: Project[] = [
  {
    slug: "barking-legs",
    name: "Barking Legs",
    service: "Website / Content Management System",
    imageUrl: "/barking-legs.jpg",
    description: [
      "Barking Legs - A live music and events venue rebuilt from an old React app into a full Next.js site, with public event listings, booking, and a private staff dashboard.",
      "Customers browse upcoming shows and book directly on the site. Events can be added, edited, or removed from the dashboard without touching code.",
    ],
    servicesDelivered: ["Website", "Database", "Payment Processing", "CRM"],
    techStack: ["Next.js", "React", "PostgreSQL", "Stripe", "Railway"],
    website: "https://barking-legs-front-end.vercel.app/",
  },
  {
    slug: "bay-view",
    name: "Bay View",
    service: "Website / SEO / Booking System / Reports",
    imageUrl: "/bay-view.jpg",
    description: [
      "Bay View - A marketing site for a holiday apartment, built to turn visitors into direct bookings instead of losing them to listing-site fees.",
      "The page walks through the space with a trust banner, photo gallery, guest reviews, and a rundown of on-site amenities and nearby activities, giving guests everything they'd normally have to piece together across a listing page and a search engine.",
      "A simple booking system to help the owner manage availability and take direct bookings without relying on a third-party listing site.",
    ],
    servicesDelivered: ["Website", "SEO", "Booking System"],
    techStack: ["Next.js", "React"],
  },
  {
    slug: "the-movement",
    name: "The Movement",
    service: "Website / E-Commerce",
    imageUrl: "/movement.png",
    description: [
      "The Movement - A community first running club for runners of all skill levels.",
      "Products (apparel with size options, plus accessories) are defined in a typed catalog, making it simple to add new drops or mark items out of stock without restructuring the shop.",
      "Currently in production.",
    ],
    servicesDelivered: ["Website", "Online Payment"],
    techStack: ["Next.js", "React"],
    website: "https://the-movement-front-end.vercel.app/",
  },
];
