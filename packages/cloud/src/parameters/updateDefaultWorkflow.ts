import { z } from 'zod';
import { DefaultWorkflowSchema } from '../models';

export const UpdateDefaultWorkflowSchema = z
  .object({
    /** The ID of the workflow scheme. */
    id: z.number(),
  })
  .extend(DefaultWorkflowSchema.shape);

export type UpdateDefaultWorkflow = z.input<typeof UpdateDefaultWorkflowSchema>;
