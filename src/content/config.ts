import { defineCollection, z } from 'astro:content';

const atoms = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    name: z.string(),
    subtitle: z.string().optional(),
    category: z.enum(['identity', 'routing', 'spam', 'obfuscation']),
    maturity: z.enum(['research', 'development', 'implementation', 'standardized', 'deployed']),
  }),
});

const properties = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    name: z.string(),
  }),
});

const composites = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    name: z.string(),
    maturity: z.enum(['research', 'development', 'implementation', 'deployed']),
    atoms: z.array(z.string()),
    also_requires: z.array(z.string()).optional(),
  }),
});

export const collections = { atoms, properties, composites };
