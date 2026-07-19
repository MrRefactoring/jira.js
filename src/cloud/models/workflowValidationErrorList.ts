import { z } from 'zod';
import { apiObject } from '#/core';
import { WorkflowValidationErrorSchema } from './workflowValidationError';

export const WorkflowValidationErrorListSchema = apiObject({
  /** The list of validation errors. */
  errors: z.array(WorkflowValidationErrorSchema).optional(),
});

export type WorkflowValidationErrorList = z.infer<typeof WorkflowValidationErrorListSchema>;
