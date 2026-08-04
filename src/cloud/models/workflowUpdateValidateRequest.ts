import type { z } from 'zod';
import { apiObject } from '#/core';
import { WorkflowUpdateRequestSchema } from './workflowUpdateRequest';
import { ValidationOptionsForUpdateSchema } from './validationOptionsForUpdate';

export const WorkflowUpdateValidateRequestSchema = apiObject({
  payload: WorkflowUpdateRequestSchema,
  validationOptions: ValidationOptionsForUpdateSchema.optional(),
});

export type WorkflowUpdateValidateRequest = z.infer<typeof WorkflowUpdateValidateRequestSchema>;
