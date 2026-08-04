import { z } from 'zod';
import { DefaultWorkflowSchema } from '../models';

export const UpdateDraftDefaultWorkflowSchema = z
  .object({
    /** The ID of the workflow scheme that the draft belongs to. */
    id: z.number(),
  })
  .extend(DefaultWorkflowSchema.shape);

export type UpdateDraftDefaultWorkflow = z.input<typeof UpdateDraftDefaultWorkflowSchema>;
