import { z } from 'zod';
import { WorkflowReadRequestSchema } from '../models';

export const ReadWorkflowsSchema = z.object(WorkflowReadRequestSchema.shape);

export type ReadWorkflows = z.input<typeof ReadWorkflowsSchema>;
