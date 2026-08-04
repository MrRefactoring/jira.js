import { z } from 'zod';
import { WorkflowSchemeReadRequestSchema } from '../models';

export const ReadWorkflowSchemesSchema = z.object({}).extend(WorkflowSchemeReadRequestSchema.shape);

export type ReadWorkflowSchemes = z.input<typeof ReadWorkflowSchemesSchema>;
