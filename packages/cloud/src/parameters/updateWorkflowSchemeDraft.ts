import { z } from 'zod';
import { WorkflowSchemeSchema } from '../models';

export const UpdateWorkflowSchemeDraftSchema = z
  .object({
    /** The ID of the active workflow scheme that the draft was created from. */
    id: z.number(),
  })
  .extend(WorkflowSchemeSchema.shape);

export type UpdateWorkflowSchemeDraft = z.input<typeof UpdateWorkflowSchemeDraftSchema>;
