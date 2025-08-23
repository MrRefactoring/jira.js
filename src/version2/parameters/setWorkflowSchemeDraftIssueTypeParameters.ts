import { z } from 'zod';

export const SetWorkflowSchemeDraftIssueTypeParametersSchema = z.object({
  /** The ID of the workflow scheme that the draft belongs to. */
  id: z.number().int(),
  /** The ID of the issue type. */
  issueType: z.string(),
  /** The ID of the issue type. Not required if updating the issue type-workflow mapping. */
  issueType: z.string().optional(),
  /**
   * Set to true to create or update the draft of a workflow scheme and update the mapping in the draft, when the
   * workflow scheme cannot be edited. Defaults to `false`. Only applicable when updating the workflow-issue types
   * mapping.
   */
  updateDraftIfNeeded: z.boolean().optional(),
  /** The name of the workflow. */
  workflow: z.string().optional(),
});

export type SetWorkflowSchemeDraftIssueTypeParameters = z.infer<typeof SetWorkflowSchemeDraftIssueTypeParametersSchema>;
