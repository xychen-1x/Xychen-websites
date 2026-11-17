export const contentCategories = [
  {
    slug: "guides",
    label: "Guides & tutorials",
    description:
      "Step-by-step help for game features, mechanics, and common tasks.",
  },
  {
    slug: "tips",
    label: "Tips & useful details",
    description:
      "Practical information and concise explanations that are easy to scan.",
  },
  {
    slug: "discoveries",
    label: "Discoveries",
    description:
      "Interesting mechanics, findings, and details worth documenting.",
  },
  {
    slug: "updates",
    label: "Game updates",
    description:
      "Dated coverage of changes, with source references and verification notes.",
  },
  {
    slug: "announcements",
    label: "News & announcements",
    description:
      "Important developments, with official information distinguished from community reporting.",
  },
] as const;

export type ContentCategorySlug = (typeof contentCategories)[number]["slug"];

export function getContentCategoryLabel(slug: string): string {
  return (
    contentCategories.find((category) => category.slug === slug)?.label ??
    "Content"
  );
}
