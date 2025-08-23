import { z } from 'zod';

export const GetWorkflowSchemeDraftParametersSchema = z.object({
  /** The ID of the active workflow scheme that the draft was created from. */
  id: z.number().int(),
});

export type GetWorkflowSchemeDraftParameters = z.infer<typeof GetWorkflowSchemeDraftParametersSchema>;
