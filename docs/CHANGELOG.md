### Approved

- Approved the Version 2 creative direction.
- Confirmed the stylized low-poly visual style.
- Confirmed the dark and cyan color direction.
- Confirmed the floating systems workspace hero concept.
- Confirmed that 3D will be concentrated primarily in the hero.
- Confirmed that the personal photograph will be used mainly in the
  About section.

  ### Added

- Created the Phase 3 3D asset plan.
- Defined downloaded and code-generated asset responsibilities.
- Defined desktop, mobile, reduced-motion, and static fallback asset
  requirements.
- Established asset licensing, style, format, and file-size rules.
- Defined the required hero-scene asset inventory.

### Completed

- Completed Phase 3 required asset selection.
- Validated the main hero models.
- Recorded asset sizes, licenses, creators, and sources.
- Selected the Studio Small 08 HDRI for initial scene testing.
- Confirmed that the floating platform and abstract technical elements
  will be generated through code.

### Phase 4 — 3D Foundation

- Added Three.js, React Three Fiber, and Drei.
- Created the Version 2 preview route.
- Successfully loaded the approved monitor GLB.
- Successfully loaded the Studio Small 08 HDRI.
- Confirmed orbit rotation and mouse-wheel zoom.
- Confirmed responsive canvas resizing.
- Recorded the non-blocking upstream `THREE.Clock` deprecation warning.

### Phase 4 — Workspace Composition

- Completed the initial 3D workspace composition.
- Positioned and normalized the desk, monitor, microphone, router, and
  server rack.
- Added a code-generated floating platform.
- Added a parent workspace transform for whole-scene positioning.
- Confirmed that all GLB assets and the HDRI load correctly.
- Confirmed the production build succeeds.

### Phase 4 — Material Styling

- Completed the hero-scene material audit.
- Applied a unified dark slate and cyan material system.
- Recolored the desk and monitor frame.
- Changed the microphone illuminated ring to cyan.
- Restyled the router casing, Wi-Fi symbol, and status lights.
- Converted the server door into dark transparent glass.
- Preserved the detailed server-rack textures.

### Phase 4 — Monitor Screen Interface

- Attached the dashboard directly to the monitor transform.
- Removed the visible separation between the physical monitor and screen.
- Increased the generated dashboard texture to 2048 × 1152.
- Enabled anisotropic texture filtering for sharper angled viewing.
- Attached the monitor glow to the same assembly.
- Completed Phase 4 Task 3C.

### Phase 4 — Camera and Interaction

- Added restrained pointer-responsive workspace movement.
- Added subtle automatic idle drift.
- Limited manual horizontal and vertical rotation.
- Added smooth damping to drag interaction.
- Disabled canvas mouse-wheel zoom to preserve normal page scrolling.
- Completed Phase 4 Task 4.

### Phase 4 — Mobile, Accessibility, and Performance

- Added responsive desktop and mobile 3D behavior.
- Disabled automatic motion on mobile.
- Added support for `prefers-reduced-motion`.
- Disabled drag interaction for reduced-motion users.
- Added viewport and page-visibility rendering control.
- Added adaptive device-pixel ratio and quality monitoring.
- Added high, balanced, and low rendering modes.
- Removed expensive effects from low-quality mode.
- Added WebGL capability detection.
- Added a static hero fallback and 3D error boundary.
- Completed Phase 4 Task 5.

### Phase 5 — Production Hero Content

- Replaced all Version 2 development-preview copy with production
  portfolio content.
- Added Jay Mark Apelado's professional identity and role.
- Added a concise software, AI, and infrastructure value proposition.
- Added project, résumé, and contact calls to action.
- Added professional focus-area indicators.
- Reframed the 3D scene as an interactive systems workspace.
- Completed Phase 5 Task 1.

### Phase 5 — Hero Visual Hierarchy

- Strengthened the hero name and professional-role hierarchy.
- Reduced competition between primary, résumé, and contact actions.
- Added a recruiter-readable professional proof strip.
- Improved spacing across the hero content and 3D scene.
- Added a refined frame and supporting context around the 3D workspace.
- Added subtle technical background structure.
- Improved the scene's relationship to the professional content.
- Completed Phase 5 Task 2.

### Phase 6 — Homepage Section Architecture

- Added a central registry for the rebuilt homepage sections.
- Preserved stable About, Skills, Projects, Experience, and Contact
  anchor IDs.
- Added a reusable semantic page-section component.
- Added a consistent section-heading system.
- Added reusable content panels and section dividers.
- Established shared spacing, width, and anchor-scroll behavior.
- Started Phase 6 homepage reconstruction.

### Phase 6 — Skills and Capabilities

- Added a recruiter-readable Skills and Capabilities section.
- Organized skills by development, systems and data, artificial
  intelligence, technical operations, and project delivery.
- Connected technologies to practical system-building outcomes.
- Added capability summaries for building, connecting, and supporting
  technical systems.
- Avoided arbitrary proficiency percentages and skill-rating bars.
- Added responsive skill cards and semantic technology lists.
- Preserved the existing `#skills` anchor.
- Completed Phase 6 Task 3.

## Phase 6 — Rebuild the Homepage Sections

- [x] Task 1 — Shared section architecture
- [x] Task 2 — About section
- [x] Task 3 — Skills and capabilities
- [x] Task 4 — Featured projects
- [ ] Task 5 — Experience and education
- [ ] Task 6 — Contact and footer
- [ ] Task 7 — Section integration and final audit

**Status: In progress**

### Phase 6 — Experience and Education

- Added a production Experience section using centralized professional
  experience data.
- Featured the Launchpad and Paysera internship, TalkReady leadership,
  and IEEE APWiMob research experience.
- Added links connecting experience entries to their related case studies.
- Added a separate Education section with stable `#education` navigation.
- Preserved and prominently displayed the National University
  Dasmariñas and University of Perpetual Help Molino Campus logos.
- Added responsive university-logo presentation with accessible
  initials fallbacks.
- Added degree, specialization, achievements, and academic foundations.
- Corrected the outdated college completion status.
- Preserved the existing `#experience` anchor.
- Completed Phase 6 Task 5.

### Phase 6 — Contact and Footer

- Added a production Contact section with the stable `#contact` anchor.
- Added direct email, résumé, GitHub, and LinkedIn actions.
- Added an accessible copy-email control with status feedback.
- Added availability, location, and preferred-contact details.
- Avoided adding a nonfunctional contact form.
- Added a responsive semantic footer outside the main landmark.
- Added compact homepage-section navigation and a back-to-top action.
- Added a dynamic copyright year.
- Added responsive, keyboard, and reduced-motion behavior.
- Completed Phase 6 Task 6.

### Phase 6 — Section Integration and Final Audit

- Connected hero and professional-context links to the rebuilt homepage
  sections.
- Removed temporary links that redirected to the legacy homepage.
- Verified the final Home, About, Skills, Projects, Experience,
  Education, Contact, and Footer order.
- Verified unique section IDs and heading hierarchy.
- Added motion-aware smooth anchor scrolling.
- Verified keyboard navigation and focus visibility.
- Verified responsive behavior across phone, tablet, laptop, and desktop
  layouts.
- Verified reduced-motion and static 3D fallback behavior.
- Verified project media, portrait, résumé, and university logo assets.
- Preserved the National University Dasmariñas and University of
  Perpetual Help logos.
- Verified production Vite build and preview.
- Audited the completed homepage with Lighthouse.
- Completed Phase 6 Task 7.

### Phase 7 — Internship Systems Case Study

- Rebuilt the dedicated Internship Systems case study.
- Reused the centralized CRM Pipeline, Virtual Office, Ticket Support,
  and Paysera Inventory system data.
- Added a production case-study hero and operational overview.
- Added an interactive accessible system selector.
- Added lazy video previews with poster and reduced-motion support.
- Added system-specific features and technology stacks.
- Added implementation principles and suite-wide technology coverage.
- Added a complete four-system gallery.
- Added a confidentiality note for internal operational systems.
- Added navigation to TalkReady and the homepage contact section.
- Preserved the `/projects/internship-systems` route.
- Completed Phase 7 Task 3.

### Phase 8 — Scroll-Motion Foundation

- Added a centralized configuration for the cinematic scroll system.
- Added a shared Motion configuration shell scoped to Preview V2.
- Added global scroll-progress indicators for desktop and mobile.
- Added reusable scroll-triggered section animation support.
- Added reusable section scroll-progress mapping.
- Added reusable staggered reveal components.
- Added scroll-direction detection.
- Added runtime handling for reduced motion, viewport size, pointer type,
  and page visibility.
- Preserved native browser scrolling and existing section anchors.
- Kept the legacy homepage and project case studies unaffected.
- Started Phase 8 cinematic scroll implementation.

### Phase 8 — Hero-to-About Transition

- Added a native sticky hero scroll scene to Preview V2.
- Added scroll-linked motion to the hero copy and 3D workspace container.
- Added subtle depth movement to the atmospheric hero background.
- Added workspace scale, position, opacity, and perspective transitions.
- Added cinematic gradient, glow, and line graphics between Hero and
  About.
- Added a scroll-triggered About section entrance.
- Preserved native scrolling, anchor navigation, and 3D interaction.
- Added lighter transform ranges for mobile and touch devices.
- Added a static reduced-motion fallback that removes the extended sticky
  scene.
- Kept the legacy homepage and project case studies unaffected.
- Completed Phase 8 Task 2.

### Phase 8 — Featured Projects Scroll Sequence

- Rebuilt the Preview V2 Featured Projects section as a cinematic
  scroll-linked sequence.
- Added a desktop sticky project scene driven by native vertical
  scrolling.
- Added horizontal movement between TalkReady and Internship Systems.
- Added scroll-linked project scale, opacity, content, and media depth.
- Added active-project status and a scroll-progress timeline.
- Added moving cyan and indigo ambient lighting.
- Added active-only muted video playback.
- Preserved project case-study, live-platform, and repository links.
- Added a normal vertical layout for mobile, touch devices, reduced
  motion, and limited project collections.
- Preserved native scrolling, direct anchors, and keyboard access.
- Completed Phase 8 Task 4.

### Phase 8 — Experience and Education Timeline Motion

- Rebuilt the Preview V2 Experience and Education area as one connected
  scroll-driven professional timeline.
- Preserved the centralized featured-experience configuration.
- Added alternating desktop experience-card entrances.
- Added a simplified single-column mobile timeline.
- Added scroll-linked timeline progress and active checkpoints.
- Added staggered experience-highlight reveals.
- Added subtle individual card and icon parallax.
- Added an animated bridge between Experience and Education.
- Added animated education cards and school-logo movement.
- Added safe logo fallbacks for the existing university assets.
- Preserved direct Experience, Education, and Contact anchors.
- Added simplified touch-device and reduced-motion behavior.
- Completed Phase 8 Task 5.

### Phase 8 — Contact, Footer, and Global Effects

- Rebuilt the Preview V2 Contact section around the Phase 8 motion
  foundation.
- Removed the legacy Reveal and StaggerContainer wrappers from Contact.
- Added converging scroll-linked Contact panels.
- Added staggered contact-card, professional-link, and highlight reveals.
- Added moving ambient lighting and an end-of-page transition line.
- Added scroll-linked Footer entrance, brand movement, navigation movement,
  divider progress, and ambient lighting.
- Added a desktop global section-progress navigator.
- Added active-section tracking for Home, About, Skills, Projects,
  Experience, Education, and Contact.
- Preserved centralized profile, email, resume, location, navigation, and
  social-link data.
- Preserved direct anchors, keyboard focus, native scrolling, and reduced
  motion behavior.
- Completed Phase 8 Task 6.