import { z } from 'zod';
import { WorkflowUpdateRequestSchema } from './workflowUpdateRequest';
import { ValidationOptionsForUpdateSchema } from './validationOptionsForUpdate';

export const WorkflowUpdateValidateRequestBeanSchema = z.object({
  payload: WorkflowUpdateRequestSchema,
  validationOptions: ValidationOptionsForUpdateSchema.optional(),
});

export type WorkflowUpdateValidateRequestBean = z.infer<typeof WorkflowUpdateValidateRequestBeanSchema>;
