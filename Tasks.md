# Development Roadmap & Implementation Tasks
## Dwi Ramdhona — Personal Portfolio

**Subject:** Dwi Ramdhona, S.Kom  
**Status Legend:**
- `[ ]` Todo
- `[-]` In Progress
- `[x]` Done

---

## PHASE 0 — FOUNDATION

- [x] Review project setup
- [x] Review project documentation
- [x] Verify Next.js
- [x] Verify React
- [x] Verify TypeScript
- [x] Verify Tailwind
- [x] Verify existing dependencies
- [ ] Verify React Bits requirements

---

## PHASE 1 — DESIGN FOUNDATION

- [x] Setup Space Grotesk
- [x] Setup Manrope
- [x] Create color tokens
- [x] Create typography system
- [ ] Create spacing system
- [ ] Create container system
- [ ] Create border/radius system
- [x] Create reusable Container component
- [x] Create reusable Button component
- [x] Create Button variants
- [ ] Create reusable Badge/Tag component
- [ ] Create reusable Card component
- [ ] Create reusable Section Heading component
- [ ] Create reusable Input component
- [ ] Create reusable Textarea component
- [ ] Create reusable Form Field component
- [ ] Create reusable Link/Icon Button
- [ ] Implement global Shape Grid
- [ ] Verify Shape Grid is rendered only once
- [ ] Verify reusable components against DESIGN_SYSTEM.md

---

## PHASE 2 — LAYOUT

- [x] Build Navbar
- [x] Build responsive navigation
- [ ] Build global page layout
- [ ] Build section structure
- [x] Build Footer
- [x] Reuse existing UI components
- [ ] Verify no duplicate UI patterns

---

## PHASE 3 — HERO

- [x] Build Hero
- [x] Build Hero typography
- [x] Build Hero CTA
- [x] Integrate Lanyard
- [x] Ensure Lanyard only exists in Hero
- [x] Optimize Lanyard loading
- [x] Test desktop
- [x] Test tablet
- [x] Test mobile
- [x] Verify performance

---

## PHASE 4 — CONTENT SECTIONS

- [x] Build About
- [x] Build Education (with MagicBento animation)
- [x] Build Interests (with MagicBento animation)
- [x] Build Tech Stack
- [x] Reuse existing components
- [x] Verify responsive layout

---

## PHASE 5 — PROJECTS

- [x] Define project data structure
- [x] Build Projects section
- [x] Build reusable Project Card
- [x] Add project metadata
- [x] Add technology badges/tags
- [x] Add links
- [x] Test responsive project layout
- [x] Portfolio initial display — 6 items
- [x] Load More — +6 items
- [x] Progressive data rendering
- [x] Hide button when all data displayed
- [x] Responsive testing
- [x] Visual QA

---

## PHASE 5.1 — PORTFOLIO DETAIL PAGES (`/portfolio/[slug]`)

- [x] Create reusable dynamic route `app/portfolio/[slug]/page.tsx`
- [x] Build ProjectHeader with back button, category pill, title, description, and CTA
- [x] Build ProjectShowcaseImage container with responsive banner
- [x] Build ProjectInfoCards (2x2 grid: Problem, Solution, Features list, Tech Stack)
- [x] Build TechBadge with SVG brand logos (Figma, HTML, CSS, Laravel, JS, WP, Astro, Next.js, etc.)
- [x] Build Screenshot Gallery with interactive Lightbox preview modal
- [x] Implement getProjectBySlug with smart fallbacks for all portfolio items
- [x] Maintain identical Navbar & Footer across detail pages
- [x] Update ProjectCard to link dynamically to `/portfolio/[slug]`
- [x] Verify responsive design (desktop, tablet, mobile) and visual fidelity matching screenshot


---

## PHASE 6 — CERTIFICATES

- [x] Certificates section
- [x] Certificate data
- [x] Initial limit — 6 items
- [x] Load More — +6 items
- [x] Progressive rendering
- [x] Hide button when all data displayed
- [x] Responsive testing
- [x] Visual QA

---

## PHASE 7 — CONTACT

- [x] Build Contact section
- [x] Build reusable Form Field
- [x] Build contact form
- [x] Add client-side validation where appropriate
- [x] Add server-side validation
- [x] Create Server Action
- [x] Integrate Resend
- [x] Configure environment variables
- [x] Configure Reply-To
- [x] Test email delivery
- [x] Test validation
- [x] Test error state
- [x] Test success state

---

## PHASE 8 — QUALITY

- [x] Run TypeScript check
- [x] Run ESLint
- [x] Run production build
- [x] Test mobile
- [x] Test tablet
- [x] Test desktop
- [x] Test accessibility
- [x] Test keyboard navigation
- [x] Test focus states
- [x] Test reduced motion
- [x] Test performance (Lighthouse Mobile: 94, Desktop: 100)
- [x] Review reusable component consistency
- [x] Review color consistency
- [x] Review typography consistency
- [x] Review spacing consistency

---

## PHASE 9 — DEPLOYMENT

- [ ] Initialize/verify GitHub repository
- [ ] Connect repository to Vercel
- [ ] Configure environment variables
- [ ] Deploy production
- [ ] Verify production build
- [ ] Verify Shape Grid
- [ ] Verify Lanyard
- [ ] Verify contact form
- [ ] Verify responsive behavior
- [ ] Verify metadata/SEO basics

---

## PHASE 10 — FINAL QA

- [ ] Visual consistency review
- [ ] Component consistency review
- [ ] Mobile QA
- [ ] Tablet QA
- [ ] Desktop QA
- [ ] Browser QA
- [ ] Contact form QA
- [ ] Performance QA
- [ ] Accessibility QA
- [ ] Remove unnecessary code
- [ ] Remove unnecessary dependencies if any
- [ ] Final production build
- [ ] Final deployment
