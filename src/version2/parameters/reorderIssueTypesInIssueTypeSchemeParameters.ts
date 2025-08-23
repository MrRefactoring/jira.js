import { z } from 'zod';

export const ReorderIssueTypesInIssueTypeSchemeParametersSchema = z.object({
  /** The ID of the issue type scheme. */
  issueTypeSchemeId: z.number().int(),
  /** The ID of the issue type to place the moved issue types after. Required if `position` isn't provided. */
  after: z.string().optional(),
  /**
   * A list of the issue type IDs to move. The order of the issue type IDs in the list is the order they are given after
   * the move.
   */
  issueTypeIds: z.array(z.string()),
  /** The position the issue types should be moved to. Required if `after` isn't provided. */
  position: z.enum(['First', 'Last']).optional(),
});

export type ReorderIssueTypesInIssueTypeSchemeParameters = z.infer<
  typeof ReorderIssueTypesInIssueTypeSchemeParametersSchema
>;
