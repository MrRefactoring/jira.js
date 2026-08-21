import { z } from 'zod';
import { IssueAssignRequestSchema } from '../models';

export const MoveIssuesToBacklogSchema = z.object(IssueAssignRequestSchema.shape);

export type MoveIssuesToBacklog = z.input<typeof MoveIssuesToBacklogSchema>;
