import { z } from 'zod';
import { IssueRankRequestSchema } from '../models';

export const RankIssuesSchema = z.object({}).extend(IssueRankRequestSchema.shape);

export type RankIssues = z.input<typeof RankIssuesSchema>;
