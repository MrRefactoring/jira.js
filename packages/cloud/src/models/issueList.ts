import { z } from 'zod';

/** A list of issue IDs. */
export const IssueListSchema = z.object({
  /** The list of issue IDs. */
  issueIds: z.array(z.string()),
});

export type IssueList = z.infer<typeof IssueListSchema>;
