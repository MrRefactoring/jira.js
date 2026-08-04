import { z } from 'zod';
import { apiObject } from '#/core';
/** A list of issue IDs. */

export const IssueListSchema = apiObject({
  /** The list of issue IDs. */
  issueIds: z.array(z.string()),
});

export type IssueList = z.infer<typeof IssueListSchema>;
