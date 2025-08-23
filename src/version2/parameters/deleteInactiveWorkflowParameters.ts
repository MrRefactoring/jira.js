import { z } from 'zod';

export const DeleteInactiveWorkflowParametersSchema = z.object({
  /** The entity ID of the workflow. */
  entityId: z.string(),
});

export type DeleteInactiveWorkflowParameters = z.infer<typeof DeleteInactiveWorkflowParametersSchema>;
