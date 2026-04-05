import { z } from 'zod';

export const IssueCommentListRequestSchema = z.object({
  /** The list of comment IDs. A maximum of 1000 IDs can be specified. */
  ids: z.array(z.number()),
});

export type IssueCommentListRequest = z.infer<typeof IssueCommentListRequestSchema>;
