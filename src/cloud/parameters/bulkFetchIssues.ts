import { z } from 'zod';
import { BulkFetchIssueRequestSchema } from '../models';

export const BulkFetchIssuesSchema = z.object(BulkFetchIssueRequestSchema.shape);

export type BulkFetchIssues = z.input<typeof BulkFetchIssuesSchema>;
