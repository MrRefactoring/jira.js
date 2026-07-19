import { z } from 'zod';
import { apiObject } from '#/core';

export const VersionSchema = apiObject({
  archived: z.boolean().optional(),
  description: z.string().optional(),
  id: z.number().optional(),
  name: z.string().optional(),
  projectId: z.number().optional(),
  releaseDate: z.string().optional(),
  released: z.boolean().optional(),
  self: z.string().url().optional(),
});

export type Version = z.infer<typeof VersionSchema>;
