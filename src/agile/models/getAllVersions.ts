import { z } from 'zod';
import { apiObject } from '#/core';
import { VersionSchema } from './version';

export const GetAllVersionsSchema = apiObject({
  isLast: z.boolean().optional(),
  maxResults: z.number().optional(),
  startAt: z.number().optional(),
  total: z.number().optional(),
  values: z.array(VersionSchema).optional(),
});

export type GetAllVersions = z.infer<typeof GetAllVersionsSchema>;
