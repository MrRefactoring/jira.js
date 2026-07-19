import { z } from 'zod';

export const GetChangeLogsSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().optional(),
});

export type GetChangeLogs = z.input<typeof GetChangeLogsSchema>;
