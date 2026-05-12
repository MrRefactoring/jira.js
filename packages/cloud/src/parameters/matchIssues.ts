import { z } from 'zod';
import { IssuesAndJQLQueriesSchema } from '../models';

export const MatchIssuesSchema = z.object({}).extend(IssuesAndJQLQueriesSchema.shape);

export type MatchIssues = z.input<typeof MatchIssuesSchema>;
