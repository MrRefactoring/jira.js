import type { z } from 'zod';
import { apiObject } from '#/core';
import { WorkflowCreateRequestSchema } from './workflowCreateRequest';
import { ValidationOptionsForCreateSchema } from './validationOptionsForCreate';

export const WorkflowCreateValidateRequestSchema = apiObject({
  payload: WorkflowCreateRequestSchema,
  validationOptions: ValidationOptionsForCreateSchema.optional(),
});

export type WorkflowCreateValidateRequest = z.infer<typeof WorkflowCreateValidateRequestSchema>;
