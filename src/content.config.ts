import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const teamCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: "./src/content/team" }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    image: z.string(),
    slug: z.string(),
    bio: z.array(z.string()),
  }),
});

export const collections = {
  team: teamCollection,
};
