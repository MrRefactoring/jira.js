import { z } from 'zod';

export const UpdateWorkflowMappingParametersSchema = z.object({
  /** The ID of the workflow scheme. */
  id: z.number().int(),
  /** The name of the workflow. */
  workflowName: z.string(),
  /** Whether the workflow is the default workflow for the workflow scheme. */
  defaultMapping: z.boolean().optional(),
  /** The list of issue type IDs. */
  issueTypes: z.array(z.string()).optional(),
  /**
   * Whether a draft workflow scheme is created or updated when updating an active workflow scheme. The draft is updated
   * with the new workflow-issue types mapping. Defaults to `false`.
   */
  updateDraftIfNeeded: z.boolean().optional(),
  /** The name of the workflow. Optional if updating the workflow-issue types mapping. */
  workflow: z.string().optional(),
});

export type UpdateWorkflowMappingParameters = z.infer<typeof UpdateWorkflowMappingParametersSchema>;
