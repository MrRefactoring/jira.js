import { z } from 'zod';
import { apiObject } from '#/core';

export const StreamPageSchema = apiObject({
  isLast: z.boolean().optional(),
  maxResults: z.number().optional(),
  nextCursor: z.string().optional(),
  nextPage: z.url().optional(),
  self: z.url().optional(),
  values: z.array(z.record(z.string(), z.any())).optional(),
});

export type StreamPage = z.infer<typeof StreamPageSchema>;
