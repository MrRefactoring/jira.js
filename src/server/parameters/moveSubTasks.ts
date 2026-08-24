import { z } from 'zod';
import { IssueSubTaskMovePositionSchema } from '../models';

export const MoveSubTasksSchema = z.object(IssueSubTaskMovePositionSchema.shape).extend({
  /** The parent issue's key or id */
  issueIdOrKey: z.string(),
});

export type MoveSubTasks = z.input<typeof MoveSubTasksSchema>;
