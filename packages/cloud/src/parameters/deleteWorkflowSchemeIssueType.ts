import { z } from 'zod';

export const DeleteWorkflowSchemeIssueTypeSchema = z.object({
  /** The ID of the workflow scheme. */
  id: z.number(),
  /** The ID of the issue type. */
  issueType: z.string(),
  /**
   * Set to true to create or update the draft of a workflow scheme and update the mapping in the draft, when the
   * workflow scheme cannot be edited. Defaults to `false`.
   */
  updateDraftIfNeeded: z.boolean().optional(),
});

export type DeleteWorkflowSchemeIssueType = z.input<typeof DeleteWorkflowSchemeIssueTypeSchema>;
