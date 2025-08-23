import { z } from 'zod';
import { WorkflowUpdateRequestSchema } from './workflowUpdateRequest';
import { ValidationOptionsForUpdateSchema } from './validationOptionsForUpdate';

export const ValidateUpdateWorkflowsParametersSchema = z.object({
  payload: WorkflowUpdateRequestSchema,
  validationOptions: ValidationOptionsForUpdateSchema.optional(),
});

export type ValidateUpdateWorkflowsParameters = z.infer<typeof ValidateUpdateWorkflowsParametersSchema>;
