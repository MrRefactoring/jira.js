import { z } from 'zod';

export const DeleteWorkflowSchemeDraftSchema = z.object({
  /** The ID of the active workflow scheme that the draft was created from. */
  id: z.number(),
});

export type DeleteWorkflowSchemeDraft = z.input<typeof DeleteWorkflowSchemeDraftSchema>;
