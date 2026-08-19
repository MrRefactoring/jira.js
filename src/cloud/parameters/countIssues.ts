import { z } from 'zod';
import { JQLCountRequestSchema } from '../models';

export const CountIssuesSchema = z.object(JQLCountRequestSchema.shape);

export type CountIssues = z.input<typeof CountIssuesSchema>;
