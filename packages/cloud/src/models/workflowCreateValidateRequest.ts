import { z } from 'zod';
import { WorkflowCreateRequestSchema } from '#/models/workflowCreateRequest';
import { ValidationOptionsForCreateSchema } from '#/models/validationOptionsForCreate';

export const WorkflowCreateValidateRequestSchema = z.object({
  payload: WorkflowCreateRequestSchema,
  validationOptions: ValidationOptionsForCreateSchema.optional(),
});

export type WorkflowCreateValidateRequest = z.infer<typeof WorkflowCreateValidateRequestSchema>;
