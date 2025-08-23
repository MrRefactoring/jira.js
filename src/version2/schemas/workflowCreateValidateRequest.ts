import { z } from 'zod';
import { WorkflowCreateRequestSchema } from './workflowCreateRequest';
import { ValidationOptionsForCreateSchema } from './validationOptionsForCreate';

export const WorkflowCreateValidateRequestSchema = z.object({
  payload: WorkflowCreateRequestSchema,
  validationOptions: ValidationOptionsForCreateSchema.optional(),
});

export type WorkflowCreateValidateRequest = z.infer<typeof WorkflowCreateValidateRequestSchema>;
