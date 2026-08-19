import { z } from 'zod';
import { WorkflowSchemeUpdateRequestSchema } from '../models';

export const UpdateSchemesSchema = z.object(WorkflowSchemeUpdateRequestSchema.shape);

export type UpdateSchemes = z.input<typeof UpdateSchemesSchema>;
