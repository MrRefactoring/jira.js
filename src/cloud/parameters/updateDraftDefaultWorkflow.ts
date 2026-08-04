import { z } from 'zod';
import { DefaultWorkflowSchema } from '../models';

export const UpdateDraftDefaultWorkflowSchema = z.object({}).extend(DefaultWorkflowSchema.shape).extend({
  /** The ID of the workflow scheme that the draft belongs to. */
  id: z.number(),
});

export type UpdateDraftDefaultWorkflow = z.input<typeof UpdateDraftDefaultWorkflowSchema>;
