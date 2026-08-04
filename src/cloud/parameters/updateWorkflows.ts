import { z } from 'zod';
import { WorkflowUpdateRequestSchema } from '../models';

export const UpdateWorkflowsSchema = z.object({}).extend(WorkflowUpdateRequestSchema.shape);

export type UpdateWorkflows = z.input<typeof UpdateWorkflowsSchema>;
