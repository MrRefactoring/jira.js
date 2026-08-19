import { z } from 'zod';
import { BulkWorklogKeyRequestSchema } from '../models';

export const GetWorklogsByIssueIdAndWorklogIdSchema = z.object(BulkWorklogKeyRequestSchema.shape);

export type GetWorklogsByIssueIdAndWorklogId = z.input<typeof GetWorklogsByIssueIdAndWorklogIdSchema>;
