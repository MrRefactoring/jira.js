import { z } from 'zod';

export const GetApproximateIssueCountForBacklogSchema = z.object({
  /** The ID of the board that has the backlog containing the requested issues. */
  boardId: z.number(),
  /**
   * Filters results using a JQL query. Note that `username` and `userkey` can't be used as search terms for this
   * parameter due to privacy reasons. Use `accountId` instead.
   */
  jql: z.string().optional(),
});

export type GetApproximateIssueCountForBacklog = z.input<typeof GetApproximateIssueCountForBacklogSchema>;
