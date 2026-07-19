import { z } from 'zod';
import { WorkflowSchemeUpdateRequiredMappingsRequestSchema } from '../models';

export const GetRequiredWorkflowSchemeMappingsSchema = z
  .object({})
  .extend(WorkflowSchemeUpdateRequiredMappingsRequestSchema.shape);

export type GetRequiredWorkflowSchemeMappings = z.input<typeof GetRequiredWorkflowSchemeMappingsSchema>;
