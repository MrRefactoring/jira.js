import { z } from 'zod';
import { GetProjectsWithFieldSchemesResponseSchema } from '#/models/getProjectsWithFieldSchemesResponse';

/** A page of items. */
export const Page2GetProjectsWithFieldSchemesResponseSchema = z.object({
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
  values: z.array(GetProjectsWithFieldSchemesResponseSchema).optional(),
});

export type Page2GetProjectsWithFieldSchemesResponse = z.infer<typeof Page2GetProjectsWithFieldSchemesResponseSchema>;
