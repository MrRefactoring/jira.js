import { z } from 'zod';
import { WorkflowSchemeSchema } from '../models';

export const UpdateWorkflowSchemeSchema = z.object({
  /** The id of the scheme. */
  id: z.number(),
  body: WorkflowSchemeSchema,
});

export type UpdateWorkflowScheme = z.input<typeof UpdateWorkflowSchemeSchema>;
