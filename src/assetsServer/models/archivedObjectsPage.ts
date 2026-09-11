import { z } from 'zod';
import { apiObject } from '#/core';
import { ArchivedObjectSchema } from './archivedObject';
/** One page of archived objects. */

export const ArchivedObjectsPageSchema = apiObject({
  offset: z.number().optional(),
  limit: z.number().optional(),
  count: z.number().optional(),
  total: z.number().optional(),
  results: z.array(ArchivedObjectSchema).optional(),
});

export type ArchivedObjectsPage = z.infer<typeof ArchivedObjectsPageSchema>;
