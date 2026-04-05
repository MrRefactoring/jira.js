import { z } from 'zod';

export const CreateWorkflowSchemeDraftFromParentSchema = z.object({
  /** The ID of the active workflow scheme that the draft is created from. */
  id: z.number(),
});

export type CreateWorkflowSchemeDraftFromParent = z.input<typeof CreateWorkflowSchemeDraftFromParentSchema>;
