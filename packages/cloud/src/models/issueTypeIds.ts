import { z } from 'zod';

/** The list of issue type IDs. */
export const IssueTypeIdsSchema = z.object({
  /** The list of issue type IDs. */
  issueTypeIds: z.array(z.string()),
});

export type IssueTypeIds = z.infer<typeof IssueTypeIdsSchema>;
