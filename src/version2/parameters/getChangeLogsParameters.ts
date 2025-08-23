import { z } from 'zod';

export const GetChangeLogsParametersSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().int().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().int().optional(),
});

export type GetChangeLogsParameters = z.infer<typeof GetChangeLogsParametersSchema>;
