import { z } from 'zod';
import { WorkflowUpdateRequestSchema } from '#/models/workflowUpdateRequest';
import { ValidationOptionsForUpdateSchema } from '#/models/validationOptionsForUpdate';

export const WorkflowUpdateValidateRequestSchema = z.object({
  payload: WorkflowUpdateRequestSchema,
  validationOptions: ValidationOptionsForUpdateSchema.optional(),
});

export type WorkflowUpdateValidateRequest = z.infer<typeof WorkflowUpdateValidateRequestSchema>;
