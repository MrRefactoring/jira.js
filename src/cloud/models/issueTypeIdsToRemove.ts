import { z } from 'zod';
import { apiObject } from '#/core';
/** The list of issue type IDs to be removed from the field configuration scheme. */

export const IssueTypeIdsToRemoveSchema = apiObject({
  /**
   * The list of issue type IDs. Must contain unique values not longer than 255 characters and not be empty. Maximum
   * of 100 IDs.
   */
  issueTypeIds: z.array(z.string()),
});

export type IssueTypeIdsToRemove = z.infer<typeof IssueTypeIdsToRemoveSchema>;
