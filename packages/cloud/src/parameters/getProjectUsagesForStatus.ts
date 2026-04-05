import { z } from 'zod';

export const GetProjectUsagesForStatusSchema = z.object({
  /** The statusId to fetch project usages for */
  statusId: z.string(),
  /** The cursor for pagination */
  nextPageToken: z.string().optional(),
  /** The maximum number of results to return. Must be an integer between 1 and 200. */
  maxResults: z.number().optional(),
});

export type GetProjectUsagesForStatus = z.input<typeof GetProjectUsagesForStatusSchema>;
