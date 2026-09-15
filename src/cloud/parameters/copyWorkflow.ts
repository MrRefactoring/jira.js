import { z } from 'zod';
import { WorkflowCopyRequestSchema } from '../models';

export const CopyWorkflowSchema = z.object(WorkflowCopyRequestSchema.shape);

export type CopyWorkflow = z.input<typeof CopyWorkflowSchema>;
