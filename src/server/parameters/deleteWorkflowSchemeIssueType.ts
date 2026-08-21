import { z } from 'zod';

export const DeleteWorkflowSchemeIssueTypeSchema = z.object({
  /** The issue type to remove. */
  issueType: z.string(),
  /**
   * When true will create and return a draft when the workflow scheme cannot be edited (e.g. when it is being used by a
   * project).
   */
  updateDraftIfNeeded: z.boolean().optional(),
  /** The id of the scheme. */
  id: z.number(),
});

export type DeleteWorkflowSchemeIssueType = z.input<typeof DeleteWorkflowSchemeIssueTypeSchema>;
