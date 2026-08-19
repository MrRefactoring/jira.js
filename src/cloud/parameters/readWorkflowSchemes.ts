import { z } from 'zod';
import { WorkflowSchemeReadRequestSchema } from '../models';

export const ReadWorkflowSchemesSchema = z.object(WorkflowSchemeReadRequestSchema.shape);

export type ReadWorkflowSchemes = z.input<typeof ReadWorkflowSchemesSchema>;
