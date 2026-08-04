import { z } from 'zod';
import { IssuesUpdateSchema } from '../models';

export const CreateIssuesSchema = z.object({}).extend(IssuesUpdateSchema.shape);

export type CreateIssues = z.input<typeof CreateIssuesSchema>;
