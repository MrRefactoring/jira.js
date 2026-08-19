import { z } from 'zod';
import { WorkflowSchemeUpdateRequiredMappingsRequestSchema } from '../models';

export const GetRequiredWorkflowSchemeMappingsSchema = z.object(
  WorkflowSchemeUpdateRequiredMappingsRequestSchema.shape,
);

export type GetRequiredWorkflowSchemeMappings = z.input<typeof GetRequiredWorkflowSchemeMappingsSchema>;
