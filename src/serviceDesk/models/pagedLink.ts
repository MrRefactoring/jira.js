import { z } from 'zod';
import { apiObject } from '#/core';

export const PagedLinkSchema = apiObject({
  /** Base URL for the REST API calls. */
  base: z.url().optional(),
  context: z.string().optional(),
  /** REST API URL for the next page, if there is one. */
  next: z.url().optional(),
  /** REST API URL for the previous page, if there is one. */
  prev: z.url().optional(),
  /** REST API URL for the current page. */
  self: z.url().optional(),
});

export type PagedLink = z.infer<typeof PagedLinkSchema>;
