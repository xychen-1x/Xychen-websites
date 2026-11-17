# Xychen

The official Xychen website: a creator-led home for game coverage, practical guides, discoveries, and updates.

## Stack

- [Astro](https://astro.build/) for static-first page rendering
- TypeScript for project configuration and browser scripts
- Plain CSS for the responsive design system
- GitHub Actions for pull-request validation
- Vercel for hosting

## Requirements

- Node.js 22.12 or newer
- npm

## Local development

```bash
npm install
npm run dev
```

## Validation

```bash
npm run check
npm run build
npm run preview
```

## Project structure

```text
src/
  components/   Shared interface components
  config/       Site-wide configuration
  layouts/      Shared page layouts and metadata
  pages/        File-based routes
  content/      Markdown articles and source metadata
  components/   Shared interface components
  config/       Site-wide configuration and content categories
  layouts/      Shared page layouts and metadata
  pages/        File-based routes
  scripts/      Small browser-side interactions
  styles/       Global design system
public/         Static public assets
.github/       Pull-request automation
```

## Content integrity

- External information should identify its source.
- Time-sensitive information should include relevant dates.
- Rumors, leaks, and unverified claims must be labeled as unconfirmed.
- Placeholder sections must not be presented as published or verified content.

## Writing and publishing articles

- Add Markdown articles under `src/content/articles/`.
- Every article must provide a title, description, publication date, and category.
- Set `publicationStatus` to `published` only when the article is ready for the public site; drafts are excluded from generated pages.
- Use `verificationStatus: editorial` for original commentary that does not present external claims as verified facts.
- Use `verificationStatus: verified` for sourced information and include one or more sources with a name, URL, source type, and date checked.
- Use `verificationStatus: unconfirmed` for rumors or unverified claims. These entries require source metadata and are visibly labelled as unconfirmed on the article page and cards.
- Published articles automatically appear in the content library, category pages, and their own static article page.

## Deployment

The project uses static output and is deployed on Vercel. Pull requests run the Astro type-check and production build before changes can be merged.

## Contribution workflow

Create a feature branch and open a pull request against `main`. Changes should pass the CI check and production build before merging.
