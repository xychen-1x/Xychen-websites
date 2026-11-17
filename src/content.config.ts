import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const sourceSchema = z.object({
  name: z.string().min(1),
  url: z.string().url(),
  kind: z.enum(["official", "publisher", "community"]),
  checkedAt: z.coerce.date(),
});

const articles = defineCollection({
  loader: glob({
    base: "./src/content/articles",
    pattern: "**/*.md",
  }),
  schema: z
    .object({
      title: z.string().min(1),
      description: z.string().min(1).max(180),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      category: z.enum([
        "guides",
        "tips",
        "discoveries",
        "updates",
        "announcements",
      ]),
      game: z.string().min(1).optional(),
      tags: z.array(z.string().min(1)).default([]),
      publicationStatus: z.enum(["draft", "published"]).default("draft"),
      verificationStatus: z
        .enum(["verified", "unconfirmed", "editorial"])
        .default("editorial"),
      sources: z.array(sourceSchema).default([]),
      featured: z.boolean().default(false),
    })
    .superRefine((article, context) => {
      if (
        article.verificationStatus !== "editorial" &&
        article.sources.length === 0
      ) {
        context.addIssue({
          code: "custom",
          path: ["sources"],
          message:
            "Verified and unconfirmed articles must include at least one source.",
        });
      }
    }),
});

export const collections = { articles };
