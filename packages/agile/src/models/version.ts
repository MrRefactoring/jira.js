import { z } from 'zod';

export const VersionSchema = z.object({
  archived: z.boolean().optional(),
  description: z.string().optional(),
  id: z.number().optional(),
  name: z.string().optional(),
  projectId: z.number().optional(),
  releaseDate: z.string().optional(),
  released: z.boolean().optional(),
  self: z.url().optional(),
});

export type Version = z.infer<typeof VersionSchema>;
