import { z } from 'zod';
import { apiObject } from '#/core';
import { VersionSchema } from './version';

export const PageOfVersionsSchema = apiObject({
  isLast: z.boolean().optional(),
  maxResults: z.number().optional(),
  nextPage: z.url().optional(),
  self: z.url().optional(),
  startAt: z.number().optional(),
  total: z.number().optional(),
  values: z.array(VersionSchema).optional(),
});

export type PageOfVersions = z.infer<typeof PageOfVersionsSchema>;
