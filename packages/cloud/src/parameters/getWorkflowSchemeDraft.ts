import { z } from 'zod';

export const GetWorkflowSchemeDraftSchema = z.object({
  /** The ID of the active workflow scheme that the draft was created from. */
  id: z.number(),
});

export type GetWorkflowSchemeDraft = z.input<typeof GetWorkflowSchemeDraftSchema>;
