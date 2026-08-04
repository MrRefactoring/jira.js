import { z } from 'zod';
import { WorkflowSchemeUpdateRequestSchema } from '../models';

export const UpdateSchemesSchema = z.object({}).extend(WorkflowSchemeUpdateRequestSchema.shape);

export type UpdateSchemes = z.input<typeof UpdateSchemesSchema>;
