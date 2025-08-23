import { z } from 'zod';

export const DeleteDraftWorkflowMappingParametersSchema = z.object({
  /** The ID of the workflow scheme that the draft belongs to. */
  id: z.number().int(),
  /** The name of the workflow. */
  workflowName: z.string(),
});

export type DeleteDraftWorkflowMappingParameters = z.infer<typeof DeleteDraftWorkflowMappingParametersSchema>;
