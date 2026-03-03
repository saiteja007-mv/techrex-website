import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

const videos = defineCollection({
  loader: file('src/data/videos.json', {
    parser: (text) => JSON.parse(text).videos,
  }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    thumbnail: z.string(),
    category: z.enum(['Local AI', 'AI Tools', 'AI Assistants', 'Hardware', 'About']),
    publishedAt: z.coerce.date(),
    description: z.string(),
  }),
});

export const collections = { videos };
