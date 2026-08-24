import { z } from 'zod';
import { IssueRankRequestSchema } from '../models';

export const RankIssuesSchema = z.object(IssueRankRequestSchema.shape);

export type RankIssues = z.input<typeof RankIssuesSchema>;
