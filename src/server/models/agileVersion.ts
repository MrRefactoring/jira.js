import { z } from 'zod';
import { apiObject } from '#/core';

export const AgileVersionSchema = apiObject({
  self: z.url().optional(),
  /** The id of the version, as a number rather than a string. */
  id: z.number(),
  projectId: z.number().optional(),
  name: z.string(),
  description: z.string().optional(),
  archived: z.boolean().optional(),
  released: z.boolean().optional(),
  releaseDate: z.string().optional(),
  overdue: z.boolean().optional(),
  userReleaseDate: z.string().optional(),
});

export type AgileVersion = z.infer<typeof AgileVersionSchema>;
