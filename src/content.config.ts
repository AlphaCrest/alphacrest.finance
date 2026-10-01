import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const teamCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: './src/content/team' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      // Relative to the JSON file, e.g. "../../assets/team/saleem-jaffer.png" (optimised by astro:assets)
      image: image(),
      slug: z.string(),
      bio: z.array(z.string()).min(1),
    }),
});

export const collections = {
  team: teamCollection,
};
