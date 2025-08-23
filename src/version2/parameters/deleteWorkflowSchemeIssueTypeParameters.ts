import { z } from 'zod';

export const DeleteWorkflowSchemeIssueTypeParametersSchema = z.object({
  /** The ID of the workflow scheme. */
  id: z.number().int(),
  /** The ID of the issue type. */
  issueType: z.string(),
  /**
   * Set to true to create or update the draft of a workflow scheme and update the mapping in the draft, when the
   * workflow scheme cannot be edited. Defaults to `false`.
   */
  updateDraftIfNeeded: z.boolean().optional(),
});

export type DeleteWorkflowSchemeIssueTypeParameters = z.infer<typeof DeleteWorkflowSchemeIssueTypeParametersSchema>;
