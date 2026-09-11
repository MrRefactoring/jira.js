import { z } from 'zod';
import { IssueAssignRequestSchema } from '../models';

export const RemoveIssuesFromEpicSchema = z.object(IssueAssignRequestSchema.shape);

export type RemoveIssuesFromEpic = z.input<typeof RemoveIssuesFromEpicSchema>;
