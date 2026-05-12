import { z } from 'zod';
import { WorkflowUpdateValidateRequestSchema } from '../models';

export const ValidateUpdateWorkflowsSchema = z.object({}).extend(WorkflowUpdateValidateRequestSchema.shape);

export type ValidateUpdateWorkflows = z.input<typeof ValidateUpdateWorkflowsSchema>;
