import { z } from 'zod';
import { WorkflowCreateValidateRequestSchema } from '../models';

export const ValidateCreateWorkflowsSchema = z.object({}).extend(WorkflowCreateValidateRequestSchema.shape);

export type ValidateCreateWorkflows = z.input<typeof ValidateCreateWorkflowsSchema>;
