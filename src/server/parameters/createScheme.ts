import { z } from 'zod';
import { WorkflowSchemeSchema } from '../models';

export const CreateSchemeSchema = z.object(WorkflowSchemeSchema.shape);

export type CreateScheme = z.input<typeof CreateSchemeSchema>;
