import { z } from 'zod';
import { WorkflowSchemeSchema } from '../models';

export const CreateWorkflowSchemeSchema = z.object({}).extend(WorkflowSchemeSchema.shape);

export type CreateWorkflowScheme = z.input<typeof CreateWorkflowSchemeSchema>;
