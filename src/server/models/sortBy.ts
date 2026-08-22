import { z } from 'zod';
import { apiObject } from '#/core';

export const SortBySchema = apiObject({
  fieldId: z.string().optional(),
  fieldName: z.string().optional(),
  order: z.string().optional(),
  toggleJql: z.string().optional(),
});

export type SortBy = z.infer<typeof SortBySchema>;
