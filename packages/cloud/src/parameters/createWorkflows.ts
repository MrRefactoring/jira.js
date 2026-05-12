import { z } from 'zod';
import { WorkflowCreateRequestSchema } from '../models';

export const CreateWorkflowsSchema = z.object({}).extend(WorkflowCreateRequestSchema.shape);

export type CreateWorkflows = z.input<typeof CreateWorkflowsSchema>;
