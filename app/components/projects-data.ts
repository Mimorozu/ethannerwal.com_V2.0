export type Project = {
  slug: string;
  name: string;
  service: string;
  imageUrl: string;
  description: string[];
  servicesDelivered: string[];
  techStack: string[];
  crmDemoUrl?: string;
  website?: string;
};

// Placeholder entries — swap in the real projects. Shared between the list (projects.tsx)
// and the detail route (app/projects/[slug]/page.tsx) so both read from one source.
export const projects: Project[] = [
  {
    slug: "kitchen-worktops-experts",
    name: "Kitchen Worktops Experts",
    service: "Website / CRM / SEO",
    imageUrl: "/kitchen.webp",
    description: [
      "Kitchen Worktop Experts - A newly launched business specialising in supplying and fitting bespoke luxury stone worktops. The team needed a system that reflected the elegance of their craftsmanship.",
      "I partnered closely with the client to understand its internal structure and workflow. This helped me gain a clear vision of what systems could be put in place to automate repetitive tasks and reduce friction between a customer's point of interest and final install.",
      "I built a mobile first front end with a submission form. These details are pushed into a custom CRM with an integrated job cost calculator and automated quoting system. The launch was supported by SEO for immediate impact and increased visibility.",
    ],
    servicesDelivered: ["Website", "Google Analytics", "SEO", "CRM",],
    techStack: ["React", "PostgreSQL", "GitHub", "Vercel", 'Railway'],
    crmDemoUrl: "https://crm-demo-xi-two.vercel.app/",
    website: "https://www.kitchenworktopexperts.co.uk/"
  },
  {
    slug: "quartz-worktop-finder",
    name: "Quartz Worktop Finder",
    service: "Website / Online Payment / SEO",
    imageUrl: "/quartz.webp",
    description: [
      "Quartz Worktop Finder - A lead-generation directory that matches homeowners with verified quartz worktop specialists near them. Customers search by postcode and see a live-counting reveal of nearby companies as results come in.",
      "The results themselves are the product: a locked preview of each match builds trust and urgency, then a small one-off payment unlocks full contact details for that search. I built this on Stripe's embedded checkout with a database-backed fallback so a customer who pays but never completes the redirect back is still recognized as unlocked.",
      "Behind the search sits a PostgreSQL database of companies and their coverage postcodes, plus an admin dashboard for Google Ads and analytics reporting so the business can track lead sources and conversion performance alongside the SEO-driven organic traffic.",
    ],
    servicesDelivered: ["Website", "Database", "Payment Processing", "Google Ads", "SEO"],
    techStack: ["Next.js", "React", "PostgreSQL", "Prisma", "Stripe", "Railway"],
    website: "https://quartzworktopfinderuk.com/"
  },

];
