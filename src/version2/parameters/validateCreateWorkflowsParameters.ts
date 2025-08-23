import { z } from 'zod';
import { WorkflowCreateRequestSchema } from './workflowCreateRequest';
import { ValidationOptionsForCreateSchema } from './validationOptionsForCreate';

export const ValidateCreateWorkflowsParametersSchema = z.object({
  payload: WorkflowCreateRequestSchema,
  validationOptions: ValidationOptionsForCreateSchema.optional(),
});

export type ValidateCreateWorkflowsParameters = z.infer<typeof ValidateCreateWorkflowsParametersSchema>;
