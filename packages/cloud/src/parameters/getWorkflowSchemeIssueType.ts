import { z } from 'zod';

export const GetWorkflowSchemeIssueTypeSchema = z.object({
  /** The ID of the workflow scheme. */
  id: z.number(),
  /** The ID of the issue type. */
  issueType: z.string(),
  /**
   * Returns the mapping from the workflow scheme's draft rather than the workflow scheme, if set to true. If no draft
   * exists, the mapping from the workflow scheme is returned.
   */
  returnDraftIfExists: z.boolean().optional(),
});

export type GetWorkflowSchemeIssueType = z.input<typeof GetWorkflowSchemeIssueTypeSchema>;
