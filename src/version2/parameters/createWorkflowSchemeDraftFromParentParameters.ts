import { z } from 'zod';

export const CreateWorkflowSchemeDraftFromParentParametersSchema = z.object({
  /** The ID of the active workflow scheme that the draft is created from. */
  id: z.number().int(),
});

export type CreateWorkflowSchemeDraftFromParentParameters = z.infer<
  typeof CreateWorkflowSchemeDraftFromParentParametersSchema
>;
