import { z } from 'zod';
import { DefaultWorkflowSchema } from '../models';

export const UpdateDefaultWorkflowSchema = z.object({}).extend(DefaultWorkflowSchema.shape).extend({
  /** The ID of the workflow scheme. */
  id: z.number(),
});

export type UpdateDefaultWorkflow = z.input<typeof UpdateDefaultWorkflowSchema>;
