// TEMPORARY SAMPLE CONTENT — Milestone 3 only.
// This data is placeholder content used to build the public portfolio shell.
// It must be replaced by API-driven content in later milestones.
// Do not treat as production data.

export const sampleProfile = {
  fullName: "Jordan Mercer",
  professionalTitle: "Senior Product Designer & Frontend Engineer",
  introduction:
    "I design and build calm, durable digital products for teams that care about craft.",
  profileImage: null as string | null,
  resumeUrl: null as string | null,
  email: "hello@jordanmercer.com",
  phone: "+1 (415) 555-0142",
  location: "San Francisco, CA",
  social: [
    { label: "LinkedIn", url: "https://linkedin.com" },
    { label: "GitHub", url: "https://github.com" },
  ],
};

export const sampleAbout = {
  biography:
    "With over nine years of experience across product design and frontend engineering, I help organisations ship interfaces that are clear, accessible, and built to last. I care about typographic detail, honest interaction design, and code that stays readable.",
};

export const sampleExperience = [
  {
    id: "1",
    company: "Northwind Labs",
    position: "Lead Product Designer",
    employmentType: "Full-time",
    startDate: "2021",
    endDate: null as string | null,
    isCurrent: true,
    description:
      "Led design for a B2B analytics platform used by 40+ enterprise clients. Established the design system and shipped three major product releases.",
  },
  {
    id: "2",
    company: "Aster Studio",
    position: "Senior Frontend Engineer",
    employmentType: "Full-time",
    startDate: "2018",
    endDate: "2021",
    isCurrent: false,
    description:
      "Built accessible component libraries and performance-focused marketing sites for clients in fintech and healthcare.",
  },
];

export const sampleProjects = [
  {
    id: "1",
    title: "Atlas Analytics",
    slug: "atlas-analytics",
    summary: "A calm, data-dense analytics workspace for operations teams.",
    description:
      "Designed and engineered a modular analytics interface with saved views, keyboard navigation, and exportable reports.",
    coverImage: null as string | null,
    technologies: ["React", "TypeScript", "D3", "Node.js"],
    liveUrl: "#",
    sourceUrl: "#",
    featured: true,
  },
  {
    id: "2",
    title: "Field Notes",
    slug: "field-notes",
    summary: "An offline-first journaling app for researchers in the field.",
    description:
      "Progressive web app with sync, media capture, and structured templates for field research.",
    coverImage: null as string | null,
    technologies: ["React", "IndexedDB", "Workbox"],
    liveUrl: "#",
    sourceUrl: "#",
    featured: false,
  },
];

export const sampleSkills = [
  { id: "1", name: "TypeScript", category: "Engineering", proficiency: "Advanced" },
  { id: "2", name: "React", category: "Engineering", proficiency: "Advanced" },
  { id: "3", name: "Tailwind CSS", category: "Engineering", proficiency: "Advanced" },
  { id: "4", name: "Figma", category: "Design", proficiency: "Advanced" },
  { id: "5", name: "Design Systems", category: "Design", proficiency: "Expert" },
  { id: "6", name: "Accessibility", category: "Design", proficiency: "Advanced" },
];

export const sampleEducation = [
  {
    id: "1",
    institution: "University of California, Berkeley",
    qualification: "B.S.",
    fieldOfStudy: "Computer Science",
    startDate: "2012",
    endDate: "2016",
    description: "Focus on human-computer interaction and software engineering.",
  },
];

export const sampleCertifications = [
  {
    id: "1",
    title: "Certified Professional in Accessibility Core Competencies",
    issuer: "IAAP",
    issueDate: "2023",
    credentialUrl: "#",
  },
];

export const sampleServices = [
  {
    id: "1",
    title: "Product Design",
    description: "End-to-end product design from research through high-fidelity prototypes.",
  },
  {
    id: "2",
    title: "Frontend Engineering",
    description: "Accessible, performant React applications with strong design fidelity.",
  },
];

export const sampleTestimonials = [
  {
    id: "1",
    clientName: "Elena Rostova",
    clientRole: "VP Product",
    organization: "Northwind Labs",
    feedback:
      "Jordan brought a rare combination of design taste and engineering rigour. Our platform has never been clearer to use.",
  },
];