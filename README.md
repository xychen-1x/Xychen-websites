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

## Deployment

The project is configured for static output and can be imported into Vercel. Confirm the Vercel project settings and production domain before enabling production deployment.

## Contribution workflow

Create a feature branch and open a pull request against `main`. Changes should pass the CI check and production build before merging.
