import { z } from 'zod';
import { WorkflowPreviewRequestSchema } from '../models';

export const ReadWorkflowPreviewsSchema = z.object({}).extend(WorkflowPreviewRequestSchema.shape);

export type ReadWorkflowPreviews = z.input<typeof ReadWorkflowPreviewsSchema>;
