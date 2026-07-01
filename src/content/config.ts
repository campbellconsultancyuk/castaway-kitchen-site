import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.date(),
    image: z.string(),
    imageAlt: z.string(),
    tag: z.enum(['Food', 'Festival News', 'Behind the Scenes', 'Ops & Updates']),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { blog };