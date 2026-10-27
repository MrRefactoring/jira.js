import { z } from 'zod';

export const GetAllLabelsSchema = z.object({
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().optional(),
  /** Case-insensitive prefix used to filter labels before pagination. */
  query: z.string().optional(),
  /**
   * RECENT_PROJECTS or ALL_BROWSEABLE_PROJECTS. Omitted scope retains the unbounded search. Blank or unrecognised
   * values use ALL_BROWSEABLE_PROJECTS.
   */
  scope: z.string().optional(),
});

export type GetAllLabels = z.input<typeof GetAllLabelsSchema>;
