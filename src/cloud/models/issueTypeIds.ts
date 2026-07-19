import { z } from 'zod';
import { apiObject } from '#/core';
/** The list of issue type IDs. */

export const IssueTypeIdsSchema = apiObject({
  /** The list of issue type IDs. */
  issueTypeIds: z.array(z.string()),
});

export type IssueTypeIds = z.infer<typeof IssueTypeIdsSchema>;
