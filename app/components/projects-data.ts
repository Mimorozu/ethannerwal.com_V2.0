export type Project = {
  slug: string;
  name: string;
  service: string;
  imageUrl: string;
  description: string;
  servicesDelivered: string[];
  techStack: string[];
};

// Placeholder entries — swap in the real projects. Shared between the list (projects.tsx)
// and the detail route (app/projects/[slug]/page.tsx) so both read from one source.
export const projects: Project[] = [
  {
    slug: "kitchen-worktops-experts",
    name: "Kitchen Worktops Experts",
    service: "Website / CRM / SEO",
    imageUrl: "/kitchen.webp",
    description:
      "Kitchen Worktop Exterts - A newly launched business specialising in suppling and fitting bespoke luxury stone worktops. The team needed a website that reflected the elegance of their craftsmanship. I partnered closely with the client for a strategic understanding of it's internal structure, workflow and commertial offering. This helped me gain a clear vision of what systems they needed in place to reduce friction between a customers point of interest and final install. I build a front end with a submittion form. These details were then passed into a CRM for the team to manage and record the specific requirements needed, as every job is different. The launch was supported by SEO for immediate impact and increased visibility.   ",
    servicesDelivered: ["Website", "Google Analytics", "SEO", "CRM",],
    techStack: ["React", "PostgreSQL", "GitHub", "Vercel", 'Railway'],
  },
  {
    slug: "barking-legs",
    name: "Barking Legs",
    service: "Website / Content Management System / CRM",
    imageUrl: "/chip.jpg",
    description:
      "Placeholder — a short write-up of what this project does, the problem it solves, and the stack behind it.",
    servicesDelivered: ["Website", "Content Management System", "CRM"],
    techStack: ["Next.JS", "PostgreSQL", "GitHub", "Railway", "Vercel"],
  },
  {
    slug: "project-three",
    name: "Project Name",
    service: "Website & Web Applications",
    imageUrl: "/world.png",
    description:
      "Placeholder — a short write-up of what this project does, the problem it solves, and the stack behind it.",
    servicesDelivered: ["Service Name", "Service Name", "Service Name"],
    techStack: ["Tech Name", "Tech Name", "Tech Name", "Tech Name"],
  },
];
