import { z } from 'zod';
import { WorkflowSchemeSchema } from '../models';

export const UpdateDraftSchema = z.object({
  /** The id of the parent scheme. */
  id: z.number(),
  body: WorkflowSchemeSchema,
});

export type UpdateDraft = z.input<typeof UpdateDraftSchema>;
