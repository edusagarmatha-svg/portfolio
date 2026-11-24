// TEMPORARY SAMPLE CONTENT — Milestone 3 only.
// This data is placeholder content used to build the public portfolio shell.
// It must be replaced by API-driven content in later milestones.
// Do not treat as production data.

export const sampleProfile = {
  fullName: "Subodh Rayamajhee",
  professionalTitle: "Entrepreneur | Educator | Business Leader",
  introduction:
    "Driving institutional growth, educational development, and community empowerment through leadership, entrepreneurship, and strategic management.",
  profileImage: null as string | null,
  resumeUrl: null as string | null,
  email: "subodh@gmail.com",
  phone: "",
  location: "Nepal",
  social: [
    { label: "LinkedIn", url: "https://linkedin.com" },
  ],
};

export const sampleAbout = {
  biography:
    "I am an entrepreneur, educator, and organizational leader with professional experience across the education sector, cooperative management, and institutional administration. As the Chief Executive Officer of Sagarmatha Education and Research Academy (SERA), I have been involved in leading educational initiatives and supporting institutional growth. My professional journey also includes leadership within cooperative and business environments, with a focus on organizational development, strategic planning, and community empowerment.",
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
  { id: "1", name: "Strategic Management", category: "Leadership", proficiency: "Expert" },
  { id: "2", name: "Institutional Development", category: "Leadership", proficiency: "Expert" },
  { id: "3", name: "Entrepreneurship", category: "Business", proficiency: "Advanced" },
  { id: "4", name: "Cooperative Management", category: "Business", proficiency: "Advanced" },
  { id: "5", name: "Educational Administration", category: "Education", proficiency: "Expert" },
  { id: "6", name: "Community Empowerment", category: "Social Impact", proficiency: "Advanced" },
];

export const sampleLeadership = [
  {
    id: "1",
    title: "Chief Executive Officer",
    organization: "Sagarmatha Education and Research Academy (SERA)",
    description:
      "Leading educational initiatives and supporting institutional growth through strategic planning and organizational development.",
  },
  {
    id: "2",
    title: "Leadership Roles in Cooperative & Business Sectors",
    organization: "Cooperative & Business Environments",
    description:
      "Driving organizational development, strategic planning, and community empowerment across cooperative and business environments.",
  },
];

export const sampleInsights = [
  {
    id: "1",
    title: "Building Institutions That Last",
    excerpt: "Reflections on leadership, institutional growth, and the long-term work of building organizations that serve communities.",
  },
  {
    id: "2",
    title: "Education as a Catalyst for Community Empowerment",
    excerpt: "How educational institutions can drive broader social and economic development beyond the classroom.",
  },
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