import { z } from 'zod';
import { BulkWorklogKeyRequestSchema } from '../models';

export const GetWorklogsByIssueIdAndWorklogIdSchema = z.object({}).extend(BulkWorklogKeyRequestSchema.shape);

export type GetWorklogsByIssueIdAndWorklogId = z.input<typeof GetWorklogsByIssueIdAndWorklogIdSchema>;
