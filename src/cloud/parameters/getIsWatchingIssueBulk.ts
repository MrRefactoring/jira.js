import { z } from 'zod';
import { IssueListSchema } from '../models';

export const GetIsWatchingIssueBulkSchema = z.object({}).extend(IssueListSchema.shape);

export type GetIsWatchingIssueBulk = z.input<typeof GetIsWatchingIssueBulkSchema>;
