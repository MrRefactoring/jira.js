import { z } from 'zod';
import { WorkflowValidationErrorSchema } from '#/models/workflowValidationError';

export const WorkflowValidationErrorListSchema = z.object({
  /** The list of validation errors. */
  errors: z.array(WorkflowValidationErrorSchema).optional(),
});

export type WorkflowValidationErrorList = z.infer<typeof WorkflowValidationErrorListSchema>;
