import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const SortFieldSchema = apiObject({
  field: z.string().optional(),
  order: openEnum(['asc', 'desc']).optional(),
});

export type SortField = z.infer<typeof SortFieldSchema>;
