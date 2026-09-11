import { z } from 'zod';
import { apiObject } from '#/core';

export const PagedLinkSchema = apiObject({
  base: z.url().optional(),
  context: z.string().optional(),
  next: z.url().optional(),
  prev: z.url().optional(),
  self: z.url().optional(),
});

export type PagedLink = z.infer<typeof PagedLinkSchema>;
