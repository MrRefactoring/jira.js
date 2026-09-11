import { z } from 'zod';
import { IssueUpdateSchema } from '../models';

export const CreateIssueSchema = z.object(IssueUpdateSchema.shape).extend({
  updateHistory: z.boolean().optional(),
});

export type CreateIssue = z.input<typeof CreateIssueSchema>;
