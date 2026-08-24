import { z } from 'zod';
import { apiObject } from '#/core';

export const VersionSchema = apiObject({
  archived: z.boolean().optional(),
  description: z.string().optional(),
  expand: z.string().optional(),
  id: z.string().optional(),
  moveUnfixedIssuesTo: z.url().optional(),
  name: z.string().optional(),
  overdue: z.boolean().optional(),
  project: z.string().optional(),
  projectId: z.number().optional(),
  releaseDate: z.coerce.date().optional(),
  releaseDateSet: z.boolean().optional(),
  released: z.boolean().optional(),
  self: z.url().optional(),
  startDate: z.coerce.date().optional(),
  startDateSet: z.boolean().optional(),
  userReleaseDate: z.string().optional(),
  userStartDate: z.string().optional(),
});

export type Version = z.infer<typeof VersionSchema>;
