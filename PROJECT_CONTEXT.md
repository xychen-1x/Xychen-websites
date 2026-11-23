# XYCHEN — Project Context & Development Guidelines

Document status: Approved by Owner  
Project: XYCHEN  
Repository: https://github.com/xychen-1x/Xychen-websites  
Primary branch: \`main\`  
Production deployment: https://xychen-website.vercel.app  
Repository snapshot: November 23, 2026  
Last verified repository commit: \`458fc8337d2384e5cdb8ea668c6ce12f2908ea83\`  
Verification date: November 23, 2026

---

## 1. Project Overview

### 1.1 Identity

Project name: XYCHEN

XYCHEN is a personal creator website and community-oriented digital platform.

It combines three connected areas:

1. Gaming — Roblox gaming content, guides, tutorials, discoveries, tips, and game updates.
2. Community — A place for visitors to discover and connect with the XYCHEN community.
3. Creator — Information about Xychen, personal projects, creative work, and official social links.

The website must have a recognizable identity and a clear purpose.

It should not become a random collection of unrelated features.

### 1.2 Long-term direction

The platform should be flexible enough to grow alongside the creator's interests and future projects.

Potential future additions must be evaluated against the existing purpose, architecture, and maintenance requirements.

Do not introduce features simply because they are technically possible.

### 1.3 Project ownership

- The website owner is the primary decision-maker.
- The owner approves major design, architecture, and functionality changes.
- AI assistants provide recommendations, analysis, implementation, and review.
- AI assistants must not independently redefine the project's identity or scope.
- The owner retains final approval over implementation and merging.

---

## 2. Project Goals

The website should prioritize:

- Recognizable and consistent brand identity.
- Clear navigation and information architecture.
- Useful, accurate, and organized gaming content.
- A welcoming community experience.
- Responsive layouts across mobile, tablet, and desktop.
- Accessible interactions and readable content.
- Maintainable code and reusable components.
- Reliable performance and deployment.
- Accurate information with traceable sources when necessary.
- Consistent functionality across the entire website.

The result should feel like a real creator platform, not a generic template or an unfinished collection of cards.

---

## 3. Current Technology Stack

The following implementation details were verified from the repository's \`main\` branch at the specified snapshot commit.

| Area | Current implementation |
|---|---|
| Framework | Astro 7 |
| Declared Astro dependency | \`^7.4.12\` |
| Language | TypeScript |
| Styling | CSS |
| Content management | Astro Content Collections |
| Article format | Markdown |
| Rendering | Static Site Generation |
| Node.js requirement | \`>=22.12.0\` |
| Package manager | npm |
| Hosting | Vercel |
| Source control | Git and GitHub |
| CI | GitHub Actions |

The exact installed dependency versions must not be assumed from the package version range.

### 3.1 Architecture restrictions

The current project is a static Astro website.

Do not assume that it currently uses:

- Express.js
- SQLite
- A traditional backend API
- User authentication
- A database
- Server-side account management

These must be treated as future architectural possibilities, not existing functionality.

Any proposal to introduce a backend, database, authentication, or external service requires an explanation of:

1. Its purpose.
2. Why the existing architecture is insufficient.
3. Implementation complexity.
4. Hosting and operating costs.
5. Security implications.
6. Maintenance requirements.
7. Possible alternatives.

Large architectural changes require explicit owner approval.

### 3.2 Dependency management

- Use npm as the package manager.
- Do not introduce another package manager without approval.
- Keep the dependency manifest and lockfile synchronized.
- Recommend committing \`package-lock.json\` to support reproducible installations.
- Once a valid lockfile is committed, prefer \`npm ci\` in CI.
- Avoid unnecessary dependencies.
- Explain the purpose and maintenance implications of every proposed dependency.

---

## 4. Repository Structure

The following structure reflects the inspected repository snapshot. Individual files and directories may change as development progresses.

\`\`\`
Xychen-websites/
├── .github/
│   └── workflows/
│       └── ci.yml
├── public/
│   ├── assets/
│   │   ├── backgrounds/
│   │   ├── banners/
│   │   ├── brand/
│   │   └── illustrations/
│   └── favicon.svg
├── src/
│   ├── components/
│   ├── config/
│   ├── content/
│   │   └── articles/
│   ├── content.config.ts
│   ├── layouts/
│   ├── pages/
│   ├── scripts/
│   └── styles/
├── astro.config.mjs
├── package.json
├── README.md
└── tsconfig.json
\`\`\`

Other root files, including \`.nvmrc\` and \`.gitignore\`, are also part of the repository.

### 4.1 Directory responsibilities

| Directory | Responsibility |
|---|---|
| \`src/components/\` | Reusable UI components |
| \`src/config/\` | Centralized site, asset, and content configuration |
| \`src/content/\` | Markdown articles and content collections |
| \`src/layouts/\` | Shared page layouts |
| \`src/pages/\` | Website routes and page implementations |
| \`src/scripts/\` | Client-side interactions |
| \`src/styles/\` | Global styles, design tokens, and page-specific styles |
| \`public/assets/\` | Static images, illustrations, backgrounds, and other assets |
| \`.github/workflows/\` | Automated repository checks |

Before creating a new file or component:

1. Inspect the existing structure.
2. Search for existing functionality.
3. Reuse established patterns when appropriate.
4. Avoid unnecessary duplication.
5. Explain why a new file or component is needed.

Do not assume a file exists merely because it appears in an older document.

---

## 5. Current Website Sections

The following page implementations were identified in the inspected repository snapshot.

| Page | File |
|---|---|
| Homepage | \`src/pages/index.astro\` |
| About | \`src/pages/about.astro\` |
| Content library | \`src/pages/content.astro\` |
| Individual articles | \`src/pages/content/[slug].astro\` |
| Content categories | \`src/pages/content/category/[category].astro\` |
| Tips and discoveries | \`src/pages/content/tips-and-discoveries.astro\` |
| Gaming | \`src/pages/games.astro\` |
| Grow a Garden | \`src/pages/grow-a-garden.astro\` |
| Social links | \`src/pages/links.astro\` |

### 5.1 Homepage structure

The homepage introduces three main areas:

- Gaming
- Community
- Creator

It also provides access to published gaming content and additional information about XYCHEN.

### 5.2 Navigation principles

- Navigation labels should be clear and understandable.
- Links must lead to their intended destinations.
- Avoid unnecessary navigation items.
- Keep navigation consistent across pages.
- Internal links should use the appropriate website routes.
- External links should use safe link attributes when opening new tabs.
- Avoid broken, misleading, or placeholder navigation.

---

## 6. Content System

The website uses Astro Content Collections.

Collection configuration:

\`src/content.config.ts\`

Article directory:

\`src/content/articles/\`

Content configuration:

\`src/config/content.ts\`

### 6.1 Current article fields

The current schema defines:

- \`title\`
- \`description\`
- \`pubDate\`
- \`updatedDate\`
- \`category\`
- \`game\`
- \`tags\`
- \`publicationStatus\`
- \`verificationStatus\`
- \`sources\`
- \`featured\`

### 6.2 Categories

The current category identifiers are:

| Identifier | Display label |
|---|---|
| \`guides\` | Guides & tutorials |
| \`tips\` | Tips & useful details |
| \`discoveries\` | Discoveries |
| \`updates\` | Game updates |
| \`announcements\` | News & announcements |

Do not introduce duplicate category identifiers without evaluating the existing content configuration.

### 6.3 Publication statuses

- \`draft\`
- \`published\`

Rules:

- Draft articles must not appear in public article listings.
- Draft articles must not generate public individual article pages.
- Published articles may appear in the content library and other appropriate sections.
- Publication status must be respected by all relevant content queries.

The default publication status is \`draft\`.

### 6.4 Verification statuses

- \`verified\`
- \`unconfirmed\`
- \`editorial\`

Rules:

- Verified content requires at least one source.
- Unconfirmed content requires at least one source.
- Editorial content may have no sources under the current schema.
- Unconfirmed information must be visibly labeled.
- Sources must remain accessible to visitors when displayed.

### 6.5 Source structure

Each source currently contains:

- \`name\` — Source title or organization.
- \`url\` — Valid source URL.
- \`kind\` — \`official\`, \`publisher\`, or \`community\`.
- \`checkedAt\` — Date the source was checked.

Do not invent source references or verification dates.

A source being listed does not automatically mean every statement in an article has been independently verified.

### 6.6 Content accuracy rules

1. Never invent game mechanics, statistics, item details, update information, or dates.
2. Prefer official sources when available.
3. Include source references for factual claims that require verification.
4. Distinguish official announcements from community reports.
5. Do not present rumors or leaks as confirmed information.
6. Mark unconfirmed information clearly.
7. Include dates and sources for rumors or unconfirmed reports.
8. Update outdated articles when relevant information changes.
9. Do not publish incomplete or misleading information simply to fill empty sections.
10. Do not claim verification without supporting evidence.

### 6.7 Gaming content scope

Roblox is an important part of the website's content direction.

Grow a Garden is the initial primary game, but the platform should remain capable of covering other Roblox games.

Potential content includes:

- Guides and tutorials.
- Gameplay information.
- Tips and useful details.
- Game mechanics.
- Discoveries.
- Game updates.
- Events.
- Items and features.
- Clearly labeled rumors or unconfirmed reports.

Future gaming categories must remain organized and relevant to the platform.

---

## 7. Design System and UI/UX Principles

### 7.1 General design direction

The website should feel:

- Clean.
- Organized.
- Distinctive.
- Modern.
- Visually engaging.
- Consistent.
- Easy to navigate.
- Responsive.

Avoid generic layouts, unnecessary decoration, excessive borders, and repetitive card designs.

### 7.2 Design tokens

Current design tokens are defined in:

\`src/styles/tokens.css\`

They include:

- Typography variables.
- Woodland-inspired color palette.
- Light and dark theme values.
- Layout widths.
- Spacing-related values.
- Border radii.
- Shadows.
- Focus and interaction variables.

Reuse existing design tokens whenever possible.

Do not introduce arbitrary colors or inconsistent styling without a clear reason.

### 7.3 Visual requirements

The following requirements should guide future visual revisions:

- Preserve the visibility of the global website background.
- Avoid unnecessary colored borders that make transparent sections appear like separate solid panels.
- Use background artwork intentionally where it improves the design.
- Gaming cards should support relevant image backgrounds.
- The community section should support the intended Discord/Wumpus artwork as part of its visual background while keeping text readable.
- Maintain sufficient contrast between text and background images.
- Avoid decorative elements that interfere with content or navigation.
- Keep card styles consistent without making every section look identical.

Check the latest owner-approved visual direction before making significant revisions.

### 7.4 Responsive design

Every UI change must be evaluated at:

- Mobile.
- Tablet.
- Desktop.

Check for:

- Horizontal overflow.
- Overlapping content.
- Unreadable text.
- Incorrect image cropping.
- Broken navigation.
- Inconsistent spacing.
- Difficult touch targets.

Do not optimize only for desktop.

### 7.5 Accessibility

Follow practical accessibility standards:

- Semantic HTML.
- Proper heading hierarchy.
- Descriptive link text.
- Keyboard navigation.
- Visible focus indicators.
- Sufficient color contrast.
- Appropriate alternative text.
- Accessible buttons and interactive elements.
- Reduced-motion support where appropriate.

Do not use clickable non-interactive elements as substitutes for buttons or links.

---

## 8. Code Quality Standards

Implementation should prioritize:

1. Correctness.
2. Maintainability.
3. Readability.
4. Security.
5. Accessibility.
6. Performance.
7. Consistency.

### 8.1 General rules

- Follow existing Astro and TypeScript conventions.
- Prefer reusable components for repeated UI.
- Avoid unnecessary dependencies.
- Avoid duplicated CSS and JavaScript.
- Keep configuration centralized.
- Use meaningful names.
- Keep components focused on their responsibilities.
- Remove unused code only when removal is confirmed safe.
- Avoid unrelated refactoring during focused bug fixes.
- Do not introduce placeholder functionality that appears operational.
- Preserve existing working features unless a change is approved.

### 8.2 TypeScript

- Use explicit types where they improve clarity.
- Avoid unnecessary \`any\`.
- Handle optional values safely.
- Validate external or user-provided data.
- Follow the existing TypeScript configuration.

### 8.3 CSS

- Reuse existing design tokens.
- Avoid unnecessary specificity.
- Avoid broad selectors that unintentionally affect unrelated pages.
- Keep responsive rules organized.
- Check light and dark themes.
- Respect reduced-motion preferences.

### 8.4 JavaScript

- Handle missing DOM elements safely.
- Avoid unnecessary global state.
- Avoid blocking page rendering with unnecessary scripts.
- Validate data before using it.
- Handle browser storage failures gracefully.

---

## 9. Security Requirements

Security must be considered during implementation, not added only after development.

Requirements:

- Never expose API keys, tokens, passwords, or private credentials.
- Never commit \`.env\` files or secrets.
- Use environment variables for future secrets.
- Validate external data before rendering it.
- Avoid unsafe HTML injection.
- Use safe external-link attributes.
- Avoid unnecessary third-party scripts.
- Review dependencies before adding them.
- Keep dependencies updated when practical.
- Do not introduce authentication or account functionality without a proper security design.
- Avoid collecting unnecessary visitor information.
- Consider privacy implications before introducing analytics or tracking.

If a security concern is discovered, explain:

1. Severity.
2. Potential impact.
3. Affected files or functionality.
4. Recommended fix.
5. Whether immediate action is necessary.

Do not silently dismiss security findings.

---

## 10. Performance Requirements

Prioritize:

- Optimized images.
- Appropriate image formats.
- Correct image dimensions.
- Lazy loading where appropriate.
- Minimal unnecessary JavaScript.
- Efficient CSS.
- Reduced layout shifts.
- Fast navigation.
- Reasonable dependency sizes.

Do not sacrifice usability or accessibility for minor performance improvements.

Performance-related changes should be evaluated against the actual user experience.

---

## 11. Testing and Validation

The repository currently provides:

\`\`\`
npm install
npm run check
npm run build
npm run preview
\`\`\`

The CI workflow currently runs:

1. Dependency installation.
2. \`npm run check\`.
3. \`npm run build\`.

### 11.1 Required automated checks

Before merging a change:

1. Install dependencies.
2. Run \`npm run check\`.
3. Run \`npm run build\`.
4. Review GitHub Actions results.
5. Resolve relevant errors before merging.

Use reproducible dependency installation when the repository has a committed lockfile.

### 11.2 Manual testing

Automated checks are not enough.

Review affected pages and interactions on the Vercel Preview deployment.

Check:

- Page loading.
- Internal navigation.
- External links.
- Image loading.
- Responsive layout.
- Theme switching.
- Content visibility.
- Article routes.
- Category routes.
- Empty states.
- Browser console errors.
- Broken or missing assets.
- Keyboard interactions.

Test both the changed functionality and shared components that could be affected.

### 11.3 Testing evidence

Every implementation summary must distinguish:

| Status | Meaning |
|---|---|
| Implemented | Code changes have been made. |
| Automated checks passed | Relevant automated checks succeeded. |
| Manually tested | The actual functionality was tested in a browser. |
| Preview verified | The deployed preview was inspected. |
| Production verified | The production deployment was inspected. |

Never claim something is fully tested if it was only checked through a successful build.

### 11.4 Testing limitations

If an assistant cannot run the project locally or access the preview environment, it must explicitly state that limitation.

Do not fabricate test results.

---

## 12. GitHub and Pull Request Workflow

GitHub is the source of truth for project code.

### 12.1 Rules

- Do not make unrelated changes in a focused pull request.
- Use descriptive branch names.
- Keep commits understandable.
- Explain what changed and why.
- Include affected files in the implementation summary.
- Include test results.
- Identify known limitations.
- Do not merge without the owner's approval.

### 12.2 Suggested branch naming

\`\`\`
feature/short-description
fix/short-description
refactor/short-description
docs/short-description
\`\`\`

### 12.3 Pull request requirements

Every pull request should explain:

1. Objective.
2. Problem being solved.
3. Changes made.
4. Files affected.
5. Testing performed.
6. Potential side effects.
7. Remaining limitations.

### 12.4 Merge approval

The owner reviews the preview and decides whether to merge.

The current repository's \`main\` branch was observed without branch protection.

Therefore, the documented owner-approval policy must not be mistaken for an enforced GitHub restriction.

Enabling branch protection or repository rulesets is recommended for future consideration.

Possible protections include:

- Required CI checks.
- Pull request review requirements.
- Restrictions on direct pushes to \`main\`.

These settings require owner approval.

---

## 13. Three-AI Collaboration Workflow

The project uses three AI assistants:

- ChatGPT.
- DeepSeek Standard.
- Claude Standard.

They operate as a coordinated team with clearly separated responsibilities.

### 13.1 ChatGPT — Architect and Coordinator

Responsibilities:

- Understand project requirements.
- Maintain architectural consistency.
- Break down large tasks.
- Identify dependencies and risks.
- Prepare implementation plans.
- Review implementation results.
- Coordinate decisions between assistants.
- Help verify that changes match owner requirements.

ChatGPT must not assume a proposed implementation is correct without inspecting relevant code.

### 13.2 DeepSeek Standard — Primary Developer

Responsibilities:

- Analyze relevant files.
- Propose implementation details.
- Write and revise code.
- Fix identified bugs.
- Refactor when explicitly appropriate.
- Explain changed files.
- Provide testing instructions and results.

DeepSeek must not independently expand the approved task scope.

### 13.3 Claude Standard — Independent Code Reviewer

Responsibilities:

- Review proposed changes independently.
- Identify logic errors.
- Identify security and accessibility concerns.
- Review performance implications.
- Check maintainability.
- Identify missing edge cases.
- Verify whether requirements were actually satisfied.

Claude must distinguish confirmed defects from suggestions and personal preferences.

### 13.4 Collaboration sequence

\`\`\`
OWNER
  |
  v
CHATGPT
Requirements, planning, architecture
  |
  v
DEEPSEEK
Implementation
  |
  v
CLAUDE
Independent review
  |
  v
DEEPSEEK
Fixes and revisions
  |
  v
CHATGPT
Final consistency review
  |
  v
OWNER
Preview testing and approval
  |
  v
GITHUB MERGE
  |
  v
VERCEL DEPLOYMENT
\`\`\`

### 13.5 Collaboration rules

- All assistants must use the same repository and relevant branch context.
- Always identify the branch and commit being reviewed.
- Do not review outdated code when a newer commit exists.
- Only one assistant should be the designated implementer for a task.
- Other assistants should review or advise rather than independently modifying the same work.
- Share relevant code, diffs, and error messages between assistants.
- Resolve conflicting recommendations before implementation.
- The owner has final approval.
- The Standard chat versions of DeepSeek and Claude should be treated as manual collaboration tools unless their actual integrations provide verified repository access.

### 13.6 Disagreement resolution

When assistants disagree:

- Identify the exact disagreement.
- Separate confirmed technical facts from assumptions.
- Present supporting code or documentation.
- Explain trade-offs and possible consequences.
- Recommend the safest maintainable option.
- Request owner input when the decision changes project direction or scope.
- Do not treat the majority opinion of AI assistants as a substitute for owner approval.

---

## 14. Change Management

Before starting a significant task, establish:

- What problem needs to be solved?
- Why does it matter?
- Which pages or components are affected?
- What files are likely to change?
- Are shared components involved?
- Could the change affect existing functionality?
- How will it be tested?
- Is the change worth its maintenance cost?

### 14.1 Change categories

**Small change**

- Text corrections.
- Minor styling adjustments.
- Small isolated bug fixes.

**Medium change**

- Component updates.
- Page layout revisions.
- New content categories.
- Interaction improvements.

**Large change**

- Architecture changes.
- New platform systems.
- Backend integration.
- Authentication.
- Major redesigns.
- New external services.

Large changes require an explicit proposal and owner approval before implementation.

### 14.2 Scope control

- Do not add unrelated features during bug fixes.
- Do not silently replace existing architecture.
- Do not introduce dependencies without explaining their purpose.
- Do not remove working functionality without approval.
- Separate unrelated improvements into separate proposals or pull requests.

---

## 15. Definition of Done

A task is not complete simply because code has been written.

A task may be considered complete when applicable requirements are satisfied:

- The original problem has been addressed.
- Implementation follows the approved scope.
- Existing functionality has been preserved.
- Relevant automated checks pass.
- Relevant browser testing has been performed.
- Responsive behavior has been checked.
- Accessibility and security implications have been considered.
- Documentation has been updated when necessary.
- The pull request includes implementation and testing details.
- The owner has approved merging.

If a requirement cannot be tested, identify it as an outstanding limitation.

---

## 16. Current Known Limitations and Verification Notes

These observations come from inspecting the repository snapshot at commit:

\`458fc8337d2384e5cdb8ea668c6ce12f2908ea83\`

They must be rechecked when relevant.

- The current website uses static Astro output.
- The project does not declare an Express or SQLite backend.
- The article system supports publication and verification statuses.
- The current CI workflow runs Astro checks and a production build.
- The asset registry references \`/assetsxychen-character.webp\`, but the corresponding repository file was deleted in the inspected commit.
- The root repository listing does not contain \`package-lock.json\` at the inspected commit.
- The \`main\` branch was observed without branch protection.
- A successful production build does not establish that every visual element and interaction works correctly.
- Repository contents may change after this document is reviewed.

These are verification notes, not permanent bug classifications.

Update them when new evidence becomes available.

---

## 17. Documentation and Source-of-Truth Rules

The repository's actual implementation is the source of truth for current technical behavior.

This document defines project direction, standards, and approved constraints.

When documentation and implementation disagree:

- Identify the discrepancy.
- Inspect the latest relevant code.
- Determine whether the code or documentation is outdated.
- Explain the difference.
- Propose the appropriate correction.

Do not silently assume that documentation is always current.

Important documentation should be updated when architecture, functionality, or development workflows change.

---

## 18. Instructions for All AI Assistants

Before making recommendations or writing code:

1. Read this document.
2. Inspect the latest relevant repository files.
3. Confirm the current branch and commit.
4. Understand the existing implementation.
5. Identify the actual requirement.
6. Explain important assumptions.
7. Avoid inventing APIs, files, routes, or functionality.
8. Preserve existing working features unless a change is approved.
9. Avoid unnecessary dependencies and architecture changes.
10. Provide clear testing instructions.

When uncertain, ask for clarification instead of guessing.

When proposing a change, explain:

- Purpose.
- Affected functionality.
- Expected impact.
- Technical trade-offs.
- Risks.
- Maintenance implications.
- Testing strategy.

Do not claim that a feature works unless there is evidence from implementation and testing.

---

## 19. Final Project Principle

Build XYCHEN as a purposeful, reliable, and maintainable creator platform.

- Every feature should have a reason to exist.
- Every design decision should improve the experience.
- Every piece of published information should be handled responsibly.
- Every implementation should respect the existing architecture unless an approved change requires something different.
- Every AI assistant must respect the owner's decisions.

The owner remains the final authority on XYCHEN's identity, direction, implementation approval, and future development.
