import { z } from 'zod';

export const IssueCommentListRequestBeanSchema = z.object({
  /** The list of comment IDs. A maximum of 1000 IDs can be specified. */
  ids: z.array(z.number().int()),
});

export type IssueCommentListRequestBean = z.infer<typeof IssueCommentListRequestBeanSchema>;
