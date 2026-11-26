# Dynamic Portfolio CMS — Progress Log

This document tracks implementation progress. It is updated after each
milestone or meaningful progress step.

## Milestone 0 — Discovery and Architecture

Status: In progress (architecture proposed; awaiting approval to scaffold)

### Decisions confirmed

- First release: single portfolio owner (one admin manages one portfolio).
  Schema remains ownership-aware (Portfolio.ownerId) so multi-owner support
  can be added later without a rewrite.
- Optional sections Services and Testimonials: included in first release.
- Frontend stack updated per user request: React + Vite (SPA) for both
  public and admin UI (replacing the originally proposed Next.js).
- Backend: Node.js + Express.js. Database: PostgreSQL. ORM: Prisma.

### Repository inspection findings

- Repository initially contained only `docs/` with the project brief.
- No frontend, backend, database, authentication, or existing code.
- No git repository initialized at project root (no .git).
- Available tooling: Node v22, npm 10.9, PostgreSQL 16 client, git.

### Proposed architecture (summary)

- Monorepo with npm workspaces:
  - `apps/web` — Vite + React SPA (public site + admin panel)
  - `apps/api` — Express API
  - `packages/shared` — shared types/validation (optional)
- Prisma schema lives in `apps/api/prisma`.
- Auth: bcrypt password hashing, JWT in HTTP-only cookie, ownership checks
  on backend, tokenVersion for logout invalidation.
- Media: uploaded to a mounted disk volume and served by the API (see the
  Railway volume migration section).
- Security: helmet, CORS allowlist, rate limiting, zod validation,
  centralized error handling.

### Proposed database entities

User, Portfolio, Experience, Project, ProjectImage, Skill, Education,
Certification, Service, Testimonial, ContactMessage, SiteSetting.
(See architecture proposal in chat for full schema.)

### Milestones

0. Discovery and architecture — completed
1. Project foundation — completed
2. Authentication and authorization — completed
3. Public portfolio shell — completed
4. Admin dashboard foundation — completed
5. Profile and About management — completed
6. Projects and Experience — completed
7. Skills, Education, and Certifications — completed
8. Media management (volume-backed) — completed
9. Contact and optional sections — completed
10. Settings and SEO — completed
11. Quality assurance and deployment preparation — completed
2. Authentication and authorization — not started
3. Public portfolio shell — not started
4. Admin dashboard foundation — not started
5. Profile and About management — not started
6. Projects and Experience — not started
7. Skills, Education, and Certifications — not started
8. Media management (volume-backed) — not started
9. Contact and optional sections (Services, Testimonials) — not started
10. Settings and SEO — not started
11. Quality assurance and deployment — not started

### Next step

Awaiting approval to proceed to Milestone 1 (project foundation).

## Milestone 1 — Project Foundation (completed)

### What was done

- Initialized git repository (branch `main`) and root `.gitignore`.
- Created npm workspaces monorepo: `apps/web`, `apps/api`.
- Backend (Express + TypeScript):
  - Environment loading/validation with Zod (`src/config/env.ts`).
  - Prisma client singleton (`src/lib/prisma.ts`).
  - Centralized error handler (`src/middleware/error-handler.ts`).
  - Helmet, CORS, cookie-parser, JSON body parsing, global rate limit.
  - Health check endpoint `GET /api/v1/health` (verifies DB).
  - API root `GET /api/v1`.
- Database:
  - PostgreSQL via Docker container on port 5433 (dev).
  - Prisma schema with all core entities and initial migration `init`.
- Frontend (Vite + React + TypeScript):
  - Tailwind CSS v4 via `@tailwindcss/vite`.
  - Minimal app shell.
- Environment templates: `apps/api/.env.example`, `apps/web/.env.example`.

### Verification

- `npm run typecheck` (api + web): passed.
- `npm run build` (api + web): passed.
- Backend started; `GET /api/v1/health` returned `{"success":true,"data":{"status":"ok","db":"connected"}}`.
- `GET /api/v1` returned API info.

### Notes / Next

- Backend dev server was stopped after verification.
- Postgres container `portfolio-cms-postgres` remains running for dev.
- Milestone 2 will implement authentication and authorization.

## Milestone 2 — Authentication and Authorization (completed)

### What was done

- Seed script creates initial admin user + portfolio (`prisma/seed.ts`).
- Auth module:
  - `POST /api/v1/auth/login` (rate limited), `POST /logout`, `GET /me`.
  - bcrypt password hashing (12 rounds), JWT in HTTP-only cookie.
  - Logout increments `tokenVersion` to invalidate tokens.
- Middleware:
  - `authenticate` verifies JWT, checks token version, loads user + portfolio.
  - `validate` Zod request body validation.
- Centralized error handling now maps Zod errors to 400.
- Basic tests: password hash/verify, JWT sign/verify, login schema validation.

### Verification

- `npm run typecheck` and `npm run build`: passed.
- `npm test`: 5 tests passed.
- Manual flow: login -> /me (200) -> logout -> /me (401) verified.

### Notes / Next

- Milestone 3 will build the public portfolio shell (frontend).

## Milestone 3 — Public Portfolio Shell (completed)

### What was done

- Design tokens in Tailwind v4 `@theme` (colors, font, radius).
- Layout components: Container, Section, Header, Footer.
- Sections: Hero, About, Experience, Projects, Skills, Education, Certifications, Services, Testimonials, Contact.
- Temporary sample content in `src/data/sampleContent.ts` (clearly marked).
- Responsive navigation (desktop + mobile menu).
- Contact form is client-side only for now (API integration later).

### Verification

- `npm run typecheck` and `npm run build`: passed.
- Dev server started successfully on http://localhost:5173.

### Notes / Next

- Milestone 4 will build the admin dashboard foundation.

## Milestone 4 — Admin Dashboard Foundation (completed)

### What was done

- Backend: `GET /api/v1/admin/dashboard` returns counts for projects, experience, certifications, unread messages.
- Frontend routing with React Router: public site, `/admin/login`, protected `/admin/*`.
- Auth context (login/logout/refresh) with cookie-based sessions.
- Admin layout with sidebar navigation and logout.
- Dashboard overview with stat cards and loading skeletons.
- Reusable UI components: Button, Input, Card, Toast provider.
- Placeholder pages for Profile, Projects, Experience, Messages.

### Verification

- `npm run typecheck` and `npm run build` (web + api): passed.
- Backend running; login + dashboard endpoint verified (counts returned).

### Notes / Next

- Milestone 5 will implement Profile and About management (CRUD + public display).

## Milestone 5 — Profile and About Management (completed)

### What was done

- Backend:
  - `GET /api/v1/public/portfolio` returns public profile.
  - `GET /api/v1/admin/profile` (protected) returns full portfolio.
  - `PUT /api/v1/admin/profile` (protected, validated) updates profile.
- Frontend:
  - Admin Profile page with form for all profile fields.
  - Public Hero/About/Contact sections now use API data with sample fallback.

### Verification

- `npm run typecheck` and `npm run build` (web + api): passed.
- Manual: update profile -> public endpoint reflects changes.

### Notes / Next

- Milestone 6 will implement Projects and Experience (full CRUD).

## Milestone 6 — Projects and Experience (completed)

### What was done

- Backend modules for Experience and Projects:
  - Public list endpoints (published only, ordered).
  - Admin CRUD, reorder, status/featured toggles.
  - Slug auto-generation and uniqueness for projects.
- Frontend:
  - Admin Experience and Projects pages with create/edit/delete/status toggles.
  - Public sections now fetch from API with sample fallback.

### Verification

- `npm run typecheck` and `npm run build` (web + api): passed.
- Manual API test: create experience/project -> public endpoints return them; cleanup performed.

### Notes / Next

- Milestone 7 will implement Skills, Education, and Certifications.

## Milestone 7 — Skills, Education, and Certifications (completed)

### What was done

- Backend modules for Skills, Education, Certifications with CRUD and public endpoints.
- Frontend admin pages for each module.
- Public sections now fetch from API with sample fallback.

### Verification

- `npm run typecheck` and `npm run build` (web + api): passed.

### Notes / Next

- Milestone 8 will implement media management.

## Milestone 8 — Cloudinary Media Management (completed)

### What was done

- Backend:
  - `POST /api/v1/admin/media/upload` (protected, multipart, validated type/size) uploads to Cloudinary.
  - `DELETE /api/v1/admin/media/:publicId` (protected) removes asset.
  - Multer errors mapped in centralized error handler.
- Frontend:
  - Reusable `ImageUpload` component with preview, upload, remove.
  - Integrated into Profile (profile image) and Projects (cover image).

### Verification

- `npm run typecheck` and `npm run build` (web + api): passed.
- Upload endpoint returns 503 when Cloudinary env vars are missing (clear error).

### Notes / Next

- Superseded: media now lands on a mounted volume, not Cloudinary. See the
  Railway volume migration section at the end of this document.
- Milestone 9 will implement contact form and messages inbox.

## Milestone 9 — Contact and Optional Sections (completed)

### What was done

- Backend:
  - `POST /api/v1/public/contact` (rate limited) stores contact messages.
  - Admin messages inbox: list, mark read/unread, delete.
  - CRUD + public endpoints for Services and Testimonials.
- Frontend:
  - Contact form submits to API.
  - Admin Messages page.
  - Admin Services and Testimonials pages.
  - Public Services/Testimonials sections fetch from API.

### Verification

- `npm run typecheck` and `npm run build` (web + api): passed.

### Notes / Next

- Milestone 10 will implement Settings and SEO (social links, section visibility, metadata, sitemap).

## Milestone 10 — Settings and SEO (completed)

### What was done

- Backend:
  - Site settings endpoints (social links, section visibility, SEO metadata).
- Frontend:
  - Admin Settings page.
  - Public sections rendered based on visibility settings.
  - SEO meta tags via react-helmet-async.
  - Static robots.txt and sitemap.xml.

### Verification

- `npm run typecheck` and `npm run build` (web + api): passed.

### Notes / Next

- Milestone 11 will focus on QA, authorization review, responsive/accessibility checks, and deployment prep.

## Milestone 11 — Quality Assurance and Deployment Preparation (completed)

### What was done

- Final typecheck and builds for both apps: passed.
- Backend tests: 5 passed.
- Authorization review: all admin routes enforce `authenticate`; public endpoints return only published content.
- Responsive layouts and accessibility basics reviewed in code (semantic landmarks, focus states, reduced-motion).
- Environment templates updated (`.env.example`).
- Deployment target remains to be decided; production env vars documented.

### Verification

- `npm run typecheck` (api + web): passed.
- `npm run build` (api + web): passed.
- `npm test` (api): 5 passed.

### Remaining / Notes

- Choose hosting providers and deploy frontend, backend, and database.
- Expand automated tests for critical flows (auth, ownership, CRUD) in future iterations.

## Restructure — Public Portfolio Navigation & Sections (completed)

### What was done

- Public navigation restructured to: HOME, ABOUT, EXPERIENCE, LEADERSHIP, EXPERTISE, EDUCATION, INSIGHTS, CONTACT.
- Removed Projects, Certifications, Services, Testimonials from public navigation and section structure.
- Added Leadership and Insights sections.
- Renamed Skills to Expertise.
- Updated sample content and copy for Subodh Rayamajhee (Entrepreneur | Educator | Business Leader).
- Updated settings section visibility keys and footer/header branding.

### Verification

- `npm run typecheck` and `npm run build` (web): passed.

## Media on a Railway Volume, and Single-Service Deployment (2026-11-26)
### Container defect found by running the image, not building it

The first image built cleanly and then failed on boot: `prisma migrate deploy` died with
`Could not parse schema engine response`, preceded by `Prisma failed to detect the
libssl/openssl version to use ... Defaulting to "openssl-1.1.x"`. `node:22-alpine` carries
no `openssl` package, so Prisma's platform detection falls back to an engine that is not
in the image. `apk add --no-cache openssl` is now in all three Dockerfile stages — the two
that run `prisma generate` and the runtime stage that runs `prisma migrate deploy`.

Verified on the rebuilt image, against the compose Postgres with a named volume at `/data`:
boot applies migrations and listens; `/` and `/admin/projects` serve the SPA as
`text/html`; `/api/v1` still answers JSON and `/api/v1/nope` still 404s; login succeeds;
an upload returns `/uploads/<uuid>.png`, lands byte-identical in the volume, and is served
with `immutable, max-age=31536000` and `Cross-Origin-Resource-Policy: cross-origin`. The
container was then **destroyed and recreated** on the same volume and the image was still
served byte-identical — which is the behaviour the whole change exists to produce.


Replaces the Cloudinary storage from Milestone 8. Status: implemented and
verified locally against Postgres; not yet deployed to Railway.

### Why

Uploads now go to a disk volume mounted into the service, so media is owned by
the deployment rather than a third-party account, and no API credentials are
needed to accept an upload.

### Storage

- `apps/api/src/lib/storage.ts` is the single place that knows about the
  upload directory. `UPLOAD_DIR` (default `./uploads`, `/data/uploads` in the
  container) is resolved to an absolute path and created at boot.
- Stored filenames are `crypto.randomUUID()` plus an extension derived from the
  **whitelisted mimetype**, never from the client-supplied filename.
- `resolveStoredPath()` rejects any `publicId` that is not a bare filename, so
  the `DELETE /api/v1/admin/media/:publicId` route cannot be walked out of the
  upload directory. It returns `INVALID_FILE_ID` rather than silently
  reinterpreting the input.
- Uploads stream to disk via multer `diskStorage`; files are no longer buffered
  whole in memory. The 5 MB cap and type whitelist are unchanged.
- `apps/api/src/lib/cloudinary.ts` and the `cloudinary` dependency are removed,
  along with the three `CLOUDINARY_*` env vars.

### Serving

- `/uploads` is served by `express.static` with `immutable, max-age=1y`, which
  is safe because filenames are UUIDs. A missing file returns a JSON 404
  instead of falling through to the SPA.
- helmet's `crossOriginResourcePolicy` is set to `cross-origin`; its
  `same-origin` default blocks images embedded from another origin.
- In production the API also serves `apps/web/dist` with an index.html
  fallback for any non-`/api/` path, so the whole app is one service on one
  origin and production needs no CORS. `WEB_DIST_DIR` points at the bundle;
  when it is absent the API behaves exactly as before.

### Deletion now actually works

Previously `ImageUpload` discarded the `publicId` the upload returned, so the
`*PublicId` columns were never written and no asset was ever deleted. The id is
now threaded through `ImageUpload` → the four admin pages → the validation
schemas → the services → Prisma. Clearing an image clears its id too. On a
volume this matters: orphaned files consume real disk.

`mediaUrl()` in `apps/web/src/lib/api.ts` resolves a stored reference for
rendering. Absolute URLs pass through untouched, so any media still pointing at
Cloudinary keeps rendering; relative upload paths get the API origin.

### Schema repair (unrelated pre-existing break)

`main` did not compile. The `20261124064425_add_leadership_insights` migration
creates `Leadership` and `Insight` tables and both services query them, but
`schema.prisma` declared neither model, so the generated client had no
`insight` or `leadership` delegate. Both models were reconstructed from the
migration SQL; `prisma migrate diff` reports no drift against the migrated
database.

The Prisma CLI moved from devDependencies to dependencies, because the runtime
container runs `prisma migrate deploy` on start and would otherwise not have it.

### Deployment

- `Dockerfile` — multi-stage: install workspaces, generate the Prisma client,
  build web then api, then a slim runtime carrying production deps, the
  compiled API, the migrations and the built SPA.
- `railway.json` — Dockerfile builder, health check on `/api/v1/health`.
- Required Railway configuration: a volume mounted at `/data`,
  `UPLOAD_DIR=/data/uploads`, `DATABASE_URL`, `JWT_SECRET`, and
  `CORS_ORIGIN` set to the public domain.

### Verification performed

Against a real Postgres, with a real PNG, end to end:

- upload returns a relative `/uploads/<uuid>.png` and the file lands on the
  volume byte-identical to the source
- it is served over HTTP with the correct content type, immutable caching and
  `Cross-Origin-Resource-Policy: cross-origin`
- traversal attempts (`../.env`, `../../../etc/passwd`) are rejected with
  `INVALID_FILE_ID`; the local `.env` survived
- unauthenticated upload and delete are rejected
- a disallowed mimetype and a 6 MB file are rejected, leaving nothing on disk
- the relative path and its `publicId` persist through the profile endpoint,
  while an absolute Cloudinary URL still validates
- delete removes the file from the volume and is idempotent; the now-missing
  path serves a JSON 404
- the API serves the built SPA at `/`, falls back to index.html for
  `/admin/projects`, serves hashed assets, and still returns JSON for
  `/api/v1` and a 404 for `/api/v1/nope`
- `tsc --noEmit` clean for api and web; `vitest` 5/5 passing

## Deployed to Railway (2026-11-26)

Live at `https://portfolio-cms-production-46706fb9.up.railway.app`. Railway project
`portfolio-cms`, one app service plus a Postgres service, with a 45 GB volume mounted at
`/data` and `UPLOAD_DIR=/data/uploads`.

**The service builds from GitHub, not from a local upload.** `railway up` failed twice,
reproducibly, with `header key "exclude-patterns" contains value with non-printable ASCII
characters` while loading the build context — both `.dockerignore` and every `.gitignore`
in the tree are pure printable ASCII, and no filename in the repo carries a non-printable
byte, so this is in Railway's uploader rather than in this repository. The service is
connected to `edusagarmatha-svg/portfolio` on `main` instead, which also means a push now
deploys itself.

**Seeding is deliberately not part of boot.** `prisma/seed.ts` has
`update: { passwordHash }`, so running it on every start would silently reset the admin
password whenever it is changed. The admin user and the `Portfolio` row were created once
by a create-only bootstrap run inside the container. `ADMIN_EMAIL`, `ADMIN_PASSWORD` and
`ADMIN_NAME` live in the Railway service variables; the password is only there.

Verified against the live service: health, the SPA at `/` and on a client route, JSON still
served at `/api/v1` with a 404 on an unknown API path, a 404 on a missing upload, login,
an upload that lands on the volume and is served over HTTPS with `immutable,
max-age=31536000` and `Cross-Origin-Resource-Policy: cross-origin`, deletion, and a
traversing publicId refused with `INVALID_FILE_ID`. The uploaded file was then re-fetched
**after a full redeploy** and came back byte-identical.

**Outstanding.** Railway has deprecated `railway.json`; it stops working on 2026-12-01.
`.railway/railway.ts` has been generated with variables left unmanaged, so secrets stay in
the dashboard, but the cutover has not been run and the file is not committed. Also, the
Postgres password was printed into a session transcript while listing variables; the
database has no public domain and no TCP proxy, so it is reachable only on
`postgres.railway.internal`, but rotating it is still the clean course.
