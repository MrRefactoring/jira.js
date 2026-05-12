import { z } from 'zod';
import { SecuritySchemeWithProjectsSchema } from '#/models/securitySchemeWithProjects';

/** A page of items. */
export const PageSecuritySchemeWithProjectsSchema = z.object({
  /** Whether this is the last page. */
  isLast: z.boolean().optional(),
  /** The maximum number of items that could be returned. */
  maxResults: z.number().optional(),
  /** If there is another page of results, the URL of the next page. */
  nextPage: z.url().optional(),
  /** The URL of the page. */
  self: z.url().optional(),
  /** The index of the first item returned. */
  startAt: z.number().optional(),
  /** The number of items returned. */
  total: z.number().optional(),
  /** The list of items. */
  values: z.array(SecuritySchemeWithProjectsSchema).optional(),
});

export type PageSecuritySchemeWithProjects = z.infer<typeof PageSecuritySchemeWithProjectsSchema>;
