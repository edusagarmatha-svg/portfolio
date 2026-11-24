# Dynamic Portfolio CMS --- Project Brief

## 1. Project Overview

We are building a professional, content-managed personal portfolio
website.

The portfolio owner must be able to manage the content of their
public-facing website through a secure admin panel, without editing
source code or contacting a developer for routine updates.

This is not just a static portfolio with a login page. It is a small
Portfolio Content Management System (CMS).

### Core user journey

1.  A portfolio owner receives admin credentials.
2.  They visit `/admin/login` and authenticate.
3.  They access a protected dashboard.
4.  They create, edit, reorder, publish, hide, or archive portfolio
    content.
5.  Changes are saved in the database and reflected on the public
    portfolio.
6.  Public visitors can browse the portfolio and submit contact
    messages, but cannot access administrative functions.

The application must be designed cleanly so that it can later support
multiple portfolio owners. Do not assume that every user can access
every portfolio's data.

------------------------------------------------------------------------

## 2. Product Goals

-   Deliver a polished, business-professional portfolio.
-   Allow the owner to manage all important portfolio content
    independently.
-   Keep the public site fast, responsive, accessible, and search-engine
    friendly.
-   Keep the admin panel intuitive and consistent.
-   Implement secure authentication and server-side authorization.
-   Use a maintainable architecture with clear separation of concerns.
-   Avoid unnecessary complexity, overengineering, and premature
    features.

## 3. Design Direction

### Public portfolio

The visual direction is **premium corporate / editorial / minimalist**,
not a generic AI-generated landing page.

Design principles:

-   Clear typography and strong content hierarchy.
-   White or warm off-white backgrounds.
-   Charcoal or near-black text.
-   A restrained accent colour, such as navy or muted blue.
-   Generous but purposeful whitespace.
-   Consistent spacing and alignment.
-   Subtle borders and restrained shadows.
-   High-quality, appropriately cropped images.
-   Responsive layouts across desktop, tablet, and mobile.
-   Subtle transitions only where they improve usability.

Avoid:

-   Excessive gradients, especially purple/blue gradients.
-   Unnecessary glassmorphism.
-   Random floating blobs, decorative shapes, and glowing effects.
-   Excessively rounded cards and buttons.
-   Overuse of animations.
-   Generic template-like sections that do not serve the portfolio
    content.
-   Emoji used as interface icons.

### Typography

Use a professional, readable typeface. Good candidates include Inter,
IBM Plex Sans, Manrope, or Source Sans 3.

Choose a consistent typographic scale and use it throughout the public
site and admin panel. Do not mix many font families.

### Admin dashboard

The admin panel may use a clean SaaS-style interface:

-   Persistent sidebar navigation.
-   Clear page titles and breadcrumbs where useful.
-   Consistent form controls.
-   Professional buttons and action menus.
-   Tables or well-structured lists for managing records.
-   Confirmation dialogs for destructive actions.
-   Toast notifications for success and failure.
-   Loading, empty, validation, and error states.

Do not leave browser-default buttons, inputs, or unstyled HTML elements
in the finished interface.

------------------------------------------------------------------------

## 4. Proposed Technology Stack

Use the following stack unless repository inspection reveals a strong
reason to adjust it. Explain any proposed change before implementing it.

  -----------------------------------------------------------------------
  Layer                   Technology              Responsibility
  ----------------------- ----------------------- -----------------------
  Public frontend         React + Vite            Public portfolio pages
                                                  (SPA; SEO via meta tags
                                                  and optional prerender)

  Admin frontend          React + Vite            Admin login and
                                                  dashboard

  Backend                 Node.js + Express.js    API, validation,
                                                  authentication, and
                                                  business logic

  Database                PostgreSQL              Persistent relational
                                                  data

  ORM                     Prisma                  Database client,
                                                  schema, and migrations

  Authentication          Secure session or JWT   Admin authentication
                          in HTTP-only cookies    

  Password hashing        bcrypt or another       Password storage
                          established             
                          password-hashing        
                          library                 

  Media storage           Cloudinary              Profile photos, project
                                                  images, and other
                                                  uploads

  Styling                 Tailwind CSS            Consistent responsive
                                                  UI

  Icons                   Lucide React            Consistent interface
                                                  icons

  Deployment              To be decided           Host frontend, API, and
                                                  database appropriately
  -----------------------------------------------------------------------

### Important technology notes

-   PostgreSQL is preferred because portfolio content has clear
    relationships: one owner can have many projects, experiences,
    education records, skills, and certifications.
-   Prisma is used as the database ORM and migration tool. It does not
    replace SQL knowledge.
-   Use parameterized queries through Prisma and validate all incoming
    data on the server.
-   Keep secrets in environment variables. Never commit real credentials
    or `.env` files.
-   Do not store uploaded image binaries in PostgreSQL. Store media in
    Cloudinary and persist the relevant URLs and metadata.
-   Do not introduce additional libraries without a clear need.

### Architecture decision to confirm

The initial product may be deployed for one individual, but the data
model and authorization design should be ownership-aware so that
multiple portfolios can be supported later.

Do not implement a full SaaS subscription, billing, tenant onboarding,
or custom-domain system unless explicitly requested.

Before building authentication and database ownership, inspect the
existing requirements and confirm whether the first release is: - one
portfolio with one admin; or - multiple independent portfolio owners,
each with their own portfolio and admin account.

In either case, never rely on frontend checks alone to protect data.
Enforce ownership and permissions on the backend.

------------------------------------------------------------------------

## 5. Main Application Areas

### A. Public portfolio

The public website should support these sections. Sections should be
configurable and should not be displayed when they have no published
content or have been disabled.

1.  **Hero / Home**
    -   Full name
    -   Professional title or designation
    -   Short introduction
    -   Profile image
    -   Primary contact action
    -   Download CV / résumé action, when available
    -   Optional social links
2.  **About**
    -   Professional biography
    -   Relevant background and interests
3.  **Experience**
    -   Company or organization
    -   Position
    -   Employment type, if relevant
    -   Start and end dates
    -   Current-role indicator
    -   Description and responsibilities
4.  **Projects**
    -   Title and slug
    -   Short summary and detailed description
    -   Cover image and optional gallery
    -   Technologies or skills used
    -   Live demo URL
    -   Source-code URL
    -   Featured indicator
5.  **Skills**
    -   Skill name
    -   Category
    -   Optional proficiency label or level
    -   Display order
6.  **Education**
    -   Institution
    -   Qualification / degree
    -   Field of study
    -   Start and end dates
    -   Description, if needed
7.  **Certifications**
    -   Certificate title
    -   Issuing organization
    -   Issue date
    -   Credential URL or uploaded certificate
8.  **Services** (optional)
    -   Service title
    -   Description
    -   Optional image or icon
9.  **Testimonials** (optional)
    -   Client name
    -   Role or organization
    -   Feedback
    -   Optional photo
10. **Contact**
    -   Contact information and social links
    -   Contact form
    -   Clear form validation and submission feedback

### B. Admin panel

Suggested routes:

``` text
/admin/login
/admin/dashboard
/admin/profile
/admin/about
/admin/experience
/admin/projects
/admin/skills
/admin/education
/admin/certifications
/admin/services
/admin/testimonials
/admin/messages
/admin/settings
```

The dashboard should provide a useful overview, not decorative
statistics that do not help the owner.

Potential dashboard information:

-   Number of published projects
-   Number of experience entries
-   Number of certifications
-   Unread contact messages
-   Recent content updates
-   Shortcuts to common actions

### Admin capabilities

  -----------------------------------------------------------------------
  Module                              Required capabilities
  ----------------------------------- -----------------------------------
  Profile                             Edit name, title, introduction,
                                      profile image, résumé, and contact
                                      details

  About                               Edit biography and related content

  Experience                          Create, view, update, delete,
                                      reorder, and control visibility

  Projects                            Create, view, update, delete,
                                      feature, reorder, and control
                                      publication status

  Skills                              Manage skills, categories, and
                                      display order

  Education                           Manage education records

  Certifications                      Manage credentials and certificate
                                      media

  Services                            Manage service entries, if enabled

  Testimonials                        Manage testimonials, if enabled

  Messages                            View submissions and mark them
                                      read/unread; delete when
                                      appropriate

  Settings                            Manage social links, SEO metadata,
                                      and section visibility
  -----------------------------------------------------------------------

### Content status and ordering

For content types that need publication control, support appropriate
statuses such as:

-   Draft
-   Published
-   Archived

A draft must never appear on the public site. Archived content should be
retained where appropriate but excluded from public output.

Allow the admin to control display order for repeatable sections such as
projects, experience, skills, education, and certifications.

------------------------------------------------------------------------

## 6. Initial Data Model --- Conceptual

This is a starting point, not a final Prisma schema. Inspect the
requirements and refine field types, indexes, constraints, relations,
and deletion behavior before implementing migrations.

Potential entities:

``` text
User
- id
- email (unique)
- passwordHash
- role
- createdAt
- updatedAt

Portfolio / Profile
- id
- ownerId
- slug (if public URL uses a slug)
- fullName
- professionalTitle
- introduction
- biography
- profileImage
- resumeUrl
- email
- phone (optional)
- location (optional)
- createdAt
- updatedAt

Experience
- id
- portfolioId
- company
- position
- employmentType (optional)
- description
- startDate
- endDate (nullable)
- isCurrent
- displayOrder
- status
- createdAt
- updatedAt

Project
- id
- portfolioId
- title
- slug
- summary
- description
- coverImage
- liveUrl
- sourceUrl
- featured
- displayOrder
- status
- createdAt
- updatedAt

Skill
- id
- portfolioId
- name
- category
- displayOrder

Education
- id
- portfolioId
- institution
- qualification
- fieldOfStudy
- description
- startDate
- endDate
- displayOrder

Certification
- id
- portfolioId
- title
- issuer
- issueDate
- credentialUrl
- certificateMediaUrl
- displayOrder
- status

Service (optional)
- id
- portfolioId
- title
- description
- displayOrder
- status

Testimonial (optional)
- id
- portfolioId
- clientName
- clientRole
- organization
- feedback
- photoUrl
- displayOrder
- status

ContactMessage
- id
- portfolioId
- senderName
- senderEmail
- subject (optional)
- message
- readAt (nullable)
- createdAt

SiteSetting
- id
- portfolioId
- key
- value
- updatedAt
```

Do not blindly implement every optional entity. Confirm what is useful
for the first release.

------------------------------------------------------------------------

## 7. Security and Reliability Requirements

Security is a core requirement, not a final polish task.

-   Hash passwords securely; never store plaintext passwords.
-   Never expose password hashes or secrets in API responses.
-   Protect all admin API routes with backend authentication middleware.
-   Enforce portfolio ownership on every protected read and write
    operation.
-   Validate and sanitize request data on the server.
-   Use parameterized database operations.
-   Use secure, HTTP-only cookies for authentication tokens or sessions.
-   Configure appropriate `Secure` and `SameSite` cookie settings for
    the deployment environment.
-   Consider CSRF protection when using cookie-based authentication.
-   Apply rate limiting to login and public contact-form endpoints.
-   Restrict upload file types and file sizes.
-   Verify authorization before deleting media or database records.
-   Avoid exposing internal stack traces to public API responses.
-   Use appropriate CORS configuration; do not allow every origin in
    production.
-   Keep environment variables and credentials out of Git.
-   Provide useful server-side logging without logging passwords,
    tokens, or sensitive data.

Do not implement authentication by simply hiding admin links in the
frontend.

------------------------------------------------------------------------

## 8. API Design Expectations

Use consistent REST API conventions and a clear separation between
public and admin endpoints.

Illustrative route groups:

``` text
/api/auth
/api/public/portfolio
/api/public/projects
/api/public/contact

/api/admin/dashboard
/api/admin/profile
/api/admin/experience
/api/admin/projects
/api/admin/skills
/api/admin/education
/api/admin/certifications
/api/admin/services
/api/admin/testimonials
/api/admin/messages
/api/admin/settings
```

These are proposed route groups, not a requirement to create every
endpoint immediately.

API expectations:

-   Use appropriate HTTP methods and status codes.
-   Return consistent JSON response structures.
-   Validate request bodies, query parameters, and route parameters.
-   Handle errors centrally.
-   Add pagination to lists that may grow.
-   Keep public endpoints separate from protected admin endpoints.
-   Return only published content from public endpoints.
-   Do not trust an owner or portfolio ID supplied by the browser when
    the authenticated identity should determine it.

------------------------------------------------------------------------

## 9. Media Management

Use Cloudinary for uploaded media.

The admin should be able to:

-   Upload a profile image.
-   Upload project cover images and optional galleries.
-   Upload a résumé or certificate where supported.
-   Preview an image before saving.
-   Replace existing media.
-   Receive clear upload errors and progress feedback.

Use appropriate image transformations and responsive image sizing.
Preserve useful metadata such as dimensions, format, and alternative
text where applicable.

Avoid layout shifts and oversized media. Public images must have
sensible aspect ratios, object-fit behavior, and responsive dimensions.

------------------------------------------------------------------------

## 10. SEO, Accessibility, and Performance

### SEO

-   Use meaningful page titles and meta descriptions.
-   Use clean, stable project URLs/slugs.
-   Provide Open Graph metadata.
-   Add canonical URLs where appropriate.
-   Generate sitemap and robots directives as appropriate.
-   Use client-rendered React with appropriate meta tags (react-helmet-async)
    and, where feasible, prerendering for public content; keep bundle size
    small.
-   Use semantic HTML and descriptive image alt text.

### Accessibility

-   Use semantic landmarks and headings.
-   Ensure keyboard navigation works.
-   Provide visible focus states.
-   Associate labels with form controls.
-   Maintain sufficient text/background contrast.
-   Do not communicate status using colour alone.
-   Respect reduced-motion preferences.

### Performance

-   Optimize and appropriately size images.
-   Avoid unnecessary client-side JavaScript.
-   Use pagination or sensible limits for admin lists.
-   Avoid repeated database queries and N+1 patterns.
-   Add indexes for frequently queried fields where justified.
-   Include loading, empty, and error states.

------------------------------------------------------------------------

## 11. Development Workflow and Rules

Work in small, verifiable milestones. Do not attempt to generate the
entire application in one large implementation.

For every milestone:

1.  Inspect the existing repository and relevant files first.
2.  Explain the proposed implementation plan and affected files.
3.  Identify assumptions, risks, and database changes.
4.  Wait for approval if the change is architectural, destructive, or
    materially changes scope.
5.  Implement only the approved milestone.
6.  Run relevant tests, linting, and build checks.
7.  Inspect the actual UI where applicable.
8.  Report files changed, commands run, results, and remaining issues.
9.  Do not claim something is tested unless the test was actually run.
10. Do not silently modify unrelated features.

### Code quality

-   Keep routes, controllers, services, middleware, validation, and
    database access organized.
-   Use reusable components without creating unnecessary abstractions.
-   Keep naming consistent and readable.
-   Avoid giant components and giant controller files.
-   Do not duplicate business logic.
-   Do not add dependencies without explaining why they are needed.
-   Do not leave placeholder buttons or non-functional controls in
    completed features.
-   Do not use mock data as if it were production data.
-   Keep the implementation understandable and maintainable.

### Git

Use feature branches and small commits. Do not reset, force-push, or
discard existing user work without explicit permission.

Before making changes, inspect:

``` bash
git status
git branch --show-current
```

Never overwrite uncommitted user changes.

------------------------------------------------------------------------

## 12. Suggested Milestones

The sequence can be adjusted after repository inspection.

### Milestone 0 --- Discovery and architecture

-   Inspect repository and existing code.
-   Confirm whether this is a single-owner or multi-owner first release.
-   Confirm frontend/backend project structure.
-   Define API conventions and environment variables.
-   Propose the initial database schema.
-   Identify deployment assumptions.

**Deliverable:** Architecture and implementation plan. No broad feature
implementation yet.

### Milestone 1 --- Project foundation

-   Set up or verify frontend and backend.
-   Configure environment handling.
-   Connect PostgreSQL.
-   Set up Prisma.
-   Create the initial schema and migration.
-   Add basic health-check endpoint.
-   Establish error handling and validation conventions.

### Milestone 2 --- Authentication and authorization

-   Admin login and logout.
-   Secure password hashing.
-   Protected backend routes.
-   Session/token handling with secure cookies.
-   Ownership checks.
-   Basic authentication tests.

### Milestone 3 --- Public portfolio shell

-   Establish typography, spacing, colour system, and responsive layout.
-   Build the public navigation and section structure.
-   Use clearly identified temporary sample content only until API
    integration.
-   Ensure the visual design follows the professional direction in this
    brief.

### Milestone 4 --- Admin dashboard foundation

-   Protected admin layout.
-   Sidebar and navigation.
-   Dashboard overview.
-   Reusable form controls, tables, dialogs, and notifications.
-   Loading, empty, and error states.

### Milestone 5 --- Profile and About management

-   Profile CRUD/update flow.
-   About content management.
-   Connect admin forms to the API and database.
-   Display saved content publicly.

### Milestone 6 --- Projects and Experience

-   Full CRUD.
-   Publication status.
-   Featured projects.
-   Ordering.
-   Public display of published records.

### Milestone 7 --- Skills, Education, and Certifications

-   CRUD and ordering.
-   Visibility controls where relevant.
-   Public display integration.

### Milestone 8 --- Cloudinary media management

-   Secure upload flow.
-   Media validation.
-   Preview and replacement.
-   Persist media metadata.
-   Test failure and deletion scenarios.

### Milestone 9 --- Contact and optional sections

-   Public contact form.
-   Message storage and admin inbox.
-   Read/unread management.
-   Add Services and Testimonials only if required.

### Milestone 10 --- Settings and SEO

-   Social links.
-   Section visibility.
-   Page metadata.
-   Résumé management.
-   Sitemap and other relevant SEO work.

### Milestone 11 --- Quality assurance and deployment

-   Test important user journeys.
-   Review authorization and ownership boundaries.
-   Test responsive layouts.
-   Fix accessibility and performance issues.
-   Configure production environment variables.
-   Deploy frontend, backend, and database.
-   Verify production behavior.

------------------------------------------------------------------------

## 13. Definition of Done

A feature is not complete merely because its page looks finished.

A feature is complete when:

-   The UI is consistent with the design system.
-   Forms have validation and useful feedback.
-   Data persists correctly in PostgreSQL.
-   API errors are handled gracefully.
-   Protected operations enforce authentication and ownership.
-   Public pages show only appropriate published content.
-   Loading, empty, and error states are implemented.
-   Responsive behavior is checked.
-   Relevant tests pass.
-   No unrelated existing functionality has been broken.

------------------------------------------------------------------------

## 14. First Task for the Coding Agent

Start with **Milestone 0 --- Discovery and architecture**.

Do not immediately generate the entire application.

First inspect the current project directory and report:

1.  Existing files, folders, framework, and dependencies.
2.  Whether a frontend or backend already exists.
3.  Existing Git status and current branch.
4.  Any existing database or authentication implementation.
5.  Any architectural issues or decisions that need confirmation.
6.  A proposed folder structure for the application.
7.  A proposed initial relational database schema.
8.  A milestone-by-milestone implementation plan.

Pay particular attention to confirming whether the first release is for
one portfolio owner or multiple independent owners.

Wait for approval before making broad architectural or implementation
changes.
