import { z } from 'zod';
import { WorkflowHistoryReadRequestSchema } from '../models';

export const ReadWorkflowFromHistorySchema = z.object({}).extend(WorkflowHistoryReadRequestSchema.shape);

export type ReadWorkflowFromHistory = z.input<typeof ReadWorkflowFromHistorySchema>;
