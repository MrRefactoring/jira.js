import { z } from 'zod';

export const DeleteWorkflowSchemeDraftParametersSchema = z.object({
  /** The ID of the active workflow scheme that the draft was created from. */
  id: z.number().int(),
});

export type DeleteWorkflowSchemeDraftParameters = z.infer<typeof DeleteWorkflowSchemeDraftParametersSchema>;
